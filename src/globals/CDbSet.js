// クラス定義(モジュールの公開クラス)
// Dexie を拡張する形を取った
// 使用時は
//    import { CDbSet } from "@/globals/CDbSet.js";
//    let objDb = new CDbSet('dbname');
import Dexie from "dexie";

export class CDbSet extends Dexie {
  // コンストラクタ
  constructor(argDbName,argVersion=1) {
    // DB名
    super(argDbName);
    // テーブル
    this.defStore(argVersion);
  }

  // defStore
  // ここに使用するテーブルを定義していく
  defStore(argVersion) {
    // conf
    this.version(argVersion).stores({
      conf: '++id, name, value1, value2, udt',
    });
    // count
    this.version(argVersion).stores({
      count: 'name, counter, udt',
    });
  }

  // addCount
  async addCount(argName) {
    let newCount = 1;
    const w = await this.count.get(argName);
    if ( !w ) {
      // 存在しなければ追加
      console.log("addCount name:"+argName+" obj:",w);
      this.count.add({name: argName, counter: newCount});
    } else {
      // 存在していれば加算
      if ( Number.isNaN(w.counter) ) {
        this.count.put({name: argName, counter: newCount});
      } else {
        newCount = w.counter + 1;
        this.count.put({name: argName, counter: newCount});
      }
    }
    return newCount;
  }
  // getCount
  async getCount(argName) {
    let curCount = 0;
    const w = await this.count.get(argName);
    if ( !w ) {
      // 存在しなければ追加
      this.count.add({name: argName, counter: curCount});
    } else {
      // 存在していれば値を
      if ( Number.isNaN(w.counter) ) {
        this.count.put({name: argName, counter: curCount});
      } else {
        curCount = w.counter;
      }
    }
    return curCount;
  }
}
