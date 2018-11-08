module.exports = function (node) {

    if(node.data && node.data.component) {
        node.type = 'component';
        node.component = node.data.component;
    }

    if(node.properties) {
        node.data = node.data || {};
        if(node.properties.style) {
            Object.assign(node.data, {
                style: node.properties.style
            });
        }

        if(node.properties.className) {
            node.data['class'] = [].concat(node.data['class']).concat(node.properties.className);
        }
    }

    return node.data || {};
};