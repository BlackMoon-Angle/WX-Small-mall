// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    collectNums: 0 // 被收藏的商品的数量
  },
  onShow: function() {
    const { userInfo } = wx.getStorageSync('userInfo');
    const collect = wx.getStorageSync('collect') || [];
    this.setData({
      userInfo,
      collectNums: collect.length
    })
  }
})