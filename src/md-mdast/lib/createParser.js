"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable no-any
exports.token = function (value, type, children, overrides) {
    if (children instanceof Array) {
        if (children.length === 1) {
            // tslint:disable no-parameter-reassignment
            children = children[0];
        }
    }
    var tok = {
        type: type,
        raw: value,
        len: value.length,
    };
    if (children) {
        tok.children = children;
    }
    if (overrides) {
        Object.assign(tok, overrides);
    }
    return tok;
};
var eat = function (subvalue, type, children, overrides) {
    var tok = exports.token(subvalue, type, children, overrides);
    return tok;
};
exports.loop = function (parser, tokenizer, value) {
    var children = [];
    var end = value.length;
    var remaining = value;
    var length = 0;
    while (length < end) {
        var tok = tokenizer.call(parser, eat, remaining);
        if (tok) {
            children.push(tok);
            length += tok.len || 0;
            remaining = remaining.substr(tok.len);
        }
        else {
            if (!children.length) {
                return;
            }
        }
    }
    return children;
};
exports.first = function (tokenizers) {
    // tslint:disable no-shadowed-variable
    return function (eat, value) {
        for (var _i = 0, tokenizers_1 = tokenizers; _i < tokenizers_1.length; _i++) {
            var tokenizer = tokenizers_1[_i];
            var tok = tokenizer.call(this, eat, value);
            if (tok) {
                return tok;
            }
        }
    };
};
var smartypants = function (text) {
    return text
        .replace(/\.{3}/g, '\u2026')
        .replace(/\(C\)/gi, '©')
        .replace(/\(R\)/gi, '®')
        .replace(/\(TM\)/gi, '™')
        .replace(/\(P\)/g, '§')
        .replace(/\+\-/g, '±')
        .replace(/---/g, '\u2014')
        .replace(/--/g, '\u2013')
        .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018') // opening singles
        .replace(/'/g, '\u2019') // closing singles & apostrophes
        .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c') // opening doubles
        .replace(/"/g, '\u201d');
}; // closing doubles
var createParser = function (_a) {
    var inline = _a.inline, block = _a.block;
    var parser = {};
    parser.tokenizeInline = function (value) {
        var tokens = exports.loop(parser, exports.first(inline), value);
        if (!tokens) {
            return;
        }
        // MERGE ADJACENT TEXT TOKENS.
        var merged = [];
        var lastTextToken = null;
        // tslint:disable prefer-for-of
        for (var i = 0; i < tokens.length; i++) {
            var tok = tokens[i];
            if (tok.type === 'text') {
                tok.value = smartypants(tok.value);
                if (lastTextToken) {
                    lastTextToken.value += tok.value;
                    lastTextToken.len += tok.len;
                }
                else {
                    merged.push(tok);
                    lastTextToken = tok;
                }
            }
            else {
                merged.push(tok);
                lastTextToken = null;
            }
        }
        tokens = merged;
        return tokens.length === 1 ? tokens[0] : tokens;
    };
    parser.tokenizeBlock = function (value) {
        var tokens = exports.loop(parser, exports.first(block), value);
        if (!tokens) {
            return;
        }
        var children = [];
        for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
            var tok = tokens_1[_i];
            if (tok.type !== 'newline') {
                children.push(tok);
            }
        }
        return {
            type: 'root',
            children: children.length > 1 ? children : children[0],
            len: value.length,
        };
    };
    parser.tokenizeChildBlock = function (value) {
        var children = parser.tokenizeBlock(value);
        if (!children) {
            return children;
        }
        if (children.type === 'root') {
            children = children.children;
        }
        if (!children) {
            return children;
        }
        if (children instanceof Array) {
            if (children.length === 1) {
                return children[0];
            }
        }
        return children;
    };
    return parser;
};
exports.default = createParser;
