const parse = require('rehype-parse');
const unified = require('unified');


function parseHTML(html) {
    const processor = unified().use(parse, {fragment: true});
    const hast = processor.parse(html);
    return hast.children[0];
}

module.exports = function plugin(options = {}) {


    function findNextNode(children, from) {

        for(let i=from;i<children.length;i++) {

            const node = children[i];

            if(node.type === 'raw') {
                return {
                    index: i,
                    node: node
                }
            }

        }


        return null;


    }

    function getList(root) {
        const children = root.children;

        let index = 0;

        const list = [];

        let start = null;
        let end = null;
        let nodes = [];

        while (index<children.length) {

            const node = children[index];

            if(node.type === 'raw') {
                if(start){
                    node.remove = true;
                    end = {
                        node: node,
                        index: index
                    };

                    list.push({
                        start: start,
                        end: end,
                        nodes: nodes
                    });

                    start = null;
                    end = null;
                    nodes = [];

                }
                else {
                    node.remove = true;
                    start = {
                        node: node,
                        index: index
                    };
                }
            }
            else if(start) {
                node.remove = true;
                nodes.push(node);
            }

            index++;

        }

        return list;
    }

    return function transform(root) {





        // for(let i=0;i<children.length;i++) {
        //
        //     const node = children[i];
        //
        //     if(node.type === 'raw') {
        //
        //     }
        //
        // }



        // console.log(list);

        // const newNodes = [];

        const list = getList(root);

        for(let i=0;i<list.length;i++) {

            const node = list[i];

            const hast = parseHTML(node.start.node.value);

            // debugger

            // const newNode = {
            //     type: 'element',
            //     tagName: 'div',
            //     children: node.nodes
            // };
            const newNode = {};
            Object.assign(newNode, hast);
            Object.assign(newNode, {
                children: newNode.children.concat(node.nodes)
            });

            const start = node.start;

            Object.assign(start.node, newNode);
            start.node.remove = false;

        }

        console.log('start===============');
        console.log(root);



        const children = root.children.filter(function (node) {
            return !node.remove;
        });

        console.log(children);

        console.log('end===============');

        root.children = children;

        return root;
    }
};