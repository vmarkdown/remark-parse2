const unified = require('unified');
// const markdown = require('../../index');
// const breaks = require('remark-breaks');

// const remark2rehype = require('remark-rehype');
// const remarkAlign = require('../../src/remark-align');
// const math = require('../../packages/remark-math');
// const katex = require('../../packages/remark-katex');
// const remove = require('unist-util-remove');
// const raw = require('rehype-raw');
const toVDom = require('../../packages/hast-util-to-vdom');
// const VDom = require('../../packages/rehype-vdom');
//
// const processor = unified()
//     .use(markdown, {
//         position: true,
//         gfm: true,
//         commonmark: false,
//         footnotes: true,
//         pedantic: true
//     })
//     .use(breaks)
//     .use(math)
//     .use(katex)
//     // .use(remarkAlign, {
//     //     left: 'text-left',
//     //     center: 'text-center',
//     //     right: 'text-right',
//     // })
//     /*
//     .use(function () {
//         return function (root, file) {
//             console.log(root);
//
//             var children = root.children;
//             var nodes = [];
//
//             for(var i=0;i<children.length;i++) {
//                 var node = children[i];
//                 node.index = i;
//                 if(node.type === 'html') {
//                     nodes.push(node);
//                 }
//             }
//
//             // console.log(nodes);
//             if(nodes.length < 2) {
//                 return root;
//             }
//
//             for(var j=0;j<nodes.length;j+=2) {
//                 var from = nodes[j];
//                 var to = nodes[j+1];
//
//
//                 const values = [];
//                 for(let k=from.index;k<=to.index;k++) {
//                     const node = children[k];
//
//                     if(node.value) {
//                         values.push(node.value);
//                     }
//                     else{
//                         const position = node.position;
//                         const v = md.substring(position.start.offset, position.end.offset);
//                         values.push(v);
//                     }
//
//                 }
//
//                 root.children.splice(from.index, to.index-from.index + 1, {
//                     type: 'html',
//                     position: {
//                         start: {
//                             line: 1
//                         },
//                         end: {
//                             line: 1
//                         }
//                     },
//                     value: values.join('')
//                 });
//
//                 // debugger
//
//             }
//
//             console.log(root);
//
//             return root;
//         }
//     })
//     */
//     .use(remark2rehype,{
//         allowDangerousHTML: true
//     })
//     .use(function () {
//         return function (root) {
//             remove(root, function (node) {
//                 return node.type === 'text' && node.value && node.value.codePointAt(0) === 10;
//             });
//             return root;
//         }
//     })
//     .use(raw)
//     .use(VDom);
//     // .use(function () {
//     //     return function (root) {
//     //         console.log(root);
//     //         return root;
//     //     }
//     // })
//
//     // .use(stringify);

const md = require('../md/test.md');

const Vue = require('vue').default;

const app = new Vue({
    el: '#app',
    methods: {
        update(hast) {
            this.hast = hast;
            this.$forceUpdate();
        }
    },
    render(h) {
        return this.hast?toVDom(this.hast, {h:h}): h('div', '=======');
    }
});



const parse = require('../../index');
const processor = unified().use(parse);


(async ()=>{

    // console.time('process');
    // const file = await processor.process(md);
    // const html = file.contents;
    // console.timeEnd('process');
    // document.getElementById('app').innerHTML = html;


    const mdast = processor.parse(md);
    const hast = await processor.run(mdast);

    console.log(hast);

    // const container = document.getElementById('app');
    // const html = toHTML(hast);
    // container.innerHTML = html;


    // console.log(vdom);
    app.update(hast);

})();


