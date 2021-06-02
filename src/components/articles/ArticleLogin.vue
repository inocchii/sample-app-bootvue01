<template>
  <div class="Article">
    <!-- 記事 -->
    <div class="card w-100">
      <div class="card-header">ログインについて</div>
      <div class="card-body">
        <div class="card-text">
          <p>内容</p>
          <ul>
            <li>OAuthについて</li>
            <li>BaaS (Backend as a Service)</li>
            <li>ニフクラを使って実装</li>
            <li>Firebaseを使って実装</li>
            <li>独自で実装</li>
            <li>共通：ログイン後の状態保持</li>
            <li>共通：ログイン有効期限の考え方</li>
          </ul>
          <p>参考サイト</p>
          <ul>
            <li><a href='https://nifcloud-mbaas.github.io/MonacaUserDemoApp2/#53'>ニフクラ：アプリに会員認証機能を導入</a></li>
            <li><a href='https://mbaas.nifcloud.com/doc/current/introduction/div_quickstart_javascript.html'>ニフクラ：SDKの導入</a></li>
          </ul>
          <!-- -->
          <h2>基礎知識(OAuthについて)</h2>
          <!-- -->
          <h2>BaaS (Backend as a Service)</h2>
          <!-- -->
          <h2>ニフクラを使って実装してみる</h2>
          <h3>■ ncmb初期化〜データアクセス確認</h3>
          <div class="summary">
            <button class="button" @click="checkNcmb">確認</button><br/>
            モジュール読み込み：{{ checkNcmbImport }}<br/>
            Backend連携：{{ checkNcmbAccess }}<br/>
            データストア登録：{{ checkNcmbData }}<br/>
          </div>
          <h3>■ ncmbログイン</h3>
          <div style="text-align: center;">
            <input type="text" v-model="signinUserId" modifier="underbar" placeholder="ID" float /><br/>
            <input type="password" v-model="signinPwd" modifier="underbar" placeholder="Password" float /><br/>
            <p style="text-align: center;">
                <button @click="signinByID();">Sign in</button>
            </p>
          </div>
          <h3>■ ncmb初回登録の場合はこちら</h3>
          <div style="text-align: center;">
            <input type="text" v-model="signupUserId" modifier="underbar" placeholder="ID" float /><br/>
            <input type="password" v-model="signupPwd" modifier="underbar" placeholder="Password" float /><br/>
            <input type="password" v-model="signupPwd2" modifier="underbar" placeholder="Password confirm" float /><br/>
            <p style="text-align: center;">
                <button @click="signupByID();">Sign up</button>
            </p>
          </div>
          <h3>■ ログイン状態</h3>
          <div v-if="loginUser" class="summary">
            ○ログイン完了 userName:{{ loginUser.userName }} lastLogin:{{ loginUser.lastLoginDate }}
          </div>
          <div v-else class="summary">
            Ｘログインしていません
          </div>
          <h3>□ ニフクラ課題</h3>
          <div class="mention">
            mounted で行っているニフクラ接続が失敗する<br/>
            → 画面の出入りで成功するので、<br/>
            → 当初接続のタイミング調整が必要と思われる
          </div>
          <!-- -->
          <h2>ログイン後の状態保持と復元</h2>
          <h3>■ 保持はvuex(store)とLocalStorageの両建て</h3>
          <h3>■ ログイン後はstoreとstorageに保管</h3>
          <code>store - entities.js - actions - setInfoAndStorage</code><br/>
          <code>that.$store.dispatch('entities/setInfoAndStorage',[that.FILE_NM_USER_INFO,user]);</code>
          <ol>
            <li>ログイン完了時にstoreとstorageに格納</li>
          </ol>
          <h3>■ 復元ロジックは下記としmixinsで実装</h3>
          <code>mixins - common.js - getLoginInfo</code>
          <ol>
            <li>storeに存在すればOK</li>
            <li>storeになければstorageをチェック</li>
            <li>storageになければログインへ</li>
          </ol>
          <!-- -->
          <h2>ログイン有効期限の考え方</h2>
          <div class="note">
            ・前回ログイン時刻を保持<br/>
            ・保持されたユーザ情報の前回ログイン時刻を現在と比較して判定<br/>
            ・本来は有効期限判定をサーバ側で行う方が良い(制御が効く)
          </div>
          <!-- -->
          <h2>Firebaseを使って実装してみる</h2>
          <!-- -->
          <h2>独自で実装</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleLogin",
  mounted: function() {
    // ncmbモジュールの読み込み
    var NCMB = require("ncmb");
    // mobile backendアプリとの連携
    this.ncmb = new NCMB("676d04b89ce11e6121f3c08596268f65b1761c0f1e19a95f2cdff9da9ca15194","6f9629e78ce614f991b56d64c003a82f91727a0b65969efce0648e4c56e4478a");
    this.checkNcmbImport = true;

    // ログインの確認(this.getLoginInfo=mixinsで共通関数化)
    console.log("mounted getLoginInfo start with:"+this.FILE_NM_USER_INFO);
    this.loginUser = this.getLoginInfo(this.FILE_NM_USER_INFO);
    console.log(this.loginUser);
    /*
    // ①ストアから
    this.loginUser = this.$store.getters['entities/getList'](this.FILE_NM_USER_INFO);
    // ②ストアになければストレッジから
    if ( this.loginUser === null ) {
      this.$store.dispatch('entities/setInfoFromStorage',this.FILE_NM_USER_INFO);
      this.loginUser = this.$store.getters['entities/getList'](this.FILE_NM_USER_INFO);
    }
    */
  },
  data() {
    return {
      // ncmb
      ncmb: null,
      // 動作確認用
      checkNcmbImport:false,
      checkNcmbAccess:false,
      checkNcmbData:false,
      // ログイン情報
      signupUserId: '',
      signupPwd: '',
      signupPwd2: '',
      // ログイン情報
      signinUserId: '',
      signinPwd: '',
      // ログインユーザオブジェクト
      loginUser: null,
    };
  },
  computed: {},
  methods: {
    checkNcmb() {
      /* mounted で実施
      // ncmbモジュールの読み込み
      var NCMB = require("ncmb");
      this.checkNcmbImport = true;
      // mobile backendアプリとの連携
      var ncmb = new NCMB("676d04b89ce11e6121f3c08596268f65b1761c0f1e19a95f2cdff9da9ca15194","6f9629e78ce614f991b56d64c003a82f91727a0b65969efce0648e4c56e4478a");
      this.checkNcmbImport = true;
      */
      // クラスのTestClassを作成
      var TestClass = this.ncmb.DataStore("TestClass");
      this.checkNcmbAccess = true;
      // データストアへの登録
      var testClass = new TestClass();
      testClass.set("message", "Hello, NCMB!");
      testClass.save()
        .then(function(){
          // 保存に成功した場合の処理
          console.log("checkNcmb success");
        })
        .catch(function(err){
          // 保存に失敗した場合の処理
          console.log("checkNcmb error!!");
          console.log(err);
          return false;
        });
      this.checkNcmbData = true;
    },
    /***** ID/PW認証：新規登録 *****/
    async signupByID() { 
      // 入力チェック
      if( this.signupUserId == '' || this.signupPwd == '' || this.signupPwd2 == '' ) {
          alert('入力されていない項目があります');
          return false;
      } else if ( this.signupPwd != this.signupPwd2 ) {
          alert('パスワードが不一致です');
          return false;
      }
      // user インスタンスの生成
      var user = new this.ncmb.User();
      // ID/PWで新規登録
      await user.set('userName', this.signupUserId).set('password', this.signupPwd)
        .signUpByAccount()
        .then(function(user) {
          /* 処理成功 */
          console.log('【ID/PW 認証】新規登録成功');
          console.log(user);
        })
        .catch(function(error) {
          /* 処理失敗 */
          alert('【ID / PW 認証】新規登録失敗:', error);
          console.log('【ID/PW 認証】新規登録失敗');
          console.log(error);
          return false;
        });
      //
      return this.checkByID(this.signupUserId,this.signupPwd);
      /*
      // 無名関数内で親のthisをthatで参照
      var that = this;
      // ID/PWでログイン
      this.ncmb.User.login(this.signupUserId, this.signupPwd)
        .then(function(user) {
          // 処理成功
          alert('【ID/PW認証】ログイン成功:', user);
          that.loginUser = user;
          console.log('【ID/PW 認証】ログイン成功');
          console.log(user);
          // ログイン済み状態をstoreへ
          console.log('store user:'+this.FILE_NM_USER_INFO);
          this.$store.dispatch('entities/setInfoAndStorage',[this.FILE_NM_USER_INFO,user]);
          console.log('【ID/PW 認証】保持完了：store & storage');
        })
        .catch(function(error) {
          // 処理失敗
          alert('【ID / PW 認証】ログイン失敗:', error);
          console.log('【ID/PW 認証】ログイン失敗');
          console.log(error);
          return false;
        });
      */
    },
    /***** ID/PW認証：ログイン *****/
    signinByID: function() {
      return this.checkByID(this.signinUserId,this.signinPwd);
      /*
      // 入力チェック
      if( this.signinUserId == '' || this.signinPwd == '' ) {
          alert('入力されていない項目があります');
          return false;
      }
      //
      // 無名関数内で親のthisをthatで参照
      var that = this;
      // ID/PWでログイン
      this.ncmb.User.login(this.signinUserId, this.signinPwd)
        .then(function(user) {
          // 処理成功
          alert('【ID/PW認証】ログイン成功:', user);
          that.loginUser = user;
          console.log('signinByID【ID/PW 認証】ログイン成功');
          console.log(user);
          // ログイン済み状態をstoreへ
          console.log('signinByID store user:'+that.FILE_NM_USER_INFO);
          that.$store.dispatch('entities/setInfoAndStorage',[that.FILE_NM_USER_INFO,user]);
          console.log('signinByID【ID/PW 認証】保持完了：store & storage');
        })
        .catch(function(error) {
          // 処理失敗
          alert('【ID / PW 認証】ログイン失敗:', error);
          console.log('signinByID【ID/PW 認証】ログイン失敗');
          console.log(error);
          return false;
        });
        */
    },
    /***** ID/PW認証：ログイン共通化 *****/
    async checkByID(argUserId,argPwd) {
      // 入力チェック
      if( argUserId == '' || argPwd == '' ) {
          alert('入力されていない項目があります');
          return false;
      }
      //
      // 無名関数内で親のthisをthatで参照
      var that = this;
      // ID/PWでログイン
      await this.ncmb.User.login(argUserId, argPwd)
        .then(function(user) {
          // 処理成功
          alert('【ID/PW認証】ログイン成功:', user);
          that.loginUser = user;
          console.log('signinByID【ID/PW 認証】ログイン成功');
          console.log(user);
          // ログイン時刻を記録
          let dt = new Date();
          let loginDate = dt.toJSON();
          user.lastLoginDate = loginDate;
          // ログイン済み状態をstoreへ
          console.log('signinByID store user:'+that.FILE_NM_USER_INFO);
          that.$store.dispatch('entities/setInfoAndStorage',[that.FILE_NM_USER_INFO,user]);
          console.log('signinByID【ID/PW 認証】保持完了：store & storage');
        })
        .catch(function(error) {
          // 処理失敗
          alert('【ID / PW 認証】ログイン失敗:', error);
          console.log('signinByID【ID/PW 認証】ログイン失敗');
          console.log(error);
          return false;
        });
      return true;
    },
  },
  props: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
