<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- L1-1 トップメニュー（タブ型） -->
    <div class="p-1" id="homeTab">
      <div class="">
        ★タブ BootstrapVue tab={{ this.tabIndex }} tabNm={{
          this.tabs[this.tabIndex]
        }}
      </div>
      <!-- Nav tabs -->
      <b-tabs content-class="mt-3" v-model="tabIndex">
        <b-tab title="Home" :active="getActiveOrNot('Home')">
          <p>TODO リスト</p>
          <ul id="list1-1" class="list-group list-group-flush">
            <li class="list-group-item d-flex justify-content-between">
              <router-link to="/articledtl?catg=MiniMaster">
              少量マスタ</router-link><small>Ajax＆Vuex＆LocalStorageによる少量マスタ保持</small>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              <router-link to="/articledtl?catg=FileVersion">
              ファイルのバージョン管理</router-link><small>ファイル入れ替えの仕組み</small>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              検索<small>computedを使った抽出</small>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              Ajax(Axios)<small>Ajax部分をコンパクトに</small>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              Ajax(PHP)<small>PHP側Ajaxプログラムパターン</small>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              News by DB<small>Newsリストをデータベースで</small>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              News by Ajax<small>NewsテーブルをAjaxで入れ替え</small>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              Style<small>NewsをHomeにCard整形して表示</small>
            </li>
          </ul>
        </b-tab>
        <!-- テーマタブ：配列(themes)に記述 -->
        <b-tab title="Theme" :active="getActiveOrNot('Theme')">
          <router-link
            class="card text-white bg-dark"
            role="button"
            v-for="theme in themes"
            :key="theme.title"
            :to="getPath(theme.path, theme.title, '&')"
          >
            <div class="card-body">
              <h4 class="card-title">{{ theme.title }}</h4>
              <p class="card-text">{{ theme.words }}</p>
            </div>
          </router-link>
        </b-tab>
        <!-- 課題タブ：コンポーネントPointsVueに記述 -->
        <b-tab title="Point" :active="getActiveOrNot('Point')">
          <PointsVue msg="Points in tab" />
        </b-tab>
        <!-- メニュータブ：配列から -->
        <b-tab title="Menu" :active="getActiveOrNot('Menu')">
          <div class="row">
            <router-link
              class="card col-4 text-white bg-info"
              role="button"
              v-for="menu in menus"
              :key="menu.title"
              :to="menu.path"
            >
              <div class="card-body">
                <h6 class="card-title">{{ menu.title }}</h6>
                <i :class="menu.icon"></i>
              </div>
            </router-link>
          </div>
          <div class="row">
            <div class="card col-6" @click="setTabIndex(0)">
              タブ指定<br />setTabIndex(0)
            </div>
            <div class="card col-6" @click="setTabIndex(1)">
              タブ指定<br />setTabIndex(1)
            </div>
            <div class="card col-6" @click="setTabIndexByNm('Theme')">
              タブ指定<br />setTabIndexNm('Theme')
            </div>
            <div class="card col-6" @click="setTabIndexByNm('Point')">
              タブ指定<br />setTabIndexNm('Point')
            </div>
          </div>
        </b-tab>
        <!-- Newsタブ：配列(news)に記述 → Databaseに → Ajaxで -->
        <b-tab title="News" :active="getActiveOrNot('News')">
          <p>以下は配列(News)から読み込んでいる</p>
          <router-link
            class="card text-white bg-dark"
            role="button"
            v-for="article in news"
            :key="article.title"
            :to="getPath(article.path, article.title, '&')"
          >
            <div class="card-body">
              <h4 class="card-title">{{ article.title }}</h4>
              <p class="card-text">{{ article.words }}</p>
            </div>
          </router-link>
        </b-tab>
        <!-- リンクタブ：コンポーネントから -->
        <b-tab title="Links" :active="getActiveOrNot('Links')">
          <LinksVue msg="links in tab" />
        </b-tab>
      </b-tabs>
    </div>
    <!-- L1-2 リスト型（メインメニューのみで表示） -->
    <div class="p-1" id="homeLinkList" v-if="tabIndex === 0">
      <div class="">★外部サイト</div>
      <OuterSites msg="outer links" />
    </div>
    <!-- L1-2 リスト型（メインメニューのみで表示） -->
    <div class="p-1" v-if="tabIndex === 0">
      <div class="">★パターンリスト</div>
      <div id="list1-2" class="list-group">
        <a href="#homeTab" class="list-group-item list-group-item-action"
          >タブへ</a
        >
        <a
          href="#homeTab"
          @click="setTabIndexByNm('Theme')"
          class="list-group-item list-group-item-action"
          >タブ指定(Themeタブ)</a
        >
        <a href="#homeLinkList" class="list-group-item list-group-item-action"
          >リンクリスト</a
        >
        <a href="#homeScroll" class="list-group-item list-group-item-action"
          >カード（横スクロール）</a
        >
        <a href="#homeCards" class="list-group-item list-group-item-action"
          >カード各種</a
        >
      </div>
    </div>
    <img alt="Vue logo" src="@/assets/logo.png" v-if="tabIndex === 0" />
  </div>
</template>

