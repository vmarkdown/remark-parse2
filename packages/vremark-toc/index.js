var visit = require('unist-util-visit');
var toc = require('mdast-util-toc');

module.exports = function plugin(options = {}) {

    return function transformer(root) {

        visit(root, 'linkReference', function (node) {

            if(
                (node.label === 'TOC' || node.label === 'toc')
                && node.identifier === "toc") {
                var result = toc(root);
                Object.assign(node, result.map);
            }

        });

        return root;
    }
};