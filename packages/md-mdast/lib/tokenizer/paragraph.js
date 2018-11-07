"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var regex_1 = require("../regex");
// tslint:disable only-arrow-functions, no-invalid-this
var paragraph = function (eat, value) {
    var matches = value.match(regex_1.paragraph);
    return matches ? eat(matches[0], 'paragraph', this.tokenizeInline(matches[1].trim())) : void 0;
};
exports.default = paragraph;
