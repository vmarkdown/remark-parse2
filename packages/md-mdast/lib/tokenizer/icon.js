"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var icon = function (maxLength) {
    if (maxLength === void 0) { maxLength = 32; }
    var REG1 = new RegExp("^::([^'\\s:]{1," + maxLength + "}?)::");
    var REG2 = new RegExp("^:([^'\\s:]{1," + maxLength + "}?):");
    return function (eat, value) {
        var matches = value.match(REG1) || value.match(REG2);
        return matches ? eat(matches[0], 'icon', void 0, { emoji: matches[1] }) : void 0;
    };
};
exports.default = icon;
