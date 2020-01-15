const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: "./src/script/main.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: require.resolve('jquery'),
                use: [
                    {
                        loader: 'expose-loader',
                        options: '$'
                    },
                    {
                        loader: 'expose-loader',
                        options: 'jQuery'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "首页",
            filename: "index1.html",
            template: "./src/index1.html",
            chunks: ["index1", "vendor"],
            minify: { //压缩html
                removeComment: true, //去掉注释
                collapseWhitespace: true //去掉空格。
            }
        }),
        new HtmlWebpackPlugin({
            title: "商品详情",
            filename: "details.html",
            template: "./src/details.html",
            chunks: ["details", "vendor"],
            minify: { //压缩html
                removeComment: true, //去掉注释
                collapseWhitespace: true //去掉空格。
            }
        }),
        new HtmlWebpackPlugin({
            title: "购物车",
            filename: "cartlist.html",
            template: "./src/cartlist.html",
            chunks: ["cartlist", "vendor"],
            minify: { //压缩html
                removeComment: true, //去掉注释
                collapseWhitespace: true //去掉空格。
            }
        }),
        new HtmlWebpackPlugin({
            title: "登录",
            filename: "login.html",
            template: "./src/login.html",
            chunks: ["login", "vendor"],
            minify: { //压缩html
                removeComment: true, //去掉注释
                collapseWhitespace: true //去掉空格。
            }
        }),
        new HtmlWebpackPlugin({
            title: "注册",
            filename: "registry.html",
            template: "./src/registry.html",
            chunks: ["registry", "vendor"],
            minify: { //压缩html
                removeComment: true, //去掉注释
                collapseWhitespace: true //去掉空格。
            }
        }),

    ]

}