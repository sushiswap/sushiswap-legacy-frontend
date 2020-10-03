"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _connectToChild = _interopRequireDefault(require("./connectToChild"));

var _connectToParent = _interopRequireDefault(require("./connectToParent"));

var _errorCodes = require("./errorCodes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  ERR_CONNECTION_DESTROYED: _errorCodes.ERR_CONNECTION_DESTROYED,
  ERR_CONNECTION_TIMEOUT: _errorCodes.ERR_CONNECTION_TIMEOUT,
  ERR_NOT_IN_IFRAME: _errorCodes.ERR_NOT_IN_IFRAME,
  ERR_NO_IFRAME_SRC: _errorCodes.ERR_NO_IFRAME_SRC,
  connectToChild: _connectToChild.default,
  connectToParent: _connectToParent.default
};
exports.default = _default;
module.exports = exports.default;