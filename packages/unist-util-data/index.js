module.exports = function (node, data) {

    node.data = node.data || {};
    var hData = node.data.hData || {};

    var className = hData.class || [];
    var style = hData.style || {};
    var attrs = hData.attrs || {};
    var props = hData.props || {};
    var domProps = hData.domProps || {};

    if(data.class) {
        className = [].concat(className).concat(data.class);
    }

    if(data.style) {
        Object.assign(style, data.style);
    }

    if(data.attrs) {
        Object.assign(attrs, data.attrs);
    }

    if(data.props) {
        Object.assign(props, data.props);
    }

    if(data.domProps) {
        Object.assign(domProps, data.domProps);
    }

    if(className && className.length > 0){
        hData.class = className;
    }

    if(!!Object.keys(style).length) {
        hData.style = style;
    }

    if(!!Object.keys(attrs).length) {
        hData.attrs = attrs;
    }

    if(!!Object.keys(props).length) {
        hData.props = props;
    }

    if(!!Object.keys(domProps).length) {
        hData.domProps = domProps;
    }

    if(data.hasOwnProperty('key')){
        hData.key = data.key;
    }

    if(data.hasOwnProperty('hash')){
        hData.hash = data.hash;
    }

    if(data.hasOwnProperty('component')){
        hData.component = data.component;
    }

    if(data.hasOwnProperty('plugin')){
        hData.plugin = data.plugin;
    }

    node.data.hData = hData;
};
