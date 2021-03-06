/*
 * 酱茄小程序开源版
 * Author: 酱茄
 * Help document: https://www.jiangqie.com/docs/kaiyuan/id1
 * github: https://github.com/longwenjunjie/jiangqie_kafei
 * gitee: https://gitee.com/longwenjunj/jiangqie_kafei
 * License：MIT
 * Copyright ️ 2020 www.jiangqie.com All rights reserved.
 */

const Auth = require('../../utils/auth');
const Api = require('../../utils/api.js');
const Rest = require('../../utils/rest');

Page({

    data: {
        background: Api.JIANGQIE_BG_INDEX,
        title: ''
    },

    onLoad: function (options) {
        this.setData({
            title: getApp().app_name
        });
    },

    onShareAppMessage: function () {
        return {
            title: getApp().app_name,
            path: 'pages/index/index',
        }
    },

    handlerCancelClick: function(e) {
        wx.navigateBack();
    },

    handlerLoginClick: function(e) {
        let that = this;
        Auth.getWXUser().then(res => {
            return Rest.get(Api.JIANGQIE_USER_LOGIN, {
                code: res.code,
                encrypted_data: encodeURIComponent(res.encryptedData),
                iv: encodeURIComponent(res.iv),
                nickName: res.userInfo.nickName, //测试
                avatarUrl: res.userInfo.avatarUrl, //测试
            })
        }).then(res => {
            let user = res.data;
            Auth.setUser(user);
            
            wx.navigateBack();
            // wx.reLaunch({
            //   url: '/pages/ucenter/ucenter',
            // })
        });
    }
})