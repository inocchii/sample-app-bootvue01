<template>
  <div class="Themes">
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
      <div class="card-header">変数の保持方法</div>
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
