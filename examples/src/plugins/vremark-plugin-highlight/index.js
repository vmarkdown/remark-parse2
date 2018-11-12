require('./component/index');

const themes = {
    'default':require('./themes/default.less'),
    'github':require('./themes/github.less'),
    'monokai-sublime':require('./themes/monokai-sublime.less'),
    'darcula':require('./themes/darcula.less')
};

let style = themes.default;
style.use();

const plugin = {
    name: 'vremark-plugin-highlight',
    component: 'vremark-plugin-highlight',
    setTheme(theme) {
        if( themes.hasOwnProperty(theme) ) {
            if(style) {
                style.unuse();
            }
            style = themes[theme];
            style.use();
        }
    }
};

module.exports = plugin;

