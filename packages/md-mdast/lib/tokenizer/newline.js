"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var REG = /^\n+/;
// tslint:disable only-arrow-functions
var newline = function (eat, value) {
    var matches = value.match(REG);
    if (!matches) {
        return;
    }
    return matches ? eat(matches[0], 'newline') : void 0;
};
exports.default = newline;
