<template>
  <div class="Points">
    <div class="">課題一覧</div>
    <div class="list-group">
      <input type="text" v-model="keyword" />
      <a
        class="list-group-item list-group-item-action flex-column align-items-start"
        v-for="point in filteredPoints"
        :key="point.title"
        :href="getAnchor(point.id)"
      >
        <div class="d-flex w-100 justify-content-between">
          <h6 class="mb-1">
            <i :class="getIconChecked(point.checked)"></i>&nbsp;{{
              point.title
            }}
          </h6>
        </div>
      </a>
    </div>
    <div class="">テーマ詳細</div>
    <div class="card-group">
      <div
        class="card"
        v-for="point in filteredPoints"
        :key="point.title"
        :id="getAnchorId(point.id)"
      >
        <h6 class="card-header text-left">
          <i :class="getIconChecked(point.checked)"></i>&nbsp;{{ point.title }}
        </h6>
        <div class="card-body">
          <div class="card-text text-left">
            {{ point.words }}
            <code v-if="point.code">{{ point.code }}</code>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PointsVue",
  data() {
    return {
      // activeIndex: 0,
      anchorKey: "point",
      // 検索ワード
      keyword: '',
      // 課題
      points: [
        {
          id: "001",
          title: "Mixinで他のMixinを参照できない",
          words:
            "data()内での参照ができない！" +
            " → importして「conf.data().serverPath」のようにして出来た" +
            "（※method系はthisで出来そう）" +
            " → 「createでプロパティにセット」としても良いかも",
          checked: true,
        },
        {
          id: "101",
          title: "戻った時に画面状態を復元(タブ位置)",
          words:
            "(1)ウォッチャでタブ変化を捉える。" +
            "(2)vuexのstoreにタブ位置を保持。" +
            "(3)画面復帰時にstoreからtab位置を復元。",
          checked: true,
        },
        {
          id: "102",
          title: "タブの選択によって表示をコントロール",
          words:
            '<b-tabs>タグに「v-model="tabIndex"」を追加。' +
            "タブ位置がthis.tabIndexに反映される。" +
            "this.tabIndexの値によってコントロール",
          checked: true,
        },
        {
          id: "103",
          title: "タブ位置指定でタブをコントロール",
          words:
            '<b-tabs>タグに「v-model="tabIndex"」を追加。' +
            "this.tabIndexの値を変えることでタブ切替",
          checked: true,
        },
        {
          id: "104",
          title: "タブ名指定でタブをコントロール",
          words:
            '<b-tabs>タグに「v-model="tabIndex"」を追加。' +
            "プロパティにtabIndexとタブ名配列(tabs等)を設定。" +
            "「this.tabIndex = this.tabs.indexOf(タブ名)」でタブ切替",
          checked: true,
        },
        {
          id: "105",
          title: "タブ内容を別ファイルテンプレートで代替",
          words: "タブ内容をコンポーネントで定義する",
          checked: true,
        },
        {
          id: "121",
          title: "サイドメニュー表示",
          words:
            "ON/OFF用のcheckboxとアイコンとメニュー本体を記述。" +
            "参考サイトは「今風に作られたスライド式サイドバーのコードスニペット9選」" +
            "メニュークリックによりクローズするよう改良",
          checked: true,
        },
        {
          id: "131",
          title: "外部サイト表示",
          words:
            "外部サイトを表示して「戻る」で復帰する。" +
            "「戻る」付きのトップバーとiframeで構成。" +
            "トップバーにタイトルを、iframeにはURLを与える。" +
            "iframeのサイズコントロールが曲者",
          checked: true,
        },
        {
          id: "191",
          title: "仮登録＆ログインコントロール",
          words:
            "仮登録してログイン後にコントロール。" +
            "本登録とは区別したコントロールが必要",
          checked: false,
        },
        {
          id: "192",
          title: "未登録＆ログインコントロール",
          words:
            "未登録でも使用可能とする。" +
            "登録済みとは区別したコントロールが必要",
          checked: false,
        },
        {
          id: "193",
          title: "外部認証サイトを使用",
          words: "Google等のアカウントでログイン",
          checked: false,
        },
        {
          id: "201",
          title: "入力値をローカルに保存",
          words:
            "localStrageを使用。" +
            "値、配列、オブジェクトを保存＆復元。" +
            "（サンプルはTheme側）",
          checked: true,
        },
        {
          id: "301",
          title: "手元データを指定条件でフィルタ",
          words: "条件指定にcheckbox,radio,select,input",
          checked: false,
        },
        {
          id: "302",
          title: "手元データを指定条件でソート",
          words: "select,queryで条件指定",
          checked: false,
        },
        {
          id: "303",
          title: "Ajaxでデータ取得してリスト",
          words: "Ajaxでデータ取得してリスト",
          checked: false,
        },
        {
          id: "304",
          title: "外部へのAjaxが拒否される",
          words:
            "クロスドメインによるエラーを解決する。" +
            "「from origin 'http://localhost:8080' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.」" +
            "Chromeの拡張機能を使ってみる",
          checked: false,
        },
        {
          id: "701",
          title: "Routerからルートパスへの値渡しについて",
          words: "Routerからルートパスへの値渡しについて",
          checked: true,
        },
        {
          id: "901",
          title: "画像ファイルの持たせ方",
          words:
            "/src/assets/img/下はコンパイル対象。" +
            "/public/img/下はそのまま出力。" +
            "cssで参照する場合はpublic下へ、" +
            "vueでコントロールしたい場合はsrc下へ",
          checked: true,
        },
        {
          id: "902",
          title: "ビルド単位の細分化",
          words:
            "routerでの指定方法でコントロール。" +
            "通常はapp.jsにまとまる。" +
            "lazy-loadedを指定すると独立する",
          code:
            "// this generates a separate chunk (about.[hash].js) for this route" +
            "// which is lazy-loaded when the route is visited." +
            "component: () =>" +
            'import(/* webpackChunkName: "about" */ "../views/About.vue")',
          checked: true,
        },
      ],
    };
  },
  computed: {
    filteredPoints: function() {
      let wPoints = [];
      for(let i in this.points) {
        let point = this.points[i];
        if ( this.keyword === '' || point.title.indexOf(this.keyword) !== -1 || point.words.indexOf(this.keyword) !== -1 ) {
          wPoints.push(point);
        }
      }
      return wPoints;
    },
  },
  methods: {
    getAnchor(argId) {
      return "#" + this.anchorKey + "-" + argId;
    },
    getAnchorId(argId) {
      return this.anchorKey + "-" + argId;
    },
    getIconChecked(argBoo) {
      if (argBoo) {
        return "far fa-check-square";
      } else {
        return "far fa-square";
      }
    },
  },
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h6.card-header {
  padding: 5px 10px;
}
div.card {
  margin: 0px 0px 5px;
  padding: 0px 0px 5px;
}
div.card-body {
  padding: 5px 10px;
}
div.card-text {
  padding: 0px 0px 0px 20px;
}
div.card-text > code {
  padding: 0px, 0px;
  text-align: left;
}
</style>
