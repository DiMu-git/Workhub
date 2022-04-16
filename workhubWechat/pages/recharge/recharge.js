// pages/recharge/recharge.js
const app = getApp()
const {setVip} = require("../../api/my.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {name:'month',price:"500",checked:true},
      {name:'quarter',price:"1400",checked:false},
      {name:'half a year',price:"2500",checked:false},
      {name:'year',price:"4000",checked:false},
    ],
    total:500,
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