var visit = require('unist-util-visit');
var xtend = require('xtend');

function data(node, index, parent, options) {

    if(!node.properties && !node.data) {
        return;
    }

    let classes = (node.type === 'root')?['root']:[];

    const config = options.config || {};
    if(config[node.type]){
        if(config[node.type].tagName) {
            node.tagName = config[node.type].tagName;
        }
        if(config[node.type].class || config[node.type].className) {
            classes = classes.concat(config[node.type].class || config[node.type].className);
        }
    }

    const plugins = options.plugins || {};
    node.data = node.data || {};

    if(node.data['class']){
        classes = classes.concat(node.data['class']);
    }


    const properties = Object.assign({}, node.properties);

    if(properties.style && (typeof properties.style === 'string')) {
        Object.assign(node.data, {
            style: properties.style
        });
        // delete properties.style;
    }

    if(properties.className) {
        // node.data['class'] = [].concat(node.data['class']||'').concat(properties.className);
        classes = classes.concat(properties.className);
        delete properties.className;
    }

    if (node.type === 'root') {
        node.data.key = 'root';
    }
    else {
        if( node.data.hash ){
            node.data.ref = node.data.hash;
            if(node.tagName !== "br" && node.tagName !== "hr") {
                node.data.key = node.data.hash;
            }
            delete node.data.hash;
        }
    }

    // if (node.type !== 'root' && node.hash){
    //     node.data.attrs = node.data.attrs || {};
    //     if( !node.data.attrs.hasOwnProperty('id') ) {
    //         node.data.attrs.id = node.hash;
    //     }
    // }

    // if (node.data.hasOwnProperty('hash')){
    //     node.data.ref = node.data.hash;
    //
    //     if (node.type !== 'root') {
    //         node.data.key = node.data.hash;
    //     }
    // }

    // if (node.type !== 'root' && node.data.hasOwnProperty('hash')){
    //     node.data.attrs = node.data.attrs || {};
    //     if(!node.data.attrs.hasOwnProperty('id')) {
    //         node.data.attrs.id = node.data.hash;
    //     }
    //     // node.data.key = node.data.hash;
    //     // delete node.data.hash;
    // }

    if (Object.keys(properties).length > 0){
        node.data.attrs = node.data.attrs || {};
        Object.assign(node.data.attrs, properties);
    }

    // if(node.type === 'root') {
    //     node.data['class'] = ['root'].concat(node.data?node.data['class']:'');
    // }

    if(node.properties) {
        delete node.properties;
    }

    if(Object.keys(classes).length > 0) {
        node.data['class'] = classes;
    }

    // if(node.data.plugin && plugins.hasOwnProperty(node.data.plugin)) {
    //     const plugin = plugins[node.data.plugin];
    //     if(plugin.component) {
    //         if( node.tagName === "code" && parent.tagName === "pre" ) {
    //             Object.assign(parent, node);
    //             parent.type = 'element';
    //             parent.tagName = plugin.component;
    //             parent.children = [];
    //         }
    //         else {
    //             node.type = 'element';
    //             node.tagName = plugin.component;
    //         }
    //         // node.type = 'element';
    //         // node.tagName = plugin.name || plugin.component.name || plugin.component;
    //     }
    // }


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