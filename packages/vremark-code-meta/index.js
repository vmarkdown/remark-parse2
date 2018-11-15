var visit = require('unist-util-visit');
var parseAttr = require('md-attr-parser');
var data = require('../unist-util-data');

module.exports = function plugin(options = {}) {
    return function transformer(root) {

        visit(root, function (node) {
            return node.type === 'code' && node.lang && node.meta
        }, function (node) {

            try {
                var attrs = parseAttr(node.meta);

                if(!attrs.prop) {
                    return;
                }

                data(node, {
                    props: {
                        meta: node.meta,
                        attrs: attrs.prop
                    }
                });
            }
            catch (e) {
                console.error(e);
            }

        })


    };
};