<template>
  <div class="Article">
    <!-- 記事 -->
    <div class="card w-100">
      <div class="card-header">ネットショップ連携(Color me shop)</div>
      <div class="card-body">
        <div class="card-text">
          <p>内容</p>
          <ul>
            <li>ネットショップASP型</li>
            <li>Color me shop</li>
            <li>カート表示からの連携</li>
            <li>APIで連携</li>
          </ul>
          <p>参考サイト</p>
          <ul>
            <li><a target="_blank" rel="noopener noreferrer" href='https://itsumo365.co.jp/blog/post-8977/'>
              ASP型カートシステム比較</a></li>
          </ul>
          <h2>ネットショップASP型</h2>
          <table class="table table-striped table-bordered"> 
            <thead>
              <tr>
                <th scope="col">サービス＆URL</th>
                <th scope="col">特徴</th>
                <th scope="col">備考</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th><router-link :to="getOuterPath('/outer','futureshop','https://www.future-shop.jp/')">
                  futureshop</router-link></th>
                <td>更新が早い<br/>月額22,000-</td>
                <td>API不明</td>
              </tr>
              <tr>
                <th><router-link :to="getOuterPath('/outer','Color me shop','https://shop-pro.jp/')">
                  Color me shop</router-link></th>
                <td>無料で始められる</td>
                <td>APIあり</td>
              </tr>
              <tr>
                <th><router-link :to="getOuterPath('/outer','MakeShop','https://www.makeshop.jp/')">
                  MakeShop</router-link></th>
                <td>機能豊富、手数料ゼロ<br/>月額11,000-</td>
                <td>API不明</td>
              </tr>
              <tr>
                <th><a target="_blank" rel="noopener noreferrer" href='https://ec-force.com/'>
                  ecforce</a></th>
                <td>D2Cに強い<br/>月額49,800-</td>
                <td>API不明</td>
              </tr>
              <tr>
                <th><router-link :to="getOuterPath('/outer','aishipR','https://www.aiship.jp/')">
                  aishipR</router-link></th>
                <td>スマホファースト<br/>月額9,800-</td>
                <td>API不明</td>
              </tr>
            </tbody>
          </table>
          <h2>Color me shop の「どこでもColorMe」を貼り付けてみる</h2>
          <div ref="cart" style="border:1px"></div>
          <div class="note">
            以下を試したが上手く動作せず<br/>
            1) colormeのscriptタグを直接書き込む<br/>
              → scriptタグはtemplate内では使用不可<br/>
            2) mountedでscriptタグを生成して出力<br/>
              → colormeのscriptでdocument writeしており、それが許可されてない<br/>
              ※ 非同期scriptからのdocument writeは不可<br/>
              <div class="mention">It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.</div>
          </div>
          <div class="note">※以下iframeにてscript内容が確認できる</div>
          <iframe referrerpolicy="same-origin" style="border: 1px; width: 100%;"
            src="https://ranastyle.shop-pro.jp/?mode=cartjs&pid=160703248&style=normal_gray&name=y&img=y&expl=y&stock=n&price=y&optview=n&inq=n&sk=y">
          </iframe>
          <div class="note">script出力内容をそのまま再現(エスケープ文字は除去)</div>
          <div class="mention">styleタグは使用不可のためstyleエリアに記述</div>
          <div>
            <div style="width: 100%;margin: 0 auto;padding: 0;">
              <div class="cartjs_box" style="margin: 0;padding: 20px 0;">
                <form name="product_form" method="post" action="https://ranastyle.shop-pro.jp/cart/proxy/basket/items/add" class="cartjs_product_form" style="width: 100%;margin: 0px;padding: 0;">          
                  <!-- 商品画像 -->              
                  <div class="cartjs_product_img" style="width: 50%;margin: 0 auto 20px;padding: 0;text-align: center;">
                    <img src="https://img21.shop-pro.jp/PA01470/457/product/160703248.jpg?cmsp_timestamp=20210612133848" style="width: 100%;" />
                  </div>
                  <!--// 商品画像 -->              
                  <!-- Product(商品名) -->      
                  <div class="cartjs_cart_in" style="width: 50%;text-align: center;margin: 0 auto 20px;">        
                    <strong class="cartjs_product_name" style="padding: 0;font-size: 20px;">貝殻</strong>      
                  </div>              <!-- 商品の説明 -->      
                  <div class="cartjs_product_explain" style="width: 50%;text-align: left;margin: 0 auto 20px;line-height: 1.6;">
                            タカラ貝      
                  </div>        
                  <div class="cartjs_product_table">
                    <table style="border: none;width: 50%;margin: 0 auto 15px;text-align: left;">                  
                      <tr class="cartjs_sales_price">            
                        <th style="font-weight: normal;padding-bottom: 10px;">販売価格</th>            
                        <td style="font-weight: bold;font-size: 18px;padding-bottom: 10px;">              <!-- 販売価格 -->              880円(税80円)<br />            </td>
                      </tr>                        <!-- 売切れ時・休止時・ログイン限定購入商品は表示しない  -->                  
                      <tr class="cartjs_product_num">            
                        <th style="font-weight: normal;padding-bottom: 10px;">購入数</th>            
                        <td style="padding-bottom: 10px;">              
                          <input type="text" name="product_num" value="1" class="cartjs_product_input_txt" style="width: 50px;padding: 4px 6px;" />            
                        </td>          
                      </tr>                          <!--オプション情報-->                    
                    </table>              
                  </div>    <!-- 売切れ時・休止時・ログイン限定購入商品は表示しない  -->          
                  <div class="cartjs_cart_in" style="width: 100%;text-align: center;margin: 0 auto;">        
                    <input type="submit" value="カートに入れる" style="margin-bottom: 20px;background-color: #555555;text-align: center;border-radius: 6px;height: 60px;width: 50%;color: #fff;font-size: 16px;border: 0;cursor: pointer;" />      
                  </div>              <!-- 特定商取引法リンク -->      
                  <div class="cartjs_sk_link_other" style="width: 50%;margin: 0 auto 5px;text-align: left;font-size: 12px;">        
                    <a href="https://ranastyle.shop-pro.jp/?mode=sk">&raquo;&nbsp;特定商取引法に基づく表記 (返品など)</a>      
                  </div>    <!--// 特定商取引法リンク -->            
                  <div class="cartjs_product_info">          
                    <!--<input type="hidden" name="members_hash" value="50bb364603c96e4a5d752b268e624da1">-->    
                    <input type="hidden" name="shop_id" value="PA01470457">    
                    <input type="hidden" name="product_id" value="160703248">    
                    <input type="hidden" name="members_id" value="">    
                    <input type="hidden" name="back_url" value="">    
                    <input type="hidden" name="back_url_with_get" value="1">    
                    <!--<input type="hidden" name="reference_token" value="e64b2802faae45b09e430d068fdd8484">-->    
                  </div>  
                </form>    
              </div>
            </div>
          </div>
          <!-- APIを使用してみる -->
          <h2>Color me shop の「API」を使用</h2>
          <h3>API利用に必要な事柄</h3>
          <div class="note">
            <br/>1.デベロッパーアカウントを作成
            <br/>2.アプリ登録(アプリ名：ranastyle-test/リダイレクトURL：urn:ietf:wg:oauth:2.0:oob)
            <br/><code>クライアントID：f8f4f0193dc9f20029ce9423ec078115f96a181d008158118f223ca0e9c84c38</code>
            <br/><code>クライアントシークレット：3fc809ce9fdffbf79c880c1daefc945dec6271b92a0dde71e257cb0ff47111c6</code>
            <br/>3.1.ショップAPI利用をアプリに認可
            <br/>認可要求：<code>https://api.shop-pro.jp/oauth/authorize?client_id=f8f4f0193dc9f20029ce9423ec078115f96a181d008158118f223ca0e9c84c38&redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=code&scope=read_products%20write_products%20read_sales%20write_sales%20read_shop_coupons</code>
            <br/>承認：<code>https://api.shop-pro.jp/oauth/authorize/ad5a58c629d761e66eba01f7221969f62c75189427cf0b93558761c2e3dbe4cd</code>
            <br/>AUTHCODE: <code>6d8985ed9cf152db6b0d15ef1728455f9017e3f70c5d13617d542fa299fe39b3</code>
            <br/>3.2.認可コードをアクセストークンに交換<pre><code>
