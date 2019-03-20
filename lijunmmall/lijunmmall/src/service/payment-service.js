/**
 * Created by 李君 on 2018/12/17.
 */
/**
 * Created by 李君 on 2018/12/9.
 */
var _mm = require('util/mm.js');

var _payment = {
    // 获取支付信息
    getPaymentInfo: function (orderNumber, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/pay.do'),
            data: {
                orderNo: orderNumber
            },
            success: resolve,
            error: reject
        });
    },
    // 获取支付状态
    getPaymentStatus: function (orderNumber, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/query_order_pay_status.do'),
            data: {
                orderNo: orderNumber
            },
            success: resolve,
            error: reject
        });
    }
};

module.exports = _payment;