// pages/venueDetails/venueDetails.js
const app = getApp();
const {getList} = require("../../api/home.js");

Page({
  /**
   * Initial page data
   */
  data: {
    facilityList:[],
    courseList:[],
    venueDetails:{},
  },
  getList:function(id){
    getList({id:id}).then(res=>{
      let courseListTemp=[];
      let facilityListTemp=[];
      res.forEach(item => {
         if(item.type==2){
          facilityListTemp.push(item)
         }
         if(item.type==1){
          courseListTemp.push(item)
         }
      });
     this.setData({
      courseList:courseListTemp,
      facilityList:facilityListTemp
     })
     console.log(courseListTemp)
    })
  },
  toFacilityDetail:function(e){
    let item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../facilityDetail/facilityDetail?type='+item.type+'&id='+item.id
    })
  },
  toHome(){
    wx.navigateTo({
      url: '../privacy/privacy'
    })
  },
  toCourseDetail:function(e){
    let item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../courseDetail/courseDetail?type='+item.type+'&id='+item.id
    })
  },

  /**
   * Lifecycle functions - listening for page loads
   */
  onLoad: function (options) {
    let venueDetails = app.venueDetails
    this.setData({
      venueDetails:venueDetails
    })
    console.log(venueDetails)
    this.getList(venueDetails.id)
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