<template>
  <div>
    <!-- 下段ナビがコンテンツを隠さないように余白divを設置 -->
    <div style="height: 70px; color: #eee">BarBottom 余白70px</div>
    <!-- 下段ナビ -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-bottom">
      <div class="container border-top">
        <router-link
          class="btn"
          role="button"
          v-for="tab in tabs"
          :key="tab.label"
          :to="tab.path"
        >
          <i :class="tab.icon"></i>
          <!--
          <span v-if="tab.badge > 0" class="badge badge-pill badge-danger">{{
            tab.badge
          }}</span>
          -->
          <span v-if="getCounterObj(tab.name)>0" class="badge badge-pill badge-danger">{{
            getCounterObj(tab.name)
          }}</span>
          <span v-else-if="getCounterVuex(tab.name)>0" class="badge badge-pill badge-danger">{{
            getCounterVuex(tab.name)
          }}</span>
          <br />
          {{ tab.label }}
        </router-link>
        <!-- アイコン -->
        <!--
        <router-link class="btn" role="button" to="/">
          <i class="fas fa-home"></i><br>ホーム</router-link>
        <router-link class="btn" role="button" to="/order">
          <i class="fas fa-edit"></i><span class="badge badge-pill badge-danger">2</span>
          <br>発注</router-link>
        -->
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // activeIndex: 0,
      tabs: [
        {
          path: "/",
          icon: "fas fa-home",
          label: "ホーム",
          name: "home",
          badge: 0,
        },
        {
          path: "/order/scan",
          icon: "fas fa-edit",
          label: "発注",
          name: "order",
          badge: 0,
        },
        {
          path: "/item/list",
          icon: "fas fa-database",
          label: "商品",
          name: "item",
          badge: 0,
        },
        {
          path: "/search",
          icon: "fas fa-search",
          label: "検索",
          name: "search",
          badge: 0,
        },
        {
          path: "/others",
          icon: "fas fa-ellipsis-h",
          label: "その他",
          name: "else",
          badge: 0,
        },
      ],
    };
  },
  methods: {
    /*
    async getCounterDb(argNm) {
      // DBからの取得は非同期であり表示への反映が遅れるようである
      // ※computed でも method(async/await)でも同様
      //return function(argNm) {
        const wCount = await window.objDb.getCount(argNm);
        console.log("getCounterDb:"+argNm+"("+wCount+")");
        //return wCount;
        return 1;
      //}
    },
    */
  },
  /*
  filters: {
    updateCounter: function(argNm) {
      console.log("updateCounter:"+argNm);
      return this.getCountOrder;
    },
  },
  */
  computed: {
    getCounterObj: function() {
      return function(argNm) {
        //console.log("getCounterObj:"+argNm+"("+window.objCounter.get(argNm)+")");
        return window.objCounter.get(argNm);
      }
    },
    getCounterVuex: function() {
      return function(argNm) {
        //console.log("getCounterVuex:"+argNm+"("+this.$store.getters.getCount(argNm)+")");
        return this.$store.getters.getCount(argNm);
      }
    },
  },
  mounted: function () {
    // objCounterにカウンタをセット
    window.objCounter.set('home',0);
    window.objCounter.set('order',0);
    window.objCounter.set('item',0);
    window.objCounter.set('search',0);
    window.objCounter.set('else',0);
    // storeにカウンタをセット
    this.$store.dispatch('addCount',['home',0]);
    this.$store.dispatch('addCount',['order',0]);
    this.$store.dispatch('addCount',['item',0]);
    this.$store.dispatch('addCount',['search',0]);
    this.$store.dispatch('addCount',['else',0]);
    console.log("tabs[0].label:" + this.tabs[0].label + " .badge:" + this.tabs[0].badge);
    console.log("tabs[1].label:" + this.tabs[1].label + " .badge:" + this.tabs[1].badge);
    console.log("tabs[2].label:" + this.tabs[2].label + " .badge:" + this.tabs[2].badge);
  },
  components: {},
  props: [],
};
</script>

<style lang="scss"></style>
