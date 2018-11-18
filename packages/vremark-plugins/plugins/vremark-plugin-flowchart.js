var data = require('../../unist-util-data');
var PLUGIN_NAME = 'vremark-plugin-flowchart';
var COMPONENT_NAME = 'vremark-component-flowchart';

module.exports = {
    test: function (node) {
        return node.type === 'code' && node.lang && (node.lang === 'flow' || node.lang === 'flowchart' )
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
