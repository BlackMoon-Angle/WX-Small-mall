// pages/goods_detail/index.js
// 引入发送请求的方法
import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}
  },
  // 商品对象
  GoodsInfo: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { goods_id } = options
    this.getGoodsDetail(goods_id)
  },
  // 获取商品详情
  async getGoodsDetail(goods_id){
    const res = await request({ url: '/goods/detail', data: { goods_id } })
    this.GoodsInfo = res.data.message
    this.setData({
      // 优化动态渲染，去掉请求回来数据中不需要的子数据，仅提出需要数据
      goodsObj: {
        goods_name: res.data.message.goods_name,
        goods_price: res.data.message.goods_price,
        // iphone部分手机，不识别 webp 图片格式
        // 解决方法：后台修改；临时利用 replace 进行替换
        // .webp => .jpg
        goods_introduce: res.data.message.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: res.data.message.pics
      }
    })
  },
  // 点击轮播图，预览大图
  handlePrevewImage(e){
    // 构造要预览的图片数组
    const urls = this.GoodsInfo.pics.map(val => val.pics_mid)
    // 点击后接受传递过来的图片 url
    const current = e.currentTarget.dataset.url
    // 调用微信自带的图片预览 api
    wx.previewImage({
      current,
      urls
    });
  },
  // 点击加入购物车
  handleCartAdd(){
    // 获取缓存中的购物车数组
    const cart = wx.getStorageSync('cart') || []
    // 判断 商品对象是否存在于购物车数组中
    const index = cart.findIndex(val => val.goods_id === this.GoodsInfo.goods_id)
    if(index === -1){
      // 不存在商品，第一次添加
      this.GoodsInfo.num = 1
      this.GoodsInfo.checked = true
      cart.push(this.GoodsInfo)
    } else {
      // 存在商品，增加商品数量
      cart[index].num++
    }
    // 把购物车重新添加回缓存中
    wx.setStorageSync('cart', cart)
    // 弹窗提示 表示 加入成功
    wx.showToast({
      title: '加入成功！',
      icon: 'success',
      mask: true // 防止用户反复点击按钮
    });
  }
})