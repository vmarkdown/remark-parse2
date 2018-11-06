"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var REG = /^(\s{4}[^\n]+\n*)+/;
// tslint:disable only-arrow-functions
var code = function (eat, value) {
    var matches = value.match(REG);
    if (!matches) {
        return;
    }
    var subvalue = matches[0];
    var overrides = {
        value: subvalue.replace(/^ {4}/gm, '').replace(/\n+$/, ''),
        lang: null,
    };
    return eat(subvalue, 'code', void 0, overrides);
};
exports.default = code;
