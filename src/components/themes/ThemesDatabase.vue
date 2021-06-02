<template>
  <div class="Themes">
    <!-- 記事 -->
    <div class="card w-100">
      <div class="card-header">データ保持について</div>
      <div class="card-body">
        <div class="card-text">
          <h2>DatabaseかLocalStorageか</h2>
          <div class="note">
            ・毎回Ajaxで入れ替えるならLocalStorageで良い<br/>
            ・大量＆差分更新ならDatabaseが良さそう<br/>
            ・取り出しはSQLが使えるDatabaseがベター<br/>
            ・スピードは要確認<br/>
            ・環境依存が少ないのLocalStorage
          </div>
          <table class="table table-striped table-bordered table-sm"> 
            <thead>
              <tr><th></th><th scope="col">LocalStorage</th><th scope="col">Database</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>サイズ</td>
                <td>△上限あり<br/>オリジン単位で5MBまで</td>
                <td>◎かなり入りそう</td>
              </tr><tr>
                <td>プラットフォーム</td>
                <td>◎標準</td>
                <td>△<br/>cordova依存</td>
              </tr><tr>
                <td>Vue(JS)</td>
                <td>◎標準</td>
                <td>△<br/>cordova依存</td>
              </tr><tr>
                <td>入れ替え</td>
                <td>◎<br/>丸ごと入替</td>
                <td>△<br/>要定型化</td>
              </tr><tr>
                <td>差分更新</td>
                <td>△</td>
                <td>◎</td>
              </tr><tr>
                <td>取り回し</td>
                <td>○<br/>オブジェクト</td>
                <td>○<br/>SQL</td>
              </tr><tr>
                <td>スピード</td>
                <td>○<br/>環境毎に要確認</td>
                <td>○<br/>環境毎に要確認</td>
              </tr><tr>
                <td>バックアップ<br/>＆リストア</td>
                <td>○</td>
                <td>△<br/>要定型化</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- 記事 -->
    <div class="card w-100">
      <div class="card-header">データベース選択肢</div>
      <div class="card-body">
        <div class="card-text">
          <h2>SQLiteかFirebaseか</h2>
          <p>シンプルなのはSQLite</p>
          <p>FirebaseはDB以外でも有用</p>
        </div>
      </div>
    </div>
    <!-- 記事 -->
    <div class="card w-100">
      <div class="card-header">SQLite使用方法</div>
      <div class="card-body">
        <div class="card-text">
          <p>前提</p>
          <div class="mention">Cordovaプラグインを使用する</div>
          <p>内容</p>
          <div class="index">
            ・プラグイン導入<br/>
            ・コーディング注意点<br/>
            ・dbクリエイト＆ドロップ<br/>
            ・db接続<br/>
            ・テーブルクリエイト<br/>
            ・クエリー（更新系）<br/>
            ・クエリー（select）<br/>
            ・dbクローズ<br/>
            ・トランザクション<br/>
            ・メンテナンス<br/>
            ・バックアップ＆リストア
          </div>
          <!-- -->
          <h2>プラグイン導入</h2>
          <p>Monacaの場合、Cordovaはインストールされている</p>
          <p>Monaca CLIを使用してプラグインを追加</p>
          <div class="note">
            <code>cd xxxxx (プルジェクトフォルダへ)</code><br/>
            （プラグイン確認）<br/>
            <code>monaca plugin list</code><br/>
            （プラグイン追加）<br/>
            <code>monaca plugin add cordova-sqlite-storage</code><br/>
            （プラグイン削除）<br/>
            <code>monaca plugin rm cordova-sqlite-storage</code><br/>
          </div>
          <p>注意点</p>
          <div class="mention">package.jsonのpluginが未定義の場合はエラーになるので空で作っておくこと</div>
          <!-- -->
          <h2>コーディング注意点</h2>
          <p>★cordova.jsの読み込みはmonaca準備済み</p>
          <p>コーディングポイント</p>
          <ol>
            <li>devicereadyで使用可能になる</li>
            <li>window.xxx でプラグイン名を指定する</li>
            <li>プラグイン名は、window.sqlitePlugin</li>
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
          <!-- -->
          <h2>dbクリエイト＆ドロップ</h2>
          <div class="note">オープン時にデータベースが存在しなければクリエイトされる</div>
          <!-- -->
          <h2>db接続</h2>
