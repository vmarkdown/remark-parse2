"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var REG = /^\s+/;
var whitespace = function () {
    return function (eat, value) {
        var matches = value.match(REG);
        if (matches) {
            var subvalue = matches[0];
            return eat(subvalue, 'whitespace', void 0, { length: subvalue.length });
        }
        return;
    };
};
exports.default = whitespace;
