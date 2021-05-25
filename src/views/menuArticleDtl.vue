<template>
  <div class="article">
    <!--
    <BarTop :title="title" :backPath="backPath" backLabel="戻る" />
    -->
    <BarTop :title="title" backLabel="戻る" />
    <!--
      Router経由での値の受け渡しを this.$route.query.xx で行っている。
      routerでの定義は path: "/articleDtl" とし、routerに対して /articleDtl?id=xx&title=yyでパラメータを受ける。
    -->
    <div>
      catg={{ this.$route.query.catg }} title={{ this.$route.query.title }}
    </div>
    <ArticlePushSend v-if="this.$route.query.catg === 'PushSend'" />
    <ArticleBigSearch v-if="this.$route.query.catg === 'BigSearch'" />
    <ArticleMiniSearch v-if="this.$route.query.catg === 'MiniSearch'" />
    <ArticleMiniMaster v-else-if="this.$route.query.catg === 'MiniMaster'" />
    <ArticleFileVersion v-else-if="this.$route.query.catg === 'FileVersion'" />
    <div v-else>category not defined ({{ this.$route.query.catg }})</div>
  </div>
</template>

<script>
// @ is an alias to /src
import BarTop from "@/components/BarTopV2.vue";
import ArticlePushSend from "@/components/articles/ArticlePushSend.vue";
import ArticleBigSearch from "@/components/articles/ArticleBigSearch.vue";
import ArticleMiniSearch from "@/components/articles/ArticleMiniSearch.vue";
import ArticleMiniMaster from "@/components/articles/ArticleMiniMaster.vue";
import ArticleFileVersion from "@/components/articles/ArticleFileVersion.vue";

export default {
  name: "Themes",
  data() {
    return {
      title: "Articles",
      msg: "Welcome to my Vue&Boot Articles",
      //backPath: this.$route.query.backpath,
    };
  },
  computed: {
  },
  components: {
    BarTop,
    ArticlePushSend,
    ArticleBigSearch,
    ArticleMiniSearch,
    ArticleMiniMaster,
    ArticleFileVersion,
  },
};
</script>
