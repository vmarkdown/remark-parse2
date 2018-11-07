const markdown = require('remark-parse');
const breaks = require('remark-breaks');
const remark2rehype = require('remark-rehype');
const math = require('../packages/remark-math');
const katex = require('../packages/remark-katex');
const raw = require('../packages/rehype-raw');
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
    // breaks,
    math,
    katex,

    function () {
        return function (root, file) {
            console.log(root);
        }
    },

    // rehype
    [remark2rehype, {
        allowDangerousHTML: true
    }],

    function () {
        return function (root, file) {
            console.log(root);
        }
    },

    clean,
    raw,

    function () {
        return function (root, file) {
            console.log(root);
        }
    },

    vdom
];
