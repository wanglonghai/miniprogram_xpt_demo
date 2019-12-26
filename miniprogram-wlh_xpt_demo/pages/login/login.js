// pages/login/login.js
var util = require('../../utils/const.js');
console.log("【【【引入域名地址】】】");
console.log(util.httpUrl);
var httpurl = util.httpUrl;
Page({
  gotoHouseDetail: function(){
    wx.reLaunch({
      url: '/pages/houseDetailTest/houseDetailTest'
    });
  },
  webLogin:function(){
    //发起网络请求
    wx.request({
      url: httpurl + '/login',
      method: "post",
      data: {
        userName: 'admin',
        passWord: 'admin'      
      },
      success: function (result) {
        var successJson = result.data;
        console.log(successJson);
        if (successJson.code == 0) {
          //wx.setStorageSync("userInfo", infoRes.userInfo);
          //wx.setStorageSync("loginInfo", successJson.userInfo.userInfo);
          wx.setStorageSync("token", successJson.data.token);
          wx.reLaunch({
            url: '/pages/index/index'
          })
        } else {
          console.log("登陆失败", successJson);
        }
      },
      fail(e) {
        console.log(e);
      }
    })
  },
  wxLogin: function () {
    wx.login({
      success(loginRes) {
        if (loginRes.code) {
          // 必须是在用户已经授权的情况下调用
          wx.getUserInfo({
            success: function (infoRes) {
              var userInfo = infoRes.userInfo
              var nickName = userInfo.nickName
              var avatarUrl = userInfo.avatarUrl
              var gender = userInfo.gender //性别 0：未知、1：男、2：女
              var province = userInfo.province
              var city = userInfo.city
              var country = userInfo.country
              //发起网络请求
              wx.request({
                url: httpurl + '/applet/login',
                method: "post",
                data: {
                  userInfo: infoRes.userInfo,
                  encryptedData: infoRes.encryptedData,
                  iv: infoRes.iv,
                  code: loginRes.code
                },
                success: function (result) {
                  var successJson = result.data;
                  console.log(successJson);
                  if (successJson.code == 0) {
                    wx.setStorageSync("userInfo", infoRes.userInfo);
                    wx.setStorageSync("loginInfo", successJson.userInfo.userInfo);
                    wx.setStorageSync("token", successJson.userInfo.token);
                    wx.reLaunch({
                      url: '/pages/index/index'
                    })
                  } else {
                    console.log("登陆失败", successJson);
                  }
                },
                fail(e) {
                  console.log(e);
                }
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      },
      fail:function(res){
        console.log(res);
      }
    })
  }
}  
)