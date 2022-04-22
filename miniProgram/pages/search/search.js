// pages/search/search.js
const {formatTime} = require("../../utils/util.js");
const {getListByTime} = require("../../api/home.js");

Page({

  /**
   * Initial page data
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
   * Lifecycle functions - listening for page loads
   */
  onLoad: function (options) {
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