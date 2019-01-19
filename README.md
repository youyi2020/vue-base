# vue-base 
> A Vue.js project cli with webpack4

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

```

## webapack性能优化
### 1. Loaders 特别是babel-loader
将loaders应用于最少数的babel-loader必要模块中
```js
{
  test: /\.js$/,
  include: path.resolve(__dirname, "src"),
  loader: "babel-loader"
}
```
### 2.Devtool
需要注意的是不同的 devtool 的设置，会导致不同的性能差异。
"eval" 具有最好的性能，但并不能帮助你转译代码。
如果你能接受稍差一些的 mapping 质量，可以使用 cheap-source-map 选项来提高性能
使用 eval-source-map 配置进行增量编译

### 3.Bootstrap
尽量减少 resolve.modules, resolve.extensions, resolve.mainFiles, resolve.descriptionFiles 中类目的数量，因为他们会增加文件系统调用的次数

### 4.避免在生产环境下才会用到的工具
某些实用工具， plugins 和 loaders 都只能在构建生产环境时才有用。例如，在开发时使用 UglifyJsPlugin 来压缩和修改代码是没有意义的。以下这些工具在开发中通常被排除在外:

### 5.最小化入口 chunk
应当在生成入口 chunk 时，尽量减少入口 chunk 的体积，以提高性能。下述代码块将只提取包含 runtime 的 chunk ，其他 chunk 都作为子模块:
```js
new CommonsChunkPlugin({
  name: "manifest",
  minChunks: Infinity
})
```

