const unified = require('unified');
const markdown = require('../../index');
const html = require('remark-html');
const visit = require('unist-util-visit');

// const processor = unified()
    // .use(markdown, {
    //     position: true,
    //     gfm: true,
    //     commonmark: false,
    //     footnotes: true,
    //     pedantic: false
    // })
    // .use(function (options) {
    //
    //     return function (root) {
    //         debugger
    //     }
    //
    // })
    // .use(html);

const fs = require('fs');
const md = fs.readFileSync('./md/large.md', 'utf-8');
// const md = require('./md/large.md');
const {create} = require('md-mdast');
const toHAST = require('mdast-util-to-hast');
const toHTML = require('hast-util-to-html');

const processor = create();

(async ()=>{
    // const parser = create();

    console.time('mdast');
    // var mdast = processor.parse(md);
    // const mdast = processor.parse(md);
    const mdast = processor.tokenizeBlock(md);
    console.timeEnd('mdast');
    // console.log(mdast);

    visit(mdast, function (node) {
        if(node.children && !Array.isArray(node.children)) {
            node.children = [node.children];
        }
    });


    console.time('hast');
    const hast = toHAST(mdast);
    console.timeEnd('hast');
    // console.log(hast);

    // console.time('remark parse');
    // var mdast = processor.parse(md);
    // const mdast1 = processor.parse(md);
    // console.timeEnd('remark parse');


    // console.time('process');
    // const file = await processor.process(md);
    // console.timeEnd('process');
    //

    visit(hast, function (node) {

        if(node.type === 'text' && !node.value) {
            node.value = '';
        }

        // if(node.children && !Array.isArray(node.children)) {
        //
        //     node.children = [node.children];
        // }

    });

    console.time('html');
    const html = toHTML(hast);
    console.timeEnd('html');

    // document.getElementById('app').innerHTML = html;

    // console.log(mdast);




})();

// (async ()=>{
//
//     console.time('process');
//
//     for(var i=0;i<100;i++){
//         var file = marked.lexer(md);
//     }
//
//     console.timeEnd('process');
//
//     document.getElementById('app').innerHTML = JSON.stringify(file,null, 2);
//
//     console.log(file);
//
// })();


// (async ()=>{
//
//     var MarkdownIt = markdownit;
//     var markdownIt = new MarkdownIt({
//         html:         true,        // Enable HTML tags in source
//         xhtmlOut:     false,        // Use '/' to close single tags (<br />).
//                                     // This is only for full CommonMark compatibility.
//         breaks:       true,        // Convert '\n' in paragraphs into <br>
//         langPrefix:   'language-',  // CSS language prefix for fenced blocks. Can be
//                                     // useful for external highlighters.
//         linkify:      true,        // Autoconvert URL-like text to links
//
//         // Enable some language-neutral replacement + quotes beautification
//         typographer:  false,
//
//         // Double + single quotes replacement pairs, when typographer enabled,
//         // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
//         quotes: '“”‘’',
//
//     });
//
//     console.time('process');
//     for(var i=0;i<100;i++){
//         var file = markdownIt.parse(md, {});
//     }
//     console.timeEnd('process');
//
//     document.getElementById('app').innerHTML = JSON.stringify(file,null, 2);
//
//     // console.log(file);
//
// })();





