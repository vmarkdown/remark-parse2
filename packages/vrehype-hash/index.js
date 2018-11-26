var visit = require('unist-util-visit');
var util = require('../util/util');

function createPositionValue(node) {
    if(!node || !node.position) return 0;
    return [
        node.position.start.line,
        node.position.start.column,
        node.position.end.line,
        node.position.end.column
    ].join('-');
}

function getValues(node) {
    var values = [];

    node.hasOwnProperty('type') && values.push(node.type);
    node.hasOwnProperty('tagName') && values.push(node.tagName);
    node.hasOwnProperty('value') && values.push(node.value);
    node.hasOwnProperty('depth') && values.push(node.depth);
    node.hasOwnProperty('ordered') && values.push(node.ordered);
    node.hasOwnProperty('start') && values.push(node.start);
    node.hasOwnProperty('spread') && values.push(node.spread);
    node.hasOwnProperty('checked') && values.push(node.checked);
    node.hasOwnProperty('lang') && values.push(node.lang);
    node.hasOwnProperty('meta') && values.push(node.meta);
    node.hasOwnProperty('identifier') && values.push(node.identifier);
    node.hasOwnProperty('label') && values.push(node.label);
    node.hasOwnProperty('url') && values.push(node.url);
    node.hasOwnProperty('title') && values.push(node.title);
    node.hasOwnProperty('referenceType') && values.push(node.referenceType);
    node.hasOwnProperty('alt') && values.push(node.alt);

    if(node.align && node.align.length > 0){
        values.push(node.align.join('-'));
    }

    if(values.length === 0) {
        values.push(createPositionValue(node));
    }

    return values;
}


function all(nodes) {
    var hashs = [];

    for(var i=0;i<nodes.length;i++) {

        var node = nodes[i];

        var h = one(node);

        hashs.push(h);

    }

    var hash = hashs.reduce(function (a, b) {
        return a+b;
    });

    return hash;
}

function one(node) {

    var hashs = [0];

    if(node.children && node.children.length>0){
        var hash1 = all(node.children);
        hashs.push(hash1);
    }

    var values = getValues(node);
    if(values.length>0){
        var hash0 = util.hash(values.join('-'));
        hashs.push(hash0);
    }

    var hash = hashs.reduce(function (a, b) {
        return a+b;
    });

    node.hash = hash;

    return hash;
}

module.exports = function hashid(options = {}) {
    return function transformer(root) {
        console.time('hash');
        one(root);
        console.timeEnd('hash');
    };
};