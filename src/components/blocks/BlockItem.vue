<template>
  <div class="BloclItem">
    <div class="cartjs_box" >
      <form name="product_form" method="post" action="https://ranastyle.shop-pro.jp/cart/proxy/basket/items/add" class="cartjs_product_form" style="width: 100%;margin: 0px;padding: 0;">
        <!-- 商品画像 -->
        <div class="cartjs_product_img">
          <img :src="item.image_url" style="width: 100%;" />
        </div>
        <!-- Product(商品名) -->
        <div class="cartjs_cart_in">
          <strong class="cartjs_product_name">{{item.name}}</strong>
        </div>
        <!-- 商品の説明 -->
        <div class="cartjs_product_explain">
          {{item.expl}}      
        </div>        
        <div class="cartjs_product_table">
          <table>
            <tr class="cartjs_sales_price">
              <th>販売価格</th>
              <td>
                <p class="cartjs_sales_price_main">{{item.sales_price_including_tax}}円</p>
                <p class="cartjs_sales_price_tax">(税{{item.sales_price_tax}}円)</p>
              </td>
            </tr>
            <!-- 売切れ時・休止時・ログイン限定購入商品は表示しない  -->
            <tr class="cartjs_product_num">            
              <th>購入数</th>
              <td><input type="text" name="product_num" value="1" class="cartjs_product_input_txt" /></td>
            </tr>
          </table>              
        </div>
        <div class="cartjs_cart_in">
          <input type="submit" value="カートに入れる" />
        </div>
        <!-- 特定商取引法リンク -->
        <div class="cartjs_sk_link_other">
          <a href="https://ranastyle.shop-pro.jp/?mode=sk">&raquo;&nbsp;特定商取引法に基づく表記</a>
        </div>
        <div class="cartjs_product_info">          
          <input type="hidden" name="members_hash" value="50bb364603c96e4a5d752b268e624da1">
          <input type="hidden" name="shop_id" value="PA01470457">    
          <input type="hidden" name="product_id" :value="item.id">    
          <input type="hidden" name="members_id" value="">    
          <input type="hidden" name="back_url" value="">    
          <input type="hidden" name="back_url_with_get" value="1">    
          <input type="hidden" name="reference_token" value="e64b2802faae45b09e430d068fdd8484">
        </div>  
      </form>    
    </div>
  </div>
</template>

<script>
export default {
  name: "BloclItem",
  data() {
    return {
    };
  },
  methods: {
  },
  props: {
    msg: String,
    item: Object,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.cartjs_box {
  margin: 0;padding: 20px 0;
}
.cartjs_product_img {
  width: 85%;
  margin: 0 auto 20px;
  padding: 0;
  text-align: center;
}
.cartjs_cart_in {
  width: 80%;
  text-align: center;
  margin: 0 auto 20px;
}
.cartjs_product_name {
  padding: 0;
  font-size: 20px;
}
.cartjs_product_explain {
  width: 80%;
  text-align: center;
  margin: 0 auto 20px;
  line-height: 1.6;
}
.cartjs_product_table > table {
  border: none;
  width: 80%;
  font-weight: normal;
  margin: 0 auto 15px;
  text-align: center;
}
.cartjs_sales_price > td {
  padding: 0;
}
.cartjs_sales_price_main {
  font-weight: bold;
  font-size: 18px;
  margin: 0 auto 5px;
}
.cartjs_sales_price_sub {
  font-weight: normal;
  font-size: 14px;
  margin: 0 auto 10px;
}
.cartjs_product_num {
  font-weight: normal;
  padding-bottom: 10px;
}
.cartjs_product_num .cartjs_product_input_txt {
  width: 50px;
  padding: 4px 6px;
  text-align: right;
}
.cartjs_cart_in > input {
  background-color: #555555;
  text-align: center;
  border-radius: 6px;
  height: 40px;
  width: 80%;
  color: #fff;
  font-size: 16px;
  border: 0;
  cursor: pointer;
}
.cartjs_sk_link_other {
  width: 80%;
  margin: 0 auto 5px;
  text-align: left;
  font-size: 12px;
}
</style>
