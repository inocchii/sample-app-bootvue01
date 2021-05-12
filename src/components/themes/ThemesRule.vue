<template>
  <div class="Themes">
    <div class="">プロジェクトルール設定について</div>
    <div class="card w-100">
      <div class="card-header">フォルダ構成を整理</div>
      <div class="card-body">
        <div class="card-text">
          <h2>Vue CLI 構築後のフォルダ構成</h2>
          <pre><code>
src
--assets
--components
--conf  ※追加
--mixins  ※追加
--router
--store
--views
</code></pre>
          <h2>フォルダ構成の例</h2>
          <code
            >https://ichi.pro/vue-js-purojyekuto-o-koseisuru-hoho-250991675966892</code
          >
          <p>
            中核をmodulesとしている。サブシステム毎にcomponents,store,各helperを格納
          </p>
          <pre><code>
src
--assets
--common
--layouts
--middlewares
--modules
----orders
------__tests__
------components
--------OrdersList.vue
--------OrderDetails.vue
------store
--------actions.ts
--------getters.ts
--------mutations.ts
--------state.ts
------helpers.ts
------types.ts
--plugins
--router
--services
--static
--store
--views
</code></pre>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">ネーミングルール</div>
      <div class="card-body"><div class="card-text"></div></div>
    </div>
    <div class="card w-100">
      <div class="card-header">スタイル</div>
      <div class="card-body"><div class="card-text"></div></div>
    </div>
    <div class="card w-100">
      <div class="card-header">ストア</div>
      <div class="card-body"><div class="card-text"></div></div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "xxx",
  data() {
    return {
      myName: "ThemesJS.vue",
    };
  },
  props: {
    msg: String,
  },
  mounted: function () {
    console.log("this is " + this.myName + " mounted");
    $("#BUTJQ").on("click", function () {
      console.log("function by jquery on BUTJQ");
      alert("alert by JQ");
    });
    window.jq("#BUTJQMAIN").on("click", function () {
      console.log("function by jquery on BUTJQ MAIN");
      alert("alert by JQ MAIN");
    });
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
