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
import common from "./mixins/common.js";
import notes from "./mixins/notes.js";
//var arr=[conf,common,notes]
Vue.mixin(conf); // 複数の読み込みが上手くいかなかった
Vue.mixin(common); // 複数の読み込みが上手くいかなかった
Vue.mixin(notes); // 複数の読み込みが上手くいかなかった

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  //mixins:[conf,common,notes],
  render: (h) => h(App),
}).$mount("#app");
