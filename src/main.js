import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
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

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
