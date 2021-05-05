<template>
  <!-- L1-1 ナビゲーションバー -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
    <div class="container">
      <!-- ブランド -->
      <router-link v-if="hasBackLabel" class="navbar-brand" :to="backPath">{{
        backLabel
      }}</router-link>
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
    hasBackLabel() {
      if (this.backLabel > "") {
        return true;
      }
      return false;
    },
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
