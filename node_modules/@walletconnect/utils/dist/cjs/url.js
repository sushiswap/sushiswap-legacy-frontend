"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getQueryString(url) {
    const pathEnd = url.indexOf("?") !== -1 ? url.indexOf("?") : undefined;
    const queryString = typeof pathEnd !== "undefined" ? url.substr(pathEnd) : "";
    return queryString;
}
exports.getQueryString = getQueryString;
function appendToQueryString(queryString, newQueryParams) {
    let queryParams = parseQueryString(queryString);
    queryParams = Object.assign(Object.assign({}, queryParams), newQueryParams);
    queryString = formatQueryString(queryParams);
    return queryString;
}
exports.appendToQueryString = appendToQueryString;
function parseQueryString(queryString) {
    const result = {};
    const pairs = (queryString[0] === "?" ? queryString.substr(1) : queryString).split("&");
    for (let i = 0; i < pairs.length; i++) {
        const keyArr = pairs[i].match(/\w+(?==)/i) || [];
        const valueArr = pairs[i].match(/=.+/i) || [];
        if (keyArr[0]) {
            result[decodeURIComponent(keyArr[0])] = decodeURIComponent(valueArr[0].substr(1));
        }
    }
    return result;
}
exports.parseQueryString = parseQueryString;
function formatQueryString(queryParams) {
    let result = "";
    const keys = Object.keys(queryParams);
    if (keys) {
        keys.forEach((key, idx) => {
            const value = queryParams[key];
            if (idx === 0) {
                result = `?${key}=${value}`;
            }
            else {
                result = result + `&${key}=${value}`;
            }
        });
    }
    return result;
}
exports.formatQueryString = formatQueryString;
//# sourceMappingURL=url.js.map