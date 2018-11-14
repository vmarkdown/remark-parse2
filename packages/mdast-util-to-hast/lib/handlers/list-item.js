'use strict'

module.exports = listItem

var u = require('unist-builder')
var wrap = require('../wrap')
var all = require('../all')


/* new start */

function createInputPosition(container, node) {
    var children = container;

    if(!children||children.length===0||children[0].type !== 'text'){
        return node.position;
    }

    var position = Object.assign({}, children[0].position);

    Object.assign(position.end, position.start);
    Object.assign(position.start, {
        column: position.end.column - 3,
        offset: position.end.offset - 3
    });

    return position;
}

function createTextPosition(container, node) {

    var children = container;

    if(!children||children.length===0||children[0].type !== 'text'){
        return node.position;
    }

    var position = Object.assign({}, children[0].position);

    Object.assign(position.end, position.start);
    Object.assign(position.start, {
        column: position.end.column - 1,
        offset: position.end.offset - 1
    });

    return position;
}

/* new end */


function listItem(h, node, parent) {
    var children = node.children
    var head = children[0]
    var props = {}
    var single = false
    var result
    var container

    if (
        (!parent || !parent.loose) &&
        children.length === 1 &&
        head.type === 'paragraph'
    ) {
        single = true
    }

    result = all(h, single ? head : node)

    if (typeof node.checked === 'boolean') {
        if (!single && (!head || head.type !== 'paragraph')) {
            result.unshift(h(null, 'p', []))
        }

        container = single ? result : result[0].children

        if (container.length !== 0) {
            /* old start */
            // container.unshift(u('text', ' '))
            /* old end */

            /* new start */
            container.unshift(u('text', {position: createTextPosition(container, node)},' '))
            /* new end */
        }

        container.unshift(
            /* old start */
            /*
            h(null, 'input', {
                type: 'checkbox',
                checked: node.checked,
                disabled: true
            })
            */
            /* old end */


            /* new start */
            h({
                position: createInputPosition(container, node)
            }, 'input', {
                type: 'checkbox',
                checked: node.checked,
                disabled: true
            })
            /* new end */
        )

        // According to github-markdown-css, this class hides bullet.
        props.className = ['task-list-item']
    }

    if (!single && result.length !== 0) {
        result = wrap(result, true)
    }

    return h(node, 'li', props, result)
}
