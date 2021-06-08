<template>
  <div class="Article">
    <!-- 記事 -->
    <div class="card w-100">
      <div class="card-header">地図について</div>
      <div class="card-body">
        <div class="card-text">
          <p>内容</p>
          <ul>
            <li>GoogleMap使用準備</li>
            <li>画面表示(基本パターン)</li>
            <li>画面表示(Vueコンポーネントでの表示)</li>
            <li>現在位置の取得</li>
            <li>(備忘)Googleアカウント関連</li>
          </ul>
          <p>参考サイト</p>
          <ul>
            <li><a href='https://www.javadrive.jp/google-maps-javascript/'>Google Maps JavaScript API入門</a></li>
            <li><a href='https://developers.google.com/maps/gmp-get-started?hl=ja'>Google Maps Platform スタートガイド</a></li>
            <li><a href='https://reffect.co.jp/vue/google-map-vue'>ライブラリなしでGoogle MapをVue.jsで使う方法</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">GoogleMap使用準備</div>
      <div class="card-body">
        <div class="card-text">
          <ol>
            <li>アカウントの作成</li>
            <li>プロジェクトの作成</li>
            <li>API または SDK を 有効にする</li>
            <li>API キーを取得</li>
          </ol>
          <h2>アカウントの作成</h2>
          <h2>プロジェクトの作成</h2>
          <h2>API または SDK を 有効にする</h2>
          <h2>API キーを取得</h2>
          <div class="link"><a href=""></a></div>
          <div class="note">AIzaSyDqudlaKZ8uBB-QAc16oQTIhAxVbw0eeHw</div>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">画面表示(基本パターン)</div>
      <div class="card-body">
        <div class="card-text">
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">画面表示(Vueコンポーネントでの表示)</div>
      <div class="card-body">
        <div class="card-text">
          <div class="summary">
            Vue.jsでは・・<br/>
            <br/>index.htmlに記述すると、
            <br/>GoogleMapが利用されていないページにアクセスしても
            <br/>GoogleMapのライブラリをダウンロードすることになる。
            <br/>マップを表示するコンポーネントのみ
            <br/>Google Mapのライブラリをダウンロードできるように
            <br/>ページに動的にscriptタブを追加する方法をとる。
          </div>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">(備忘)Googleアカウント関連</div>
      <div class="card-body">
        <div class="card-text">
          <h2>Google Cloud Platform</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleLogin",

  mounted: function() {
  },
  data() {
    return {
    };
  },
  computed: {},
  methods: {
  },
  props: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
