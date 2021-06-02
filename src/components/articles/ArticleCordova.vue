<template>
  <div class="Article">
    <!-- 記事 -->
    <div class="card w-100">
      <div class="card-header">Cordovaプラグインの使用</div>
      <div class="card-body">
        <div class="card-text">
          <p>内容</p>
          <ul>
            <li>Cordovaとは</li>
            <li>Monacaと素のCordovaとの違い</li>
            <li>Cordovaの導入(Sqlite導入まで)</li>
            <li>sqlite情報</li>
            <li>Monacaの場合</li>
            <li>Vue.jsでの使用</li>
            <li>カメラの使用</li>
            <li>Push通知対応</li>
          </ul>
          <!-- -->
          <h2>Cordovaとは</h2>
          <!-- -->
          <h2>Monacaと素のCordovaとの違い</h2>
          <table class="table table-striped table-bordered"> 
            <thead><tr>
                <th></th><th scope="col">Cordova</th><th scope="col">Cordova/Vue</th><th scope="col">Monaca</th>
            </tr></thead>
            <tbody>
              <tr>
                <td>インストール</td>
                <td>npm install -g cordova</td>
                <td>同左</td>
                <td>不要</td>
              </tr>
              <tr>
                <td>本体</td>
                <td>node_modules/..</td>
                <td>node_modules/cordova..</td>
                <td>node_modules/cordova..</td>
              </tr>
              <tr>
                <td>プラグイン配置</td>
                <td>plugins/</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>リスト</td>
                <td></td>
                <td></td>
                <td>monaca plugin list</td>
              </tr>
              <tr>
                <td>プラグイン追加(標準)</td>
                <td>cordova plugin add cordova-plugin-dialogs --save</td>
                <td></td>
                <td>monaca plugin add cordova-plugin-dialogs</td>
              </tr>
              <tr>
                <td colspan="4">
                  monaca plugin コマンドが失敗する理由<br/>
                  package.json に plugins が未書込みの場合エラーとなる<br/>
                  （Monacaとして想定外）<br/>
                  → package.json にplugins を空で作ってリトライ
                </td>
              </tr>
              <tr>
                <td>プラグイン削除</td>
                <td></td>
                <td></td>
                <td>monaca plugin rm org.apache.cordova.camera</td>
              </tr>
              <tr>
                <td>プラグイン追加(拡張)</td>
                <td>cordova plugin add cordova-sqlite-storage --save</td>
                <td></td>
                <td>monaca plugin add cordova-sqlite-storage</td>
              </tr>
              <tr>
                <td>Vue組み込み</td>
                <td>未</td>
                <td>vue add cordova</td>
                <td>不要</td>
              </tr>
              <tr>
                <td>Vue内配置</td>
                <td>未</td>
                <td>-/src-cordova</td>
                <td>-</td>
              </tr>
              <tr>
                <td>ペアリング</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <!-- -->
          <h2>Cordovaの導入</h2>
          <h3>Cordova単体でのインストール</h3>
          <p>1.前提環境</p>
          <code>node.js , npm , Vue.js</code><br/>
          <p>2.npmでインストール(グローバル)</p>
          <code>npm install -g cordova</code>
          <p>3.テストアプリを作成</p>
          <code>cd ~/home/test</code><br/>
          <code>cordova create mycordova com.ranastyle.mycordova MyCordova</code><br/>
          <code>□ フォルダ：mycordova（小文字で）</code><br/>
          <code>□ id：com.ranastyle.mycordova（config.xmlへ 変更可）</code><br/>
          <code>□ name：mycordova（config.xmlへ 変更可）</code><br/>
          <p>4.プラットフォーム追加(browser,ios,android)</p>
          <code>cd mycordova</code><br/>
          <code>cordova platform add browser</code><br/>
          <code>cordova platform add ios</code><br/>
          <code>cordova platform add android</code><br/>
          <p>5.プラットフォーム動作確認</p>
          <code>cordova run browser</code><br/>
          <p>6.プラットフォームセット確認</p>
          <code>cordova platform ls</code><br/>
          <p>7.プラットフォーム構築要件のチェック</p>
          <small>各プラットフォームでの構築に不足するものがリストされる</small><br/>
          <code>cordova requirements</code><br/>
          <p>8.プラグイン導入(sqlite)</p>
          <code>cordova plugin add cordova-sqlite-storage --save</code><br/>
          <p>9.パッケージ内容の確認</p>
          <code>less package.json</code><br/>
          <h2>sqlite参考</h2>
          <a href='https://github.com/storesafe/cordova-sqlite-storage'>WebSQLプラグイン</a><br/>
          <a href='https://docs.monaca.io/ja/tutorials/sqlite/'>チュートリアル</a><br/>
          <a href='https://tech.pjin.jp/blog/2020/04/18/cordova_wkwebview_01/'>参考資料</a><br/>
          <!-- -->
          <h2>Monaca(CLI)の場合</h2>
          <h3>Cordovaはインストールされている</h3>
          <h3>Monaca CLIを使用してプラグインを追加</h3>
          <p>プラグイン確認</p>
          <code>monaca plugin list</code><br/>
          <p>プラグイン追加</p>
          <code>monaca plugin add cordova-plugin-dialogs</code><br/>
          <code>monaca plugin add cordova-sqlite-storage</code><br/>
          <p>注意点</p>
          <code>package.jsonのpluginが未定義の場合はエラーになるので空で作っておくこと</code>
          <h3>Vueでの使用</h3>
          <p>★cordova.jsの読み込みはmonaca準備済み</p>
          <p>コーディングポイント</p>
          <ol>
            <li>devicereadyで使用可能になる</li>
            <li>window.xxx でプラグイン名を指定する</li>
          </ol>
