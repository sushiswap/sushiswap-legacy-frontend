"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const uuidv4 = function () {
    return uuid_1.v4();
};
exports.uuid = uuidv4;
const regex = {
    v4: /(?:^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}$)|(?:^0{8}-0{4}-0{4}-0{4}-0{12}$)/u,
    v5: /(?:^[a-f0-9]{8}-[a-f0-9]{4}-5[a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}$)|(?:^0{8}-0{4}-0{4}-0{4}-0{12}$)/u
};
exports.regex = regex;
const isUuid = function (value) {
    return regex.v4.test(value) || regex.v5.test(value);
};
exports.isUuid = isUuid;
const empty = function () {
    return '00000000-0000-0000-0000-000000000000';
};
exports.empty = empty;
const fromString = function (text) {
    const namespace = 'bb5d0ffa-9a4c-4d7c-8fc2-0a7d2220ba45';
    const uuidFromString = uuid_1.v5(text, namespace);
    return uuidFromString;
};
exports.fromString = fromString;
