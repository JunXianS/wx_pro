// pages/tabs/tabcates/tabcates.js
import { catesSiderbar } from "../../../api/wxApi.js"
import regeneratorRuntime from '../../../utils/runtime.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cateList: [],
    // 默认被激活的索引项
    activeKey: 0,
    // 当前窗口可用的高度
    wh: 0,
    // 所有的二级分类数据
    secondCate: []
  },
  // 点击项的索引
  onChange(e) {
    this.setData({
      secondCate: this.data.cateList[e.detail].children
    }); 
  },
  // 三级菜单跳转
  goGoodsList(e) {
    console.log("e",e.currentTarget.dataset)
    wx.navigateTo({
      url: '/pages/goods_detail/main?cid=' + e.currentTarget.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  // 动态获取屏幕可用的高度
  async getWindowHeight() {
    let _that = this
    await wx.getSystemInfo({
      success(res) {
        if (res.errMsg === 'getSystemInfo:ok') {
          _that.setData({
            wh: res.windowHeight,
            secondCate: res.children
          });
        }
      }
    })

  },

  async getCateList() {

    let params = {}
    await catesSiderbar(params).then(res => {
   
      this.setData({
        cateList: res.message,
        secondCate: res.message[0].children
      });
      if (res.meta.status !== 200) {
        return wx.showToast({
          title: res.meta.msg
        })
      }
    })


  },
  onLoad: function (options) {
 
    this.getWindowHeight()
    this.getCateList()
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