<script>
import PointsVue from "@/components/PointsVue.vue";
import LinksVue from "@/components/LinksVue.vue";
import OuterSites from "@/components/OuterSites.vue";
export default {
  name: "MenuForTest",
  created() {
    // tab位置がvuexのTABINDEXESに保存されていれば復元
    if (this.$store.state.TABINDEXES["MenuForTest"]) {
      this.tabIndex = this.$store.state.TABINDEXES["MenuForTest"];
    }
  },
  mounted() {
    console.log("mounted id=" + this.$route.query.menuid);
  },
  data() {
    return {
      // activeIndex: 0,
      // タブインデックス（タブの場所）
      tabIndex: 0,
      // タブ名の配列（タブ名指定に使用）
      tabs: ["Home", "Theme", "Point", "Menu", "News", "Links"],
      // コンテンツ（テーマ一覧）
      themes: [
        {
          path: "/themeslist?catg=",
          title: "全て",
          words: "テーマ一覧",
        },
        {
          path: "/themeslist?catg=Env",
          title: "Environment",
          words: "Bootstrap＆Vueの開発環境",
        },
        {
          path: "/themeslist?catg=Rule",
          title: "Rules",
          words: "プロジェクトルールの設定",
        },
        {
          path: "/themeslist?catg=Vue",
          title: "Vue",
          words: "Bootstrap＆VueでのVue基本",
        },
        {
          path: "/themeslist?catg=Basic",
          title: "Basic",
          words: "Bootstrap＆VueでのHTML5/CSS/Bootstrap",
        },
        {
          path: "/themeslist?catg=JavaScript",
          title: "JavaScript＆jQuery",
          words: "Bootstrap＆VueでのJavaScript使用",
        },
        {
          path: "/themeslist?catg=Data",
          title: "Data",
          words: "データ保持について",
        },
        {
          path: "/themeslist?catg=LocalStorage",
          title: "LocalStorage",
          words: "LocalStorageについて",
        },
        {
          path: "/themeslist?catg=Database",
          title: "Database",
          words: "Databaseについて",
        },
        {
          path: "/themeslist?catg=JSON",
          title: "JSON",
          words: "JSONの整理",
        },
        {
          path: "/themeslist?catg=Ajax",
          title: "Ajax",
          words: "Bootstrap＆VueでのAjax使用について",
        },
        {
          path: "/themeslist?catg=Vue",
          title: "Router",
          words: "Bootstrap＆VueでのRouter使用",
        },
        {
          path: "/themeslist?catg=Vue",
          title: "Vuex",
          words: "Bootstrap＆VueでのVuex使用",
        },
      ],
      // コンテンツ（メニュー一覧）
      menus: [
        { path: "/tab?menuid=Home", title: "Home", icon: "fas fa-home" },
        {
          path: "/tab?menuid=Theme",
          title: "Themes",
          icon: "far fa-sticky-note",
        },
        {
          path: "/tab?menuid=Point",
          title: "Points",
          icon: "far fa-check-square",
        },
        {
          path: "/tab?menuid=News",
          title: "News",
          icon: "far fa-check-square",
        },
        { path: "/tab?menuid=Menu", title: "Menus", icon: "fas fa-bars" },
        { path: "/tab?menuid=Links", title: "Links", icon: "fas fa-link" },
      ],
      // コンテンツ（テーマ一覧）
      news: [
        {
          path: "/newslist?catg=",
          title: "全て",
          words: "テーマ一覧",
        },
        {
          path: "/newslist?catg=Data",
          title: "Data",
          words: "データ保持について",
        },
      ],
    };
  },
  watch: {
    tabIndex: function () {
      console.log("MenuForTest tabIndex changed :" + this.tabIndex);
      this.$store.commit("setTabIndex", ["MenuForTest", this.tabIndex]);
      console.log(
        "MenuForTest tabIndex keeped to TABINDEXES[MenuForTest] :" +
          this.$store.state.TABINDEXES["MenuForTest"]
      );
    },
  },
  computed: {
    getActiveOrNot: function () {
      // 算出プロパティでは引数を直接受け取れないのでreturn関数で受け取っている
      return function (argTabNm) {
        console.log(
          "argTabNm=" +
            argTabNm +
            " query.menuid=" +
            this.$route.query.menuid +
            " props.menuid=" +
            this.menuid
        );
        return argTabNm === this.$route.query.menuid;
        //return (argTabNm === this.menuid); // propsでうまく受け取れず
      };
    },
  },
  methods: {
    getPath(argPath, argTitle, argConnector = "?") {
      return argPath + argConnector + "title=" + argTitle;
    },
    setMenu(argMenuId) {
      this.menuid = argMenuId;
    },
    // tabIndexの指定により該当タブがactiveに変わる
    setTabIndex(argTabIndex) {
      this.tabIndex = argTabIndex;
    },
    // tabIndexにタブ名をセットすると該当タブがactiveに変わる
    setTabIndexByNm(argTabNm) {
      // 配列tabsに名前を設定しているが、
      // 本来は実際のb-tabから名前とindexを取得したい
      this.tabIndex = this.tabs.indexOf(argTabNm);
    },
    getIconChecked(argBoo) {
      if (argBoo) {
        return "far fa-check-square";
      } else {
        return "far fa-square";
      }
    },
  },
  props: {
    msg: String,
    menuid: String,
  },
  components: {
    PointsVue,
    LinksVue,
    OuterSites,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1 {
  font-size: 1.2rem;
}
h3 {
  margin: 15px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
