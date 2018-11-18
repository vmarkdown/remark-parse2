var data = require('../../../unist-util-data');
var util = require('../../util');

var PLUGIN_NAME = 'vremark-plugin-highlight';
var COMPONENT_NAME = 'vremark-component-highlight';

var list = require('./languages');
var languages = {};
list.forEach(function (name) {
    languages[name] = true;
});

module.exports = {
    test: function (node) {
        return node.type === 'code' && node.lang && languages[node.lang];
    },
    plugin: function (node) {
        var meta = util.meta(node);
        data(node, {
            plugin: PLUGIN_NAME,
            component: COMPONENT_NAME,
            props: {
                meta: meta,
                lang: node.lang,
                code: node.value
            }
        });
    }
};
