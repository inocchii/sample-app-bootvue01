<template>
  <div class="Article">
    <!-- 記事 -->
    <div class="card w-100">
      <div class="card-header">決済サービスの検討</div>
      <div class="card-body">
        <div class="card-text">
          <h2>決済サービスの種類</h2>
          <div class="note">
            ・アプリから直接利用できるのか？<br/>
            ・サーバ経由で利用となるのか？<br/>
            ・維持費はどのようになるのか？<br/>
            ・手数料はどうか？<br/>
            ・バリエーションは？
          </div>
          <table class="table table-striped table-bordered table-sm"> 
            <thead>
              <tr><th scope="col">サービス名</th><th scope="col">特徴</th><th scope="col">備考</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>PayPal</td>
                <td>PayPal エクスプレスチェックアウト</td>
                <td>初期費用：無料<br/>月額費用：0円<br/>決済手数料：1件につき2.4％＋40円</td>
              </tr><tr>
                <td>PAY.JP</td>
                <td>BASEが別サービスとして開始</td>
                <td>初期費用：無料<br/>月額費用：0円〜<br/>決済手数料：1件につき2.59％〜</td>
              </tr><tr>
                <td>Stripe</td>
                <td>サンフランシスコ発の決済サービス</td>
                <td>初期費用：無料<br/>月額費用：0円<br/>決済手数料：1件につき3.6％ </td>
              </tr><tr>
                <td>KOMOJU</td>
                <td></td>
                <td></td>
              </tr><tr>
                <td>Omise</td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- 記事 -->
    <div class="card w-100">
      <div class="card-header">APIの例</div>
      <div class="card-body">
        <div class="card-text">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticlePayment",
  data() {
    return {};
  },
  /*
  mounted: function(){
    var v = this;
  },
  */
  computed: {},
  methods: {},
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
