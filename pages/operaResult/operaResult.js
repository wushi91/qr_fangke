
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    operaTypes: { confirm_house_success: '绑定成功',
     pay_success_rent: '交租成功', 
     pay_fail_password_error: '支付失败', 
     pay_fail_some_error: '支付失败' },
    operaType: 'confirm_house_success',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      operaType: options.operaType
    })
    wx.setNavigationBarTitle({
      title: this.data.operaTypes[this.data.operaType]
    })
  },

  backToIndexPage:function(){
    //首页的数据要刷新
    app.updateMyRoomPage()
    // wx.navigateBack({
    //   delta: 1
    // })
    wx.switchTab({
      url: '/pages/myroom/myroom',
    })
    
  },

  backToBillPage:function(){
    app.updateMyBillPage()
    wx.navigateBack({
      delta: 1
    })
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