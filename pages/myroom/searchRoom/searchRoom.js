const request = require('../../../utils/request.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: [],//默认值
    inputHouseName:'',
    selectBookId:'',
    houseSearchList: [],//{ name: 'B101' }, { name: 'D101' }, { name: 'D102' }, { name: 'B401' }
  },

  bindRegionChange:function(e){
    this.setData({
      region: e.detail.value
    })
  },

  bindHouseNameInput: function (e) {
    if (e.detail.value){
      //输入为空的时候不做搜索
      this.searchTheHouse(e.detail.value)
    }
    
    this.setData({
      selectHouseid:'',
      selectBookId:'',
      
    })
  },

  chooseTheHouse: function (e){
    let bookid = e.currentTarget.dataset.bookid
    let address = e.currentTarget.dataset.address
    let houseid = e.currentTarget.dataset.houseid
    this.setData({
      // inputHouseName: bookid,
      selectBookId: bookid,
      selectHouseid: houseid,
      inputHouseName: address,
      houseSearchList:[]
    })
  },

  //搜索房源
  searchTheHouse:function(address){
    let province = this.data.region[0]
    let city = this.data.region[1]
    // address ? "":address = this.data.inputHouseName
    request.requestToSearchHouse(province, city, address, res => {
      console.log(res.data)
      //有数据
      this.setData({
        houseSearchList: res.data.list
      })
    },res=>{
      this.setData({
        houseSearchList: []
      })
    })
  },

  toConfirmTheHouse: function () {
    if (!this.data.selectBookId){
      this.roomHasNoTips()
      return
    }
    

    wx.redirectTo({
      url: '/pages/myroom/confirmRoom/confirmRoom?bookid=' + this.data.selectBookId + '&houseid=' + this.data.selectHouseid
    })
    
    
  },

  roomHasNoTips: function () {
    wx.showModal({
      title: '没有找到该房源',
      content: '请先联系房东添加房源和租客信息',
      showCancel: false,
      confirmText: '确定',
      confirmColor: '#2E8AE6',
    })
  },


  toGetLocationByWxGPS: function () {
    wx.getLocation({
      success: res => {
        let lb = res
        request.requestBaiduAddress(lb, res => {
          console.log(res)
          let address = res.data.result.addressComponent
          let province = address.province
          let city = address.city
          let district = address.district
          this.setData({
            region: [province, city, district],
          })
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  

    this.toGetLocationByWxGPS()
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