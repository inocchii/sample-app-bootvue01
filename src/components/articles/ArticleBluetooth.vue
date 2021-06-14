<template>
  <div class="Article">
    <!-- 記事 -->
    <div class="card w-100">
      <div class="card-header">Bluetoothで周辺機器とつなぐ</div>
      <div class="card-body">
        <div class="card-text">
          <p>内容</p>
          <ul>
            <li>参考サイト</li>
            <li>基礎知識</li>
            <li>bluejelly.jsを使って動かしてみる</li>
            <li>Web Bluetooth API</li>
          </ul>
          <p>参考サイト</p>
          <ul>
            <li><a target="_blank" rel="noopener noreferrer" href='https://qiita.com/ElectricBaka/items/0a319be20874a6817ed0'>HTMLとJavaScriptだけでBLE通信できるのか？</a></li>
            <li><a target="_blank" rel="noopener noreferrer" href='https://jellyware.jp/kuragemd/bluejelly/ble_guide.html'>開発視点の超簡単BLE入門</a></li>
            <li><a target="_blank" rel="noopener noreferrer" href='https://jellyware.jp/kuragemd/bluejelly/getting_started.html'>BlueJellyって何だよ！</a></li>
            <li><a target="_blank" rel="noopener noreferrer" href='https://tech.drecom.co.jp/ac2020-frontend-ble/'>WebフロントエンドエンジニアがBluetooth使うときに知っておきたいこと</a></li>
          </ul>
          <h2>基礎知識</h2>
          <ul>
            <li>
              <h4>基本的な流れ</h4>
              <ol>
                <li>Browser から機器の Device 情報を取得する</li>
                <li>Device の GATT Server に接続する</li>
                <li>GATT Server から Service を取得する</li>
                <li>Service から Characteristic を取得する</li>
                <li>Characteristic を利用する<br/>(Read,Write,Notify..)</li>
              </ol>
            </li>
            <li>
              <h4>用語</h4>
            </li>
            <li>
              <h4>概要図</h4>
              <img src="img/others/bluetooth.png" />
            </li>
          </ul>
          <h2>bluejelly.jsを使って動かしてみる</h2>
          <p>ライブラリの作りが古いためか、Vue.js上では上手く動作せず</p>
          <code>importはOK、new出来ない</code>
          <h2>Web Bluetooth API</h2>
          <h3>スキャン</h3>
<pre><code>
  const SERVICE_UUID_START = 0x1800;
  const SERVICE_UUID_END = 0xffff;
  if ("bluetooth" in window.navigator) {
    console.log("scan bluetooth in window.navigator");
    // すべての device 取得
    //const device = await (window.navigator["bluetooth"] as any).requestDevice({
    const device = await (window.navigator["bluetooth"]).requestDevice({
        acceptAllDevices: true,
        // 今までアクセスしたことのない service を参照するには
        // ここで ServiceUUID を指定しなければいけない
        optionalServices: Array(SERVICE_UUID_END - SERVICE_UUID_START)
            .fill(0)
            .map((_, i) => (SERVICE_UUID_START + i)),
    });
    console.log("scan device:"+device);
    // GATT Server に接続
    const server = await device.gatt.connect();
    console.log("scan device.gatt.connect() server:"+server);
    // GATT Server から Service の情報をすべて取得
    const services = await server.getPrimaryServices();
    console.log("scan server.getPrimaryServices() services:"+services);
    //const dataList = await Promise.all(services.map(async (v: any)=> ({
    const dataList = await Promise.all(services.map(async (v)=> ({
        service: v,
        // Service から Characteristic の情報をすべて取得
        characteristics: await v.getCharacteristics(),
    })));
    console.log(dataList);
  }
</code></pre>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">スキャンしてみる</div>
      <div class="card-body">
        <div class="card-text">
          <h2>周辺機器をスキャンしてみる</h2>
          <button class="button" @click="scan">スキャン</button><br/>
          objDevice:{{objDevice}}<br/>
          objServer:{{objServer}}<br/>
          objServices:{{objServices}}<br/>
          dataList:{{dataList}}<br/>
          <h3>WI-C310</h3>
