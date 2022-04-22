// app.js
const {getUserInfo} = require("./api/user.js");
const RdWXBizDataCrypt = require('./utils/RdWXBizDataCrypt.js');
const {setUseMobile} = require("./api/user.js");
App({
  onLaunch() {
    // Demonstrate local storage capacity
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.login()
  },
  login(){
    return new Promise((resolve,reject)=>{
      // login
      wx.login({
        success: res => {
          // send res.code to change openId, sessionKey, unionId
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
                resolve(res)
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
    return data.phoneNumber //current phone number
  },
  setUseMobile(mobile){
    return new Promise((resolve,reject)=>{
      setUseMobile({mobile:mobile,openid:this.globalData.openid}).then((res)=>{
        wx.showToast({
          title: "succussful bound",
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
    appid: 'wxd5b6a86bb2cb0f1c',
    openid: '',  //openid
    secret: 'a3b49f1afc900d8c280083b593585fa9',
    sessionKey:'',
    phone:"",//phone number
  },
  webUrl:"",
  venueDetails:{},
})
