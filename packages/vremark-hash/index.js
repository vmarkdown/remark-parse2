// var visit = require('unist-util-visit');
var util = require('../util/util');
var data = require('../unist-util-data');

function createPositionValue(node) {
    return [
        node.position.start.line,
        node.position.start.column,
        node.position.end.line,
        node.position.end.column
    ].join('-');
}

function getValues(node) {
    var values = [];
    switch (node.type) {
        case 'root': {
            break;
        }
        case 'paragraph': {
            break;
        }
        case 'heading': {
            values.push(node.depth);
            break;
        }
        case 'thematicBreak': {
            values.push(createPositionValue(node));
            break;
        }
        case 'blockquote': {
            break;
        }
        case 'list': {
            values.push(node.ordered);
            values.push(node.start);
            values.push(node.spread);
            break;
        }
        case 'listItem': {
            values.push(node.checked);
            values.push(node.spread);
            break;
        }
        case 'table': {
            if(node.align && node.align.length > 0){
                values.push(node.align.join('-'));
            }
            break;
        }
        case 'tableRow': {
            break;
        }
        case 'tableCell': {
            break;
        }
        case 'html': {
            values.push(node.value);
            break;
        }
        case 'code': {
            values.push(node.lang);
            values.push(node.meta);
            values.push(node.value);
            break;
        }
        case 'yaml': {
            values.push(node.value);
            break;
        }
        case 'definition': {
            values.push(node.identifier);
            values.push(node.label);
            values.push(node.url);
            values.push(node.title);
            break;
        }
        case 'footnoteDefinition': {
            values.push(node.identifier);
            values.push(node.label);
            break;
        }
        case 'text': {
            values.push(node.value);
            break;
        }
        case 'emphasis': {
            break;
        }
        case 'strong': {
            break;
        }
        case 'delete': {
            break;
        }
        case 'inlineCode': {
            values.push(node.value);
            break;
        }
        case 'break': {
            values.push(createPositionValue(node));
            break;
        }
        case 'link': {
            values.push(node.url);
            values.push(node.title);
            break;
        }
        case 'image': {
            values.push(node.url);
            values.push(node.title);
            values.push(node.alt);
            break;
        }
        case 'linkReference': {
            values.push(node.identifier);
            values.push(node.label);
            values.push(node.referenceType);
            break;
        }
        case 'imageReference': {
            values.push(node.identifier);
            values.push(node.label);
            values.push(node.referenceType);
            values.push(node.alt);
            break;
        }
        case 'footnoteReference': {
            values.push(node.identifier);
            values.push(node.label);
            break;
        }
        default: {
            // node.value && values.push(node.value);
            // values.push(createPostionValue(node));
        }
    }
    return values;
}

function createUniqueHash(hash, map) {
    if(!map[hash]) {
        map[hash] = 1;
    }
    else{
        var nhash = hash;
        while (map[nhash]) {
            map[hash] = map[hash] + 1;
            nhash = nhash + map[hash];
        }
        hash = nhash;
        map[hash] = 1;
    }
    return hash;
}

function all(nodes, map) {
    var hashs = [];

    for(var i=0;i<nodes.length;i++) {

        var node = nodes[i];

        var h = one(node, map);

        hashs.push(h);

    }

    var hash = hashs.reduce(function (a, b) {
        return a+b;
    });

    return hash;
}

function one(node, map) {

    var hashs = [0];
    var values = getValues(node);

    if(values.length>0){
        var hash0 = util.hash(values.join('-'));
        hashs.push(hash0);
    }

    if(node.children && node.children.length>0){
        var hash1 = all(node.children, map);
        hashs.push(hash1);
    }

    var hash = hashs.reduce(function (a, b) {
        return a+b;
    });

    hash = createUniqueHash(hash, map);

    // node.hash = createUniqueHash(hash, map);
    // if(node.type !== 'root') {
    //     data(node, {
    //         hash: hash
    //     });
    // }
    // node.hash = hash;
    data(node, {
        hash: hash
    });


    return hash;
}

module.exports = function plugin(options = {}) {
    return function transformer(root) {
        var map = {};
        console.time('hash');
        one(root, map);
        console.timeEnd('hash');
    };
};