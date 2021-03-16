// pages/order/index.js
import {  } from '../../utils/asyncWX.js'
import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '全部',
        isActive: true
      },
      {
        id: 1,
        value: '待付款',
        isActive: false
      },
      {
        id: 2,
        value: '待发货',
        isActive: false
      },
      {
        id: 2,
        value: '退款/退货',
        isActive: false
      }
    ],
    orders: []
  },
  // 标题点击事件，从子组件传递参数过来
  handleTabsItemChange(e){
    // 获取被点击的标题索引
    const { index } = e.detail
    this.changeTitleByIndex(index)
    // 重新发送请求
    this.getOrder(index + 1)
  },
  // 根据标题索引来激活选中的标题
  changeTitleByIndex(index) {
    // 修改源数组
    const { tabs } = this.data
    tabs.forEach((val, i) => {
      i === index ? val.isActive = true : val.isActive = false
    })
    this.setData({
      tabs
    })
  },
  onShow: function() {
    const token = wx.getStorageSync('token');
    if(!token) {
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return
    }
    // 获取当前小程序的页面栈-数组，长度最大为10个页面
    let pages = getCurrentPages();
    // 数组中 索引最大的页面就是当前页
    let { options: { type } } = pages[pages.length - 1]
    // 激活选中的页面标题
    this.changeTitleByIndex(type - 1)
    this.getOrder(type)
  },
  // 获取订单列表的方法
  async getOrder(type) {
    const { data: { message: { orders } } } = await request({
      url: '/my/orders/all',
      data: { type }
    })
    // 时间错转化
    this.setData({
      orders: orders.map(v => ({
        ...v,
        create_time_cn: (new Date(v.create_time * 1000).toLocaleString())
      }))
    })
  }
})