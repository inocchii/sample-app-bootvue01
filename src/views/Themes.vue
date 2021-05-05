<template>
  <div class="themes">
    <BarTop :title="title" backPath="/" backLabel="戻る" />
    <!--
      Router経由での値の受け渡しを this.$route.query.xx で行っている。
      routerでの定義は path: "/themes" とし、routerに対して /themes?id=xx&title=yyでパラメータを受ける。
    -->
    <p>this.$route.query.xxで値を受け取っている</p>
    <div>
      this.$route.query.id={{ this.$route.query.id }} query.title={{
        this.$route.query.title
      }}
    </div>
    <div>{{ this.$route.params.id }}</div>
    <div v-if="this.$route.query.id === 'Env'">Vue＆Bootstrap開発環境</div>
    <ThemesBasic v-if="this.$route.query.id === 'Basic'" />
    <ThemesBoot v-if="this.$route.query.id === 'Boot'" />
    <ThemesJQuery v-if="getTemplate === 'JQuery'" />
    <ThemesData v-if="getTemplate === 'Data'" />
    <ThemesVue v-if="this.$route.query.id === 'Vue'" />
    <div v-if="this.$route.query.id === 'Vuex'">Vuex</div>
    <div v-if="this.$route.query.id === 'Router'">Router</div>
  </div>
</template>

<script>
// @ is an alias to /src
import BarTop from "@/components/BarTopV2.vue";
import ThemesBasic from "@/components/ThemesBasic.vue";
import ThemesBoot from "@/components/ThemesBoot.vue";
import ThemesJQuery from "@/components/ThemesJQuery.vue";
import ThemesData from "@/components/ThemesData.vue";
import ThemesVue from "@/components/ThemesVue.vue";

export default {
  name: "Themes",
  data() {
    return {
      title: "Themes",
      msg: "Welcome to my Vue&Boot Themes",
    };
  },
  computed: {
    getTemplate() {
      if (this.$route.query.id == "JavaScript") {
        return "JQuery";
      } else if (this.$route.query.id == "jQuery") {
        return "JQuery";
      } else if (this.$route.query.id == "Ajax") {
        return "Data";
      } else {
        return this.$route.query.id;
      }
    },
  },
  components: {
    BarTop,
    ThemesBasic,
    ThemesBoot,
    ThemesJQuery,
    ThemesData,
    ThemesVue,
  },
};
</script>
