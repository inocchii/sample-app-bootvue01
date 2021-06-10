// 共通設定ファイル(vue)
import conf from "@/conf/projConf";
// 共通設定ファイル(JSON)
//const common = require('/src/mixins/common.json');

export default {
    data() {
        return {
        conf: conf, // 共通設定ファイルより
        //serverPass: "https://localhost:10443/",    // サーバーサイドのパスを定義
        };
    },
    /*
    created() {
        if ( this.$store ) {
            console.log('start! from mixins. testFlg='+this.$store.state.testFlg )    // 起動後必ずログが出力される
        } else {
            console.log('start! from mixins. $store not yet' )    // 起動後必ずログが出力される
        }
    },
    */ 
    methods: {
        logging: function(argMsg) {
            console.log(argMsg);
        },
        //
        // ログイン関連
        //
        getLoginInfo(argKey='') {
            // 格納KEY
            if ( argKey == '' ) {
                argKey = this.FILE_NM_USER_INFO;
            }
            // ①ストアから
            let userInfo = this.$store.getters['entities/getList'](argKey);
            // ②ストアになければストレッジから
            if ( userInfo === null ) {
                this.$store.dispatch('entities/setInfoFromStorage',argKey);
                userInfo = this.$store.getters['entities/getList'](argKey);
            }
            return userInfo;
        },
        clearLogin(argKey='') {
            // 格納KEY
            if ( argKey == '' ) {
                argKey = this.FILE_NM_USER_INFO;
            }
            // ストアとストレッジの両方をクリア
            this.$store.dispatch('entities/clearWithStorage',argKey);
            return true;
        },
        //
        // getOuterPath 外部リンクを編集
        //
        getOuterPath(argBase, argTitle, argOuterUrl) {
            console.log("Outer link base="+argBase+" title="+argTitle+" url="+argOuterUrl);
            return (
                argBase + "?title=" + argTitle + "&url=" + argOuterUrl + "&backPath=/"
            );
        },
        //
        // ajax正常受信の場合の結果取り出し
        //
        ajaxSuccess: function(argRes) {
            // logに内容
            console.log("Ajax応答 res.status=" + argRes.status);
            console.log("Ajax応答 res.statusText=" + argRes.statusText);
            console.log("Ajax応答 res.headers=" + argRes.headers);
            console.log("Ajax応答 res.config=" + argRes.config);
            console.log("Ajax応答 res.data=" + argRes.data);
            // res.dataが不正の場合は空で返す
            /*
            if ( !Array.isArray(argRes.data) ) {
                return false;
            }
            */
            // 解析した結果をbufに入れて戻す
            let decData;
            let buf;
            let arr;
            try {
                // デコード
                decData = decodeURIComponent(argRes.data);
                console.log("ok decodeURIComponent(res.data):decData:" + decData);
                // JSONオブジェクトへパース
                buf = JSON.parse(decData);
                console.log("ok JSON.parse(decData):buf:" + buf);
                //arr = buf[0];
                arr = buf;
                console.log("ok get arr:buf" + arr);
            } catch (e) {
                // JSON文字列へ
                buf = JSON.stringify(argRes.data);
                console.log("ok JSON.stringify(res.data):buf:" + buf);
                // JSONオブジェクトへパース
                arr = JSON.parse(buf);
                console.log("ok JSON.parse(buf):arr:" + arr);
            }
            console.log("JSON buf:" + buf + " arr:" + arr);
            return arr;      
        },
        //
        // ajax処理異常の場合のエラー対応
        //
        ajaxError: function(argErr) {
            let errMsg = '通信に異常がありました';
            console.log('ajaxError '+errMsg);
            console.log(argErr);
            if (argErr.response) {
                // サーバがステータスコードで応答した(2XXの範囲外)
                let res = argErr.response;
                // Ajaxサーバ側がエラーと判断している
                console.log('Ajax応答異常 res.status=' + res.status);
                console.log('Ajax応答異常 res.statusText=' + res.statusText);
                console.log('Ajax応答異常 res.headers=' + res.headers);
                console.log('Ajax応答異常 res.config=' + res.config);
                console.log('Ajax応答異常 res.data=' + res.data);
                console.log(argErr.response);
                // エラーメッセージを補足
                errMsg += '(異常status='+res.status+')';
            } else if (argErr.request) {
                // サーバからの応答が受信されなかった
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log("Ajax応答なし err.request=" + argErr.request);
                console.log(argErr.request);
                // エラーメッセージを補足
                errMsg += '(サーバ応答なし)';
            } else {
                // トリガーしたリクエストの設定に何かしらのエラーがある
                console.log('Ajax送信異常 err.message=' + argErr.message);
                // エラーメッセージを補足
                errMsg += '(要求エラー)';
            }
            console.log('Ajaxエラー err.config=' + argErr.config);
            console.log(argErr.config);
            alert(errMsg);
            return errMsg;
        },
    },
    /*
    computed: {
        twoBytwo() {
            return 2 * 2
        },
    }
    */
};
