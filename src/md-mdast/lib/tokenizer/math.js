"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var REG = /^ *\$\$[ \.]*(\S+)? *\n([\s\S]*?)\s*\$\$ *(?:\n+|$)/;
// tslint:disable only-arrow-functions
var math = function (eat, value) {
    var matches = value.match(REG);
    return matches ? eat(matches[0], 'math', void 0, { value: matches[2] }) : void 0;
};
exports.default = math;
