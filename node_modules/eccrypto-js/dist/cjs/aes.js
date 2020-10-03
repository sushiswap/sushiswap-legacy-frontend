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
const node_1 = require("./lib/node");
const fallback_1 = require("./lib/fallback");
function aesCbcEncrypt(iv, key, data) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        if (env_1.isBrowser()) {
            result = yield browser_1.browserAesEncrypt(iv, key, data);
        }
        else if (env_1.isNode()) {
            result = node_1.nodeAesEncrypt(iv, key, data);
        }
        else {
            result = fallback_1.fallbackAesEncrypt(iv, key, data);
        }
        return result;
    });
}
exports.aesCbcEncrypt = aesCbcEncrypt;
function aesCbcDecrypt(iv, key, data) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        if (env_1.isBrowser()) {
            result = yield browser_1.browserAesDecrypt(iv, key, data);
        }
        else if (env_1.isNode()) {
            result = node_1.nodeAesDecrypt(iv, key, data);
        }
        else {
            result = fallback_1.fallbackAesDecrypt(iv, key, data);
        }
        return result;
    });
}
exports.aesCbcDecrypt = aesCbcDecrypt;
function aesCbcEncryptSync(iv, key, data) {
    let result;
    if (env_1.isNode()) {
        result = node_1.nodeAesEncrypt(iv, key, data);
    }
    else {
        result = fallback_1.fallbackAesEncrypt(iv, key, data);
    }
    return result;
}
exports.aesCbcEncryptSync = aesCbcEncryptSync;
function aesCbcDecryptSync(iv, key, data) {
    let result;
    if (env_1.isNode()) {
        result = node_1.nodeAesDecrypt(iv, key, data);
    }
    else {
        result = fallback_1.fallbackAesDecrypt(iv, key, data);
    }
    return result;
}
exports.aesCbcDecryptSync = aesCbcDecryptSync;
//# sourceMappingURL=aes.js.map