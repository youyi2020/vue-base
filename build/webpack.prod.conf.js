const base = require('./webpack.base.conf.js');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

// optimization中配置runtimeChunk和splitChunks 代替了commonchunk
const config = merge(base, {
    // 相当于
    // plugins: [
    //         uglifyJsPlugin 用来对js文件进行压缩，从而减小js文件的大小，加速load速度。
    //         uglifyJsPlugin会拖慢webpack的编译速度，所有建议在开发简单将其关闭，部署的时候
    //     new UglifyJsPlugin()
    //
    //     new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
    //         Scope Hoisting-作用域提升,webpack2处理后的每个模块均被一个函数包裹
    //         这样会带来一个问题：降低浏览器中JS执行效率，这主要是闭包函数降低了JS引擎解析速度。
    //         于是webpack团队参考Closure Compiler和Rollup JS，将一些有联系的模块，放到一个闭包函数里面去
    //         通过减少闭包函数数量从而加快JS的执行速度。  concatenation : 一系列互相关联的事物;
    //     new webpack.optimize.ModuleConcatenationPlugin(),
    //         在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误。对于所有资源，统计资料(stat)的 emitted 标识都是 false。
    //     new webpack.NoEmitOnErrorsPlugin()
    // ]
    mode: 'production',
    stats : 'normal',
    performance: {
        hints: 'warning'
    },
    optimization: {
        // minimize: true,  // 相当于UglifyJsPlugin
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true 
            }),
            new OptimizeCssAssetsPlugin({  // 用于优化或者压缩CSS资源
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
            template : './public/index.html',
            favicon : './public/favicon.ico',
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