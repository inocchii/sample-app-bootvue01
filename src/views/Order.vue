<template>
  <div class="order">
    <BarTop :title="title" backPath="/" backLabel="戻る" />
    <HelloWorld :msg="msg" />
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- <BarBottom /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import BarTop from "@/components/BarTopV2.vue";
import HelloWorld from "@/components/HelloWorld.vue";
//import BarBottom from "@/components/BarBottom.vue";

export default {
  name: "Order",
  data() {
    return {
      title: "Orderr",
      msg: "Welcome to my Vue&Boot Order",
    };
  },
  components: {
    BarTop,
    HelloWorld,
  },
};
</script>
