"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var REG = /^__([^\s][\s\S]*?[^\s])__(?!_)|^\*\*([^\s][\s\S]*?[^\s])\*\*(?!\*)|^__([^\s])__(?!_)|^\*\*([^\s])\*\*(?!\*)/;
// tslint:disable only-arrow-functions, no-invalid-this
var strong = function (eat, value) {
    var matches = value.match(REG);
    if (matches) {
        var subvalue = matches[4] || matches[3] || matches[2] || matches[1];
        return eat(matches[0], 'strong', this.tokenizeInline(subvalue));
    }
    return;
};
exports.default = strong;
