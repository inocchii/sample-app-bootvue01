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
          <span v-if="tab.badge > 0" class="badge badge-pill badge-danger">{{
            tab.badge
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
          badge: 0,
        },
        {
          path: "/order/scan",
          icon: "fas fa-edit",
          label: "発注",
          badge: 10,
        },
        {
          path: "/item/list",
          icon: "fas fa-database",
          label: "商品",
          badge: 1,
        },
        {
          path: "/search",
          icon: "fas fa-search",
          label: "検索",
          badge: 0,
        },
        {
          path: "/others",
          icon: "fas fa-ellipsis-h",
          label: "その他",
          badge: 3,
        },
      ],
    };
  },
  methods: {},
  computed: {},
  components: {},
  props: [],
};
</script>

<style lang="scss"></style>
