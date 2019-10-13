<template>
  <div id="addAdress">
    <!-- 导航 -->
    <van-nav-bar title="添加地址" left-text="返回" left-arrow @click-left="onClickLeft" />
    <!-- 地址 -->
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>
<script>
import { Toast } from "vant";
import areaList from "./../../../../config/area.js";
import { addUserAddress } from "./../../../../serve/index";
import { mapState } from "vuex";
import PubSub from "pubsub-js";
export default {
  name: "addAdress",
  data() {
    return {
      areaList,
      searchResult: []
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    // 保存
    async onSave(content) {
      console.log(content);
      if (this.userInfo.token) {
        let result = await addUserAddress(
          this.userInfo.token,
          content.name,
          content.tel,
          content.province + content.city + content.county,
          content.addressDetail,
          content.postalCode,
          content.isDefault,
          content.province,
          content.city,
          content.county,
          content.areaCode
        );
        console.log(result);
        // 判断
        if (result.success_code === 200) {
          // 成功
          Toast({
            message: "添加地址成功！",
            duration: 400
          });
          // 回去
          this.$router.back();
          // 发起通知
          PubSub.publish("addAddressSuccess");
        } else {
          Toast({
            message: "添加地址失败！",
            duration: 400
          });
        }
      }
    },
    onDelete() {
      Toast("delete");
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "天安门",
            address: "杭州市西湖区"
          }
        ];
      } else {
        this.searchResult = [];
      }
    }
  }
};
</script>
<style lang="less">
#addAdress {
  width: 100%;
  height: 100%;
}
</style>