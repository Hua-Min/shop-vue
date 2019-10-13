<template>
  <div id="oreder">
    <van-nav-bar
      v-show="ifShow"
      title="填写订单"
      left-text="返回"
      :fixed="true"
      :border="true"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-contact-card
      type="add"
      v-show="ifShow"
      add-text="选择收货地址"
      @click="chooseAddress"
      style="margin-top: 3rem"
    />
    <van-cell-group style="margin-top: 0.6rem">
      <van-cell title="送达时间" value="请选择送达时间" is-link></van-cell>
      <van-cell value="内容" is-link :center="true">
        <template slot="title">
          <img src="./images/3.jpg" alt style="width: 3rem;" />
          <img src="./images/3.jpg" alt style="width: 3rem;" />
          <img src="./images/3.jpg" alt style="width: 3rem;" />
        </template>
      </van-cell>
    </van-cell-group>

    <van-cell-group style="margin-top: 0.6rem">
      <van-cell title="支付方式" value="微信"></van-cell>
    </van-cell-group>

    <van-cell-group style="margin-top: 0.6rem">
      <van-cell title="备注">
        <input type="text" placeholder="选填，备注您的特殊需求！" />
      </van-cell>
    </van-cell-group>

    <van-cell-group style="margin-top: 0.6rem">
      <van-cell title="商品金额" value="¥50.30">2222</van-cell>
      <van-cell title="配送费" value="¥0.00"></van-cell>
    </van-cell-group>
    <!-- 提交按钮 -->
    <van-submit-bar :price="3050" button-text="提交订单" label="实付" @submit="onSubmit"></van-submit-bar>

    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "Order",
  data() {
    return {
      ifShow: true
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },

    chooseAddress() {
      this.$router.push("/order/myAddress");
    },
    timeClick() {
      alert("timeclick");
    },
    onSubmit() {
      alert(0);
    }
  },

  beforeRouteUpdate(to, from, next) {
    if (to.name === "order") {
      this.ifShow = true;
    } else {
      this.ifShow = false;
    }
    next();
  }
};
</script>

<style lang="less">
#order {
  width: 100%;
  height: 100%;
}
</style>