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
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">基礎知識</div>
      <div class="card-body">
        <div class="card-text">
          <h2>基礎知識(OAuthについて)</h2>
          <!-- -->
          <h2>BaaS (Backend as a Service)</h2>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">ニフクラを使って実装してみる</div>
      <div class="card-body">
        <div class="card-text">
          <h2>ニフクラを使って実装</h2>
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
            <br/><button @click="clearLoginUser(FILE_NM_USER_INFO)">クリア</button>
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
          <div class="note">
            ncmb.jsを書き換えて回避(以下をコメントアウト)<br/>
            <div class="code">
              if (typeof define === 'function' && define.amd) {<br/>
                define([], NCMB);<br/>
              }
            </div>
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
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">Firebaseを使って実装してみる</div>
      <div class="card-body">
        <div class="card-text">
          <h2>Firebaseを使って実装</h2>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">独自で実装してみる</div>
      <div class="card-body">
        <div class="card-text">
          <h2>考え方の整理</h2>
          <h2>ローカルで必要なもの</h2>
          <ol>
            <li>ユーザIDの保管</li>
            <li>トークンの保管</li>
            <li>パスワードの暗号化と保管</li>
          </ol>
          <h2>サーバ側で必要なもの</h2>
          <ol>
            <li>ユーザ情報(ID/PWD)の保管</li>
            <li>認証と認可</li>
            <li>トークンの発行・更新・保管</li>
            <li>セッション保持(トークン)</li>
            <li>トークンの有効期限チェック</li>
          </ol>
          <h2>ログインしてみる</h2>
          <h3>■ 初回登録の場合はこちら</h3>
          <div v-if="view_kbn==1" style="text-align: center;">
            <input type="text" v-model="userid" modifier="underbar" placeholder="USERID" float /><br/>
            <input type="text" v-model="usernm" modifier="underbar" placeholder="USERNM" float /><br/>
            <input type="text" v-model="email" modifier="underbar" placeholder="EMAIL" float /><br/>
            <input type="password" v-model="passwd" modifier="underbar" placeholder="Password" float /><br/>
            <input type="password" v-model="passwd2" modifier="underbar" placeholder="Password confirm" float /><br/>
            <p style="text-align: center;">
                <button @click="signup3();">Sign up</button>
            </p>
          </div>
          <div v-if="view_kbn==2" style="text-align: center;">
            確認ください<br/>
            userid: {{userid}} <br/>
            usernm: {{usernm}} <br/>
            email: {{email}} <br/>
            <p style="text-align: center;">
                <button @click="signup3();">Confirm</button>
            </p>
          </div>
          <div v-if="view_kbn==3" style="text-align: center;">
            登録されました<br/>
            userid: {{userid}} <br/>
            usernm: {{usernm}} <br/>
            email: {{email}} <br/>
          </div>
          <h3>■ ログイン</h3>
          <div style="text-align: center;">
            <input type="text" v-model="userid" modifier="underbar" placeholder="USERID" float /><br/>
            <input type="password" v-model="passwd" modifier="underbar" placeholder="Password" float /><br/>
            <p style="text-align: center;">
                <button @click="signin3();">Login</button>
            </p>
          </div>
          <h3>■ ログイン状態</h3>
          <div v-if="userInfo3" class="summary">
            ○ログイン完了 userName:{{ userInfo3.usernm }} lastLogin:{{ userInfo3.last_login }}
            <br/><button @click="clearLoginUser(FILE_NM_USER_INFO3)">クリア</button>
          </div>
          <div v-else class="summary">
            Ｘログインしていません
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleLogin",

  mounted: function() {
    //----------
    // ncmbモジュールの読み込み
    //----------
    console.log("mounted start");
    var NCMB = require("ncmb");
    // mobile backendアプリとの連携
    console.log("mounted new NCMB with appKey:"+this.ncmbAppKey+" clKey:"+this.ncmbClientKey);
    this.ncmb = new NCMB(this.ncmbAppKey,this.ncmbClientKey);
    console.log("mounted new NCMB continue");
    this.checkNcmbImport = true;

    //----------
    // ncmbログインの確認
    //   getLoginInfo (mixinで共通関数化)
    //   ①ストア(Vuex)を確認 ②ストアになければLocalStorageを確認
    //   格納KEYをFILE_NM_USER_INFO(mixin)で定義
    //----------
    console.log("mounted getLoginInfo(ncmb) start with:"+this.FILE_NM_USER_INFO);
    this.loginUser = this.getLoginInfo(this.FILE_NM_USER_INFO);
    console.log(this.loginUser);

    //----------
    // 独自ログインの確認
    //   getLoginInfo (mixinで共通関数化)
    //   ①ストア(Vuex)を確認 ②ストアになければLocalStorageを確認
    //   格納KEYをFILE_NM_USER_INFO3(mixin)で定義
    //----------
    console.log("mounted getLoginInfo(独自) start with:"+this.FILE_NM_USER_INFO3);
    this.userInfo3 = this.getLoginInfo(this.FILE_NM_USER_INFO3);
    console.log(this.userInfo3);

  },
  data() {
    return {
      //----------
      // ニフクラ
      //----------
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
      //----------
      // 独自
      //----------
      // ログイン情報
      userid:   '',
      usernm:   '',
      email:    '',
      passwd:   '',
      passwd2:  '',
      token:    '',
      last_login: '',
      // 画面切り替え
      view_kbn: '1',  // '1':入力画面 '2':確認画面 '3':完了画面
      // ユーザオブジェクト
      userInfo3: null,
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
      // ニフクラ上のデータストアにクラス(TestClass)を作成
      var TestClass = this.ncmb.DataStore("TestClass");
      // データストア(TestClass)への値登録
      var testClass = new TestClass();
      testClass.set("message", "Hello, NCMB!");
      var that = this;
      testClass.save()
        .then(function(){
          // 保存に成功した場合の処理
          console.log("checkNcmb success");
          that.checkNcmbAccess = true;
          that.checkNcmbData = true;
        })
        .catch(function(err){
          // 保存に失敗した場合の処理
          console.log("checkNcmb error!!");
          console.log(err);
          alert('ニフクラが期限切れしている可能性があります');
          return false;
        });
      //this.checkNcmbData = true;
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
    },
    /***** ID/PW認証：ログイン *****/
    signinByID: function() {
      return this.checkByID(this.signinUserId,this.signinPwd);
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
    /***** ID/PW認証：新規登録 *****/
    async signup3() { 
      let url = this.AJAX_SERVER + "?" + this.AJAX_CHECK_SIGNUP;
      let resData = null;
      let resMsg = null;

      this.userInfo3 = null;

      // 入力チェック
      if( this.userid == '' || this.usernm == '' || this.email == '' || this.passwd == '' || this.passwd2 == '' ) {
          alert('入力されていない項目があります');
          return false;
      } else if ( this.passwd != this.passwd2 ) {
          alert('パスワードが不一致です');
          return false;
      }

      // 画面切り替え
      // view_kbn 1:入力 → 2:確認 → 3:結果
      if ( this.view_kbn === '1' ) {
        this.view_kbn = '2';
        return true;
      }
      this.view_kbn = '1';  // エラーの場合は入力画面に戻す

      // url
      url += "&userid="+this.userid+"&passwd="+this.passwd+"&usernm="+this.usernm+"&email="+this.email;

      // 無名関数内で親のthisをthatで参照
      var that = this;
      //
      // 受信部分
      //
      await this.axios
        .get(url)
        .then((response) => {
          // mixinの汎用メソッドで処理
          resData = this.ajaxSuccess(response);
        })
        .catch((err) => {
          // mixinの汎用メソッドで処理
          resMsg = this.ajaxError(err);
          alert('【ID / PW 認証】新規登録失敗:Ajax失敗：', resMsg);
          console.log('【ID/PW 認証】新規登録失敗Ajax失敗：', resMsg);
          console.log(err);
          return false;
        });
      // 確認
      console.log(resData);
      console.log("resData.data.result:"+resData.result+" message:"+resData.message);

      // サーバ処理判定(result)確認
      if ( ! resData.result ) {
          alert('【ID/PW 認証】新規登録失敗:'+resData.message);
          console.log('【ID/PW 認証】新規登録失敗:'+resData.message);
          return false;
      }

      // infoが取れていなければ異常終了
      if ( resData.info === null ) {
          alert('【ID/PW 認証】新規登録失敗:ユーザ情報が空');
          console.log('【ID/PW 認証】新規登録失敗:ユーザ情報が空');
          return false;
      }
      this.userInfo3 = resData.info;

      // ログイン済み状態をstoreへ
      console.log('signup3 store:'+that.FILE_NM_USER_INFO3);
      that.$store.dispatch('entities/setInfoAndStorage',[that.FILE_NM_USER_INFO3,this.userInfo3]);
      console.log('signup3 store 保持完了：store & storage');
      /* 処理成功 */
      console.log('【ID/PW 認証】成功');
      console.log(this.userInfo3);
      
      this.view_kbn = '3';

      return true;

    },

    /***** ID/PW認証：ログイン *****/
    async signin3() {
      let url = this.AJAX_SERVER + "?" + this.AJAX_CHECK_LOGIN;
      let resData = null;
      let resMsg = null;

      this.userInfo3 = null;

      // 入力チェック
      if( this.userid == '' || this.passwd == '' ) {
          alert('入力されていない項目があります');
          return false;
      }

      // 確認
      if ( !confirm("ログインします") ) {
        return false;
      }

      // url
      url += "&userid="+this.userid+"&passwd="+this.passwd;

      // 無名関数内で親のthisをthatで参照
      var that = this;
      //
      // 受信部分
      //
      await this.axios
        .get(url)
        .then((response) => {
          // mixinの汎用メソッドで処理
          resData = this.ajaxSuccess(response);
        })
        .catch((err) => {
          // mixinの汎用メソッドで処理
          resMsg = this.ajaxError(err);
          alert('【ID/PW 認証】失敗:Ajax失敗：', resMsg);
          console.log('【ID/PW 認証】失敗Ajax失敗：', resMsg);
          console.log(err);
          return false;
        });
      // 確認
      console.log("resData.result:"+resData.result+" message:"+resData.message);

      // サーバ処理判定(result)確認
      if ( ! resData.result ) {
          alert('【ID/PW 認証】失敗:'+resData.message);
          console.log('【ID/PW 認証】失敗:'+resData.message);
          return false;
      }
      // infoが取れていなければ異常終了
      if ( resData.info === null ) {
          alert('【ID/PW 認証】新規登録失敗:ユーザ情報が空');
          console.log('【ID/PW 認証】新規登録失敗:ユーザ情報が空');
          return false;
      }
      this.userInfo3 = resData.info;

      // ログイン済み状態をstoreへ
      console.log('signup3 store:'+that.FILE_NM_USER_INFO3);
      that.$store.dispatch('entities/setInfoAndStorage',[that.FILE_NM_USER_INFO3,this.userInfo3]);
      console.log('signup3 store 保持完了：store & storage');
      /* 処理成功 */
      console.log('【ID/PW 認証】成功');
      console.log(this.userInfo3);

      return true;

    },
    /*
     * clear:Login情報をクリア 
     */
    clearLoginUser(argNm) {
      // ストア＆LocalStorageをクリア
      if ( this.clearLogin(argNm) ) {
        // コンポーネント上からクリア
        if ( argNm === this.FILE_NM_USER_INFO ) {
          this.loginUser = null;
        } else if ( argNm === this.FILE_NM_USER_INFO3 ) {
          this.userInfo3 = null;
        }
      }
    },
  },
  props: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
