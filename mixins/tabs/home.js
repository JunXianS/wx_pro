
// pages/tabs/tabhome/tabhome.js
import { homeSwiper, homeCates, homefloorItem } from "../../api/wxApi.js";
import regeneratorRuntime from '../../utils/runtime.js'
module.exports ={
  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    indicatorDots: true,
    vertical: false,
    interval: 3000,
    duration: 500,
    // 分类区域
    cateItems: [],
    floorData: [],
  },
  // 跳转
  goNavigator: function (url) {
    console.log('url', url)
    wx.navigateTo({
      url
    })
  },
  // 获取home首页数据
  async getHomeList() {
    let params = {}
    await homeSwiper(params).then(res => {
      this.setData({
        swiperList: res.message
      });
      if (res.meta.status !== 200) {
        return wx.showToast({
          title: res.meta.msg
        })
      }
    })
    // await wxGet('/home/swiperdata', parame).then(res => {
    //   this.setData({
    //     swiperList: res.message
    //   });
    // })
  },
  // 分类区域
  async getCatesList() {
    let params = {}
    await homeCates(params).then(res => {
      this.setData({
        cateItems: res.message
      });

    })

  },
  // 楼层区域
  async getfloorItem() {
    let params = {}
    await homefloorItem(params).then(res => {
      this.setData({
        floorData: res.message
      });

    })

  },
  goNavigatorList(e) {
    console.log(e.currentTarget.dataset)
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHomeList();
    this.getCatesList();
    this.getfloorItem();
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
}