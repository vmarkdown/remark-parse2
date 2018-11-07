"use strict";
require("./definitions");
const MathTokenizer_1 = require("./MathTokenizer");
const InlineMathTokenizer_1 = require("./InlineMathTokenizer");
const transformer_1 = require("./transformer");
function attacher() {
    const Parser = this.Parser;
    const blockTokenizers = Parser.prototype.blockTokenizers;
    const blockMethods = Parser.prototype.blockMethods;
    blockTokenizers['math'] = MathTokenizer_1.default;
    blockMethods.splice(blockMethods.indexOf('paragraph'), 0, 'math');
    const inlineTokenizers = Parser.prototype.inlineTokenizers;
    const inlineMethods = Parser.prototype.inlineMethods;
    inlineTokenizers['inlineMath'] = InlineMathTokenizer_1.default;
    inlineMethods.splice(inlineMethods.indexOf('escape'), 0, 'inlineMath');
    return transformer_1.default;
}
module.exports = attacher;