<pre><code>
BluetoothDevice id: "HpkS9aEvKRKbZn9E7Gz2Dw=="
name: "WI-C310"
gatt: BluetoothRemoteGATTServer
</code></pre>
          <h3>不明</h3>
<pre><code>
device: BluetoothDevice {id: "2E6JpwgkVzvWwJOQ1/3BCQ==", name: null, gatt: BluetoothRemoteGATTServer, ongattserverdisconnected: null, watchingAdvertisements: false, …}
isPrimary: true
uuid: "0000180a-0000-1000-8000-00805f9b34fb"
</code></pre>
          <h3>不明</h3>
<pre><code>
device: BluetoothDevice {id: "9kqqIimw74S/HhBmI0tl4g==", name: null, gatt: BluetoothRemoteGATTServer, ongattserverdisconnected: null, watchingAdvertisements: false, …}
isPrimary: true
uuid: "00001805-0000-1000-8000-00805f9b34fb"
</code></pre>
        </div>
      </div>
    </div>
    <div class="card w-100">
      <div class="card-header">エラー履歴</div>
      <div class="card-body">
        <div class="card-text">
          <h2>Unsupported device</h2>
          <p>iPhone/WI-C310を指定したところ、共に下記エラー</p>
<pre><code>
[Vue warn]: Error in v-on handler (Promise/async): 
  "NetworkError: Unsupported device."
DOMException: Unsupported device.
</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import BlueJelly from  '@/lib/bluejelly.js';
export default {
  name: "ArticleBluetooth",
  mounted: function() {
    /* bluejelly NG
    console.log("mounted new objBle");
    this.objBle = BlueJelly;
    //this.objBle = new BlueJelly();
    console.log("mounted new objBle success? objBle:"+this.objBle);
    //
    this.objBle.setUUID("UUID1",   "00000000-0000-0000-0000-000000000000", "00000000-0000-0000-0000-000000000000");
    this.objBle.onScan = function (deviceName) {
      this.deviceName = deviceName;
    };
    */
  },
  data() {
    return {
      /* bluejelly NG
      objBle: null,
      deviceName: '',
      */
      objDevice: null,
      objServer: null,
      objServices: null,
      dataList: null,
    };
  },
  computed: {},
  methods: {
    async scan() {
      /* bluejelly NG
      this.objBle.scan('UUID1');
      */
      const SERVICE_UUID_START = 0x1800;
      const SERVICE_UUID_END = 0xffff;
      if ("bluetooth" in window.navigator) {
        console.log("scan bluetooth in window.navigator");
        // すべての device 取得
        //const device = await (window.navigator["bluetooth"] as any).requestDevice({
        this.objDevice = await (window.navigator["bluetooth"]).requestDevice({
            acceptAllDevices: true,
            // 今までアクセスしたことのない service を参照するには
            // ここで ServiceUUID を指定しなければいけない
            optionalServices: Array(SERVICE_UUID_END - SERVICE_UUID_START)
                .fill(0)
                .map((_, i) => (SERVICE_UUID_START + i)),
        });
        console.log("scan device:"+this.objDevice);
        console.log(this.objDevice);
        // GATT Server に接続
        this.objServer = await this.objDevice.gatt.connect();
        console.log("scan device.gatt.connect() server:"+this.objServer);
        console.log(this.objServer);
        // GATT Server から Service の情報をすべて取得
        this.objServices = await this.objServer.getPrimaryServices();
        console.log("scan server.getPrimaryServices() services:"+this.objServices);
        console.log(this.objServices);
        //const dataList = await Promise.all(services.map(async (v: any)=> ({
        this.dataList = await Promise.all(this.objServices.map(async (v)=> ({
            service: v,
            // Service から Characteristic の情報をすべて取得
            characteristics: await v.getCharacteristics(),
        })));
        console.log("scan services detail:"+this.dataList);
        console.log(this.dataList);
      }
    },
  },
  props: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
