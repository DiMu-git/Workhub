
const env = require('./env.js')
let baseUrl = ""
if(env.nowEnv == "test"){
  baseUrl  = env.test.baseUrl
}
if(env.nowEnv == "dev"){
  baseUrl  = env.dev.baseUrl
}
//Request Encapsulation
//Configure a dedicated domain name
const vipUrl = "workhub";
module.exports={
  request:function(url,method="GET",data={},isSubDomain = true,isShowLoading = true){
    let fullUrl = `${baseUrl}/${isSubDomain?vipUrl:''}/${url}`;
    if(isShowLoading){
      wx.showLoading({
        title: 'Loading',
      })
    }
    
    return new Promise((resolve,reject)=>{
      wx.request({
        url: fullUrl,
        method,
        data,
        header:{
          'content-type': 'application/json'
        },
        success(res) {
          let data = res.data;
          if(data.code == 0||data.code == 200||data.result==0){
            wx.hideLoading();
            resolve(data.data)
          }else{
            wx.hideLoading();
            wx.showToast({
              title: data.message||data.msg,
              icon:"none"
            })
            reject(new Error(data.message || 'Error'))
          }
        },
        fail(err) {
          wx.showToast({
            title: err.errMsg,
            icon:"none"
          })
          reject(new Error(err.errMsg || 'Error'))
        }
      })
    })
  }
}