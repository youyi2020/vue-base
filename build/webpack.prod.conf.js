const base = require('./webpack.base.conf.js');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path');

// optimization中配置runtimeChunk和splitChunks 代替了commonchunk
const config = merge(base, {
    mode: 'production',
    optimization: {
        // minimize: true,  // 相当于UglifyJsPlugin
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true 
            }),
            new OptimizeCssAssetsPlugin({
                cssProcessor: require('cssnano'), //引入cssnano配置压缩选项
                cssProcessorPluginOptions: {
                  preset: ['default', { discardComments: { removeAll: true } }],
                },
                canPrint: false, //是否将插件信息打印到控制台
                cssProcessorOptions: {safe: false}
            }),
        ],
        
    },
    // 开发模式下 打包的静态资源放在根目录下创建的publicPath路径下 publicPath需为/开头的目录
    // 生产模式 打包的静态资源在output->path下面 在静态资源路径前面加上publicPath的值 cdn时候使用 只关注生产模式即可
    output: {
        publicPath: './',
    },
    plugins: [
        new CleanWebpackPlugin(['dist'],{
            root: path.resolve(__dirname, '../'),
        }),
        new HtmlWebpackPlugin({
            template : './index.html',
            favicon : './favicon.ico',
            filename : 'index.html',
            inject: true,
            hash:true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
        })
    ],
});


module.exports = config;