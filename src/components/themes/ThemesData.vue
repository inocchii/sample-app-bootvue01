<template>
  <div class="Themes">
    <!-- 記事 -->
    <div class="card w-100">
      <div class="card-header">データ保持について</div>
      <div class="card-body">
        <div class="card-text">
          <h2>JSONかDatabaseか</h2>
          <p>毎回Ajaxで入れ替えるならJSONで良いかも</p>
          <p>差分更新ならDatabaseが良さそう</p>
          <p>取り出しはSQLが使えるDatabaseがベター</p>
          <p>スピードは未確認</p>
          <p>環境依存が少ないのはどっち？</p>
        </div>
      </div>
    </div>
    <!-- 記事(LocalStorage) -->
    <div class="card w-100">
      <div class="card-header">LocalStorageへの読み書き</div>
      <div class="card-body">
        <div class="card-text">
          <h2>記法</h2>
          <ul>
            <li>書き込み：<code>localStorage.setItem('key', value);</code></li>
            <li>読み出し：<code>buf = localStorage.getItem('key');</code></li>
          </ul>
          <h2>例01：配列をlocalStorageに書き込み、読み出しで復元</h2>
          <p>画面上で編集した配列をlocalStorageに保存。読み出して画面に復元する。</p>
          <article class="wrap">
            <!-- 読み込み -->
            <section class="read-area">
              <button class="add-button" @click="ex1Read">
                localStorageから読み出し
              </button>
            </section>
            <!-- 入力エリア -->
            <section class="todo-form">
              <input
                type="text"
                name="ex1_todo"
                class="input-text"
                placeholder="please input todo"
                :value="ex1_todo"
                @input="ex1InputTodo"
              />
              <button class="add-button" @click="ex1AddTodo">ADD TODO</button>
            </section>
            <!-- 一覧エリア -->
            <section class="list-area">
              <!-- 未完了分 -->
              <p class="todo-title">incomplete items</p>
              <ul class="todo-area">
                <li
                  v-for="(todo, i) in ex1IncompleteTodo"
                  :key="i"
                  class="list"
                >
                  <span class="list-label">{{ todo.text }}</span>
                  <button
                    class="list-button button-done"
                    @click="ex1ToggleIsDone(todo.id)"
                  >
                    DONE
                  </button>
                  <button
                    class="list-button button-delete"
                    @click="ex1DeleteTodo(todo.id)"
                  >
                    DELETE
                  </button>
                </li>
              </ul>
              <!-- 完了分 -->
              <p class="todo-title">complete items</p>
              <ul class="todo-area">
                <li v-for="(todo, i) in ex1DoneTodo" :key="i" class="list">
                  <span class="list-label">{{ todo.text }}</span>
                  <button class="list-button" @click="ex1ToggleIsDone(todo.id)">
                    RETURN
                  </button>
                  <button
                    class="list-button button-delete"
                    @click="ex1DeleteTodo(todo.id)"
                  >
                    DELETE
                  </button>
                </li>
              </ul>
            </section>
            <!-- 書き込み -->
            <section class="write-area">
              <button class="add-button" @click="ex1Write">
                localStorageへ書き込み
              </button>
            </section>
          </article>
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
      // ex1 ----------
      ex1_todo_list: [],
      ex1_todo: "",
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
  computed: {
    ex1DoneTodo() {
      // 配列の抽出メソッドで条件合致分だけを取得
      return this.ex1_todo_list.filter((todo) => {
        return todo.isDone === true;
      });
    },
    ex1IncompleteTodo() {
      // 配列の抽出メソッド（省略形）
      return this.ex1_todo_list.filter((todo) => todo.isDone === false);
    },
  },
  methods: {
    // ex1 ----------
    // 入力
    ex1InputTodo(e) {
      this.ex1_todo = e.target.value;
    },
    // TODO追加
    ex1AddTodo() {
      if (!this.ex1_todo) return;
      const text = this.ex1_todo;
      const id = Math.ceil(Math.random() * 1000);
      const todo = { id, text, isDone: false };
      this.ex1_todo_list.push(todo);
      this.ex1_todo = "";
    },
    // 削除
    ex1DeleteTodo(id) {
      // 対象TODOの位置を取得
      const index = this.ex1GetIndexBy(id);
      // 配列から該当箇所を削除（位置とそこからの件数）
      this.ex1_todo_list.splice(index, 1);
    },
    // 完了に
    ex1ToggleIsDone(id) {
      // 対象TODOの位置を取得
      const index = this.ex1GetIndexBy(id);
      // 配列の該当TODOのisDone値を変更
      this.ex1_todo_list[index].isDone = !this.ex1_todo_list[index].isDone;
    },
    // TODOの位置を取得
    ex1GetIndexBy(id) {
      const filteredTodo = this.ex1_todo_list.filter(
        (todo) => todo.id === id
      )[0];
      const index = this.ex1_todo_list.indexOf(filteredTodo);
      return index;
    },
    // LocalStorageへの書き込み
    ex1Write() {
      // オブジェクトをJSON文字列に変換して書き込む
      const buf = JSON.stringify(this.ex1_todo_list);
      console.log("localStorageへの書き込み key=ex1_todo_list value=" + buf);
      localStorage.setItem("ex1_todo_list", buf);
    },
    // LocalStorageからの読み込み
    ex1Read() {
      console.log("localStorageからの読み込み key=ex1_todo_list");
      const buf = localStorage.getItem("ex1_todo_list");
      console.log("localStorageからの読み込み value=" + buf);
      // オブジェクトに変換して取り込む
      if (buf != null) {
        const buf2 = JSON.parse(buf);
        console.log("Object復元 value=" + buf2);
        this.ex1_todo_list = buf2;
      }
    },

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
</style>
