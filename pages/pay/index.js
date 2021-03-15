// pages/cart/index.js
import { requestPayment, showToast } from '../../utils/asyncWX.js'
import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {
      address: {},
      cart: [],
      totalPrice: 0,
      totalNum: 0
    }
  },
  onShow: function () {
    // 获取缓存中的收货地址信息
    const address = wx.getStorageSync('address');
    // 获取缓存中的购物车数据
    let cart = wx.getStorageSync('cart') || [];
    // 过滤不为 true 的商品
    cart = cart.filter(val => val.checked)
    this.setData({
      address
    })
    // 总价格
    let totalPrice = 0
    // 总数量
    let totalNum = 0
    cart.forEach(val => {
      totalPrice += val.goods_price * val.num
      totalNum += val.num
    })
    // 把购物车数据重新设置回 data 和 缓存 中
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    })
  },
  // 点击支付
  async handleOrderPay() {
    try {
      // 判断缓存中是否存在 token
      const token = wx.getStorageSync('token')
      // 判断
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/index',
        });
        return
      }
      // 创建订单
      // 请求头参数
      const header = { Authorization: token }
      // 请求体参数
      const order_price = this.data.totalPrice
      // 收货地址
      const consignee_addr = this.data.address.all
      const cart = this.data.cart
      // 订单数组
      let goods = []
      cart.forEach(val => goods.push({
        goods_id: val.goods_id,
        goods_number: val.num,
        goods_price: val.goods_price
      }))
      const orderParams = { order_price, consignee_addr, goods }
      // 发送请求，创建订单，获取订单编号
      const { data } = await request({
        url: '/my/orders/create',
        method: 'post',
        data: orderParams,
        header
      })
      const order_number = data.message.order_number
      // 发起 预支付 请求
      const res = await request({
        url: '/my/orders/req_unifiedorder',
        method: 'post',
        header,
        data: { order_number }
      })
      // 发起微信支付
      await requestPayment(res.data.message.pay)
      // 查询后台 订单状态
      const res_pay = await request({
        url: '/my/orders/chkOrder',
        method: 'post',
        header,
        data: { order_number }
      })
      await showToast('支付成功')
      // 手动删除缓存中，已经完成支付的商品
      let newCart = wx.getStorageSync('cart');
      newCart = newCart.filter(val => val.checked)
      wx.setStorageSync('cart', newCart);
      // 支付成功后跳转到订单页面
      wx.navigateTo({
        url: '/pages/order/index',
      });
    } catch (error) {
      await showToast('支付失败')
      console.log(error);
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  }
})