"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var REG = /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/;
var inlineCode = function () {
    // tslint:disable only-arrow-functions
    var tokenizer = function (eat, value) {
        var matches = value.match(REG);
        if (matches) {
            return eat(matches[0], 'inlineCode', void 0, {
                value: matches[2],
                wrap: matches[1],
            });
        }
        return;
    };
    return tokenizer;
};
exports.default = inlineCode;
