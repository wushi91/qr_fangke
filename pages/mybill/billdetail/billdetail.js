// pages/mybill/billdetail/billdetail.js

const request = require('../../../utils/request.js')
const util = require('../../../utils/util.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    payStatuss: {
      nopay: '确认账单',
      haspay: '账单详情',
    },
    payStatus: 'haspay',
    billid:'',
    billBean:{},
    title:''

  },

  payTheRenter:function(){

    wx.showLoading({
      title: '',
      mask:true,
    })
    wx.login({
      success:res=>{
        let code = res.code
        let hid = this.data.billBean.hid
        let title = this.data.billBean.title
        let money = this.data.billBean.balance
        // money =1
        request.requestGetPayWxData(code, hid, title, money, res => {
          wx.hideLoading()
          console.log(res.data)
          this.wxPay(res.data)
        }, res=>{
          wx.hideLoading()
          console.log(res.data)
          this.wxPay(res.data)
          
        })
      }
    })
    
    
  },

  wxPay:function(wxData){
    
    wx.requestPayment({
      'timeStamp': wxData.time_STAMP,
      'nonceStr': wxData.nonce_STR,
      'package': wxData.package,
      'signType': 'MD5',
      'paySign': wxData.sign,
      'success': function (res) {
        // console.log('支付成功，跳转页面')
        wx.redirectTo({
          url: "/pages/operaResult/operaResult?operaType=pay_success_rent",
        })

      },
      'fail': function (res) {
        console.log('fail')
      }
    })
  },

  toGetTheNoPayDeatil:function(billid){

    console.log('--------------------')
    if(billid){
      let userId = util.getMyUserId()
      request.requestGetUnpayBillDetail(userId,billid,res=>{
        console.log(res.data)
        let billBean = res.data.list
        billBean.end_time = util.getFormateDate(billBean.end_time)
        billBean.start_time = util.getFormateDate(billBean.start_time)
        this.setData({
          billBean: billBean,
        })
      },res=>{
        console.log(res)
      })
    }
  },

  toGetTheHasPayDeatil:function(billid){
    if (billid) {
      let userId = util.getMyUserId()
      let title = this.data.title
      request.requestGetHaspayBillDetail(userId, billid,title, res => {
        // console.log(res.data)
        let billBean = res.data.list
        if (!isNaN(billBean.balance)) { billBean.balance = billBean.balance }
        billBean.end_time = util.getFormateDate(billBean.end_time)
        billBean.start_time = util.getFormateDate(billBean.start_time) 
        billBean.trading_time = util.formatTime(new Date(billBean.trading_time))
        this.setData({
           billBean: billBean,
        })
      },res=>{
        console.log(res)
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      payStatus: options.payStatus,
      billid: options.billid,
      title: options.title
    })

    console.log(this.data.title)
    if (options.payStatus ==='nopay'){
      this.toGetTheNoPayDeatil(options.billid)
    }else{
      this.toGetTheHasPayDeatil(options.billid)
    }
    wx.setNavigationBarTitle({
      title: this.data.payStatuss[this.data.payStatus]
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