// note用
export default {
  /*
  created() {
    console.log("start notes.js from mixins. OUR_THEME=" + this.OUR_THEME);
  },
  */
  data() {
    return {
      OUR_THEME: "this is global theme",
      OUR_THEME_PATH: "/themesdtl",
      OUR_THEMES: [
        {
          id: "001",
          checked: false,
          catg: "Env",
          title: "VScode＆Vueでhtmlタグの補完が出来るように",
          words: "Veturに加えてvlsインストールと補完設定が必要",
          path: "",
        },
        {
          id: "002",
          checked: false,
          catg: "Env",
          title: "Git commit時の自動Buildを回避する",
          words: "commit時にBuildが走って結果失敗する",
          path: "",
        },
        {
          id: "003",
          checked: false,
          catg: "Env",
          title: "Git環境について",
          words: "中央（リモート）とローカル（開発）と本番と",
          path: "",
        },
        {
          id: "051",
          checked: false,
          catg: "JavaScript",
          title: "jQueryの使用方法を整理",
          words: "Vue内でのjQuery使用について",
          path: "/themesdtl?catg=jQuery",
        },
        {
          id: "052",
          checked: false,
          catg: "JavaScript",
          title: "クラス・オブジェクトの生成と使用",
          words: "各コンポーネント＆グローバルで使用したい時",
          path: "/themesdtl?catg=jQuery",
        },
        {
          id: "053",
          checked: false,
          catg: "JavaScript",
          title: "グローバルオブジェクトについて",
          words: "Vue内での使い所と使い方(mixin、vuexと比較)",
          path: "",
        },
        {
          id: "054",
          checked: true,
          catg: "JavaScript",
          title: "無名関数内で親のプロパティを参照",
          words: "thisをthatなどで参照させる",
          path: "",
        },
        {
          id: "055",
          checked: false,
          catg: "JavaScript",
          title: "Promiseについて整理",
          words: "非同期処理の実装と注意点",
          path: "",
        },
        {
          id: "100",
          checked: false,
          catg: "Vue",
          title: "Vue-Routerについて整理",
          words: "Vur-Routerの設定など",
          path: "",
        },
        {
          id: "101",
          checked: false,
          catg: "Vue",
          title: "Vueのライフサイクルフックを整理",
          words: "Vue.jsにおけるライフサイクルフックイベントを整理",
          path: "",
        },
        {
          id: "102",
          checked: false,
          catg: "Vue",
          title: "v-ifで複数条件を処理したいとき",
          words: "v-ifでは複数条件を処理するためにcomputedを使う",
          path: "",
        },
        {
          id: "103",
          checked: false,
          catg: "Vue",
          title: "リストをフィルタリングする",
          words: "条件指定によるフィルタリングにcomputedを使う",
          path: "",
        },
        {
          id: "104",
          checked: false,
          catg: "Vue",
          title: "computedへ引数を渡したいとき",
          words: "computedにはそのままでは引数を渡すことが出来ない",
          path: "",
        },
        {
          id: "105",
          checked: false,
          catg: "Vue",
          title: "配列の更新はリアクティブにならない",
          words: "Vueでは変更を検知できる更新メソッドが限定されている",
          path: "",
        },
        {
          id: "106",
          checked: false,
          catg: "Vue",
          title: "フィルタを使って表示項目を編集する",
          words: "フィルタを使ってデータを加工する",
          path: "",
        },
        {
          id: "140",
          checked: false,
          catg: "Vue",
          title: "グローバルオブジェクト",
          words: "Vue内での使い所と使い方(mixin、vuexと比較)",
          path: "/themesdtl?catg=jQuery",
        },
        {
          id: "141",
          checked: false,
          catg: "Vue",
          title: "共通定義(mixin)の使用方法",
          words: "mixinによる共通定数の定義と使用方法",
          path: "",
        },
        {
          id: "142",
          checked: false,
          catg: "Vue",
          title: "共通関数(mixin)の使用方法",
          words: "mixinによる共通関数の定義と使用方法",
          path: "",
        },
        {
          id: "161",
          checked: false,
          catg: "Vue",
          title: "Vuexとは",
          words: "どういう時に使う？ グローバルオブジェクトとの使い分け",
          path: "",
        },
        {
          id: "162",
          checked: false,
          catg: "Vue",
          title: "Vuexによる値の保持",
          words: "Vuexに値を保持",
          path: "",
        },
        {
          id: "163",
          checked: false,
          catg: "Vue",
          title: "Vuexの分割と指定方法",
          words: "ストアの分割と指定方法",
          path: "",
        },
        {
          id: "164",
          checked: false,
          catg: "Vue",
          title: "Vuexモジュールでのmixinやaxios使用",
          words: "Vuexのactionでmixinが使えない",
          path: "",
        },
        {
          id: "165",
          checked: false,
          catg: "Vue",
          title: "VuexとLocalStorageの組み合わせ",
          words: "VuexとLocalStorageで永続的な値保持を",
          path: "",
        },
        {
          id: "166",
          checked: false,
          catg: "Vue",
          title: "VuexとAjaxの組み合わせ",
          words: "Ajaxで取得してVuexで保持",
          path: "",
        },
        {
          id: "201",
          checked: false,
          catg: "Data",
          title: "データ保持について",
          words: "LocalStorage or Database",
          path: "",
        },
        {
          id: "202",
          checked: false,
          catg: "LocalStorage",
          title: "LocalStorageの使用",
          words: "LocalStorageの使用について",
          path: "",
        },
        {
          id: "211",
          checked: false,
          catg: "Database",
          title: "データベースの使用",
          words: "データベースの使用について",
          path: "",
        },
        {
          id: "301",
          checked: false,
          catg: "JSON",
          title: "JSONの整理",
          words: "JSON形式をパターン化",
          path: "",
        },
        {
            id: "311",
            checked: false,
            catg: "Ajax",
            title: "Ajax サーバ側",
            words: "PHPでの実装",
            path: "",
          },
        {
            id: "312",
            checked: false,
            catg: "Ajax",
            title: "Ajax サーバ側エラー対応",
            words: "エラー時のレスポンスについて",
            path: "",
          },
        {
            id: "313",
            checked: false,
            catg: "Ajax",
            title: "Ajax Vue側(axios)",
            words: "Axios使用方法の整理",
            path: "",
          },
        {
            id: "314",
            checked: false,
            catg: "Ajax",
            title: "Ajax Vue側(axios)エラー処理",
            words: "Ajaxエラー時の処理について",
            path: "",
          },
        {
            id: "321",
            checked: false,
            catg: "Ajax",
            title: "Ajaxの使用：取得",
            words: "サーバからJSONを取得",
            path: "",
          },
        {
            id: "322",
            checked: false,
            catg: "Ajax",
            title: "Ajaxの使用：複数レコード",
            words: "サーバからJSONでリストを取得",
            path: "",
          },
        {
          id: "323",
          checked: false,
          catg: "Ajax",
          title: "Ajaxの使用：処理依頼",
          words: "サーバに処理を依頼（登録など）",
          path: "",
        },
        {
          id: "324",
          checked: false,
          catg: "Ajax",
          title: "Ajaxの使用：アップロード",
          words: "サーバに複数データを送信",
          path: "",
        },
        {
          id: "325",
          checked: false,
          catg: "Ajax",
          title: "Ajax(PHP)CORS回避",
          words: "CORS回避のためのレスポンスヘッダ",
          path: "",
        },
        {
          id: "326",
          checked: false,
          catg: "Ajax",
          title: "Macでのパケットキャプチャ",
          words: "通信内容を詳細に把握する",
          path: "",
        },
        {
          id: "327",
          checked: false,
          catg: "Ajax",
          title: "サーバ経由でCORS回避",
          words: "サーバ経由で他サイトAPIを取得",
          path: "",
        },
        {
          id: "401",
          checked: false,
          catg: "Basic",
          title: "CSSの優先順位を整理",
          words: "",
          path: "",
        },
        {
          id: "402",
          checked: false,
          catg: "Basic",
          title: "全体共通のCSSを設定したい",
          words: "",
          path: "",
        },
        {
          id: "403",
          checked: false,
          catg: "Basic",
          title: "iframeの高さ調節に手間取る",
          words: "",
          path: "",
        },
        {
            id: "501",
            checked: true,
            catg: "Basic",
            title: "戻るボタンについて",
            words: "戻るを効率的に設定したい",
            path: "",
          },
        {
          id: "502",
          checked: true,
          catg: "Basic",
          title: "戻った時にタブ位置を復元したい(BootVue)",
          words: "Vuexを使用",
          path: "",
        },
        {
          id: "503",
          checked: false,
          catg: "Basic",
          title: "戻った時にカーソル位置を復元したい(BootVue)",
          words: "",
          path: "",
        },
        {
          id: "504",
          checked: false,
          catg: "Basic",
          title: "戻った時にフォーム値を復元したい(BootVue)",
          words: "",
          path: "",
        },
        {
          id: "701",
          checked: false,
          catg: "Rule",
          title: "フォルダ構成パターン",
          words: "プロジェクト毎のフォルダ構成を整理",
          path: "",
        },
        {
            id: "702",
            checked: false,
            catg: "Rule",
            title: "ネーミングルール",
            words: "ネーミングルールにより理解しやすい環境を",
            path: "",
          },
      ],
    };
  },
};
