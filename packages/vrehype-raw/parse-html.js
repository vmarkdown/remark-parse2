var parse = require('rehype-parse');
var unified = require('unified');
var processor = unified().use(parse, {fragment: true});

function parseHTML(html) {
    const hast = processor.parse(html);
    if(hast.type === 'root' && hast.children.length > 0) {
        return hast.children[0];
    }
    return hast;
}



// var unified = require('unified');
// var markdown = require('remark-parse');
// var remark2rehype = require('remark-rehype');
// var raw = require('rehype-raw');
//
// function parseHTML(html) {
//     var processor = unified()
//         .use(markdown)
//         .use(remark2rehype, {allowDangerousHTML: true})
//         .use(raw);
//
//     var mdast = processor.parse(html);
//     var hast = processor.runSync(mdast);
//
//     if(hast.type === 'root' && hast.children.length > 0) {
//         return hast.children[0];
//     }
//
//     return hast;
// }


// console.dir(
//     parseHTML('<div class="note">\n' +
//     '\n' +
//     'A mix of *markdown* and <em>HTML</em>.\n' +
//     '\n' +
//     '</div>')
//
//
//     , {showHidden:true, depth:5}
//
// );

module.exports = parseHTML;
