"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var regex_1 = require("../regex");
var REG = regex_1.replace(/^!?\[(label)\]\s*(\[([^\]]*)\])?/, { label: regex_1.label });
var reference = function (eat, value) {
    var matches = value.match(REG);
    if (matches) {
        var subvalue = matches[0];
        var isImage = subvalue[0] === '!';
        var type = isImage ? 'imageReference' : 'linkReference';
        var identifier = matches[3];
        var referenceType = 'full';
        var children = void 0;
        if (!identifier) {
            identifier = matches[1];
            referenceType = matches[2] ? 'collapsed' : 'shortcut';
        }
        var overrides = {
            identifier: identifier,
            referenceType: referenceType,
        };
        if (isImage) {
            overrides.alt = matches[1] || null;
        }
        else {
            children = this.tokenizeInline(matches[1]);
        }
        return eat(subvalue, type, children, overrides);
    }
    return;
};
exports.default = reference;
