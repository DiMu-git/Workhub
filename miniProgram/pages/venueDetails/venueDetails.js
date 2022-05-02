// pages/venueDetails/venueDetails.js
const app = getApp();
const {getList} = require("../../api/home.js");

Page({

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
  toCourseDetail:function(e){
    let item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../courseDetail/courseDetail?type='+item.type+'&id='+item.id
    })
  },


  call:function(){
    wx.makePhoneCall({
      phoneNumber: app.venueDetails.tele,
    })
  },

  onLoad: function (options) {
    let venueDetails = app.venueDetails
    this.setData({
      venueDetails:venueDetails
    })
    console.log(venueDetails)
    this.getList(venueDetails.id)
  },

  onReady: function () {

  },

  onShow: function () {

  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})