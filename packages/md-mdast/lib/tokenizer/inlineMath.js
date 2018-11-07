"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var REG = /^\$\$(?=\S)([\s\S]*?\S)\$\$/;
var inlineMath = function () {
    var tokenizer = function (eat, value) {
        var matches = value.match(REG);
        if (matches) {
            return eat(matches[0], 'inlineMath', void 0, { value: matches[1] });
        }
        return;
    };
    return tokenizer;
};
exports.default = inlineMath;