<pre><code>
  created () {
    // デバイス判定
    window.setTimeout(() => {
      if (typeof cordova === 'undefined') {
        console.log('on PC')
        this.onDeviceReady();
      } else {
        console.log('on スマートフォン')
        document.addEventListener('deviceready', this.onDeviceReady, false)
      }
    }, 1000)
  },
  methods: {
    onDeviceReady () {
      console.log('device ready') 
      // DB初期化
      this.db = window.sqlitePlugin
        ? window.sqlitePlugin.openDatabase({name: 'test.db', location: 'default'})
        : window.openDatabase('test.db', '1.0', 'TEST DB', 100000)
      this.db.transaction(this.initDB, this.errorCB, this.successCB)
    },
    initDB: function (tx) {
      console.log('initDB create')
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS sample (id integer PRIMARY KEY AUTOINCREMENT, name text)'
      )
      console.log('initDB insert')
      var name = 'ino'
      tx.executeSql("insert into sample (name) values ('"+name+"')")
    },
    errorCB: function (tx, err) {
      console.log('initDB Error : ' + err)
    },
    successCB: function () {
      console.log('initDB success!')
    },
</code></pre>
          <h2>Monacaなしの場合</h2>
          <h3>vue-cordovaは使わずに</h3>
          <p>this tool will no longer be maintained or supported</p>
          <h3>参考サイト</h3>
          <a href="https://qiita.com/mktshhr/items/0d3f790c394145f2bab6">CordovaでAndroidアプリを作る(Vue+Cordova入門)</a><br/>
          <a href="https://qiita.com/reon777/items/82f6292248d76d1f3360">Vue CLI 3.0 でCordovaを導入したら割とハマった</a>
          <h3>既存のVueプロジェクトにCordovaを追加するパターン</h3>
          <p>vueプロジェクト「sample-app」に追加</p>
          <code>cd ~/home/monaca/sample-app</code><br/>
          <code>vue add cordova</code><br/>
<pre><code>
 cordova  Executed 'cordova create src-cordova com.vue.example.app SampleApp'
 cordova  Creating file: /Users/inokuchi.hiroyuki/home/monaca/sample-app/src-cordova/www/.gitignore
 cordova  Executed 'cordova platform add android' in folder /Users/inokuchi.hiroyuki/home/monaca/sample-app/src-cordova
 cordova  Executed 'cordova platform add ios' in folder /Users/inokuchi.hiroyuki/home/monaca/sample-app/src-cordova
 cordova  Executed 'cordova platform add browser' in folder /Users/inokuchi.hiroyuki/home/monaca/sample-app/src-cordova
 cordova  Updated src-cordova/config.xml
</code></pre>
<pre><code>
cordova用のbuildコマンドを整備

sqliteプラグインをインストール

cd src-cordova
cordova plugin add cordova-sqlite-storage --save

bodyタグの最初にcordova.jsを取得

アプリからプラグインが参照できない場合は、window. を試す

check points are
 This assumes that the plugin
  (1) installed correctly, 
  (2) Cordova emitted the 'deviceready' event, 
  (3) cordova.js is available to the application

</code></pre>
          <h3>iPhoneでの実行</h3>
          <h3>Androidでの実行</h3>
          <!-- -->
          <h2>カメラの使用</h2>
          <!-- -->
          <h2>スキャナとしての使用</h2>
          <!-- -->
          <h2>Push通知対応</h2>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">PCブラウザはどうなる</div>
      <div class="card-body">
        <div class="card-text">
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">Androidでやってみる</div>
      <div class="card-body">
        <div class="card-text">
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">iPhoneでやってみる</div>
      <div class="card-body">
        <div class="card-text">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleCordova",
  //data() {},
  computed: {},
  methods: {},
  props: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
