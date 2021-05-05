<template>
  <div class="others">
    <BarTop :title="title" backPath="/" backLabel="戻る" />
  </div>
</template>

<script>
// @ is an alias to /src
import BarTop from "@/components/BarTopV2.vue";

export default {
  name: "Else",
  data() {
    return {
      title: "その他",
      msg: "Welcome to my Vue&Boot Others",
    };
  },
  components: {
    BarTop,
  },
};
</script>
