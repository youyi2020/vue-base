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

# webapack性能优化
## 1. Loaders 特别是babel-loader
将 loaders 应用于最少数的babel-loader必要模块中
```js
{
  test: /\.js$/,
  include: path.resolve(__dirname, "src"),
  loader: "babel-loader"
}
```

