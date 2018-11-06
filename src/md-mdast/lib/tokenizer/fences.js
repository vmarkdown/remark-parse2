"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var REG = /^ *(`{3,}|~{3,})([^\s]*)\s*([^\n]*)\n([\s\S]*?)\s*\1 *(?:\n+|$)/;
// tslint:disable only-arrow-functions
var fences = function (eat, value) {
    var matches = value.match(REG);
    if (!matches) {
        return;
    }
    var subvalue = matches[0];
    var overrides = {
        value: matches[4] || matches[3],
        lang: matches[2] || '',
        meta: matches.length > 4 ? matches[3] : null,
    };
    return eat(subvalue, 'code', void 0, overrides);
};
exports.default = fences;
