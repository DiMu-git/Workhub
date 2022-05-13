// pages/recharge/recharge.js
const app = getApp()
const {setVip} = require("../../api/my.js");
Page({

  /**
   * Initial page data
   */
  data: {
    list:[
      {name:'Monthly',price:"49",checked:true},
      {name:'Quarterly',price:"119",checked:false},
      {name:'Annually',price:"399",checked:false},
    ],
    total:49,
    bannerList:[{
      imgUrl:'http://42.193.41.204:8088/workhub/pic/member.png',
    },{
      imgUrl:'http://42.193.41.204:8088/workhub/pic/premium.png',
    }],
  },
  select(e){
    let index = e.currentTarget.dataset.index;
    let list = this.data.list.map(item=>{
      item.checked = false
      return item
    })
    list[index].checked=true;
    this.setData({
      list:list,
      total:list[index].price
    })
  },
  save(){
    let params={
      id:app.globalData.userInfo.id,
      vip:1,
    }
    setVip(params).then(res=>{
      wx.showToast({
        title: "success",
        icon:"success",
        duration: 2000
      })
      app.globalData.userInfo.vip=1;
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        }) 
      }, 2000);
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

  toBannerDetail(e){
    return
  },

  /**
   * Lifecycle functions - listening to the page display
   */
  onShow: function () {

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

  }
})