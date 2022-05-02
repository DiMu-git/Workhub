// pages/myReserve/myReserve.js
const app = getApp()
const {getOrdersByUser,refund,sendOrder} = require("../../api/my.js");
import Dialog from '@vant/weapp/dialog/dialog';
Page({

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
      console.log(res)
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
  onLoad: function (options) {
    let userId = app.globalData.userInfo.id;
    console.log(userId);
    // let userId = "o8pAY46lJawP36HhBoime8_xJhIM"
    this.getOrdersByUser(userId)
    console.log(this.data.orderList)
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