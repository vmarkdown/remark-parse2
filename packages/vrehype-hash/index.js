var visit = require('unist-util-visit');
var util = require('../util/util');
var data = require('../unist-util-data');

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

    if(node.tagName === 'hr' && node.children.length === 0){
        return 0;
    }

    var hashs = [];

    // if(node.hasOwnProperty('value') || node.hasOwnProperty('url')){
    //     var value0 = node.value || node.url;
    //     var hash0 = util.hash(String(value0));
    //     hashs.push(hash0);
    // }

    let values = [];
    if(node.hasOwnProperty('value')){
        values.push(node.value);
    }
    if(node.data && node.data.attrs){
        const attrs = node.data.attrs;
        attrs.href && values.push(attrs.href);
        attrs.src && values.push(attrs.src);
        attrs.alt && values.push(attrs.alt);
        attrs.title && values.push(attrs.title);
    }

    if(values.length > 0){
        var value0 = values.join('');
        var hash0 = util.hash(String(value0));
        hashs.push(hash0);
    }

    if(node.children && node.children.length>0){
        var hash1 = all(node.children, map);
        hashs.push(hash1);
    }

    if(hashs.length === 0 && node.position) {
        var value2 =
            node.position.start.line + ':' + node.position.start.column
            + '-'
            + node.position.end.line + ':' + node.position.end.column;
        var hash2 = util.hash(value2);
        hashs.push(hash2);
    }

    var hash = hashs.length>0 ? hashs.reduce(function (a, b) {
        return a+b;
    }): 0;

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

    // node.hash = hash;

    if(node.type !== 'root') {
        // data(node, {
        //     hash: hash
        // });
        node.hash = hash;
    }

    return hash;

}

module.exports = function hashid(options = {}) {
    return function transformer(root) {
        console.time('hash');
        var map = {};
        one(root, map);
        console.timeEnd('hash');
    };
};