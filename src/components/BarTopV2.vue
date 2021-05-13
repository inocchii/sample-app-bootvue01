<template>
  <!-- L1-1 ナビゲーションバー -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
    <div class="container">
      <!-- 戻るボタン：backPath指定があれば優先採用 -->
      <router-link v-if="backPath>''" class="navbar-brand" :to="backPath">{{
        backLabel
      }}</router-link>
      <!-- 戻るボタン：backPath指定がなければ$router.go(-1)で一つ前に -->
      <div v-else-if="backLabel>''" class="navbar-brand" @click="$router.go(-1)">{{
        backLabel
      }}</div>
      <!-- <a class="button navbar-brand" v-if="hasBackLabel" @click="goBack">{{ backLabel }}</a> -->
      <!-- <a class="navbar-brand" href="">Vue＆Boot</a> -->
      {{ title }}
      <a class="btn" href="" role="button"><i class="fas fa-bars"></i></a>
    </div>
    <div style="height: 0px; color: #eee">BarTop 余白0px</div>
  </nav>
</template>

<script>
export default {
  name: "BarTopV2",
  computed: {
    /*
    hasBackLabel() {
      if ( this.backLabel > "" && this.backPath > "" ) {
        return true;
      }
      return false;
    },
    */
  },
  methods: {
    goBack() {
      console.log("goBack history.length=" + window.history.length);
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
  },
  props: {
    title: String,
    backLabel: String,
    backPath: String,
  },
};
</script>
<style lang="scss">
nav.navbar {
  padding: 0px 0px;
}
</style>
