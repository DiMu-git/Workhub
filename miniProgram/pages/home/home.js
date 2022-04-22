// pages/myReserve/myReserve.js
const app = getApp()
const {getOrdersByUser,refund,sendOrder} = require("../../api/my.js");
const {editMyMsg} = require("../../api/my.js");
const {getVenueList} = require("../../api/home.js");
import Dialog from '@vant/weapp/dialog/dialog';
Page({

  /**
   * Initial page data
   */
  data: {
    venueList:[],
    orderList:[],
    activeName:"1",
    activeNameNow:"1",
    total:0,
    totalArr:[0,0,0,0,0],
    showQrcode:false,
    userInfo:{
      tel:"",
      url:"../../images/icon/myBody@3x.png",
    },
    pageUrl:""
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
  changeTabs(e){
    this.setData({
      activeNameNow:e.detail.name,
      total:this.data.totalArr[parseInt(e.detail.name)+1]
    })
  },
  toFacilityDetail(e){
    let item = e.currentTarget.dataset.item
    let params={
      userId:app.globalData.userInfo.id,
      orderId:item.id
    }
    sendOrder(params).then(res=>{
      wx.showToast({title: res,icon:'succee'})
    })
  },
  toQrcode(){
    this.setData({
      showQrcode:true
    })
  },
  toCancelFlag(e){
    let item = e.currentTarget.dataset.item
    Dialog.confirm({
      title: 'tips',
      message: 'confirm cancel?',
      confirmButtonText:"confirm",
      cancelButtonText:"cancel"
    })
      .then(() => {
        refund({id:item.id}).then(res=>{
          wx.showToast({title: 'cancel succeeded',icon:'succee'})
          let userId = app.globalData.userInfo.id;
          this.getOrdersByUser(userId)
        })
        
      })
      .catch(() => {
        // on cancel
      });
  },

  /**
   * Lifecycle functions - listening for page loads
   */
  onLoad: function (options) {
    let userId = app.globalData.userInfo.id;
    this.getOrdersByUser(userId)
    let webUrl = app.webUrl
    if(JSON.parse(options.ifHaveParams)){
      webUrl = webUrl+'&uuid='+app.globalData.userInfo.uuid;
    }else{
      webUrl = webUrl+'?uuid='+app.globalData.userInfo.uuid;
    }
    this.setData({webUrl: webUrl})
  },

  /**
   * Lifecycle functions - listening for the initial rendering of the page to complete
   */
  onReady: function () {
    this.getVenueList();
  },
  
  getVenueList:function(){
    getVenueList().then((res)=>{
      console.log(res)
      this.setData({
        venueList: res,
      })
    })
  },

  /**
   * Lifecycle functions - listening to the page display
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
  getOrdersByUser(userId){
    getOrdersByUser({userId:userId}).then(res=>{
      let totalArr = [0,0,0,0,0]
      res.forEach(item => {
        let index = item.flag + 1
        totalArr[index]=totalArr[index]+1
      });
      this.setData({
        orderList:res,
        totalArr:totalArr,
        total:totalArr[0]
      })
    })
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
        imageUrl:"/images/icon/cover.png"
      }
  }
})