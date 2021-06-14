<template>
  <div class="hello">
    <!-- L1-1 トップメニュー（タブ型） -->
    <div class="p-1" id="homeTab">
      <div class="small">
        {{ msg }} tab={{ this.tabIndex }} tabNm={{ this.tabs[this.tabIndex] }}
      </div>
      <!-- Nav tabs -->
      <b-tabs content-class="mt-3" v-model="tabIndex">
        <b-tab title="Home" :active="getActiveOrNot('Home')">
          <p>TODO リスト</p>
          <ul id="list1-1" class="list-group list-group-flush">
            <li v-for="todo in todos" :key="todo.title" class="list-group-item d-flex justify-content-between">
              <router-link v-if="todo.path>''" :to="todo.path">{{ todo.title }}</router-link>
              <div v-else>{{ todo.title }}</div>
              <small>{{ todo.words }}</small>
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
        <!--
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
        -->
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
      // コンテンツ（TODO一覧）
      todos: [
        {
          path: "/articledtl?catg=Payment",
          title: "□ 決済サービス検討",
          words: "決済サービスとのAPI連携",
        },
        {
          path: "/articledtl?catg=Colorme&title=Colorme",
          title: "□ Shop連携",
          words: "Color me shop 連携",
        },
        {
          path: "/articledtl?catg=Map",
          title: "■ 地図",
          words: "GoogleMap対応",
        },
        {
          path: "",
          title: "□ 画像",
          words: "参照 / キャッシュ / オフライン(ファイルプラグイン)",
        },
        {
          path: "",
          title: "□ Card Style",
          words: "NewsをCard整形",
        },
        {
          path: "",
          title: "□ Instagram",
          words: "Insta記事をAPIで取ってくる",
        },
        {
          path: "",
          title: "□ Youtube",
          words: "Youtube動画を表示する",
        },
        {
          path: "/articledtl?catg=Wordpress",
          title: "■ Wordpress",
          words: "記事をAPIで取ってくる",
        },
        {
          path: "",
          title: "□ 実機でのデバッグ",
          words: "スマホで動作検証を行う",
        },
        {
          path: "/articledtl?catg=Cordova",
          title: "□ Cordovaプラグイン",
          words: "スマホネイティブ機能",
        },
        {
          path: "/articledtl?catg=Bluetooth",
          title: "□ Bluetoothで周辺機器",
          words: "Web Bluetooth API",
        },
        {
          path: "/articledtl?catg=PushSend",
          title: "□ Push通知",
          words: "ニフクラを使ったPush通知",
        },
        {
          path: "",
          title: "□ 注文入力（リスト）",
          words: "リスト → 選択入力 → 登録",
        },
        {
          path: "",
          title: "□ 注文入力（複数件）",
          words: "入力 → プール → 登録",
        },
        {
          path: "",
          title: "□ 注文入力（１件）",
          words: "入力 即 登録",
        },
        {
          path: "/articledtl?catg=Login",
          title: "■ ログイン",
          words: "ログイン＆ユーザ管理について整理",
        },
        {
          path: "/articledtl?catg=MiniSearch",
          title: "■ 検索と並べ替え",
          words: "条件抽出と並べ替え",
        },
        {
          path: "/themesdtl?catg=Database",
          title: "■ データベース",
          words: "sqlite 使用について整理",
        },
        {
          path: "",
          title: "□ 大量マスタ（CSV）",
          words: "省パケット省メモリ",
        },
        {
          path: "/articledtl?catg=BigSearch",
          title: "■ 大量マスタ（JSON）",
          words: "限界の確認",
        },
        {
          path: "/articledtl?catg=MiniMaster",
          title: "■ 少量マスタ",
          words: "Ajax＆Vuex＆LocalStorage",
        },
        {
          path: "/articledtl?catg=FileVersion",
          title: "■ 情報のバージョン管理",
          words: "入替の仕組み",
        },
        {
          path: "/themesdtl?catg=JavaScript",
          title: "■ グローバル定数/変数",
          words: "Vuex、Mixins等",
        },
        {
          path: "/articledtl?catg=MiniSearch",
          title: "■ Ajax(Axios)",
          words: "Ajax部分をコンパクトに",
        },
        {
          path: "/themesdtl?catg=Ajax",
          title: "■ Ajax",
          words: "Ajaxの試験",
        },
        {
          path: "",
          title: "□ Ajax(PHP)",
          words: "PHP側Ajaxプログラムパターン",
        },
      ],
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
      /*
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
      */
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
