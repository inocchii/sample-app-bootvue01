<template>
  <div class="Themes">
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
<style scoped lang="scss"></style>
