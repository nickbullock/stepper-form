const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: {
        app: "./src/index.js",
        // startForm: "./src/components/StartForm/index.js",
        // middleForm: "./src/components/chunks/middleForm.index.js",
        // endForm: "./src/components/chunks/endForm.index.js"
    },

    output: {
        path: __dirname + "/dist",
        filename: "[name].js"
    },

    watch: true,

    plugins: [
        new HtmlWebpackPlugin({template: "./public/index.html"})
    ],

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
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
        port: 8080,
        open: true
    }

};