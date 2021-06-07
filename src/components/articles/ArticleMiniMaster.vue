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
            <li>Vuexの配列又はグローバルオブジェクトの配列として</li>
            <li>LocalStorageではJSONやDB</li>
            <li>サーバ上ではテーブルに</li>
          </ul>
          <h2>初期構築ロジック</h2>
          <ol>
            <li>ストアから取得(getters)</li>
            <li>ストアに存在しない場合はlocalStorageから(restore)</li>
            <li>LocalStorageに存在しない場合はAjaxから</li>
            <li>AjaxでサーバからJSON形式で取得(get&set)</li>
            <li>LocalStorageに保存(save)</li>
            <li>LocalStorageからストアに(restore)</li>
          </ol>
          <h2>更新のきっかけ</h2>
          <ul>
            <li>起動時に自動判定</li>
            <li>設定画面から手動で</li>
            <li>通知に従って</li>
          </ul>
          <h2>更新ロジック</h2>
          <ol>
            <li>きっかけによる起動</li>
            <li>AjaxでサーバからJSON形式で取得</li>
            <li>LocalStorageに保存(save)</li>
            <li>LocalStorageからストアに(restore)</li>
            <li>Ajaxに失敗した場合は入れ替えしない</li>
          </ol>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">モデルケース：分類マスタ</div>
      <div class="card-body">
        <div class="card-text">
          <h2>マスタの持ち方</h2>
          <ul>
            <li>Vuexの配列又はグローバルオブジェクトの配列として</li>
            <li>LocalStorageではJSONやDB</li>
            <li>サーバ上ではテーブルに</li>
          </ul>
          <h2>初期構築ロジック</h2>
          <ol>
            <li>オブジェクトに存在しない場合はLocalStorageから</li>
            <li>LocalStorageに存在しない場合はAjaxから</li>
            <li>AjaxでサーバからJSON形式で取得</li>
            <li>LocalStorageに保存(入れ替え)</li>
            <li>LocalStorageからオブジェクトに(入れ替え)</li>
          </ol>
          <h2>更新のきっかけ</h2>
          <ul>
            <li>起動時に自動判定</li>
            <li>設定画面から手動で</li>
            <li>通知に従って</li>
          </ul>
          <h2>ストアに存在すれば使用</h2>
          <span>ストア リスト名：mixins consts FILE_NM_BUN_LIST:{{ this.FILE_NM_BUN_LIST }}</span><br/>
          <span>ストア 指定：this.$store.getters['entities/getList'](this.FILE_NM_BUN_LIST)</span><br/>
          <span>ストアをクリア：this.$store.dispatch('entities/clearBunList');</span><br/>
          <button class="button" @click="clearBunList">ストアをクリア</button><br/>
          <template v-if="bunList">
            <table class="table table-striped table-bordered"> 
              <thead>
                <tr>
                  <th scope="col">分類コード</th><th scope="col">分類名</th><th scope="col">税区分</th><th scope="col">税率種別</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="record in bunList" :key=record.分類コード>
                  <td>{{ record.分類コード }}</td>
                  <td>{{ record.分類名 }}</td>
                  <td>{{ record.税区分 }}</td>
                  <td>{{ record.税率種別 }}</td>
                </tr>
              </tbody>
            </table>
          </template>
          <!-- -->
          <h2>ローカルストレッジからのリストア</h2>
          <span>分類マスタ リスト名:mixins consts FILE_NM_BUN_LIST:{{ this.FILE_NM_BUN_LIST }}</span><br/>
          <button class="button" @click="restoreBunList">LocalStorageからリストア</button><br/>
          <!-- -->
          <h2>Ajaxでサーバから取得</h2>
          <span>AjaxURL:mixins consts AJAX_SERVER:{{ this.AJAX_SERVER }}?{{ this.AJAX_GET_BUN_LIST }}</span><br/>
          <button class="button" @click="changeBunList">Ajaxでサーバから取得</button><br/>
          <!-- -->
          <h2>LocalStorageに格納</h2>
          <span>分類マスタ localStorage-Key:mixins consts FILE_NM_BUN_LIST:{{ this.FILE_NM_BUN_LIST }}</span><br/>
          <button class="button" @click="saveBunList">LocalStorageに格納</button><br/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleMiniMaster",
  data() {
    return {
      bunList: [],
    };
  },
  /*
  mounted: function(){
    var v = this;
  },
  */
  mounted: function() {
    // 分類マスタをストアから取得
    console.log("mounted bunList from store:this.FILE_NM_BUN_LIST:"+this.FILE_NM_BUN_LIST);
    this.bunList = this.$store.getters['entities/getList'](this.FILE_NM_BUN_LIST);
    console.log("mounted bunList from store:count:"+this.getCount(this.bunList));
    // 存在しなければLocalStorageから取得
    if ( this.getCount(this.bunList) <= 0 ) {
      this.restoreBunList();
    }
    /*
    console.log("mounted this.FILE_NM_BUN_LIST:" + this.FILE_NM_BUN_LIST);
    console.log("this.$store.getters"+this.$store.getters);
    console.log("this.$store.getters['entities/getList'](this.FILE_NM_BUN_LIST)");
    this.bunList = this.$store.getters['entities/getList'](this.FILE_NM_BUN_LIST);
    //if ( this.bunList && confirm("分類リストを入れ替えますか？") || this.bunList === null ) {
    if ( confirm("分類リストを入れ替えますか？") ) {
      this.bunList = this.ajaxGetBunList();
      if ( this.bunList ) {
        console.log("this.$store.dispatch('entities/setBunList',this.bunList)");
        this.$store.dispatch('entities/setBunList',this.bunList);
      }
    }
    this.bunList = this.$store.getters['entities/getList'](this.FILE_NM_BUN_LIST);
    console.log("mounted this.bunList:" + this.bunList);
    console.log("mounted this.bunList.length:" + this.getCount(this.bunList));
    */
  },
  computed: {},
  methods: {
    getCount(argObj) {
      if( argObj === null ) {
        return 0;
      }
      let val = Object.keys(argObj);
      return val.length;
    },
    clearBunList: function() {
      console.log("clearBunlist start");
      if ( this.$store.dispatch('entities/clearBunList') ) {
        console.log("clearBunlist success!");
        this.bunList = [];
      } else {
        console.log("clearBunlist error!!!");
        alert("clearBunListに失敗しました");
      }
    },
    restoreBunList: function() {
      console.log("restoreBunList start getItem:"+this.FILE_NM_BUN_LIST);
      let lsBunList = localStorage.getItem(this.FILE_NM_BUN_LIST);
      if ( lsBunList ) {
        console.log("restoreBunList getItem:count:"+lsBunList.length);
        this.bunList = JSON.parse(lsBunList);
        this.$store.dispatch('entities/setBunList',this.bunList);
        //this.bunList = this.$store.getters['entities/getList'](this.FILE_NM_BUN_LIST);
        console.log("restoreBunList success!");
      } else {
        console.log("restoreBunList error!!");
        alert("restoreBunListに失敗しました");
      }
    },
    async changeBunList() {
      console.log("changeBunList this.FILE_NM_BUN_LIST:" + this.FILE_NM_BUN_LIST);
      if ( confirm("分類リストを入れ替えますか？") ) {
        //
        // ここは完了を待たせる（async changeBunList(){ ... await ... } ）
        // 本来は、この中でストアの更新までやった方が良いと思われる
        // リストの入れ替え自体は同期させ、それ以外は非同期で良い
        //
        this.bunList = await this.ajaxGetBunList();
        if ( this.bunList ) {
          console.log("changeBunList this.$store.dispatch('entities/setBunList',this.bunList)");
          this.$store.dispatch('entities/setBunList',this.bunList);
        } else {
          console.log("changeBunList is empty this.bunList?:"+this.bunList);
        }
      }

      // 【重要】ajaxGetBunList の完了を待たせることで解決
      this.bunList = this.$store.getters['entities/getList'](this.FILE_NM_BUN_LIST);

      console.log("changeBunList this.bunList:" + this.bunList);
      console.log("changeBunList this.bunList.length:" + this.getCount(this.bunList));
    },
    //
    // ajaxBunList : Ajaxでサーバから取得
    //
    ajaxGetBunList: async function () {
      let url = this.AJAX_SERVER + "?" + this.AJAX_GET_BUN_LIST;
      //let res = null;
      let resData = null;
      //let resErr = null;
      let resMsg = null;

      console.log("Ajax要求 url=" + url);

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
          console.log('Ajaxエラー msg=' + resMsg);
        });

      // 確認
      console.log("resData.result:"+resData.result+" message:"+resData.message);

      // listが取れていなければ異常終了
      if ( resData.list === null ) {
          alert('【エラー】分類リストが取得できていません');
          console.log('Ajaxエラー 分類リストが取得できていません');
          return false;
      }
      return resData.list;
    },
    
    saveBunList: function() {
      console.log("saveBunList start:"+this.FILE_NM_BUN_LIST);
      if ( this.getCount(this.bunList) > 0 ) {
        // 書き込み
        console.log("saveBunList JSON.stringify & setItem");
        let buf = JSON.stringify(this.bunList);
        localStorage.setItem(this.FILE_NM_BUN_LIST,buf);
        console.log("saveBunList success!");
      } else {
        console.log("saveBunList bunList is empty!");
        alert("bunListが空");
      }
    },
  },
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
