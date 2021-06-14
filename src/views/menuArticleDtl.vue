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
    <ArticleBigSearch v-if="this.$route.query.catg === 'BigSearch'" />
    <ArticleBluetooth v-if="this.$route.query.catg === 'Bluetooth'" />
    <ArticleColorme v-if="this.$route.query.catg === 'Colorme'" />
    <ArticleCordova v-if="this.$route.query.catg === 'Cordova'" />
    <ArticleFileVersion v-else-if="this.$route.query.catg === 'FileVersion'" />
    <ArticleLogin v-if="this.$route.query.catg === 'Login'" />
    <ArticleMap v-if="this.$route.query.catg === 'Map'" />
    <ArticleMiniMaster v-else-if="this.$route.query.catg === 'MiniMaster'" />
    <ArticleMiniSearch v-if="this.$route.query.catg === 'MiniSearch'" />
    <ArticlePayment v-if="this.$route.query.catg === 'Payment'" />
    <ArticlePushSend v-if="this.$route.query.catg === 'PushSend'" />
    <ArticleWordpress v-if="this.$route.query.catg === 'Wordpress'" />
    <div v-else>category not defined ({{ this.$route.query.catg }})</div>
  </div>
</template>

<script>
// @ is an alias to /src
import BarTop from "@/components/BarTopV2.vue";
import ArticleBigSearch from "@/components/articles/ArticleBigSearch.vue";
import ArticleBluetooth from "@/components/articles/ArticleBluetooth.vue";
import ArticleColorme from "@/components/articles/ArticleColorme.vue";
import ArticleCordova from "@/components/articles/ArticleCordova.vue";
import ArticleFileVersion from "@/components/articles/ArticleFileVersion.vue";
import ArticleLogin from "@/components/articles/ArticleLogin.vue";
import ArticleMap from "@/components/articles/ArticleMap.vue";
import ArticleMiniMaster from "@/components/articles/ArticleMiniMaster.vue";
import ArticleMiniSearch from "@/components/articles/ArticleMiniSearch.vue";
import ArticlePayment from "@/components/articles/ArticlePayment.vue";
import ArticlePushSend from "@/components/articles/ArticlePushSend.vue";
import ArticleWordpress from "@/components/articles/ArticleWordpress.vue";

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
    ArticleBigSearch,
    ArticleBluetooth,
    ArticleColorme,
    ArticleCordova,
    ArticleFileVersion,
    ArticleLogin,
    ArticleMap,
    ArticleMiniMaster,
    ArticleMiniSearch,
    ArticlePayment,
    ArticlePushSend,
    ArticleWordpress,
  },
};
</script>
