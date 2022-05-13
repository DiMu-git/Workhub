// pages/personalData/personalData.js
const app = getApp()
const RdWXBizDataCrypt = require('../../utils/RdWXBizDataCrypt.js');
const {editMyMsg} = require("../../api/my.js");
import Dialog from '@vant/weapp/dialog/dialog';

Page({

  /**
   * Initial page data
   */
  data: {
    userInfo:{
      userPhone:"",
      url:"http://42.193.41.204:8088/workhub/pic/myBody@3x.png",
      userGender:null,
    },
    tel:"",
    mail:"",
  },
  sexChange(e){
    this.data.userInfo.userGender = e.detail
  },
  getUserProfile(e) {
    // wx.getUserProfile
    wx.getUserProfile({
      desc: 'Display user information', //careful use
      success: (res) => {
        this.data.userInfo.nickName = res.userInfo.nickName
        this.data.userInfo.url = res.userInfo.avatarUrl
        this.setData({
          userInfo: this.data.userInfo,
        })
      }
    })
  },
  save(){
    Dialog.confirm({
      title: 'Tips',
      message: 'Save current content',
      beforeClose:this.beforeClose,
      confirmButtonText:"confirm",
      cancelButtonText:"cancel"
    });
  },
  beforeClose(action){
    return new Promise((resolve) => {
      if (action === 'confirm') {
        let userInfoBean = app.globalData.userInfo
        userInfoBean.url = this.data.userInfo.url
        userInfoBean.nickName = this.data.userInfo.nickName
        userInfoBean.userGender = this.data.userInfo.userGender
        userInfoBean.tel = this.data.tel
        userInfoBean.mail = this.data.mail
        editMyMsg(userInfoBean).then((res)=>{ 
          resolve(true);
          wx.showToast({
            title: "success",
            icon:"success",
            duration: 2000
          })

          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            }) 
          }, 2000);
        })
      } else {
        resolve(true);
      }
    });
  },
  
  /**
   * Lifecycle functions - listening for page loads
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle functions - listening for the initial rendering of the page to complete
   */
  onReady: function () {
  },

  /**
   * Lifecycle functions - listening to the page display
   */
  onShow: function () {
    let userInfo = JSON.parse(JSON.stringify(app.globalData.userInfo))
    if(!userInfo.url){
      userInfo.url = userInfo.userGender==0?"http://42.193.41.204:8088/workhub/pic/myGirl@3x.png":"http://42.193.41.204:8088/workhub/pic/myBody@3x.png"
    }
    userInfo.userGender=userInfo.userGender+''

    this.setData({
      userInfo:userInfo,
      tel:userInfo.tel,
      mail:userInfo.mail,
    })
  },
})