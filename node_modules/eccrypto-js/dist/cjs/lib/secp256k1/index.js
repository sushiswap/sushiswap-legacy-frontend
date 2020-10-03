"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const _secp256k1 = __importStar(require("secp256k1"));
const random_1 = require("../../random");
const constants_1 = require("../../constants");
const helpers_1 = require("../../helpers");
exports.secp256k1 = _secp256k1;
function secp256k1Compress(publicKey) {
    publicKey = helpers_1.sanitizePublicKey(publicKey);
    return exports.secp256k1.publicKeyConvert(publicKey, true);
}
exports.secp256k1Compress = secp256k1Compress;
function secp256k1Decompress(publicKey) {
    publicKey = helpers_1.sanitizePublicKey(publicKey);
    return exports.secp256k1.publicKeyConvert(publicKey, false);
}
exports.secp256k1Decompress = secp256k1Decompress;
function secp256k1GeneratePrivate() {
    let privateKey = random_1.randomBytes(constants_1.KEY_LENGTH);
    while (!secp256k1VerifyPrivateKey(privateKey)) {
        privateKey = random_1.randomBytes(constants_1.KEY_LENGTH);
    }
    return privateKey;
}
exports.secp256k1GeneratePrivate = secp256k1GeneratePrivate;
function secp256k1VerifyPrivateKey(privateKey) {
    return exports.secp256k1.privateKeyVerify(privateKey);
}
exports.secp256k1VerifyPrivateKey = secp256k1VerifyPrivateKey;
function secp256k1GetPublic(privateKey) {
    const result = exports.secp256k1.publicKeyCreate(privateKey, false);
    return result;
}
exports.secp256k1GetPublic = secp256k1GetPublic;
function secp256k1GetPublicCompressed(privateKey) {
    const result = exports.secp256k1.publicKeyCreate(privateKey, true);
    return result;
}
exports.secp256k1GetPublicCompressed = secp256k1GetPublicCompressed;
function secp256k1SignatureExport(sig) {
    return exports.secp256k1.signatureExport(sig);
}
exports.secp256k1SignatureExport = secp256k1SignatureExport;
function secp256k1SignatureImport(sig) {
    return exports.secp256k1.signatureImport(sig);
}
exports.secp256k1SignatureImport = secp256k1SignatureImport;
function secp256k1Sign(msg, privateKey, rsvSig = false) {
    const { signature, recovery } = exports.secp256k1.sign(msg, privateKey);
    return rsvSig
        ? helpers_1.concatBuffers(signature, helpers_1.exportRecoveryParam(recovery))
        : secp256k1SignatureExport(signature);
}
exports.secp256k1Sign = secp256k1Sign;
function secp256k1Recover(sig, msg, compressed = false) {
    if (helpers_1.isValidDERSignature(sig)) {
        throw new Error('Cannot recover from DER signatures');
    }
    const { signature, recovery } = helpers_1.sanitizeRSVSignature(sig);
    return exports.secp256k1.recover(msg, signature, recovery, compressed);
}
exports.secp256k1Recover = secp256k1Recover;
function secp256k1Verify(sig, msg, publicKey) {
    if (helpers_1.isValidDERSignature(sig)) {
        sig = secp256k1SignatureImport(sig);
    }
    sig = helpers_1.sanitizeRSVSignature(sig).signature;
    return exports.secp256k1.verify(msg, sig, publicKey);
}
exports.secp256k1Verify = secp256k1Verify;
function secp256k1Derive(publicKey, privateKey, compressed) {
    let result = exports.secp256k1.ecdhUnsafe(publicKey, privateKey, compressed);
    return helpers_1.trimLeft(result, constants_1.KEY_LENGTH);
}
exports.secp256k1Derive = secp256k1Derive;
//# sourceMappingURL=index.js.map