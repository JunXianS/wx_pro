import { wxGet } from "./wxPromise.js";
// home轮播
const homeSwiper = (params) => {
  return wxGet('/home/swiperdata', params)
}
// 分类区域
const homeCates = (params) => {
  return wxGet('/home/catitems', params)
}
// 楼层区域
const homefloorItem = (params) => {
  return wxGet('/home/floordata', params)
}
// 分类页面
const catesSiderbar = (params) => {
  return wxGet('/categories', params)
}
//搜索建议查询
const goProDetail = (params) => {
  return wxGet('/goods/qsearch', params)
}
// 商品列表
const getDetailList = (params) => {
  return wxGet('/goods/search', params)
}
// 商品详情
const getgoodsData = (params) => {
  return wxGet('/goods/detail', params)
}
 

module.exports = {
  homeSwiper: homeSwiper,
  homeCates: homeCates,
  homefloorItem: homefloorItem,
  catesSiderbar: catesSiderbar,
  goProDetail: goProDetail,
  getDetailList: getDetailList,
  getgoodsData: getgoodsData,
}