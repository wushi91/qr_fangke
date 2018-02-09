const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


const getMyUserId = function () {
  return wx.getStorageSync('user_id') || ''
}

const saveMyUserId = function (user_id) {
  wx.setStorageSync('user_id', user_id)
}



const getFormateDate = function (time) {
  let date = new Date(time)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('/')
}

const getFormateDateWithTime = function (time) {
  let date = new Date(time)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}


//基础封装
const wxGet = function (url, data, code200, error) {
  wx.request({
    url: url,
    data: data,
    success: res => {
      wx.stopPullDownRefresh() //停止下拉刷新
      if (res.data.msg === '0') {
        code200(res)
      } else {
        if (error) {
          error(res)
        } else {
          console.log(res)
          // console.log('请求出错：msg:' + res.data.msg + '---' + url)
        }
      }
    },
    fail: res => {
      wx.stopPullDownRefresh() //停止下拉刷新
      wx.showToast({
        title: '网络出现问题，请稍候重试',
        icon: 'none',
        mask: true,
      })
      if (error) {
        error(res)
      } else {
        console.log(res)
        console.log('执行fail：' + url)
      }
    }
  })
}

module.exports = {
  formatTime: formatTime,
  getMyUserId: getMyUserId,
  saveMyUserId: saveMyUserId,
  getFormateDate: getFormateDate,
  wxGet,
  // test: test
  // hasUserInfoAuth: hasUserInfoAuth,
  // loginTogetMyUserId: loginTogetMyUserId,
  // getWxUserInfo: getWxUserInfo,
  // saveMyUserId: saveMyUserId
}


