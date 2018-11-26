var visit = require('unist-util-visit');
var remove = require('unist-util-remove');

var attributeName = '[a-zA-Z_:][a-zA-Z0-9:._-]*';
var unquoted = '[^"\'=<>`\\u0000-\\u0020]+';
var singleQuoted = "'[^']*'";
var doubleQuoted = '"[^"]*"';
var attributeValue =
    '(?:' + unquoted + '|' + singleQuoted + '|' + doubleQuoted + ')';
var attribute =
    '(?:\\s+' + attributeName + '(?:\\s*=\\s*' + attributeValue + ')?)';
var openTag = '<[A-Za-z][A-Za-z0-9\\-]*' + attribute + '*\\s*\\/?>';
var closeTag = '<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>';
var comment = '<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->';
var processing = '<[?].*?[?]>';
var declaration = '<![A-Za-z]+\\s+[^>]*>';
var cdata = '<!\\[CDATA\\[[\\s\\S]*?\\]\\]>';

var openTagRegExp = new RegExp(openTag);
var closeTagRegExp = new RegExp(closeTag);
var strictCloseTagRegExp = new RegExp('^'+closeTag);

function findNextNode(children, from, tagName) {
    const equalTagName = '</'+tagName+'>';

    for(let i=from;i<children.length;i++) {

        const node = children[i];

        if(node.type === 'raw') {

            const value = node.value;

            if(isCloseTag(value) && equalCloseTag(equalTagName, value)) {

                return {
                    index: i,
                    node: node
                }

            }


        }

    }


    return null;


}

var parseHTML = require('./parse-html');

function isOpenTag(str) {
    return openTagRegExp.test(str);
}

function isCloseTag(str, strict) {
    if(strict) {
        return strictCloseTagRegExp.test(str);
    }
    return closeTagRegExp.test(str);
}

function equalCloseTag(tagName, str) {
    // return tagName === str.replace(/[\r\n]\s*$/g, '');
    var match0 = tagName.match(closeTag);
    var match1 = str.match(closeTag);
    if(match0 && match1){
        return match0[0].replace(/[ |<|\/|>]/g, '') === match1[0].replace(/[ |<|\/|>]/g, '');
    }
    return false;
}

function getList(root) {

    const children = root.children;

    let index = 0;

    const list = [];

    if(!children || children.length === 0){
        return list;
    }

    while (index<children.length) {

        const node = children[index];

        if(node.type === 'raw') {

            const value = node.value;

            if(isOpenTag(value)) {

                const hast = parseHTML(value);

                let next = null;

                if(isCloseTag(value)){
                    next = {
                        index: index,
                        node: node
                    };
                }
                else{
                    next = findNextNode(children, index+1, hast.tagName);
                }

                if(next) {
                    list.push({
                        start: {
                            hast: hast,
                            index: index,
                            node: node
                        },
                        end: next
                    });

                    index = next.index + 1;
                    continue;
                }

            }

        }

        index++;
    }

    return list;
}

function getChildren(children, from, to) {
    const nodes = [];
    for (let i=from;i<=to;i++) {
        nodes.push(children[i]);
    }
    return nodes;
}

function createPosition(start, end) {
    return {
        start: start.position.start,
        end: end.position.end
    }
}

function processLevel0(root){
    // console.log('start===============');

    const children = root.children;

    const list = getList(root);

    for(let i=0;i<list.length;i++) {

        const node = list[i];

        const create = node.start.hast;
        const position = createPosition(node.start.node, node.end.node);
        create.position = position;

        for(let j=node.start.index;j<=node.end.index;j++) {
            // children[j].__remove__ = true;
            // const cloneNode = Object.assign({}, children[j]);
            // children[j].__remove__ = true;

            if(j===node.start.index) {
                continue;
            }

            children[j].__remove__ = true;

            if(j===node.end.index) {
                continue;
            }

            create.children.push(children[j]);
        }

        Object.assign(node.start.node, create);
        delete node.start.node.value;
    }

    root.children = root.children.filter(function (node) {
        return !node.__remove__;
    });

    // console.log(children);

    // console.log('end===============');

    // visit(root, 'raw', function (node) {
    //     node.type = 'text';
    // });


}

function processLevel1(root){

    remove(root, function (node) {
        return !!(node.type === 'raw' && isCloseTag(node.value, true));
    });


    visit(root, 'raw', function (node) {
        // node.type = 'text';
        const value = node.value;

        const hast = parseHTML(value);

        const position = node.position;

        Object.assign(node, hast);

        node.position = position;

    });

}


function cleanRemove(root) {
    root && visit(root, function (node) {
        if( node.hasOwnProperty('__remove__')){
            delete node.__remove__;
        }
    });
}

function process(root, depth){

    if(depth > 1) return;

    if(!root.children){
        return;
    }

    const children = root.children;

    const list = getList(root);

    for(let i=0;i<list.length;i++) {

        const node = list[i];

        const create = node.start.hast;
        const position = createPosition(node.start.node, node.end.node);
        create.position = position;

        for(let j=node.start.index;j<=node.end.index;j++) {
            // children[j].__remove__ = true;
            // const cloneNode = Object.assign({}, children[j]);
            // children[j].__remove__ = true;

            if(j===node.start.index) {
                continue;
            }

            children[j].__remove__ = true;

            if(j===node.end.index) {
                continue;
            }

            create.children.push(children[j]);
        }

        Object.assign(node.start.node, create, {});
        // cleanRemove(node.start.node);
        delete node.start.node.value;
    }

    root.children = root.children.filter(function (node) {
        return !node.__remove__;
    });

    cleanRemove(root);

    for(let m = 0;m<root.children.length;m++) {
        const node0 = root.children[m];
        // if(!node0.children) {
        //     continue;
        // }
        process(node0, depth + 1);
        // for(let n = 0;n<node0.children.length;n++) {
        //     const node1 = node0.children[n];
        //     process(node1, depth + 1);
        // }
    }

}


module.exports = function plugin(options = {}) {

    return function transform(root) {
        // processLevel0(root);
        // processLevel1(root);
        process(root, 0);
        return root;
    }
};