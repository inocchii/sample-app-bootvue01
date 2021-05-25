<template>
  <div class="Themes">
    <div class="">Vue.jsでのJavaScript使用についてのメモ</div>
    <div class="card w-100">
      <div class="card-header">jQueryの使用方法を整理</div>
      <div class="card-body">
        <div class="card-text">
          <p>importを各コンポーネントで行う場合</p>
          <ol>
            <li>importを各コンポーネントで</li>
            <li>monuted でイベント記述</li>
            <li><button id="BUTJQ">alert by jquery</button></li>
          </ol>
          <p>importをmain.jsで行う場合</p>
          <ol>
            <li>
              importをmain.jsで<br />下記以外では上手くいかず<br />
              <code>window.jq = require('jquery')</code>
            </li>
            <li>
              monuted でイベント記述<br />
              <code>window.jq("#BUTJQMAIN").on('click',function(){ ...</code>
            </li>
            <li><button id="BUTJQMAIN">alert by main jquery</button></li>
          </ol>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">共通関数の持たせ方(Mixin)</div>
      <div class="card-body">
        <div class="card-text">
          <p>共通関数＝グローバル関数/メソッド</p>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">共通定数の持たせ方(Mixin)</div>
      <div class="card-body">
        <div class="card-text">
          <p>共通定数＝グローバル定数</p>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">グローバル変数として使う(Mixin)</div>
      <div class="card-body">
        <div class="card-text">
          <p>値保持用の変数としては使えない</p>
          <p>※値を保持したい場合はVuexを使用する</p>
          <p>※ローカルにコピーされるので型としては使用できるかも</p>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">クラス・オブジェクトの生成と利用</div>
      <div class="card-body">
        <div class="card-text">
          <h2>何に使う</h2>
          <ul>
            <li>変数(ゲッター/セッターを使用する)</li>
            <li>定数(ゲッターを使用する)</li>
            <li>関数：静的メソッド(static)</li>
            <li>メソッド</li>
            <li>オブジェクト(ローカル)</li>
            <li>オブジェクト(グローバル)</li>
          </ul>
          <h2>サンプル</h2>
          <p>以下をインポートして使用するパターン</p>
          <pre><code>
// クラス定義(モジュールの公開クラス)
//  使用時は
//    import { CSample } from "@/components/themes/CSample.js";
//    let sample = new CSample('myName','myTitle');
export class CSample {
  // コンストラクタ
  constructor(name,title) {
    this._name = name;
    this._title = title;
  }
  // メソッド
  toString() {
    return this._name+':'+this._title;
  }
  // ゲッター(変数直接ではなくメソッド経由とする)
  //  使用(プロパティ扱いで)
  //    let myName = sample.name;
  get name() {
    return this._name;
  }
  // セッター(変数直接ではなくメソッド経由とする)
  //  使用(プロパティ扱いで)
  //    sample.name = "yourName";
  set name(argName) {
    this._name = argName;
  }
  // クラス定数（staticなgetを利用する）
  //  使用
  //    let myProjectNm = CSample.projectName;
  static get projectName() {
    return 'Vue Sample Project';
  }
  // 静的メソッド
  //  使用
  //    let myProjectNm = CSample.getSquareArea(5,10);
  static getSquareArea(argBase,argHeight) {
    return argBase * argHeight;
  }
}
</code></pre>
          <h2>main.jsでimportしてグローバル化（△）</h2>
<pre><code>
main.jsにて
import { CSample as CSampleGlobal } from "@/components/gobj/CSample.js";
let objSampleGlobal = new CSampleGlobal('sampleGlobal','this is sample global object')
→ 各コンポーネントにて（NG）
// window.objSampleGlobal は使える
import { CSample as CSampleGlobal } from "@/components/themes/CSample.js";
window.objSampleGlobal = new CSampleGlobal('sampleGlobal','this is sample global object');
→ 各コンポーネントにて（dataで参照して使えている）
  data() {
    return {
      objSampleGlobal: window.objSampleGlobal,
    };
  },
</code></pre>
          <h3>使ってみる → window.にセットしてようやく使えた</h3>
          myName:{{ myName }}<br/>
          data objSampleLocal.name:{{ objSampleLocal.name }} NG(dataでnewでは上手くいかない)<br/>
          data objSampleGlobal.name:{{ objSampleGlobal.name }} OK(dataでwindow.objをセット)<br/>
          window.objSampleGlobal.name:上のようにdataで参照すれば使える<br/>
          <button @click="changeSampleGlobal">changeSampleGlobal</button>
          <h3>使ってみる２ → バッジカウンタで試してみる</h3>
          メニューバーテンプレートのバッジカウンタをグローバル値とし、<br/>
          別コンポーネントで触り反映されるか？<br/>
          持たせ方はVuexパターンとグローバルオブジェクトパターン<br/>
          <button @click="addCounter('home')">addCounter('home')</button><br/>
          <button @click="addCounterVuex('else')">addCounterVuex('else')</button><br/>
          <h3>結論 → 両方使えるが、値保持には統一性のあるVuexが良い</h3>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">グローバルオブジェクトについて</div>
      <div class="card-body">
        <div class="card-text">
          <h2>使い所</h2>
          <table class="table table-striped table-bordered"> 
            <thead>
              <tr>
                <th scope="col">タイプ</th>
                <th scope="col">mixins</th>
                <th scope="col">Vuex</th>
                <th scope="col">Object</th>
                <th scope="col">配置/参照</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">定数</th>
                <td>○</td>
                <td>Ｘ</td>
                <td>△</td>
                <td>配置：mixins/consts.js<br/>参照：this.abc</td>
              </tr>
              <tr>
                <th scope="row">メソッド</th>
                <td>○</td>
                <td>－</td>
                <td>△</td>
                <td>配置：mixins/common.js<br/>参照：this.doSome()</td>
              </tr>
              <tr>
                <th scope="row">変数</th>
                <td>Ｘ</td>
                <td>○</td>
                <td>未</td>
                <td>配置：store/vars.js<br/>参照：this.$store.state.vars.abc</td>
              </tr>
              <tr>
                <th scope="row">データ</th>
                <td>Ｘ</td>
                <td>○</td>
                <td>未</td>
                <td>配置：store/entities.js<br/>参照：this.$store.state.entities.abcList</td>
              </tr>
              <tr>
                <th scope="row">オブジェ</th>
                <td>Ｘ</td>
                <td>Ｘ</td>
                <td>△</td>
                <td>配置：globals/xxxxx.js<br/>参照：window.xxxxx.doSome()</td>
              </tr>
            </tbody>
          </table>
          <h2>main.jsでimport</h2>
          <p>グローバル定数(mixins/consts.js)</p>
          this.FILE_NM_FILE_VERSION_LIST：{{ this.FILE_NM_FILE_VERSION_LIST }}
          <p>グローバル変数(store/vars.js)</p>
          this.$store.state.vars.login_id:{{ this.$store.state.vars.login_id }}
          <p>グローバルデータ(store/entities.js)</p>
          <p>グローバルオブジェクト(globals/Cxxx.js)</p>
          window.objXxx.ppp:いったんdata(){}にてセットすれば使える
          <table class="table table-striped table-bordered"> 
            <thead>
              <tr>
                <th scope="col">タイプ</th>
                <th scope="col">配置</th>
                <th scope="col">参照/出力</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">定数</th>
                <td>mixins/consts.js</td>
                <td>this.FILE_NM_FILE_VERSION_LIST<br/>=>{{ this.FILE_NM_FILE_VERSION_LIST }}</td>
              </tr>
              <tr>
                <th scope="row">変数</th>
                <td>store/vars.js</td>
                <td>this.$store.state.vars.login_id<br/>=>{{ this.$store.state.vars.login_id }}</td>
              </tr>
              <tr>
                <th scope="row">データ</th>
                <td>store/entities.js</td>
                <td>this.$store.state.entities.bun_list<br/>=></td>
              </tr>
              <tr>
                <th scope="row">オブジェ</th>
                <td>globals/CCounter.js</td>
                <td>window.objCounter.get("order")
                  <br/>=>{{objCounter.get("order")}}
                  <button @click="addCounter('order')">addCounter('order')</button>
                  <br/>※object側が配列の場合、そのままだとリアクティブにならない
                  <br/>※更新時に配列に対しarr.splice()を実施することでリアクティブに動作する
                  <br/>※リフレッシュ後の最初が反応しない？ Vuex側は安定
                </td>
              </tr>
              <tr>
                <th scope="row">オブジェ(比較)</th>
                <td>store/var.js</td>
                <td>this.$store.state.addCount("item")
                  <br/>=>{{this.$store.state.COUNTS["item"]}}
                  /{{this.$store.getters.getCount("item")}}
                  /{{this.getCount("item")}}
                  <button @click="addCounterVuex('item')">addCounterVuex('item')</button>
                  <br/>※store側が配列の場合、そのままだとリアクティブにならない
                  <br/>※mutationで配列に対しarr.splice()を実施することでリアクティブに動作する
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">データベース使用について</div>
      <div class="card-body"><div class="card-text"></div></div>
    </div>
    <div class="card w-100">
      <div class="card-header">JavaScript使用時の注意点</div>
      <div class="card-body"><div class="card-text"></div></div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { CSample } from "./CSample.js";
export default {
  name: "xxx",
  data() {
    return {
      myName: "ThemesJS.vue",
      myTitle: "VueにおけるJavaScript使用について",
      // NG objSample: new CSample(this.myName,this.myTitle),
      objSampleLocal: new CSample(this.myName,this.myTitle),
      objSampleGlobal: window.objSampleGlobal,
      // counter
      objCounter: window.objCounter,
    };
  },
  props: {
    msg: String,
  },
  computed: {
    getCount: function () {
      // 算出プロパティでは引数を直接受け取れないのでreturn関数で受け取っている
      return function (argNm) {
        console.log("getCount nm:"+argNm+" vuex:"+this.$store.getters.getCount(argNm));
        return this.$store.getters.getCount(argNm);
      };
    },
  },
  methods: {    
    changeSampleGlobal() {
      window.objSampleGlobal.name = window.objSampleGlobal.name + '+w';
      alert('objSampleGlobal.name:'+window.objSampleGlobal.name);
      this.objSampleGlobal.name = this.objSampleGlobal.name + '+d';
      alert('objSampleGlobal.name:'+this.objSampleGlobal.name);
    },
    addCounter(argNm) {
      this.objCounter.add(argNm);
      console.log("addCounter:"+argNm+":count="+this.objCounter.get(argNm));
    },
    addCounterVuex(argNm) {
      this.$store.dispatch('addCount',[argNm,1]);
      console.log("addCounterVuex:"+argNm+":count="+this.$store.state.COUNTS[argNm]);
    },
  },
  mounted: function () {
    // jQuery
    console.log("this is " + this.myName + " mounted");
    $("#BUTJQ").on("click", function () {
      console.log("function by jquery on BUTJQ");
      alert("alert by JQ");
    });
    window.jq("#BUTJQMAIN").on("click", function () {
      console.log("function by jquery on BUTJQ MAIN");
      alert("alert by JQ MAIN");
    });
    // CSample
    let objSampleMounted = new CSample(this.myName, this.myTitle);
    console.log("local objSampleMounted.name:" + objSampleMounted.name);
    console.log("data this.objSampleLocal.name:" + this.objSampleLocal.name);
    console.log("data this.objSampleGlobal.name:" + this.objSampleGlobal.name);
    console.log("global window.objSampleGlobal.name:" + window.objSampleGlobal.name);
    // global objSampleGlobal
    //console.log("global objSampleGlobal.name:" + this.objSampleGlobal.name);
    // global class（NG）
    //let objLocalSampleGlobal = new CSampleGlobal('localSampleGlobal','');
    //console.log("local objLocalSampleGlobal.name:" + objLocalSampleGlobal.name);
    //
    console.log("store:"+this.$store);
    console.log("store.state:"+this.$store.state);
    // グローバル定数(mixins)
    console.log("consts of mixin this.FILE_NM_BUN_LIST:"+this.FILE_NM_BUN_LIST);
    // グローバル変数(mixinsは使えないと思われる：書き換えができない)
    console.log("this.$store.state.TABINDEXES:"+this.$store.state.TABINDEXES.length);
    console.log("this.$store.state.TABINDEXES['MenuForTest']:"+this.$store.state.TABINDEXES['MenuForTest']);
    console.log("this.$store.state.vars.login_id:before:"+this.$store.state.vars.login_id);
    // 修正できるか？
    this.$store.commit("vars/setLoginId","testing");
    console.log("this.$store.state.vars.login_id:after:"+this.$store.state.vars.login_id);
    // グローバルデータ
    //console.log("Entities:"+this.Entities);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/*
.card {
  text-align: left;
}
.card-text {
  font-size: 0.8rem;
  line-height: 1.2;
}
*/
</style>
