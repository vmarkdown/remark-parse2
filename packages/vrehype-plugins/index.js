var visit = require('unist-util-visit');
var xtend = require('xtend');
var plugins = {};

function data(node, index, parent, options, plugin) {
    // debugger
    // if(!plugin.component) {
    //     return;
    // }

    // var component = plugin.component.name || plugin.component;

    if( !node.data || !node.data.component ) {
        return;
    }

    var component = node.data.component;

    if( node.tagName === "code" && parent.tagName === "pre" ) {
        Object.assign(parent, node);
        parent.type = 'element';
        parent.tagName = component;
        parent.children = [];
    }
    else {
        node.type = 'element';
        node.tagName = component;
    }

}

module.exports = function plugin(options = {}) {
    var settings = xtend(options, this.data('settings'));

    var loader = settings.loader;
    var Vue = settings.Vue;

    return async function transformer(root, file, next) {
        var plugin_names = {};
        // console.time('plugins');
        visit(root, function (node) {
            return node.data && node.data.plugin;// && plugins[node.data.plugin];
        },function (node, index, parent) {
            var plugin = node.data.plugin;
            plugin_names[plugin] = true;
            data(node, index, parent, settings, plugin);
        });
        // console.timeEnd('plugins');
        const names = Object.keys(plugin_names);

        if(!loader || names.length === 0){
            next();
            return root;
            // return root;
        }

        const Plugins = await loader(names);

        if(!Plugins || Plugins.length === 0){
            next();
            return root;
        }

        Plugins.forEach(function (Plugin) {
            if(!Plugin) {
                return root;
            }

            try{
                // Plugin.Vue = Vue;
                if(Vue && Plugin.component) {
                    Vue.component(Plugin.component.name, Plugin.component);
                }
                var plugin = new Plugin();
                plugin.install();
                plugins[Plugin.name] = plugin;
            }
            catch (e) {
                console.error(e);
            }

        });

        next();

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