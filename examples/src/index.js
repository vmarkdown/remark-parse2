const unified = require('unified');
const markdown = require('../../index');
const remark2rehype = require('remark-rehype');
// const remarkAlign = require('../../src/remark-align');
const math = require('../../src/remark-math');
// const math = require('@paperist/remark-math');

const katex = require('./katex.js');




const stringify = require('rehype-stringify');

// const html = require('remark-html');

const processor = unified()
    .use(markdown, {
        position: true,
        gfm: true,
        commonmark: false,
        footnotes: true,
        pedantic: false
    })
    .use(math)
    .use(katex)
    // .use(remarkAlign, {
    //     left: 'text-left',
    //     center: 'text-center',
    //     right: 'text-right',
    // })
    .use(function () {
        return function (root) {
            console.log(root);

            // var children = root.children;
            //
            // var fromIndex = -1;
            // var toIndex = -1;
            //
            // for(var i=0;i<children.length;i++) {
            //     var node = children[i];
            //
            //     if(node.type !== 'html') {
            //         continue;
            //     }
            //
            //     if(fromIndex < 0) {
            //         fromIndex = i;
            //     }
            //     else {
            //         toIndex = i;
            //     }
            //
            //     var newNode = {};
            //
            //
            //
            //
            //
            // }

            return root;
        }
    })
    .use(remark2rehype,{
        allowDangerousHTML: true
    })
    .use(function () {
        return function (root) {
            console.log(root);
            return root;
        }
    })

    .use(stringify);

const md = require('./md/test.md');

(async ()=>{

    console.time('process');
    const file = await processor.process(md);
    const html = file.contents;
    console.timeEnd('process');

    document.getElementById('app').innerHTML = html;


})();


