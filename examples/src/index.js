var visit = require('unist-util-visit');

const unified = require('unified');
const md = require('../md/test.md');
const Vue = require('vue').default;
const parse = require('../../index');
const vdom = require('../../packages/rehype-vdom');
const processor = unified().use(parse).use(vdom).freeze();

const plugins = {};
[
    require('./plugins/vremark-plugin-math'),
    require('./plugins/vremark-plugin-highlight')
].map(function (plugin) {
    plugin.register(Vue);
    plugins[plugin.name] = {
        component: plugin.component.name
    }
});


const app = new Vue({
    el: '#app',
    methods: {
        refresh0() {
            const h = this.$createElement;
            this.vdom = h('div', {}, [
                h('div', {key: 1}, '1======='),
                h('div', {key: 2}, '2======='),
                h('div', {key: 3}, '3======='),
                h('div', {key: 4}, '4======='),
                h('div', {key: 5}, '5======='),
            ]);
            this.$forceUpdate();
        },
        refresh1() {
            const h = this.$createElement;
            this.vdom = h('div', {}, [
                h('div', {key: 1}, '1======='),
                h('div', {key: 2}, '2======='),
                h('div', {key: 31}, '3======='),
                h('div', {key: 4}, '4======='),
                h('div', {key: 5}, '5======='),
            ]);
            this.$forceUpdate();
        },
        async update(md) {
            const h = this.$createElement;
            console.time('process');
            const file = await processor().data('settings', {
                config: {
                    root: {
                        tagName: 'main',
                        class: 'markdown-body'
                    }
                },
                h:h,
                plugins: plugins
            }).process(md);
            console.timeEnd('process');
            this.vdom = file.contents;

            console.log(file.mdast);
            console.log(file.hast);
            console.log(this.vdom);


            // visit(file.hast, function (node) {
            //     return node.type === 'element' && node.tagName === 'input';
            // }, function (node) {
            //    var position = node.position;
            //    console.log(md.substring(position.start.offset, position.end.offset))
            // });

            this.$forceUpdate();
        }
    },
    render(h) {
        return this.vdom || h('div', '=======');
    }
});




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

    // app.update(md);


    // setTimeout(function () {
    //     app.refresh0();
    // }, 3000);
    // setTimeout(function () {
    //     app.refresh1();
    // }, 7000);




    // setTimeout(function () {
    //     var dom = app.$refs['41243535'];
    //
    //     console.log(dom);
    //
    //     dom.style.backgroundColor = '#38323261';
    // }, 1000);
    // setTimeout(function () {
    //     app.update(require('../md/test.md'));
    // }, 3000);

    setTimeout(function () {
        app.update(md);
    }, 0);


    // setTimeout(function () {
    //     app.update(md.replace('Markdown简介','====='));
    // }, 5000);

    // setTimeout(function () {
    //     app.update(require('../md/test1.md'));
    // }, 5000);


})();


