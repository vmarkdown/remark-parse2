module.exports = function (node) {
    var properties = node.properties || {};

    var data = node.data || {};
    var attrs = data.attrs || {};
    var props = data.props || {};
    var className = node.class || [];

    className = [].concat(className).concat(properties.className || []);

    if(properties.hasOwnProperty('className')) {
        delete properties.className;
    }

    Object.assign(attrs, properties);

    Object.assign(data, {
        attrs: attrs,
        props: props,
        'class': className
    });

    return data;
};