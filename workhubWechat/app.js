// app.js
const {getUserInfo} = require("./api/user.js");
const RdWXBizDataCrypt = require('./utils/RdWXBizDataCrypt.js');
const {setUseMobile} = require("./api/user.js");
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.login()
  },
  login(){
    return new Promise((resolve,reject)=>{
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          var _this = this;
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + this.globalData.appid + '&secret=' + this.globalData.secret + '&js_code=' + res.code +'&grant_type=authorization_code',
            method: 'GET',
            success: function (res) {
              console.log(res)
              _this.globalData.openid = res.data.openid,
              _this.globalData.sessionKey = res.data.session_key
              getUserInfo({id:res.data.openid}).then((res)=>{
                _this.globalData.userInfo = res;
              })
            },
            fail: function (res) { }
          })
        }
      })
    })
  },
  getPhoneNumber(e){
    debugger
    if(!e.detail.encryptedData)return;
    let _this = this;
    let phone = e.detail.encryptedData;
    let iv = e.detail.iv;
    return new Promise((resolve,reject)=>{
      wx.checkSession({
  　　　　success: function(res){
            debugger
            let userPhone = _this.decodePhone(phone,iv)
            _this.setUseMobile(userPhone).then(()=>{
              resolve();
            })
        },
        fail: function(res){
          app.login().then(()=>{
            let userPhone = _this.decodePhone(phone,iv)
            _this.setUseMobile(userPhone).then(()=>{
              resolve();
            })
          })
        }
      })
    })
  },
  decodePhone(phone, iv){
    const pc = new RdWXBizDataCrypt(this.globalData.appid, this.globalData.sessionKey);
    const data = pc.decryptData(phone, iv);
    return data.phoneNumber //当前手机号码
  },
  setUseMobile(mobile){
    return new Promise((resolve,reject)=>{
      setUseMobile({mobile:mobile,openid:this.globalData.openid}).then((res)=>{
        wx.showToast({
          title: "绑定成功",
          icon:"none"
        })
        this.login().then(()=>{
          resolve();
        })
      })
    })
  },
  globalData: {
    userInfo: null,
    appid: 'wx045060f3bfa190a6',
    openid: '',  //openid
    secret: '546925a0c936bcbedbb8a6976716ec71',
    sessionKey:'',
    phone:"",//手机号
  },
  webUrl:"",
  venueDetails:{},
})
