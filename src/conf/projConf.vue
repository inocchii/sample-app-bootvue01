/* { "title": "testOnsenAndVue", "baseURL": "localhost" } */ //
Object.freezeを使用しないと外部で値を書き換えることが出来る //
Object.freezeはネストしたオブジェクトまで見ないので、Objectの中でObjectを宣言する場合、宣言するObjectにもObject.freezeをつける
export default Object.freeze({ myName: "testOnsenAndVue", myURL: "localhost",
});
