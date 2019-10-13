<template>
  <div v-if="ifShow" id="home">
    <Header></Header>
    <Sowing :sowingList="sowingList" />
    <Nav :nav_list="nav_list" />
    <FlashSale :flash_sale_product_list="flash_sale_product_list"></FlashSale>
    <YouLike :you_like_product_list="you_like_product_list" />
    <ToTop v-show="showToTop" :scrollToTop="scrollToTop" />
  </div>
  <van-loading
    v-else
    size="24px"
    style="position: absolute;top: 40%;left: 50%;transform: translateX(-50%)"
  >加载中...</van-loading>
</template>

<script>
import { getHomeData } from "../../serve/index";
import Header from "./components/header/Header";
import Sowing from "./components/sowing/sowing";
import Nav from "./components/nav/Nav";
import FlashSale from "./components/flash/FlashSale";
import YouLike from "./components/youlike/YouLike";
import ToTop from "./components/toTop/ToTop";

import { showToTop, animate } from "../../plugins/global";

import PubSub from "pubsub-js";
import { mapMutations, mapState } from "vuex";
//提示
import { Toast } from "vant";

// 引入购物车的接口
import { addGoodsToCart } from "./../../serve/index";

export default {
  name: "Mine",
  data() {
    return {
      sowingList: [],
      ifShow: false,
      showToTop: true,
      nav_list: [],
      flash_sale_product_list: [],
      you_like_product_list: []
    };
  },
  components: {
    Header,
    Sowing,
    Nav,
    FlashSale,
    YouLike,
    ToTop
  },
  computed: {
    ...mapState(["userInfo"])
  },
  created() {
    this.reqData();
  },
  mounted() {
    // 订阅消息（添加到购物车的消息）
    PubSub.subscribe("homeAddToCart", (msg, goods) => {
      if (msg === "homeAddToCart") {
        // 判断用户是否登录

        if (this.userInfo.token) {
          // 已经登录
          this.dealGoodsAdd(goods);
        } else {
          // 没有登录
          this.$router.push("/login");
        }
      }
    });
  },
  methods: {
    ...mapMutations(["ADD_GOODS"]),
    async reqData() {
      let res = await getHomeData();
      if (res.success) {
        this.sowingList = res.data.list[0].icon_list;
        this.nav_list = res.data.list[2].icon_list;
        this.flash_sale_product_list = res.data.list[3].product_list;
        this.you_like_product_list = res.data.list[12].product_list;

        this.ifShow = true;
        showToTop(flag => {
          // console.log(flag);
          this.showToTop = flag;
        });
      }
    },
    //element = document.documentElement || document.body,to = 0,duration = 300
    scrollToTop() {
      // document.documentElement.scrollTo({top:0})  || document.body.scrollTo({top:0})
      // 做缓动动画返回顶部
      let docB = document.documentElement || document.body;
      animate(docB, { scrollTop: "0" }, 400, "ease-out");
      /*        if (duration <= 0) return;
                        const diff = to - element.scrollTop;
                        const perTick = diff / duration * 10;
                        this.timer = setTimeout(() => {
                          element.scrollTop += perTick;
                          if (element.scrollTop === to) return;
                          this.scrollToTop(element, to, duration - 10);
                        }, 10);*/
    },
    //添加商品到购物车
    async dealGoodsAdd(goods) {
      let result = await addGoodsToCart(
        this.userInfo.token,
        goods.id,
        goods.name,
        goods.price,
        goods.small_image
      );
      // console.log(result);
      if (result.success_code === 200) {
        this.ADD_GOODS({
          goodsId: goods.id,
          goodsName: goods.name,
          smallImage: goods.small_image,
          goodsPrice: goods.price
        });
        // 提示用户
        Toast({
          message: "添加到购物车成功！",
          duration: 800
        });
      }
    }
  },
  beforeDestroy() {
    PubSub.unsubscribe("homeAddToCart");
  }
};
</script>

<style scoped>
#home {
  width: 100%;
  height: 100%;
}
</style>