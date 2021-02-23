// pages/category/index.js
// 引入发送请求的方法
import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧菜单数据
    leftMenuList: [],
    // 右侧商品数据
    rightContent: [],
    // 被点击的左侧菜单
    currentIndex: 0,
    // 右侧内容滚动条距离顶部的距离
    scrollTop: 0
  },
  // 接口返回的数据
  Cates: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* 
      判断本地存储是否存在旧数据
          存在旧数据且旧数据没有过期，则使用本地存储的旧数据
          不存在旧数据，则发送新请求获取数据
    */
    //  获取本地存储的数据
    const Cates = wx.getStorageSync("cates");
    // 对本地存储数据进行判断（不存在则重新发送请求）
    if (!Cates) {
      console.log('发送新请求')
      this.getCates()
    } else {
      this.Cates = Cates.data
      // 拆分接口数据，构造左侧的菜单数据
      const leftMenuList = this.Cates.map(val => val.cat_name)
      // 构造右侧的商品数据
      const rightContent = this.Cates[0].children
      this.setData({
        leftMenuList,
        rightContent
      })
    }
  },
  // 发送异步请求——获取 分类 数据
  async getCates() {
    const res = await request({ url: '/categories' })
    this.Cates = res.data.message
    // 把请求回来的数据保存到本地存储中
    wx.setStorageSync("cates", { time: Date.now(), data: this.Cates })
    // 拆分接口数据，构造左侧的菜单数据
    const leftMenuList = this.Cates.map(val => val.cat_name)
    // 构造右侧的商品数据
    const rightContent = this.Cates[0].children
    this.setData({
      leftMenuList,
      rightContent
    })
  },
  // 左侧菜单点击事件
  handleItemTap(e) {
    const { index } = e.currentTarget.dataset
    const rightContent = this.Cates[index].children
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0 // 重新设置 右侧内容的滚动条
    })
  }
})