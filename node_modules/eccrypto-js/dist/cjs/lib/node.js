"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const constants_1 = require("../constants");
const helpers_1 = require("../helpers");
function nodeRandomBytes(length) {
    return crypto_1.default.randomBytes(length);
}
exports.nodeRandomBytes = nodeRandomBytes;
function nodeAesEncrypt(iv, key, data) {
    const cipher = crypto_1.default.createCipheriv(constants_1.AES_NODE_ALGO, key, iv);
    return helpers_1.concatBuffers(cipher.update(data), cipher.final());
}
exports.nodeAesEncrypt = nodeAesEncrypt;
function nodeAesDecrypt(iv, key, data) {
    const decipher = crypto_1.default.createDecipheriv(constants_1.AES_NODE_ALGO, key, iv);
    return helpers_1.concatBuffers(decipher.update(data), decipher.final());
}
exports.nodeAesDecrypt = nodeAesDecrypt;
function nodeHmacSha256Sign(key, data) {
    return crypto_1.default
        .createHmac(constants_1.HMAC_NODE_ALGO, Buffer.from(key))
        .update(data)
        .digest();
}
exports.nodeHmacSha256Sign = nodeHmacSha256Sign;
function nodeHmacSha512Sign(key, data) {
    return crypto_1.default
        .createHmac(constants_1.SHA512_NODE_ALGO, Buffer.from(key))
        .update(data)
        .digest();
}
exports.nodeHmacSha512Sign = nodeHmacSha512Sign;
function nodeSha256(data) {
    return crypto_1.default
        .createHash(constants_1.SHA256_NODE_ALGO)
        .update(data)
        .digest();
}
exports.nodeSha256 = nodeSha256;
function nodeSha512(data) {
    return crypto_1.default
        .createHash(constants_1.SHA512_NODE_ALGO)
        .update(data)
        .digest();
}
exports.nodeSha512 = nodeSha512;
function nodeRipemd160(data) {
    return crypto_1.default
        .createHash(constants_1.RIPEMD160_NODE_ALGO)
        .update(data)
        .digest();
}
exports.nodeRipemd160 = nodeRipemd160;
//# sourceMappingURL=node.js.map