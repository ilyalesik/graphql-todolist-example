var webpack = require('webpack');
var path = require('path');



module.exports = {
    devtool: 'cheap-module-source-map',
    devServer: {
        contentBase: './dist'
    },
    entry: [
        'babel-polyfill',
        './src/admin/index.js'
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/assets/"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [
                    'babel-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
};