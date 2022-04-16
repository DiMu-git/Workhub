// pages/venueDetails/venueDetails.js
const app = getApp();
const {getList} = require("../../api/home.js");

Page({
  /**
   * 页面的初始数据
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
  toCourseDetail:function(e){
    let item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../courseDetail/courseDetail?type='+item.type+'&id='+item.id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let venueDetails = app.venueDetails
    // venueDetails = {id: "c611069dc81941d8bf953a345f59d47d", name: "羽毛球场馆1", address: "场馆地址", url: "http://42.193.41.204:8088/workhub/pic/e9448bae721b4714946c16722ce1bd7fu=1347825384,2712281148&fm=253&fmt=auto&app=120&f=JPEG.webp.jpg", createTime: "2022-04-07T09:48:18.011+00:00"}
    this.setData({
      venueDetails:venueDetails
    })
    console.log(venueDetails)
    this.getList(venueDetails.id)
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

  }
})