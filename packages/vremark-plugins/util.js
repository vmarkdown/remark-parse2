var parseAttr = require('md-attr-parser');

module.exports = {

    meta(node) {

        var meta = {};

        if(node.meta) {
            try {
                var result = parseAttr(node.meta);

                if(!result.prop) {
                    return meta;
                }

                // data(node, {
                //     props: {
                //         meta: node.meta,
                //         attrs: result.prop
                //     }
                // });

                Object.assign(meta, {
                    value: node.meta,
                    attrs: result.prop
                });

            }
            catch (e) {
                // console.error(e);
            }
        }

        return meta;
    }

};