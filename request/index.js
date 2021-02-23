// 同时发送异步代码的次数
let ajaxTimes = 0
// 利用 Promise 对请求进行封装
export const request = (params) => {
  ajaxTimes++
  // 显示 加载中 效果
  wx.showLoading({
    title: "加载中...",
    mask: true,
  });
  // 定义公共的 url
  const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
  return new Promise((resolve,reject) => {
    wx.request({
      ...params,
      url: baseUrl + params.url, //拼接 url
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      },
      complete: ()=>{
        ajaxTimes--
        if(ajaxTimes === 0){
          // 关闭 加载中 图标
          wx.hideLoading();
        }
      }
    });
  })
}