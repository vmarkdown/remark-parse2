module.exports = {

    root: function(h, node, data, children) {
        return h(node.tagName || 'div', data, children);
    },
    element: function(h, node, data, children) {
        if(data.props && data.props.component) {
            return h(data.props.component, data);
        }
        return h(node.tagName, data, children);
    },
    text: function(h, node) {
        return node.value;
    }

};
