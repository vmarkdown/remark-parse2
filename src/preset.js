// const markdown = require('../packages/remark-parse');
const markdown = require('remark-parse');
const footnote = require('../packages/vremark-footnote');
const breaks = require('remark-breaks');
const remark2rehype = require('remark-rehype');

// const math = require('../packages/remark-math');
const math = require('@paperist/remark-math');
const vmath = require('../packages/vremark-math');
const katex = require('../packages/vremark-katex');
// const raw = require('../packages/rehype-raw');
const raw = require('../packages/vrehype-raw');
const clean = require('../packages/rehype-clean');
const sanitize = require('rehype-sanitize');

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
    footnote,
    breaks,
    math, vmath,
    katex,


    function () {
        return function (root, file) {
            file.mdast = root;
        }
    },


    // rehype
    [remark2rehype, {
        allowDangerousHTML: true
    }],

    // function () {
    //     return function (root, file) {
    //         console.log('root1');
    //         console.log(root);
    //     }
    // },
    clean,

    raw,

    // clean,

    [sanitize, {
        "clobberPrefix": ""
    }],

    function () {
        return function (root, file) {
            file.hast = root;
        }
    },

    vdom
];
