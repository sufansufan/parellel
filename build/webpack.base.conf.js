var path = require("path");
var utils = require("./utils");
var webpack = require("webpack");
var config = require("../config");
var vueLoaderConfig = require("./vue-loader.conf");

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

module.exports = {
  entry: {
    app: ["babel-polyfill", "./src/main.js"]
  },
  externals: {
    BMap: "BMap"
  },
  output: {
    path: config.build.assetsRoot,
    filename: "[name].js",
    publicPath:
      process.env.NODE_ENV === "production"
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
  },
  resolve: {
    // 解析模块请求的选项
    extensions: [".js", ".vue", ".json"],
    modules: [resolve("src"), resolve("node_modules")],
    alias: {
      vue$: "vue/dist/vue.js",
      src: resolve("src"),
      assets: resolve("src/assets"),
      components: resolve("src/pageModel")
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      /*
                    {
                        test: /\.js$/,
                        loader: 'babel-loader',
                        include: [
                            resolve('src'),
                            resolve('test')]
                    },*/
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["es2015"]
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        query: {
          limit: 10000,
          name: utils.assetsPath("img/[name].[hash:7].[ext]")
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        query: {
          limit: 10000,
          name: utils.assetsPath("fonts/[name].[hash:7].[ext]")
        }
      }
    ]
  },
  // plugins: [
  //     new webpack.DllReferencePlugin({
  //       context: path.resolve(__dirname, '..'),
  //       manifest: require('./vendor-manifest.json')
  //     })
  // ]
  externals: {
    Vue: "Vue",
    axios: "axios",
    Vuex: "Vuex",
    "vue-router": "VueRouter",
    "element-ui": "ELEMENT",
    echarts: "echarts",
    VeBar: "VeBar",
    VeLine: "VeLine",
    VeRing: "VeRing",
    VeHistogram: "VeHistogram"
  }
};
