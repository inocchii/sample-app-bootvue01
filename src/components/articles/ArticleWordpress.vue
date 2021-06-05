<template>
  <div class="Article">
    <!-- 記事 -->
    <div class="card w-100">
      <div class="card-header">Wordpressからの記事取得</div>
      <div class="card-body">
        <div class="card-text">
          <p>内容</p>
          <ul>
            <li>Wordpress連携の目的</li>
            <li>Wordpress API</li>
            <li>記事の取得</li>
            <li>取得した記事を保持</li>
            <li>取得した記事をリスト</li>
            <li>取得した記事を表示</li>
          </ul>
          <!-- -->
          <h2>Wordpress連携の目的</h2>
          <div class="note">
            Wordpressで記事を編集管理。それをアプリに連携させることで記事を一元管理する。
          </div>
          <!-- -->
          <h2>Wordpress API</h2>
          <table class="table table-striped table-bordered table-sm"> 
            <thead>
              <tr><th scope="col">項目</th><th scope="col">内容</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>APIが有効か？</td>
                <td>.../wp-json/とアクセスしてJSON取得可能かで判断</td>
              </tr><tr>
                <td>取得URLの例</td>
                <td>.../wp-json/wp/v2/posts?_embed&per_page=5</td>
              </tr><tr>
                <td>queryによる<br/>取得情報使い分け</td>
                <td>posts?_embed&... : 情報一式<br/>
                posts?_fields=author,id,excerpt,title,link : 必要情報だけを指定</td>
              </tr><tr>
                <td>記事の指定(特定の記事)</td>
                <td>posts/123 : 投稿IDが123の記事</td>
              </tr><tr>
                <td>記事の指定(タグ抽出)</td>
                <td>posts?filter[tag]=mytag : タグがmytagの記事</td>
              </tr><tr>
                <td>記事の指定(カテゴリ抽出)</td>
                <td>posts?filter[category]=mycatg : カテゴリがmycatgの記事</td>
              </tr><tr>
                <td>記事の指定(文言抽出)</td>
                <td>posts?filter[s]=アイウエオ : アイウエオを含む記事</td>
              </tr><tr>
                <td>記事の指定(タグ抽出)と件数の組み合わせ</td>
                <td>posts?filter[tag]=mytag&filter[posts_per_page]=5<br/>
                  → タグがmytagの記事を5件分</td>
              </tr><tr>
                <td colspan='2'>取得内容をpostsに格納して<br/>post in posts で取り出す場合</td>
              </tr><tr>
                <td>記事URL</td>
                <td>post.link</td>
              </tr><tr>
                <td>記事タイトル</td>
                <td>post.title.rendered</td>
              </tr><tr>
                <td>本文抜粋</td>
                <td>post.excerpt.rendered</td>
              </tr><tr>
                <td>アイキャッチ画像</td>
                <td>post._embedded[“wp:featuredmedia”][0]<br/>
                [“media_details”][“sizes”][“full”][“source_url”]</td>
              </tr><tr>
                <td>アイキャッチ画像</td>
                <td>post._embedded['wp:featuredmedia'][0].source_url</td>
              </tr>
            </tbody>
          </table>
          <!-- -->
          <h2>記事の取得</h2>
          <h3>ストアをクリア</h3>
          <span>Vuexのストアをクリア：this.$store.dispatch('entities/clear',this.FILE_NM_BLOG_LIST);</span><br/>
          <button class="button" @click="clearBlogList">ストアをクリア</button><br/>
          <h3>ローカルストレッジからのリストア</h3>
          <span>記事リスト名:mixins consts FILE_NM_BLOG_LIST:{{ this.FILE_NM_BLOG_LIST }}</span><br/>
          <button class="button" @click="restoreBlogList">LocalStorageからリストア</button><br/>
          <h3>Ajaxでサーバから取得</h3>
          <span>AjaxURL:mixins consts AJAX_BLOG_SERVER:{{ this.AJAX_BLOG_SERVER }}?{{ this.AJAX_BLOG_GET_LIST }}</span><br/>
          <!-- URL選択 -->
          <select v-model="ajaxServer">
            <option value="http://shambeel.com/wp-json/wp/v2/posts">Main</option>
            <option value="./json/j1.json">./json/j1.json</option>
            <option value="https://api.coindesk.com/v1/bpi/currentprice.json">currentprice.json</option>
            <option value="https://techcrunch.com/wp-json/wp/v2/posts">techcrunch.com wp-json</option>
            <option value="https://joshi-spa.jp/wp-json/wp/v2/posts">joshi-spa wp-json</option>
            <option value="http://monaca.localhost/testServer/public/ajxServer.php">local:ajxServer</option>
            <option value="http://10.0.101.51/testServer/public/ajxServe.php">ip:No PHP</option>
            <option value="http://10.0.101.50/testServer/public/ajxServer.php">ip:No SERVER</option>
          </select>
          <span>URL: {{ ajaxServer }}</span><br/>
          <button class="button" @click="changeBlogList">Ajaxでサーバから取得</button><br/>
          <!-- -->
          <h2>取得した記事を保持</h2>
          <h3>LocalStorageに格納</h3>
          <span>記事リスト localStorage-Key:mixins consts FILE_NM_BLOG_LIST:{{ this.FILE_NM_BLOG_LIST }}</span><br/>
          <button class="button" @click="saveBlogList">LocalStorageに格納</button><br/>
          <!-- -->
          <h2>取得した記事をリスト</h2>
          <span>件数：{{ blogList.length }}}</span>
          <template v-if="blogList">
            <div class="card-group">
              <div class="card" v-for="blog in blogList" :key=blog.id>
                <router-link :to="getPath(outerBaseUrl, blog.title.rendered, blog.guid.rendered)">
                  <img class="card-img-top" :src="blog._embedded['wp:featuredmedia'][0].source_url">
                  <div class="card-body">
                    <div class="card-title">
                      {{ blog.title.rendered }}
                    </div>
                  </div>
                  <div class="card-footer">
                    {{ blog.guid.rendered }}
                  </div>
                </router-link>
              </div>
            </div>
          </template>
          <!-- -->
          <h2>取得した記事を表示</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleWordpress",

  mounted: function() {

    // 記事リストをストアから取得
    console.log("mounted blogList from store:this.FILE_NM_BLOG_LIST:"+this.FILE_NM_BLOG_LIST);
    this.blogList = this.$store.getters['entities/getList'](this.FILE_NM_BLOG_LIST);
    console.log(this.blogList);

    // 存在しなければLocalStorageから取得
    if ( this.getCount(this.blogList) <= 0 ) {
      this.restoreBlogList();
    }
    console.log("mounted blogList from store:count:"+this.getCount(this.blogList));
  },

  data() {
    return {
      blogList: [],
      outerBaseUrl: "/outer",
      ajaxServer: this.AJAX_BLOG_SERVER,
    };
  },

  methods: {
    //
    // blogの件数
    //
    getCount(argObj) {
      if( argObj === null ) {
        return 0;
      }
      //let val = Object.keys(argObj);
      return argObj.length;
    },
    //
    // blogへのリンクをアプリ内ページとして生成
    //
    getPath(argBase, argTitle, argOuterUrl) {
      console.log(
        "Outer base=" + argBase + " title=" + argTitle + " url=" + argOuterUrl
      );
      return (
        argBase + "?title=" + argTitle + "&url=" + argOuterUrl + "&backPath="
      );
    },
    //
    // storeのブログリストをクリア
    //
    clearBlogList: function() {
      console.log("clearBloglist start");
      if ( this.$store.dispatch('entities/clear',this.FILE_NM_BLOG_LIST) ) {
        console.log("clearBloglist success!");
        this.blogList = [];
      } else {
        console.log("clearBloglist error!!!");
        alert("clearBloglistに失敗しました");
      }
    },
    //
    // ブログリストをlocalStorageからリストア
    //
    restoreBlogList: function() {
      console.log("restoreBlogList start getItem:"+this.FILE_NM_BLOG_LIST);
      let lsBlogList = localStorage.getItem(this.FILE_NM_BLOG_LIST);
      if ( lsBlogList ) {
        console.log("restoreBlogList getItem:storage length:"+lsBlogList.length);
        this.blogList = JSON.parse(lsBlogList);
        this.$store.dispatch('entities/setList',[this.FILE_NM_BLOG_LIST,this.blogList]);
        //this.blogList = this.$store.getters['entities/getList'](this.FILE_NM_BLOG_LIST);
        console.log("restoreBlogList success! length:"+this.blogList.length);
      } else {
        console.log("restoreBlogList error!!");
        alert("restoreBlogListに失敗しました");
      }
    },
    //
    // ブログリストを再取得
    //
    async changeBlogList() {
      console.log("changeBlogList this.FILE_NM_BLOG_LIST:" + this.FILE_NM_BLOG_LIST);
      if ( confirm("記事リストを入れ替えますか？") ) {
        //
        // ここは完了を待たせる（async changeBlogList(){ ... await ... } ）
        // 本来は、この中でストアの更新までやった方が良いと思われる
        // リストの入れ替え自体は同期させ、それ以外は非同期で良い
        //
        this.blogList = await this.ajaxGetBlogList();
        if ( this.blogList ) {
          console.log("changeBlogList this.$store.dispatch('entities/setBlogList',this.blogList)");
          this.$store.dispatch('entities/setList',[this.FILE_NM_BLOG_LIST,this.blogList]);
        } else {
          console.log("changeBlogList is empty this.blogList?:"+this.blogList);
        }
      }

      // 【重要】ajaxGetBlogList の完了を待たせることで解決
      this.blogList = this.$store.getters['entities/getList'](this.FILE_NM_BLOG_LIST);

      console.log("changeBlogList this.blogList:" + this.blogList);
      console.log("changeBlogList this.blogList.length:" + this.getCount(this.blogList));
    },
    //
    // ajaxBlogList : Ajaxでサーバから取得
    //
    ajaxGetBlogList: async function () {
      let url = this.ajaxServer + "?" + this.AJAX_BLOG_GET_LIST;
      //let res = null;
      let resData = null;
      //let resErr = null;
      let resMsg = null;

      let blogList = [];

      console.log("Ajax要求 url=" + url);

      //
      // 受信部分
      //
      await this.axios
        .get(url)
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
      // dataが取れていなければ異常終了
      if ( !Array.isArray(resData) ) {
          console.log('Ajaxエラー res.data is null & return false');
          return false;
      }
      // list を抽出
      console.log('res.data.length:'+resData.length);
      for ( const obj of resData ) {
        console.log('res.data obj:'+obj);
        console.log(obj);
        /*
        if ( obj.list ) {
          console.log('res.data.list:'+obj.list);
          blogList = obj.list;
        }
        */
        blogList.push(obj);
      } 
      // listが取れていなければ異常終了
      if ( blogList.length === 0 ) {
          console.log('Ajaxエラー 記事リストが取得できていません');
          return false;
      }
      return blogList;
    },
    saveBlogList: function() {
      console.log("saveBlogList start:"+this.FILE_NM_BLOG_LIST);
      if ( this.getCount(this.blogList) > 0 ) {
        // 書き込み
        console.log("saveBlogList JSON.stringify & setItem");
        let buf = JSON.stringify(this.blogList);
        localStorage.setItem(this.FILE_NM_BLOG_LIST,buf);
        console.log("saveBlogList success!");
      } else {
        console.log("saveBlogList blogList is empty!");
        alert("blogListが空");
      }
    },
  },
  props: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
