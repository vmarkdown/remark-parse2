var visit = require('unist-util-visit');
var xtend = require('xtend');

function data(node, index, parent, options, plugin) {

    if(!plugin.component) {
        return;
    }

    if( node.tagName === "code" && parent.tagName === "pre" ) {
        Object.assign(parent, node);
        parent.type = 'element';
        parent.tagName = plugin.component;
        parent.children = [];
    }
    else {
        node.type = 'element';
        node.tagName = plugin.component;
    }

}

module.exports = function plugin(options = {}) {
    var settings = xtend(options, this.data('settings'));

    var plugins = settings.plugins || {};

    return function transformer(root) {
        console.time('plugins');
        visit(root, function (node) {
            return node.data && node.data.plugin && plugins[node.data.plugin];
        },function (node, index, parent) {
            data(node, index, parent, settings, plugins[node.data.plugin]);
        });
        console.timeEnd('plugins');
        return root;
    };
};














// var util = require('../util/util');
// var data = require('../unist-util-data');
// function all(nodes) {
//     for(var i=0;i<nodes.length;i++) {
//         one(nodes[i]);
//     }
// }
//
// function one(node, options) {
//
//     if( node.children && node.children.length > 0 ) {
//         all(node.children);
//     }
//
//     if(!node.properties && !node.data) {
//         return;
//     }
//
//     // const plugins = options.plugins || {};
//     node.data = node.data || {};
//
//     // if(node.data.plugin && plugins.hasOwnProperty(node.data.plugin)) {
//     //     const plugin = plugins[node.data.plugin];
//     //     if(plugin.component) {
//     //         node.type = 'component';
//     //         node.component = plugin.component;
//     //     }
//     // }
//
//     const properties = Object.assign({}, node.properties);
//
//     if(properties.style && (typeof properties.style === 'string')) {
//         Object.assign(node.data, {
//             style: properties.style
//         });
//         delete properties.style;
//     }
//
//     if(properties.className) {
//         node.data['class'] = [].concat(node.data['class']||'').concat(properties.className);
//         delete properties.className;
//     }
//
//     if (node.type !== 'root' && node.data.hasOwnProperty('hash')){
//         node.data.attrs = node.data.attrs || {};
//         if(!node.data.attrs.hasOwnProperty('id')) {
//             node.data.attrs.id = node.data.hash;
//         }
//         node.data.key = node.data.hash;
//         delete node.data.hash;
//     }
//
//     if (Object.keys(properties).length > 0 ){
//         node.data.attrs = node.data.attrs || {};
//         Object.assign(node.data.attrs, properties);
//     }
//
//     if(node.type === 'root') {
//         node.data['class'] = ['root'].concat(node.data?node.data['class']:'');
//     }
//
// }

// module.exports = function plugin(options = {}) {
//     return function transformer(root) {
//         console.time('data');
//         // one(root);
//         console.timeEnd('data');
//     };
// };