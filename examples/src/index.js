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

const md = require('./test.md');

(async ()=>{

    console.time('parse');
    const mdast = processor.parse(md);
    console.timeEnd('parse');


    console.time('process');
    const file = await processor.process(md);
    console.timeEnd('process');

    document.getElementById('app').innerHTML = file.contents;

    console.log(mdast);



})();
