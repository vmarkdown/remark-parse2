"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inlineMath_1 = require("./peg/inlineMath");
const InlineMathLocator = (value, fromIndex) => {
    let location = value.indexOf('$', fromIndex);
    if (location === -1) {
        location = value.indexOf('\\(', fromIndex);
    }
    return location;
};
const InlineMathTokenizerFunction = (eat, value, silent) => {
    let result;
    try {
        result = inlineMath_1.parse(value);
    }
    catch (err) {
        return silent ? false : undefined;
    }
    if (silent) {
        return true;
    }
    const matchStr = value.substring(result.location.start.offset, result.location.end.offset);
    const node = {
        type: 'inlineMath',
        value: matchStr,
        math: result.math,
    };
    return eat(matchStr)(node);
};
const InlineMathTokenizer = Object.assign(InlineMathTokenizerFunction, {
    locator: InlineMathLocator,
    notInBlock: true,
    notInList: true,
    notInLink: true,
});
exports.default = InlineMathTokenizer;
