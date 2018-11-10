var data = require('../unist-util-data');
var PLUGIN_NAME = 'vremark-plugin-highlight';

var languages = (function () {
    var languages = require('./languages');
    var keys = {};
    languages.forEach(function (language) {
        keys[language] = true;
    });
    return keys;
})();

function isPlugin(node) {
    return node.lang && languages[node.lang];
}

function plugin(options = {}) {
    return function transformer(root) {
        var children = root.children;
        for(var i=0;i<children.length;i++) {
            var node = children[i];
            if( node.type === 'code' && isPlugin(node) ){
                data(node, {
                    plugin: PLUGIN_NAME,
                    props: {
                        lang: node.lang,
                        code: node.value
                    }
                });
            }
        }
    };
}

module.exports = plugin;
