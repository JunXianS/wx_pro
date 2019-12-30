import { goProDetail } from "../../../api/wxApi.js"
import regeneratorRuntime from '../../../utils/runtime.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    suggestList: [],
    // 历史数据
    kwList: [],
    array: [1, 2, 3, 4, 5, 1, 2, 3, 4]
  },
  gotoDetail(e) {

    wx.navigateTo({
      url: `/pages/goods_detail/main?goods_id=${e.currentTarget.dataset.goodid}`,
      // url: "/pages/goods_detail/main?goods_id=" + e.currentTarget.dataset.goodid,
    })
  },
  onChange(e) {
    if (e.detail.trim().length <= 0) {
      this.setData({
        suggestList: [],
        value: e.detail
      });
      return
    }
    this.setData({
      value: e.detail
    });
    this.goGoodsDetail(e.detail)
  },
  onCancel(e) {
    this.setData({
      suggestList: []
    });
  },
  onSearch(e) {
    const kw = e.detail.trim()
    if (kw.length <= 0) {
      return
    }

    if (this.data.kwList.indexOf(kw) === -1) {
      this.data.kwList.unshift(kw)
    }
    // 保持历史数据只有10条，超出10条进行截取并赋值
    this.setData({
      kwList: this.data.kwList.slice(0, 10)
    });

    wx.setStorageSync('kw', this.data.kwList)

    wx.navigateTo({
      url: `/pages/goods_list/goods_list?query=${e.currentTarget.dataset.goodid}`,
      // url: "/pages/goods_detail/main?goods_id=" + e.currentTarget.dataset.goodid,

    })
    // this.setData({ value: [] });
  },
  onClick() {

  },
  // 点击历史记录跳转到详情列表页面
  goToList(e) {
    wx.navigateTo({
      url: `/pages/goods_list/goods_list?query=${e.currentTarget.dataset.item}`,
      // url: "/pages/goods_detail/main?goods_id=" + e.currentTarget.dataset.goodid,
    })
  },
  // 删除历史记录
  delList() {
    this.setData({
      kwList: []
    });
  },
  async goGoodsDetail(goods_id) {
    let params = {
      query: ''
    }
    await goProDetail(params).then(res => {
      this.setData({
        suggestList: res.message
      });
      if (res.meta.status !== 200) {
        return wx.showToast({
          title: res.meta.msg
        })
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const kwLists = wx.setStorageSync('kw') || [];

    console.log('kwLists', kwLists)
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