curl -X POST \
  -d'client_id=f8f4f0193dc9f20029ce9423ec078115f96a181d008158118f223ca0e9c84c38' \
  -d'client_secret=3fc809ce9fdffbf79c880c1daefc945dec6271b92a0dde71e257cb0ff47111c6' \
  -d'code=6d8985ed9cf152db6b0d15ef1728455f9017e3f70c5d13617d542fa299fe39b3' \
  -d'grant_type=authorization_code'   \
  -d'redirect_uri=urn:ietf:wg:oauth:2.0:oob'  \
  'https://api.shop-pro.jp/oauth/token'
</code></pre>
            <br/>返却JSON：<code><pre>
{
  "access_token":"a53185ccd768806c67c299e88994279b60cd6071f03540e056ae0545da2259a2",
  "token_type":"Bearer",
  "scope":"read_products write_products read_sales write_sales read_shop_coupons",
  "created_at":1623505580
}
</pre></code>
            <br/>4.1.ショップAPI利用をアプリに認可
            <br/>認可要求：<code>https://api.shop-pro.jp/oauth/authorize?client_id=80f5df0fdc5007a224bf5c2f3e304298398bdee6bf609514ac575678a7d2eb39&redirect_uri=http://localhost:8080&response_type=code&scope=read_products%20write_products%20read_sales%20write_sales%20read_shop_coupons</code>
            <br/>承認：<code>https://api.shop-pro.jp/oauth/authorize/325b4d0fa49f110ab5cc234d78da951185e6e3737529b3318e2092748cef901c</code>
            <br/>AUTHCODE: <code>325b4d0fa49f110ab5cc234d78da951185e6e3737529b3318e2092748cef901c</code>
            <br/>4.2.認可コードをアクセストークンに交換<pre><code>
