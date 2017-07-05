const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';

const devtool = isProd
    ? 'source-map'
    : 'cheap-module-eval-source-map';

const entry = {
    app: './src/index.js'
};

const output = {
    path: path.resolve('./public'),
    filename: 'bundle.js',
    publicPath: '/'
};

const modules = {
    loaders: [
        { test: /\.(jpg|png|gif)$/, loader: 'url-loader?limit=10000' },
        { test: /\.html$/, loader: 'file-loader' },
        { test: /\.css$/, loader: 'style!css' },
        { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
        { test: /\.js$/, loader: 'babel-loader', query: { plugins: [ 'babel-plugin-transform-object-rest-spread' ], presets: ['env'] } }
    ]
};

const plugins = [
    new CopyPlugin([
        { from: path.resolve(__dirname, './src/index.html'), to: '.' },
        { from: path.resolve(__dirname, './src/manifest.json'), to: '.' },
        { from: path.resolve(__dirname, './src/sw.js'), to: '.' },
        { from: path.resolve(__dirname, './assets'), to: '.' },
        { from: path.resolve(__dirname, './favicon.ico'), to: '.' }
    ]),
    new webpack.optimize.ModuleConcatenationPlugin(),
];

const devServer = {
    historyApiFallback: {
        index: './src/index.html',
    },
    stats: 'minimal',
    disableHostCheck: true
};

// Production configs and setup
if (isProd) {
    plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
            },
            output: {
                comments: false,
            },
        })
    );
}

module.exports = {
    devtool,
    entry,
    output,
    module: modules,
    plugins,
    devServer
};