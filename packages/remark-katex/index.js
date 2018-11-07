const visit = require('unist-util-visit');
const data = require('unist-util-data');

module.exports = function plugin(opts = {}) {
    // if (opts.throwOnError == null) opts.throwOnError = false
    return function transform(root) {

        function render(node) {

            data(node, {
                'class': ['vremark-math'],
                props: {
                    component: 'vremark-math',
                    code: node.math
                }
            });

        }

        visit(root, 'inlineMath', render);
        visit(root, 'math', render);

    }
};