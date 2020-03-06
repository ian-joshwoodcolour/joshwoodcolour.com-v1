const path = require('path');
const webpack = require('webpack');
const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'src/js/main.js'),
        home: path.resolve(__dirname, 'src/js/home.js'),
        'consultation': path.resolve(__dirname, 'src/js/consultation.js'),
        editorial: path.resolve(__dirname, 'src/js/editorial.js'),
        experts: path.resolve(__dirname, 'src/js/experts.js'),
        product: path.resolve(__dirname, 'src/js/product.js'),
        account: path.resolve(__dirname, 'src/js/account.js'),
        'promo-popup': path.resolve(__dirname, 'src/js/promo-popup.js'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [
                                    require('autoprefixer')({
                                        browsers: [
                                            'Chrome >= 49',
                                            'Firefox >= 45',
                                            'Safari >= 9.1',
                                            'IE >= 10',
                                            'Edge >= 14',
                                            'iOS >= 9.3',
                                            'Android >= 4.4.4',
                                            'last 2 versions'
                                        ]
                                    }),
                                    require('css-mqpacker')()
                                ]
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                })
            },
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        context: '',
                        name: '[name].[ext]',
                        outputPath: './',
                        publicPath: './'
                    }
                }
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'src/assets/'),
        publicPath: '/assets/'
    },
    plugins: [
        new FlowBabelWebpackPlugin(),
        new ExtractTextWebpackPlugin({
            filename: '../assets/[name].css'
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'src/img/'),
                to: path.resolve(__dirname, 'src/assets/')
            }
        ])
    ],
    resolve: {
        extensions: ['.js'],
        modules: [
            'node_modules',
            path.resolve(__dirname, 'src')
        ]
    }
};
