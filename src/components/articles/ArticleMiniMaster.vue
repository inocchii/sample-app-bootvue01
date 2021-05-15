<template>
  <div class="Article">
    <!-- 記事 -->
    <div class="card w-100">
      <div class="card-header">少量マスタのハンドリングについて</div>
      <div class="card-body">
        <div class="card-text">
          <p>内容</p>
          <ol>
            <li>少量マスタの例</li>
            <li>少量マスタの特徴</li>
            <li>マスタの持ち方</li>
            <li>初期構築ロジック</li>
            <li>更新のきっかけ</li>
            <li>更新ロジック</li>
            <li>モデルケース：分類マスタ</li>
          </ol>
          <h2>少量マスタの例</h2>
          <ul>
            <li>分類マスタ</li>
            <li>カテゴリマスタ</li>
            <li>店舗マスタ</li>
            <li>仕入先マスタ</li>
          </ul>
          <h2>少量マスタの特徴</h2>
          <ul>
            <li>毎回入れ替えができるレベルの量</li>
            <li>選択条件や設定項目として使用される</li>
          </ul>
          <h2>マスタの持ち方</h2>
          <ul>
            <li>Vuexの配列として</li>
            <li>LocalStorageではJSONやDB</li>
            <li>サーバ上ではテーブルに</li>
          </ul>
          <h2>初期構築ロジック</h2>
          <ul>
            <li>Vuexに存在しない場合はLocalStorageから</li>
            <li>LocalStorageに存在しない場合はAjaxから</li>
            <li>AjaxでサーバからJSON形式で取得</li>
            <li>LocalStorageに保存(入れ替え)</li>
            <li>LocalStorageからVuexに(入れ替え)</li>
          </ul>
          <h2>更新のきっかけ</h2>
          <ul>
            <li>起動時に自動判定</li>
            <li>設定画面から手動で</li>
            <li>通知に従って</li>
          </ul>
          <h2>更新ロジック</h2>
          <ul>
            <li>きっかけによる起動</li>
            <li>AjaxでサーバからJSON形式で取得</li>
            <li>LocalStorageに保存(入れ替え)</li>
            <li>LocalStorageからVuexに(入れ替え)</li>
            <li>Ajaxに失敗した場合は入れ替えしない</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">モデルケース：分類マスタ</div>
      <div class="card-body">
        <div class="card-text">
          <h2>マスタの持ち方</h2>
          <ul>
            <li>Vuexの配列として</li>
            <li>LocalStorageではJSONやDB</li>
            <li>サーバ上ではテーブルに</li>
          </ul>
          <h2>初期構築ロジック</h2>
          <ul>
            <li>Vuexに存在しない場合はLocalStorageから</li>
            <li>LocalStorageに存在しない場合はAjaxから</li>
            <li>AjaxでサーバからJSON形式で取得</li>
            <li>LocalStorageに保存(入れ替え)</li>
            <li>LocalStorageからVuexに(入れ替え)</li>
          </ul>
          <h2>更新のきっかけ</h2>
          <ul>
            <li>起動時に自動判定</li>
            <li>設定画面から手動で</li>
            <li>通知に従って</li>
          </ul>
          <h2>更新ロジック</h2>
          <ul>
            <li>きっかけによる起動</li>
            <li>AjaxでサーバからJSON形式で取得</li>
            <li>LocalStorageに保存(入れ替え)</li>
            <li>LocalStorageからVuexに(入れ替え)</li>
            <li>Ajaxに失敗した場合は入れ替えしない</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleMiniMaster",
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
</style>
