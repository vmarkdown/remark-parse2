"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createRegexTokenizer = function (type, reg, childrenMatchIndex) {
    var tokenizer = function (eat, value) {
        var matches = value.match(reg);
        return matches ? eat(matches[0], type, this.tokenizeInline(matches[childrenMatchIndex])) : void 0;
    };
    return tokenizer;
};
exports.default = createRegexTokenizer;
