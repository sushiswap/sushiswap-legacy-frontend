"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
const env_1 = require("./lib/env");
const browser_1 = require("./lib/browser");
const node_1 = require("./lib/node");
const fallback_1 = require("./lib/fallback");
function randomBytes(length) {
    if (!helpers_1.isValidKeyLength(length)) {
        throw new Error(`randomBytes - invalid key length: ${length}`);
    }
    let result;
    if (env_1.isBrowser()) {
        result = browser_1.browserRandomBytes(length);
    }
    else if (env_1.isNode()) {
        result = node_1.nodeRandomBytes(length);
    }
    else {
        result = fallback_1.fallbackRandomBytes(length);
    }
    return result;
}
exports.randomBytes = randomBytes;
//# sourceMappingURL=random.js.map