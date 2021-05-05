<template>
  <div class="search">
    <BarTop :title="title" backPath="/" backLabel="戻る" />
  </div>
</template>

<script>
// @ is an alias to /src
import BarTop from "@/components/BarTopV2.vue";

export default {
  name: "Search",
  data() {
    return {
      title: "検索",
      msg: "Welcome to my Vue&Boot Search",
    };
  },
  components: {
    BarTop,
  },
};
</script>
