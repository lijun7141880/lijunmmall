/**
 * Created by 李君 on 2018/12/17.
 */
/**
 * Created by 李君 on 2018/12/9.
 */
var _mm = require('util/mm.js');

var _product = {
    // 登录
    getProductList: function (listParam, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/product/list.do'),
            data: listParam,
            success: resolve,
            error: reject
        });
    },
    // 获取商品详细信息
    getProductDetail: function (productId, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/product/detail.do'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject
        });
    }
};

module.exports = _product;