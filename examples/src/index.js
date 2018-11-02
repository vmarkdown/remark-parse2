const unified = require('unified');
const markdown = require('../../index');
const html = require('remark-html');

const processor = unified()
    .use(markdown, {
        position: true,
        gfm: true,
        commonmark: false,
        footnotes: true,
        pedantic: false
    })
    .use(html);

const md = require('./md/test.md');

// (async ()=>{
//
//     console.time('parse');
//     const mdast = processor.parse(md);
//     console.timeEnd('parse');
//
//
//     console.time('process');
//     const file = await processor.process(md);
//     console.timeEnd('process');
//
//     document.getElementById('app').innerHTML = file.contents;
//
//     console.log(mdast);
//
//
//
//
// })();

(async ()=>{

    console.time('process');

    for(var i=0;i<100;i++){
        var file = marked.lexer(md);
    }

    console.timeEnd('process');

    document.getElementById('app').innerHTML = JSON.stringify(file,null, 2);

    console.log(file);

})();


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





