<template>
  <div id="category">
    <Header />
    <div class="listWrapper" v-if="!showLoading">
      <div class="leftWrapper">
        <ul class="wrapper">
          <li
            class="categoryItem"
            v-for="(cate, index) in categoriesData"
            :class="{selected: currentIndex === index}"
            @click="clickLeftLi(index)"
            :key="cate.id"
            ref="menuList"
          >
            <span class="textWrapper">{{cate.name}}</span>
          </li>
        </ul>
      </div>
      <ContentView :categoriesDetailData="categoriesDetailData" />
    </div>

    <van-loading
      v-else
      type="spinner"
      color="#75a342"
      style="position: absolute;left:50%;top: 40%;transform: translate(-50%)"
    >加载中…</van-loading>
  </div>
</template>

<script>
import Header from "./components/Header";
import ContentView from "./components/ContentView";
import BScroll from "@better-scroll/core";
import { getCategories, getCategoriesDetail } from "../../serve";
import { Toast } from "vant";
import { mapMutations } from "vuex";

export default {
  name: "Category",
  data() {
    return {
      showLoading: true,
      categoriesData: [],
      categoriesDetailData: [],
      currentIndex: 0
    };
  },
  components: {
    Header,
    ContentView
  },
  created() {
    this.initData();
  },
  mounted() {},
  methods: {
    ...mapMutations(["ADD_GOODS"]),
    async initData() {
      // 1. 获取左边的数据
      let leftRes = await getCategories();
      if (leftRes.success) {
        this.categoriesData = leftRes.data.cate;
      }

      // 2. 获取右边的数据
      let rightRes = await getCategoriesDetail("/lk001");
      if (rightRes.success) {
        this.categoriesDetailData = rightRes.data.cate;
      }
      //3.隐藏loading
      this.showLoading = false;

      this.$nextTick(() => {
        this.scroll = new BScroll(".leftWrapper", {
          probeType: 3,
          click: true,
          tap: true
        });
      });
    },

    async clickLeftLi(index) {
      // alert(1111);
      // 2.1 改变索引
      this.currentIndex = index;

      // 2.2 滚动到对应的位置
      let menuLists = this.$refs.menuList;
      let el = menuLists[index];
      // console.log(el);

      // 2.3 滚动到对应元素上
      this.scroll.scrollToElement(el, 300); //scrollToElementToTop

      // 2.4 获取右边的数据(!!!!!通过更改数据是右边重载)
      let rightRes = await getCategoriesDetail(`/lk00${index + 1}`);
      if (rightRes.success) {
        this.categoriesDetailData = rightRes.data.cate;
      }
    }
  }
};
</script>

<style lang="less" scoped>
#category {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  overflow: hidden;
}

.listWrapper {
  display: flex;
  position: absolute;
  top: 2.75rem;
  bottom: 3rem;
  width: 100%;
  overflow: hidden;
}

.leftWrapper {
  background-color: #f4f4f4;
  width: 5.3125rem;
  flex: 0 0 5.3125rem;
}

.categoryItem {
  padding: 0.75rem 0;
  border-bottom: solid 1px #e8e9e8;
  position: relative;
}

.categoryItem .textWrapper {
  line-height: 1.25rem;
  border-left: solid 0.1875rem transparent;
  padding: 0.3125rem 0.6875rem;
  font-size: 0.8125rem;
  color: #666666;
}

.categoryItem.selected {
  background: #fff;
}

.categoryItem.selected .textWrapper {
  border-left-color: #3cb963;
  font-weight: bold;
  font-size: 0.875rem;
  color: #333333;
}

@media (min-width: 960px) {
  .wrapper {
    border-right: 1px solid #e8e9e8;
  }

  .wrapper .categoryItem {
    background: #fff;
  }
}
</style>