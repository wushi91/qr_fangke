const request = require('../../../utils/request.js')
const util = require('../../../utils/util.js')
const Verification = require('../../../utils/Verification.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNum:'',
    messageCode:'',
    bookid:'',
    houseid: '',
    
    seconds: 60,
    daoji_timer: 60,
    daojishi: '获取验证码',
    canClickCode:true
  },

  waitToGetRegisteCode: function () {
    this.setData({
      daojishi :'重新发送(' + this.data.daoji_timer + ')'
    })
    if (this.data.daoji_timer > 0) {
      this.setData({
        daoji_timer: this.data.daoji_timer - 1
      })
      setTimeout(this.waitToGetRegisteCode, 1000)
    } else {
      this.setData({
        daojishi: '重新发送',
        canClickCode: true,
        daoji_timer : this.data.seconds
      })
      
    }
  },


  chooseTheHouse:function(){
    //首先验证短信码
    request.requestCheckMessageCode(this.data.phoneNum, this.data.messageCode,res=>{
      console.log(res.data)
      //之后要进行绑定房源
      this.bindTheHouse()
    })

  },

  roomHasNoTips: function () {
    wx.showModal({
      title: '房源不匹配',
      content: '该手机号与房源不匹配，请联系房东修改租客手机号',
      showCancel: false,
      confirmText: '知道了',
      confirmColor: '#2E8AE6',
    })
  },

  bindTheHouse:function(){
    if (!this.data.bookid) {
      //不存在的房源
      console.log('房源不存在')
    }
    let userId = util.getMyUserId()
    request.requestToConfirmHouse(this.data.bookid, this.data.phoneNum, userId, res => {
      //绑定成功，跳转页面
      wx.redirectTo({
        url: "/pages/operaResult/operaResult?operaType=confirm_house_success",
      })
    },res=>{
      //对话框提示
      this.roomHasNoTips()
    })
  },
  bindinputPhoneNum:function(e){
    let phoneNum = e.detail.value
    this.setData({
      phoneNum: phoneNum
    })
  },

  bindinputMessage: function (e) {
    let messageCode = e.detail.value
    this.setData({
      messageCode: messageCode
    })
  },


  getMessageCode:function(){
    console.log('getMessageCode')
    console.log(this.data.phoneNum)

    
    if (!Verification.isPhoneNum(this.data.phoneNum)){
      wx.showModal({
        title: '请输入正确的手机号',
        content: '',
        showCancel: false,
        confirmText: '确定',
        confirmColor: '#2E8AE6',
      })
      return 
    }


    this.setData({
      canClickCode: false
    })
    this.waitToGetRegisteCode()
    request.requestGetMessageCode(this.data.phoneNum, this.data.houseid,res=>{
      
    },res=>{
      //对话框提示

      this.roomHasNoTips()

      this.setData({
        daoji_timer:1
      })
    })

    

    // requestGetMessageCode: requestGetMessageCode,
    //   requestCheckMessageCode: requestCheckMessageCode
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    console.log(options)
    this.setData({
      bookid: options.bookid,
      houseid: options.houseid
    })

    // this.roomHasNoTips()
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