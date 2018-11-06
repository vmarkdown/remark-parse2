"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var REG = /^~~(?=\S)([\s\S]*?\S)~~/;
var deletedText = function () {
    // tslint:disable only-arrow-functions, no-invalid-this
    var tokenizer = function (eat, value) {
        var matches = value.match(REG);
        if (matches) {
            return eat(matches[0], 'delete', this.tokenizeInline(matches[1]));
        }
        return;
    };
    return tokenizer;
};
exports.default = deletedText;
