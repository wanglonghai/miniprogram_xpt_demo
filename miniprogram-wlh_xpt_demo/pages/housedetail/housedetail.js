// pages/housedetail/housedetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    houseUrl:"https://testwap.0be.cn/pages/salehouse_detail/salehouse_detail_xpt?"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var params='';
    var kv = Object.getOwnPropertyNames(options);
    if (kv instanceof Array && kv.length > 0) {
      for (var i in kv) {
        params += [kv[i]] + "=" + options[kv[i]]+"&";
      }
    }  
     this.setData({
       houseUrl: this.data.houseUrl + params
     });
     console.log("房源详情地址："+this.data.houseUrl);
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