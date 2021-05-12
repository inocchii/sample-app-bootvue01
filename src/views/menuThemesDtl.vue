<template>
  <div class="themes">
    <BarTop :title="title" backPath="/" backLabel="戻る" />
    <!--
      Router経由での値の受け渡しを this.$route.query.xx で行っている。
      routerでの定義は path: "/themes" とし、routerに対して /themes?id=xx&title=yyでパラメータを受ける。
    -->
    <div>
      catg={{ this.$route.query.catg }} title={{ this.$route.query.title }}
    </div>
    <div v-if="this.$route.query.catg === 'Env'">Vue＆Bootstrap開発環境</div>
    <ThemesRule v-else-if="getTemplate === 'Rule'" />
    <ThemesBasic v-else-if="getTemplate === 'Basic'" />
    <ThemesJS v-else-if="getTemplate === 'JS'" />
    <ThemesData v-else-if="getTemplate === 'Data'" />
    <ThemesLocalStorage v-else-if="getTemplate === 'LocalStorage'" />
    <ThemesDatabase v-else-if="getTemplate === 'Database'" />
    <ThemesJSON v-else-if="getTemplate === 'JSON'" />
    <ThemesAjax v-else-if="getTemplate === 'Ajax'" />
    <ThemesVue v-else-if="getTemplate === 'Vue'" />
    <div v-else-if="this.$route.query.catg === 'Vuex'">Vuex</div>
    <div v-else-if="this.$route.query.catg === 'Router'">Router</div>
    <div v-else>category not defined ({{ this.$route.query.catg }})</div>
  </div>
</template>

<script>
// @ is an alias to /src
import BarTop from "@/components/BarTopV2.vue";
import ThemesBasic from "@/components/themes/ThemesBasic.vue";
import ThemesJS from "@/components/themes/ThemesJS.vue";
import ThemesData from "@/components/themes/ThemesData.vue";
import ThemesLocalStorage from "@/components/themes/ThemesLocalStorage.vue";
import ThemesDatabase from "@/components/themes/ThemesDatabase.vue";
import ThemesJSON from "@/components/themes/ThemesJSON.vue";
import ThemesAjax from "@/components/themes/ThemesAjax.vue";
import ThemesVue from "@/components/themes/ThemesVue.vue";
import ThemesRule from "@/components/themes/ThemesRule.vue";

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
      if (this.$route.query.catg == "HTML") {
        return "Basic";
      } else if (this.$route.query.catg == "BootVue") {
        return "Basic";
      } else if (this.$route.query.catg == "Vue") {
        return "Vue";
      } else if (this.$route.query.catg == "JavaScript") {
        return "JS";
      } else if (this.$route.query.catg == "jQuery") {
        return "JS";
      } else if (this.$route.query.catg == "Data") {
        return "Data";
      } else if (this.$route.query.catg == "LocalStorage") {
        return "LocalStorage";
      } else if (this.$route.query.catg == "Database") {
        return "Database";
      } else if (this.$route.query.catg == "JSON") {
        return "JSON";
      } else if (this.$route.query.catg == "Ajax") {
        return "Ajax";
      } else {
        return this.$route.query.catg;
      }
    },
  },
  components: {
    BarTop,
    ThemesBasic,
    ThemesData,
    ThemesLocalStorage,
    ThemesDatabase,
    ThemesJSON,
    ThemesAjax,
    ThemesJS,
    ThemesRule,
    ThemesVue,
  },
};
</script>
