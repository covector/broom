const path = require("path");
const srcDir = path.join(__dirname, "../src");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: {
        popup: path.join(srcDir, "ui/popup.tsx"),
        options: path.join(srcDir, "options/options.tsx"),
    },
    output: {
        path: path.join(__dirname, "../dist/js"),
        filename: "[name].js",
    },
    optimization: {
        splitChunks: {
            name: "vendor",
            chunks: "initial",
        },
        minimizer: [new TerserPlugin({
            extractComments: false,
        })],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
};