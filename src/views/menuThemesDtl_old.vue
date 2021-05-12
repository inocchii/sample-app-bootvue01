<template>
  <div class="Themes">
    <BarTop :title="title" backPath="/" backLabel="戻る" />

    <div class="">Vue.jsでのJavaScript使用についてのメモ</div>

    <div class="card w-100">
      <div class="card-header">jQueryの使用方法を整理</div>
      <div class="card-body">
        <div class="card-text">
          <p>importを各コンポーネントで行う場合</p>
          <ol>
            <li>importを各コンポーネントで</li>
            <li>monuted でイベント記述</li>
            <li><button id="BUTJQ">alert by jquery</button></li>
          </ol>
          <p>importをmain.jsで行う場合</p>
          <ol>
            <li>
              importをmain.jsで<br />下記以外では上手くいかず<br />
              <code>window.jq = require('jquery')</code>
            </li>
            <li>
              monuted でイベント記述<br />
              <code>window.jq("#BUTJQMAIN").on('click',function(){ ...</code>
            </li>
            <li><button id="BUTJQMAIN">alert by main jquery</button></li>
          </ol>
        </div>
      </div>
    </div>

    <div class="card w-100">
      <div class="card-header">共通関数の持たせ方(Mixin)</div>
      <div class="card-body"><div class="card-text"></div></div>
    </div>

    <div class="card w-100">
      <div class="card-header">共通変数の持たせ方</div>
      <div class="card-body"><div class="card-text"></div></div>
    </div>

    <div class="card w-100">
      <div class="card-header">クラス・オブジェクトの生成と利用</div>
      <div class="card-body"><div class="card-text"></div></div>
    </div>

    <div class="card w-100">
      <div class="card-header">データベース使用について</div>
      <div class="card-body"><div class="card-text"></div></div>
    </div>

    <div class="card w-100">
      <div class="card-header">JavaScript使用時の注意点</div>
      <div class="card-body"><div class="card-text"></div></div>
    </div>

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
          <p>
            画面上で編集した配列をlocalStorageに保存。読み出して画面に復元する。
          </p>
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

    <div class="card w-100">
      <div class="card-header">Ajax：サーバ側</div>
      <div class="card-body"><div class="card-text"></div></div>
    </div>

    <div class="card w-100">
      <div class="card-header">Ajax：サーバからJSONを取得</div>
      <div class="card-body">
        <div class="card-text">
          <ol class="wrap">
            <!-- JSONパターン -->
            <li class="note-area">
              <p>JSONパターン</p>
              <ul>
                <li>JSONレコード</li>
                <li>JSON配列</li>
                <li>JSON配列複数行</li>
              </ul>
            </li>
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
      <div class="card-header">Ajax：サーバに処理依頼</div>
      <div class="card-body"><div class="card-text"></div></div>
    </div>

    <div class="card w-100">
      <div class="card-header">Ajax：サーバにデータを送信</div>
      <div class="card-body"><div class="card-text"></div></div>
    </div>

    <div class="card w-100">
      <div class="card-header">CSSの優先順位を整理</div>
      <div class="card-body">
        <div class="card-text">
          <ul>
            <li>より近くより後から読み込まれたスタイルが優先される</li>
            <li>
              セレクタの種類による優先順位
              <ol>
                <li>※p#xyz > #xyz > p.abc > .abc > p > *</li>
                <li>
                  idセレクタやclassセレクタなどの具体的・局所的なセレクタは、タイプセレクタや全称セレクタのような全般的なセレクタより優先される
                </li>
                <li>
                  idセレクタはclassセレクタより優先され、タイプセレクタは全称セレクタより優先される（idセレクタ
                  > classセレクタ > タイプセレクタ > 全称セレクタ）
                </li>
                <li>
                  要素を特定したidセレクタ・classセレクタは、要素を特定しないidセレクタ・classセレクタより優先される
                </li>
                <li>
                  優先順位が同じになった場合は、最後に指定したスタイルが適用される
                </li>
                <li>!importantを付けると最優先される</li>
              </ol>
            </li>
          </ul>
        </div>
      </div>
      <div class="card-header">iframeの高さ調節に手間取る</div>
      <div class="card-body">
        <div class="card-text">
          <ul>
            <li>高さ100%を指定すると上手くいかなかった</li>
            <li>高さ999px指定かつ100%指定を外してようやく形になる</li>
            <li>
              ★親子構造にして親を縦横比率となる％指定、子を100%にするとレスポンシブになる
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BarTop from "@/components/BarTopV2.vue";

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
      ex2_res: null, // 戻り情報丸ごとの格納
      ex2_res_data: null, // 戻りデータの格納
      ex2_res_arr: null, // 戻りデータを配列に格納
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
      var ex2_url = "https://api.coindesk.com/v1/bpi/currentprice.json";
      // パラメータ
      //var ex2_param = "function=getTenpoInfo&tenpo_cd=001";  // パラメータ
      var ex2_param = "function=getBunInfo&bun_cd=01&bun_kbn=2"; // パラメータ
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
      var buf, arr;
      try {
        this.ex2_res_data = decodeURIComponent(res.data);
        console.log("ok decodeURIComponent(res.data):" + this.ex2_res_data);
        buf = JSON.parse(this.ex2_res_data);
        console.log("ok JSON.parse(xx):buf:" + buf);
        //arr = buf[0];
        arr = buf;
        console.log("ok get arr:buf" + arr);
      } catch (e) {
        this.ex2_res_data = JSON.stringify(res.data);
        buf = JSON.stringify(res.data);
        console.log("ok JSON.stringify(res.data):buf:" + buf);
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
  },
  props: {
    msg: String,
  },
  components: {
    BarTop,
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
.card-text > h2 {
  font-size: 1rem;
}
</style>
