import Vue from "vue";
import App from "./App.vue";
//import "./registerServiceWorker";
import router from "./router";
import store from "./store";

// BootstrapVue by inok
import BootstrapVue from "bootstrap-vue";
//import 'bootstrap/dist/css/bootstrap.css';  // custom.scssの中で代替取得
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./assets/scss/custom.scss"; // カスタマイズ用
Vue.use(BootstrapVue);

// axios by inok
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

// jquery by inok
//window.jq = window.jQuery = require('jquery')
window.jq = require("jquery");

// mixins
import conf from "./mixins/conf.js";
import consts from "./mixins/consts.js";
import common from "./mixins/common.js";
import notes from "./mixins/notes.js";
import maps from "./mixins/maps.js";
//var arr=[conf,common,notes]
Vue.mixin(conf); // 複数の読み込みが上手くいかなかった
Vue.mixin(consts);  // グローバル定数
Vue.mixin(common); // 共通関数
Vue.mixin(notes); // 複数の読み込みが上手くいかなかった
Vue.mixin(maps); // 複数の読み込みが上手くいかなかった

// global(test用) NG コンポーネント側で上手く使えない
//import { CSample as CSampleGlobal } from "@/components/themes/CSample.js";
//let objSampleGlobal = new CSampleGlobal('sampleGlobal','this is sample global object');
// window.objSampleGlobal は使える
import { CSample as CSampleGlobal } from "@/components/themes/CSample.js";
window.objSampleGlobal = new CSampleGlobal('sampleGlobal','this is sample global object');
import { CCounter } from "@/globals/CCounter.js";
window.objCounter = new CCounter();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  //objSampleGlobal,
  //mixins:[conf,common,notes],
  //Consts,Entities,Vars,
  render: (h) => h(App),
}).$mount("#app");
