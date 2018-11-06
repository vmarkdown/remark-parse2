"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var regex_1 = require("../regex");
var REG = regex_1.replace(/^!?\[(label)\]\(url(?:\s+(title))?\s*\)/, {
    label: regex_1.label,
    url: regex_1.url,
    title: regex_1.title,
});
var link = function () {
    return function (eat, value) {
        var matches = value.match(REG);
        if (matches) {
            var isImage = matches[0][0] === '!';
            var linkTitle = matches[3];
            if (linkTitle) {
                linkTitle = linkTitle.substr(1, linkTitle.length - 2);
            }
            if (isImage) {
                return eat(matches[0], 'image', void 0, {
                    url: matches[2],
                    alt: matches[1],
                    title: linkTitle,
                });
            }
            else {
                return eat(matches[0], 'link', this.tokenizeInline(matches[1]), {
                    url: matches[2],
                    title: linkTitle,
                });
            }
        }
        return;
    };
};
exports.default = link;
