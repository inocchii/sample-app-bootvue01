// 共通設定ファイル(vue)
import conf from "@/conf/projConf";
// 共通設定ファイル(JSON)
//const common = require('/src/mixins/common.json');

export default {
  data() {
    return {
      conf: conf, // 共通設定ファイルより
      //serverPass: "https://localhost:10443/",    // サーバーサイドのパスを定義
    };
  },
  /*
    created() {
        if ( this.$store ) {
            console.log('start! from mixins. testFlg='+this.$store.state.testFlg )    // 起動後必ずログが出力される
        } else {
            console.log('start! from mixins. $store not yet' )    // 起動後必ずログが出力される
        }
    },
 
    methods: {
        logging: function(argMsg='') {
            console.log('log msg='+argMsg)
        },
    },
 
    computed: {
        twoBytwo() {
            return 2 * 2
        },
    }
    */
};
