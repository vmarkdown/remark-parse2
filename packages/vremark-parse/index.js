var paragraph = require('./paragraph');
module.exports = function plugin() {
    var Parser = this.Parser;
    var blockTokenizers = Parser.prototype.blockTokenizers;
    blockTokenizers.paragraph = paragraph;
    return function transformer() {}
};

