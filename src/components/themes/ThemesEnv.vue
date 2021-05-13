<template>
  <div class="Themes">
    <div class="">Vue.js開発環境について</div>
    <div class="card w-100">
      <div class="card-header">VScode＆Vueでhtmlタグの補完が出来るように</div>
      <div class="card-body">
        <div class="card-text">
          <h2>Veturに加えてvlsインストールと補完設定が必要</h2>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">Git commit時の自動Buildを回避する</div>
      <div class="card-body">
        <div class="card-text">
          <h2>commit時にBuildが走って結果失敗する</h2>
          <h3>現象</h3>
          <h3>とりあえずの回避策</h3>
          <p>コンソールから</p>
<pre><code>
cd (プロジェクトフォルダ)
git commit -m "コミットメッセージ" --no-verify
</code></pre>
          <h2>そもそもの原因と回避策</h2>
          <h3>Vue CLIでのプロジェクト生成時指定に問題あり？</h3>
          <h3>そもそもの回避策</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "xxx",
  data() {
    return {
      myName: "ThemesJS.vue",
    };
  },
  props: {
    msg: String,
  },
  mounted: function () {
    console.log("this is " + this.myName + " mounted");
    $("#BUTJQ").on("click", function () {
      console.log("function by jquery on BUTJQ");
      alert("alert by JQ");
    });
    window.jq("#BUTJQMAIN").on("click", function () {
      console.log("function by jquery on BUTJQ MAIN");
      alert("alert by JQ MAIN");
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/*
.card {
  text-align: left;
}
.card-text {
  font-size: 0.8rem;
  line-height: 1.2;
}
*/
</style>
