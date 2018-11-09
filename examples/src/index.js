const unified = require('unified');
const md = require('../md/test.md');
const Vue = require('vue').default;

const plugins = {
    'vremark-plugin-math': require('./plugins/vremark-plugin-math')
};

const app = new Vue({
    el: '#app',
    methods: {
        async update(md) {
            const h = this.$createElement;
            console.time('process');
            const file = await processor.data('settings', {
                h:h,
                plugins: plugins
            }).process(md);
            console.timeEnd('process');
            this.vdom = file.contents;

            console.log(file.mdast);
            console.log(file.hast);
            console.log(this.vdom);

            this.$forceUpdate();
        }
    },
    render(h) {
        return this.vdom || h('div', '=======');
    }
});

const parse = require('../../index');
const processor = unified().use(parse);


(async ()=>{
    // const mdast = processor.parse(md);
    // console.log(mdast);
    // const hast = await processor.run(mdast);
    // console.log(hast);
    // app.update(hast);

    // const file = await processor.process(md);
    // debugger
    // const hast = file.contents;
    // app.update(hast);

    app.update(md);

})();


