// const markdown = require('../packages/remark-parse');
const markdown = require('remark-parse');
const vparse = require('../packages/vremark-parse');
const slug = require('remark-slug');

const externalLinks = require('../packages/remark-external-links');

const toc = require('../packages/vremark-toc');
// const codeMeta = require('../packages/vremark-code-meta');

const footnote = require('../packages/vremark-footnote');
const breaks = require('remark-breaks');
// const hash = require('../packages/vremark-hash');


const remark2rehype = require('../packages/remark-rehype');


const math = require('../packages/remark-math');

const raw = require('../packages/vrehype-raw');
const clean = require('../packages/rehype-clean');
const sanitize = require('../packages/rehype-sanitize');
const data = require('../packages/vrehype-data');
const hash = require('../packages/vrehype-hash');

// const vdom = require('../packages/rehype-vdom');

// exports.settings = {bullet: '*', fences: true};

// var merge = require('deepmerge').default;
// var gh = require('../packages/hast-util-sanitize/lib/github');
// var schema = merge(gh, {
//     "clobberPrefix": "",
//     tagNames: ['input', 'span', 'svg', 'rect'],
//     attributes: {
//         '*': ['className', 'style']
//     }
// });



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

    vparse,

    slug,

    [externalLinks, {/*,target: '_blank' rel: ['nofollow']*/}],

    [toc, {

    }],

    // codeMeta,

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
    math,
    breaks,

    //vmath,


    // plugins,

    // katex,
    // flowchart,
    // sequence,
    // mermaid,
    // g2,
    // chart,
    // resume,
    // highlight,

    // hash,

    // function () {
    //     return function (root, file) {
    //         debugger
    //         // file.mdast = root;
    //     }
    // },

    // rehype
    [remark2rehype, {
        allowDangerousHTML: true
    }],


    clean,

    // function () {
    //     return function (root, file) {
    //         console.log('hast0============');
    //         console.log(root);
    //     }
    // },

    raw,

    // function () {
    //     return function (root, file) {
    //         debugger
    //         // console.log('hast1============');
    //         // console.log(root);
    //     }
    // },


    // clean,


    // [sanitize, schema],

    // function () {
    //     return function (root, file) {
    //         // console.log('root1');
    //         // console.log(root);
    //         debugger
    //     }
    // },

    // hash,

    data,

    // function () {
    //     return function (root, file) {
    //         file.hast = root;
    //     }
    // },

    // vdom
];
