<template>
  <!-- L1-1 ナビゲーションバー -->
  <!--
  <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
  -->
  <div class="container">
    <div class="header">
      <!-- サイドメニューON/OFF -->
      <input
        type="checkbox"
        class="openSidebarMenu"
        id="openSidebarMenu"
        v-model="sidebarChecked"
      />
      <label for="openSidebarMenu" class="sidebarIconToggle">
        <div class="spinner diagonal part-1"></div>
        <div class="spinner horizontal"></div>
        <div class="spinner diagonal part-2"></div>
      </label>
      <!-- サイドバー本体 -->
      <div id="sidebarMenu" @click="onAndOffSidebar">
        <ul class="sidebarMenuInner">
          <li>Vue＆Bootstrap<span>サンプルメニュー</span></li>
          <li v-for="menu in menus" :key="menu.title">
            <router-link :to="menu.path">{{ menu.title }}</router-link>
          </li>
        </ul>
      </div>
      <!-- タイトル -->
      <div class="navbar-brand">{{ title }}({{ sidebarChecked }})</div>
    </div>
    <div style="height: 42px; color: #eee">BarTop 余白42px</div>
  </div>
  <!--
  </nav>
  -->
</template>

<script>
export default {
  name: "BarTop",
  data() {
    return {
      // サイドバーOn/Off
      sidebarChecked: false,
      // コンテンツ（サイドメニュー一覧）
      menus: [
        { path: "/tab?menuid=Home", title: "Home", icon: "fas fa-home" },
        {
          path: "/tab?menuid=Theme",
          title: "Themes",
          icon: "far fa-sticky-note",
        },
        {
          path: "/tab?menuid=Theme",
          title: "Themes",
          icon: "far fa-sticky-note",
        },
        {
          path: "/tab?menuid=Task",
          title: "Tasks",
          icon: "far fa-check-square",
        },
        { path: "/tab?menuid=Menu", title: "Menus", icon: "fas fa-bars" },
        { path: "/tab?menuid=Links", title: "Links", icon: "fas fa-link" },
        { path: "/order/scan", title: "発注", icon: "fas fa-edit" },
        { path: "/item/list", title: "商品", icon: "fas fa-database" },
        {
          path: "/search",
          title: "検索",
          icon: "fas fa-search",
        },
        {
          path: "/others",
          title: "その他",
          icon: "fas fa-ellipsis-h",
        },
      ],
    };
  },
  computed: {},
  methods: {
    onAndOffSidebar() {
      this.sidebarChecked = !this.sidebarChecked;
    },
  },
  props: {
    title: String,
  },
};
</script>
<style lang="scss">
div.container {
  padding: 0px 0px;
}
.header {
  display: block;
  margin: 0 auto;
  width: 100%;
  max-width: 100%;
  box-shadow: none;
  /* background-color: #FC466B; */
  background-color: #eee;
  position: fixed;
  height: 42px !important;
  overflow: hidden;
  z-index: 10;
}
#sidebarMenu {
  height: 100%;
  position: fixed;
  left: 0;
  /* width: 250px; */
  margin-top: 42px;
  transform: translateX(-250px);
  transition: transform 250ms ease-in-out;
  /* background: linear-gradient(180deg, #FC466B 0%, #3F5EFB 100%); */
  background: linear-gradient(180deg, #eee 0%, #ddd 100%);
}
.sidebarMenuInner {
  margin: 0;
  padding: 0;
  border-top: 1px solid rgba(200, 200, 200, 0.1);
}
.sidebarMenuInner li {
  list-style: none;
  /* color: #fff; */
  color: #333;
  /* text-transform: uppercase; */
  font-weight: bold;
  padding: 8px;
  cursor: pointer;
  border-bottom: 1px solid rgba(200, 200, 200, 0.1);
}
.sidebarMenuInner li span {
  display: block;
  font-size: 14px;
  /* color: rgba(255, 255, 255, 0.50); */
  color: #555;
}
.sidebarMenuInner li a {
  /* color: #fff; */
  color: #333;
  /* text-transform: uppercase; */
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
}
input[type="checkbox"]:checked ~ #sidebarMenu {
  transform: translateX(0);
}

input[type="checkbox"] {
  transition: all 0.3s;
  box-sizing: border-box;
  display: none;
}
.sidebarIconToggle {
  transition: all 0.3s;
  box-sizing: border-box;
  cursor: pointer;
  position: absolute;
  z-index: 99;
  height: 100%;
  width: 100%;
  top: 15px;
  left: 15px;
  height: 22px;
  width: 22px;
}
.spinner {
  transition: all 0.3s;
  box-sizing: border-box;
  position: absolute;
  height: 3px;
  width: 100%;
  /* background-color: #fff; */
  background-color: #333;
}
.horizontal {
  transition: all 0.3s;
  box-sizing: border-box;
  position: relative;
  float: left;
  margin-top: 3px;
}
.diagonal.part-1 {
  position: relative;
  transition: all 0.3s;
  box-sizing: border-box;
  float: left;
}
.diagonal.part-2 {
  transition: all 0.3s;
  box-sizing: border-box;
  position: relative;
  float: left;
  margin-top: 3px;
}
input[type="checkbox"]:checked ~ .sidebarIconToggle > .horizontal {
  transition: all 0.3s;
  box-sizing: border-box;
  opacity: 0;
}
input[type="checkbox"]:checked ~ .sidebarIconToggle > .diagonal.part-1 {
  transition: all 0.3s;
  box-sizing: border-box;
  transform: rotate(135deg);
  margin-top: 8px;
}
input[type="checkbox"]:checked ~ .sidebarIconToggle > .diagonal.part-2 {
  transition: all 0.3s;
  box-sizing: border-box;
  transform: rotate(-135deg);
  margin-top: -9px;
}

#rightsideButton {
  top: 15px;
  right: 15px;
}
</style>
