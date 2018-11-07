module.exports = function (node, data) {

    node.data = node.data || {};
    var hProperties = node.data.hProperties || {};

    var _vue = hProperties._vue || {};
    var className = _vue.class || [];
    var style = _vue.style || {};
    var attrs = _vue.attrs || {};
    var props = _vue.props || {};
    var domProps = _vue.domProps || {};

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
        _vue.class = className;
    }

    if(data.hasOwnProperty('key')){
        _vue.key = data.key;
    }

    _vue.style = style;
    _vue.attrs = attrs;
    _vue.props = props;
    _vue.domProps = domProps;

    hProperties._vue = _vue;

    node.data.hProperties = hProperties;

};
