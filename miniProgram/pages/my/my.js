// pages/my/my.js
const app = getApp()
import Dialog from '@vant/weapp/dialog/dialog';
const {editMyMsg} = require("../../api/my.js");

Page({

  /**
   * Initial page data
   */
  data: {
    userInfo:{
      tel:"",
      url:"http://42.193.41.204:8088/workhub/pic/myBody@3x.png",
    },
    pageUrl:"",
  },
  getPhoneNumber(e){
    app.getPhoneNumber(e).then(()=>{
      this.login();
    })
  },
  login(){
    app.login().then(()=>{
      let userInfo = app.globalData.userInfo
      if(!userInfo.url)[
        userInfo.url = userInfo.userGender==0?"http://42.193.41.204:8088/workhub/pic/myGirl@3x.png":"http://42.193.41.204:8088/workhub/pic/myBody@3x.png"
      ]
      this.setData({
        userInfo:userInfo
      })
    })
  },
  toPersonalData(){
    wx.navigateTo({
      url: '../personalData/personalData'
    })
  },
  //recharge
  toRecharge(){
    wx.navigateTo({
      url: '../recharge/recharge'
    })
  },
  //my reserve
  toMyReserve(){
    wx.navigateTo({
      url: '../myReserve/myReserve'
    })
  },

  toUs(){
    wx.navigateTo({
      url: '../aboutUs/aboutUs',
    })
  },
  toPrivacy(){
    wx.navigateTo({
      url: '../privacy/privacy'
    })
  },
  toHome(){
    wx.switchTab({
      url: '../home/home'
    })
  },

  call:function(){
    wx.makePhoneCall({
      phoneNumber: "15520725828",
    })
  },


  
  getPhoneNumber1(e) {
    app.getPhoneNumber(e).then(()=>{
      wx.navigateTo({
        url: this.data.pageUrl,
      })
    })
  },
  getUserProfile(e){
    wx.getUserProfile({
      desc: 'Show user information', 
      success: (res) => {
        this.data.userInfo.nickName = res.userInfo.nickName
        this.data.userInfo.url = res.userInfo.avatarUrl       
        this.savePhotoAnduserName()
      }
    })
  },
  savePhotoAnduserName(){
    let userInfoAll= app.globalData.userInfo
    let userInfo = this.data.userInfo
    
    userInfoAll.url=userInfo.url
    userInfoAll.nickName=userInfo.nickName
    
    editMyMsg(userInfoAll).then((res)=>{ 
      this.setData({
        userInfo: this.data.userInfo,
      })
      wx.showToast({
        title: "Authorisation successful",
        icon:"none"
      })
    })
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
    let userInfo = app.globalData.userInfo
    if(userInfo){
      if(!userInfo.url)[
        userInfo.url = "http://42.193.41.204:8088/workhub/pic/myBody@3x.png"
      ]
      this.setData({
        userInfo:userInfo
      })
    }else{
      this.login()
    }
  },

  /**
   * Lifecycle functions - Listening for page hiding
   */
  onHide: function () {

  },

  /**
   * Lifecycle functions - Listening for page unloading
   */
  onUnload: function () {

  },

  /**
   * Page related event handling functions - listening to user drop down actions
   */
  onPullDownRefresh: function () {

  },

  /**
   * Functions for page up bottoming events
   */
  onReachBottom: function () {

  },

  /**
   * Users click on the top right corner to share
   */
  onShareAppMessage: function () {
    return{
      title:"workingShop",
      imageUrl:"http://42.193.41.204:8088/workhub/pic/cover.png"
    }
  }
})