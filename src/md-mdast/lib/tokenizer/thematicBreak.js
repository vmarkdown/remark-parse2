"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var regex_1 = require("../regex");
// const REG = /^ *([-*_]{3,})\s*(?:\n+|$)/;
// tslint:disable only-arrow-functions
var thematicBreak = function (eat, value) {
    var matches = value.match(regex_1.hr);
    return matches ? eat(matches[0], 'thematicBreak', void 0, { value: matches[1] }) : void 0;
};
exports.default = thematicBreak;
