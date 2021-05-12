import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    /*
    testFlg: false,
    pageCnt: 0
    */
    TABINDEXES: [],
  },
  mutations: {
    /*
    setTestFlg(state,argFlg) {
      state.testFlg = argFlg;
    },
    addPageCnt() { state.pageCnt++; }
    */
    setTabIndex(state, argArr) {
      console.log("Vuex key=" + argArr[0] + " value=" + argArr[1]);
      state.TABINDEXES[argArr[0]] = argArr[1];
    },
  },
  actions: {},
  modules: {},
});
