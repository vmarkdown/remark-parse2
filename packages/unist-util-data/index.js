module.exports = function (node, data) {

    node.data = node.data || {};
    // var hProperties = node.data.hProperties || {};
    var hData = node.data.hData || {};

    // var _vue = hData._vue || {};
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

    if(data.hasOwnProperty('key')){
        hData.key = data.key;
    }

    hData.style = style;
    hData.attrs = attrs;
    hData.props = props;
    hData.domProps = domProps;

    // hData._vue = hData;
    // node.data.hProperties = hProperties;
    node.data.hData = hData;

};
