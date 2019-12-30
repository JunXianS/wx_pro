import { getDetailList } from "../../api/wxApi.js"
import regeneratorRuntime from '../../utils/runtime.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10,
    total: 0,
    goodsList: [],
    isover: false,
    isloading: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.query = options.query || '',
      this.data.cid = options.cid || ''
    this.getGoodsData()
  },


  // 请求商品列表
  async getGoodsData(e) {
    this.isloading = true
    let params = {
      query: this.data.query,
      cid: this.data.cid,
      pagenum: this.data.pagenum,
      pagesize: this.data.pagesize,
    }
    await getDetailList(params).then(res => {
      this.setData({
        goodsList: [...this.data.goodsList, ...res.message.goods],
        total: res.message.total
        // suggestList: res.message
      });
      this.isloading = false
      if (res.meta.status !== 200) {
        return wx.showToast({
          title: res.meta.msg
        })
      }
    })
    // wx.stopPullDownRefresh()
  },
  // 点击跳转到商品详情页面
  goGoodsDetail(e) {
    wx.navigateTo({
      url: `/pages/goods_detail/main?goods_id=${e.currentTarget.dataset.id}`
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
    console.log(this.isloading)
    // 判断当前是否正在请求数据中
    if (this.isloading) {
      return
    }
    // 初始化必要的字段值
    this.setData({
      pagenum: 1,
      total: 0,
      goodslist: [],
      isloading: false,
      isover: this.data.isloading 
    });
    // 重新发起数据请求
    this.getGoodsData(() => {
      // 停止下拉刷新的行为
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(this.data.isover)
    // 处理重复加载数据
    console.log(this.data.pagenum * this.data.pagesize)
    console.log(this.data.total)
    if (this.data.pagenum * this.data.pagesize >= this.data.total) {
 
      this.setData({
        isover: true
        // suggestList: res.message
      });
      return
    }
    this.setData({
      pagenum: this.data.pagenum++
      // suggestList: res.message
    });

    this.getGoodsData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})