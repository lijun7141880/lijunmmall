/**
 * Created by 李君 on 2018/12/10.
 */
require('./index.css');
var _mm = require('util/mm.js');
// 通用页面头部
var header = {
    init : function() {
        this.onLoad();
        this.bindEvent();
        return this
    },
    onLoad: function () {
        // 获取url参数
      var keyword = _mm.getUrlParam('keyword');
        console.log(keyword)
        // 如果rul中存在参数
        if(keyword){
            // 参数回填到搜索框中
            $('#search-input').val(keyword);
        };
    },
    bindEvent: function () {
        var _this = this;
        // 点击搜索按钮触发提交事件
        $('#search-btn').click(function () {
            _this.searchSubmit()
        });
        // 输入回车后，做搜索提交
        $('#search-input').keyup(function (e) {
            if(e.keyCode === 13){
                _this.searchSubmit()
            }
        })
    },
    // 搜索的提交
    searchSubmit: function () {
        // 获取搜索框中内容，并且去掉收尾空格
        var keyword = $.trim($('#search-input').val());
        // 如果提交的时候有keyword
        if(keyword){
            // 正常跳转到list页，并且传入参数
            window.location.href = './list.html?keyword=' + keyword;
        // 如果keyword为空
        }else{
            // 直接返回首页
            _mm.goHome();
        }
    }
};
header.init();