curl -X POST \
  -d'client_id=80f5df0fdc5007a224bf5c2f3e304298398bdee6bf609514ac575678a7d2eb39' \
  -d'client_secret=32a88a65afc7b2e4f80aa13f08c953aa14261be45df8a77f28cb6c6a562372b3' \
  -d'code=325b4d0fa49f110ab5cc234d78da951185e6e3737529b3318e2092748cef901c' \
  -d'grant_type=authorization_code'   \
  -d'redirect_uri=http://localhost:8080'  \
  'https://api.shop-pro.jp/oauth/token'
</code></pre>
            <br/>返却JSON：<code><pre>
{
  "access_token":"d32ac881135cfe1476174b0d4505bf2dca383d16516b5383dbe295e7ae8316f2",
  "token_type":"Bearer",
  "scope":"read_products write_products read_sales write_sales read_shop_coupons",
  "created_at":1623511464
}
</pre></code>
          </div>
          <h3>APIへのアクセス</h3>
          <div class="note">
            <br/>curlでアクセスしてみる(1)<pre><code>
curl -H 'Authorization: Bearer a53185ccd768806c67c299e88994279b60cd6071f03540e056ae0545da2259a2' https://api.shop-pro.jp/v1/shop.json
</code></pre>
            <br/>curlでアクセスしてみる(2)<pre><code>
