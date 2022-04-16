// pages/personalData/personalData.js
const app = getApp()
const RdWXBizDataCrypt = require('../../utils/RdWXBizDataCrypt.js');
const {editMyMsg} = require("../../api/my.js");
import Dialog from '@vant/weapp/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{
      userPhone:"",
      url:"../../images/icon/myBody@3x.png",
      userGender:null,
    },
    tel:"",
    mail:"",
  },
  sexChange(e){
    this.data.userInfo.userGender = e.detail
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
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
        debugger
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let userInfo = JSON.parse(JSON.stringify(app.globalData.userInfo))
    if(!userInfo.url){
      userInfo.url = userInfo.userGender==0?"../../images/icon/myGirl@3x.png":"../../images/icon/myBody@3x.png"
    }
    userInfo.userGender=userInfo.userGender+''

    this.setData({
      userInfo:userInfo,
      tel:userInfo.tel,
      mail:userInfo.mail,
    })
  },
})