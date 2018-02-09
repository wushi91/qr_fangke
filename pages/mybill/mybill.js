// pages/mybill/mybill.js

const app = getApp()

const request = require('../../utils/request.js')
const util = require('../../utils/util.js')
// const test = require('../../utils/test.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

    tab_status: [{ prop: 'nopay', label: '待支付' },
    { prop: 'haspay', label: '已支付' },],
    currentStatus: 'nopay',

    noPayOrederList: null,
    hasPayOrederList: null,

    nowTime:new Date().getTime()
  },

  payTabClick: function (e) {
    let currentStatus = e.currentTarget.dataset.currentStatus
    this.setData({
      currentStatus: currentStatus
    })
  },

  

  toBillDeatil:function(e){
    var payStatus = this.data.currentStatus
    let billid = e.currentTarget.dataset.billid
    let title = e.currentTarget.dataset.title
    wx.navigateTo({
      url: "/pages/mybill/billdetail/billdetail?payStatus=" + payStatus + "&billid=" + billid +'&title='+title
    })
  },

  // toShowBlank(){
  //   this.setData({

  //     // isBlankBill: this.data.noPayOrederList.length === 0 && this.data.hasPayOrederList.length === 0
  //     isBlankBill:false
  //   })
  // },


  getUnpayBill: function (userId){
    request.requestGetUnpayBillList(userId, res => {
      
      let noPayOrederList = []

      for (let i = 0; i < res.data.list.length; i++) {
        
        let item = res.data.list[i]

        console.log(this.data.nowTime)
        if (item.start_time<this.data.nowTime){
          // 确定为未交费的
          item.needPay = true
        }else{
          item.needPay = false
        }
        item.end_time = util.getFormateDate(item.end_time)
        item.start_time = util.getFormateDate(item.start_time)

        if (item.needPay){
          noPayOrederList.push(item)
        }
      }

      this.setData({
        noPayOrederList: noPayOrederList
      })

    },res=>{

      this.setData({
        noPayOrederList: null
      })
      
    })
  },

  getHaspayBill: function (userId){
    request.requestGetHaspayBillList(userId, res => {
      console.log(res.data)
      
      let hasPayOrederList = res.data.list
      for (let i = 0; i < hasPayOrederList.length; i++) {
        let item = hasPayOrederList[i]
        if (!isNaN(item.balance)) { item.balance = item.balance }
        item.end_time = util.getFormateDate(item.end_time)
        item.start_time = util.getFormateDate(item.start_time)
      }

      this.setData({
        hasPayOrederList: hasPayOrederList
      })

    },res=>{

      this.setData({
        hasPayOrederList: null
      })
    })
  },

  toGetAllBillList: function (){
    let userId = util.getMyUserId()
    if (!userId) {
      //还没有登录
      return
    }
    //待支付的账单列表
    this.getUnpayBill(userId)
    this.getHaspayBill(userId)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // util.test()
    // test.test()
    app.updateMyBillPage = this.toGetAllBillList
    let userId = util.getMyUserId()
    if (!userId) {
      //还没有登录
      return
    }

    this.toGetAllBillList()
    

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
    this.toGetAllBillList()
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