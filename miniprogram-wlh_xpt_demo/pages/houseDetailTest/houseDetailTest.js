var util = require('../../utils/const.js');
console.log("【【【引入域名地址】】】");
console.log(util.httpUrl);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    houseUrl: util.httpUrl +"/wx/houseDetailTest?"
  },
  handleGetMessage: function (e) {
    console.log(e.target.data)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var params = '';
    var kv = Object.getOwnPropertyNames(options);
    if (kv instanceof Array && kv.length > 0) {
      for (var i in kv) {
        params += [kv[i]] + "=" + options[kv[i]] + "&";
      }
    }
    this.setData({
      houseUrl: this.data.houseUrl + params
    });
    console.log("房源详情地址：" + this.data.houseUrl);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})