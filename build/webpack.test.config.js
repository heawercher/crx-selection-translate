const path = require( 'path' ) ,
  webpack = require( 'webpack' ) ,
  config = require( './webpack.base.config' );

config.entry = {}; // 清空 entry
config.devtool = '#inline-source-map';

const babelLoaderConfig = config.module.loaders.shift();
babelLoaderConfig.exclude.push( path.resolve( 'src/' ) );

config.module.preLoaders = [
  babelLoaderConfig ,
  {
    test : /\.js$/ ,
    include : path.resolve( 'src/' ) ,
    loader : 'isparta'
  }
];

// 必须告诉 isparta 我使用了哪些 babel 设置，见 https://github.com/deepsweet/isparta-loader/issues/10
config.isparta = {
  embedSource : true ,
  noAutoWrap : true ,
  babel : babelLoaderConfig.query
};

config.plugins.splice( 0 , 3 ); // 清空 webpack 优化
config.plugins.push( new webpack.DefinePlugin( { // 切换为测试环境
  'process.env.NODE_ENV' : "'testing'"
} ) );

module.exports = config;
