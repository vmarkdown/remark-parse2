var visit = require('unist-util-visit');

var plugins = [
    require('./plugins/vremark-plugin-highlight'),
    require('./plugins/vremark-plugin-chart'),
    require('./plugins/vremark-plugin-flowchart'),
    require('./plugins/vremark-plugin-g2'),
    require('./plugins/vremark-plugin-math'),
    require('./plugins/vremark-plugin-mermaid'),
    require('./plugins/vremark-plugin-sequence'),
];

module.exports = function plugin(options = {}) {

    return function transform(root) {

        visit(root, function (node) {

            const plugin = plugins.find(function (item) {
                return item.test(node);
            });

            if(!plugin) return;

            plugin.plugin(node);

        });










        // function render(node) {
        //
        //     data(node, {
        //         plugin: 'vremark-plugin-math',
        //         props: {
        //             code: node.math,
        //             inline: node.type === 'inlineMath'
        //         }
        //     });
        //
        // }
        //
        // visit(root, function (node) {
        //     return node.type === 'math' || node.type === 'inlineMath';
        // }, render);

        return root;
    }
};