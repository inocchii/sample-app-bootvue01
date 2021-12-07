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
            ・LocalStorageは容量制限がある(最大5MB程度)<br/>
            ・大量＆差分更新ならDB<br/>
            ・取り出しはSQLが使えるDB(Sqlite)がベター<br/>
            ・スピードは要確認<br/>
            ・環境依存が少ないのはLocalStorageかindexedDb
          </div>
          <table class="table table-striped table-bordered table-sm"> 
            <thead>
              <tr><th></th>
                <th scope="col">LocalStorage</th>
                <th scope="col">DB(Sqlite)</th>
                <th scope="col">DB(indexedDb)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>サイズ</td>
                <td>△上限あり<br/>オリジン単位で<br/>5MBまで</td>
                <td>◎かなり入りそう</td>
                <td>◎かなり入りそう</td>
              </tr><tr>
                <td>プラットフォーム</td>
                <td>◎標準</td>
                <td>△<br/>cordova依存</td>
                <td>◎標準</td>
              </tr><tr>
                <td>Vue(JS)</td>
                <td>◎標準</td>
                <td>△<br/>cordova依存</td>
                <td>◎標準？</td>
              </tr><tr>
                <td>入れ替え</td>
                <td>◎<br/>丸ごと入替</td>
                <td>△<br/>要定型化</td>
                <td>△<br/>要定型化</td>
              </tr><tr>
                <td>差分更新</td>
                <td>△</td>
                <td>◎</td>
                <td>◎</td>
              </tr><tr>
                <td>取り回し</td>
                <td>○<br/>オブジェクト</td>
                <td>○<br/>SQL</td>
                <td>○<br/>オブジェクト</td>
              </tr><tr>
                <td>スピード</td>
                <td>○<br/>環境毎に要確認</td>
                <td>○<br/>環境毎に要確認</td>
                <td>○<br/>環境毎に要確認</td>
              </tr><tr>
                <td>バックアップ<br/>＆リストア</td>
                <td>○</td>
                <td>△<br/>要定型化</td>
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
          <h2>SQLite/indexedDb/Firebase</h2>
          <p>シンプルなのはSQLite</p>
          <p>ブラウザ標準はindexedDb</p>
          <p>FirebaseはDB以外でも有用</p>
        </div>
      </div>
    </div>
    <!-- 記事 -->
    <div class="card w-100">
      <div class="card-header">IndexedDBの使用</div>
      <div class="card-body">
        <div class="card-text">
          <p>前提</p>
          <div class="mention">環境依存が少ないことが採用前提</div>
          <p>内容</p>
          <div class="index">
            ・ライブラリ検討(localForage/dexie.js/JsStore)<br/>
            ・Vue使用のためのインストール<br/>
            ・Vueでの基本パターン<br/>
            ・設定値や保持値の入れ物として使用<br/>
            ・LocalStorageと同様に使用<br/>
            ・テーブル的に使用<br/>
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
          <h2>ライブラリ検討</h2>
          <p>まずはdexie.jsで試してみる</p>
          <table class="table table-striped table-bordered table-sm"> 
            <thead>
              <tr><th></th>
                <th scope="col">localForage</th>
                <th scope="col">dexie.js</th>
                <th scope="col">JsStore</th></tr>
            </thead>
            <tbody>
              <tr><td>概略</td>
                <td>シンプルなname:value形式の構文を提供。IndexdDB非対応のブラウザではlocalStorageにフォールバック</td>
                <td>シンプルな構文により高速なコード開発が可能に</td>
                <td>シンプルで高度なラッパー。SQLライクな文法を備える</td></tr>
              <tr><td>人気</td>
                <td>高</td><td>中</td><td>不明</td></tr>
              <tr><td>サイズ</td>
                <td>28.8K</td><td>70.8K</td><td>10.2K</td></tr>
              <tr><td>機能</td>
                <td>WebStorageベース</td>
                <td>IndexedDBのラッパ</td>
                <td>SQLライク</td></tr>
              <tr><td>選定</td>
                <td>△localStorage同様の使い方</td>
                <td>◎localDBとして使用する場合</td>
                <td>-</td></tr>
            </tbody>
          </table>
          <h2>Vue使用のためのインストール</h2>
          <div class="note">
            <code>$ cd xxxxx (プルジェクトフォルダへ)</code><br/>
            <code>$ npm install --save dexie （インストール）</code><br/>
          </div>
          <h2>Vueでの基本パターン</h2>
            <h3>Dexieを継承したクラスを作成しそこにテーブル等を定義</h3>
              <div class="note">
                <code>src/globals/CDbSet.js</code>
              </div>
            <h3>main.jsで読み込みwindow.dbにセット</h3>
              <div class="note">
                <code>import { CDbSet } from "@/globals/CDbSet.js";</code><br/>
                <code>window.db = new CDbSet("testDb",2); // DB名とVersion</code>
              </div>
            <h3>各モジュールではwindow.dbを使用</h3>
              <div class="note">
                ・テーブルからの値取得(キー指定)<br/>
                <code>window.db.table名.get(キー値)</code><br/>
                ・テーブルからの値取得(各種条件)<br/>
                <code>window.db.table名.where({項目:条件値})</code><br/>
                ・テーブルへの書き込み<br/>
                <code>window.db.table名.put({項目１:値１,項目２:値２,・・})</code><br/>
                ・削除、クリアなど詳細は<br/>
                <code>https://dexie.org/docs/Table/Table</code>
              </div>
          <h2>設定値や保持値の入れ物として使用</h2>
          <ul>
            <li>conf : 初期値等を入れる</li>
            <li>kbn_def : 区分等の定義を入れる</li>
            <li>count : 件数等を保持する</li>
            <li>log : ログを保持する</li>
          </ul>
          <p>注意点</p>
          <div class="mention">非同期：リアクティブ使用には注意が必要</div>
          <h2>LocalStorageと同じ様に使用</h2>
          <p>丸ごと入替方式</p>
          <h2>テーブル的に使用</h2>
          <p>キーと値の持たせ方</p>
          <p>差分更新のパターン</p>
          <p>取り出し/追加更新/削除</p>
          <h2>コーディング注意点</h2>
          <p>非同期であること</p>
          <p>リアクティブ値への取り出し＆セットは要注意</p>
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
    return {
      //db: window.db,
    };
  },
  mounted: function() {
    let wCount = this.addCount('c1');
    console.log("ThemesDatabase window.db.count.add/put(c1)",wCount);
    // 下段メニューバーのバッジカウントに加算してみる
    wCount = this.addCount('search');
    // DB登録値はリアクティブに反映されないのでvuexに設定
    // but 非同期でありvuexへの反映が遅れるのかリアクティブには動作せず
    //this.setCounterVuex('search',wCount);
    console.log("ThemesDatabase window.db.count.add/put(search)",wCount);

  },
  computed: {},
  methods: {
    async addCount(argName) {
      // DBのcountテーブルからレコード(object)を取得
      const w = await window.db.count.get(argName);
      console.log("getCount get name:"+argName+" obj:",w);
      let newCount = 1;
      // レコードの有無により
      if ( !w ) {
        // 存在しなければ追加
        window.db.count.add({name: argName, counter: newCount});
      } else {
        // 存在していれば加算
        if ( Number.isNaN(w.counter) ) {
          window.db.count.put({name: argName, counter: newCount});
        } else {
          newCount = w.counter + 1;
          window.db.count.put({name: argName, counter: newCount});
        }
      }
      // リアクティブな保持項目(vuex)に対しては同期後にセットしてやる
      this.setCounterVuex(argName,newCount);
      return w;
    },
    setCounterVuex(argName,argCount) {
      this.$store.dispatch('setCount',[argName,argCount]);
      console.log("setCounterVuex:$store.setCount:"+argName+":count="+this.$store.state.COUNTS[argName]);
    },
  },
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
