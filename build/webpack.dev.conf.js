const base = require('./webpack.base.conf.js');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const config = merge(base, {
    // 相当于
    //  plugins: [
    //    new webpack.NamedModulesPlugin(), 当开启 HMR(Hot Module Replacement) 的时候使用该插件会显示模块的相对路径，建议用于开发环境。 在热加载时直接返回更新文件名，而不是文件的id。
    //    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
    //  ]
    mode: 'development',
    devtool: 'inline-source-map',
    optimization: {
        minimize: false,
    },
    performance: {
        hints: false,
    },
    output: {
        publicPath: '/',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            favicon : './public/favicon.ico',
            filename : 'index.html',
            inject: true,
            hash: false
        }),
        new webpack.HotModuleReplacementPlugin() // 热更新 webpack内置
    ],
    devServer: {
        port: '8080',
        host:'localhost',
        headers: {
            'X-foo': '112233'
        },
        // 该属性是一个布尔型的值，默认为false，当他为true的时候，它会对所有服务器资源采用gzip进行压缩。
        compress: true,
        // 用来应对返回404页面时定向跳转到特定页面的  可正则匹配
        historyApiFallback: true,
        //该配置项是指模块替换换功能，DevServer 默认行为是在发现源代码被更新后通过自动刷新整个页面来做到实时预览的，
        // 但是开启模块热替换功能后，它是通过在不刷新整个页面的情况下通过使用新模块替换旧模块来做到实时预览的。
        hot: true,
        // 通常为true
        inline : true,
        // 该属性是用来在编译出错的时候，在浏览器页面上显示错误
        overlay : true,
        // 该属性配置是用来在编译的时候再命令行中输出的内容
        stats : 'normal',
        https: false,
        noInfo: true,
        //该属性用于DevServer启动且第一次构建完成时，自动使用我们的系统默认浏览器去打开网页。
        open: true,
        // proxy 实现跨域
        proxy: {}
    }
});


module.exports = config;

// 1.url-loader 允许你有条件地将文件转换为内联的 base-64 URL (当文件小于给定的阈值)，这会减少小文件的 HTTP 请求数。如果文件大于该阈值，会自动的交给 file-loader 处理。
// 2.file-loader 可以指定要复制和放置资源文件的位置，以及如何使用版本哈希命名以获得更好的缓存。此外，这意味着 你可以就近管理图片文件，可以使用相对路径而不用担心部署时 URL 的问题。使用正确的配置，webpack 将会在打包输出中自动重写文件路径为正确的 URL。
