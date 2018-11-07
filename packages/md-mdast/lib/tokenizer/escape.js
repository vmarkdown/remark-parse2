"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var REG = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
var escape = function (eat, value) {
    var matches = value.match(REG);
    return matches ? eat(matches[0], 'text', void 0, { value: matches[1] }) : void 0;
};
exports.default = escape;
