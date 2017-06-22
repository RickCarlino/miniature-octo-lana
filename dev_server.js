let WebpackDevServer = require("webpack-dev-server");
let webpack = require("webpack");
let config = require("./webpack.config");

let compiler = webpack(config);
let server = new WebpackDevServer(compiler, {
  contentBase: "./public",
  // Relative to content base
  publicPath: ""
});

server.listen(3002, "localhost");
