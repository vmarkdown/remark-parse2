var footnote = require('./footnote-definition');

module.exports = function plugin() {
    var Parser = this.Parser;
    var blockTokenizers = Parser.prototype.blockTokenizers;
    blockTokenizers['footnote'] = footnote;
    return function transformer() {}
};

