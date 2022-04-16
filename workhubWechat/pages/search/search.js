// pages/search/search.js
const {formatTime} = require("../../utils/util.js");
const {getListByTime} = require("../../api/home.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal:"",
    dateStr:"date",

    resList:[],
    total:0,

    isShowCalendar:false,
    defaultDate:[new Date().setDate(new Date().getDate()+1),new Date().setDate(new Date().getDate()+2)],

    searchParams:{
      name:"",
      startDate:'',
      endDate:'',
    }
  },
  search(){
    this.getResList();
  },
  getResList(){
    this.data.searchParams.name=this.data.inputVal
    if(!this.data.searchParams.startDate){
      wx.showToast({
        title: 'Please select a start date',
        icon:"none"
      })
      return
    }
    getListByTime(this.data.searchParams).then((res)=>{
      this.setData({
        resList:res,
        total:res.length
      })
    })
  },
  showCalendar(){
    this.setData({isShowCalendar:true})
  },
  closeCalendar(){
    this.setData({isShowCalendar:false})
  },
  confirmCalendar(e){
    let startDate = formatTime(e.detail[0],'yyyy-mm-dd')
    let endDate = formatTime(e.detail[1],'yyyy-mm-dd')
    this.data.searchParams.startDate=startDate;
    this.data.searchParams.endDate=endDate;

    this.data.resList=[];
    this.getResList();
    this.setData({
      isShowCalendar:false,
      dateStr:(startDate+'~'+endDate)
    })
  },
  reset(){
    this.data.searchParams={
      name:"",
      startDate:'',
      endDate:'',
    }
    this.setData({
      inputVal:"",
      dateStr:"date",
    })
  },
  toFacilityDetail:function(e){
    let item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../facilityDetail/facilityDetail?type='+item.type+'&id='+item.id
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