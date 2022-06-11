const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js', // 入口
    output: {
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].chunk.js',
        path: path.join(__dirname, 'dist'), // 出口
    },
    optimization: {
        // minimize: false,
        runtimeChunk: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html'),
            cache: false,
            filename: 'index.html'
        })
    ],
    module: {
        rules: [
        ]
    },
    devServer: {
        port: 8080,
        static: path.join(__dirname, 'dist', 'index')
    },
    resolve: {
        alias: {
            Assets: path.resolve(__dirname, 'src/assets')
        }
    }
}