const path = require("path");
const nodeExternals = require("webpack-node-externals");
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");
const autoprefixer = require("autoprefixer");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
    target: "node",
    entry: {
        skeleton: "./src/skeleton/skeleton.entry.js"
    },
    output: {
        path: path.resolve(__dirname, "."),
        filename: "[name].js",
        libraryTarget: "commonjs2"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["vue-style-loader", "css-loader", "postcss-loader"]
            },
            {
                test: /\.scss$/,
                use: ["vue-style-loader", "css-loader", "sass-loader", "postcss-loader"]
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: "vue-loader",
                        options: {
                            loaders: {
                                scss: ["vue-style-loader", "css-loader", "sass-loader"]
                            },
                            postcss: [autoprefixer()]
                        }
                    }
                ]
            }
        ]
    },
    externals: nodeExternals({
        whilelist: /\.css$/
    }),
    resolve: {
        extensions: [".js", ".vue", ".json"]
    },
    plugins: [
        new VueLoaderPlugin(),
        new VueSSRServerPlugin({
            filename: "skeleton.json"
        })
    ]
};
