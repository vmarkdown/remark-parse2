// module.exports = {
//     name: 'vremark-plugin-math',
//     component: require('./component.js'),
//     register(Vue) {
//         Vue.component(this.component.name, this.component);
//     }
// };

const Plugin = require('../plugin');

class MathPlugin extends Plugin {

    constructor() {
        super();
        const self = this;
    }

    install() {
        const self = this;
    }

    uninstall() {
        const self = this;
    }
}

MathPlugin.component = require('./component');

module.exports = MathPlugin;
