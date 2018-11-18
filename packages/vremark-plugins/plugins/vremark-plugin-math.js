var data = require('../../unist-util-data');
var PLUGIN_NAME = 'vremark-plugin-math';
var COMPONENT_NAME = 'vremark-component-math';

module.exports = {
    test: function (node) {
        return ( node.type === 'math' || node.type === 'inlineMath' );
    },
    plugin: function (node) {
        data(node, {
            plugin: PLUGIN_NAME,
            component: COMPONENT_NAME,
            props: {
                code: node.math,
                inline: node.type === 'inlineMath'
            }
        });
    }
};
