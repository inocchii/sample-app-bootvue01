<template>
  <div class="Themes">
    <div class="card w-100">
      <div class="card-header">Vue-Routerについて整理</div>
      <div class="card-body">
        <div class="card-text">
          <h2>ハッシュモードとヒストリモード</h2>
          <table class="table table-striped table-bordered"> 
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">hashモード</th>
                <th scope="col">historyモード</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">パスの形式</th>
                <td>http://localhost:8080/#/hoge</td>
                <td>http://localhost:8080/hoge</td>
              </tr>
              <tr>
                <th scope="row">メリット</th>
                <td>設定が簡単<br/>historyモードより早い<br/>HTML5 History API不要</td>
                <td>URLに＃が入らない</td>
              </tr>
              <tr>
                <th scope="row">注意点</th>
                <td>URLに＃が入る</td>
                <td>サーバへの通信が発生する<br/>サーバの設定が必要<br/>HTML5 History API必要</td>
              </tr>
            </tbody>
          </table>
          <h2>Routerからの値の引き渡しについて</h2>
          <h2>ルートコンポーネントにプロパティを渡す</h2>
          <h2>ビルド単位の細分化について(遅延ローディング)</h2>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">ライフサイクルフックを整理</div>
      <div class="card-body">
        <div class="card-text">
          <h2></h2>
          <table class="table table-striped table-bordered"> 
            <thead>
              <tr>
                <th scope="col">ライフサイクル</th>
                <th scope="col">タイミング</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">beforeCreate</th>
                <td>インスタンスが生成されデータが初期化される前</td>
              </tr>
              <tr>
                <th scope="row">created</th>
                <td>データが初期化された後</td>
              </tr>
              <tr>
                <th scope="row">beforeMount</th>
                <td>インスタンスがDOM要素にマウントされる前</td>
              </tr>
              <tr>
                <th scope="row">mounted</th>
                <td>DOM要素にマウントされた後</td>
              </tr>
              <tr>
                <th scope="row">beforeUpdate</th>
                <td>データが更新されてDOM要素に適用される前</td>
              </tr>
              <tr>
                <th scope="row">updated</th>
                <td>データが更新されてDOM要素に適用された後</td>
              </tr>
              <tr>
                <th scope="row">beforeDestroy</th>
                <td>インスタンスが破棄される前</td>
              </tr>
              <tr>
                <th scope="row">destroyed</th>
                <td>インスタンスが破棄された後</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">v-ifで複数条件を処理したいとき</div>
      <div class="card-body"><div class="card-text"></div></div>
    </div>
    <div class="card w-100">
      <div class="card-header">computedを使ってリストをフィルタする</div>
      <div class="card-body">
        <div class="card-text">
          <h2>条件指定によるフィルタリングにcomputedを使う</h2>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">computedに引数を渡す</div>
      <div class="card-body">
        <div class="card-text">
          <a
            target="_blank"
            rel="noopener"
            href="https://qiita.com/wataru65818460/items/f38898236512f654df4c"
            >参考サイト</a
          >
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">配列の更新がリアクティブにならない</div>
      <div class="card-body">
        <div class="card-text">
          <h2>Vueでは変更を検知できる更新メソッドが限定されている</h2>
          <p>対処方法</p>
          <h3>1.検知対象のメソッドで更新を行う</h3>
          <code>push() pop() shift() unshift() splice() sort() reverse()</code>
          <h3>2.変更後、配列に対し.splice()を実施することで検知できる</h3>
          <code>vuexの場合、mutationで更新後に配列に.splice()を実施する</code>
          <h3>3.this.$set()を使う</h3>
          <h3>4.オブジェクトはリアクティブに更新される</h3>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">フィルタを使って表示項目を編集する</div>
      <div class="card-body">
        <div class="card-text">
          <p>参考サイト：<a href="https://dev83.com/vue-filter/">Vue.jsでフィルタを使ってデータを加工する方法を解説</a></p>
          <p>確認事項</p>
          <code>filter内で算出プロパティやメソッドやVuexストアは使えない？</code>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">共通定義(mixin)の使用方法</div>
      <div class="card-body">
        <div class="card-text">
          <h2>注意点</h2>
          <ol>
            <li>mixinでの他のmixin使用に注意</li>
          </ol>
          <h2>mixinでの他のmixin使用に注意</h2>
          <div class="mention">data()内では上手く参照できない</div>
