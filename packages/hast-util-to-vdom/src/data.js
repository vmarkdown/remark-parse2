module.exports = function (node) {

    if(!node.properties && !node.data) {
        return {};
    }

    node.data = node.data || {};

    if(node.data.component) {
        node.type = 'component';
        node.component = node.data.component;
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

    if (Object.keys(properties).length > 0 ){
        node.data.attrs = node.data.attrs || {};
        Object.assign(node.data.attrs, properties);
    }

    if(node.type === 'root') {
        node.data['class'] = ['root'].concat(node.data?node.data['class']:'');
    }

    return node.data || {};
};