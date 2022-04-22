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
      imgUrl:'../../images/icon/leeds.jpg',
    },{
      imgUrl:'../../images/icon/leeds1.jpg',
    },{
      imgUrl:'../../images/icon/leeds2.jpg',
    },{
      imgUrl:'../../images/icon/leeds3.jpg'
    },{
      imgUrl:'../../images/icon/leeds4.jpg'
    },{
      imgUrl:'../../images/icon/leeds5.jpg'
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
   * Users click on the top right corner to share
   */
  onShareAppMessage: function () {
    return{
      title:"workingshop",
      imageUrl:"/images/icon/logo.png"
    }
  },
})