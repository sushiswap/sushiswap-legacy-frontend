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

var CHAIN_ID = 1;
var WalletLinkConnector = /*#__PURE__*/function (_AbstractConnector) {
  _inheritsLoose(WalletLinkConnector, _AbstractConnector);

  function WalletLinkConnector(_ref) {
    var _this;

    var url = _ref.url,
        appName = _ref.appName,
        appLogoUrl = _ref.appLogoUrl,
        darkMode = _ref.darkMode;
    _this = _AbstractConnector.call(this, {
      supportedChainIds: [CHAIN_ID]
    }) || this;
    _this.url = url;
    _this.appName = appName;
    _this.appLogoUrl = appLogoUrl;
    _this.darkMode = darkMode || false;
    return _this;
  }

  var _proto = WalletLinkConnector.prototype;

  _proto.activate = function activate() {
    try {
      var _temp3 = function _temp3() {
        return Promise.resolve(_this3.provider.send('eth_requestAccounts').then(function (accounts) {
          return accounts[0];
        })).then(function (account) {
          return {
            provider: _this3.provider,
            chainId: CHAIN_ID,
            account: account
          };
        });
      };

      var _this3 = this;

      var _temp4 = function () {
        if (!_this3.walletLink) {
          return Promise.resolve(import('walletlink')).then(function (_ref2) {
            var WalletLink = _ref2["default"];
            _this3.walletLink = new WalletLink(_extends({
              appName: _this3.appName,
              darkMode: _this3.darkMode
            }, _this3.appLogoUrl ? {
              appLogoUrl: _this3.appLogoUrl
            } : {}));
            _this3.provider = _this3.walletLink.makeWeb3Provider(_this3.url, CHAIN_ID);
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

      return Promise.resolve(_this5.provider);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getChainId = function getChainId() {
    return Promise.resolve(CHAIN_ID);
  };

  _proto.getAccount = function getAccount() {
    try {
      var _this7 = this;

      return Promise.resolve(_this7.provider.send('eth_accounts').then(function (accounts) {
        return accounts[0];
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.deactivate = function deactivate() {};

  _proto.close = function close() {
    try {
      var _this9 = this;

      _this9.provider.close();

      _this9.emitDeactivate();

      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return WalletLinkConnector;
}(AbstractConnector);

export { WalletLinkConnector };
//# sourceMappingURL=walletlink-connector.esm.js.map
