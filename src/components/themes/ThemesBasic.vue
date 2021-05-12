<template>
  <div class="Themes">
    <div class="card w-100">
      <div class="card-header">戻ったときにタブ位置を復元したい</div>
      <div class="card-body">
        <div class="card-text">
          <p>
            Bootstrap-Vueのタブを使用。<br />画面に戻ってきた時にタブが初期状態に戻ってしまう。
          </p>
          <h2>Bootstrap&Vueのタブ (tabIndex:{{ tabIndex }})</h2>
          <b-tabs content-class="mt-3" v-model="tabIndex">
            <b-tab title="Home"></b-tab>
            <b-tab title="Tab1"></b-tab>
            <b-tab title="Tab2"></b-tab>
          </b-tabs>
          <ul>
            <li>tabIndexにタブ位置がセットされているようだ</li>
            <li>tabIndexの値を変えることでタブ位置変更も可能</li>
            <li>画面復帰時にtabIndexが初期値ゼロになってしまう</li>
          </ul>
          <p>
            （案）tabIndexの変化時にtabIndexの値を保持し<br />画面復帰時にその値をtabIndexに戻してやれば良いのでは？
          </p>
          <ul>
            <li>値の変化をイベントとして取得できるか？</li>
            <li>値をどのように保存したら良いのか？</li>
            <li>画面復帰を捉えることができるか？</li>
            <li>※そもそもtabIndexはどのようにb-tabsに紐つくのか？</li>
          </ul>
          <p>値の変化 → watch(ウォッチャ)を使用</p>
          <p>値の保存 → vuexにTABINDEX[]を定義し、tabのIDとtabIndexを保持</p>
          <p>画面復帰 → createdで画面生成時を捕捉</p>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">CSSの優先順位を整理</div>
      <div class="card-body">
        <div class="card-text">
          <ul>
            <li>より近くより後から読み込まれたスタイルが優先される</li>
            <li>
              セレクタの種類による優先順位
              <ol>
                <li>※p#xyz > #xyz > p.abc > .abc > p > *</li>
                <li>
                  idセレクタやclassセレクタなどの具体的・局所的なセレクタは、タイプセレクタや全称セレクタのような全般的なセレクタより優先される
                </li>
                <li>
                  idセレクタはclassセレクタより優先され、タイプセレクタは全称セレクタより優先される（idセレクタ
                  > classセレクタ > タイプセレクタ > 全称セレクタ）
                </li>
                <li>
                  要素を特定したidセレクタ・classセレクタは、要素を特定しないidセレクタ・classセレクタより優先される
                </li>
                <li>
                  優先順位が同じになった場合は、最後に指定したスタイルが適用される
                </li>
                <li>!importantを付けると最優先される</li>
              </ol>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">全体共通のCSSを設定したい</div>
      <div class="card-body">
        <div class="card-text">
          <h2>どこに設定すると良いか？</h2>
          <ul>
            <li>ページ毎</li>
            <li>全体共通</li>
          </ul>
          <h2>当プロジェクト内での共通スタイル(メモ)</h2>
          <p>まずは当モジュール内に記述し、先で共通化</p>
          <p>以下は対象クラス</p>
          <pre><code>
h6.card-header {
  padding: 5px 10px;
}
div.card {
  text-align: left;
  margin: 0px 0px 5px;
  padding: 0px 0px 5px;
}
div.card-body {
  padding: 5px 10px;
}
div.card-text {
  font-size: 0.8rem;
  line-height: 1.2;
  padding: 0px 0px 0px 20px;
}
div.card-text > h2 {
  font-size: 1.0rem;
}
div.card-text > code {
  padding: 0px, 0px;
  text-align: left;
}
div.card-text > li > p {
  margin-bottom: 0.5rem;
}
</code></pre>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">iframeの高さ調節に手間取る</div>
      <div class="card-body">
        <div class="card-text">
          <ul>
            <li>高さ100%を指定すると上手くいかなかった</li>
            <li>高さ999px指定かつ100%指定を外してようやく形になる</li>
            <li>
              ★親子構造にして親を縦横比率となる％指定、子を100%にするとレスポンシブになる
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ThemesBoot",
  created() {
    // tab位置がvuexのTABINDEXESに保存されていれば復元
    if (this.$store.state.TABINDEXES["ThemesBoot"]) {
      this.tabIndex = this.$store.state.TABINDEXES["ThemesBoot"];
    }
  },
  data() {
    return {
      tabIndex: 0,
    };
  },
  watch: {
    tabIndex: function () {
      console.log("ThemesBoot tabIndex changed :" + this.tabIndex);
      this.$store.commit("setTabIndex", ["ThemesBoot", this.tabIndex]);
      console.log(
        "ThemesBoot tabIndex keeped to TABINDEXES[ThemesBoot] :" +
          this.$store.state.TABINDEXES["ThemesBoot"]
      );
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
  text-align: left;
  margin: 0px 0px 5px;
  padding: 0px 0px 5px;
}
div.card-body {
  padding: 5px 10px;
}
div.card-text {
  font-size: 0.8rem;
  line-height: 1.2;
  padding: 0px 0px 0px 20px;
}
div.card-text > h2 {
  font-size: 1rem;
}
div.card-text > code {
  padding: 0px, 0px;
  text-align: left;
}
div.card-text > li > p {
  margin-bottom: 0.5rem;
}
</style>
