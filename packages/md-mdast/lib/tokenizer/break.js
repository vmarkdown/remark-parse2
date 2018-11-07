"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var REG1 = /^\s{2,}\n(?!\s*$)/;
var REG2 = /^ *\\n/;
var inlineBreak = function (eat, value) {
    var matches = value.match(REG1) || value.match(REG2);
    return matches ? eat(matches[0], 'break') : void 0;
};
exports.default = inlineBreak;
