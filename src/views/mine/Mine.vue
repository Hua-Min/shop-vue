<template>
  <div id="mine" v-if="userInfo.token">
    <van-nav-bar title="我的" left-arrow @click-left="onClickLeft" :fixed="true" :border="false"></van-nav-bar>

    <van-cell-group style="margin-top: 2.6rem">
      <van-cell
        style="background-color: #2eba5a; color: #fff;"
        is-link
        :center="true"
        @click="$router.push('/dashboard/mine/usercenter')"
      >
        <template slot="title">
          <div class="personMsg">
            <!-- 某老哥接口返回的数据太丑了 还是用自己的吧 -->
            <img src="./images/cun.jpg" />
            <div class="personInfo">
              <span>村上村树</span>
              <span>{{userInfo.phone}}</span>
            </div>
          </div>
        </template>
      </van-cell>
    </van-cell-group>

    <van-cell-group>
      <van-cell icon="label" title="我的订单" value="查看所有的订单" is-link></van-cell>
      <van-grid>
        <van-grid-item
          v-for="(order, index) in orderData"
          :key="index"
          :icon="order.icon"
          :text="order.title"
        ></van-grid-item>
      </van-grid>
    </van-cell-group>

    <!--我的优惠券-->
    <van-cell-group style="margin-top: 0.4rem">
      <van-cell title="我的优惠券" icon="gold-coin" value="1张" is-link></van-cell>
      <van-cell title="我的收货地址" icon="todo-list" is-link></van-cell>
    </van-cell-group>
    <!--联系客服-->
    <van-cell-group style="margin-top: 0.4rem">
      <van-cell title="联系客服" icon="phone" value="客服时间 07:00-22:00" is-link></van-cell>
      <van-cell title="意见反馈" icon="smile-comment" is-link></van-cell>
    </van-cell-group>

    <van-cell-group style="margin-top: 0.4rem">
      <van-cell title="买菜" icon="gift-card" value="下载APP体验更佳" is-link></van-cell>
    </van-cell-group>
    <router-view></router-view>
  </div>
  <SelectLogin v-else />
</template>

<script>
import { Cell, CellGroup } from "vant";
import SelectLogin from "@/views/login/SelectLogin.vue";
import { mapState } from "vuex";
export default {
  name: "Mine",
  data() {
    return {
      orderData: [
        { icon: "cart-circle-o", title: "待支付" },
        { icon: "gift-o", title: "待收货" },
        { icon: "smile-comment-o", title: "待评价" },
        { icon: "cash-back-record", title: "售后/退款" }
      ]
    };
  },
  components: {
    SelectLogin
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    }
  }
};
</script>

<style lang="less" scoped>
#mine {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}

.van-nav-bar {
  background-color: #3bba63;
}

.van-nav-bar__title {
  color: #fff;
  font-size: 1rem;
}
.van-nav-bar__text {
  color: #fff;
  font-size: 0.8rem;
}

.van-icon-arrow-left {
  color: #fff;
}

.personMsg {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.personMsg > img {
  width: 4rem;
  height: 4rem;
  border-radius: 2rem;
  border: 0.12rem solid #fff;
}

.personInfo {
  display: flex;
  flex-direction: column;
  margin-left: 0.8rem;
}

.van-cell__left-icon {
  color: orangered;
  font-size: 1.2rem;
}
</style>