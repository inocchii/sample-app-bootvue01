<template>
  <div class="Themes">
    <!-- 記事 -->
    <div class="card w-100">
      <div class="card-header">Ajaxについて</div>
      <div class="card-body">
        <div class="card-text">
          <p>Ajaxについての記事</p>
          <ol>
            <li>JSON形式の整理</li>
            <li>サーバ側(PHP)</li>
            <li>サーバ側エラー対応</li>
            <li>
              <p>Vue側(Axios)</p>
              <ol>
                <li>GET</li>
                <li>POST</li>
                <li>エラーハンドリング</li>
                <li>axios API</li>
              </ol>
            </li>
            <li>受信してみる</li>
            <li>例：ログインチェック</li>
            <li>例：登録</li>
            <li>例：まとめて登録</li>
            <li>例：情報取得</li>
            <li>例：リスト取得</li>
          </ol>
        </div>
      </div>
    </div>
    <!-- 記事(JSON形式の整理)-->
    <div class="card w-100">
      <div class="card-header">Ajax：JSON形式の整理</div>
      <div class="card-body">
        <div class="card-text">
          <p>JSONパターン</p>
          <ul class="wrap">
            <li>
              <p>SR：１レコード型(ひむか)</p>
              <pre><code>
    { "code": "F5305",
      "name": "ふわふわソファー",
      "price": 285000 },
</code></pre>
            </li>
            <li>
              <p>HR：階層型(レコード内に配列)</p>
              <pre><code>
{
  "title": "GoodsData",
  "data": [
    { "code": "F5305",
      "name": "ふわふわソファー",
      "price": 285000 },
    { "code": "F108",
      "name": "ちいさなテーブル",
      "price": 85000 },
  ]
}
</code></pre>
            </li>
            <li>
              <p>MR：複数レコード型</p>
              <pre><code>
{
  [
    { "code": "F5305",
      "name": "ふわふわソファー",
      "price": 285000 },
    { "code": "F108",
      "name": "ちいさなテーブル",
      "price": 85000 },
    { "code": "F405",
      "name": "シンプルチェア",
      "price": 39800 },
  ]
}
</code></pre>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">Ajax：サーバ側</div>
      <div class="card-body">
        <div class="card-text">
          <h2>PHPの例</h2>
<pre><code>
  // JSONを連想配列に
  //$request = json_decode(file_get_contents("php://input"), true);
  // POSTを取得
  $request = $_REQUEST;

  // メイン処理（doMainにてKV型配列(連想配列)を編集）
  // ※エラー時の戻し方は決め事を作っておく
  $response = doMain($request);

  // レスポンス用JSONを生成（連想配列をJSONに）
  $json = json_encode($response, JSON_UNESCAPED_UNICODE);

  // レスポンス送信
  header("Content-Type: application/json; charset=UTF-8");
  echo $json;

  // 終了
  $log->put(PNAME,"ended...");
  exit;
</code></pre>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">Ajax：サーバ側エラー対応</div>
      <div class="card-body">
        <div class="card-text">
          <h2>PHP側でエラーと判断した場合</h2>
          <p>エラー時の返し方は決め事として定義しておいた方が良い</p>
          <h3>案A：status=200でdataにエラー内容を盛り込む</h3>
          <h3>案B：status自体を変えてしまう</h3>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">Ajax：Vue側(Axios)</div>
      <div class="card-body">
        <div class="card-text">
          <h2>参考サイト</h2>
          <p>https://www.willstyle.co.jp/blog/2751/</p>
          <h2>GET</h2>
          <p>
          GET通信はaxios.getメソッドを使用します。<br/>
          第一引数にパラメータ付きのURLを指定し、<br>
          .then()で通信が成功した際の処理を書きます。<br/>
          .catch()でエラー時の処理を書きます。<br/>
          .finally()は通信が成功しても失敗しても常に実行されます。
          </p>
<pre><code>
// コード例
axios.get('/user?ID=12345')
.then(function (response) {
  // handle success
  console.log(response);
})
.catch(function (error) {
  // handle error
  console.log(error);
})
.finally(function () {
  // always executed
});
</code></pre>
          <p>レスポンス内容</p>
