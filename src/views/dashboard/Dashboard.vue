<template>
  <div id="dashboard">
    <van-tabbar v-model="active" active-color="#75a342" inactive-color="#000">
      <van-tabbar-item replace to="/dashboard/home">
        <span>首页</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? dashboard_icon.active : dashboard_icon.normal"
        />
      </van-tabbar-item>
      <van-tabbar-item replace to="/dashboard/category">
        <span>分类</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? category_icon.active : category_icon.normal"
        />
      </van-tabbar-item>
      <van-tabbar-item replace :info="goodsNum || '' " to="/dashboard/cart">
        <span>购物车</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? cart_icon.active : cart_icon.normal"
        />
      </van-tabbar-item>
      <van-tabbar-item replace to="/dashboard/mine">
        <span>我的</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? mine_icon.active : mine_icon.normal"
        />
      </van-tabbar-item>
    </van-tabbar>
    <keep-alive>
      <router-view v-if="this.$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!this.$route.meta.keepAlive" />
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
import { getGoodsCart } from "@/serve/index.js";
import { setStore } from "./../../plugins/global";

export default {
  name: "Dashboard",
  data() {
    return {
      //active:0
      active: Number(sessionStorage.getItem("activeValue")) || 0,
      dashboard_icon: {
        normal: require("@/images/tabbar/home_default.png"),
        active: require("@/images/tabbar/home_selected.png")
      },
      category_icon: {
        normal: require("@/images/tabbar/category_default.png"),
        active: require("@/images/tabbar/category_selected.png")
      },
      cart_icon: {
        normal: require("@/images/tabbar/shoppingcart_default.png"),
        active: require("@/images/tabbar/shoppingcart_selected.png")
      },
      mine_icon: {
        normal: require("@/images/tabbar/mine_default.png"),
        active: require("@/images/tabbar/mine_selected.png")
      }
    };
  },
  watch: {
    active(value) {
      sessionStorage.setItem("activeValue", value);
    }
  },
  computed: {
    ...mapState(["shopCart", "userInfo"]),
    goodsNum() {
      if (this.shopCart) {
        // 总的购物车商品数量
        let num = 0;
        // console.log(Object.values(this.shopCart));
        Object.values(this.shopCart).forEach((goods, index) => {
          num += goods.num;
        });
        return num;
      } else {
        return 0;
      }
    }
  },
  mounted() {
    //自动登录
    this.reqUserInfo();
    this.initShopCart();
    // this.INIT_SHOP_CART();
  },
  methods: {
    ...mapMutations(["INIT_SHOP_CART"]),
    ...mapActions(["reqUserInfo"]),
    async initShopCart() {
      if (this.userInfo.token) {
        // 已经登录
        // 1. 获取当前用户购物车中的商品(服务器端)
        let result = await getGoodsCart(this.userInfo.token);
        console.log(result, this.userInfo.token);
        // 2. 如果获取成功
        if (result.success_code === 200) {
          let cartArr = result.data;
          let shopCart = {};
          // 2.1 遍历
          cartArr.forEach(value => {
            shopCart[value.goods_id] = {
              num: value.num,
              id: value.goods_id,
              name: value.goods_name,
              small_image: value.small_image,
              price: value.goods_price,
              checked: true
            };
          });
          // 2.2 本地数据同步
          // setStore("shopCart", shopCart);
          this.INIT_SHOP_CART();
        }
      }
    }
  }
};
</script>

<style scoped>
#dashboard {
  width: 100%;
  height: 100%;
  /*background-color: gold;*/
}
</style>