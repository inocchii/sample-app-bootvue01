<template>
  <div class="Themes">
    <div class="">ネットワーク関連</div>
    <div class="card w-100">
      <div class="card-header">ネットワーク状況の判定</div>
      <div class="card-body">
        <div class="card-text">
          <h2>概要</h2>
          <div class="link">参考：
            <router-link :to="getPath('/outer','On/OffLineの判定','https://www.html5rocks.com/en/mobile/workingoffthegrid/')">Working Off the Grid with HTML5 Offline</router-link>
          </div>
          <h2>window.navigator.onLineで判定</h2>
          <div class="note">
            ブラウザの接続状態を返す。このプロパティの実装は、ブラウザにより異なる。
            <br/>このページの立ち上がりでの状態：{{wasOnLine}}
            <br/>現在：<code>window.navigator.onLine：</code>{{isOnLine}}
            <br/><button @click="checkOnLine">チェック</button>：{{checkedOnLine}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "xxx",
  data() {
    return {
      myName: "ThemesNetwork.vue",
      wasOnLine: false,
      checkedOnLine: false,
    };
  },
  props: {
    msg: String,
  },
  mounted: function () {
    console.log("this is " + this.myName + " mounted");
    this.wasOnLine = window.navigator.onLine;
    console.log("at mounted window.navigator.onLine:"+this.wasOnLine);
  },
  computed: {
    isOnLine() {
      console.log("isOnLine window.navigator.onLine:"+window.navigator.onLine);
      return window.navigator.onLine;
    },
  },
  methods: {
    checkOnLine() {
      this.checkedOnLine = window.navigator.onLine;
      console.log("checkOnLine window.navigator.onLine:"+this.checkedOnLine);
      return this.checkedOnLine;
    },
    getPath(argBase, argTitle, argOuterUrl) {
      console.log(
        "Outer base=" + argBase + " title=" + argTitle + " url=" + argOuterUrl
      );
      return (
        argBase + "?title=" + argTitle + "&url=" + argOuterUrl + "&backPath=/"
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
