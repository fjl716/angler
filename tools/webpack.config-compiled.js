'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _extend = require('extend');

var _extend2 = _interopRequireDefault(_extend);

var _assetsWebpackPlugin = require('assets-webpack-plugin');

var _assetsWebpackPlugin2 = _interopRequireDefault(_assetsWebpackPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

var DEBUG = !process.argv.includes('--release');
var VERBOSE = process.argv.includes('--verbose');
var AUTOPREFIXER_BROWSERS = ['Android 2.3', 'Android >= 4', 'Chrome >= 35', 'Firefox >= 31', 'Explorer >= 9', 'iOS >= 7', 'Opera >= 12', 'Safari >= 7.1'];
var GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  __DEV__: DEBUG
};

//
// Common configuration chunk to be used for both
// client-side (client.js) and server-side (server.js) bundles
// -----------------------------------------------------------------------------

var config = {
  output: {
    publicPath: '/',
    sourcePrefix: '  '
  },

  cache: DEBUG,
  debug: DEBUG,

  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE
  },

  plugins: [new _webpack2.default.optimize.OccurenceOrderPlugin()],

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.json']
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: [_path2.default.resolve(__dirname, '../node_modules/react-routing/src'), _path2.default.resolve(__dirname, '../src')],
      loader: 'babel-loader'
    }, {
      test: /\.scss$/,
      loaders: ['isomorphic-style-loader', 'css-loader?' + (DEBUG ? 'sourceMap&' : 'minimize&') + 'modules&localIdentName=' + ('' + (DEBUG ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]')), 'postcss-loader?parser=postcss-scss']
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.txt$/,
      loader: 'raw-loader'
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
      loader: 'url-loader?limit=10000'
    }, {
      test: /\.(eot|ttf|wav|mp3)$/,
      loader: 'file-loader'
    }, {
      test: /\.jade$/,
      loader: 'jade-loader'
    }]
  },

  postcss: function plugins(bundler) {
    return [require('postcss-import')({ addDependencyTo: bundler }), require('precss')(), require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS })];
  }
};

//
// Configuration for the client-side bundle (client.js)
// -----------------------------------------------------------------------------

var clientConfig = (0, _extend2.default)(true, {}, config, {
  entry: './src/client.js',
  output: {
    path: _path2.default.join(__dirname, '../build/public'),
    filename: DEBUG ? '[name].js?[hash]' : '[name].[hash].js'
  },

  // Choose a developer tool to enhance debugging
  // http://webpack.github.io/docs/configuration.html#devtool
  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,
  plugins: [].concat((0, _toConsumableArray3.default)(config.plugins), [new _webpack2.default.DefinePlugin((0, _extends3.default)({}, GLOBALS, { 'process.env.BROWSER': true })), new _assetsWebpackPlugin2.default({
    path: _path2.default.join(__dirname, '../build'),
    filename: 'assets.js',
    processOutput: function processOutput(x) {
      return 'module.exports = ' + (0, _stringify2.default)(x) + ';';
    }
  })], (0, _toConsumableArray3.default)(!DEBUG ? [new _webpack2.default.optimize.DedupePlugin(), new _webpack2.default.optimize.UglifyJsPlugin({
    compress: {
      // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
      screw_ie8: true,

      // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
      warnings: VERBOSE
    }
  }), new _webpack2.default.optimize.AggressiveMergingPlugin()] : []))
});

//
// Configuration for the server-side bundle (server.js)
// -----------------------------------------------------------------------------

var serverConfig = (0, _extend2.default)(true, {}, config, {
  entry: './src/server.js',
  output: {
    path: './build',
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  externals: [/^\.\/assets$/, function filter(context, request, cb) {
    var isExternal = request.match(/^[@a-z][a-z\/\.\-0-9]*$/i) && !request.match(/^react-routing/) && !context.match(/[\\/]react-routing/);
    cb(null, Boolean(isExternal));
  }],
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  },
  devtool: 'source-map',
  plugins: [].concat((0, _toConsumableArray3.default)(config.plugins), [new _webpack2.default.DefinePlugin((0, _extends3.default)({}, GLOBALS, { 'process.env.BROWSER': false })), new _webpack2.default.BannerPlugin('require("source-map-support").install();', { raw: true, entryOnly: false })])
});

exports.default = [clientConfig, serverConfig];

//# sourceMappingURL=webpack.config-compiled.js.map