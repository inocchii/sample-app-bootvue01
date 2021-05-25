<template>
  <div class="Article">
    <!-- 記事 -->
    <div class="card w-100">
      <div class="card-header">Push通知（ニフクラ）</div>
      <div class="card-body">
        <div class="card-text">
          <p>内容</p>
          <ul>
            <li>Push通知について</li>
            <li>Push通知の実現方法(ニフクラの場合)</li>
            <li>Push通知とアプリとの連携</li>
          </ul>
          <!-- -->
          <h2>Push通知について</h2>
          <p>NCMB</p>
          <img src='img/others/push_ncmb.png' style='width:100%;'/>
          <p>FCM</p>
          <img src='img/others/push_fcm.png' style='width:100%;'/>
          <p>APNs</p>
          <img src='img/others/push_apns.png' style='width:100%;'/>
          <br/>
          <!-- -->
          <h2>Push通知の実現方法(ニフクラの場合)</h2>
          <h3>1.事前に必要なこと</h3>
          <ul>
            <li>ニフクラに登録しNCMBのキーを取得</li>
            <li>Androidの通知サービスFCM(Firebase Cloud Messaging)</li>
            <li>iOSの通知サービスAPNs(Apple Push Notification Service)</li>
          </ul>
          <h3>2.プロジェクト作成〜Buildまで</h3>
          <ol>
            <li>ニフクラのベースプロジェクトをインポートしてMonacaプロジェクトを作成
              <small>(1) Cordovaプラグイン(ncmb-push-monaca-plugin)<br/>
                     (2) index.htmlに記述</small></li>
            <li>Monacaプロジェクトを元にローカルプロジェクトへ</li>
            <li>APIキーを設定</li>
            <li>開発</li>
            <li>Monacaにアップ</li>
            <li>Monacaでビルド</li>
          </ol>
          <h3>3.インストール〜Push通知</h3>
          <ol>
            <li>それぞれにインストール</li>
            <li>起動時に端末トークンが取得されmobile backendに保存される</li>
            <li>NCMB管理者画面から確認が可能</li>
            <li>プッシュ通知(NCMBのダッシュボードから可能)</li>
            <li>各端末に届く</li>
          </ol>
          <!-- -->
          <h3>Push通知とアプリとの連携</h3>
          <ol>
            <li>バッジ表示</li>
            <li>アプリ側でのPush通知に対する認識は</li>
            <li>アプリ側でのバッジクリアは？</li>
          </ol>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">ブラウザベースでやってみる</div>
      <div class="card-body">
        <div class="card-text">
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">Androidでやってみる</div>
      <div class="card-body">
        <div class="card-text">
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">iPhoneでやってみる</div>
      <div class="card-body">
        <div class="card-text">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticlePushSend",
  data() {},
  computed: {},
  methods: {},
  props: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
