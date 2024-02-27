const path = require("path");

module.exports = {
  entry: "./src/spec.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  mode: "development",
  resolve: {
    extensions: [".ts", ".js"],
    fallback: {
      stream: require.resolve("stream-browserify"),
      crypto: require.resolve("crypto-browserify"),
      assert: require.resolve("assert/"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      os: require.resolve("os-browserify/browser"),
      buffer: require.resolve("buffer"),
      url: require.resolve("url/"),
    },
    alias: {
      process: "process/browser",
    },
  },
  target: "web",
  devServer: {
    static: "./dist",
    compress: true,
    open: true,
    host: "localhost",
    port: 4000,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
    ],
  },
};
