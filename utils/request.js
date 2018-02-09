const util = require('../utils/util.js')
// const host = 'http://192.168.2.221:8080'

// const host = 'http://192.168.2.119:8080'
// const host = 'http://139.199.16.2214:80'
const host = 'https://www.0755qr.com'

//登录
const login_get_user_id_url = host+'/rentBook/user/authorise.do'
//搜索房源 该市所有房源下
const to_search_house_url = host +'/rentBook/tenant/findAddress.do'
//获取手机验证码
const get_message_code_url = host + '/rentBook/landlord/getBindCode.do'
//验证手机验证码
const check_message_code_url = host + '/rentBook/landlord/checkBindCode.do'
//绑定房源
const to_confirm_house_url = host +'/rentBook/tenant/userBanding.do'
//待支付的账单列表
const get_unpay_billlist_url = host + '/rentBook/tenant/getUserPayment.do'
//已支付的账单列表
const get_haspay_billlist_url = host + '/rentBook/tenant/TenantPaid.do'
//待支付的账单详细
const get_unpay_billdetail_url = host + '/rentBook/tenant/getRentPaymentInfo.do'
//已支付的账单详细
const get_haspay_billdetail_url = host + '/rentBook/tenant/TenantPaidDetail.do'
//获取我的绑定房源
const get_mybind_room_url = host + '/rentBook/tenant/showBind.do'
//获取微信支付的参数
const get_wxdata_topay_url = host +'/rentBook/pay/getWxPayParameters.do'


//登录
const requestLoginTogetMyUserId = function (wxCode, wxUserInfo, code200) {
  let data = {
    code: wxCode,
    userInfo: wxUserInfo
  }
  // console.log('接口里面')
  console.log(data)
  util.wxGet(login_get_user_id_url, data, code200)
}

//搜索房源 该市所有房源下
const requestToSearchHouse = function (province, city, address, code200,error) {
  
  let url = to_search_house_url
  let data = {
    province: province,
    city: city,
    address: address
  }
  util.wxGet(url, data, code200, error)

}

//获取手机验证码
const requestGetMessageCode = function (phoneNumber, houseid, code200,error) {
  let url = get_message_code_url
  let data = {
    hid: houseid,
    phoneNumber: phoneNumber
  }
  util.wxGet(url, data, code200, error)
}

//验证手机验证码
const requestCheckMessageCode = function (phoneNumber, messageCode, code200,error) {
  let url = check_message_code_url
  let data = {
    phoneNumber: phoneNumber,
    inputverificationCode: messageCode
  }
  util.wxGet(url, data, code200,error)
}

//绑定房源
const requestToConfirmHouse = function (bookid, phoneNumber, user_id, code200,error){


  let url = to_confirm_house_url
  let data = {
    id: bookid,
    phoneNumber: phoneNumber,
    user_id: user_id
  }
  util.wxGet(url, data, code200, error)
}



//待支付的账单列表
const requestGetUnpayBillList = function (user_id, code200, error) {

  let url = get_unpay_billlist_url
  let data = {
    user_id: user_id
  }
  util.wxGet(url, data, code200, error)
}


//已支付的账单列表
const requestGetHaspayBillList = function (user_id, code200,error) {
  let url = get_haspay_billlist_url
  let data = {
    user_id: user_id
  }
  util.wxGet(url, data, code200, error)
}


//待支付的账单详细
const requestGetUnpayBillDetail = function (user_id, billid, code200,error) {


  let url = get_unpay_billdetail_url
  let data = {
    id: billid,
    user_id: user_id
  }
  util.wxGet(url, data, code200,error)
}


//已支付的账单详细
const requestGetHaspayBillDetail = function (user_id, billid, title, code200, error) {
  let url = get_haspay_billdetail_url
  let data = {
    pay_id: billid,
    user_id: user_id,
    title: title
  }
  util.wxGet(url, data, code200,error)
}


//获取我的绑定房源
const requestGetMyBindRoominfo = function (user_id, code200,error) {
  let url = get_mybind_room_url
  let data = {
    user_id: user_id
  }
  util.wxGet(url, data, code200,error)
}

//获取微信支付的参数
const requestGetPayWxData = function (code, hid, title, totalMoney, code200,error) {
  let url = get_wxdata_topay_url
  let data = {
    code: code,
    hid: hid,
    title: title,
    totalMoney: totalMoney,
    body: title,
    type: '充值'
  }
  util.wxGet(url, data, code200, error)
}


const requestBaiduAddress = function (lb, success) {
  let ak = 'It0GdmpH8Rl8P8oUNwqSUi4ZKOIuGKlA'//需要个人申请
  let url = 'https://api.map.baidu.com/geocoder/v2/?ak=' + ak + '&location=' + lb.latitude + ',' + lb.longitude + '&output=json&coordtype=wgs84ll'

  wx.request({
    url: url,
    success: success,
    fail: res => {
      console.log(res)
    }
  })
}








module.exports = {
  requestLoginTogetMyUserId: requestLoginTogetMyUserId,
  requestToSearchHouse: requestToSearchHouse,
  requestGetMessageCode: requestGetMessageCode,
  requestCheckMessageCode: requestCheckMessageCode,
  requestToConfirmHouse: requestToConfirmHouse, 
  requestGetUnpayBillList: requestGetUnpayBillList,
  requestGetHaspayBillList: requestGetHaspayBillList,
  requestGetUnpayBillDetail: requestGetUnpayBillDetail,
  requestGetHaspayBillDetail: requestGetHaspayBillDetail,
  requestGetMyBindRoominfo: requestGetMyBindRoominfo,
  requestGetPayWxData: requestGetPayWxData,
  requestBaiduAddress
}