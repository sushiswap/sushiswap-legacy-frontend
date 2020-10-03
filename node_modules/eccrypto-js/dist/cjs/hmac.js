"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./lib/env");
const browser_1 = require("./lib/browser");
const fallback_1 = require("./lib/fallback");
const node_1 = require("./lib/node");
const helpers_1 = require("./helpers");
function hmacSha256Sign(key, msg) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        if (env_1.isBrowser()) {
            result = yield browser_1.browserHmacSha256Sign(key, msg);
        }
        else if (env_1.isNode()) {
            result = node_1.nodeHmacSha256Sign(key, msg);
        }
        else {
            result = fallback_1.fallbackHmacSha256Sign(key, msg);
        }
        return result;
    });
}
exports.hmacSha256Sign = hmacSha256Sign;
function hmacSha256Verify(key, msg, sig) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        if (env_1.isBrowser()) {
            const expectedSig = yield browser_1.browserHmacSha256Sign(key, msg);
            result = helpers_1.equalConstTime(expectedSig, sig);
        }
        else if (env_1.isNode()) {
            const expectedSig = node_1.nodeHmacSha256Sign(key, msg);
            result = helpers_1.equalConstTime(expectedSig, sig);
        }
        else {
            const expectedSig = fallback_1.fallbackHmacSha256Sign(key, msg);
            result = helpers_1.equalConstTime(expectedSig, sig);
        }
        return result;
    });
}
exports.hmacSha256Verify = hmacSha256Verify;
function hmacSha512Sign(key, msg) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        if (env_1.isBrowser()) {
            result = yield browser_1.browserHmacSha512Sign(key, msg);
        }
        else if (env_1.isNode()) {
            result = node_1.nodeHmacSha512Sign(key, msg);
        }
        else {
            result = fallback_1.fallbackHmacSha512Sign(key, msg);
        }
        return result;
    });
}
exports.hmacSha512Sign = hmacSha512Sign;
function hmacSha512Verify(key, msg, sig) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        if (env_1.isNode()) {
            const expectedSig = node_1.nodeHmacSha512Sign(key, msg);
            result = helpers_1.equalConstTime(expectedSig, sig);
        }
        else {
            const expectedSig = fallback_1.fallbackHmacSha512Sign(key, msg);
            result = helpers_1.equalConstTime(expectedSig, sig);
        }
        return result;
    });
}
exports.hmacSha512Verify = hmacSha512Verify;
function hmacSha256SignSync(key, msg) {
    let result;
    if (env_1.isNode()) {
        result = node_1.nodeHmacSha256Sign(key, msg);
    }
    else {
        result = fallback_1.fallbackHmacSha256Sign(key, msg);
    }
    return result;
}
exports.hmacSha256SignSync = hmacSha256SignSync;
function hmacSha256VerifySync(key, msg, sig) {
    let result;
    if (env_1.isNode()) {
        const expectedSig = node_1.nodeHmacSha256Sign(key, msg);
        result = helpers_1.equalConstTime(expectedSig, sig);
    }
    else {
        const expectedSig = fallback_1.fallbackHmacSha256Sign(key, msg);
        result = helpers_1.equalConstTime(expectedSig, sig);
    }
    return result;
}
exports.hmacSha256VerifySync = hmacSha256VerifySync;
function hmacSha512SignSync(key, msg) {
    let result;
    if (env_1.isNode()) {
        result = node_1.nodeHmacSha512Sign(key, msg);
    }
    else {
        result = fallback_1.fallbackHmacSha512Sign(key, msg);
    }
    return result;
}
exports.hmacSha512SignSync = hmacSha512SignSync;
function hmacSha512VerifySync(key, msg, sig) {
    let result;
    if (env_1.isNode()) {
        const expectedSig = node_1.nodeHmacSha512Sign(key, msg);
        result = helpers_1.equalConstTime(expectedSig, sig);
    }
    else {
        const expectedSig = fallback_1.fallbackHmacSha512Sign(key, msg);
        result = helpers_1.equalConstTime(expectedSig, sig);
    }
    return result;
}
exports.hmacSha512VerifySync = hmacSha512VerifySync;
//# sourceMappingURL=hmac.js.map