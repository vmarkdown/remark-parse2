"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var regex_1 = require("../regex");
// tslint:disable-next-line only-arrow-functions
var html = function (eat, value) {
    var matches = value.match(regex_1.html);
    return matches ? eat(matches[0], 'html', void 0, { value: matches[0] }) : void 0;
};
exports.default = html;
