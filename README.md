# wx_pro
微信小程序框架
## 项目介绍：为响应业务需求，准备把pc端项目转换原生微信小程序，原本打算使用wepy或者mpvue框架来做，但是领导要求用原生实现...，项目为个人预演准备，持续更新

## 项目目录如下：
[images](https://raw.githubusercontent.com/wiki/JunXianS/wx_pro/img/001.jpg)

项目基本包括：首页，分类，搜索，订单，购物车，支付...

### 功能部分：
1，引入es6的promise，封装request，get，post请求，抽离公共api接口，方便多接口维护
2，将常用的 js 逻辑，封装到单独的js文件中
3，引入runtime，使用async ，await 简化promise，
3，封装 `showToast` 函数提示错误消息