<template>
  <div class="Article">
    <!-- 記事 -->
    <div class="card w-100">
      <div class="card-header">ファイルのバージョン管理と入替</div>
      <div class="card-body">
        <div class="card-text">
          <p>内容</p>
          <ol>
            <li>ファイルのバージョン管理と目的</li>
            <li>ファイル入替のロジック</li>
            <li>ファイルバージョンリスト</li>
          </ol>
          <h2>ファイルのバージョン管理と目的</h2>
          <h2>ファイル入替のロジック</h2>
          <ul>
            <li>ファイルバージョンリストの取得</li>
            <li>ファイルバージョンリストの読出</li>
            <li>ファイルバージョンリストの比較</li>
            <li>バージョン変化ファイルの取得と入替</li>
            <li>ファイルバージョンリストの更新</li>
          </ul>
          <h2>ファイルバージョンリスト</h2>
          <p>ファイル名：file_version_list</p>
          <table class="table table-striped table-bordered"> 
            <thead>
              <tr>
                <th scope="col">項目名</th>
                <th scope="col">カラム名</th>
                <th scope="col">値(例)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">ファイルＩＤ</th>
                <td>file_id</td>
                <td>ex. bun_list</td>
              </tr>
              <tr>
                <th scope="row">ファイル名</th>
                <td>file_nm</td>
                <td>ex. 分類リスト</td>
              </tr>
              <tr>
                <th scope="row">バージョン</th>
                <td>file_version</td>
                <td>ex. 2021.05.15.01</td>
              </tr>
            </tbody>
          </table>
          <p>設定例</p>
          <table class="table table-striped table-bordered"> 
            <thead>
              <tr>
                <th scope="col">file_id</th>
                <th scope="col">file_nm</th>
                <th scope="col">file_version</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>bun_list</td>
                <td>分類リスト</td>
                <td>2021.05.15.01</td>
              </tr>
              <tr>
                <td>bumon_list</td>
                <td>部門リスト</td>
                <td>2021.05.15.01</td>
              </tr>
              <tr>
                <td>tenpo_list</td>
                <td>店舗リスト</td>
                <td>2021.05.15.01</td>
              </tr>
            </tbody>
          </table>
          <h2>実装</h2>
          <p>1.Home画面のcreatedで処理</p>
          <p>2.Ajaxから最新リストを取得</p>
<pre><code>
  resData = null;
  axios.get('/ajaxServer.php?function=getFileVersionList')
  .then(function (response) {
    resData = doAjaxSuccess(response);
  })
  .catch(function (error) {
    doAjaxError(error);
  });
  // Ajax成功であればfile_version_listを取り出し
  if ( resData !== null ) {
    newFileVersionList = resData["file_version_list"];
  }
</code></pre>
          <p>3.LocalStorageから現状リストを読出し</p>
<pre><code>
  localFileVersionList = localStorage.getItem('file_version_list');
</code></pre>
          <p>4.順次比較</p>
<pre><code>
  newFileVersionListを回して、localFileVersionListと比較、
  異なるファイルを抽出
</code></pre>
          <p>5.変更分を更新</p>
<pre><code>
  前項で抽出されたファイルに対し、更新処理を行う
</code></pre>
          <p>6.最新リストをLocalStorageに保存(入れ替え)</p>
<pre><code>
  localStorage.setItem('file_version_list',newFileVersionList);
