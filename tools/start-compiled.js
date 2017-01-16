'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * Launches a development web server with "live reload" functionality -
 * synchronizing URLs, interactions and code changes across multiple devices.
 */
var start = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _run2.default)(_clean2.default);

          case 2:
            _context.next = 4;
            return (0, _run2.default)(_copy2.default.bind(undefined, { watch: true }));

          case 4:
            _context.next = 6;
            return new _promise2.default(function (resolve) {
              // Patch the client-side bundle configurations
              // to enable Hot Module Replacement (HMR) and React Transform
              _webpack4.default.filter(function (x) {
                return x.target !== 'node';
              }).forEach(function (config) {
                if (Array.isArray(config.entry)) {
                  config.entry.unshift('webpack-hot-middleware/client');
                } else {
                  /* eslint-disable no-param-reassign */
                  config.entry = ['webpack-hot-middleware/client', config.entry];
                  /* eslint-enable no-param-reassign */
                }

                config.plugins.push(new _webpack2.default.HotModuleReplacementPlugin());
                config.plugins.push(new _webpack2.default.NoErrorsPlugin());
                config.module.loaders.filter(function (x) {
                  return x.loader === 'babel-loader';
                }).forEach(function (x) {
                  return x.query = { // eslint-disable-line no-param-reassign
                    // Wraps all React components into arbitrary transforms
                    // https://github.com/gaearon/babel-plugin-react-transform
                    plugins: [['react-transform', {
                      transforms: [{
                        transform: 'react-transform-hmr',
                        imports: ['react'],
                        locals: ['module']
                      }, {
                        transform: 'react-transform-catch-errors',
                        imports: ['react', 'redbox-react']
                      }]
                    }]]
                  };
                });
              });

              var bundler = (0, _webpack2.default)(_webpack4.default);
              var wpMiddleware = (0, _webpackMiddleware2.default)(bundler, {

                // IMPORTANT: webpack middleware can't access config,
                // so we should provide publicPath by ourselves
                publicPath: _webpack4.default[0].output.publicPath,

                // Pretty colored output
                stats: _webpack4.default[0].stats

              });
              var hotMiddlewares = bundler.compilers.filter(function (compiler) {
                return compiler.options.target !== 'node';
              }).map(function (compiler) {
                return (0, _webpackHotMiddleware2.default)(compiler);
              });

              var _handleServerBundleComplete = function handleServerBundleComplete() {
                (0, _runServer2.default)(function (err, host) {
                  if (!err) {
                    var bs = _browserSync2.default.create();
                    bs.init((0, _extends3.default)({}, DEBUG ? {} : { notify: false, ui: false }, {

                      proxy: {
                        target: host,
                        middleware: [wpMiddleware].concat((0, _toConsumableArray3.default)(hotMiddlewares))
                      },

                      // no need to watch '*.js' here, webpack will take care of it for us,
                      // including full page reloads if HMR won't work
                      files: ['build/content/**/*.*']
                    }), resolve);
                    _handleServerBundleComplete = _runServer2.default;
                  }
                });
              };

              bundler.plugin('done', function () {
                return _handleServerBundleComplete();
              });
            });

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function start() {
    return _ref.apply(this, arguments);
  };
}();

var _browserSync = require('browser-sync');

var _browserSync2 = _interopRequireDefault(_browserSync);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackMiddleware = require('webpack-middleware');

var _webpackMiddleware2 = _interopRequireDefault(_webpackMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _run = require('./run');

var _run2 = _interopRequireDefault(_run);

var _runServer = require('./runServer');

var _runServer2 = _interopRequireDefault(_runServer);

var _webpack3 = require('./webpack.config');

var _webpack4 = _interopRequireDefault(_webpack3);

var _clean = require('./clean');

var _clean2 = _interopRequireDefault(_clean);

var _copy = require('./copy');

var _copy2 = _interopRequireDefault(_copy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEBUG = !process.argv.includes('--release'); /**
                                                  * React Starter Kit (https://www.reactstarterkit.com/)
                                                  *
                                                  * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                  *
                                                  * This source code is licensed under the MIT license found in the
                                                  * LICENSE.txt file in the root directory of this source tree.
                                                  */

exports.default = start;

//# sourceMappingURL=start-compiled.js.map