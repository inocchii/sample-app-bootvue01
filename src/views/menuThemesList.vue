<template>
  <div class="themes">
    <BarTop :title="title" backPath="/" backLabel="戻る" />
    <!--
      Router経由での値の受け渡しを this.$route.query.xx で行っている。
      routerでの定義は path: "/themes" とし、routerに対して /themes?catg=xxでパラメータを受ける。
    -->
    <!-- 指定カテゴリでテーマを抽出してリスト -->
    <div class="card-group">
      <p>catg={{ catg }}</p>
      <!-- OUR_THEMESはmixins/notes.jsに定義 -->
      <template
        class="card"
        v-for="theme in OUR_THEMES"
        :id="getAnchorId(theme.id)"
      >
        <div v-if="isTarget(catg, theme)" :key="theme.title">
          <router-link
            class="card text-white bg-dark"
            role="button"
            :to="getPath(theme.catg, theme.title, theme.path)"
          >
            <h6 class="card-header text-left">
              <i :class="getIconChecked(theme.checked)"></i>&nbsp;{{
                theme.title
              }}
            </h6>
            <div class="card-body">
              <div class="card-text text-left">
                {{ theme.words }}
              </div>
            </div>
          </router-link>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BarTop from "@/components/BarTopV2.vue";

export default {
  name: "Themes",
  data() {
    return {
      title: "Themes",
      msg: "Welcome to my Vue&Boot Themes",
      anchorKey: "theme",
      catg: this.$route.query.catg,
    };
  },
  methods: {
    getPath(argCatg, argTitle, argPath) {
      // OUR_THEME_PATH：mixins notes.jsに定義したグローバル定数
      let path = this.OUR_THEME_PATH;
      if ( argPath !== "" ) {
        path = argPath + "&title=" + argTitle;
      } else {
        path = path + "?catg=" + argCatg + "&title=" + argTitle;
      }
      path = path + "&backpath=" + this.$route.path;
      return path;
    },
    getAnchor(argId) {
      return "#" + this.anchorKey + "-" + argId;
    },
    getAnchorId(argId) {
      return this.anchorKey + "-" + argId;
    },
    getIconChecked(argBoo) {
      if (argBoo) {
        return "far fa-check-square";
      } else {
        return "far fa-square";
      }
    },
  },
  computed: {
    isTarget: function () {
      return function (argCatg, argTheme) {
        if (argCatg == "" || argCatg == null) {
          return true;
        } else {
          if (argCatg == argTheme.catg) {
            return true;
          }
        }
        return false;
      };
    },
  },
  components: {
    BarTop,
  },
  props: {},
  /*
  mixins: {
    notes,
  }
  */
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card-group > .card {
  margin-bottom: 0px;
}
/*
.card {
  text-align: left;
}
.card-text {
  font-size: 0.8rem;
  line-height: 1.2;
}
.card-text>h2 {
  font-size: 1.0rem;
}
.card-group > .card {
    margin-bottom: 0px;
}
*/
</style>
