const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
require("dotenv").config();
const consoleUtil = require("./config/utils/consoleUtil.js");
var webpack = require("webpack");

const isBundleAnalyzerEnabled = process.env.BUNDLE_ANALYZER === "true";
const colors = require("colors");

consoleUtil.logForEnv(process.env.ENV);



console.log(
  `
_      __    __   _____             
| | /| / /__ / /  / _/ /__ _    __   
| |/ |/ / -_) _ \\/ _/ / _ \\ |/|/ / 
|__/|__/\\__/_.__/_//_/\\___/__,__/  `.blue
);
console.log(
  `
------------------------------------
`.blue
);

if (process.env.BUNDLE_ANALYZER === "true") {
  consoleUtil.log("Bundle analyzer", true);
  console.log('');
} else {
  consoleUtil.log("Bundle analyzer", false);
  console.log('');
}

const alias = {
  '@/': path.resolve(__dirname, './src/'),
};




module.exports = {
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    client: {
      logging: "info",
    },
  },
  entry: "./src/index.tsx",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: process.env.ENV,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: [".tsx", ".ts", ".js"],
  },

  stats: {
    all: false,
    assets: false,
    modules: false,
    entrypoints: false,
    builtAt: false,
    version: false,
    timings: false,
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images/",
            },
          },
        ],
      },
      {
        test: /\.(bin|glb)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "models/",
            },
          },
        ],
      },
      {
        test: /\.json$/,
        use: 'json-loader',
        type: 'javascript/auto'
      },
      {
        test: /\.txt$/,
        use: 'raw-loader', 

      },
      {
        test: /\.gltf$/,
        use: [
          {
            loader: "file-loader",
            options: {
              limit: 8192,
              name: "models/[name].[ext]",
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.bin$/,
        use: [
          {
            loader: "file-loader",
            options: {
              limit: 8192,
              name: "models/[name].[ext]",
              esModule: false,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    isBundleAnalyzerEnabled &&
      new BundleAnalyzerPlugin({
        analyzerMode: "server",
        generateStatsFile: true,
        openAnalyzer: process.env.BUNDLE_OPEN,
        statsFilename: "./reports/stats.json",
      }),
    new webpack.ProgressPlugin((percentage, message, ...args) => {
      const percent = Math.round(percentage * 100);
      let colorFunc = percent === 100 ? colors.green : colors.blue;

      process.stdout.clearLine();
      process.stdout.cursorTo(0);

      const progressBar = `${"=".repeat(percent / 10)}${" ".repeat(
        10 - percent / 10
      )}`;
      const icon = percent === 100 ? "" : "🔷";

      process.stdout.write(
        `${icon} ${colorFunc(`[${percent}%]`)} ${progressBar.cyan}`
      );
    }),
    new CopyPlugin({
      patterns: [{ from: "webflow.json", to: "webflow.json" }],
    }),
    function () {
      this.hooks.done.tap("logBundleSize", (stats) => {
        const { assets } = stats.toJson({ source: false, modules: false });
        const totalSize = assets.reduce((acc, asset) => acc + asset.size, 0);

        setTimeout(() => {
          // consoleUtil.logBundle(`\x1b[44m  ${totalSize} bytes\x1b[0m`);
          // consoleUtil.logBundle(
          //   `\x1b[35m  ${(totalSize / 1000).toFixed(2)} KB\x1b[0m`
          // );
          consoleUtil.logBundle(
            `\x1b[36m ${(totalSize / 1000000).toFixed(2)} MB\x1b[0m`
          );
        }, 1000); // delay logging by 2 seconds
      });
    },
  ],
};
