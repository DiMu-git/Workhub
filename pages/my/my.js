// pages/my/my.js
const app = getApp()
import Dialog from '@vant/weapp/dialog/dialog';
const {editMyMsg} = require("../../api/my.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{
      tel:"",
      url:"../../images/icon/myBody@3x.png",
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
        userInfo.url = userInfo.userGender==0?"../../images/icon/myGirl@3x.png":"../../images/icon/myBody@3x.png"
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
  //充值
  toRecharge(){
    wx.navigateTo({
      url: '../recharge/recharge'
    })
  },
  // 我的预约
  toMyReserve(){
    wx.navigateTo({
      url: '../myReserve/myReserve'
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
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
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
        title: "授权成功",
        icon:"none"
      })
    })
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
    let userInfo = app.globalData.userInfo
    if(userInfo){
      if(!userInfo.url)[
        userInfo.url = "../../images/icon/myBody@3x.png"
      ]
      this.setData({
        userInfo:userInfo
      })
    }else{
      this.login()
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return{
      title:"医学慕课-医生职业发展平台",
      imageUrl:"/images/icon/cover.png"
    }
  }
})