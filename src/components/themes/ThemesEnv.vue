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
      <div class="card-header">Git対象から外したい時</div>
      <div class="card-body">
        <div class="card-text">
          <h3>内容</h3>
          <ol>
            <li>git対象を確認する</li>
            <li>.gitignoreを使用する</li>
            <li>git対象から除外する（１）</li>
            <li>git対象から除外する（２）</li>
          </ol>
          <h3>どういったもの</h3>
          <ol>
            <li>ローカル固有の設定ファイル</li>
            <li>ログファイル</li>
          </ol>
          <h2>git対象を確認する</h2>
          <div class="code">
            $ git ls-files -v | grep vue
          </div>
          <h2>.gitignoreを使用する</h2>
          <div class="mention">追跡対象となったものを指定してもダメ</div>
          <div class="note">その場合は対象からの除外をしてやる必要あり</div>
          <h2>git対象から除外する（１）</h2>
          <p>変更は保持されるがリポジトリとの連携はされなくなる</p>
          <div class="code">$ git update-index --skip-worktree ...</div>
          <p>戻す</p>
          <div class="code">$ git update-index --no-skip-worktree ...</div>
          <h2>git対象から除外する（２）</h2>
          <p>対象のindexから除外する</p>
          <div class="code">$ git rm --cached ...</div>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">Git commit時の自動チェックを回避する</div>
      <div class="card-body">
        <div class="card-text">
          <h2>commit時にlintが走って結果失敗する</h2>
          <h3>現象</h3>
          <div class="note">VsCodeでのcommit時に時間がかかり結果失敗する</div>
          <h3>とりあえずの回避策</h3>
          <div class="summary">VsCodeのcommitではなくコンソールから行う</div>
          <div class="code">
            cd (プロジェクトフォルダ)<br />
            git commit -m "コミットメッセージ" --no-verify
          </div>
          <h3>そもそもの原因と回避策</h3>
          <div class="summary">
            Vue CLIでのプロジェクト生成時指定により<br/>
            commit時に「vue-cli-service lint」が動作してエラーとなっていた
          </div>
          <div class="code">
            ? Pick additional lint features: Lint on save, Lint and fix on commit<br />
            → 「Lint and fix on commit」によるもの
          </div>
          <div class="mention">暫定策：下記を「package.json」から除外する</div>
          <div class="code">
            "gitHooks": {<br />
              "pre-commit": "lint-staged"<br />
            },<br />
          </div>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">シェル備忘録</div>
      <div class="card-body">
        <div class="card-text">
          <!-- -->
          <h2>bash設定</h2>
          <h3>bash設定ファイルと反映タイミング</h3>
          <ol>
            <li>/etc/profile：ログイン時に実行され、全ユーザーが参照</li>
            <li>.bash_profile：ログイン時に実行される</li>
            <li>.bash_login：~/.bash_profileがない場合、ログイン時に実行される</li>
            <li>.profile：~/.bash_profile、~/.bash_loginがない場合ログイン時に実行される</li>
            <li>.bashrc：bash起動時に実行される</li>
            <li>.bash_logout：ログアウト時に実行される</li>
          </ol>
          <!-- -->
          <h2>history コマンド</h2>
          <h3>コマンド履歴をgrepして表示</h3>
          <code>history|grep git</code>
          <h3>コマンド履歴から行数を指定して再実行</h3>
          <code>!行番号</code>
          <h3>履歴行数を増やす</h3>
          <div class="note">~/.bashrc に<code>HISTSIZE=10000</code>を設定</div>
          <!-- -->
          <h2>tcpdump コマンド</h2>
          <h3>port 8080 を表示</h3>
          <code>sudo tcpdump -i [lo0|en0] -A port 8080</code>
          <h3>api.shop-pro.jp からのパケットを表示</h3>
          <code>sudo tcpdump -i en0 -X src port 443 and src host api.shop-pro.jp</code>
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
