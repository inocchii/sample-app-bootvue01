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
      <div class="card-header">そもそもSQLiteは使えるのか？</div>
      <div class="card-body">
        <div class="card-text">
          <h2>storeにsqliteファイルを読み込んで使用するパターン</h2>
          <p>
            sqliteの更新をサーバ側で行って同期する？
            <br />参考：https://github.com/skysign/public/tree/master/vue.js/boilerplate/vuejs-sqljs-boilerplate
          </p>
          <pre><code>
import SQL from 'sql.js';

export default {
  name: 'hoge',
  data() {
    return {
      sqlite: require('@/assets/test.db'), // これが失敗する
    };
  },
  methods: {
    select() {
      const dataBase = new SQL.Database(this.sqlite);
      const sql = 'SELECT * FROM table1';
      const res = dataBase.exec(sql);
      console.log(res);
    },
  },
};
</code></pre>
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
