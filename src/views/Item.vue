<template>
  <div class="order">
    <BarTop :title="title" backPath="/" backLabel="戻る" />
    <div>{{ this.$route.params.id }}</div>
          <h2>商品リストを表示</h2>
          <div class="note">※コンポーネントBlockItemを使用</div>
          <div class="row">
            <template v-for="item in shopItemList">
              <BlockItem :item="item" :key="item.id" class="card col-6"></BlockItem>
            </template>
          </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BarTop from "@/components/BarTopV2.vue";
import BlockItem from "@/components/blocks/BlockItem.vue";

export default {
  name: "Item",
  mounted: function() {
    // Color me の商品リストをストアから取得
    console.log("mounted shopItemList from store:this.FILE_NM_SHOP_ITEM_LIST:"+this.FILE_NM_SHOP_ITEM_LIST);
    this.shopItemList = this.$store.getters['entities/getList'](this.FILE_NM_SHOP_ITEM_LIST);
    console.log("mounted toriList from store:count:"+this.getCount(this.shopItemList));

    // 存在しなければLocalStorageから取得
    if ( this.getCount(this.shopItemList) <= 0 ) {
      this.$store.dispatch('entities/setInfoFromStorage',this.FILE_NM_SHOP_ITEM_LIST);
      this.shopItemList = this.$store.getters['entities/getList'](this.FILE_NM_SHOP_ITEM_LIST);
    }
  },
  data() {
    return {
      title: "商品",
      msg: "Welcome to my Vue&Boot Item",
      shopItemList: [],
    };
  },
  components: {
    BarTop,
    BlockItem,
  },
};
</script>
