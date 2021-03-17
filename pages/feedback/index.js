// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '体验问题',
        isActive: true
      },
      {
        id: 1,
        value: '商品，商家投诉',
        isActive: false
      }
    ],
    chooseImgs: [], //保存上传的图片数组
    textValue: '' //文本域的内容
  },
  UpLoadImgs: [], // 外网图片路径的数组
  // 标题点击事件，从子组件传递参数过来
  handleTabsItemChange(e) {
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
  // 点击上传图片
  handleChooseImg() {
    wx.chooseImage({
      count: 5, // 同时选择的图片数量
      sizeType: ['original', 'compressed'], //图片的格式 原图 压缩图
      sourceType: ['album', 'camera'], // 图片来源 相册 照相机
      success: (result) => {
        this.setData({
          // 对 图片数组 进行拼接
          chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
        })
      }
    });
  },
  // 点击删除图片
  handleRemoveImg(e) {
    // 获取被点击的组件的索引
    const { index } = e.currentTarget.dataset
    let { chooseImgs } = this.data
    // 删除元素
    chooseImgs.splice(index, 1)
    this.setData({
      chooseImgs
    })
  },
  // 文本域的输入
  handleTextInput(e) {
    this.setData({
      textValue: e.detail.value
    })
  },
  // 提交
  handleFormSubmit() {
    // 获取文本域内容
    const { textValue, chooseImgs } = this.data
    // 合法性验证
    if (!textValue.trim()) {
      wx.showToast({
        title: '输入不合法！',
        icon: 'none',
        mask: true
      });
      return
    }
    // 正在上传中...
    wx.showLoading({
      title: '正在上传中...',
      mask: true
    });
    // 判断是否存在需要上传的图片
    if(chooseImgs.length != 0){
      chooseImgs.forEach((v, i) => {
        // 上传图片
        wx.uploadFile({
          url: 'https://img.coolcr.cn/api/upload', //图片上传去到的 地址
          filePath: v, // 被上传的文件路径
          name: 'image', // 上传的文件名称
          formData: {}, // 携带的文本信息
          method: 'post',
          success: (result) => {
            const { data } = result
            let { data: { url } } = JSON.parse(data)
            this.UpLoadImgs.push(url)
            // 所有图片都上传完毕后，返回上一个页面
            if(i===chooseImgs.length - 1){
              // 关闭 正在上传... 
              wx.hideLoading();
              // 重置页面
              this.setData({
                textValue: '',
                chooseImgs: []
              })
              wx.navigateBack({
                delta: 1
              });
            }
          }
        });
      })
    } else {
      // 只上传了文本
      wx.hideLoading();
      wx.navigateBack({
        delta: 1
      });
    }
  }
})