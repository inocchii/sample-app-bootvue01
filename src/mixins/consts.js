//
// 定数設定
//
import conf from "./conf.js";

export default {
    //mixins: [conf],
    mounted() {
      //console.log(conf.data);
      //console.log("conf.data.serverPass="+this.serverPath); // OK MIXINから but data()で使えない
      //console.log("this.serverPath="+conf.data().serverPath);  // OK importから
    },
    data() {
      return {
        // Ajaxメインサーバ(MIXINからの取得に注意)
        AJAX_SERVER: conf.data().serverPath+'/testServer/public/AjaxServer.php',
        //AJAX_SERVER: 'http://localhost/testServer/public/ajxServer.php',
        //AJAX_SERVER: 'http://monaca.localhost/testServer/public/ajxServer.php',
        //AJAX_SERVER: 'http://10.0.101.51/testServer/public/ajxServer.php',
        //AJAX_SERVER: 'http://10.0.101.51/testServer/public/AjaxServer.php',
        //AJAX_SERVER: '/testServer/public/ajxServer.php',
        //AJAX_SERVER: 'https://joshi-spa.jp/wp-json/wp/v2/posts',
        //AJAX_SERVER: 'https://api.coindesk.com/v1/bpi/currentprice.json',

        // Ajaxメインサーバ要求パラメータ
        AJAX_CHECK_SIGNUP: 'function=checkSignup',
        AJAX_CHECK_LOGIN: 'function=checkLogin',
        AJAX_GET_FILE_VERSION_LIST: 'function=getFileVersionList',
        AJAX_GET_BUN_LIST: 'function=getBunList',
        AJAX_GET_TENPO_LIST: 'function=getTenpoList',
        AJAX_GET_CATG_LIST: 'function=getCatgList',
        AJAX_GET_TORI_LIST: 'function=getToriList',
        AJAX_GET_ITEM_LIST: 'function=getItemList',

        // Ajax blogサーバ
        AJAX_BLOG_SERVER: 'http://shambeel.com/wp-json/wp/v2/posts',
        //AJAX_BLOG_SERVER: 'https://joshi-spa.jp/wp-json/wp/v2/posts',
        //AJAX_BLOG_SERVER: 'https://api.coindesk.com/v1/bpi/currentprice.json',
        // Ajax blogサーバ要求パラメータ
        AJAX_BLOG_GET_LIST: '_embed&per_page=3',

        // ファイル名（ストアのKEY ＆ ローカルストレッジのKEY）
        // 単体系
        FILE_NM_USER_INFO: 'user_info',
        FILE_NM_USER_INFO2: 'user_info2',
        FILE_NM_USER_INFO3: 'user_info3',
        // リスト系
        FILE_NM_FILE_VERSION_LIST: 'file_version_list',
        FILE_NM_BUN_LIST: 'bun_list',
        FILE_NM_TENPO_LIST: 'tenpo_list',
        FILE_NM_CATG_LIST: 'catg_list',
        FILE_NM_TORI_LIST: 'tori_list',
        FILE_NM_ITEM_LIST: 'item_list',
        // 記事系
        FILE_NM_BLOG_LIST: 'blog_list',
      };
    },
};
  