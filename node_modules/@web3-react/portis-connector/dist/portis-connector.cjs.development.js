'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

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
var invariant = _interopDefault(require('tiny-invariant'));

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var chainIdToNetwork = {
  1: 'mainnet',
  3: 'ropsten',
  4: 'rinkeby',
  5: 'goerli',
  42: 'kovan',
  100: 'xdai',
  30: 'orchid',
  31: 'orchidTestnet',
  99: 'core',
  77: 'sokol',
  61: 'classic',
  8: 'ubiq',
  108: 'thundercore',
  18: 'thundercoreTestnet',
  163: 'lightstreams',
  122: 'fuse',
  15001: 'maticTestnet'
};
var PortisConnector = /*#__PURE__*/function (_AbstractConnector) {
  _inheritsLoose(PortisConnector, _AbstractConnector);

  function PortisConnector(_ref) {
    var _this;

    var dAppId = _ref.dAppId,
        networks = _ref.networks,
        _ref$config = _ref.config,
        config = _ref$config === void 0 ? {} : _ref$config;
    var chainIds = networks.map(function (n) {
      return typeof n === 'number' ? n : Number(n.chainId);
    });
    !chainIds.every(function (c) {
      return !!chainIdToNetwork[c];
    }) ?  invariant(false, "One or more unsupported networks " + networks)  : void 0;
    _this = _AbstractConnector.call(this, {
      supportedChainIds: chainIds
    }) || this;
    _this.dAppId = dAppId;
    _this.networks = networks;
    _this.config = config;
    _this.handleOnLogout = _this.handleOnLogout.bind(_assertThisInitialized(_this));
    _this.handleOnActiveWalletChanged = _this.handleOnActiveWalletChanged.bind(_assertThisInitialized(_this));
    _this.handleOnError = _this.handleOnError.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = PortisConnector.prototype;

  _proto.handleOnLogout = function handleOnLogout() {
    {
      console.log("Handling 'onLogout' event");
    }

    this.emitDeactivate();
  };

  _proto.handleOnActiveWalletChanged = function handleOnActiveWalletChanged(account) {
    {
      console.log("Handling 'onActiveWalletChanged' event with payload", account);
    }

    this.emitUpdate({
      account: account
    });
  };

  _proto.handleOnError = function handleOnError(error) {
    {
      console.log("Handling 'onError' event");
    }

    this.emitError(error);
  };

  _proto.activate = function activate() {
    try {
      var _temp3 = function _temp3() {
        _this3.portis.onLogout(_this3.handleOnLogout);

        _this3.portis.onActiveWalletChanged(_this3.handleOnActiveWalletChanged);

        _this3.portis.onError(_this3.handleOnError);

        return Promise.resolve(_this3.portis.provider.enable().then(function (accounts) {
          return accounts[0];
        })).then(function (account) {
          return {
            provider: _this3.portis.provider,
            account: account
          };
        });
      };

      var _this3 = this;

      var _temp4 = function () {
        if (!_this3.portis) {
          return Promise.resolve(new Promise(function (resolve) { resolve(_interopNamespace(require('@portis/web3'))); })).then(function (_ref2) {
            var Portis = _ref2["default"];
            _this3.portis = new Portis(_this3.dAppId, typeof _this3.networks[0] === 'number' ? chainIdToNetwork[_this3.networks[0]] : _this3.networks[0], _this3.config);
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

      return Promise.resolve(_this5.portis.provider);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getChainId = function getChainId() {
    try {
      var _this7 = this;

      return Promise.resolve(_this7.portis.provider.send('eth_chainId'));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getAccount = function getAccount() {
    try {
      var _this9 = this;

      return Promise.resolve(_this9.portis.provider.send('eth_accounts').then(function (accounts) {
        return accounts[0];
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.deactivate = function deactivate() {
    this.portis.onLogout(function () {});
    this.portis.onActiveWalletChanged(function () {});
    this.portis.onError(function () {});
  };

  _proto.changeNetwork = function changeNetwork(newNetwork, isGasRelayEnabled) {
    try {
      var _this11 = this;

      if (typeof newNetwork === 'number') {
        !!!chainIdToNetwork[newNetwork] ? "development" !== "production" ? invariant(false, "Invalid chainId " + newNetwork) : invariant(false) : void 0;

        _this11.portis.changeNetwork(chainIdToNetwork[newNetwork], isGasRelayEnabled);

        _this11.emitUpdate({
          chainId: newNetwork
        });
      } else {
        _this11.portis.changeNetwork(newNetwork, isGasRelayEnabled);

        _this11.emitUpdate({
          chainId: Number(newNetwork.chainId)
        });
      }

      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.close = function close() {
    try {
      var _this13 = this;

      return Promise.resolve(_this13.portis.logout()).then(function () {
        _this13.emitDeactivate();
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return PortisConnector;
}(abstractConnector.AbstractConnector);

exports.PortisConnector = PortisConnector;
//# sourceMappingURL=portis-connector.cjs.development.js.map
