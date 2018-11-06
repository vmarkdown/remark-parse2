"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var regex_1 = require("../regex");
var REG = new RegExp('^' + regex_1.urlInline.source);
var inlineLink = function (eat, value) {
    var matches = value.match(REG);
    if (matches) {
        var subvalue = matches[0];
        return eat(subvalue, 'inlineLink', void 0, {
            value: subvalue,
        });
    }
    return;
};
exports.default = inlineLink;
