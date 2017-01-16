'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * Copies static files such as robots.txt, favicon.ico to the
 * output (build) folder.
 */
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

var copy = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
    var _this = this;

    var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var watch = _ref2.watch;
    var ncp, watcher;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            ncp = _bluebird2.default.promisify(require('ncp'));
            _context2.next = 3;
            return _bluebird2.default.all([ncp('package.json', 'build/package.json')]);

          case 3:

            (0, _replace2.default)({
              regex: '"start".*',
              replacement: '"start": "node server.js"',
              paths: ['build/package.json'],
              recursive: false,
              silent: false
            });

            if (!watch) {
              _context2.next = 9;
              break;
            }

            _context2.next = 7;
            return new _bluebird2.default(function (resolve, reject) {
              (0, _gaze2.default)('src/content/**/*.*', function (err, val) {
                return err ? reject(err) : resolve(val);
              });
            });

          case 7:
            watcher = _context2.sent;

            watcher.on('changed', function () {
              var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(file) {
                var relPath;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        relPath = file.substr(_path2.default.join(__dirname, '../src/content/').length);
                        _context.next = 3;
                        return ncp('src/content/' + relPath, 'build/content/' + relPath);

                      case 3:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, _this);
              }));

              return function (_x2) {
                return _ref3.apply(this, arguments);
              };
            }());

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function copy() {
    return _ref.apply(this, arguments);
  };
}();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _gaze = require('gaze');

var _gaze2 = _interopRequireDefault(_gaze);

var _replace = require('replace');

var _replace2 = _interopRequireDefault(_replace);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = copy;

//# sourceMappingURL=copy-compiled.js.map