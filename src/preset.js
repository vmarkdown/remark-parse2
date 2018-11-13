// const markdown = require('../packages/remark-parse');
const markdown = require('remark-parse');
const slug = require('remark-slug');

const externalLinks = require('../packages/remark-external-links');

const toc = require('../packages/vremark-toc');
const footnote = require('../packages/vremark-footnote');
const breaks = require('remark-breaks');
const hash = require('../packages/vremark-hash');

const remark2rehype = require('remark-rehype');

const math = require('../packages/remark-math');
// const math = require('@paperist/remark-math');
const vmath = require('../packages/vremark-math');
const katex = require('../packages/vremark-katex');
const flowchart = require('../packages/vremark-flowchart');
const sequence = require('../packages/vremark-sequence');
const mermaid = require('../packages/vremark-mermaid');
const g2 = require('../packages/vremark-g2');
const chart = require('../packages/vremark-chart');
const highlight = require('../packages/vremark-highlight');


// const raw = require('../packages/rehype-raw');
const raw = require('../packages/vrehype-raw');
const clean = require('../packages/rehype-clean');
const sanitize = require('rehype-sanitize');
const data = require('../packages/vrehype-data');
// const hash = require('../packages/vrehype-hash');

// const vdom = require('../packages/rehype-vdom');

// exports.settings = {bullet: '*', fences: true};

var merge = require('deepmerge').default;
var gh = require('hast-util-sanitize/lib/github');
var schema = merge(gh, {
    "clobberPrefix": "",
    tagNames: ['input'],
    attributes: {
        '*': ['className', 'style']
    }
});

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

    slug,

    [externalLinks, {/*,target: '_blank' rel: ['nofollow']*/}],

    [toc, {

    }],

    // function () {
    //     return function (root, file) {
    //
    //         // var result = toc(root);
    //         // root.children.push(result.map);
    //         // debugger
    //
    //
    //     }
    // },


    footnote,
    breaks,
    math, vmath,
    katex,

    flowchart,
    sequence,
    mermaid,
    g2,
    chart,
    highlight,

    hash,

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
    //         // console.log('root1');
    //         // console.log(root);
    //         debugger
    //     }
    // },
    clean,

    raw,

    // clean,



    [sanitize, schema],

    // function () {
    //     return function (root, file) {
    //         // console.log('root1');
    //         // console.log(root);
    //         debugger
    //     }
    // },

    // hash,

    data,

    function () {
        return function (root, file) {
            file.hast = root;
        }
    },

    // vdom
];
