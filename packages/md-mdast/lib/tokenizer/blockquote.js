"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var regex_1 = require("../regex");
// tslint:disable only-arrow-functions, no-invalid-this
var blockquote = function (eat, value) {
    var matches = value.match(regex_1.blockquote);
    if (!matches) {
        return;
    }
    var subvalue = matches[0];
    var innerValue = subvalue.replace(/^ *> ?/gm, '');
    var children = this.tokenizeChildBlock(innerValue);
    return eat(subvalue, 'blockquote', children);
};
exports.default = blockquote;
