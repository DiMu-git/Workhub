// pages/myReserve/myReserve.js
const app = getApp()
const {getOrdersByUser,refund} = require("../../api/my.js");
import Dialog from '@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
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
    // 0、已使用；1、已付款；2、未付款；3、已退款；-1、预约失败
    if(item.flag == -1){ wx.showToast({title: 'Failure reason',icon:'none'}) }
    if(item.flag == 0){ wx.showToast({title: 'Already used',icon:'none'}) }
    if(item.flag == 1){ wx.showToast({title: 'Payment succeeded',icon:'none'}) }
    if(item.flag == 2){ wx.showToast({title: 'To pay',icon:'none'}) }
    if(item.flag == 3){ wx.showToast({title: 'Refunded',icon:'none'}) }
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userId = app.globalData.userInfo.id;
    // let userId = "o8pAY46lJawP36HhBoime8_xJhIM"
    this.getOrdersByUser(userId)
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