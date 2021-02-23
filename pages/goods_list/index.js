// pages/goods_list/index.js
// 引入发送请求的方法
import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '综合',
        isActive: true
      },
      {
        id: 1,
        value: '销量',
        isActive: false
      },
      {
        id: 2,
        value: '价格',
        isActive: false
      }
    ],
    goodsList:[]
  },
  // 接口要的参数
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  // 总页数
  totalPages: 1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid
    this.getGoodsList()
  },
  // 滚动条触底事件（固定）
  onReachBottom: function() {
    /*
      滚动条触底，开始加载下一页数据
          判断下一页数据是否存在
              不存在则提示没有下一页数据
              存在则发送请求加载下一页数据，并对data中的数组进行拼接
          判断思路：
              获取总页数 = Math.ceil( 总条数total / 页容量pagesize )
              获取当前页码 = pagenum
              判断当前页数是否 大于 总页数
    */
    // 判断是否存在下一页数据
    if(this.QueryParams.pagenum >= this.totalPages) {
      wx.showToast({
        title: '没有下一页了！',
        icon: 'error'
      });
    } else {
      this.QueryParams.pagenum++
      this.getGoodsList()
    }
  },
  // 下拉刷新事件
  onPullDownRefresh: function() {
    // 重置数组
    this.setData({
      goodsList: []
    })
    // 重置页码
    this.QueryParams.pagenum = 1
    // 重新发送请求
    this.getGoodsList()
  },
  // 获取商品列表数据
  async getGoodsList() {
    const res = await request({ 
      url: '/goods/search',
      data: this.QueryParams
    })
    // 获取总条数
    const total = res.data.message.total
    // 计算总页数
    this.totalPages = Math.ceil( total / this.QueryParams.pagesize )
    this.setData({
      // 拼接的数组
      goodsList: [...this.data.goodsList, ...res.data.message.goods]
    })
    // 关闭下拉刷新的窗口
    wx.stopPullDownRefresh()

  },
  // 标题点击事件，从子组件传递参数过来
  handleTabsItemChange(e){
    // 获取被点击的标题索引
    const { index } = e.detail
    // 修改源数组
    const { tabs } = this.data
    tabs.forEach((val, i) => {
      i === index ? val.isActive = true : val.isActive = false
    })
    this.setData({
      tabs
    })
  }
})