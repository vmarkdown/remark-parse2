// const markdown = require('../packages/remark-parse');
const markdown = require('remark-parse');
const vparse = require('../packages/vremark-parse');
const slug = require('remark-slug');

const externalLinks = require('../packages/remark-external-links');

const toc = require('../packages/vremark-toc');
// const codeMeta = require('../packages/vremark-code-meta');

const footnote = require('../packages/vremark-footnote');
const breaks = require('remark-breaks');
const hash = require('../packages/vremark-hash');


const remark2rehype = require('../packages/remark-rehype');


const math = require('../packages/remark-math');
// const math = require('@paperist/remark-math');
// const vmath = require('../packages/vremark-math');
// const katex = require('../packages/vremark-katex');
// const flowchart = require('../packages/vremark-flowchart');
// const sequence = require('../packages/vremark-sequence');
// const mermaid = require('../packages/vremark-mermaid');
// const g2 = require('../packages/vremark-g2');
// const chart = require('../packages/vremark-chart');
// const resume = require('../packages/vremark-resume');
// const highlight = require('../packages/vremark-highlight');

// const plugins = require('../packages/vremark-plugins');

// const raw = require('../packages/rehype-raw');
const raw = require('../packages/vrehype-raw');
const clean = require('../packages/rehype-clean');
const sanitize = require('../packages/rehype-sanitize');
const data = require('../packages/vrehype-data');
// const hash = require('../packages/vrehype-hash');

// const vdom = require('../packages/rehype-vdom');

// exports.settings = {bullet: '*', fences: true};

function allow(schema, value) {
    return value
}
var merge = require('deepmerge').default;
var gh = require('../packages/hast-util-sanitize/lib/github');
var schema = merge(gh, {
    "clobberPrefix": "",
    tagNames: ['input', 'span', 'svg', 'rect'],
    attributes: {
        '*': ['className', 'style']
    },
    NODES: {
        '*': {
            depth: allow,
            ordered: allow,
            start: allow,
            spread: allow,
            checked: allow,
            lang: allow,
            meta: allow,
            identifier: allow,
            label: allow,
            url: allow,
            title: allow,
            alt: allow,
            referenceType: allow,
        }
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
