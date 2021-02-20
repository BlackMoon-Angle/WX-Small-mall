// 利用 Promise 对请求进行封装
export const request = (params) => {
  return new Promise((resolve,reject) => {
    wx.request({
      ...params,
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      },
      complete: ()=>{}
    });
  })
}