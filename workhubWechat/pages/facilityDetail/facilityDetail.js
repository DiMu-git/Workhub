// pages/facilityDetail/facilityDetail.js
const app = getApp();
const {getTimes,orderPay} = require("../../api/home.js");
import Dialog from '@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reserveList:[],
    result:[],
    price:0,
    radio:"1",
    bankNum:"",
    msg:{
      "type":2,
      "money":0,
      "bank":"",
      "flag":1,
      "userId":"",
      "data":[]
    }
  },
  onChangeCheckbox(event) {
    let checkedIndexs = event.detail
    let moneyTemp = 0;
    let dataTemp = [];
    checkedIndexs.forEach(item => {
      let reserveItem = this.data.reserveList[parseInt(item)]
      moneyTemp += parseFloat(reserveItem.price)
      dataTemp.push({id:reserveItem.id})
    });
    if(checkedIndexs.length>=2){
      moneyTemp = (moneyTemp * 0.8).toFixed(2)
    }else{
      moneyTemp = moneyTemp.toFixed(2)
    }
    
    this.data.msg.money = parseFloat(moneyTemp)
    this.data.msg.data = dataTemp
    this.setData({
      result: event.detail,
      price:moneyTemp*100
    });
  },

  toggle(event) {
    const { index } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${index}`);
    checkbox.toggle();
  },

  noop() {},
  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },

  onClick(event) {
    const { name } = event.currentTarget.dataset;
    this.setData({
      radio: name,
    });
  },
  payOrder(){
    if(this.data.result.length==0){
      wx.showToast({
        title: 'please select facility',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if(this.data.radio==1 && !this.data.bankNum){
      wx.showToast({
        title: 'enter bank number',
        icon: 'none',
        duration: 2000
      })
      return
    }
    this.data.msg.bank=""
    if(this.data.radio==1 && this.data.bankNum){
      this.data.msg.bank = this.data.bankNum
    }
    this.data.msg.flag=1
    if(this.data.radio==2){
      this.data.msg.flag=2
    }
    this.data.msg.userId = app.globalData.userInfo.id
    
    console.log(this.data.msg)
    
    let title = "bank pay"
    let message = "bank password"
    if(this.data.radio==1){
      title = "bank pay"
      message="bank password"
    }
    if(this.data.radio==2){
      title = "cash pay"
      message="To be confirmed after cash payment"
    }
    if(this.data.radio==3){
      title = "weChat pay"
      message="weChat password"
    }
    Dialog.confirm({
      title: title,
      message: message,
      confirmButtonText:"confirm",
      cancelButtonText:"cancel"
    }).then(() => {
      orderPay(this.data.msg).then(res=>{
        wx.showToast({
          title: 'success',
          icon: 'success',
          duration: 2000
        })
        app.login()
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          }) 
        }, 2000);
      })
    }).catch(() => {
      // on cancel
    });

    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // options.type=2
    // options.id="b9fe5ee0fd294c45aa4090a508779d44"
    getTimes({type:options.type,id:options.id}).then(res=>{
      this.setData({
        reserveList:res
      })
      console.log(res)
    })
    this.setData({
      bankNum:app.globalData.userInfo.bank
    })
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