// クラス定義(モジュールの公開クラス)
//  使用時は
//    import { CSample } from "@/components/themes/CSample.js";
//    let sample = new CSample('myName','myTitle');
export class CSample {
  // コンストラクタ
  constructor(name, title) {
    this._name = name;
    this._title = title;
  }
  // メソッド
  toString() {
    return this._name + ":" + this._title;
  }
  // ゲッター(変数直接ではなくメソッド経由とする)
  //  使用(プロパティ扱いで)
  //    let myName = sample.name;
  get name() {
    return this._name;
  }
  get title() {
    return this._title;
  }
  // セッター(変数直接ではなくメソッド経由とする)
  //  使用(プロパティ扱いで)
  //    sample.name = "yourName";
  set name(argName) {
    this._name = argName;
  }
  set title(argTitle) {
    this.__titlename = argTitle;
  }
  // クラス定数（staticなgetを利用する）
  //  使用
  //    let myProjectNm = CSample.projectName;
  static get projectName() {
    return "Vue Sample Project";
  }
  // 静的メソッド
  //  使用
  //    let myProjectNm = CSample.getSquareArea(5,10);
  static getSquareArea(argBase, argHeight) {
    return argBase * argHeight;
  }
}
