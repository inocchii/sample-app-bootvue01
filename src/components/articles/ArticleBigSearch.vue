<template>
  <div class="Article">
    <!-- 記事 -->
    <div class="card w-100">
      <div class="card-header">大量マスタ（JSON）</div>
      <div class="card-body">
        <div class="card-text">
          <p>内容</p>
          <ul>
            <li>商品リストの取得</li>
            <li>商品リストの表示</li>
            <li>抽出</li>
            <li>並べ替え</li>
          </ul>
          <h2>リストの持ち方</h2>
          <ul>
            <li>Vuexの配列</li>
            <li>LocalStorageではJSON</li>
            <li>サーバ上ではテーブルに</li>
          </ul>
          <h2>リスト入れ替えロジック</h2>
          <ol>
            <li>ストアから取得(getters)</li>
            <li>ストアに存在しない場合はlocalStorageから(restore)</li>
            <li>LocalStorageに存在しない場合はAjaxから</li>
            <li>AjaxでサーバからJSON形式で取得(get&set)</li>
            <li>LocalStorageに保存(save)</li>
            <li>LocalStorageからストアに(restore)</li>
          </ol>
          <h2>大量リストの課題</h2>
          <h3>容量に制限あり</h3>
          <ol>
            <li>
              <h4>サーバ側からの送り出し制限</h4>
              <p>PHP配列サイズの上限に引っかかる</p>
            </li>
            <li>
              <h4>通信における負荷（時間・コスト）</h4>
              <p>responseのサイズをアプリでも確認できるようにしておく</p>
            </li>
            <li>
              <h4>端末側での受入容量</h4>
              <p>！LocalStorageに制限あり（１オリジン５Ｍ程度）<br/>
                →<code>QuotaExceededError: The quota has been exceeded.</code><br/>
                ・上限は推奨値が1オリジン当たり5MBとされている<br/>
                ・mac-safariで5M程度(2021.05.25)<br/>
                ・mac-chromeで7M程度(about)<br/>
                ・setItem時は、try〜catch〜で<br/>
                → ファイルのサイズをアプリで確認できるようにしておく
              </p>
            </li>
            <li>受け渡しは最小情報で</li>
            <li>！CSV型を考える</li>
            <li>画像の持たせ方(localStorageは危険)</li>
          </ol>
          <h3>差分更新を考えるべき</h3>
          <ol>
            <li>差分更新をパターン化したい</li>
            <li>タイムスタンプの交換</li>
            <li>サーバ側での差分抽出</li>
            <li>端末側の差分更新</li>
          </ol>
          <h3>表示に注意</h3>
          <ol>
            <li>枠内でスクロール(→ css)</li>
            <li>抽出条件付きで表示</li>
            <li>抽出条件の変化反映(→ changeイベント)</li>
          </ol>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">モデルケース：商品リスト</div>
      <div class="card-body">
        <div class="card-text">
          <h2>ストアに存在すれば使用</h2>
          <span>ストア リスト名：mixins consts FILE_NM_ITEM_LIST:{{ this.FILE_NM_ITEM_LIST }}</span><br/>
          <span>ストア 指定：this.$store.getters['entities/getList'](this.FILE_NM_ITEM_LIST)</span><br/>
          <h2>検索条件など(リストレンダリング)</h2>
          <span>コード<input type='text' @change='changeItemCd' style='width:100px;'/></span>
          <span>商品名<input type='text' @change='changeItemNm' style='width:100px;'/></span><br/>
          <!-- URL選択 -->
          <span>並び順</span>
          <select v-model="sort_key">
            <option value="">商品コード</option>
            <option value="r_item_cd">商品コード(逆順)</option>
            <option value="bun_cd">分類コード</option>
            <option value="tori_cd">取引先コード</option>
          </select><br/>
          <span>コード：{{item_cd}} 品名：{{item_nm}} 並び：{{sort_key}}
            件数：{{selectedList.length}} / 総件数：{{itemList.length}}</span><br/>
          <template v-if="selectedList.length>0">
            <div class="table-wrapper-scroll-y my-custom-scrollbar">
              <table class="table table-striped table-bordered table-sm"> 
                <thead>
                  <tr>
                    <th scope="col">商品コード</th><th scope="col">品名</th><th scope="col">分類</th><th scope="col">取引先コード</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="record in selectedList" :key=record.商品コード>
                    <td>{{ record.商品コード }}</td>
                    <td>{{ record.品名漢字 }}</td>
                    <td>{{ record.分類コード }}</td>
                    <td>{{ record.取引先コード }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
          <!-- -->
          <h2>ストアをクリア</h2>
          <span>Vuexのストアをクリア：this.$store.dispatch('entities/clear',this.FILE_NM_ITEM_LIST);</span><br/>
          <button class="button" @click="clearItemList">ストアをクリア</button><br/>
          <h2>ローカルストレッジからのリストア</h2>
          <span>商品マスタ リスト名:mixins consts FILE_NM_ITEM_LIST:{{ this.FILE_NM_ITEM_LIST }}</span><br/>
          <button class="button" @click="restoreItemList">LocalStorageからリストア</button><br/>
          <!-- -->
          <h2>Ajaxでサーバから取得</h2>
          <span>AjaxURL:mixins consts AJAX_SERVER:{{ this.AJAX_SERVER }}?{{ this.AJAX_GET_ITEM_LIST }}</span><br/>
          <button class="button" @click="changeItemList">Ajaxでサーバから取得</button><br/>
          <!-- -->
          <h2>LocalStorageに格納</h2>
          <span>商品マスタ localStorage-Key:mixins consts FILE_NM_ITEM_LIST:{{ this.FILE_NM_ITEM_LIST }}</span><br/>
          <button class="button" @click="saveItemList">LocalStorageに格納</button><br/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleBigSearch",
  mounted: function() {
    // 商品マスタをストアから取得
    console.log("mounted itemList from store:this.FILE_NM_ITEM_LIST:"+this.FILE_NM_ITEM_LIST);
    this.itemList = this.$store.getters['entities/getList'](this.FILE_NM_ITEM_LIST);
    console.log("mounted itemList from store:count:"+this.getCount(this.itemList));
    // 存在しなければLocalStorageから取得
    if ( this.getCount(this.itemList) <= 0 ) {
      this.restoreItemList();
    }
  },
  data() {
    return {
      itemList: [],
      item_cd: '',
      item_nm: '',
      sort_key: '',
    };
  },
  computed: {
    selectedList: function() {
      let sel = [];
      if ( this.item_cd == '' && this.item_nm == '' ) {
        return sel;
      }
      sel = this.itemList.filter(
        r => r.商品コード.indexOf(this.item_cd.trim())>=0 && r.品名漢字.includes(this.item_nm.trim())
      );
      console.log("selectedList sort_key:"+this.sort_key+" sel.length="+sel.length);
      switch ( this.sort_key ) {
        case 'r_item_cd' :
          console.log("selectedList sort by r_item_cd");
          sel.reverse(); 
          break;
        case 'tori_cd' :
          console.log("selectedList sort by tori_cd");
          sel.sort(function(r1,r2){
            if ( r1.取引先コード<r2.取引先コード ) {
              return -1;
            } else {
              return 1;
            }
          }); 
          break;
        case 'bun_cd' :
          console.log("selectedList sort by bun_cd");
          sel.sort(function(r1,r2){
            if ( r1.分類コード<r2.分類コード ) {
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
    changeItemCd(e) {
      this.item_cd = e.target.value;
    },
    changeItemNm(e) {
      this.item_nm = e.target.value;
    },
    getCount(argObj) {
      if( argObj === null ) {
        return 0;
      }
      let val = Object.keys(argObj);
      return val.length;
    },
    clearItemList: function() {
      console.log("clearItemlist start");
      if ( this.$store.dispatch('entities/clear',this.FILE_NM_ITEM_LIST) ) {
        console.log("clearItemlist success!");
        this.itemList = [];
      } else {
        console.log("clearItemlist error!!!");
        alert("clearItemListに失敗しました");
      }
    },
    restoreItemList: function() {
      console.log("restoreItemList start getItem:"+this.FILE_NM_ITEM_LIST);
      let lsItemList = localStorage.getItem(this.FILE_NM_ITEM_LIST);
      if ( lsItemList ) {
        console.log("restoreItemList getItem:count:"+lsItemList.length);
        this.itemList = JSON.parse(lsItemList);
        this.$store.dispatch('entities/setList',[this.FILE_NM_ITEM_LIST,this.itemList]);
        //this.itemList = this.$store.getters['entities/getList'](this.FILE_NM_ITEM_LIST);
        console.log("restoreItemList success!");
      } else {
        console.log("restoreItemList error!!");
        alert("restoreItemListに失敗しました");
      }
    },
    async changeItemList() {
      console.log("changeItemList this.FILE_NM_ITEM_LIST:" + this.FILE_NM_ITEM_LIST);
      if ( confirm("商品リストを入れ替えますか？") ) {
        //
        // ここは完了を待たせる（async changeItemList(){ ... await ... } ）
        // 本来は、この中でストアの更新までやった方が良いと思われる
        // リストの入れ替え自体は同期させ、それ以外は非同期で良い
        //
        this.itemList = await this.ajaxGetItemList();
        if ( this.itemList ) {
          console.log("changeItemList this.$store.dispatch('entities/setItemList',this.itemList)");
          this.$store.dispatch('entities/setList',[this.FILE_NM_ITEM_LIST,this.itemList]);
        } else {
          console.log("changeItemList is empty this.itemList?:"+this.itemList);
        }
      }

      // 【重要】ajaxGetItemList の完了を待たせることで解決
      this.itemList = this.$store.getters['entities/getList'](this.FILE_NM_ITEM_LIST);

      console.log("changeItemList this.itemList:" + this.itemList);
      console.log("changeItemList this.itemList.length:" + this.getCount(this.itemList));
    },
    //
    // ajaxItemList : Ajaxでサーバから取得
    //
    ajaxGetItemList: async function () {
      let url = this.AJAX_SERVER + "?" + this.AJAX_GET_ITEM_LIST;
      //let res = null;
      let resData = null;
      //let resErr = null;
      let resMsg = null;

      let itemList = null

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
          itemList = obj.list;
        }
      } 
      // listが取れていなければ異常終了
      if ( itemList === null ) {
          console.log('Ajaxエラー 商品リストが取得できていません');
          return false;
      }
      return itemList;
    },
    saveItemList: function() {
      console.log("saveItemList start:"+this.FILE_NM_ITEM_LIST);
      if ( this.getCount(this.itemList) > 0 ) {
        // 書き込み
        console.log("saveItemList JSON.stringify & setItem");
        let buf = JSON.stringify(this.itemList);
        localStorage.setItem(this.FILE_NM_ITEM_LIST,buf);
        console.log("saveItemList success!");
      } else {
        console.log("saveToriList itemList is empty!");
        alert("itemListが空");
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
