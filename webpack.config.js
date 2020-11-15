var path = require('path')
var webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const { VuetifyLoaderPlugin } = require('vuetify-loader')

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'index.js',
        libraryTarget: 'umd',
        libraryExport: 'default' //<-- make export accessible to global scope
    },
    module: {
        rules: [
            {
                test: /\.sass$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'sass': 'sass-loader?indentedSyntax',
                    }
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
                    }
                }
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    plugins: [
        // make sure to include the plugin for the magic
        new VueLoaderPlugin(),
        new VuetifyLoaderPlugin()
    ],
    externals: {
        vue: {
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue',
            root: 'Vue'
        },
        vuetify: {
            commonjs: 'vuetify',
            commonjs2: 'vuetify',
            amd: 'vuetify',
            root: 'Vuetify'
        }
    }
}