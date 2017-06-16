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
            './src/index.jsx',
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
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    use: [
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
                                    require('postcss-import')({ root: loader.resourcePath }),
                                    require('postcss-cssnext')(),
                                    require('autoprefixer')(),
                                    require('cssnano')()
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
        postcss: function () {
            return [autoprefixer];
        },
        output: {
            path: path.join(__dirname, 'dist'),
            publicPath: '/',
            filename: 'bundle.js',
            proxy: {
                cookieDomainRewrite: ''
            }
        },
        resolve: {
            extensions: ['', '.js', '.jsx']
        },
        devServer: {
            contentBase: './dist',
            hot: true
        },
        plugins: [
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin()
        ],
    };

    const compiler = webpack(config);

    app.use(webpackDevMiddleware(compiler, { noInfo: true }));
    app.use(webpackHotMiddleware(compiler));
}
