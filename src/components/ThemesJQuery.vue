<template>
  <div class="Themes">
    <div class="card w-100">
      <div class="card-header">JavaScript使用時の注意点</div>
      <div class="card-body"><div class="card-text"></div></div>
    </div>
    <div class="card w-100">
      <div class="card-header">jQueryの使用方法を整理</div>
      <div class="card-body"><div class="card-text"></div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ThemesBoot",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card {
  text-align: left;
}
.card-text {
  font-size: 0.8rem;
  line-height: 1.2;
}
</style>
