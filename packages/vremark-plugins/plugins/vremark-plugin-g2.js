var data = require('../../unist-util-data');
var PLUGIN_NAME = 'vremark-plugin-g2';
var COMPONENT_NAME = 'vremark-component-g2';

module.exports = {
    test: function (node) {
        return node.type === 'code' && node.lang && node.lang === 'g2';
    },
    plugin: function (node) {
        data(node, {
            plugin: PLUGIN_NAME,
            component: COMPONENT_NAME,
            props: {
                lang: node.lang,
                code: node.value
            }
        });
    }
};
