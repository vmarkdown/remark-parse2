module.exports = function (node, options) {

    if(!node.properties && !node.data) {
        return {};
    }

    const plugins = options.plugins || {};
    node.data = node.data || {};

    if(node.data.plugin && plugins.hasOwnProperty(node.data.plugin)) {
        const plugin = plugins[node.data.plugin];
        if(plugin.component) {
            node.type = 'component';
            node.component = plugin.component;
        }
    }

    const properties = Object.assign({}, node.properties);

    if(properties.style && (typeof properties.style === 'string')) {
        Object.assign(node.data, {
            style: properties.style
        });
        delete properties.style;
    }

    if(properties.className) {
        node.data['class'] = [].concat(node.data['class']||'').concat(properties.className);
        delete properties.className;
    }

    if (node.data.hasOwnProperty('hash')){
        node.data.attrs = node.data.attrs || {};
        if(!node.data.attrs.hasOwnProperty('id')) {
            node.data.attrs.id = node.data.hash;
        }
    }

    if (Object.keys(properties).length > 0 ){
        node.data.attrs = node.data.attrs || {};
        Object.assign(node.data.attrs, properties);
    }

    if(node.type === 'root') {
        node.data['class'] = ['root'].concat(node.data?node.data['class']:'');
    }

    return node.data || {};
};