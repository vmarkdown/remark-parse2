/*
* fix parse inline math bug in footnote
* */

// const InlineMathTokenizer = Object.assign(InlineMathTokenizerFunction, {
//     locator: InlineMathLocator,
//     /* old start */
// /*notInBlock: true,*/
// /* old end */
//
// /* new start */
// notInBlock: false,
//     /* new end */
//
//     notInList: true,
//     notInLink: true,
// });


module.exports = function plugin() {
    var Parser = this.Parser;
    var inlineTokenizers = Parser.prototype.inlineTokenizers;
    if(inlineTokenizers.hasOwnProperty('inlineMath')) {
        var inlineMath = inlineTokenizers.inlineMath;
        inlineMath.notInBlock = false;
    }
    return function transformer() {}
};

