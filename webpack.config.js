const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestRevisionPlugin = require('manifest-revision-webpack-plugin');

const static_path = path.join(__dirname, 'app/static')
const assets_path = path.join(static_path, 'src')
module.exports = {
    devtool: 'source-map',
    context: __dirname,
    entry: {
        bundle: path.join(assets_path, 'js/index.js'),
        styles: path.join(assets_path, 'scss/styles.scss'),
    },
    output: {
        path: path.resolve(static_path, 'dist'),
        publicPath: 'http://localhost:8080/static/dist/',
        filename: 'js/[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.css'],
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: true,
                            reloadAll: true,
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        }
                    },

                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            sassOptions: {
                                outputStyle: 'expanded'
                            }
                        }
                    }
                ],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/styles.css'
        }),
        new ManifestRevisionPlugin('manifest.json', {
            rootAssetPath: assets_path,
            ignorePaths: ['/js', '/scss']
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            name: 'bundles'
        }
    }

};