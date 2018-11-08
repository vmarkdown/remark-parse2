module.exports = function (node) {

    if(node.data && node.data.component) {
        node.type = 'component';
        node.component = node.data.component;
    }

    return node.data || {};
    /*
    var properties = node.properties || {};
    var style = properties.style || {};

    var data = node.data || {};
    var attrs = data.attrs || {};
    var props = data.props || {};
    var domProps = data.domProps || {};
    var className = node.class || [];

    className = [].concat(className).concat(properties.className || []);
    if(properties.hasOwnProperty('className')) {
        delete properties.className;
    }

    if(properties.hasOwnProperty('style')) {
        delete properties.style;
    }

    if(properties.hasOwnProperty('_vue')) {
        var _vue = properties._vue;

        if(_vue['class']) {
            className = [].concat(className).concat(_vue['class']);
        }
        if(_vue.style) {
            Object.assign(style, _vue.style);
        }
        if(_vue.attrs) {
            Object.assign(attrs, _vue.attrs);
        }
        if(_vue.props) {
            Object.assign(props, _vue.props);
        }
        if(_vue.domProps) {
            Object.assign(domProps, _vue.domProps);
        }

        // delete properties._vue;
    }

    Object.assign(attrs, properties);

    Object.assign(data, {
        'class': className,
        attrs: attrs,
        props: props,
        style: style,
        domProps: domProps
    });

    return data;*/
};