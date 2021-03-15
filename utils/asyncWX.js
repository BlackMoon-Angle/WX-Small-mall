// 封装原生微信api
// 获取用户的当前设置（权限）
export const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  })
}
// 获取用户地址
export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
        success: (result)=>{
          resolve(result)
        },
        fail: (err)=>{
          reject(err)
        }
    });
  })
}
// 授权设置页
export const openSetting = () => {
    return new Promise((resolve, reject) => {
      wx.openSetting({
          success: (result)=>{
            resolve(result)
          },
          fail: (err)=>{
            reject(err)
          }
      });
    })
}
// 删除商品弹窗提示
export const showModal = (content) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '提示',
      content: content,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      }
    });
  })
}
// 结算按钮提示
export const showToast = (title) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: title,
      icon: 'none',
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
// 授权页获取用户登录信息
export const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout:10000,
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  })
}
// 支付
export const requestPayment = (pay) => {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      ...pay,
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  })
}