// クラス定義(モジュールの公開クラス)
//  使用時は
//    import { CCounter } from "@/globals/CCounter.js";
//    let counter = new CCounter();
export class CCounter {
  // コンストラクタ
  constructor() {
    this._counter = [];
  }
  // get
  get(argNm) {
    if ( this._counter[argNm] ) {
      return this._counter[argNm];
    }
    return 0;
  }
  // set
  set(argNm,argCnt) {
    this._counter[argNm] = argCnt;
    // 配列更新をリアクティブに反映させるため検知対象のsplice()を実施
    this._counter.splice();
  }
  // add
  add(argNm,argNum=1) {
    if ( this._counter[argNm] ) {
      this._counter[argNm] = this._counter[argNm] + argNum;
    } else {
      this._counter[argNm] = argNum;
    }
    this._counter.splice();
  }
}
