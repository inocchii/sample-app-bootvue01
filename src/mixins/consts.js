//
// 定数設定
//
export default {
    data() {
      return {
        // Ajaxメインサーバ
        AJAX_SERVER: 'http://monaca.localhost/testServer/public/ajxServer.php',
        // Ajaxメインサーバ要求パラメータ
        AJAX_GET_FILE_VERSION_LIST: 'function=getFileVersionList',
        AJAX_GET_BUN_LIST: 'function=getBunList',
        AJAX_GET_TENPO_LIST: 'function=getTenpoList',
        AJAX_GET_CATG_LIST: 'function=getCatgList',
        AJAX_GET_TORI_LIST: 'function=getToriList',
        AJAX_GET_ITEM_LIST: 'function=getItemList',
        // ファイル名
        FILE_NM_FILE_VERSION_LIST: 'file_version_list',
        FILE_NM_BUN_LIST: 'bun_list',
        FILE_NM_TENPO_LIST: 'tenpo_list',
        FILE_NM_CATG_LIST: 'catg_list',
        FILE_NM_TORI_LIST: 'tori_list',
        FILE_NM_ITEM_LIST: 'item_list',
      };
    },
  };
  