import { AbstractConnector } from '@web3-react/abstract-connector';
import invariant from 'tiny-invariant';

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

var chainIdToNetwork = {
  1: 'mainnet',
  3: 'ropsten',
  4: 'rinkeby',
  42: 'kovan'
};
var FortmaticConnector = /*#__PURE__*/function (_AbstractConnector) {
  _inheritsLoose(FortmaticConnector, _AbstractConnector);

  function FortmaticConnector(_ref) {
    var _this;

    var apiKey = _ref.apiKey,
        chainId = _ref.chainId;
    !Object.keys(chainIdToNetwork).includes(chainId.toString()) ? process.env.NODE_ENV !== "production" ? invariant(false, "Unsupported chainId " + chainId) : invariant(false) : void 0;
    _this = _AbstractConnector.call(this, {
      supportedChainIds: [chainId]
    }) || this;
    _this.apiKey = apiKey;
    _this.chainId = chainId;
    return _this;
  }

  var _proto = FortmaticConnector.prototype;

  _proto.activate = function activate() {
    try {
      var _temp3 = function _temp3() {
        return Promise.resolve(_this3.fortmatic.getProvider().enable().then(function (accounts) {
          return accounts[0];
        })).then(function (account) {
          return {
            provider: _this3.fortmatic.getProvider(),
            chainId: _this3.chainId,
            account: account
          };
        });
      };

      var _this3 = this;

      var _temp4 = function () {
        if (!_this3.fortmatic) {
          return Promise.resolve(import('fortmatic')).then(function (_ref2) {
            var Fortmatic = _ref2["default"];
            _this3.fortmatic = new Fortmatic(_this3.apiKey, _this3.chainId === 1 || _this3.chainId === 4 ? undefined : chainIdToNetwork[_this3.chainId]);
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

      return Promise.resolve(_this5.fortmatic.getProvider());
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

      return Promise.resolve(_this9.fortmatic.getProvider().send('eth_accounts').then(function (accounts) {
        return accounts[0];
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.deactivate = function deactivate() {};

  _proto.close = function close() {
    try {
      var _this11 = this;

      return Promise.resolve(_this11.fortmatic.user.logout()).then(function () {
        _this11.emitDeactivate();
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return FortmaticConnector;
}(AbstractConnector);

export { FortmaticConnector };
//# sourceMappingURL=fortmatic-connector.esm.js.map
