var visit = require('unist-util-visit');
var toc = require('./mdast-util-toc');
var data = require('../unist-util-data');
// var toString = require('mdast-util-to-string');
// var slugger = require('../util/slugger');
// var visitChildren = require('unist-util-visit-children');

function create(root) {
    var result = toc(root);

    var node = result.map;

    if(!node) return null;

    data(node, {
        class: ['vremark-toc']
    });

    return result.map;
}

function equalHead(head, link) {
    return slugger(head) === slugger(link);
}

module.exports = function plugin(options = {}) {

    return function transformer(root) {

        var tocCache = null;

        visit(root, function (node, index, parent) {
            return node.type === 'linkReference'
                && (node.label === 'TOC' || node.label === 'toc')
                && node.identifier === "toc"
                && parent && parent.type === "paragraph" ;
        }, function (node) {
            tocCache = tocCache?tocCache:create(root);
            if(tocCache) {
                Object.assign(node, tocCache);
            }
            else{
                Object.assign(node, {
                    type: 'text',
                    value: ''
                });
            }
        });

        tocCache && visit(root, 'heading', function (node) {
            if(node.__id__){
                data(node, {
                    attrs: {
                        id: node.__id__
                    }
                });
                delete node.__id__;
            }
        });


        //=======================================================




        // visit(root, function (node) {
        //     return node.type ==='link' && node.url && node.url.charAt(0) === '#';
        // }, function (link) {
        //
        //     var ref = link.url.substring(1);
        //
        //     visit(root, function (node) {
        //         return node.type ==='heading' && equalHead(toString(node),ref);
        //     }, function (heading) {
        //         data(heading, {
        //             attrs: {
        //                 id: ref
        //             }
        //         });
        //     });
        // });

        /*
        console.time('toc');
        var headings = {};

        visitChildren(function (node) {
            if(node.type!=='heading') {
                return
            }
            var _slugger = slugger(toString(node));
            headings[_slugger] = node;
        })(root);

        visitChildren(function (list) {

            if(list.type!=='list') {
                return
            }

            visit(list, function (node) {
                return node.type ==='link' && node.url && node.url.charAt(0) === '#';
            }, function (link) {

                var ref = link.url.substring(1);
                var _slugger = slugger(ref);

                if(headings[_slugger]) {

                    data(headings[_slugger], {
                        attrs: {
                            id: ref
                        }
                    });

                }

            });

        })(root);

        console.timeEnd('toc');
        */











        return root;
    }
};