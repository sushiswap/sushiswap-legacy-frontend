"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const js_sha3_1 = require("js-sha3");
const helpers_1 = require("./helpers");
function sha3(msg) {
    return helpers_1.hexToBuffer(js_sha3_1.sha3_256(msg));
}
exports.sha3 = sha3;
function keccak256(msg) {
    return helpers_1.hexToBuffer(js_sha3_1.keccak_256(msg));
}
exports.keccak256 = keccak256;
//# sourceMappingURL=sha3.js.map