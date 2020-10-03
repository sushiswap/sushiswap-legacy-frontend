import { AbstractConnector } from '@web3-react/abstract-connector';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

var chainIdToNetwork = {
  1: 'mainnet',
  3: 'ropsten',
  4: 'rinkeby',
  5: 'goerli',
  42: 'kovan'
};
var AuthereumConnector = /*#__PURE__*/function (_AbstractConnector) {
  _inheritsLoose(AuthereumConnector, _AbstractConnector);

  function AuthereumConnector(_ref) {
    var _this;

    var chainId = _ref.chainId,
        _ref$config = _ref.config,
        config = _ref$config === void 0 ? {} : _ref$config;
    _this = _AbstractConnector.call(this, {
      supportedChainIds: [chainId]
    }) || this;
    _this.chainId = chainId;
    _this.config = config;
    return _this;
  }

  var _proto = AuthereumConnector.prototype;

  _proto.activate = function activate() {
    try {
      var _temp3 = function _temp3() {
        return Promise.resolve(_this3.authereum.getProvider().enable().then(function (accounts) {
          return accounts[0];
        })).then(function () {
          return {
            provider: _this3.authereum.getProvider()
          };
        });
      };

      var _this3 = this;

      var _temp4 = function () {
        if (!_this3.authereum) {
          return Promise.resolve(import('authereum')).then(function (_ref2) {
            var Authereum = _ref2["default"];
            _this3.authereum = new Authereum(_extends({
              networkName: chainIdToNetwork[_this3.chainId]
            }, _this3.config));
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

      return Promise.resolve(_this5.authereum.getProvider());
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getChainId = function getChainId() {
    try {
      var _this7 = this;

      return Promise.resolve(_this7.authereum.getNetworkId());
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getAccount = function getAccount() {
    try {
      var _this9 = this;

      return Promise.resolve(_this9.authereum.getAccountAddress());
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.deactivate = function deactivate() {};

  _proto.close = function close() {
    try {
      var _this11 = this;

      _this11.authereum.logout();

      _this11.emitDeactivate();

      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return AuthereumConnector;
}(AbstractConnector);

export { AuthereumConnector };
//# sourceMappingURL=authereum-connector.esm.js.map
