import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import NewsList from "../views/menuNewsList.vue";
import ArticleDtl from "../views/menuArticleDtl.vue";
import ThemesDtl from "../views/menuThemesDtl.vue";
import ThemesList from "../views/menuThemesList.vue";
import Order from "../views/Order.vue";
import Item from "../views/Item.vue";
import Search from "../views/Search.vue";
import Others from "../views/Others.vue";
import OuterSite from "../views/OuterSite.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/newslist", // ?xxx=yyyで受けて見る
    name: "NewsList",
    component: NewsList,
    props: true, // propsを有効化
  },
  {
    path: "/articledtl", // ?xxx=yyyで受けて見る
    name: "ArticleDtl",
    component: ArticleDtl,
    props: true, // propsを有効化
  },
  {
    path: "/themesdtl", // ?xxx=yyyで受けて見る
    name: "ThemesDtl",
    component: ThemesDtl,
    props: true, // propsを有効化
  },
  {
    path: "/themeslist", // ?xxx=yyyで受けて見る
    name: "ThemesList",
    component: ThemesList,
    props: true, // propsを有効化
  },
  {
    path: "/order/:id", // :id 動的セグメント
    name: "Order",
    component: Order,
    props: true, // propsを有効化
  },
  {
    path: "/item/:id", // :id 動的セグメント
    name: "Item",
    component: Item,
    props: true, // propsを有効化
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
    props: true, // propsを有効化
  },
  {
    path: "/others",
    name: "Others",
    component: Others,
    props: true, // propsを有効化
  },
  {
    path: "/outer",
    name: "OuterSite",
    component: OuterSite,
    props: true, // propsを有効化
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/tab",
    name: "HomeWithTab",
    component: Home,
    props: true, // propsを有効化
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    props: true, // propsを有効化
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
