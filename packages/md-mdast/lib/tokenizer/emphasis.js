"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var REG = /^_([^\s][\s\S]*?[^\s_])_(?!_)|^_([^\s_][\s\S]*?[^\s])_(?!_)|^\*([^\s][\s\S]*?[^\s*])\*(?!\*)|^\*([^\s*][\s\S]*?[^\s])\*(?!\*)|^_([^\s_])_(?!_)|^\*([^\s*])\*(?!\*)/;
// tslint:disable only-arrow-functions, no-invalid-this
var emphasis = function (eat, value) {
    var matches = value.match(REG);
    if (matches) {
        var subvalue = matches[6] || matches[5] || matches[4] || matches[3] || matches[2] || matches[1];
        return eat(matches[0], 'emphasis', this.tokenizeInline(subvalue));
    }
    return;
};
exports.default = emphasis;