<pre><code>
// レスポンスデータ
response.data
// ステータスコード
response.status
// ステータステキスト
response.statusText
// レスポンスヘッダ
response.headers
// コンフィグ
response.config
</code></pre>
          <h2>POST</h2>
          <p>
          POST通信はaxios.postメソッドを使用します。<br/>
          第2引数に送信したいデータを指定することでPOST送信できます。<br/>
          ただこの時、値を$_POSTで受け取ろうとしても取得できません。
          </p>
<pre><code>
// コード例
axios.post('/user', {
  firstName: 'Mineo',
  lastName: 'Okuda'
})
.then(function (response) {
  console.log(response);
})
.catch(function (error) {
  console.log(error);
});
</code></pre>
          <p>$_POSTで受け取りたい場合URLSearchParams APIを使用すると簡単に実装できます。</p>
<pre><code>
// コード例
const params = new URLSearchParams();
params.append('firstName', 'Mineo');
params.append('lastName', 'Okuda');
axios.post('post-api.php',params)
.then(function (response) {
  // handle success
  console.log(response);
})
.catch(function (error) {
  // handle error
  console.log(error);
})
.finally(function(){
})
</code></pre>
          <h2>エラーハンドリング</h2>
          <p>エラーとなった際にerrorに以下のような値が返ります。<br/>
          中身を確認し、どこに問題があるのかをすぐに確認することができます。
          </p>
<pre><code>
.catch(function (error) {
  if (error.response) {
    // 要求がなされたとサーバがステータスコードで応答した
    // 2XXの範囲外
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // 要求がなされたが、応答が受信されなかった
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // トリガーしたリクエストの設定に何かしらのエラーがある
    console.log('Error', error.message);
  }
  console.log(error.config);
});
</code></pre>
          <h2>axios APIを使用する</h2>
          <p>axios APIでは設定をRequest Config Optionとして渡すことで様々な要求ができます。</p>
<pre><code>
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
</code></pre>
          <p>例えばベーシック認証のかかったページへ通信を行いたい場合</p>
<pre><code>
axios({
  method: 'get',
  url: '/basic-authentication/',
  auth: { username : 'user1', password : 'pass1' },
})
</code></pre>
          <p>カスタムヘッダーやTokenを同時に送信したい場合など</p>
<pre><code>
axios({
  method: 'post',
  url: '/user/abc',
  headers: {'X-Custom-Header': 'foobar'},
  xsrfHeaderName: "X-XSRF-TOKEN",
    withCredentials: true,
    data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
})
</code></pre>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">Ajax：受信してみる</div>
      <div class="card-body">
        <div class="card-text">
          <h2>要求：Query型</h2>
<pre><code>
http://monaca.localhost/testServer/public/ajxServer.php?code=1&text=1234567890
</code></pre>
          <h2>受信内容</h2>
<pre><code>
[
  {"data":[
      {"value":100,"value2":200,"価格":"百円"},
      {"value":100,"value2":200,"価格":"百円"}
    ]
  },
  {"result":true},
  {"message":"OK"}
]
</code></pre>
          <h2>受信部分(axios)</h2>
<pre><code>
    // Ajaxから取得
    ex2AjaxGet: async function () {
      // URL
      let ex2_url = "http://monaca.localhost/testServer/public/ajxServer.php";
      // パラメータ
      let ex2_param = "code=1&text=1234567890"; // パラメータ
      console.log("Ajax要求 url=" + ex2_url + " param=" + ex2_param);
      // 受信エリア
      let res = null;
      // Axios
      await this.axios
        .get(ex2_url + "?" + ex2_param)
        .then((response) => {
          res = response;
        })
        .catch((err) => {
          if (err.response) {
            // サーバがステータスコードで応答した(2XXの範囲外)
            res = err.response;
          } else if (err.request) {
            // サーバからの応答が受信されなかった
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log("Ajax応答なし err.request=" + err.request);
          } else {
            // トリガーしたリクエストの設定に何かしらのエラーがある
            console.log('Ajax送信異常 err.message=' + err.message);
          }
          console.log('Ajaxエラー err.config=' + err.config);
        });
      console.log("Ajax要求終了 res=" + res);
      // resが取れていなければ異常終了
      if (res==null) {
        console.log('Ajaxエラー res is null & return false');
        return false;
      }
      // resのステータスが異常
      if (res.status != 200) {
        // Ajaxサーバ側がエラーと判断している
        console.log("Ajax応答異常 res.status=" + res.status);
        console.log("Ajax応答異常 res.statusText=" + res.statusText);
        console.log("Ajax応答異常 res.headers=" + res.headers);
        console.log("Ajax応答異常 res.config=" + res.config);
        console.log("Ajax応答異常 res.data=" + res.data);
        return false;
      }
      // logに内容
      console.log("Ajax応答 res.status=" + res.status);
      console.log("Ajax応答 res.statusText=" + res.statusText);
      console.log("Ajax応答 res.headers=" + res.headers);
      console.log("Ajax応答 res.config=" + res.config);
      console.log("Ajax応答 res.data=" + res.data);
    },
