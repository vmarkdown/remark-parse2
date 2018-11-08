const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'none',
    entry: {
        'example-main': path.resolve(__dirname, 'src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    resolve: {
        alias: {
            'unist-util-data': path.resolve(__dirname, '../packages', 'unist-util-data', 'index.js'),
            'mdast-util-to-hast': path.resolve(__dirname, '../packages', 'mdast-util-to-hast', 'index.js'),
        }
    },
    module: {
        rules: [
            {
                test: /\.md$/,
                use: 'text-loader'
            }
        ]
    },
    externals: {
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'examples/index.html'
        })
    ],
    // devServer: {
    //     // hotOnly: true,
    //     contentBase: path.join(__dirname, "www")
    // },
    devServer: {
        hot: false,
        inline: false,
        contentBase: [
            path.resolve(__dirname, "dist"), path.resolve(__dirname, "www")
        ]
    }
};

