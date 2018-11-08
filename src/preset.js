const markdown = require('remark-parse');
const breaks = require('remark-breaks');
const remark2rehype = require('remark-rehype');
const math = require('../packages/remark-math');
const katex = require('../packages/remark-katex');
// const raw = require('../packages/rehype-raw');
const raw = require('../packages/vrehype-raw');
const clean = require('../packages/rehype-clean');
const vdom = require('../packages/rehype-vdom');

// exports.settings = {bullet: '*', fences: true};

exports.settings = {};


exports.plugins = [

    // remark
    [markdown, {
        position: true,
        gfm: true,
        commonmark: false,
        footnotes: true,
        pedantic: true
    }],
    breaks,
    math,
    katex,

    function () {
        return function (root, file) {
            // console.log('root0');
            console.log(root);


            // const children = root.children;
            //
            //
            // Object.assign(root,
            //
            //     {
            //         "type": "root",
            //         "children": [
            //             {
            //             "type": "heading",
            //             "depth": 3,
            //             "children": [{
            //                 "type": "text",
            //                 "value": "LaTeX 公式",
            //                 "position": {
            //                     "start": {"line": 1, "column": 5, "offset": 4},
            //                     "end": {"line": 1, "column": 13, "offset": 12},
            //                     "indent": []
            //                 }
            //             }],
            //             "position": {
            //                 "start": {"line": 1, "column": 1, "offset": 0},
            //                 "end": {"line": 1, "column": 13, "offset": 12},
            //                 "indent": []
            //             }
            //         },
            //             {
            //             "type": "paragraph",
            //             "children": [{
            //                 "type": "text",
            //                 "value": "可以创建行内公式，例如 ",
            //                 "position": {
            //                     "start": {"line": 3, "column": 1, "offset": 14},
            //                     "end": {"line": 3, "column": 13, "offset": 26},
            //                     "indent": []
            //                 }
            //             }, {
            //                 "type": "inlineMath",
            //                 "value": "$\\Gamma(n) = (n-1)!\\quad\\forall n\\in\\mathbb N$",
            //                 "math": "\\Gamma(n) = (n-1)!\\quad\\forall n\\in\\mathbb N",
            //                 "position": {
            //                     "start": {"line": 3, "column": 13, "offset": 26},
            //                     "end": {"line": 3, "column": 59, "offset": 72},
            //                     "indent": []
            //                 }
            //             }, {
            //                 "type": "text",
            //                 "value": "。或者块级公式：",
            //                 "position": {
            //                     "start": {"line": 3, "column": 59, "offset": 72},
            //                     "end": {"line": 3, "column": 67, "offset": 80},
            //                     "indent": []
            //                 }
            //             }],
            //             "position": {
            //                 "start": {"line": 3, "column": 1, "offset": 14},
            //                 "end": {"line": 3, "column": 67, "offset": 80},
            //                 "indent": []
            //             }
            //         },
            //             {
            //                 "type": "paragraph",
            //                 data: {
            //                     hName: 'div',
            //                     hProperties: {
            //                         style: {
            //                             color: 'red'
            //                         }
            //                     }
            //                 },
            //                 "position": {
            //                     "start": {"line": 5, "column": 1, "offset": 82},
            //                     "end": {"line": 5, "column": 25, "offset": 106},
            //                     "indent": []
            //                 },
            //                 children: [
            //                     {
            //                         "type": "math",
            //                         "value": "$$\tx = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} $$",
            //                         "math": "\tx = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} ",
            //                         "position": {
            //                             "start": {"line": 7, "column": 1, "offset": 108},
            //                             "end": {"line": 7, "column": 46, "offset": 153},
            //                             "indent": []
            //                         }
            //                     },
            //                 ]
            //             },
            //
            //             /*
            //             {
            //                 "type": "html",
            //                 "value": "<div style=\"color:red;\">",
            //                 "position": {
            //                     "start": {"line": 5, "column": 1, "offset": 82},
            //                     "end": {"line": 5, "column": 25, "offset": 106},
            //                     "indent": []
            //                 }
            //             },
            //             {
            //                 "type": "math",
            //                 "value": "$$\tx = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} $$",
            //                 "math": "\tx = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} ",
            //                 "position": {
            //                     "start": {"line": 7, "column": 1, "offset": 108},
            //                     "end": {"line": 7, "column": 46, "offset": 153},
            //                     "indent": []
            //                 }
            //             },
            //             {
            //                 "type": "html",
            //                 "value": "</div>",
            //                 "position": {
            //                     "start": {"line": 9, "column": 1, "offset": 155},
            //                     "end": {"line": 9, "column": 7, "offset": 161},
            //                     "indent": []
            //                 }
            //             },
            //             */
            //
            //             {
            //                 "type": "heading",
            //                 "depth": 4,
            //                 "children": [{
            //                     "type": "text",
            //                     "value": "h4",
            //                     "position": {
            //                         "start": {"line": 12, "column": 6, "offset": 169},
            //                         "end": {"line": 12, "column": 8, "offset": 171},
            //                         "indent": []
            //                     }
            //                 }],
            //                 "position": {
            //                     "start": {"line": 12, "column": 1, "offset": 164},
            //                     "end": {"line": 12, "column": 8, "offset": 171},
            //                     "indent": []
            //                 }
            //             }
            //         ],
            //         "position": {
            //             "start": {"line": 1, "column": 1, "offset": 0},
            //             "end": {"line": 12, "column": 8, "offset": 171}
            //         }
            //     }
            //
            // );






        }
    },

    // rehype
    [remark2rehype, {
        allowDangerousHTML: true
    }],

    function () {
        return function (root, file) {
            console.log('root1');
            console.log(root);
        }
    },

    clean,
    raw,

    // math,
    // katex,

    function () {
        return function (root, file) {
            // console.log('root2');
            // console.log(root);

            // root.children = [
            //     {
            //         type: "heading",
            //         depth: 3,
            //         position: {
            //             start: {
            //                 column: 1,
            //                 line: 1,
            //                 offset: 0
            //             },
            //             end: {
            //                 column: 13,
            //                 line: 1,
            //                 offset: 12
            //             }
            //         }
            //     }
            // ];

            // Object.assign(root, {"type":"root","children":[{"type":"heading","depth":3,"children":[{"type":"text","value":"LaTeX 公式","position":{"start":{"line":1,"column":5,"offset":4},"end":{"line":1,"column":13,"offset":12},"indent":[]}}],"position":{"start":{"line":1,"column":1,"offset":0},"end":{"line":1,"column":13,"offset":12},"indent":[]}},{"type":"paragraph","children":[{"type":"text","value":"可以创建行内公式，例如 ","position":{"start":{"line":3,"column":1,"offset":14},"end":{"line":3,"column":13,"offset":26},"indent":[]}},{"type":"inlineMath","value":"$\\Gamma(n) = (n-1)!\\quad\\forall n\\in\\mathbb N$","math":"\\Gamma(n) = (n-1)!\\quad\\forall n\\in\\mathbb N","position":{"start":{"line":3,"column":13,"offset":26},"end":{"line":3,"column":59,"offset":72},"indent":[]}},{"type":"text","value":"。或者块级公式：","position":{"start":{"line":3,"column":59,"offset":72},"end":{"line":3,"column":67,"offset":80},"indent":[]}}],"position":{"start":{"line":3,"column":1,"offset":14},"end":{"line":3,"column":67,"offset":80},"indent":[]}},{"type":"html","value":"<div style=\"color:red;\">","position":{"start":{"line":5,"column":1,"offset":82},"end":{"line":5,"column":25,"offset":106},"indent":[]}},{"type":"math","value":"$$\tx = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} $$","math":"\tx = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} ","position":{"start":{"line":7,"column":1,"offset":108},"end":{"line":7,"column":46,"offset":153},"indent":[]}},{"type":"html","value":"</div>","position":{"start":{"line":9,"column":1,"offset":155},"end":{"line":9,"column":7,"offset":161},"indent":[]}}],"position":{"start":{"line":1,"column":1,"offset":0},"end":{"line":10,"column":1,"offset":162}}});

        }
    },

    vdom
];
