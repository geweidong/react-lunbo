var webpack = require('webpack');
module.exports = {
  devtool: 'eval-source-map',//配置生成Source Maps，选择合适的选项
  entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件
  output: {
    path: __dirname + "/public",//打包后的文件存放的地方
    filename: "bundle.js",//打包后输出文件的文件名
  },

  module: {//在配置文件里添加JSON loader
    loaders: [
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules'//添加对样式表的处理  感叹号的作用在于使同一文件能够使用不同类型的loader  
        //?modules 这样做只对当前组件有效，不必担心在不同的模块中具有相同的类名可能会造成的问题
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader?limit=40000&name=img/[hash:8].[name].[ext]',
      },
    ]
  },

  plugins: [
	new webpack.DefinePlugin({
		'process.env.NODE.ENV':"development"
	}),
  	new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    contentBase: "./public",//本地服务器所加载的页面所在的目录
    // colors: true,//终端中输出结果为彩色
    historyApiFallback: true,//不跳转
    inline: true,//实时刷新
    // progress:true
  }



}