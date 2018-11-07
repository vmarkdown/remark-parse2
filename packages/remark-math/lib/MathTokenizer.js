"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const math_1 = require("./peg/math");
const MathTokenizer = (eat, value, silent) => {
    let result;
    try {
        result = math_1.parse(value);
    }
    catch (err) {
        return silent ? false : undefined;
    }
    if (silent) {
        return true;
    }
    const matchStr = value.substring(result.location.start.offset, result.location.end.offset);
    const node = {
        type: 'math',
        value: matchStr,
        math: result.math,
    };
    return eat(matchStr)(node);
};
exports.default = MathTokenizer;
