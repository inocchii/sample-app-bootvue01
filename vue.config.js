module.exports = {
  publicPath: "./",
  // 2021.06.04
  /*
  devServer: {
    proxy: 'http://localhost'
  },
  */  
  // 2021.06.17 OK Vue側：/shop-api/v1/
  //    /shop-api/ を / にRewrite
  devServer: {
    proxy: {
      "^/shop-api/": {
        target: 'https://api.shop-pro.jp',
        logLevel: 'debug',
        pathRewrite: { "^/shop-api/": "/" }
      }
    }
  },
  // 2021.06.17 OK Vue側：/v1/
  /*
  devServer: {
    proxy: 'https://api.shop-pro.jp',
  },
  */
};
