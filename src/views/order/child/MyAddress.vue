<template>
  <div id="myAddress">
    <van-nav-bar v-show="ifShow" title="选择地址" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-address-list
      v-show="ifShow"
      v-model="chosenAddressId"
      style="margin-top:1rem"
      :list="list"
      :disabled-list="disabledList"
      disabled-text="以下地址超出配送范围"
      @add="onAdd"
      @edit="onEdit"
    />
    <router-view></router-view>
  </div>
</template>

<script>
import { Toast } from "vant";
import { getUserAddress } from "./../../../serve/index";
import { mapState } from "vuex";
import PubSub from "pubsub-js";
export default {
  name: "myAddress",
  data() {
    return {
      ifShow: true,
      updateCount: 0,
      chosenAddressId: "1",
      list: [],
      disabledList: [
        {
          id: "3",
          name: "王五",
          tel: "1320000000",
          address: "浙江省杭州市滨江区江南大道 15 号"
        }
      ]
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  mounted() {
    this.initUserAddress();
    // 订阅添加地址成功
    PubSub.subscribe("addAddressSuccess", msg => {
      if (msg === "addAddressSuccess") {
        this.initUserAddress();
      }
    });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    // 新增地址
    onAdd() {
      // Toast('新增地址');
      this.$router.push({
        path: "/order/myAddress/addAddress"
      });
    },
    onEdit(item, index) {
      // Toast('编辑地址:' + index);
      // console.log(item);
      this.$router.push({
        path: "/order/myAddress/editAddress?address_id=" + item.address_id
      });
    },

    // 获取当前用户的地址
    async initUserAddress() {
      if (this.userInfo.token) {
        // 处于登录状态
        console.log(this.userInfo.token, 11111111111);
        let result = await getUserAddress(this.userInfo.token);
        console.log(result);
        if (result.success_code === 200) {
          let addressArr = result.data;
          this.list = [];
          addressArr.forEach((address, index) => {
            let addressObj = {
              id: String(index + 1),
              name: address.address_name,
              tel: address.address_phone,
              address: address.address_area + address.address_area_detail,
              address_id: address._id,
              user_id: address.user_id
            };
            // 追加到数组
            this.list.push(addressObj);
          });
        } else {
          Toast({
            message: "获取地址失败！",
            duration: 400
          });
        }
      } else {
        Toast({
          message: "登录已过期，请退出登录！",
          duration: 400
        });
      }
    }
  },

  beforeRouteUpdate(to, from, next) {
    if (to.name === "myAddress") {
      this.ifShow = true;
    } else {
      this.ifShow = false;
    }
    next();
  },
  beforeDestroy() {
    PubSub.unsubscribe("addAddressSuccess");
  }
};
</script>

<style lang="less">
#myAddress {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
  z-index: 200;
}
</style>