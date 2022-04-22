// pages/myReserve/myReserve.js
const app = getApp()
const {getOrdersByUser,refund,sendOrder} = require("../../api/my.js");
import Dialog from '@vant/weapp/dialog/dialog';
Page({

  /**
   * Initial page data
   */
  data: {
    orderList:[],
    activeName:"-1",
    activeNameNow:"-1",
    total:0,
    totalArr:[0,0,0,0,0],
    showQrcode:false
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
   * Lifecycle functions - listening for page loads
   */
  onLoad: function (options) {
    let userId = app.globalData.userInfo.id;
    this.getOrdersByUser(userId)
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