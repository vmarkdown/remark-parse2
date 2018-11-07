const visit = require('unist-util-visit')
const katex = require('katex')
const unified = require('unified')
const parse = require('rehype-parse')
// const position = require('unist-util-position')

function parseMathHtml(html) {
    return unified()
        .use(parse, {
            fragment: true,
            position: false
        })
        .parse(html)
}

function getSVG(value) {
    return new Promise(function (resolve, reject) {
        fetch('//tex.s2cms.ru/svg/'+value)
            .then(response => response.text())
            .then(data => {
                resolve(data);
            });
    });
}


module.exports = function plugin(opts = {}) {
    if (opts.throwOnError == null) opts.throwOnError = false
    return async function transform(root, file, next) {

        // async function renderContent(element) {
        //     let renderedValue;
        //     const isMath = element.type === 'math';
        //
        //     // function render(value) {
        //     //     const childAst = parseMathHtml(value).children[0];
        //     //     element.data = element.data || {};
        //     //     element.data.hChildren = [childAst];
        //     // }
        //
        //     try {
        //         renderedValue = katex.renderToString(element.math || element.value, {
        //             displayMode: isMath
        //         });
        //         // render(renderedValue);
        //     }
        //     catch (err) {
        //         /*
        //         if (opts.throwOnError) {
        //             throw err
        //         }
        //         else {
        //             file.message(
        //                 err.message,
        //                 position.start(element)
        //             )
        //
        //             try {
        //                 renderedValue = katex.renderToString(element.value, {
        //                     displayMode: isMath,
        //                     throwOnError: false,
        //                     errorColor: opts.errorColor
        //                 })
        //             } catch (err) {
        //                 renderedValue = '<code class="katex" style="color: ' + opts.errorColor + '">' + element.value + '</code>'
        //             }
        //         }
        //         */
        //
        //         ////tex.s2cms.ru/svg/f(x)
        //         // fetch('//tex.s2cms.ru/svg/'+element.math)
        //         //     .then(response => response.text())
        //         //     .then(data => {
        //         //         // debugger
        //         //         // console.log(data);
        //         //         render(data);
        //         //     });
        //
        //         const response = await fetch('//tex.s2cms.ru/svg/'+element.math);
        //         renderedValue = await response.text()
        //     }
        //
        //     const childAst = parseMathHtml(renderedValue).children[0];
        //     element.data = element.data || {};
        //     element.data.hChildren = [childAst]
        // }
        //
        //
        // function inlineMath() {
        //     return new Promise(function (resolve, reject) {
        //         visit(node, 'inlineMath', function (element) {
        //
        //         });
        //     });
        // }
        //
        // function math() {
        //     return new Promise(function (resolve, reject) {
        //
        //     });
        // }


        // visit(node, 'inlineMath', renderContent);
        // visit(node, 'math', renderContent);

        // next();

        // Promise.all([inlineMath(), math()]).then(function () {
        //
        //     debugger
        //     next();
        // });

        async function render(node) {
            let renderedValue;
            const isMath = node.type === 'math';

            try {
                renderedValue = katex.renderToString(node.math, {
                    displayMode: isMath
                });
            }
            catch (err) {
                const response = await fetch('//tex.s2cms.ru/svg/' + encodeURIComponent(node.math) );
                renderedValue = await response.text();
            }

            const childAst = parseMathHtml(renderedValue).children[0];
            node.data = node.data || {};
            node.data.hChildren = [childAst];
        }


        const nodes = [];

        visit(root, 'inlineMath', function (node) {
            nodes.push(node);
        });

        visit(root, 'math', function (node) {
            nodes.push(node);
        });


        for(var i=0;i<nodes.length;i++) {
            let node = nodes[i];

            await render(node);
            // const svg = await getSVG(node.math);
            // node.svg = svg;
            // const childAst = parseMathHtml(svg).children[0];
            // node.data = node.data || {};
            // node.data.hChildren = [childAst];
        }

        next();
        // return root;
    }
}