</code></pre>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">動かしてみる</div>
      <div class="card-body">
        <div class="card-text">
          <!-- 受信部分 -->
          <h2>受信(ファイルバージョンリストの取得)</h2>
          <h3>受信</h3>
          <!-- URL選択 -->
          <select v-model="ex1_url">
            <option disabled value="">-</option>
            <option :value="AJAX_SERVER">ajxServer</option>
            <option value="http://monaca.localhost/testServer/public/ajxServ.php">NO PHP</option>
            <option value="http://monaca.localho/testServer/public/ajxServ.php">NO SERVER</option>
          </select>
          <span>URL: {{ ex1_url }}</span><br/>
          <!-- パラメータ選択 -->
          <select v-model="ex1_param">
            <option value="function=getFileVersionList">getFileVersionList</option>
            <option value="function=getFileVersionList">getFileVersionList</option>
          </select>
          <span>param: {{ ex1_param }}</span><br/>
          <!-- Ajax取得 -->
          <button class="add-button" @click="ex1AjaxGet">
            Ajax(axios)でGet
          </button><br/>
          <template v-if="ex1_res">
            <span>res.status:{{ ex1_res.status }}</span><br/>
            <span>res.data:{{ ex1_res.data }}</span><br/>
            <span>res.data.list:{{ ex1_list }}</span>
          </template>
          <template v-if="ex1_err">
            <template v-if="ex1_err.request">
              <span>err.request:{{ ex1_err.request }}</span>
            </template>
            <template v-else>
              <span>err.message:{{ ex1_err.message }}</span>
            </template>
          </template>
          <!-- 解析部分 -->
          <h3>受信後の解析(data)</h3>
          <ol class="wrap" v-if="ex1_data">
            <!-- 読み込みセクション -->
            <li class="read-area">
              <p>解析結果</p>
              <!-- レコードごとに処理 -->
              <div v-for="(value, key, index) in ex1_data" :key="index">
                {{ key }} / {{ value }} / {{ index }}
              </div>
            </li>
          </ol>
          <h3>受信後の解析(list)</h3>
          <ol class="wrap" v-if="ex1_list">
            <!-- 読み込みセクション -->
            <li class="read-area">
              <p>解析結果</p>
              <!-- レコードごとに処理 -->
              <div v-for="record in ex1_list" :key="record.file_id">
                {{ record.file_id }} / {{ record.file_nm }} / {{ record.file_version }}<br/>
              </div>
            </li>
          </ol>
          <h2>ローカルストレッジからの読出し</h2>
          <!-- ローカルストレッジ取得 -->
          <span>key of file_version_list: {{ ex2_ls_key_file_version_list }}</span><br/>
          <button class="button" @click="ex2LocalStorageGet">
            LocalStorage Get
          </button><br/>
          <template v-if="ex2_file_version_list">
            <table class="table table-striped table-bordered"> 
              <thead>
                <tr>
                  <th scope="col">file_id</th><th scope="col">file_nm</th><th scope="col">file_version</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="record in ex2_file_version_list" :key=record.file_id>
                  <td>{{ record.file_id }}</td>
                  <td>{{ record.file_nm }}</td>
                  <td>{{ record.file_version }}</td>
                </tr>
              </tbody>
            </table>
          </template>
          <h2>比較</h2>
          <button class="button" @click="ex2Compare">
            Compare
          </button><br/>
          <template v-if="ex2_file_compare_list.length>0">
            <table class="table table-striped table-bordered"> 
              <thead>
                <tr>
                  <th scope="col">file_id</th>
                  <th scope="col">file_nm</th>
                  <th scope="col">file_version</th>
                  <th scope="col">local_version</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="record in ex2_file_compare_list" :key=record.file_id>
                  <td>{{ record.file_id }}</td>
                  <td>{{ record.file_nm }}</td>
                  <td>{{ record.file_version }}</td>
                  <td>{{ record.local_version }}</td>
                </tr>
              </tbody>
            </table>
          </template>
          <h2>バージョンアップ対象</h2>
          <template v-if="ex2_version_up_files.length>0">
            <table class="table table-striped table-bordered"> 
              <thead>
                <tr>
                  <th scope="col">file_id</th>
                  <th scope="col">file_nm</th>
                  <th scope="col">file_version</th>
                  <th scope="col">local_version</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="record in ex2_version_up_files" :key=record.file_id>
                  <td>{{ record.file_id }}</td>
                  <td>{{ record.file_nm }}</td>
                  <td>{{ record.file_version }}</td>
                  <td>{{ record.local_version }}</td>
                </tr>
              </tbody>
            </table>
          </template>
          <h2>新しいバージョンを取得</h2>
          <h2>ローカルストレッジに新しいバージョンを書き込み</h2>
          <button class="button" @click="ex2LocalStorageSet">
            LocalStorage setItem
          </button><br/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleFileVersion",
  data() {
    return {
      // ex1 受信してみる
      ex1_url:    this.AJAX_SERVER,
      ex1_param:  null,
      ex1_res:    null, // 戻り情報丸ごとの格納
      ex1_err:    null, // エラー情報丸ごとの格納
      ex1_data:   false, // 戻りデータを配列に格納
      ex1_list:   false, // 戻りデータを配列に格納
      ex1_msg:    null, // エラーメッセージ
      // ex2 LocalStorage
      ex2_ls_key_file_version_list: 'file_version_list',
      ex2_file_version_list: null,
      ex2_file_compare_list: [],
      ex2_version_up_files: [],
    };
  },
  /*
  mounted: function(){
    var v = this;
  },
  */
  computed: {},
  methods: {
    //
    // Ajax：受信してみる
    //
    ex1AjaxGet: async function () {
      console.log("Ajax要求 url=" + this.ex1_url + " param=" + this.ex1_param);
      this.ex1_res = null;  // 正常時のレスポンス
      this.ex1_err = null;  // エラー時のレスポンス
      this.ex1_data = null; // レスポンス中のdataをセット
      this.ex1_list = null; // リスト型の場合のlist配列
      this.ex1_msg = null;  // エラーメッセージ
      //
      // 受信部分
      //
      await this.axios
        .get(this.ex1_url + "?" + this.ex1_param)
        .then((response) => {
          this.ex1_res = response;
          // mixinの汎用メソッドで処理(レスポンスそのものを取得)
          /*
          let buf = this.ajaxSuccess(response);
          this.ex1_data = buf.data;
          */
          this.ex1_data = this.ajaxSuccess(response);
        })
        .catch((err) => {
          this.ex1_err = err;
          // mixinの汎用メソッドで処理
          this.ex1_msg = this.ajaxError(err);
          console.log('Ajaxエラー msg=' + this.ex1_msg);
        });
      // dataが取れていなければ異常終了
      if ( !Array.isArray(this.ex1_data) ) {
          console.log('Ajaxエラー res.data is null & return false');
          this.ex1_data = false;
          return false;
      }
      // list を抽出
      for ( const obj of this.ex1_data ) {
        console.log('ex1_data obj:'+obj);
        if ( obj.list ) {
          console.log('ex1_data.list:'+obj.list);
          this.ex1_list = obj.list;
          // 各行
          for ( const record of obj.list ) {
            console.log('list.record.file_id:'+record.file_id.toString());
            console.log('list.record.file_nm:'+record.file_nm.toString());
            console.log('list.record.file_version:'+record.file_version.toString());
          }
        }
      } 
      return true;
    },
    //
    // LocalStorage get
    //
    ex2LocalStorageGet: async function () {
      console.log("LocalStorage get key:" + this.ex2_ls_key_file_version_list);
      // 読出し
      let buf = localStorage.getItem(this.ex2_ls_key_file_version_list);
      if ( buf ) {
        this.ex2_file_version_list = JSON.parse(buf);
        for ( const record of this.ex2_file_version_list ) {
          console.log('ls.record.file_id:'+record.file_id.toString());
          console.log('ls.record.file_nm:'+record.file_nm.toString());
          console.log('ls.record.file_version:'+record.file_version.toString());
        }
      }
      return true;
    },
    //
    // compare
    //
    ex2Compare: async function () {
      console.log("LocalStorage compare");
      this.ex2_file_compare_list = [];
      this.ex2_version_up_files = [];
      // Ajaxで受信したリストを元に比較
      for ( let record of this.ex1_list ) {
        let localVersion = this.getLocalVersionByFileId(record.file_id);
        console.log('file_id:'+record.file_id+' file_nm:'+record.file_nm+' file_version:'+record.file_version+' local:'+localVersion);
        // 比較用に格納
        record.local_version = localVersion;
        this.ex2_file_compare_list.push(record);
        // version違い分をPool
        if ( record.file_version !== localVersion ) {
          console.log("version_up file_id:"+record.file_id+" new ver:"+record.file_version+" local:"+localVersion);
          this.ex2_version_up_files.push(record);
        }
      }
      console.log("ex2_file_compare_list:"+this.ex2_file_compare_list)
      for ( let record of this.ex2_file_compare_list ) {
        console.log('file_id:'+record.file_id+' file_nm:'+record.file_nm+' file_version:'+record.file_version);
      }
      return true;
    },
    getLocalVersionByFileId(argFileId) {
      console.log('getLocalVersionByFileId argFileId:'+argFileId);
      if ( this.ex2_file_version_list ) {
        for ( let record of this.ex2_file_version_list ) {
          if ( record.file_id === argFileId ) {
            return record.file_version;
          }
        }
      }
      return '';
    },
    //
    // LocalStorage set
    //
    ex2LocalStorageSet: async function () {
      console.log("LocalStorage set key:" + this.ex2_ls_key_file_version_list);
      // 書き込み
      let buf = JSON.stringify(this.ex1_list);
      localStorage.setItem(this.ex2_ls_key_file_version_list,buf);
      return true;
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
