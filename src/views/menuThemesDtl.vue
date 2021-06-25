<template>
  <div class="themes">
    <!--
    <BarTop :title="title" :backPath="backPath" backLabel="戻る" />
    -->
    <BarTop :title="title" backLabel="戻る" />
    <!--
      Router経由での値の受け渡しを this.$route.query.xx で行っている。
      routerでの定義は path: "/themes" とし、routerに対して /themes?id=xx&title=yyでパラメータを受ける。
    -->
    <div>
      catg={{ this.$route.query.catg }} title={{ this.$route.query.title }}
    </div>
    <ThemesAjax v-if="getTemplate === 'Ajax'" />
    <ThemesBasic v-else-if="getTemplate === 'Basic'" />
    <ThemesData v-else-if="getTemplate === 'Data'" />
    <ThemesDatabase v-else-if="getTemplate === 'Database'" />
    <ThemesEnv v-else-if="getTemplate === 'Env'" />
    <ThemesJS v-else-if="getTemplate === 'JS'" />
    <ThemesJSON v-else-if="getTemplate === 'JSON'" />
    <ThemesLocalStorage v-else-if="getTemplate === 'LocalStorage'" />
    <ThemesNetwork v-else-if="getTemplate === 'Network'" />
    <ThemesRule v-else-if="getTemplate === 'Rule'" />
    <ThemesVue v-else-if="getTemplate === 'Vue'" />
    <div v-else-if="this.$route.query.catg === 'Vuex'">Vuex</div>
    <div v-else-if="this.$route.query.catg === 'Router'">Router</div>
    <div v-else>category not defined ({{ this.$route.query.catg }})</div>
  </div>
</template>

<script>
// @ is an alias to /src
import BarTop from "@/components/BarTopV2.vue";
import ThemesAjax from "@/components/themes/ThemesAjax.vue";
import ThemesBasic from "@/components/themes/ThemesBasic.vue";
import ThemesData from "@/components/themes/ThemesData.vue";
import ThemesDatabase from "@/components/themes/ThemesDatabase.vue";
import ThemesEnv from "@/components/themes/ThemesEnv.vue";
import ThemesJS from "@/components/themes/ThemesJS.vue";
import ThemesJSON from "@/components/themes/ThemesJSON.vue";
import ThemesLocalStorage from "@/components/themes/ThemesLocalStorage.vue";
import ThemesNetwork from "@/components/themes/ThemesNetwork.vue";
import ThemesRule from "@/components/themes/ThemesRule.vue";
import ThemesVue from "@/components/themes/ThemesVue.vue";

export default {
  name: "Themes",
  data() {
    return {
      title: "Themes",
      msg: "Welcome to my Vue&Boot Themes",
      //backPath: this.$route.query.backpath,
    };
  },
  computed: {
    getTemplate() {
      if (this.$route.query.catg == "Ajax") {
        return "Ajax";
      } else if (this.$route.query.catg == "BootVue") {
        return "Basic";
      } else if (this.$route.query.catg == "Data") {
        return "Data";
      } else if (this.$route.query.catg == "Database") {
        return "Database";
      } else if (this.$route.query.catg == "Env") {
        return "Env";
      } else if (this.$route.query.catg == "HTML") {
        return "Basic";
      } else if (this.$route.query.catg == "JavaScript") {
        return "JS";
      } else if (this.$route.query.catg == "jQuery") {
        return "JS";
      } else if (this.$route.query.catg == "JSON") {
        return "JSON";
      } else if (this.$route.query.catg == "LocalStorage") {
        return "LocalStorage";
      } else if (this.$route.query.catg == "Network") {
        return "Network";
      } else if (this.$route.query.catg == "Vue") {
        return "Vue";
      } else {
        return this.$route.query.catg;
      }
    },
  },
  components: {
    BarTop,
    ThemesAjax,
    ThemesBasic,
    ThemesData,
    ThemesDatabase,
    ThemesEnv,
    ThemesJSON,
    ThemesJS,
    ThemesLocalStorage,
    ThemesNetwork,
    ThemesRule,
    ThemesVue,
  },
};
</script>
