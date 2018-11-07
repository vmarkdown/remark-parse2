"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var REG = /^\[\^([a-zA-Z0-9\-_]{1,64})\]/;
var footnoteReference = function (eat, value) {
    var matches = value.match(REG);
    if (matches) {
        return eat(matches[0], 'footnoteReference', void 0, { value: matches[1] });
    }
    return;
};
exports.default = footnoteReference;
