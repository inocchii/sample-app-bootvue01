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
      <div class="card-body"><div class="card-text"></div></div>
    </div>
    <div class="card w-100">
      <div class="card-header">共通変数/定数の持たせ方(Mixin)</div>
      <div class="card-body"><div class="card-text"></div></div>
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
    };
  },
  props: {
    msg: String,
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
    let objSample = new CSample(this.myName, this.myTitle);
    console.log(
      "function by CSample name:" + objSample.name + " title:" + objSample.title
    );
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
