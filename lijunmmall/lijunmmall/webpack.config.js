/**
 * Created by 李君 on 2018/12/8.
 */
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); // 加载和打包css文件的插件
var HtmlWebpackPlugin = require('html-webpack-plugin'); // 加载和打包html文件的插件

// 环境变量的配置 dev / online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'
// 获取html-webpack-plugin参数的方法
var getHtmlConfig = function (name, title) {
    return {
        template: './src/view/' + name + '.html', // 指定生成的文件依赖src/view/下的html文件模板
        filename: 'view/' + name + '.html', // 生成文件的文件名
        favicon: './favicon.ico',
        title: title,
        inject: true, // 默认true，script标签位于html文件的 body 底部
        hash: true, // 生成的文件名后面加入hash值
        chunks: ['common', name] // 如果有多个入口文件，打包时会根据选择生成多个文件
    }
}
// webpack的配置项
var config = {
    // 入口文件 （可设置多个入口文件）
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'list': ['./src/page/list/index.js'],
        'detail': ['./src/page/detail/index.js'],
        'cart': ['./src/page/cart/index.js'],
        'order-confirm': ['./src/page/order-confirm/index.js'],
        'order-list': ['./src/page/order-list/index.js'],
        'order-detail': ['./src/page/order-detail/index.js'],
        'payment': ['./src/page/payment/index.js'],
        'user-login': ['./src/page/user-login/index.js'],
        'user-register': ['./src/page/user-register/index.js'],
        'user-pass-reset': ['./src/page/user-pass-reset/index.js'],
        'user-center': ['./src/page/user-center/index.js'],
        'user-center-update': ['./src/page/user-center-update/index.js'],
        'user-pass-update': ['./src/page/user-pass-update/index.js'],
        'result': ['./src/page/result/index.js'],
        'about': ['./src/page/about/index.js'],
    },
    // 输出文件
    output: {
        path: __dirname + '/dist/', // 输出路径
        publicPath: 'dev' === WEBPACK_ENV ? '/dist/' : '//s.happymmall.com/mmall-fe/dist/', // 打包后引用文件路径
        filename: 'js/[name].js' // 输出文件名（js文件夹下的“不同文件名.js”）
    },
    // 外部拓展（比如我们在index.html用CDN的方式引入jquery，webpack编译打包时不处理它，却可以引用到它）
    externals: {
        'jquery': 'window jQuery' // 全局引入jQuery
    },
    // 加载各种依赖
    module: {
        loaders: [
            // 加载css文件
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            {test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]'},
            {
                test: /\.string$/,
                loader: 'html-loader',
                query: {
                    minimize: true,
                    removeAttributeQuotes: false
                }
            }
        ]
    },
    resolve: {
        alias: {
            node_modules: __dirname + '/node_modules',
            util: __dirname + '/src/util',
            page: __dirname + '/src/page',
            image: __dirname + '/src/image',
            service: __dirname + '/src/service',
        }
    },
    // 加载webpack插件
    plugins: [
        // CommonsChunkPlugin: 打包独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common', // 被打包的模块名称（与entry对应）
            filename: 'js/base.js' // 打包后生成的文件名（在dist目录下）
        }),
        // 把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        // html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表')),
        new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情')),
        new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
        new HtmlWebpackPlugin(getHtmlConfig('order-confirm', '订单确认')),
        new HtmlWebpackPlugin(getHtmlConfig('order-list', '订单列表')),
        new HtmlWebpackPlugin(getHtmlConfig('order-detail', '订单列表')),
        new HtmlWebpackPlugin(getHtmlConfig('payment', '订单支付')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
        new HtmlWebpackPlugin(getHtmlConfig('about', '关于MMall')),
    ]
};

if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}
module.exports = config;