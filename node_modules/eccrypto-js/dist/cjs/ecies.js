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
const aes_1 = require("./aes");
const ecdh_1 = require("./ecdh");
const ecdsa_1 = require("./ecdsa");
const hmac_1 = require("./hmac");
const random_1 = require("./random");
const sha2_1 = require("./sha2");
const constants_1 = require("./constants");
const helpers_1 = require("./helpers");
function getSharedKey(privateKey, publicKey) {
    publicKey = ecdsa_1.decompress(publicKey);
    return ecdh_1.derive(privateKey, publicKey);
}
function getEncryptionKey(hash) {
    return Buffer.from(hash.slice(constants_1.LENGTH_0, constants_1.KEY_LENGTH));
}
function getMacKey(hash) {
    return Buffer.from(hash.slice(constants_1.KEY_LENGTH));
}
function getEciesKeys(privateKey, publicKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const sharedKey = getSharedKey(privateKey, publicKey);
        const hash = yield sha2_1.sha512(sharedKey);
        return { encryptionKey: getEncryptionKey(hash), macKey: getMacKey(hash) };
    });
}
function getEciesKeysSync(privateKey, publicKey) {
    const sharedKey = getSharedKey(privateKey, publicKey);
    const hash = sha2_1.sha512Sync(sharedKey);
    return { encryptionKey: getEncryptionKey(hash), macKey: getMacKey(hash) };
}
function getEphemKeyPair(opts) {
    var _a, _b;
    let ephemPrivateKey = ((_a = opts) === null || _a === void 0 ? void 0 : _a.ephemPrivateKey) || random_1.randomBytes(constants_1.KEY_LENGTH);
    while (!helpers_1.isValidPrivateKey(ephemPrivateKey)) {
        ephemPrivateKey = ((_b = opts) === null || _b === void 0 ? void 0 : _b.ephemPrivateKey) || random_1.randomBytes(constants_1.KEY_LENGTH);
    }
    const ephemPublicKey = ecdsa_1.getPublic(ephemPrivateKey);
    return { ephemPrivateKey, ephemPublicKey };
}
function encrypt(publicKeyTo, msg, opts) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const { ephemPrivateKey, ephemPublicKey } = getEphemKeyPair(opts);
        const { encryptionKey, macKey } = yield getEciesKeys(ephemPrivateKey, publicKeyTo);
        const iv = ((_a = opts) === null || _a === void 0 ? void 0 : _a.iv) || random_1.randomBytes(constants_1.IV_LENGTH);
        const ciphertext = yield aes_1.aesCbcEncrypt(iv, encryptionKey, msg);
        const dataToMac = helpers_1.concatBuffers(iv, ephemPublicKey, ciphertext);
        const mac = yield hmac_1.hmacSha256Sign(macKey, dataToMac);
        return { iv, ephemPublicKey, ciphertext, mac: mac };
    });
}
exports.encrypt = encrypt;
function decrypt(privateKey, opts) {
    return __awaiter(this, void 0, void 0, function* () {
        const { ephemPublicKey, iv, mac, ciphertext } = opts;
        const { encryptionKey, macKey } = yield getEciesKeys(privateKey, ephemPublicKey);
        const dataToMac = helpers_1.concatBuffers(iv, ephemPublicKey, ciphertext);
        const macTest = yield hmac_1.hmacSha256Verify(macKey, dataToMac, mac);
        helpers_1.assert(macTest, constants_1.ERROR_BAD_MAC);
        const msg = yield aes_1.aesCbcDecrypt(opts.iv, encryptionKey, opts.ciphertext);
        return msg;
    });
}
exports.decrypt = decrypt;
function encryptSync(publicKeyTo, msg, opts) {
    var _a;
    const { ephemPrivateKey, ephemPublicKey } = getEphemKeyPair(opts);
    const { encryptionKey, macKey } = getEciesKeysSync(ephemPrivateKey, publicKeyTo);
    const iv = ((_a = opts) === null || _a === void 0 ? void 0 : _a.iv) || random_1.randomBytes(constants_1.IV_LENGTH);
    const ciphertext = aes_1.aesCbcEncryptSync(iv, encryptionKey, msg);
    const dataToMac = helpers_1.concatBuffers(iv, ephemPublicKey, ciphertext);
    const mac = hmac_1.hmacSha256SignSync(macKey, dataToMac);
    return { iv, ephemPublicKey, ciphertext, mac: mac };
}
exports.encryptSync = encryptSync;
function decryptSync(privateKey, opts) {
    return __awaiter(this, void 0, void 0, function* () {
        const { ephemPublicKey, iv, mac, ciphertext } = opts;
        const { encryptionKey, macKey } = getEciesKeysSync(privateKey, ephemPublicKey);
        const dataToMac = helpers_1.concatBuffers(iv, ephemPublicKey, ciphertext);
        const macTest = hmac_1.hmacSha256VerifySync(macKey, dataToMac, mac);
        helpers_1.assert(macTest, constants_1.ERROR_BAD_MAC);
        const msg = aes_1.aesCbcDecryptSync(opts.iv, encryptionKey, opts.ciphertext);
        return msg;
    });
}
exports.decryptSync = decryptSync;
function serialize(opts) {
    const ephemPublicKey = ecdsa_1.compress(opts.ephemPublicKey);
    return helpers_1.concatBuffers(opts.iv, ephemPublicKey, opts.mac, opts.ciphertext);
}
exports.serialize = serialize;
function deserialize(buf) {
    const slice0 = constants_1.LENGTH_0;
    const slice1 = slice0 + constants_1.IV_LENGTH;
    const slice2 = slice1 + constants_1.PREFIXED_KEY_LENGTH;
    const slice3 = slice2 + constants_1.MAC_LENGTH;
    const slice4 = buf.length;
    return {
        iv: buf.slice(slice0, slice1),
        ephemPublicKey: ecdsa_1.decompress(buf.slice(slice1, slice2)),
        mac: buf.slice(slice2, slice3),
        ciphertext: buf.slice(slice3, slice4),
    };
}
exports.deserialize = deserialize;
//# sourceMappingURL=ecies.js.map