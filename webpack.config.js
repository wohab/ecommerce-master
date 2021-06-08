const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin =require("mini-css-extract-plugin");
const { truncate } = require("fs");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    entry: {
        app: './src/index.js'
    },

    output: {
        path: path.join(__dirname, "/dist"),
        publicPath: '',
        filename: "main.js"
    },

    mode: "development",

    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            minimize: true,
                        },
                    },
                ],
            },

            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false,
                        },
                    },
                    'css-loader',
                ],
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[name].[ext]',
                            outputPath: "images",
                        }
                    },
                ],
            },
        ],
    },

    devServer: {
        contentBase: path.join(__dirname, "./dist"),
        port: 1239,
        writeToDisk: true,
        open: true,
    },

    plugins: [
        new HtmlWebpackPlugin({filename: "index.html", 
        template: "./src/index.html"
        }),

        new MiniCssExtractPlugin({filename: "css/style.css"}),

        new OptimizeCssAssetsPlugin({}),
    ],
};