</code></pre>
          <h2>受信してみる</h2>
          <!-- URL選択 -->
          <select v-model="ex2_url">
            <option disabled value="">Please select URL</option>
            <option value="./json/j1.json">./json/j1.json</option>
            <option value="./json/j2.json">./json/j2.json</option>
            <option value="./json/j3.json">./json/j3.json</option>
            <option value="http://172.16.3.28/hiway13/standard/tenpo/pc/test/ajxTester.php">himuka:ajxTester</option>
            <option value="https://api.coindesk.com/v1/bpi/currentprice.json">currentprice.json</option>
            <option value="http://monaca.localhost/testServer/public/ajxServer.php">local:ajxServer</option>
            <option value="http://monaca.localhost/testServer/public/ajxServ.php">NO PHP</option>
            <option value="http://monaca.localho/testServer/public/ajxServ.php">NO SERVER</option>
          </select>
          <span>URL: {{ ex2_url }}</span><br/>
          <!-- パラメータ選択 -->
          <select v-model="ex2_param">
            <option value="">Please select param</option>
            <option value="function=getTenpoInfo&tenpo_cd=001">getTenpoInfo</option>
            <option value="function=getBunInfo&bun_cd=01&bun_kbn=2">getBunInfo</option>
            <option value="code=1&text=1234567890">testFunc</option>
            <option value="function=testError">testError</option>
            <option value="function=checkLogin&login_id=xxx&login_pw=yyy">checkLogin</option>
          </select>
          <span>param: {{ ex2_param }}</span><br/>
          <!-- Ajax取得 -->
          <button class="add-button" @click="ex2AjaxGet">
            Ajax(axios)でGet
          </button><br/>
          <span v-if="ex2_res">status:{{ ex2_res.status }}</span><br/>
          <span>data:{{ ex2_res_data }}</span>
          <!-- 解析部分 -->
          <h2>受信後の解析</h2>
          <ol class="wrap">
            <!-- 読み込みセクション -->
            <li class="read-area">
              <p>受信後の解析部分ソース</p>
<pre><code>
      let buf;
      let arr;
      try {
        // デコード
        buf = decodeURIComponent(res.data);
        console.log("ok decodeURIComponent(res.data):buf" + buf);
        // パース
        arr = JSON.parse(this.ex2_res_data);
        console.log("ok JSON.parse(xx):arr:" + arr);
      } catch (e) {
        // JSON文字列へ
        buf = JSON.stringify(res.data);
        console.log("ok JSON.stringify(res.data):buf:" + buf);
        // JSONオブジェクトへ
        arr = JSON.parse(buf);
        console.log("ok JSON.parse(buf):arr:" + arr);
      }
      // 受け取ったデータの出力
      Object.keys(arr).forEach(function (key) {
        console.log("key:" + key + " value:" + arr[key]);
      });
