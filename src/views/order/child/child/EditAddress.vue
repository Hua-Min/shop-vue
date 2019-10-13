<template>
  <div id="editAdress">
    <van-nav-bar title="编辑地址" left-text="返回" left-arrow @click-left="onClickLeft" />
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
import areaList from "./../../../../config/area";
import { Toast } from "vant";
import { mapState } from "vuex";
import { getCurrentUserAddress } from "./../../../../serve/index";

export default {
  name: "editAdress",
  data() {
    return {
      areaList: areaList,
      searchResult: [],
      addressInfo: {}
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  mounted() {
    console.log(this.$route);
    if (this.$route.query.address_id) {
      if (this.userInfo.token) {
        this.getCurrentAddress(
          this.userInfo.token,
          this.$route.query.address_id
        );
      }
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onSave() {
      Toast("save");
    },
    onDelete() {
      Toast("delete");
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区"
          }
        ];
      } else {
        this.searchResult = [];
      }
    },
    async getCurrentAddress(user_id, address_id) {
      let result = await getCurrentUserAddress(user_id, address_id);
      console.log(result);
      if (result.success_code === 200) {
        this.addressInfo = {
          id: result.data._id,
          name: result.data.address_name,
          tel: result.data.address_phone,
          province: result.data.province,
          city: result.data.city,
          county: result.data.county,
          addressDetail: result.data.address_area_detail,
          areaCode: result.data.areaCode,
          postalCode: result.data.address_post_code,
          isDefault: result.data.address_tag
        };
      }
      console.log(this.addressInfo);
    }
  }
};
</script>
<style lang="less">
#editAdress {
  width: 100%;
  height: 100%;
}
</style>