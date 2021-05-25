import Vue from "vue";
import Vuex from "vuex";

// axiosやmixinのimportが必要？
// mixins
//import conf from "@/mixins/conf.js";
//import consts from "@/mixins/consts.js";
//import common from "@/mixins/common.js";
//Vue.mixin(conf); // 設定系
//Vue.mixin(consts);  // グローバル定数
//Vue.mixin(common); // 共通関数

// 分割ストア
import vars from "./vars.js";
import entities from "./entities.js";

Vue.use(Vuex);

export default new Vuex.Store({
  //mixins: [conf,consts,common],
  //mixins: {consts},
  modules: {
    vars,
    entities,
  },
  state: {
    /*
    testFlg: false,
    pageCnt: 0
    */
    TABINDEXES: [],
    COUNTS: [],
  },
  getters: {
    getCount(state) {
      return function(argNm) {  // 引数を渡す方法
        return state.COUNTS[argNm];
      }
    }
  },
  mutations: {
    /*
    setTestFlg(state,argFlg) {
      state.testFlg = argFlg;
    },
    addPageCnt() { state.pageCnt++; }
    */
    setTabIndex(state, argArr) {
      console.log("Vuex setTabIndex key=" + argArr[0] + " value=" + argArr[1]);
      state.TABINDEXES[argArr[0]] = argArr[1];
    },
    addCount(state, argArr) {
      console.log("Vuex mutation addCount key=" + argArr[0] + " add=" + argArr[1]);
      if ( state.COUNTS[argArr[0]] ) {
        state.COUNTS[argArr[0]] = state.COUNTS[argArr[0]] + argArr[1];
      } else {
        state.COUNTS[argArr[0]] = argArr[1];
      }
      // 配列更新をリアクティブに反映させるため検知対象のsplice()を実施
      state.COUNTS.splice();
    },
  },
  actions: {
    addCount(context,argArr) {
      console.log("Vuex action addCount key=" + argArr[0]);
      let cnt = 1;
      if ( argArr.length > 1 ) {
        cnt = argArr[1];
      }
      context.commit('addCount',[argArr[0],cnt]);
    }
  },
});
