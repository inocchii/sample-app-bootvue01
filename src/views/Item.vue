<template>
  <div class="order">
    <BarTop :title="title" backPath="/" backLabel="戻る" />
    <div>{{ this.$route.params.id }}</div>
  </div>
</template>

<script>
// @ is an alias to /src
import BarTop from "@/components/BarTopV2.vue";

export default {
  name: "Item",
  data() {
    return {
      title: "商品",
      msg: "Welcome to my Vue&Boot Item",
    };
  },
  components: {
    BarTop,
  },
};
</script>
