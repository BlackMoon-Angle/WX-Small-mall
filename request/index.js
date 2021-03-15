// 同时发送异步代码的次数
let ajaxTimes = 0
// 利用 Promise 对请求进行封装
export const request = (params) => {
  // 判断 url 中是否带有 /my/ ，这是私有路径静秋，需要带上 header token
  let header = {...params.header}
  if(params.url.includes('/my/')){
    // 拼接 header 带上 token
    header['Authorization'] = wx.getStorageSync('token');
  }
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
      header,
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