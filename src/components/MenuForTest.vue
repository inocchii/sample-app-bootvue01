<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- L1-1 トップメニュー（タブ型） -->
    <div class="p-1">
      <div class="">
        ★タブ BootstrapVue tab={{ this.tabIndex }} tabNm={{
          this.tabs[this.tabIndex]
        }}
      </div>
      <!-- Nav tabs -->
      <b-tabs content-class="mt-3" v-model="tabIndex">
        <b-tab title="Home" :active="getActiveOrNot('Home')">
          <ul id="list1-1" class="list-group list-group-flush">
            <li class="list-group-item d-flex justify-content-between">
              Theme<small>subjectごとのtheme</small>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              Point<small>subject内での解決課題</small>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              Task<small>subject内でのタスク</small>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              Link<small>subjectに関連するリンク</small>
            </li>
          </ul>
        </b-tab>
        <!-- テーマタブ：コンポーネントThemesVueに記述 -->
        <b-tab title="Theme" :active="getActiveOrNot('Theme')">
          <p>以下は配列(themes)から読み込んでいる</p>
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
        <!-- タスクタブ：配列から -->
        <b-tab title="Task" :active="getActiveOrNot('Task')">
          <p>以下は配列(tasks)から読み込んでいる</p>
          <router-link
            class="card text-white bg-dark"
            role="button"
            v-for="task in tasks"
            :key="task.title"
            :to="getPath(task.path, task.title)"
          >
            <div class="card-body">
              <h4 class="card-title">{{ task.title }}</h4>
              <p class="card-text">{{ task.words }}</p>
            </div>
          </router-link>
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
            <div class="card col-6" @click="setTabIndexByNm('Task')">
              タブ指定<br />setTabIndexNm('Task')
            </div>
            <div class="card col-6" @click="setTabIndexByNm('Links')">
              タブ指定<br />setTabIndexNm('Links')
            </div>
          </div>
        </b-tab>
        <!-- リンクタブ：コンポーネントから -->
        <b-tab title="Links" :active="getActiveOrNot('Links')">
          <LinksVue msg="links in tab" />
        </b-tab>
      </b-tabs>
    </div>
    <!-- L1-2 リスト型（メインメニューのみで表示） -->
    <div class="p-1" v-if="tabIndex === 0">
      <div class="">★外部サイト</div>
      <OuterSites msg="outer links" />
    </div>
    <!-- L1-2 リスト型（メインメニューのみで表示） -->
    <div class="p-1" v-if="tabIndex === 0">
      <div class="">★リンクリスト</div>
      <div id="list1-2" class="list-group">
        <a href="#list1-2" class="list-group-item list-group-item-action active"
          >リンクリスト</a
        >
        <a href="#myTab" class="list-group-item list-group-item-action"
          >タブ型</a
        >
        <a href="#myScroll" class="list-group-item list-group-item-action"
          >カード（横スクロール）</a
        >
        <a href="#myCards" class="list-group-item list-group-item-action"
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
  data() {
    return {
      // activeIndex: 0,
      // タブインデックス（タブの場所）
      tabIndex: 0,
      // タブ名の配列（タブ名指定に使用）
      tabs: ["Home", "Theme", "Point", "Task", "Menu", "Links"],
      // コンテンツ（タスク一覧）
      themes: [
        {
          path: "/themes?id=Env",
          title: "Environment",
          words: "Bootstrap＆Vueの開発環境",
        },
        {
          path: "/themes?id=Basic",
          title: "Basic",
          words: "Bootstrap＆VueでのBasicなHTML5/CSS表現",
        },
        {
          path: "/themes?id=Boot",
          title: "Boot",
          words: "Bootstrap＆VueでのBootstrap表現",
        },
        {
          path: "/themes?id=JavaScript",
          title: "JavaScript",
          words: "Bootstrap＆VueでのJavaScript使用",
        },
        {
          path: "/themes?id=jQuery",
          title: "jQuery",
          words: "Bootstrap＆VueでのjQuery使用について",
        },
        { path: "/themes?id=Data", title: "Data", words: "データ保持について" },
        {
          path: "/themes?id=Ajax",
          title: "Ajax",
          words: "Bootstrap＆VueでのAjax使用について",
        },
        {
          path: "/themes?id=Vue",
          title: "Vue",
          words: "Bootstrap＆VueでのVue基本",
        },
        {
          path: "/themes?id=Router",
          title: "Router",
          words: "Bootstrap＆VueでのRouter使用",
        },
        {
          path: "/themes?id=Vuex",
          title: "Vuex",
          words: "Bootstrap＆VueでのVuex使用",
        },
      ],
      // コンテンツ（タスク一覧）
      tasks: [
        {
          path: "/tasks/Basic",
          title: "Basic",
          words: "Bootstrap＆VueでのBasicなHTML5/CSS表現",
        },
        {
          path: "/tasks/Boot",
          title: "Boot",
          words: "Bootstrap＆VueでのBootstrap表現",
        },
        {
          path: "/tasks/Vue",
          title: "Vue",
          words: "Bootstrap＆VueでのVue基本",
        },
        {
          path: "/tasks/Router",
          title: "Router",
          words: "Bootstrap＆VueでのRouter使用",
        },
        {
          path: "/tasks/Vuex",
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
          path: "/tab?menuid=Task",
          title: "Tasks",
          icon: "far fa-check-square",
        },
        { path: "/tab?menuid=Menu", title: "Menus", icon: "fas fa-bars" },
        { path: "/tab?menuid=Links", title: "Links", icon: "fas fa-link" },
      ],
    };
  },
  mounted() {
    console.log("mounted");
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
