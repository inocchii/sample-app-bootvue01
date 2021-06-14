// axios (main.jsでのimportではこちらで使用できなかった)
import axios from "axios";
// mixins (axios同様、mixinsはここでのimportも上手く機能せず：！宿題！)
//import conf from "@/mixins/conf.js";
//import consts from "@/mixins/consts.js";
//import common from "@/mixins/common.js";

//export default new Vuex.Store({
const entities = {
    namespaced: true,
    //mixins:[conf,consts,common],
    state: {
        // ユーザ情報
        user_info: null,
        user_info2: null,
        user_info3: null,

        // ファイルバージョンリスト
        file_version_list: null,

        // 分類リスト
        bun_list: null,
        // カテゴリリスト
        catg_list: null,
        // 店舗リスト
        tenpo_list: null,
        // 取引先リスト
        tori_list: null,
        // 商品リスト
        item_list: null,

        // ショップ商品リスト
        shop_item_list: null,
        
        // ログ文字列の格納配列
        log_pool: [],
    },
    getters: {
        // 汎用オブジェクト取得
        getInfo(state) {
            return function(argNm) {
                console.log("entities getters getInfo argNm:"+argNm);
                return state[argNm];
            }
        },
        // 汎用リスト取得
        getList(state) {
            return function(argNm) {
                console.log("entities getters getList argNm:"+argNm);
                return state[argNm];
            }
        },
    },
    mutations: {
        // 汎用リストクリア
        clear(state, argNm) {
            console.log("entities clear name="+argNm);
            state[argNm] = [];
        },
        // ファイルバージョンリスト
        setFileVersionList(state, argList) {
            console.log("entities setFileVersionList list=" + argList);
            state.file_version_list = argList;
        },
        // 分類リスト
        setBunList(state, argList) {
            console.log("entities setBunList list=" + argList);
            state.bun_list = argList;
        },
        // 汎用オブジェクト更新
        setInfo(state, argArr) {
            console.log("entities setInfo name="+argArr[0]+" info="+argArr[1]);
            state[argArr[0]] = argArr[1];
        },
        // 汎用リスト更新
        setList(state, argArr) {
            console.log("entities setList name="+argArr[0]+" list="+argArr[1]);
            state[argArr[0]] = argArr[1];
        },
    },
    actions: {
        // 汎用リストクリア
        clear(context,argNm) {
            console.log("actions clear name="+argNm);
            context.commit('clear',argNm);
        },
        // 汎用リストクリア
        clearWithStorage(context,argNm) {
            console.log("actions clearWithStorage name="+argNm);
            context.commit('clear',argNm);
            localStorage.removeItem(argNm);
            console.log("actions clearWithStorage success!");
        },
        // 分類リストクリア
        clearBunList(context) {
            console.log("actions clearBunList start");
            context.commit('setBunList',[]);
            return true;
        },
        // 汎用オブジェクト更新
        setInfo(context,argArr) {
            console.log("actions setInfo name="+argArr[0]);
            context.commit('setInfo',argArr);
        },
        // 汎用オブジェクト更新(Storageから取得してStoreを更新)
        setInfoFromStorage(context,argNm) {
            console.log("actions setInfoFromStorage name="+argNm);
            // Storageからの取得
            console.log("actions setInfoFromStorage");
            let buf = localStorage.getItem(argNm);
            console.log("actions setInfoFromStorage from Storage buf="+buf);
            if ( buf ) {
                let obj = JSON.parse(buf);
                // ストアへ
                console.log("actions setInfoFromStorage to Store");
                context.commit('setInfo',[argNm,obj]);
            } else {
                console.log("actions setInfoFromStorage error!!! storage is empty");
                alert("setInfoFromStorageに失敗しました");        
            }
        },
        // 汎用オブジェクト更新(StorageとStoreを更新)
        setInfoAndStorage(context,argArr) {
            console.log("actions setInfoAndStorage name="+argArr[0]);
            // Storageへの書き込み
            console.log("actions setInfoAndStorage JSON.stringify & setItem");
            let buf = JSON.stringify(argArr[1]);
            localStorage.setItem(argArr[0],buf);
            console.log("actions setInfoAndStorage to Storage success!");
            // ストアへ
            console.log("actions setInfoAndStorage to Store");
            context.commit('setInfo',argArr);
        },
        // 汎用リスト更新
        setList(context,argArr) {
            console.log("actions setList name="+argArr[0]);
            context.commit('setList',argArr);
        },
        // 分類リスト更新
        //async setBunList(context) {   // mixinsが使えればこちらでやりたい
        async setBunList(context, argList) {
            // 以下mixinsが使用できれば、こちらでajaxしてリストを作成しセットしたかった
            //console.log("setBunList consts:"+consts);
            //console.log("setBunList consts.AJAX_SERVER:"+consts.AJAX_SERVER);
            //console.log("setBunList AJAX_SERVER:NG");
            //console.log("setBunList common:"+common);
            /*
            for ( let obj in common ) {
                console.log("setBunList common:obj:"+obj);
            }
            */
            // mixinsが参照できていない（一旦、諦める：vuexでのmixin使用は不可とする）
            /*
            let url = consts.AJAX_SERVER + "?" + consts.AJAX_GET_BUN_LIST; 
            //let url = "http://monaca.localhost/testServer/public/ajxServer.php?function=getBunList"; 
            let resData = null;
            let bunList = [];
            let msg = '';
            console.log("Vuex action setBunList url:"+url);
            //await this.axios
            await axios
                .get(url)
                .then((response) => {
                    console.log('AjaxOK');
                    // mixinの汎用メソッドで処理(レスポンスそのものを取得)
                    resData = this.ajaxSuccess(response);
                })
                .catch((err) => {
                    console.log('Ajaxエラー err.config=' + err.config);
                    // mixinの汎用メソッドで処理
                    //msg = this.ajaxError(err);
                    msg = this.ajaxError(err);
                    console.log('Ajaxエラー url=' + url + ' msg=' + msg);
                });
            // dataが取れていなければ異常終了
            // ajaxSuccessで内容異常時にexceptionを投げれば下記処理は不要となる
            if ( !Array.isArray(resData) ) {
                console.log('Ajaxエラー res.data is null & return false');
                alert('分類リスト取得でエラーがありました');
                return false;
            }
            // list を抽出
            // 以下もmixinの汎用メソッドにした方がすっきりする
            for ( const obj of resData ) {
                if ( obj.list ) {
                    console.log('resData.list:'+obj.list);
                    bunList = obj.list;
                }
            } 
            if ( bunList.length === 0 ) {
                console.log('Ajaxエラー no list & return false');
                alert('分類リストが取得できていません');
                return false;
            }
            */
            // 分類リスト
            // context.commit('setBunList',bunList);    // mixinsが使用できればこちら
            context.commit('setBunList',argList);
            return true;
        },
        async setBunList2(context) {   // mixinsが使えればこちらでやりたい
            // 以下mixinsが使用できれば、こちらでajaxしてリストを作成しセットしたかった
            //console.log("setBunList consts:"+consts);
            //console.log("setBunList consts.AJAX_SERVER:"+consts.AJAX_SERVER);
            //console.log("setBunList AJAX_SERVER:NG");
            //console.log("setBunList common:"+common);
            /*
            for ( let obj in common ) {
                console.log("setBunList common:obj:"+obj);
            }
            */
            // mixinsが参照できていない（一旦、諦める：vuexでのmixin使用は不可とする）
            let url = this.AJAX_SERVER + "?" + this.AJAX_GET_BUN_LIST; 
            let resData = null;
            let bunList = [];
            let msg = '';
            console.log("Vuex action setBunList url:"+url);
            //await this.axios
            await axios
                .get(url)
                .then((response) => {
                    console.log('AjaxOK');
                    // mixinの汎用メソッドで処理(レスポンスそのものを取得)
                    resData = this.ajaxSuccess(response);
                })
                .catch((err) => {
                    console.log('Ajaxエラー err.config=' + err.config);
                    // mixinの汎用メソッドで処理
                    //msg = this.ajaxError(err);
                    msg = this.ajaxError(err);
                    console.log('Ajaxエラー url=' + url + ' msg=' + msg);
                });
            // dataが取れていなければ異常終了
            // ajaxSuccessで内容異常時にexceptionを投げれば下記処理は不要となる
            if ( !Array.isArray(resData) ) {
                console.log('Ajaxエラー res.data is null & return false');
                alert('分類リスト取得でエラーがありました');
                return false;
            }
            // list を抽出
            // 以下もmixinの汎用メソッドにした方がすっきりする
            for ( const obj of resData ) {
                if ( obj.list ) {
                    console.log('resData.list:'+obj.list);
                    bunList = obj.list;
                }
            } 
            if ( bunList.length === 0 ) {
                console.log('Ajaxエラー no list & return false');
                alert('分類リストが取得できていません');
                return false;
            }
            // 分類リスト
            context.commit('setBunList',bunList);    // mixinsが使用できればこちら
            //context.commit('setBunList',argList);
            return true;
        }
    },
    modules: {},
};
export default entities;

