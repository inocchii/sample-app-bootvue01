<template>
  <div class="Themes">
    <!-- 記事 -->
    <div class="card w-100">
      <div class="card-header">Ajaxについて</div>
      <div class="card-body">
        <div class="card-text">
          <h2>Ajaxについての記事</h2>
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
      <div class="card-body"><div class="card-text"></div></div>
    </div>
    <div class="card w-100">
      <div class="card-header">Ajax：サーバからJSON取得(SR：１レコード型)</div>
      <div class="card-body">
        <div class="card-text">
          <ol class="wrap">
            <!-- 条件指定セクション -->
            <li class="select-area">
              <p>条件指定</p>
              <ul>
                <li>取得先選択</li>
                <li>条件指定</li>
              </ul>
            </li>
            <!-- 読み込みセクション -->
            <li class="read-area">
              <p>読み込み</p>
              <!-- Ajax取得 -->
              <button class="add-button" @click="ex2AjaxGet">
                Ajax(axios)でGet
              </button>
              {{ ex2_res_data }}
              <!-- レコードごとに処理 -->
              <div v-for="(value,key,index) in ex2_res_arr" :key="index">
              {{ key }} / {{ value }} / {{ index }}
                <!-- 項目ごとに処理 -->
                <div v-for="(v2,k2,i2) in value" :key="i2">
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
          <input type="text" name="login_id" v-model="ex3_login_id" />{{ex3_login_id}}
          <input type="password" name="login_pw" v-model="ex3_login_pw" />{{ex3_login_pw}}
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
      <div class="card-header">Ajax：サーバに処理依頼</div>
      <div class="card-body"><div class="card-text"></div></div>
    </div>
    <div class="card w-100">
      <div class="card-header">Ajax：サーバにデータを送信</div>
      <div class="card-body"><div class="card-text"></div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ThemesData",
  data() {
    return {
      // ex2 ----------
      //ex2_url: 'https://rscup.himuka.ne.jp/hiway13/standard/honbu/pc/common/ajxServer.php',
      //ex2_url: 'http://172.16.3.28/hiway13/standard/tenpo/pc/test/ajxTester.php',
      //ex2_url: "./json/j1.json",    // public/json/j1.json
      //ex2_param: "function=getTenpoInfo&tenpo_cd=001",  // パラメータ
      //ex2_param: "function=getBunInfo&bun_cd=01&bun_kbn=2",  // パラメータ
      ex2_res: null,      // 戻り情報丸ごとの格納
      ex2_res_data: null, // 戻りデータの格納
      ex2_res_arr: null,  // 戻りデータを配列に格納
      // ex3 ----------
      ex3_login_id: "",
      ex3_login_pw: "",
      ex3_login_nm: "",
      ex3_login_message: "",
      ex3_res: null,      // 戻り情報丸ごとの格納
      ex3_res_data: null, // 戻りデータの格納
      ex3_res_arr: null,  // 戻りデータを配列に格納

    };
  },
  /*
  mounted: function(){
    var v = this;
  },
  */
  computed: {},
  methods: {
    // Ajaxから取得
    ex2AjaxGet: async function () {
      // jsonファイル
      //var ex2_url = "./json/j1.json";    // public/json/j1.json
      //var ex2_url = "./json/j2.json";    // public/json/j2.json
      //var ex2_url = "./json/j3.json";    // public/json/j3.json
      // 実データの例
      //var ex2_url = 'http://172.16.3.28/hiway13/standard/tenpo/pc/test/ajxTester.php';
      //var ex2_url = 'https://api.coindesk.com/v1/bpi/currentprice.json';
      var ex2_url = 'http://monaca.localhost/testServer/public/ajxServer.php';
      // パラメータ
      //var ex2_param = "function=getTenpoInfo&tenpo_cd=001";  // パラメータ
      //var ex2_param = "function=getBunInfo&bun_cd=01&bun_kbn=2";  // パラメータ
      var ex2_param = "code=1&text=1234567890";  // パラメータ
      console.log("Ajax要求 url=" + ex2_url + " param=" + ex2_param);
      let res = null;
      await this.axios
        .get(ex2_url + "?" + ex2_param)
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
      this.ex2_res = res;
      // res.dataをデコードして格納
      console.log("res.data:" + res.data);
      //this.ex2_res_data = decodeURIComponent(res.data);
      console.log("JSON.stringify(res.data):" + JSON.stringify(res.data));
      var buf,arr;
      try {
        this.ex2_res_data = decodeURIComponent(res.data);
        console.log("ok decodeURIComponent(res.data):" + this.ex2_res_data);
        buf = JSON.parse(this.ex2_res_data);
        console.log("ok JSON.parse(xx):buf:" + buf);
        //arr = buf[0];
        arr = buf;
        console.log("ok get arr:buf" + arr);
      } catch(e) {
        this.ex2_res_data = JSON.stringify(res.data);
        buf = JSON.stringify(res.data);
        console.log("ok JSON.stringify(res.data):buf:" + buf);
        arr = JSON.parse(buf);
        console.log("ok JSON.parse(xx):buf:" + buf);
      }
      console.log("JSON buf:"+buf+" arr:"+arr);
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
    ex3LoginCheck: async function() {
      var ex3_url = 'http://monaca.localhost/testServer/public/ajxServer.php';
      // パラメータ
      var ex3_param = "function=checkLogin&login_id="+this.ex3_login_id+"&login_pw="+this.ex3_login_pw;  // パラメータ
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
      var buf,arr;
      try {
        this.ex3_res_data = decodeURIComponent(res.data);
        console.log("ok decodeURIComponent(res.data):" + this.ex3_res_data);
        buf = JSON.parse(this.ex3_res_data);
        console.log("ok JSON.parse(xx):buf:" + buf);
        //arr = buf[0];
        arr = buf;
        console.log("ok get arr:buf" + arr);
      } catch(e) {
        this.ex3_res_data = JSON.stringify(res.data);
        buf = JSON.stringify(res.data);
        console.log("ok JSON.stringify(res.data):buf:" + buf);
        arr = JSON.parse(buf);
        console.log("ok JSON.parse(xx):arr:" + arr);
      }
      console.log("JSON buf:"+buf+" arr:"+arr);
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
<style scoped lang="scss">
</style>
