<template>
  <div class="Themes">
    <div class="card w-100">
      <div class="card-header">LocalStorageへの読み書き</div>
      <div class="card-body">
        <div class="card-text">
          書き込み：<code>localStorage.setItem('key', value);</code><br />
          読み出し：<code>buf = localStorage.getItem('key');</code><br />
          例01：配列をlocalStorageに書き込み、読み出しで復元
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
      <div class="card-header">Ajax：サーバ側準備</div>
      <div class="card-body"><div class="card-text"></div></div>
    </div>
    <div class="card w-100">
      <div class="card-header">Ajax：サーバとJSONをやりとり</div>
      <div class="card-body">
        <div class="card-text">
          <article class="wrap">
            <!-- 読み込み -->
            <section class="read-area">
              <button class="add-button" @click="ex1AjaxGet">
                Ajax(axios)でGet
              </button>
              {{ ex1_res }}
            </section>
          </article>
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
      // ex1 ----------
      ex1_todo_list: [],
      ex1_todo: "",
      //ex1_url: 'https://rscup.himuka.ne.jp/hiway13/standard/honbu/pc/common/ajxServer.php',
      ex1_url: "./json/j1.json", // public/json/j1.json
      ex1_param: "function=getTenpoInfo&tenpo_cd=001",
      ex1_res: null,
      ex1_res_data: null,
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
    ex1AjaxGet: async function () {
      console.log("Ajax要求 url=" + this.ex1_url + " param=" + this.ex1_param);
      let res = null;
      await this.axios
        .get(this.ex1_url + "?" + this.ex1_param)
        .then((response) => {
          res = response;
        })
        .catch((err) => {
          alert("err.response:" + err.response);
          console.log("Ajax要求失敗 err.response=" + err.response);
          return err.response;
        });
      if (res.status != 200) {
        console.log("Ajax要求失敗 res.status=" + res.status);
        console.log("Ajax要求失敗 res=" + res);
        return false;
      }
      // resをJSON文字列に
      //alert('ok res:'+res);
      console.log("res:" + res);
      var buf = JSON.stringify(res);
      console.log("ok JSON.stringify(res):" + buf);
      this.ex1_res = buf;
      this.ex1_res_data = res.data;
      console.log("res.data:" + res.data);
      console.log("JSON.stringify(res.data):" + JSON.stringify(res.data));
      Object.keys(res.data).forEach(function (key) {
        console.log("key:" + key + " value:" + res.data[key]);
      });
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
</style>
