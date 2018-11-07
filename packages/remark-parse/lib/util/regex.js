"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replace = function (reg, map) {
    var source = reg.source;
    // tslint:disable forin
    for (var key in map) {
        source = source.replace(new RegExp(key, 'g'), map[key].source);
    }
    return new RegExp(source, reg.flags);
};
exports.label = /(?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?/;
exports.url = /\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?)/;
exports.title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;
exports.urlInline = /(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}(\.[a-z]{2,4})?\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=,\*]*)/;
exports.heading = /^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/;
exports.lheading = /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/;
exports.blockquote = /^( *>[^\n]+(\n(?!^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$))[^\n]+)*)+/;
exports.hr = /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/;
exports.bull = /(?:[*+-]|\d+\.)/;
exports.def = exports.replace(/^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/, {
    label: exports.label,
    title: exports.title,
});
exports.list = exports.replace(/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/, { bull: exports.bull, hr: exports.hr, def: exports.def });
exports.item = exports.replace(/^( *)(bull) [^\n]*(?:\n(?!\1\- )[^\n]*)*/gm, { bull: exports.bull });
exports.paragraph = exports.replace(/^((?:[^\n]+(\n(?!\s{0,3}bull))?)+)\n*/, { bull: exports.bull });
exports.comment = /<!--(?!-?>)[\s\S]*?-->/;
exports.tag = new RegExp('address|article|aside|base|basefont|blockquote|body|caption' +
    '|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption' +
    '|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe' +
    '|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option' +
    '|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr' +
    '|track|ul');
exports.html = exports.replace(new RegExp('^ {0,3}(?:' + // optional indentation
    '<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)' + // (1)
    '|comment[^\\n]*(\\n+|$)' + // (2)
    '|<\\?[\\s\\S]*?\\?>\\n*' + // (3)
    '|<![A-Z][\\s\\S]*?>\\n*' + // (4)
    '|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\n*' + // (5)
    '|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)' + // (6)
    '|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=\\h*\\n)[\\s\\S]*?(?:\\n{2,}|$)' + // (7) open tag
    '|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=\\h*\\n)[\\s\\S]*?(?:\\n{2,}|$)' + // (7) closing tag
    ')'), {
    comment: exports.comment,
    tag: exports.tag,
    attribute: / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/,
});
