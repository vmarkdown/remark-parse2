var data = require('../../unist-util-data');
var PLUGIN_NAME = 'vremark-plugin-sequence';
var COMPONENT_NAME = 'vremark-component-sequence';

module.exports = {
    test: function (node) {
        return node.type === 'code' && node.lang && (node.lang === 'seq' || node.lang === 'sequence' );
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
