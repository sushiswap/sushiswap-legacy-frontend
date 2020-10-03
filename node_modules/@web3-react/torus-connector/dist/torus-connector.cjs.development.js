'use strict';

function _interopNamespace(e) {
  if (e && e.__esModule) { return e; } else {
    var n = {};
    if (e) {
      Object.keys(e).forEach(function (k) {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      });
    }
    n['default'] = e;
    return n;
  }
}

var abstractConnector = require('@web3-react/abstract-connector');

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

var TorusConnector = /*#__PURE__*/function (_AbstractConnector) {
  _inheritsLoose(TorusConnector, _AbstractConnector);

  function TorusConnector(_ref) {
    var _this;

    var chainId = _ref.chainId,
        _ref$initOptions = _ref.initOptions,
        initOptions = _ref$initOptions === void 0 ? {} : _ref$initOptions,
        _ref$constructorOptio = _ref.constructorOptions,
        constructorOptions = _ref$constructorOptio === void 0 ? {} : _ref$constructorOptio,
        _ref$loginOptions = _ref.loginOptions,
        loginOptions = _ref$loginOptions === void 0 ? {} : _ref$loginOptions;
    _this = _AbstractConnector.call(this, {
      supportedChainIds: [chainId]
    }) || this;
    _this.chainId = chainId;
    _this.initOptions = initOptions;
    _this.constructorOptions = constructorOptions;
    _this.loginOptions = loginOptions;
    return _this;
  }

  var _proto = TorusConnector.prototype;

  _proto.activate = function activate() {
    try {
      var _temp3 = function _temp3() {
        return Promise.resolve(_this3.torus.login(_this3.loginOptions).then(function (accounts) {
          return accounts[0];
        })).then(function (account) {
          return {
            provider: _this3.torus.provider,
            account: account
          };
        });
      };

      var _this3 = this;

      var _temp4 = function () {
        if (!_this3.torus) {
          return Promise.resolve(new Promise(function (resolve) { resolve(_interopNamespace(require('@toruslabs/torus-embed'))); })).then(function (_ref2) {
            var Torus = _ref2["default"];
            _this3.torus = new Torus(_this3.constructorOptions);
            return Promise.resolve(_this3.torus.init(_this3.initOptions)).then(function () {});
          });
        }
      }();

      return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(_temp3) : _temp3(_temp4));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getProvider = function getProvider() {
    try {
      var _this5 = this;

      return Promise.resolve(_this5.torus.provider);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getChainId = function getChainId() {
    try {
      var _this7 = this;

      return Promise.resolve(_this7.chainId);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getAccount = function getAccount() {
    try {
      var _this9 = this;

      return Promise.resolve(_this9.torus.ethereum.send('eth_accounts').then(function (accounts) {
        return accounts[0];
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.deactivate = function deactivate() {
    try {
      var _this11 = this;

      return Promise.resolve(_this11.torus.cleanUp()).then(function () {
        _this11.torus = undefined;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.close = function close() {
    try {
      var _this13 = this;

      return Promise.resolve(_this13.torus.logout()).then(function () {
        _this13.emitDeactivate();
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return TorusConnector;
}(abstractConnector.AbstractConnector);

exports.TorusConnector = TorusConnector;
//# sourceMappingURL=torus-connector.cjs.development.js.map
