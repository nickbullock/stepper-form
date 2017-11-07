const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: {
        app: "./src/index.js"
    },

    output: {
        path: __dirname + "/dist",
        filename: "[name].bundle.js",
        chunkFilename: "[name].bundle.js"
    },

    watch: true,

    plugins: [
        new HtmlWebpackPlugin({template: "./public/index.html"})
    ],

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            "babel-preset-react",
                            "babel-preset-es2015",
                            "stage-0"
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },

    devServer: {
        contentBase: __dirname + "/dist",
        port: 3000,
        open: true
    }

};