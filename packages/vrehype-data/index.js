const visit = require('unist-util-visit');
const xtend = require('xtend');

function data(node, index, parent, options) {

    // if(!node.properties && !node.data) {
    //     return;
    // }

    let classes = (node.type === 'root')?['vremark-root']:[];

    const config = options.config || {};
    if(config[node.type]){
        if(config[node.type].tagName) {
            node.tagName = config[node.type].tagName;
        }
        if(config[node.type].class || config[node.type].className) {
            classes = classes.concat(config[node.type].class || config[node.type].className);
        }
    }

    node.data = node.data || {};

    if(node.data['class']){
        classes = classes.concat(node.data['class']);
    }

    const properties = Object.assign({}, node.properties);

    if(properties.style && (typeof properties.style === 'string')) {
        Object.assign(node.data, {
            style: properties.style
        });
    }

    if(properties.className) {
        classes = classes.concat(properties.className);
        delete properties.className;
    }

    if (node.type === 'root') {
        node.data.key = 'vremark-root';
        node.data.ref = 'vremark-root';
    }
    else if( node.hash ){
        node.data.ref = String(node.hash);
        if(node.tagName !== "br" && node.tagName !== "hr") {
            node.data.key = node.hash;
        }
    }

    if (Object.keys(properties).length > 0){
        node.data.attrs = node.data.attrs || {};
        Object.assign(node.data.attrs, properties);
    }

    if(node.properties) {
        delete node.properties;
    }

    if(Object.keys(classes).length > 0) {
        node.data['class'] = classes;
    }

}


module.exports = function plugin(options = {}) {
    var settings = xtend(options, this.data('settings'));

    return function transformer(root) {
        console.time('data');
        visit(root, function (node, index, parent) {
            data(node, index, parent, settings);
        });
        console.timeEnd('data');
    };
};


