"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var REG = /^([#~@])(([\w\-_\.\/#]{1,64})|(\{([\w\-_\.\/#=\/ ]{1,64})\}))/;
var handle = function (eat, value) {
    var matches = value.match(REG);
    if (matches) {
        var subvalue = matches[5] || matches[2];
        return eat(matches[0], 'handle', void 0, {
            value: subvalue,
            prefix: matches[1],
        });
    }
    return;
};
exports.default = handle;
