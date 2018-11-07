"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var regex_1 = require("../regex");
var REG = new RegExp('^[\\s\\S]+?(?=[\\<!\\[_*`:~#@\\$\\^=\\+]| {2,}\\n|(' + regex_1.urlInline.source + ')|\\\\n|\\\\`|$)');
var text = function () {
    // tslint:disable only-arrow-functions
    var tokenizer = function (eat, value) {
        var matches = value.match(REG);
        if (matches) {
            var matchedValue = matches[0];
            return eat(matchedValue, 'text', void 0, { value: matchedValue });
        }
        return;
    };
    return tokenizer;
};
exports.default = text;
