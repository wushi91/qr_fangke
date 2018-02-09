const app = getApp()

const request = require('../../utils/request.js')
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isBlankRoom:true,
    myBindRoom:{fangdongPhoneNum:'',},
  },


  toSearchRoomPage:function(){
    
    let userId = util.getMyUserId()
    if (!userId) {
      //未登录
      this.toMyUserLogin()
      return
    }
    wx.navigateTo({
      url: '../myroom/searchRoom/searchRoom'
    })
  },


  toMyUserLogin: function () {
    if (!util.getMyUserId()) {
      //请求权限，获取微信用户信息
      wx.getUserInfo({
        success: res => {
          let userInfo = res.userInfo
          wx.login({
            success: res => {
              let code = res.code
              //获取平台的userId
              request.requestLoginTogetMyUserId(code, userInfo, res => {
                console.log(res.data)
                console.log(res.data.user_id)
                if (res.data.msg ==='0'){
                  util.saveMyUserId(res.data.user_id)
                  // wx.navigateTo({
                  //   url: '../myroom/searchRoom/searchRoom'
                  // })
                  this.toGetMyBindRoom()
                }
               
              })
            }
          })
        }
      })
    }
  },

  loginTips: function () {
    wx.showModal({
      title: '',
      content: '请先登录',
      showCancel: false,
      confirmText: '确定',
      confirmColor: '#2E8AE6',
      success: function (res) {
        if (res.confirm) {
          wx.switchTab({
            url: '../myinfo/myinfo',
          })
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  },
  
  toGetMyBindRoom:function(){
    let userId = util.getMyUserId()
    if (!userId){
      //未登录
      return
    }

    console.log('res')
    // wx.showLoading({
    //   title: '',
    //   mask: true,
    // })
    request.requestGetMyBindRoominfo(userId, res => {
      wx.hideLoading()
      console.log(res)
      let myBindRoom = res.data.list
      myBindRoom.end_time = util.getFormateDate(myBindRoom.end_time)
      myBindRoom.start_time = util.getFormateDate(myBindRoom.start_time)
      this.setData({
        isBlankRoom: false,
        myBindRoom: myBindRoom
      })
    },res=>{
      wx.hideLoading()
      console.log(res.data)
      this.setData({
        isBlankRoom: true
      })
    })

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // wx.showToast({
    //   title: '成功',
    //   icon: 'success',
    //   duration: 2000
    // })
    this.toGetMyBindRoom()
    app.updateMyRoomPage = this.toGetMyBindRoom//监听
    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log('onReady')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log('onShow')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // console.log('onHide')
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
    this.toGetMyBindRoom()
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