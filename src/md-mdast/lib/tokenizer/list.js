"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var regex_1 = require("../regex");
var REG_BULLET = /^(\s*)([*+-]|\d\.)(\s{1,2}|\t)/;
var REG_LOOSE = /\n\n(?!\s*$)/;
var getParts = function (subvalue) {
    var parts = subvalue.match(regex_1.item);
    return parts;
};
// tslint:disable-next-line only-arrow-functions
var list = function (eat, value) {
    var matches = value.match(regex_1.list);
    if (!matches) {
        return;
    }
    var subvalue = matches[0];
    var parts = getParts(subvalue);
    // const [, ...parts] = subvalue.split(/^(?: *)(?:\-) [^\n]*(?:\n(?!\1\- )[^\n]*)*/gm);
    // const bullets = subvalue.match(REG_SPLIT);
    if (!parts) {
        return;
    }
    var length = parts.length;
    var children = [];
    var ordered = false;
    var start = null;
    var loose = false;
    for (var i = 0; i < length; i++) {
        var part = parts[i];
        var bulletMatch = part.match(REG_BULLET);
        // This should never happen.
        if (!bulletMatch) {
            return;
        }
        var sansBullet = part.substr(bulletMatch[0].length);
        // const indent = bulletMatch[1].length;
        var bulletMarker = bulletMatch[2];
        // const space = indent + bulletMarker.length;
        if (i === 0) {
            if (bulletMarker.length > 1) {
                ordered = true;
                start = parseInt(bulletMarker, 10);
            }
        }
        // Outdent
        var outdented = sansBullet.replace(/^ {1,4}/gm, '');
        // const outdented = part.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
        var partLoose = REG_LOOSE.test(sansBullet);
        if (partLoose) {
            loose = true;
        }
        children.push({
            type: 'listItem',
            loose: partLoose,
            checked: null,
            // tslint:disable-next-line no-invalid-this
            children: this.tokenizeChildBlock(outdented),
        });
    }
    return eat(subvalue, 'list', children, {
        ordered: ordered,
        start: start,
        loose: loose,
    });
};
exports.default = list;
