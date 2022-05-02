// pages/home/home.js
const {getVenueList} = require("../../api/home.js");
const env = require('../../api/env.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList:[{
      imgUrl:'https://img0.baidu.com/it/u=4279994605,1869783289&fm=253&fmt=auto&app=138&f=JPG?w=867&h=401',
    },{
      imgUrl:'https://img0.baidu.com/it/u=475170232,543068426&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=422',
    },{
      imgUrl:'https://img0.baidu.com/it/u=2281532575,2827532717&fm=253&fmt=auto&app=138&f=JPEG?w=890&h=500',
    }],//轮播列表
    venueList:[],//场馆列表
  },
  toSearch(){
    wx.navigateTo({
      url: '../search/search',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  /**
   * 生命周期函数--监听页面显示
   */
  // onShow: function () {
  //   this.getVenueList();
  // },
  
  onReady: function () {
    this.getVenueList();
  },

  //获取首页数据
  getVenueList:function(){
    getVenueList().then((res)=>{
      console.log(res)
      this.setData({
        venueList: res,
      })
    })
  },
  //banner
  toBannerDetail(e){
    return
    app.webUrl = e.currentTarget.dataset.url;
    let ifHaveParams = false;
    if(app.webUrl.includes('?')){
      ifHaveParams=true;
    }
    wx.navigateTo({
      url: '../webView/webView?ifHaveParams='+ifHaveParams,
    })
  },
  toHospitalDetail(e){
    let item = e.currentTarget.dataset.item;
    app.venueDetails = item
    wx.navigateTo({
      url: '../venueDetails/venueDetails'
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return{
      title:"workingshop",
      imageUrl:"/images/icon/logo.png"
    }
  },
})