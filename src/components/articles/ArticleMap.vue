<template>
  <div class="Article">
    <!-- 記事 -->
    <div class="card w-100">
      <div class="card-header">地図について</div>
      <div class="card-body">
        <div class="card-text">
          <p>内容</p>
          <ul>
            <li>GoogleMap使用準備</li>
            <li>画面表示(基本パターン)</li>
            <li>画面表示(Vueコンポーネントでの表示)</li>
            <li>JavaScriptでMapを操作する</li>
            <li>(備忘)Googleアカウント関連</li>
          </ul>
          <p>参考サイト</p>
          <ul>
            <li><a target="_blank" rel="noopener noreferrer" href='https://www.javadrive.jp/google-maps-javascript/'>Google Maps JavaScript API入門</a></li>
            <li><a target="_blank" rel="noopener noreferrer" href='https://developers.google.com/maps/gmp-get-started?hl=ja'>Google Maps Platform スタートガイド</a></li>
            <li><a target="_blank" rel="noopener noreferrer" href='https://reffect.co.jp/vue/google-map-vue'>ライブラリなしでGoogle MapをVue.jsで使う方法</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">GoogleMap使用準備</div>
      <div class="card-body">
        <div class="card-text">
          <ol>
            <li>アカウントの作成</li>
            <li>プロジェクトの作成</li>
            <li>API または SDK を 有効にする</li>
            <li>API キーを取得</li>
          </ol>
          <h2>アカウントの作成</h2>
          <h2>プロジェクトの作成</h2>
          <h2>API または SDK を 有効にする</h2>
          <h2>API キーを取得</h2>
          <div class="link"><a href=""></a></div>
          <div class="note">AIzaSyDqudlaKZ8uBB-QAc16oQTIhAxVbw0eeHw</div>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">画面表示(基本パターン)</div>
      <div class="card-body">
        <div class="card-text">
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">画面表示(Vueコンポーネントでの表示)</div>
      <div class="card-body">
        <div class="card-text">
          <div class="summary">
            Vue.jsでは・・<br/>
            <br/>index.htmlやApp.vueに記述すると、
            <br/>GoogleMapが利用されていないページにアクセスしても
            <br/>GoogleMapのライブラリをダウンロードすることになる。
            <br/>マップを表示するコンポーネントのみ
            <br/>Google Mapのライブラリをダウンロードできるように
            <br/>ページに動的にscriptタブを追加する方法をとる。
          </div>
          <!-- Google Map -->
          <div ref="map" style="height:500px;width:400px;"></div>
          <div>{{myLatLng}}</div>
          <!-- Mapを操作 -->
          <h4>select で 地点 を変えて表示</h4>
          <div class="input">
            <select v-model="myPoint" @change="changePoint()" style='width: 100px;'>
              <option v-for="point in points" :key=point.id
               :value=point>{{point.name}}</option>
            </select><br/>
            <div class="note" v-if=(myPoint)>
              地点(中心)：{{myPoint.latLng.lat}} & {{myPoint.latLng.lng}}
            </div>
          </div>
          <h4>複数地点にマーカーを表示</h4>
          <p style="text-align: center;">
            <button @click="dispMarkerAllOn();">マーカー表示</button>
            <button @click="dispMarkerAllInfo();">吹き出し</button>
            <button @click="dispMarkerAllOff();">マーカー消去</button>
          </p>
          <h4>スライダー で Zoom を変える</h4>
          <h4>radio で Marker を変える</h4>
          <h4>checkbox で 表示カテゴリ を変える</h4>
          <h4>自身のロケーションを反映</h4>
          <h4>地点間の距離を取得する</h4>
          <h4>地図操作が終わったら</h4>
          <div class="note">地図の表示エリアを取得<br/>
              地点(中心)：{{myLatLng}}<br/>
              表示エリア：{{myAreaSW}} - {{myAreaNE}}
          </div>
          <div class="note">エリア内のマーカーを取得</div>
          <h4>マーカークリックで表示を変える</h4>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">JavaScriptで操作する</div>
      <div class="card-body">
        <div class="card-text">
          <div class="link">
            <a target="_blank" rel="noopener noreferrer" href="https://qiita.com/YutaSaito1991/items/ec0c089d354ec9b8a7e0">Google Maps APIの使い方</a>
            <!-- <router-link :to="getOuterPath('/outer', '参考サイト', 'https://qiita.com/YutaSaito1991/items/ec0c089d354ec9b8a7e0')">
              Google Maps APIの使い方
            </router-link> -->
          </div>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">(備忘)Googleアカウント関連</div>
      <div class="card-body">
        <div class="card-text">
          <h2>Google Cloud Platform</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleLogin",

  mounted: function() {
    //
    // mixinsの設定内容をdata(){}の値に設定
    //  ※本来はdata(){}に直接セットしたいが..
    //
    this.points = this.OUR_MAPS;
    this.myLatLng = this.points[0].latLng;
    //
    // Google Map for Vue component
    //  ※scriptタグを動的に追加
    //
    // windowオブジェクトにmapLoadStartedという変数を設定し、
    // 複数のscriptタグを追加しないように制御
    if ( !window.mapLoadStarted ) {
      window.mapLoadStarted = true;
      // scriptタグを追加
      let script = document.createElement('script');
      // Google Map APIを読み込む
      //script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDqudlaKZ8uBB-QAc16oQTIhAxVbw0eeHw';
      script.src = 'https://maps.googleapis.com/maps/api/js?key='+this.googleMapApiKey+'&callback=initMap';
      script.async = true;
      document.head.appendChild(script);
    }
    // mapLoadStartedを開始済みに
    //  ※ initMap はGoogle Map API 読み込み時のcallbackで指定
    window.initMap = () => {
      window.mapLoaded = true;
    }
    // Google Mapのロード完了を確認する
    //  ※ setInterval でタイマーを回してロード完了を待たせている
    let timer = setInterval(() => {
      if( window.mapLoaded ) {
        clearInterval(timer);
        // 地図オブジェクトを生成し,画面の map エリアに配置
        this.myMap = new window.google.maps.Map(this.$refs.map, {
          center: this.myLatLng,
          zoom: this.myZoom,
        });
        // マーカーオブジェクト
        let marker = new window.google.maps.Marker({position:this.myLatLng,map:this.myMap});
        // 後から操作できるようにマーカーオブジェクトを配列に格納
        this.myMarkers.push(marker);

        // Google Map オブジェクトのイベントリスナーを登録
        // 【地図操作後】idle イベント -> idleMapメソッドへ
        this.myMap.addListener('idle', () => {
          this.mapIdle(this.myMap);
        });
      }
    },500)
  },
  data() {
    return {
      // Google Map for Vue component
      myMap: '',
      //myLatLng: {lat: 31.795389755547117, lng: 131.4236498512721},
      myLatLng: {lat: 0, lng: 0},
      myBounds: null,
      myAreaSW: {lat: 0, lng: 0},
      myAreaNE: {lat: 0, lng: 0},
      myZoom: 12,
      myPoint: null,
      myMarkers: [],
      points: null, // mixins maps.js OUR_MAPSに定義 mountedでセット
      /*
      points: [
        {
          id: 'kibana',
          latLng: {lat: 31.82706, lng: 131.42872},
          name: 'kibana',
          info: 'お家',
        },
        {
          id: 'aoshima',
          latLng: {lat: 31.80247993451021, lng: 131.46499011398092},
          name: 'aoshima',
          info: '青島',
        },
      ],
      */
    };
  },
  computed: {},
  methods: {
    /* mapIdle: ユーザがmapを操作した後 */
    mapIdle(argMap) {
      // 中心
      this.myLatLng = argMap.getCenter();
      // 境界
      this.myBounds = argMap.getBounds();
      // 左下(South West)
      this.myAreaSW = this.myBounds.getSouthWest();
      // 右上(North East)
      this.myAreaNE = this.myBounds.getNorthEast();
    },
    /* changePoint: mapを指定位置に移動 */
    changePoint() {
      this.myLatLng = this.myPoint.latLng;
      this.myMap.panTo(new window.google.maps.LatLng(this.myLatLng.lat,this.myLatLng.lng));
      let marker = new window.google.maps.Marker({
        position: this.myLatLng,
        map: this.myMap,
      });
      this.myMarkers.push(marker);
    },
    /* dispMarkerAllOn: 全ての地点にマーカー表示 */
    dispMarkerAllOn() {
      for ( let point of this.points ) {
        let marker = new window.google.maps.Marker({
          //position: {lat: point.latLng.lat, lng: point.latLng.lng},
          position: point.latLng,
          map: this.myMap,
        });
        this.myMarkers.push(marker);
      }
    },
    /* dispMarkerAllInfo: 吹き出し表示 */
    dispMarkerAllInfo() {
      this.dispMarkerAllOff();
      for ( let point of this.points ) {
        let marker = new window.google.maps.Marker({
          //position: {lat: point.latLng.lat, lng: point.latLng.lng},
          position: point.latLng,
          map: this.myMap,
        });
        this.myMarkers.push(marker);
        let info = new window.google.maps.InfoWindow({
          content: point.info
        });
        info.open(this.myMap,marker);
      }
    },
    /* dispMarkerAllOff: 全てのマーカーを削除 */
    dispMarkerAllOff() {
      for ( let marker of this.myMarkers ) {
        console.log(marker);
        marker.setMap(null);
      }
      this.myMarkers = [];
    }
  },
  props: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
