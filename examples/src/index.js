var visit = require('unist-util-visit');

const unified = require('unified');
const md = require('../md/test.md');
const Vue = require('vue').default;
const parse = require('../../index');
const plugins = require('../../packages/vrehype-plugins');
const vdom = require('../../packages/rehype-vdom');


// const plugins = {};
// [
//     require('./plugins/vremark-plugin-math'),
//     require('./plugins/vremark-plugin-highlight')
// ].map(function (plugin) {
//     plugin.register(Vue);
//     plugins[plugin.name] = {
//         component: plugin.component.name
//     }
// });

// Vue.component('vremark-component-math', require('./plugins/vremark-plugin-math').component);
// Vue.component('vremark-component-highlight', require('./plugins/vremark-plugin-highlight').component);
// function loadPlugins() {
//     return new Promise(function (resolve, reject) {
//
//         [
//             require('./plugins/vremark-plugin-math'),
//             require('./plugins/vremark-plugin-highlight')
//         ].map(function (plugin) {
//
//
//         });
//
//
//     });
// }

// const _plugins = {};
// [
//     require('./plugins/vremark-plugin-math'),
//     require('./plugins/vremark-plugin-highlight')
// ].map(function (plugin) {
//     plugin.register(Vue);
//     _plugins[plugin.name] = plugin;
// });


function loader(name) {
    return new Promise(function (resolve, reject) {
        // requirejs([name], function (plugin) {
        //     resolve(plugin)
        // }, function () {
        //     reject();
        // });

        let Plugin = null;
        if(name === 'vremark-plugin-math') {
            Plugin = require('./plugins/vremark-plugin-math');
        }
        else if(name === 'vremark-plugin-highlight') {
            Plugin = require('./plugins/vremark-plugin-highlight');
        }

        // if(Plugin){
        //     Plugin.Vue = Vue;
        // }

        resolve( Plugin );

        // if(Plugin && Plugin.init){
        //     Plugin.init();
        // }
        // if(Plugin && Plugin.component){
        //     Vue.component(Plugin.component.name, Plugin.component);
        // }

        // resolve( Plugin );

    });
}



const app = new Vue({
    el: '#app',
    methods: {
        async update(md) {
            const h = this.$createElement;
            console.time('process');
            const processor = unified().use(parse).use(plugins).use(vdom).data('settings', {
                config: {
                    root: {
                        tagName: 'main',
                        class: 'markdown-body'
                    }
                },
                Vue: Vue,
                h:h,
                loader: loader
            });
            const file = await processor.process(md);
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


