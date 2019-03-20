/**
 * Created by 李君 on 2018/12/15.
 */
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string');

var page = {
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        navSide.init({
            name: 'user-center'
        });
        this.loadUserInfo();
    },
    bindEvent: function () {
        var _this = this;
        // 点击提交按钮后的动作
        $(document).on('click', '.btn-submit', function () {
            var userInfo = {
                    phone: $.trim($('#phone').val()),
                    email: $.trim($('#email').val()),
                    question: $.trim($('#question').val()),
                    answer: $.trim($('#answer').val())
                },
                validateResult = _this.validateForm(userInfo);
                if(validateResult.status){
                    _user.updateUserInfo(userInfo, function (res, msg) {
                        _mm.successTips(msg);
                        window.location.href = './user-center.html'
                    }, function (errMsg) {
                        _mm.errorTips(errMsg);
                    });
                }
                else{
                    _mm.errorTips(validateResult.msg);
                }
        });
    },
    // 加载用户信息
    loadUserInfo: function() {
        var userHtml = '';
        _user.getUserInfo(function (res) {
            userHtml = _mm.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function (errMsg) {
            _mm.errorTips(errMsg)
        })
    },
    // 验证字段信息
    validateForm: function(formData) {
        var result = {
            status: false,
            msg: ''
        };
        if(!_mm.validate(formData.phone, 'require')){
            result.msg = '手机号不能为空';
            return result
        }
        if(!_mm.validate(formData.email, 'require')){
            result.msg = '邮箱不能为空';
            return result
        }
        if(!_mm.validate(formData.question, 'require')){
            result.msg = '密码提示问题不能为空';
            return result
        }
        if(!_mm.validate(formData.answer, 'require')){
            result.msg = '密码提示问题答案不能为空';
            return result
        }
        // 通过验证, 返回正确
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};
$(function () {
    page.init();
});