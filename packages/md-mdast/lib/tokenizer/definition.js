"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var regex_1 = require("../regex");
;
// tslint:disable only-arrow-functions
var definition = function (eat, value) {
    var matches = value.match(regex_1.def);
    if (!matches) {
        return void 0;
    }
    var subvalue = matches[0];
    return eat(subvalue, 'definition', void 0, {
        identifier: matches[1],
        title: matches[3] || null,
        url: matches[2],
    });
};
exports.default = definition;
