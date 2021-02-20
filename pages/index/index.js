//Page Object
// 引入发送请求的方法
import { request } from "../../request/index.js"
Page({
  data: {
    // 轮播图数组
    swiperList:[],
    // 导航数组
    cateList: []
  },
  // 页面开始加载就会触发
  onLoad: function(options){
    this.getSwiperList()
    this.getCateList()
  },
  // 发送异步请求——获取 轮播图 数据 
  getSwiperList(){
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata'
    }).then(result => {
        this.setData({
          swiperList:result.data.message
        })
    })
  },
  // 发送异步请求——获取 导航 数据 
  getCateList(){
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems'
    }).then(result => {
        this.setData({
          cateList:result.data.message
        })
    })
  },
  onReady: function(){
    
  },
  onShow: function(){
    
  },
  onHide: function(){

  },
  onUnload: function(){

  },
  onPullDownRefresh: function(){

  },
  onReachBottom: function(){

  },
  onShareAppMessage: function(){

  },
  onPageScroll: function(){

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item){

  }
});