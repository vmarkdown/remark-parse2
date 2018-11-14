'use strict'

module.exports = generateFootnotes

var thematicBreak = require('./handlers/thematic-break')
var list = require('./handlers/list')
var wrap = require('./wrap')

function generateFootnotes(h) {
    var footnotes = h.footnotes
    var length = footnotes.length
    var index = -1
    var listItems = []
    var def

    if (!length) {
        return null
    }


    /* new start */
    var position = {};
    /* new end */

    while (++index < length) {
        def = footnotes[index]

        listItems[index] = {
            type: 'listItem',
            data: {hProperties: {id: 'fn-' + def.identifier}},
            children: def.children.concat({
                type: 'link',
                url: '#fnref-' + def.identifier,
                data: {hProperties: {className: ['footnote-backref']}},
                children: [{type: 'text', value: '↩'}]
            }),
            position: def.position
        }


        /* new start */
        if(!position.start) {
            position.start =  def.position.start;
        }
        position.end = def.position.end;
        /* new end */

    }

    return h(
        /* old start */
        // null,
        /* old end */

        /* new start */
        position,
        /* new end */


        'div',
        {className: ['footnotes']},
        wrap(
            [
                thematicBreak(h),

                /* old start */
                /*
                list(h, {
                    type: 'list',
                    ordered: true,
                    children: listItems
                })
                */
                /* old end */

                /* new start */
                (function () {

                    var footnoteList = list(h, {
                        type: 'list',
                        ordered: true,
                        children: listItems
                    });

                    footnoteList.children && footnoteList.children.forEach(function (listItem) {
                        if(listItem.type === "element"
                            && listItem.tagName === "li"
                            && listItem.children.length > 0 ) {
                            // var item = listItem.children[0];
                            // item.tagName = 'span';
                            var item = listItem.children.find(function (item) {
                                return item.tagName === 'p';
                            });
                            item && (item.tagName = 'span');
                        }
                    });

                    return footnoteList;

                })()
                /* new end */
            ],
            true
        )
    )
}
