import { getgoodsData } from "../../api/wxApi.js"
import regeneratorRuntime from '../../utils/runtime.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品的Id值
    goods_id: '',
    goodsInfo: {},
    // 收货地址
    addressInfo: null

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.goods_id = options.goods_id
    this.getGoodsInfo()
  },
  // 点击预览图片
  preview(e) {
    wx.previewImage({
      // 所有图片的路径
      urls: this.data.goodsInfo.pics.map(x => x.pics_big),
      // 当前默认看到的图片
      current: e.currentTarget.dataset.current
    })
  },
  // 获取商品详情数据
  async getGoodsInfo() {
    let params={}
    await getgoodsData(params).then(res => {
      console.log(res)
      this.setData({
        goods_id:  this.data.goods_id,  
        goodsInfo: res.message
      });
  
      if (res.meta.status !== 200) {
        return wx.showToast({
          title: res.meta.msg
        })
      }
    })
 
 
   
  },
  // 获取用户的收货地址
  async chooseAddress() {
    let _that=this;
    wx.chooseAddress({
      success(res) {
        if (res.errMsg !== 'chooseAddress:ok') {
          return wx.showToast('获取收货地址失败！')
        }
        _that.setData({
          addressInfo: res,
        });
        wx.setStorageSync('address', res)
      }
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