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
    showQrcode:false,
    chance:2,
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
        if(this.data.chance<=0){
          wx.showToast({title: 'There is only 3 chances to cancel per day',icon:'none',
        duration:1500});
          return;
        }
        this.data.chance-=1,
        refund({id:item.id}).then(res=>{
          wx.showToast({
            title: 'Cancel chance remaining: '+ this.data.chance,
            icon: 'none',
            duration: 1500
        })
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
  onLoad: function (options) {
    let userId = app.globalData.userInfo.id;
    // let userId = "o8pAY46lJawP36HhBoime8_xJhIM"
    this.getOrdersByUser(userId)
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
