<template>
  <div class="OuterSite">
    <BarTop :title="title" :backPath="backPath" backLabel="戻る" />
    <div>
      {{ this.$route.query.title }}&{{ this.$route.query.url }}&{{
        this.$route.query.backPath
      }}
    </div>
    <div class="fOuterSite">
      <iframe
        referrerpolicy="same-origin"
        style="border: 0px"
        :src="src"
      ></iframe>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BarTop from "@/components/BarTopV2.vue";

export default {
  name: "OuterSite",
  data() {
    return {
      title: this.$route.query.title,
      src: this.$route.query.url,
      backPath: this.$route.query.backPath,
      msg: "This is the Outer Site",
    };
  },
  mounted() {},
  method: {},
  components: {
    BarTop,
  },
  props: {
    //title: String,
    //url: String,
    //backPath: String,
  },
};
</script>

<style scoped lang="scss">
.fOuterSite {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 120%;
}
.fOuterSite iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
