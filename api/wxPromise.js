
 
import { baseURL } from "./config.js";
var Promise = require('../utils/es6-promise.js')
// wx_mock→963061645
// yapi→111111_mock→963061645
/**
 * 弹框提示一个无图标的 Toast 消息
 * @str 要提示的消息内容
 */
const baseToast = function (str = '获取数据失败！') {
  wx.showToast({
    title: str,
    // 弹框期间不会携带任何图标
    icon: 'none',
    duration: 1500
  })
}
const baseShowLoading = function (str = '加载中') {
  wx.showLoading({
    title: str,
  })
}

function wxGet(url, data) {
  return wxPromise(url,"GET", data);
}

function wxPost(url, data) {
  return wxPromise(url,"POST",data);
}
/**
 * 发起 get 请求的 API
 * @url 请求的地址，为相对路径，必须以 / 开头
 * @data 请求的参数对象
 */

//封装Request请求方法
function wxPromise(url, method, data = {}) {

  wx.showNavigationBarLoading()
  baseShowLoading();
  data.method = method
  return new Promise((resove, reject) => {
    wx.request({
      url:baseURL + url,
      data: data,
      header: {},
      method: method.toUpperCase(), // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        wx.hideNavigationBarLoading()
        wx.hideLoading()
        resove(res.data)
      },
      fail: function (msg) {
        wx.hideNavigationBarLoading()
        wx.hideLoading()
        reject('fail')
        wx.showToast({
          title: "网络连接超时,请稍后重试",
          icon: 'none',
          duration: 3000,
        })
      }
    })
  })
}

module.exports = {
  wxPromise: wxPromise,
  wxPost: wxPost,
  wxGet: wxGet,
  baseToast: baseToast
}
