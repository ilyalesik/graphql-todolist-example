import webpack              from 'webpack';
import assign               from 'object-assign';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
var path = require('path');
var autoprefixer = require('autoprefixer');

export default function(app) {
    const config = {
        devtool: 'inline-source-map',
        entry:   [
            'babel-polyfill',
            'webpack-hot-middleware/client',
            './src/index.js',
        ],
        module: {
            rules: [
                {
                    test: /\.(html|svg|jpe?g|png|ttf|woff2?)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: 'static/[name]-[hash:8].[ext]',
                        },
                    },
                },
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'isomorphic-style-loader'
                        },
                        {
                            loader: 'style-loader',
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                module: true,
                                localIdentName: '[path][name]-[local]',
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: (loader) => [
                                    require('autoprefixer')(),
                                ]
                            }
                        }
                    ],
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader'],
                },
            ],
        },
        output: {
            path: path.join(__dirname, 'dist'),
            publicPath: '/',
            filename: 'bundle.js'
        },
        resolve: {
            extensions: ['.js', '.jsx']
        },
        devServer: {
            contentBase: './dist',
            hot: true
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ],
    };

    const compiler = webpack(config);

    app.use(webpackDevMiddleware(compiler, { noInfo: true }));
    app.use(webpackHotMiddleware(compiler));
}