</code></pre>
            </li>
            <li class="read-area">
              <p>解析結果</p>
              <!-- レコードごとに処理 -->
              <div v-for="(value, key, index) in ex2_res_arr" :key="index">
                {{ key }} / {{ value }} / {{ index }}
                <!-- 項目ごとに処理 -->
                <div v-for="(v2, k2, i2) in value" :key="i2">
                  {{ k2 }} / {{ v2 }} / {{ i2 }}
                </div>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">Ajax：ログインチェック(SR：１レコード型)</div>
      <div class="card-body">
        <div class="card-text">
          <input type="text" name="login_id" v-model="ex3_login_id" />{{
            ex3_login_id
          }}
          <input type="password" name="login_pw" v-model="ex3_login_pw" />{{
            ex3_login_pw
          }}
          <button @click="ex3LoginCheck">ログインチェック</button>
          <div v-if="ex3_login_message !== null">
            メッセージ：{{ ex3_login_message }} <br />
            名前：{{ ex3_login_nm }}<br />
            レスポンス：{{ ex3_res_data }}
          </div>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">Ajax：登録</div>
      <div class="card-body"><div class="card-text"></div></div>
    </div>
    <div class="card w-100">
      <div class="card-header">Ajax：まとめて登録</div>
      <div class="card-body"><div class="card-text"></div></div>
    </div>
    <div class="card w-100">
      <div class="card-header">Ajax：情報取得</div>
      <div class="card-body"><div class="card-text"></div></div>
    </div>
    <div class="card w-100">
      <div class="card-header">Ajax：リスト取得</div>
      <div class="card-body"><div class="card-text"></div></div>
    </div>
    <div class="card w-100">
      <div class="card-header">Ajax：エラー履歴</div>
      <div class="card-body">
        <div class="card-text">
          <h2>スマホ上のデバッガーで通信エラーとなる</h2>
          <div class="mention">
            ブラウザ上ではＯＫ、スマホ上で実行すると「Network error」
          </div>
          <div class="note">
            試してみたこと
            <ol>
              <li>サーバへの到達確認
                <br/>→ サーバへの到達は確認できた</li>
              <li>SSLとした
                <br/>→外部BlogをSSLサイトとしたがNG</li>
              <li>サーバ側レスポンスを<br/>
                <code>header("Content-Type: text/plain; charset=UTF-8");</code>
                <br/>→ 効果なし</li>
              <li>サーバ側レスポンスを<br/>
                <code>header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');</code>
                <br/>→ 効果なし</li>
              <li>Monaka Localkitで実施
                <br/>→ ブラウザと同様となり現象は出ず</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ThemesData",
  data() {
    return {
      // ex2 受信してみる
      ex2_url: null,
      ex2_param: null,
      ex2_res: null, // 戻り情報丸ごとの格納
      ex2_res_data: null, // 戻りデータの格納
      ex2_res_arr: null, // 戻りデータを配列に格納
      // ex3 ログインチェック
      ex3_login_id: "",
      ex3_login_pw: "",
      ex3_login_nm: "",
      ex3_login_message: "",
      ex3_res: null, // 戻り情報丸ごとの格納
      ex3_res_data: null, // 戻りデータの格納
      ex3_res_arr: null, // 戻りデータを配列に格納
    };
  },
  /*
  mounted: function(){
    var v = this;
  },
  */
  computed: {},
  methods: {
    //
    // Ajax：受信してみる
    //
    ex2AjaxGet: async function () {
      console.log("Ajax要求 url=" + this.ex2_url + " param=" + this.ex2_param);
      this.ex2_res = null;
      this.ex2_res_data = null;
      let res = null;
      //
      // 受信部分
      //
      await this.axios
        .get(this.ex2_url + "?" + this.ex2_param)
        .then((response) => {
          res = response;
          this.ex2_res = response;
        })
        .catch((err) => {
          if (err.response) {
            // サーバがステータスコードで応答した(2XXの範囲外)
            res = err.response;
          } else if (err.request) {
            // サーバからの応答が受信されなかった
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log("Ajax応答なし err.request=" + err.request);
          } else {
            // トリガーしたリクエストの設定に何かしらのエラーがある
            console.log('Ajax送信異常 err.message=' + err.message);
          }
          console.log('Ajaxエラー err.config=' + err.config);
        });
      console.log("Ajax要求終了 res=" + res);
      // resが取れていなければ異常終了
      if (res==null) {
        console.log('Ajaxエラー res is null & return false');
        return false;
      }
      this.ex2_res = res;
      this.ex2_res_data = res.data;
      if (res.status != 200) {
        // Ajaxサーバ側がエラーと判断している
        console.log("Ajax応答異常 res.status=" + res.status);
        console.log("Ajax応答異常 res.statusText=" + res.statusText);
        console.log("Ajax応答異常 res.headers=" + res.headers);
        console.log("Ajax応答異常 res.config=" + res.config);
        console.log("Ajax応答異常 res.data=" + res.data);
        return false;
      }
      // logに内容
      console.log("Ajax応答 res.status=" + res.status);
      console.log("Ajax応答 res.statusText=" + res.statusText);
      console.log("Ajax応答 res.headers=" + res.headers);
      console.log("Ajax応答 res.config=" + res.config);
      console.log("Ajax応答 res.data=" + res.data);
      //this.ex2_res_data = decodeURIComponent(res.data);
      console.log("JSON.stringify(res.data):" + JSON.stringify(res.data));
      //
      // 解析部分
      //
      let buf;
      let arr;
      try {
        // デコード
        this.ex2_res_data = decodeURIComponent(res.data);
        console.log("ok decodeURIComponent(res.data):" + this.ex2_res_data);
        // JSONオブジェクトへパース
        buf = JSON.parse(this.ex2_res_data);
        console.log("ok JSON.parse(xx):buf:" + buf);
        //arr = buf[0];
        arr = buf;
        console.log("ok get arr:buf" + arr);
      } catch (e) {
        // JSON文字列へ
        this.ex2_res_data = JSON.stringify(res.data);
        buf = JSON.stringify(res.data);
        console.log("ok JSON.stringify(res.data):buf:" + buf);
        // JSONオブジェクトへパース
        arr = JSON.parse(buf);
        console.log("ok JSON.parse(xx):buf:" + buf);
      }
      console.log("JSON buf:" + buf + " arr:" + arr);
      /*
      if ( this.ex2_res_data instanceof JSONArray ) {
        buf = JSON.parse(this.ex2_res_data);
      } else {
        buf = this.ex2_res_data;
      }
      */
      // 受け取ったデータ部全体が配列の１つめとなっているため
      //var arr = JSON.parse(this.ex2_res_data)[0];
      //var arr = buf[0];
      Object.keys(arr).forEach(function (key) {
        console.log("key:" + key + " value:" + arr[key]);
      });
      this.ex2_res_arr = arr;
    },
    //
    // ログインチェック
    //
    ex3LoginCheck: async function () {
      var ex3_url = "http://monaca.localhost/testServer/public/ajxServer.php";
      // パラメータ
      var ex3_param =
        "function=checkLogin&login_id=" +
        this.ex3_login_id +
        "&login_pw=" +
        this.ex3_login_pw; // パラメータ
      console.log("Ajax要求 url=" + ex3_url + " param=" + ex3_param);
      let res = null;
      await this.axios
        .get(ex3_url + "?" + ex3_param)
        .then((response) => {
          res = response;
        })
        .catch((err) => {
          console.log("Ajax要求失敗 err.response=" + err.response);
          return err.response;
        });
      if (res.status != 200) {
        console.log("Ajax要求失敗 res.status=" + res.status + " res=" + res);
        return false;
      }
      // resを格納
      console.log("res:" + res);
      this.ex3_res = res;
      // res.dataをデコードして格納
      console.log("res.data:" + res.data);
      //this.ex2_res_data = decodeURIComponent(res.data);
      console.log("JSON.stringify(res.data):" + JSON.stringify(res.data));
      var buf, arr;
      try {
        this.ex3_res_data = decodeURIComponent(res.data);
        console.log("ok decodeURIComponent(res.data):" + this.ex3_res_data);
        buf = JSON.parse(this.ex3_res_data);
        console.log("ok JSON.parse(xx):buf:" + buf);
        //arr = buf[0];
        arr = buf;
        console.log("ok get arr:buf" + arr);
      } catch (e) {
        this.ex3_res_data = JSON.stringify(res.data);
        buf = JSON.stringify(res.data);
        console.log("ok JSON.stringify(res.data):buf:" + buf);
        arr = JSON.parse(buf);
        console.log("ok JSON.parse(xx):arr:" + arr);
      }
      console.log("JSON buf:" + buf + " arr:" + arr);
      // 受け取ったデータ部全体が配列の１つめとなっているため
      //var arr = JSON.parse(this.ex2_res_data)[0];
      //var arr = buf[0];
      this.ex3_login_nm = arr["user_nm"];
      this.ex3_login_message = arr["message"];
      Object.keys(arr).forEach(function (key) {
        console.log("key:" + key + " value:" + arr[key]);
      });
      this.ex3_res_arr = arr;
    },
  },
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
