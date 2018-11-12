module.exports = {
    name: 'vremark-plugin-math',
    component: require('./component.js'),
    register(Vue) {
        Vue.component(this.component.name, this.component);
    }
};