curl -H 'Authorization: Bearer d32ac881135cfe1476174b0d4505bf2dca383d16516b5383dbe295e7ae8316f2' https://api.shop-pro.jp/v1/shop.json
</code></pre>
          </div>
          <h3>主なAPIクエリ</h3>
          <ul>
            <li>URL：https://api.shop-pro.jp/v1/</li>
            <li>ショップ情報：shop.json</li>
            <li>商品リスト：products.json</li>
            <li>商品情報：products/{product_id}</li>
          </ul>
          <h3>AjaxからだとCORSで引っかかる</h3>
          <div class="input">
            <button class="button" @click="changeShopItemList">Ajaxでサーバから取得</button>
          </div>
          <code>URL:(mixins consts) AJAX_SHOP_SERVER:{{ this.AJAX_SHOP_SERVER }}{{ this.AJAX_SHOP_GET_ITEM_LIST }}</code>
          <!-- 商品リストを表示(コンポーネントBlockItemを使用) -->
          <h2>商品リストを表示</h2>
          <div class="note">※コンポーネントBlockItemを使用</div>
          <div class="row">
            <template v-for="item in shopItemList">
              <BlockItem :item="item" :key="item.id" class="card col-6"></BlockItem>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlockItem from "@/components/blocks/BlockItem.vue";

