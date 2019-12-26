//index.js
//获取应用实例
var util = require('../../utils/const.js');
console.log("【【【引入域名地址】】】");
console.log(util.httpUrl);
const app = getApp()
//var httpurl ="http://xpt.ngrok.5fanqie.com";
var httpurl = util.httpUrl;
Page({
  data: {
    orderNo: '',
    totalAmount:0,
    orderAmount:0,
    houseId:7570,
    houseType:2,
  },
  gotoHouseDetail: function () {
    wx.reLaunch({
      url: '/pages/houseDetailTest/houseDetailTest?houseId=7750&tk=' + wx.getStorageSync("token")
    });
  },
  onShareAppMessage: function (res) {
    console.log("分享来自");
    console.log(res);
    var uri ="/pages/housedetail/housedetail";
    var imageUrl = "http://img.xmfczc.com/upload/houseresource/20190908163804555979215.jpg@1e_588w_441h_0c_0i_1o_90Q_1x.jpg";
    if (res.from === 'button') {
      console.log("分享动作来自按钮");
    } else if (res.from === 'menu'){
      console.log("分享动作来自右上角菜单");
      uri ="/pages/housedetail/housedetailTest";
      uri ="https://www.baidu.com";
      imageUrl   ="http://mmbiz.qpic.cn/mmbiz_jpg/89czjF6sZHhpONJNmic7R9Xjzw2CIiaA8jNC3rrKbYHYR2CREt8SSMUJkR490Svkwic25NbjmRqiaF92Zkd5uiaiczDA/640?  wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1";
    }
    return {
      title: '房源分享',
      desc: '房源具体内容',
      imageUrl:imageUrl,
      //trId：任务接单id,taskId：任务id,houseType：房源类型，houseId：房源id，
      //sharePersonId：分享人员id，sharePersonType：分享人员类型
      //contactPerId:跟单人id，contactPerType:跟单人类型,tk:登录token
      path: uri+'?houseId=7570&houseType=1&trId=1&taskId=1&sharePersonId=1&sharePersonType=1&contactPerId=1&contactPerType=0&tk=' + wx.getStorageSync("token"),
      success: function (res) {
        console.log('分享房源成功', res)
      }
    }
  },
  bindPayInput: function (e) {
    this.setData({
      orderAmount: e.detail.value
    })
  },
  bindRedPackInput: function (e) {
    this.setData({
      totalAmount: e.detail.value
    })
  },
  toAnotherPage:function(){
    var that = this;
    if(this.data.totalAmount==0){
      wx.showModal({
        title: '提示',
        content: '请输入金额',
      })
      return;
    }
    wx.showModal({
      title: '提示',
      content: '确定提现吗',
      success(res) {
        if (res.confirm) {
          wx.login({
            success(res) {
              if (res.code) {
                //调用鑫平台接口创建订单，返回订单号，并调起小程序支付窗口完成支付
                wx.request({
                  method: "post",
                  header:{"tk":wx.getStorageSync("token")},
                  url: httpurl+'/order/orderInfo/createOrder',
                  data: {
                    code: res.code,
                    //固定
                    tradeType: 'JSAPI',
                    //支付类型，0现金，1鑫币
                    payType: 0,
                    //业务类型，0任务订单，1广告订单
                    businessType: 0,
                    //订单金额
                    orderAmount: that.data.totalAmount,
                    //收支类型，0支出，1收入
                    balanceType: 1,                   
                    //发起支付的平台标识，4标识鑫平台小程序
                    platForm: 4
                  },
                  success: function (result) {
                    var response = result.data;
                    console.log(response);
                    if (response.code != 0) {//不成功
                      wx.showModal({
                        title: '提示',
                        content: response.msg
                      }
                      );
                    } else {
                      //通过跳转到公众号页面领红包
                      var codeUrl = response.data.codeUrl;
                      var params = encodeURIComponent(codeUrl+"&tk=" + wx.getStorageSync("token"));
                      console.log("跳转链接："+params);
                      wx.navigateTo({
                        url: '/pages/anotherpage/anotherpage?params=' + params,
                      });
                      //由于小程序领取红包仅仅支持扫码进入的场景，所以不通过小程序领取红包
                      // var payInfoMap = response.data.payInfoMap;
                      // wx.sendBizRedPacket({
                      //   timeStamp: payInfoMap.timeStamp, // 支付签名时间戳，
                      //   nonceStr: payInfoMap.nonceStr, // 支付签名随机串，不长于 32 位
                      //   package: payInfoMap.packageValue, //扩展字段，由商户传入
                      //   signType: payInfoMap.signType, // 签名方式，
                      //   paySign: payInfoMap.paySign, // 支付签名
                      //   success: function (res) { console.log(res) },
                      //   fail: function (res) { console.log(res) },
                      //   complete: function (res) { console.log(res) }
                      // })    

                    }


                  }
                })
              }
            },
            fail(res) {
              console.log(res);
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })    

  },
  payForXPT: function () {
    var that = this;
    if (this.data.orderAmount == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入支付金额',
      })
      return;
    }
    wx.showModal({
      title: '提示',
      content: '确定支付吗',
      success(res) {
        if (res.confirm) {
          wx.login({
            success(res) {
              if (res.code) {
                //调用鑫平台接口创建订单，返回订单号，并调起小程序支付窗口完成支付
                wx.request({
                  method:"post",
                  header: { "tk": wx.getStorageSync("token") },
                  url: httpurl+'/order/orderInfo/createOrder',
                  data: {
                    code: res.code,                   
                    //固定
                    tradeType: 'JSAPI',
                    //支付类型，0现金，1鑫币
                    payType:0,                  
                    //业务类型，0任务订单，1广告订单
                    businessType: 0,
                    //订单金额
                    orderAmount: that.data.orderAmount,
                    //收支类型，0支出，1收入
                    balanceType: 0,                    
                    //发起支付的平台标识，4标识鑫平台小程序
                    platForm: 4
                  },
                  success: function (result) {
                    var response = result.data;
                    console.log(response);
                    if (response.code != 0) {
                      wx.showModal({
                        title: '提示',
                        content: response.msg
                      });
                    } else {
                      var orderNo = response.data.orderNo;
                      console.log("订单号：" + orderNo);
                      //把订单号保存起来，用于查询支付状态
                      that.data.orderNo = orderNo;
                      var payInfoMap = response.data.payInfoMap;
                      console.log("调起支付相关参数");
                      console.log(payInfoMap);
                      //调起小程序支付
                      wx.requestPayment(
                        {
                          'timeStamp': payInfoMap.timeStamp,
                          'nonceStr': payInfoMap.nonceStr,
                          'package': payInfoMap.packageValue,
                          'signType': payInfoMap.signType,
                          'paySign': payInfoMap.paySign,
                          'success': function (res) {
                            //回调成功可以做个提醒支付成功，真正判断订单是否支付存在，还是要根据订单号轮询后台提供接口查询
                            console.log('success');
                            //res={errMsg:"requestPayment:ok"}
                            console.log(res);
                            setTimeout(function () {
                              wx.reLaunch({
                                url: '/pages/successfull/paysuccessfull',
                              })
                            }, 200);
                          },
                          'fail': function (res) {
                            console.log('fail');
                            console.log(res);
                          },
                          'complete': function (res) {
                            console.log('complete');
                            console.log(res);
                          }
                        });
                    }


                  }
                })
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //询问订单的支付状态
  askOrderStatus: function () {
    var that = this;
    if (that.data.orderNo == '') {
      wx.showToast({
        title: '请先支付',
      })
      return;
    }
    wx.request({
      url: httpurl +'/order/orderInfo/getPayStatus',
      method: 'get',
      header: { "tk": wx.getStorageSync("token") },
      data: {
        orderNo: that.data.orderNo
      },
      success: function (res) {
        console.log("获取支付状态");
        console.log(res.data);
        if (res.data.code == 0) {
          if (res.data.status == 1) {
            wx.showToast({
              title: '订单已支付',
            })
          } else {
            wx.showToast({
              title: '订单未支付',
            })
          }

        } else {
          console.log("获取订单状态服务接口失败");
        }
      }
    })
  },
  getPhoneNumber: function (e) {//点击获取手机号码按钮
    var that = this;
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
        console.log('拒绝授权');


    } else {//同意授权

      wx.login({
        success(res) {
          if (res.code) {
            var code=res.code;
            var ency = e.detail.encryptedData;
            var iv = e.detail.iv;      
            wx.request({
              method: "POST",
              header: { "tk": wx.getStorageSync("token") },
              url: httpurl +'/uniapp/getPhoneNumber',
              data: {
                code: code,
                encryptedData: ency,
                iv: iv

              },
              success: (res) => {
                var response=res.data;
                if (response.code != 0) {
                  console.log("失败~~~~~~到本地~~~~~~~~");
                  wx.showModal({
                    title: '提示',
                    content: '失败'
                  }
                  );  

                } else {
                  console.log("解密成功~~~~~~~将解密的号码保存到本地~~~~~~~~");

                  console.log(response);

                  var phone = response.data.phoneNumber;

                  console.log(phone);
                  wx.showModal({
                    title: '提示',
                    content: phone
                  }
                  );     
                }



              }, fail: function (res) {

                console.log("解密失败~~~~~~~~~~~~~");

                console.log(res);

              }

            })
          }
        }
      })


    }
  }

})
