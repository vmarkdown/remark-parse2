const Vue = require('vue').default;

const katex = require('katex');

function loading(h) {

}

// Vue.component('vremark-component-math', );

module.exports = {
    name: 'vremark-component-math',
    props: {
        'code': {
            type: String,
            require: true
        },
        'inline': {
            type: Boolean,
            default: true
        }
    },
    render(h) {
        // console.log(this.code);

        const self = this;

        var renderedValue = '';
        try {
            renderedValue = katex.renderToString(this.code, {
                displayMode: !self.inline
            });
        }
        catch (err) {

        }

        return renderedValue ?
            h(self.inline?'span':'div', {
                class: [self.inline?'vremark-inline-math':'vremark-math'],
                domProps: {
                    innerHTML: renderedValue
                }
            })
            :
            h('pre', {}, [
                h('code', {

                    domProps: {
                        innerHTML: self.code
                    }

                })
            ]);
    }
};