export default {
  name: "ArticleColorme",
  mounted: function() {
    // Color me のcartを出力してみる
    this.makeCart('160703248'); // 引数は商品ID

    // Color me の商品リストをストアから取得
    console.log("mounted shopItemList from store:this.FILE_NM_SHOP_ITEM_LIST:"+this.FILE_NM_SHOP_ITEM_LIST);
    this.shopItemList = this.$store.getters['entities/getList'](this.FILE_NM_SHOP_ITEM_LIST);
    console.log("mounted toriList from store:count:"+this.getCount(this.shopItemList));

    // 存在しなければLocalStorageから取得
    if ( this.getCount(this.shopItemList) <= 0 ) {
      this.$store.dispatch('entities/setInfoFromStorage',this.FILE_NM_SHOP_ITEM_LIST);
      this.shopItemList = this.$store.getters['entities/getList'](this.FILE_NM_SHOP_ITEM_LIST);
    }
  },
  data() {
    return {
      shopItemList: [],
      outerBaseUrl: "/outer",
      ajaxServer: this.AJAX_SHOP_SERVER,
    };
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
    makeCart(argItemId) {
      // Color me shop は別サイトでのカート表示用のscriptを準備しているが、
      // Vueコンポーネント上では「非同期な外部スクリプトによる document write は不可」で表示できず
      // 以下はエラーメッセージ
      /*
        Failed to execute 'write' on 'Document': 
        It isn't possible to write into a document
         from an asynchronously-loaded external script unless it is explicitly opened.
      */
      // 以下、失敗しているが最小部分を残している
      // scriptタグを追加
      let script = document.createElement('script');
      // Color me shop の商品スクリプトをセット
      script.src = 'https://ranastyle.shop-pro.jp/?mode=cartjs&pid='+argItemId+'&style=normal_gray&name=y&img=y&expl=y&stock=n&price=y&optview=n&inq=n&sk=y';
      script.async = true;
      script.charset = 'euc-jp';
      console.log("makeCart script.onload");
      // 該当要素(<div ref="cart">)に出力
      this.$refs.cart.appendChild(script);
    },
    //
    // 商品リストを取得
    //
    async changeShopItemList() {
      console.log("changeItemList this.FILE_NM_BLOG_LIST:" + this.FILE_NM_SHOP_ITEM_LIST);
      if ( confirm("商品リストを入れ替えますか？") ) {
        // ここは完了を待たせる（async changeShopItemList(){ ... await ... } ）
        this.shopItemList = await this.ajaxGetShopItemList();
        if ( this.shopItemList ) {
          console.log("changeShopItemList this.$store.dispatch('entities/setInfoAndStorage',this.shopItemList)");
          this.$store.dispatch('entities/setInfoAndStorage',[this.FILE_NM_SHOP_ITEM_LIST,this.shopItemList]);
        } else {
          console.log("changeShopItemList is empty this.itemList?:"+this.shopItemList);
        }
      }
      // 【重要】ajaxGetBlogList の完了を待たせることで解決
      this.shopItemList = this.$store.getters['entities/getList'](this.FILE_NM_SHOP_ITEM_LIST);

      console.log("changeShopItemList this.shopItemList:" + this.shopItemList);
      console.log("changeShopItemList this.shopItemList.length:" + this.getCount(this.shopItemList));
    },
    //
    // ajaxGetShopItemList : Ajaxでサーバから取得
    //
    ajaxGetShopItemList: async function () {
      let url = this.AJAX_SHOP_SERVER + "" + this.AJAX_SHOP_GET_ITEM_LIST;
      //let url = "./json/products.json";
      //let authori = "{headers:{Authorization:Bearer a53185ccd768806c67c299e88994279b60cd6071f03540e056ae0545da2259a2}}";
      //let res = null;
      let resData = null;
      //let resErr = null;
      let resMsg = null;

      let shopItemList = [];

      console.log("Ajax要求 url=" + url);

      //
      // 受信部分
      //  認証が必要なのでgetにheadersを付加
      //
      //  .get(url,authori)
      await this.axios
        /*
        .get(url,{
          withCredentials: true,
          headers:{
            Authorization:'Bearer d32ac881135cfe1476174b0d4505bf2dca383d16516b5383dbe295e7ae8316f2'
          }
        })
        */
        .get(url,{
          headers:{
            Authorization:'Bearer d32ac881135cfe1476174b0d4505bf2dca383d16516b5383dbe295e7ae8316f2'
          }
        })
        .then((response) => {
          console.log('axios get then response:');
          console.log(response);
          // mixinの汎用メソッドで処理
          resData = this.ajaxSuccess(response);
        })
        .catch((err) => {
          console.log('axios get then catch err:');
          console.log(err);
          // mixinの汎用メソッドで処理
          resMsg = this.ajaxError(err);
          console.log('Ajaxエラー msg=' + resMsg);
        });
      // サーバ処理判定(result)確認
      if ( resData.errors ) {
          alert('【商品リスト】取得失敗:'+resData.errors.messages);
          console.log('【商品リスト】取得失敗:'+resData.errors.messages);
          return false;
      }
      // infoが取れていなければ異常終了
      if ( resData.products === null ) {
          alert('【商品リスト】商品リストが空');
          console.log('【商品リスト】商品リストが空');
          return false;
      }
      shopItemList = resData.products;
      // listが取れていなければ異常終了
      if ( shopItemList.length === 0 ) {
          console.log('Ajaxエラー 商品リストが取得できていません');
          return false;
      }
      console.log('【商品リスト】件数:'+shopItemList.length);
      for ( let item of shopItemList ) {
        console.log(item);
      }
      return shopItemList;
    },
  },
  props: {},
  components: {
    BlockItem,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.colorme-option-box{    clear: both;    width: 100%;    overflow: hidden;  }  
.colorme-option-tbl{    margin-bottom: 20px;    width: 100%;    border-collapse: collapse;    border-spacing: 0;    border-top: 1px solid rgba(0,0,0,0.08);  }  
.colorme-option-tbl tr {    border-bottom: 1px solid rgba(0,0,0,0.08);  }  
.colorme-option-tbl th{    background-color: rgba(0,0,0,0.05);    padding: 0.4em 1em;    font-size: 13px;    font-weight: normal;    border-right: 1px solid rgba(0,0,0,0.08);    text-align: right;  }  
.colorme-option-tbl th:last-child{    border-right: none;  }  
.colorme-option-tbl thead th{    text-align: center;  }  
.colorme-option-tbl td{    text-align: center;    padding: .5em;    border-right: 1px solid rgba(0,0,0,0.07);  }
</style>
