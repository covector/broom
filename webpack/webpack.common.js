const path = require("path");
const srcDir = path.join(__dirname, "../src");

module.exports = {
    entry: {
        popup: path.join(srcDir, "ui/popup.ts")
    },
    output: {
        path: path.join(__dirname, "../dist/js"),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
};