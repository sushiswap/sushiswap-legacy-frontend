'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var abstractConnector = require('@web3-react/abstract-connector');
var ethProvider = _interopDefault(require('eth-provider'));
var invariant = _interopDefault(require('tiny-invariant'));

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var UserRejectedRequestError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(UserRejectedRequestError, _Error);

  function UserRejectedRequestError() {
    var _this;

    _this = _Error.call(this) || this;
    _this.name = _this.constructor.name;
    _this.message = 'The user rejected the request.';
    return _this;
  }

  return UserRejectedRequestError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
var FrameConnector = /*#__PURE__*/function (_AbstractConnector) {
  _inheritsLoose(FrameConnector, _AbstractConnector);

  function FrameConnector(kwargs) {
    var _this2;

    !(kwargs.supportedChainIds.length === 1) ?  invariant(false, 'This connector only supports 1 chainId at the moment.')  : void 0;
    _this2 = _AbstractConnector.call(this, kwargs) || this;
    _this2.handleNetworkChanged = _this2.handleNetworkChanged.bind(_assertThisInitialized(_this2));
    _this2.handleChainChanged = _this2.handleChainChanged.bind(_assertThisInitialized(_this2));
    _this2.handleAccountsChanged = _this2.handleAccountsChanged.bind(_assertThisInitialized(_this2));
    _this2.handleClose = _this2.handleClose.bind(_assertThisInitialized(_this2));
    return _this2;
  }

  var _proto = FrameConnector.prototype;

  _proto.handleNetworkChanged = function handleNetworkChanged(networkId) {
    {
      console.log("Handling 'networkChanged' event with payload", networkId);
    }

    this.emitUpdate({
      provider: this.provider,
      chainId: networkId
    });
  };

  _proto.handleChainChanged = function handleChainChanged(chainId) {
    {
      console.log("Handling 'chainChanged' event with payload", chainId);
    }

    this.emitUpdate({
      chainId: chainId
    });
  };

  _proto.handleAccountsChanged = function handleAccountsChanged(accounts) {
    {
      console.log("Handling 'accountsChanged' event with payload", accounts);
    }

    this.emitUpdate({
      account: accounts.length === 0 ? null : accounts[0]
    });
  };

  _proto.handleClose = function handleClose(code, reason) {
    {
      console.log("Handling 'close' event with payload", code, reason);
    }

    this.emitDeactivate();
  };

  _proto.activate = function activate() {
    try {
      var _this4 = this;

      if (!_this4.provider) {
        _this4.provider = ethProvider('frame');
      }

      _this4.provider.on('networkChanged', _this4.handleNetworkChanged).on('chainChanged', _this4.handleChainChanged).on('accountsChanged', _this4.handleAccountsChanged).on('close', _this4.handleClose);

      return Promise.resolve(_this4.provider.enable().then(function (accounts) {
        return accounts[0];
      })["catch"](function (error) {
        if (error && error.code === 4001) {
          throw new UserRejectedRequestError();
        } else {
          throw error;
        }
      })).then(function (account) {
        return {
          provider: _this4.provider,
          account: account
        };
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getProvider = function getProvider() {
    try {
      var _this6 = this;

      return Promise.resolve(_this6.provider);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getChainId = function getChainId() {
    try {
      var _this8 = this;

      return Promise.resolve(_this8.provider.send('eth_chainId'));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getAccount = function getAccount() {
    try {
      var _this10 = this;

      return Promise.resolve(_this10.provider.send('eth_accounts').then(function (accounts) {
        return accounts[0];
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.deactivate = function deactivate() {
    this.provider.removeListener('networkChanged', this.handleNetworkChanged).removeListener('chainChanged', this.handleChainChanged).removeListener('accountsChanged', this.handleAccountsChanged).removeListener('close', this.handleClose);
  };

  return FrameConnector;
}(abstractConnector.AbstractConnector);

exports.FrameConnector = FrameConnector;
exports.UserRejectedRequestError = UserRejectedRequestError;
//# sourceMappingURL=frame-connector.cjs.development.js.map
