//Page Object
// 引入发送请求的方法
import { request } from "../../request/index.js"
Page({
  data: {
    // 轮播图数组
    swiperList:[],
    // 点击轮播图跳转路径数组
    swiperUrl: '',
    // 导航数组
    cateList: [],
    // 楼层数据
    floorList:[]
  },
  // 页面开始加载就会触发
  onLoad: function(options){
    this.getSwiperList()
    this.getCateList()
    this.getfloorList()
  },
  // 发送异步请求——获取 轮播图 数据
  async getSwiperList(){
    const { data: { message } } = await request({ url: '/home/swiperdata' })
    let newMessage =  message.map(v => {
      v.navigator_url = v.navigator_url.replace('main', 'index')
      return v
    })
    this.setData({
      swiperList: newMessage
    })
  },
  // 发送异步请求——获取 导航 数据
  async getCateList(){
    const res = await request({ url: '/home/catitems' })
    this.setData({
      cateList: res.data.message
    })
  },
  // 发送异步请求——获取 楼层 数据
  async getfloorList(){
    const { data: { message } } = await request({ url: '/home/floordata' })
    let newMessage =  message.map(v => {
      v.product_list.map(v => {
        v.navigator_url = v.navigator_url.replace('goods_list', 'goods_list/index');
        return v
      })
      return v
    })
    this.setData({
      floorList: newMessage
    })
  }
});