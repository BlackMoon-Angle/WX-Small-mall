// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '商品收藏',
        isActive: true
      },
      {
        id: 1,
        value: '品牌收藏',
        isActive: false
      },
      {
        id: 2,
        value: '店铺收藏',
        isActive: false
      },
      {
        id: 2,
        value: '浏览足迹',
        isActive: false
      }
    ],
    collect: []
  },
  onShow: function() {
    const collect = wx.getStorageSync('collect') || [];
    this.setData({
      collect
    })
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
  },
})