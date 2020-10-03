"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const aes_js_1 = __importDefault(require("aes-js"));
const randombytes_1 = __importDefault(require("randombytes"));
const hash = __importStar(require("hash.js"));
const pkcs7 = __importStar(require("./pkcs7"));
const constants_1 = require("../constants");
const helpers_1 = require("../helpers");
function fallbackRandomBytes(length) {
    return randombytes_1.default(length);
}
exports.fallbackRandomBytes = fallbackRandomBytes;
function fallbackAesEncrypt(iv, key, data) {
    const aesCbc = new aes_js_1.default.ModeOfOperation.cbc(key, iv);
    const padded = helpers_1.arrayToBuffer(pkcs7.pad(data));
    const encryptedBytes = aesCbc.encrypt(padded);
    return Buffer.from(encryptedBytes);
}
exports.fallbackAesEncrypt = fallbackAesEncrypt;
function fallbackAesDecrypt(iv, key, data) {
    const aesCbc = new aes_js_1.default.ModeOfOperation.cbc(key, iv);
    const encryptedBytes = aesCbc.decrypt(data);
    const padded = Buffer.from(encryptedBytes);
    const result = helpers_1.arrayToBuffer(pkcs7.unpad(padded));
    return result;
}
exports.fallbackAesDecrypt = fallbackAesDecrypt;
function fallbackHmacSha256Sign(key, data) {
    const result = hash
        .hmac(hash[constants_1.SHA256_NODE_ALGO], key)
        .update(data)
        .digest(constants_1.HEX_ENC);
    return helpers_1.hexToBuffer(result);
}
exports.fallbackHmacSha256Sign = fallbackHmacSha256Sign;
function fallbackHmacSha512Sign(key, data) {
    const result = hash
        .hmac(hash[constants_1.SHA512_NODE_ALGO], key)
        .update(data)
        .digest(constants_1.HEX_ENC);
    return helpers_1.hexToBuffer(result);
}
exports.fallbackHmacSha512Sign = fallbackHmacSha512Sign;
function fallbackSha256(msg) {
    const result = hash
        .sha256()
        .update(msg)
        .digest(constants_1.HEX_ENC);
    return helpers_1.hexToBuffer(result);
}
exports.fallbackSha256 = fallbackSha256;
function fallbackSha512(msg) {
    const result = hash
        .sha512()
        .update(msg)
        .digest(constants_1.HEX_ENC);
    return helpers_1.hexToBuffer(result);
}
exports.fallbackSha512 = fallbackSha512;
function fallbackRipemd160(msg) {
    const result = hash
        .ripemd160()
        .update(msg)
        .digest(constants_1.HEX_ENC);
    return helpers_1.hexToBuffer(result);
}
exports.fallbackRipemd160 = fallbackRipemd160;
//# sourceMappingURL=fallback.js.map