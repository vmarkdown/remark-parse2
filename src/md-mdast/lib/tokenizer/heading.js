"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var regex_1 = require("../regex");
// tslint:disable only-arrow-functions, no-invalid-this
var heading = function (eat, value) {
    var matches = value.match(regex_1.heading);
    if (matches) {
        var subvalue = matches[2];
        return eat(matches[0], 'heading', this.tokenizeInline(subvalue), {
            depth: matches[1].length,
        });
    }
    matches = value.match(regex_1.lheading);
    if (matches) {
        var subvalue = matches[1];
        return eat(matches[0], 'heading', this.tokenizeInline(subvalue), {
            depth: matches[2] === '-' ? 1 : 2,
        });
    }
    return;
};
exports.default = heading;
