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
  },
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
