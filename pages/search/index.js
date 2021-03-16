// pages/search/index.js
import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchGoods: [],
    isFocus: false, // 取消按钮是否显示
    inputValue: ''
  },
  // 输入框改变触发的事件
  handleInput(e) {
    // 获取输入框的值
    const { value } = e.detail
    // 检测合法性
    if (!value.trim()) {
      // 搜索框为空时，清空搜索列表
      this.setData({
        searchGoods: [],
        isFocus: false
      })
      return
    }
    // 显示 取消 按钮
    this.setData({
      isFocus: true
    })
    // 设置防抖
    clearTimeout(TimeId)
    let TimeId = setTimeout(() => {
      // 发送请求
      this.searchInfo(value)
    }, 1000)
  },
  // 发送请求，获取搜索的数据
  async searchInfo(query) {
    const { data: { message } } = await request({
      url: '/goods/qsearch',
      data: { query }
    })
    this.setData({
      searchGoods: message
    })
  },
  // 点击取消按钮，清空搜索框和搜索列表
  handleCancel() {
    this.setData({
      inputValue: '',
      isFocus: false,
      searchGoods: []
    })
  }
})