const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');
const devMode = process.env.NODE_ENV !=='production';
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, '../'),
    performance: {
        hints: 'warning'
    },
    entry: {
        app : './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].[hash:8].js'
    },
    resolve: { // 解析
        extensions: ['.vue', '.js', '.json'],
        alias:{
            'vue$': 'vue/dist/vue.esm.js',  //可以在给定对象的键后的末尾添加 $，以表示精准匹配：
            '@': path.resolve(__dirname,'../src'),
        }
    },
    node: {
        setImmediate: false,
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },
    module: {
        // babel-loader 的编译速度很慢 不仅要指定exclude 还要指定include
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: [
                    path.resolve(__dirname, "../src"),
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.(png|jpe?g|gif|svg|mp4|webm|ogg|mp3|wav|flac|aac|woff2?|eot|ttf|otf)$/,
                loader: 'url-loader',
            },
            {
                test: /\.css$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader',

                ]
            },
        ]
    },
    // [ˌɒptɪmaɪ'zeɪʃən]
    optimization:{
        // 优化持久化缓存的, runtime 指的是 webpack 的运行环境(具体作用就是模块解析, 加载) 和 模块信息清单,
        // 模块信息清单在每次有模块变更(hash 变更)时都会变更, 所以我们想把这部分代码单独打包出来, 配合后端缓存策略,
        // 这样就不会因为某个模块的变更导致包含模块信息的模块(通常会被包含在最后一个 bundle 中)缓存失效.
        //optimization.runtimeChunk 就是告诉 webpack 是否要把这部分单独打包出来.
        runtimeChunk:{
            name:'./runtime'
        },
        // chunks: 表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
        // minSize: 表示在压缩前的最小模块大小，默认为0；
        // minChunks: 表示被引用次数，默认为1；
        // maxAsyncRequests: 最大的按需(异步)加载次数，默认为1；
        // maxInitialRequests: 最大的初始化加载次数，默认为1；
        // name: 拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成；
        // cacheGroups: 缓存组。
        splitChunks:{
            // 避免过度分割，设置尺寸不小于30kb,cacheGroups会继承这个值
            minSize:30000,
            // priority: 表示缓存的优先级；
            // test: 缓存组的规则，表示符合条件的的放入当前缓存组，值可以是function、boolean、string、RegExp，默认为空；
            // reuseExistingChunk: 表示可以使用已经存在的块，即如果满足条件的块已经存在就使用已有的，不再创建一个新的块。
            cacheGroups:{
                vendors:{
                    test: /node_modules/,   // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    name: 'vendor',  // 打包后的文件名，任意命名
                    // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                    priority: 10
                },
                //业务中可复用的js
                commons:{
                    test: /src/,   // 指定是node_modules下的第三方包
                    chunks: "initial",
                    name: "common", // 打包后的文件名，任意命名
                    minChunks: 2,//最小引用2次
                    minSize: 0 // 只要超出0字节就生成一个新包
                }

            }
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        // DefinePlugin允许我们创建全局变量，可以在编译时进行设置，因此我们可以使用该属性来设置全局变量来区分开发环境和正式环境
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),

        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../static'),
            to: path.resolve(__dirname, '../dist/static'),
            ignore: ['.*']
        }]),

        new MiniCssExtractPlugin({ 
            filename: devMode ? 'css/[name].css' : 'css/[name].[hash:8].css',
            chunkFilename: devMode ? 'css/[name].css' : 'css/[name].[hash:8].css', //cmd和amd异步加载,而且没有给入口文件时，会生成了no-name的chunk  因为建议用id
          })
    ],
};