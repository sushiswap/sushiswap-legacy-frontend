"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const encoding_1 = require("./encoding");
function isCompressed(publicKey) {
    return (publicKey.length === constants_1.KEY_LENGTH || publicKey.length === constants_1.PREFIXED_KEY_LENGTH);
}
exports.isCompressed = isCompressed;
function isDecompressed(publicKey) {
    return (publicKey.length === constants_1.DECOMPRESSED_LENGTH ||
        publicKey.length === constants_1.PREFIXED_DECOMPRESSED_LENGTH);
}
exports.isDecompressed = isDecompressed;
function isPrefixed(publicKey) {
    if (isCompressed(publicKey)) {
        return publicKey.length === constants_1.PREFIXED_KEY_LENGTH;
    }
    return publicKey.length === constants_1.PREFIXED_DECOMPRESSED_LENGTH;
}
exports.isPrefixed = isPrefixed;
function sanitizePublicKey(publicKey) {
    return isPrefixed(publicKey)
        ? publicKey
        : Buffer.from(`04${publicKey.toString('hex')}`, 'hex');
}
exports.sanitizePublicKey = sanitizePublicKey;
function exportRecoveryParam(recoveryParam) {
    return encoding_1.hexToBuffer(encoding_1.sanitizeHex((recoveryParam + 27).toString(16)));
}
exports.exportRecoveryParam = exportRecoveryParam;
function importRecoveryParam(v) {
    return encoding_1.hexToNumber(encoding_1.removeHexLeadingZeros(encoding_1.bufferToHex(v))) - 27;
}
exports.importRecoveryParam = importRecoveryParam;
function splitSignature(sig) {
    return {
        r: sig.slice(0, 32),
        s: sig.slice(32, 64),
        v: sig.slice(64, 65),
    };
}
exports.splitSignature = splitSignature;
function joinSignature(sig) {
    return encoding_1.concatBuffers(sig.r, sig.s, sig.v);
}
exports.joinSignature = joinSignature;
function isValidDERSignature(sig) {
    return encoding_1.bufferToHex(sig).startsWith('30') && sig.length > 65;
}
exports.isValidDERSignature = isValidDERSignature;
function sanitizeRSVSignature(sig) {
    return {
        signature: sig.slice(0, 64),
        recovery: importRecoveryParam(sig.slice(64, 65)),
    };
}
exports.sanitizeRSVSignature = sanitizeRSVSignature;
//# sourceMappingURL=util.js.map