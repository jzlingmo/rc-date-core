const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'inline-source-map',
    entry: [
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client',
        './index'
    ],
    externals: {
        'react': 'window.React',
        'react-dom': 'window.ReactDOM'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolveLoader: {
        modulesDirectories: ['node_modules']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: [
                    'react-hot',
                    // babel 6 need these queries
                    // https://medium.com/@malyw/how-to-update-babel-5-x-6-x-d828c230ec53#.jvxlzskds
                    'babel?presets[]=react,presets[]=es2015,presets[]=stage-2'
                ]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loaders: ['style', 'css']
            }
        ]
    }
};
