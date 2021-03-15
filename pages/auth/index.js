// pages/auth/index.js
import { login } from '../../utils/asyncWX.js'
import { request } from "../../request/index.js"
Page({
  // 获取用户信息
  async handleGetUserInfo(e) {
    wx.showModal({
      title: '提示',
      content: '使用测试token进行测试！',
      success: (result) => {
        if(result.confirm){
          const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
          wx.setStorageSync('token', token);
          wx.navigateBack({
            delta: 1
          });
        }
      },
      fail: ()=>{},
      complete: ()=>{}
    });
    return
    try {
      // 获取用户信息
      const { encryptedData, rawData, iv, signature } = e.detail
      // 获取小程序登录成功后的 code
      const { code } = await login()
      const loginParams = { encryptedData, rawData, iv, signature, code }
      // 发生请求获取用户的 token
      const { token } = await request({
        url: '/users/wxlogin',
        data: loginParams,
        method: 'post'
      })
      // 把 token 保存到缓存中，跳转回上一个页面
      wx.setStorageSync('token', token);
      wx.navigateBack({
        delta: 1
      });
    } catch (error) {
      console.log(error);
    }
  }
})