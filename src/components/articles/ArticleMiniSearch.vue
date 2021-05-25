<template>
  <div class="Article">
    <!-- 記事 -->
    <div class="card w-100">
      <div class="card-header">検索と並び替え</div>
      <div class="card-body">
        <div class="card-text">
          <p>内容</p>
          <ul>
            <li>取引先リストの取得</li>
            <li>取引先リストの表示</li>
            <li>抽出</li>
            <li>並べ替え</li>
          </ul>
          <h2>リストの持ち方</h2>
          <ul>
            <li>Vuexの配列</li>
            <li>LocalStorageではJSON</li>
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
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">モデルケース：取引先リスト</div>
      <div class="card-body">
        <div class="card-text">
          <h2>リスト</h2>
          <ul>
            <li>Vuexの配列</li>
            <li>LocalStorageではJSON</li>
            <li>サーバ上ではテーブルに</li>
          </ul>
          <h2>初期構築ロジック</h2>
          <ol>
            <li>ストアに存在しない場合はLocalStorageから</li>
            <li>LocalStorageに存在しない場合はAjaxから</li>
            <li>AjaxでサーバからJSON形式で取得</li>
            <li>LocalStorageに保存(入れ替え)</li>
            <li>LocalStorageからストアに(入れ替え)</li>
          </ol>
          <h2>ストアに存在すれば使用</h2>
          <span>ストア リスト名：mixins consts FILE_NM_TORI_LIST:{{ this.FILE_NM_TORI_LIST }}</span><br/>
          <span>ストア 指定：this.$store.getters['entities/getList'](this.FILE_NM_TORI_LIST)</span><br/>
          <h2>検索条件など(リストレンダリング)</h2>
          <span>取引先コード<input type='text' v-model='tori_cd' /></span>
          <span>取引先名<input type='text' v-model='tori_nm' /></span><br/>
          <!-- URL選択 -->
          <span>並び順</span>
          <select v-model="sort_key">
            <option value="">取引先コード</option>
            <option value="r_tori_cd">取引先コード(逆順)</option>
            <option value="tori_nm">取引先名</option>
            <option value="edi_cd">ＥＤＩコード</option>
            <option value="tel_no">電話番号</option>
          </select>
          <span>取引先コード：{{tori_cd}} 取引先名：{{tori_nm}} 並び順：{{sort_key}}</span><br/>
          <template v-if="toriList">
            <div class="table-wrapper-scroll-y my-custom-scrollbar">
              <table class="table table-striped table-bordered table-sm"> 
                <thead>
                  <tr>
                    <th scope="col">取引先コード</th><th scope="col">取引先名</th><th scope="col">ＥＤＩ</th><th scope="col">電話番号</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="record in selectedList" :key=record.取引先コード>
                    <td>{{ record.取引先コード }}</td>
                    <td>{{ record.取引先名 }}</td>
                    <td>{{ record.ＥＤＩ取引先コード }}</td>
                    <td>{{ record.電話番号 }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
          <!-- -->
          <h2>ストアをクリア</h2>
          <span>Vuexのストアをクリア：this.$store.dispatch('entities/clear',this.FILE_NM_TORI_LIST);</span><br/>
          <button class="button" @click="clearToriList">ストアをクリア</button><br/>
          <h2>ローカルストレッジからのリストア</h2>
          <span>取引先マスタ リスト名:mixins consts FILE_NM_TORI_LIST:{{ this.FILE_NM_TORI_LIST }}</span><br/>
          <button class="button" @click="restoreToriList">LocalStorageからリストア</button><br/>
          <!-- -->
          <h2>Ajaxでサーバから取得</h2>
          <span>AjaxURL:mixins consts AJAX_SERVER:{{ this.AJAX_SERVER }}?{{ this.AJAX_GET_TORI_LIST }}</span><br/>
          <button class="button" @click="changeToriList">Ajaxでサーバから取得</button><br/>
          <!-- -->
          <h2>LocalStorageに格納</h2>
          <span>取引先マスタ localStorage-Key:mixins consts FILE_NM_TORI_LIST:{{ this.FILE_NM_TORI_LIST }}</span><br/>
          <button class="button" @click="saveToriList">LocalStorageに格納</button><br/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleMiniSearch",
  mounted: function() {
    // 分類マスタをストアから取得
    console.log("mounted toriList from store:this.FILE_NM_TORI_LIST:"+this.FILE_NM_TORI_LIST);
    this.toriList = this.$store.getters['entities/getList'](this.FILE_NM_TORI_LIST);
    console.log("mounted toriList from store:count:"+this.getCount(this.toriList));
    // 存在しなければLocalStorageから取得
    if ( this.getCount(this.toriList) <= 0 ) {
      this.restoreToriList();
    }
  },
  data() {
    return {
      toriList: [],
      tori_cd: '',
      tori_nm: '',
      sort_key: '',
    };
  },
  computed: {
    selectedList: function() {
      const sel = this.toriList.filter(
        r => r.取引先コード.indexOf(this.tori_cd.trim())>=0 && r.取引先名.includes(this.tori_nm.trim())
      );
      console.log("selectedList sort_key:"+this.sort_key+" sel.length="+sel.length);
      switch ( this.sort_key ) {
        case 'r_tori_cd' :
          console.log("selectedList sort by r_tori_cd");
          sel.reverse(); 
          break;
        case 'tori_nm' :
          console.log("selectedList sort by tori_nm");
          sel.sort(function(r1,r2){
            if ( r1.取引先名<r2.取引先名 ) {
              return -1;
            } else {
              return 1;
            }
          }); 
          break;
        case 'edi_cd' :
          console.log("selectedList sort by edi_cd");
          sel.sort(function(r1,r2){
            if ( r1.ＥＤＩ取引先コード<r2.ＥＤＩ取引先コード ) {
              return -1;
            } else {
              return 1;
            }
          }); 
          break;
        case 'tel_no' :
          console.log("selectedList sort by tel_no");
          sel.sort(function(r1,r2){
            if ( r1.電話番号<r2.電話番号 ) {
              return -1;
            } else {
              return 1;
            }
          }); 
          break;
      }
      return sel;
    },
  },
  methods: {
    getCount(argObj) {
      if( argObj === null ) {
        return 0;
      }
      let val = Object.keys(argObj);
      return val.length;
    },
    clearToriList: function() {
      console.log("clearTorilist start");
      if ( this.$store.dispatch('entities/clear',this.FILE_NM_TORI_LIST) ) {
        console.log("clearTorilist success!");
        this.toriList = [];
      } else {
        console.log("clearTorilist error!!!");
        alert("clearToriListに失敗しました");
      }
    },
    restoreToriList: function() {
      console.log("restoreToriList start getItem:"+this.FILE_NM_TORI_LIST);
      let lsToriList = localStorage.getItem(this.FILE_NM_TORI_LIST);
      if ( lsToriList ) {
        console.log("restoreToriList getItem:count:"+lsToriList.length);
        this.toriList = JSON.parse(lsToriList);
        this.$store.dispatch('entities/setList',[this.FILE_NM_TORI_LIST,this.toriList]);
        //this.toriList = this.$store.getters['entities/getList'](this.FILE_NM_TORI_LIST);
        console.log("restoreToriList success!");
      } else {
        console.log("restoreToriList error!!");
        alert("restoreToriListに失敗しました");
      }
    },
    async changeToriList() {
      console.log("changeToriList this.FILE_NM_TORI_LIST:" + this.FILE_NM_TORI_LIST);
      if ( confirm("取引先リストを入れ替えますか？") ) {
        //
        // ここは完了を待たせる（async changeToriList(){ ... await ... } ）
        // 本来は、この中でストアの更新までやった方が良いと思われる
        // リストの入れ替え自体は同期させ、それ以外は非同期で良い
        //
        this.toriList = await this.ajaxGetToriList();
        if ( this.toriList ) {
          console.log("changeToriList this.$store.dispatch('entities/setToriList',this.toriList)");
          this.$store.dispatch('entities/setList',[this.FILE_NM_TORI_LIST,this.toriList]);
        } else {
          console.log("changeToriList is empty this.toriList?:"+this.toriList);
        }
      }

      // 【重要】ajaxGetToriList の完了を待たせることで解決
      this.toriList = this.$store.getters['entities/getList'](this.FILE_NM_TORI_LIST);

      console.log("changeToriList this.toriList:" + this.toriList);
      console.log("changeToriList this.toriList.length:" + this.getCount(this.toriList));
    },
    //
    // ajaxToriList : Ajaxでサーバから取得
    //
    ajaxGetToriList: async function () {
      let url = this.AJAX_SERVER + "?" + this.AJAX_GET_TORI_LIST;
      //let res = null;
      let resData = null;
      //let resErr = null;
      let resMsg = null;

      let toriList = null

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
      // dataが取れていなければ異常終了
      if ( !Array.isArray(resData) ) {
          console.log('Ajaxエラー res.data is null & return false');
          return false;
      }
      // list を抽出
      for ( const obj of resData ) {
        console.log('res.data obj:'+obj);
        if ( obj.list ) {
          console.log('res.data.list:'+obj.list);
          toriList = obj.list;
        }
      } 
      // listが取れていなければ異常終了
      if ( toriList === null ) {
          console.log('Ajaxエラー 取引先リストが取得できていません');
          return false;
      }
      return toriList;
    },
    saveToriList: function() {
      console.log("saveToriList start:"+this.FILE_NM_TORI_LIST);
      if ( this.getCount(this.toriList) > 0 ) {
        // 書き込み
        console.log("saveToriList JSON.stringify & setItem");
        let buf = JSON.stringify(this.toriList);
        localStorage.setItem(this.FILE_NM_TORI_LIST,buf);
        console.log("saveToriList success!");
      } else {
        console.log("saveToriList toriList is empty!");
        alert("toriListが空");
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
.my-custom-scrollbar {
position: relative;
height: 400px;
overflow: auto;
}
.table-wrapper-scroll-y {
display: block;
}
</style>
