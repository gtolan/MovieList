const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const htmlWebpackPlugin = require("html-webpack-plugin");
const HtmlReplaceWebpackPlugin = require("html-replace-webpack-plugin");
const appConfig = require("./app.config.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const resource = {
  // replace in index.html
  man: { manifest: "/manifest.json" },
  img: { favicon: appConfig.favicon }
};

const tpl = {
  //replacement link types
  img: '<link rel="shortcut icon" href="%s">',
  man: '<link rel="manifest" href="%s">'
};

// Webpack Configuration
const config = {
  // Entry
  entry: {
    app: ["./src/scripts/index.js"]
  },
  // Output
  mode: "production",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  // Loaders
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  // Plugins
  plugins: [
    new MiniCssExtractPlugin({
      filename: "critical.css"
      // filename: "[name].css",
      // chunkFilename: "[id].css"
    }),

    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer()]
      }
    }),

    new htmlWebpackPlugin({
      meta: {
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
        "msapplication-TileImage": appConfig.msTileImage,
        "msapplication-TileColor": appConfig.msTileColor,
        description: appConfig.description,
        // Will generate: <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        "theme-color": "#4285f4"
        // Will generate: <meta name="theme-color" content="#4285f4">
      },
      title: appConfig.appName,
      icon: appConfig.icon,
      template: "./src/index.html",
      filename: "index.html",
      hash: false
    }),

    new HtmlReplaceWebpackPlugin([
      // {
      //     pattern: 'foo',
      //     replacement: '`foo` has been replaced with `bar`'
      // },
      // {
      //     pattern: '@@title',
      //     replacement: 'html replace webpack plugin'
      // },
      {
        pattern: "@@lang",
        replacement: appConfig.language
      },
      {
        pattern: /(<!--\s*|@@)(img|man):([\w-\/]+)(\s*-->)?/g,
        replacement: function(match, $1, type, file, $4, index, input) {
          // those formal parameters could be:
          // match: <-- man:manifest-->

          var url = resource[type][file];

          // $1==='@@' <--EQ--> $4===undefined
          return $4 == undefined ? url : tpl[type].replace("%s", url);
        }
      }
    ])
  ]
  // OPTIONAL
  // Reload On File Change
  // watch: true,
  // Development Tools (Map Errors To Source File)
};
// Exports
module.exports = config;
