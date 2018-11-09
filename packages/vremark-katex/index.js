var visit = require('unist-util-visit');
// var data = require('unist-util-data');
var data = require('../unist-util-data');

module.exports = function plugin(options = {}) {

    return function transform(root) {

        function render(node) {

            data(node, {
                plugin: 'vremark-plugin-math',
                props: {
                    code: node.math,
                    inline: node.type === 'inlineMath'
                }
            });

        }

        visit(root, function (node) {
            return node.type === 'math' || node.type === 'inlineMath';
        }, render);

        return root;
    }
};