<pre><code>// DB初期化
    this.db = window.sqlitePlugin
      ? window.sqlitePlugin.openDatabase({name: 'test.db', location: 'default'})
      : window.openDatabase('test.db', '1.0', 'TEST DB', 100000)
    this.db.transaction(this.initDB, this.errorCB, this.successCB)
</code></pre>
          <!-- -->
          <h2>テーブルクリエイト</h2>
<pre><code>// クリエート＆インサートの例
    initDB: function (tx) {
      console.log('initDB create')
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS sample (id integer PRIMARY KEY AUTOINCREMENT, name text)'
      )
      console.log('initDB insert')
      var name = 'ino'
      tx.executeSql("insert into sample (name) values ('"+name+"')")
    },
</code></pre>
          <!-- -->
          <h2>クエリー（更新系）</h2>
<pre><code>// deleteの例
    this.db.transaction(function(tx) {
        tx.executeSql('DELETE FROM sample');
    }, function(error) {
        alert('DELETE error: ' + error.message);
    }, function() {
        alert('DELETE OK');
    });
</code></pre>
          <!-- -->
          <h2>クエリー（select）</h2>
<pre><code>// selectの例
    var list = [];
    this.db.transaction(function (tx) {
      var query = "SELECT * FROM sample WHERE name = ?";
      tx.executeSql(query, ['ino999'], function (tx, resultSet) {
        for(var x = 0; x &lt; resultSet.rows.length; x++) {
          var item = resultSet.rows.item(x);
          console.log("sample name: " + item.name + " id: " + item.id);
          list.push(item);
        }
      },
      function (tx, error) {
        console.log('SELECT error: ' + error.message);
      });
    }, function (error) {
      console.log('transaction error: ' + error.message);
    }, function () {
      console.log('transaction ok');
    });
    this.list = list;
</code></pre>
          <!-- -->
          <h2>dbクローズ</h2>
          <!-- -->
          <h2>トランザクション</h2>
          <!-- -->
          <h2>メンテナンス</h2>
          <div class="note">chromeのDevToolsで簡易リストとQueryが可能</div>
          <!-- -->
          <h2>バックアップ＆リストア</h2>
          <div class="note">参考：https://qiita.com/rhikos/items/110221a9ab7b415112a8</div>
          <table class="table table-striped table-bordered table-sm"> 
            <thead>
              <tr><th>プラットフォーム</th><th scope="col">保存場所</th><th scope="col">備考</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>ブラウザ</td>
                <td>不明</td>
                <td>ブラウザによって異なりそう</td>
              </tr><tr>
                <td>iOS</td>
                <td>open時に指定が出来る<br/>iOS専用の指定もある</td>
                <td>どこに入るかは未確認</td>
              </tr><tr>
                <td>Android</td>
                <td colspan="2">open時に指定が出来る<br>file:///data/data/{パッケージ名}/databases/xxx.db</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- 記事 -->
    <div class="card w-100">
      <div class="card-header">Firebaseのメリットは？</div>
      <div class="card-body">
        <div class="card-text"></div>
      </div>
    </div>
    <!-- 記事 -->
    <div class="card w-100">
      <div class="card-header">VueでFirebaseを使う</div>
      <div class="card-body">
        <div class="card-text"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ThemesData",
  data() {
    return {};
  },
  /*
  mounted: function(){
    var v = this;
  },
  */
  computed: {},
  methods: {},
  props: {
    msg: String,
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
.card-text>h2 {
  font-size: 1.0rem;
}
li>p {
  margin-bottom: 0.5rem;
}
*/
</style>
