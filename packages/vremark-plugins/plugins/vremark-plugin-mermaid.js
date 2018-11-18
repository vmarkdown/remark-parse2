var data = require('../../unist-util-data');
var PLUGIN_NAME = 'vremark-plugin-mermaid';
var COMPONENT_NAME = 'vremark-component-mermaid';

module.exports = {
    test: function (node) {
        return node.type === 'code' && node.lang && (node.lang === 'mermaid' || node.lang === 'gantt');
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
