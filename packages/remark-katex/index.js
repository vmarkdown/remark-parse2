const visit = require('unist-util-visit');
const data = require('unist-util-data');

module.exports = function plugin(opts = {}) {
    // if (opts.throwOnError == null) opts.throwOnError = false
    return function transform(root) {

        function render(node) {

            // debugger

            // data(node, {
            //     'class': ['vremark-math'],
            //     props: {
            //         component: 'vremark-math',
            //         code: node.math,
            //         inline: node.type === 'inlineMath'
            //     }
            // });

            // Object.assign(node.position, {
            //     test: 9999
            // });

            // const value = node.value;


            // node.value = {
            //     data: {
            //         'class': ['vremark-math'],
            //     },
            //     value: '================'
            // };

            // var properties = node.properties || {};
            //
            // properties.data = {
            //     test: 9999
            // };
            //
            // node.properties = properties;

        }


        visit(root, function (node) {
            return node.type === 'math' || node.type === 'inlineMath';
        }, render);

        // visit(root, 'inlineMath', render);
        // visit(root, 'math', render);

        return root;
    }
};