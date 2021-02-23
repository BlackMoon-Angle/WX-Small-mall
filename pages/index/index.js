//Page Object
// 引入发送请求的方法
import { request } from "../../request/index.js"
Page({
  data: {
    // 轮播图数组
    swiperList:[],
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
    const res = await request({ url: '/home/swiperdata' })
    this.setData({
      swiperList: res.data.message
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
    const res = await request({ url: '/home/floordata' })
    this.setData({
      floorList: res.data.message
    })
  }
});