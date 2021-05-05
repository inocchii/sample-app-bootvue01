<template>
  <div class="home">
    <BarTop :title="title" />
    <MenuForTest :msg="msg" />
    <!-- <BarBottom /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import BarTop from "@/components/BarTop.vue";
//import HelloWorld from "@/components/HelloWorld.vue";
import MenuForTest from "@/components/MenuForTest.vue";
//import BarBottom from "@/components/BarBottom.vue";

export default {
  name: "Home",
  data() {
    return {
      title: "Vue&Bootstrap Testing",
      msg: "Welcome to Vue&Boot Testing",
    };
  },
  components: {
    BarTop,
    MenuForTest,
  },
};
</script>
