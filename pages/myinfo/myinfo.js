const util = require('../../utils/util.js')
const request = require('../../utils/request.js')


//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'微信授权登录',
    headerimagesrc:'/images/unlogin-header-image.png',
  },

  toMyUserLogin:function(){
    if (!util.getMyUserId()){
      //请求权限，获取微信用户信息
      wx.getUserInfo({
        success: res => {
          let userInfo = res.userInfo
          wx.login({
            success: res => {
              let code = res.code
              //获取平台的userId
              request.requestLoginTogetMyUserId(code, userInfo, res => {
                console.log(res.data.user_id)
                util.saveMyUserId(res.data.user_id)
                this.setData({
                  username: userInfo.nickName,
                  headerimagesrc: userInfo.avatarUrl,
                })
                app.updateMyRoomPage()
                app.updateMyBillPage()
              })
            }
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    if (util.getMyUserId()) {
      // 已经登录
      //如果已经登录，获取微信用户信息
      wx.getUserInfo({
        success: res => {
          console.log(res.userInfo)
          this.setData({
            username: res.userInfo.nickName,
            headerimagesrc: res.userInfo.avatarUrl,
          })
        }
      })
    } else {
      // 未登录
    }
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