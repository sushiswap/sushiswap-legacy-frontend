"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const browser_1 = require("./browser");
function isBrowser() {
    return !!browser_1.getBrowerCrypto() && !!browser_1.getSubtleCrypto();
}
exports.isBrowser = isBrowser;
function isNode() {
    return (typeof process !== 'undefined' &&
        typeof process.versions !== 'undefined' &&
        typeof process.versions.node !== 'undefined');
}
exports.isNode = isNode;
//# sourceMappingURL=env.js.map