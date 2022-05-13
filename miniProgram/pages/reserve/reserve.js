// pages/reserve/reserve.js
const {getVenueList} = require("../../api/home.js");
const env = require('../../api/env.js')
const app = getApp();
Page({

  /**
   * Initial page data
   */
  data: {
    bannerList:[{
      imgUrl:'http://42.193.41.204:8088/workhub/pic/leeds.jpg',
    },{
      imgUrl:'http://42.193.41.204:8088/workhub/pic/leeds1.jpg',
    },{
      imgUrl:'http://42.193.41.204:8088/workhub/pic/leeds2.jpg',
    },{
      imgUrl:'http://42.193.41.204:8088/workhub/pic/leeds3.jpg'
    },{
      imgUrl:'http://42.193.41.204:8088/workhub/pic/leeds4.jpg'
    },{
      imgUrl:'http://42.193.41.204:8088/workhub/pic/leeds5.jpg'
    }],//rotation list
    venueList:[],//venue list
  },
  toSearch(){
    wx.navigateTo({
      url: '../search/search',
    })
  },
  /**
   * Lifecycle functions - listening for page loads
   */
  onLoad: function (options) {
  },
  
  onReady: function () {
    this.getVenueList();
  },

  //get home page data
  getVenueList:function(){
    getVenueList().then((res)=>{
      console.log(res)
      this.setData({
        venueList: res,
      })
    })
    console.log(res[0].data.url)
  },
  //banner
  toBannerDetail(e){
    return
  },
  toHospitalDetail(e){
    let item = e.currentTarget.dataset.item;
    app.venueDetails = item
    wx.navigateTo({
      url: '../venueDetails/venueDetails'
    })
  },
  /**
   * Users click on the top right corner to share
   */
  onShareAppMessage: function () {
    return{
      title:"workingshop",
      imageUrl:"http://42.193.41.204:8088/workhub/pic/logo.png"
    }
  },
})