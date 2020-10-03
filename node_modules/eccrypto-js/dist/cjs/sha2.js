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
const constants_1 = require("./constants");
function sha256(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = constants_1.EMPTY_BUFFER;
        if (env_1.isBrowser()) {
            result = yield browser_1.browserSha256(msg);
        }
        else if (env_1.isNode()) {
            result = node_1.nodeSha256(msg);
        }
        else {
            result = fallback_1.fallbackSha256(msg);
        }
        return result;
    });
}
exports.sha256 = sha256;
function sha512(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = constants_1.EMPTY_BUFFER;
        if (env_1.isBrowser()) {
            result = yield browser_1.browserSha512(msg);
        }
        else if (env_1.isNode()) {
            result = node_1.nodeSha512(msg);
        }
        else {
            result = fallback_1.fallbackSha512(msg);
        }
        return result;
    });
}
exports.sha512 = sha512;
function ripemd160(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = constants_1.EMPTY_BUFFER;
        if (env_1.isNode()) {
            result = node_1.nodeRipemd160(msg);
        }
        else {
            result = fallback_1.fallbackRipemd160(msg);
        }
        return result;
    });
}
exports.ripemd160 = ripemd160;
function sha256Sync(msg) {
    let result = constants_1.EMPTY_BUFFER;
    if (env_1.isNode()) {
        result = node_1.nodeSha256(msg);
    }
    else {
        result = fallback_1.fallbackSha256(msg);
    }
    return result;
}
exports.sha256Sync = sha256Sync;
function sha512Sync(msg) {
    let result = constants_1.EMPTY_BUFFER;
    if (env_1.isNode()) {
        result = node_1.nodeSha512(msg);
    }
    else {
        result = fallback_1.fallbackSha512(msg);
    }
    return result;
}
exports.sha512Sync = sha512Sync;
function ripemd160Sync(msg) {
    let result = constants_1.EMPTY_BUFFER;
    if (env_1.isNode()) {
        result = node_1.nodeRipemd160(msg);
    }
    else {
        result = fallback_1.fallbackRipemd160(msg);
    }
    return result;
}
exports.ripemd160Sync = ripemd160Sync;
//# sourceMappingURL=sha2.js.map