<pre><code>     // 他のmixinをimportして参照した
          import conf from "./conf.js";
          data() {
            return {
              AJAX_SERVER: conf.data().serverPath+'...',
</code></pre>
          <div class="note">methodではthis.で参照できているようである</div>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">Vuexとは</div>
      <div class="card-body">
        <div class="card-text">
          <h2>Vuexの特徴(グローバルオブジェとの違い)</h2>
          <ol>
            <li>コンポーネントを跨いで値・状態を保持できる</li>
            <li>リアクティブである</li>
            <li>値の状態を追跡するために「ミューテーションをコミット」</li>
          </ol>
          <h2>どんな時に使う</h2>
          <p>コンポーネントを跨いで値の変化をリアクティブに反映したい時</p>
          <h2>グローバルオブジェクトとの使い分け</h2>
          <p>リアクティブである必要がある → Vuex</p>
          <p>リアクティブである必要がない → グローバルオブジェクト</p>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">Vuexによる値の保持(変数の保持方法)</div>
      <div class="card-body">
        <div class="card-text">
          <p>Vueの変数保持方法を試す</p>
          <h2>タブ位置を保存して復元 (tabIndex:{{ tabIndex }})</h2>
          <b-tabs content-class="mt-3" v-model="tabIndex">
            <b-tab title="Home"></b-tab>
            <b-tab title="Tab1"></b-tab>
            <b-tab title="Tab2"></b-tab>
          </b-tabs>
          <ul>
            <li>Vuexを使用 → OK</li>
            <li>mixinを使用 → NG</li>
            <li>JSオブジェクトを使用（未）</li>
          </ul>
          <ul>
            <li>値の変化を捉え、それぞれに保管(watch)</li>
            <li>画面復帰時にそれぞれを確認(createdにて)</li>
          </ul>
          <h2>Vuex使用方法</h2>
          <p>src/store/index.jsに定義</p>
          <pre><code>
  state: {
    TABINDEXES: [],
  },
  mutations: {
    setTabIndex(state,argArr) {
      console.log("Vuex key="+argArr[0]+" value="+argArr[1])
      state.TABINDEXES[argArr[0]] = argArr[1];
    },
  },
</code></pre>
          <p>.vueから使用する</p>
          <pre><code>
  // 参照
  this.tabIndex = this.$store.state.TABINDEXES['ThemesVue'];
  // 更新
  this.$store.commit('setTabIndex',['ThemesVue',this.tabIndex]);
</code></pre>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">VuexとLocalStorageの組み合わせ</div>
      <div class="card-body"><div class="card-text"></div></div>
    </div>
    <div class="card w-100">
      <div class="card-header">VuexとAjaxの組み合わせ</div>
      <div class="card-body">
        <div class="card-text">
          <h2>パターン</h2>
          <ol>
            <li>actionsの中でAjaxを行う</li>
            <li>Ajax自体はコンポーネント側で行う</li>
          </ol>
          <h2>注意点</h2>
          <ol>
            <li>同期的に行う必要がある</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ThemesVue",
  props: {
    msg: String,
  },
  created() {
    // tab位置がvuexのTABINDEXESに保存されていれば復元
    if (this.$store.state.TABINDEXES["ThemesVue"]) {
      this.tabIndex = this.$store.state.TABINDEXES["ThemesVue"];
    }
    // tab位置がmixin conf のTAB_INDEXに保管されていれば再現（mixinの値は書き換えが出来ておらず使えない）
    /*
    if ( this.TAB_INDEX !== null ) {
      this.tabIndex = this.TAB_INDEX;
    }
    */
    console.log(
      "ThemesVue tabIndex kept in this.$store.state.TABINDEXES :" +
        this.$store.state.TABINDEXES["ThemesVue"]
    );
    console.log(
      "ThemesVue can access this.state.TABINDEXES? :" +
        this.state.TABINDEXES["ThemesVue"]
    );
  },
  data() {
    return {
      tabIndex: 0,
    };
  },
  computed: {
    // Vuexのstate参照を少し簡潔に
    state: function () {
      return this.$store.state;
    },
  },
  watch: {
    tabIndex: function () {
      console.log("ThemesVue tabIndex changed :" + this.tabIndex);
      // vuex
      this.$store.commit("setTabIndex", ["ThemesVue", this.tabIndex]);
      console.log(
        "ThemesVue tabIndex kept to vuex TABINDEXES[ThemesVue] :" +
          this.$store.state.TABINDEXES["ThemesVue"]
      );
      // mixin
      // mixinが有効かをチェック(参照は出来ている)
      console.log("mixin projectNm :" + this.projectNm);
      // mixinの変数にセット(セットしたつもりが実はローカル変数が生成されているようだ)
      this.TAB_INDEX = this.tabIndex;
      console.log(
        "ThemesVue tabIndex kept not in mixin but local):" + this.TAB_INDEX
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card {
  text-align: left;
}
.card-text {
  font-size: 0.8rem;
  line-height: 1.2;
}
.card-text > h2 {
  font-size: 1rem;
}
</style>
