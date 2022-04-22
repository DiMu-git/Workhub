// pages/courseDetail/courseDetail.js
const app = getApp();
const {getTimes,orderPay} = require("../../api/home.js");
import Dialog from '@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reserveList:[],
    quantity:0,
    result1:[],
    result2:[],
    result3:[],

    quan1:[],
    quan2:[],
    quan3:[],

    price:0,
    radio:"1",
    bankNum:"",
    msg:{
      "type":1,
      "money":0,
      "bank":"",
      "flag":1,
      "userId":"",
      "data":[]
    }
  },
  changeTabs(){

  },
  onChangeCheckbox1(event) {
    this.setData({
      quan1:event.detail
    })
    this.handleData()
  },
  onChangeCheckbox2(event) {
    this.setData({
      quan2:event.detail
    })
    this.handleData()
  },
  onChangeCheckbox3(event) {
    this.setData({
      quan3:event.detail
    })
    this.handleData()
  },
  handleData(){
    console.log(this.data.quan1)
    console.log(this.data.quan2)
    console.log(this.data.quan3)
    let quantity = this.data.quan1.length+this.data.quan2.length+this.data.quan3.length
    let moneyTemp = 0;
    let dataTemp = [];
    this.data.result1.forEach((item,index) => {
      console.log(item.price)
      let obj={id:item.id}
      if(this.data.quan1.indexOf(index+'')>-1){ 
        moneyTemp += parseFloat(item.price)
        dataTemp.push(obj)
      }

    });
    this.data.result2.forEach((item,index) => {
      let obj={id:item.id}
      if(this.data.quan2.indexOf(index+'')>-1){ 
        moneyTemp += parseFloat(item.price)
        dataTemp.push(obj)
      }

    });
    this.data.result3.forEach((item,index) => {
      let obj={id:item.id}
      if(this.data.quan3.indexOf(index+'')>-1){ 
        moneyTemp += parseFloat(item.price)
        dataTemp.push(obj)
      }

    });
    if(quantity>=2){
      moneyTemp = (moneyTemp * 0.8).toFixed(2)
    }else{
      moneyTemp = moneyTemp.toFixed(2)
    }
    this.data.msg.money = parseFloat(moneyTemp)
    this.data.msg.data = dataTemp
    this.setData({
      price:moneyTemp*100,
      quantity:quantity
    });
  },

  toggle1(event) {
    const { index } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxesOne-${index}`);
    checkbox.toggle();
  },
  toggle2(event) {
    const { index } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxesTwo-${index}`);
    checkbox.toggle();
  },
  toggle3(event) {
    const { index } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxesThree-${index}`);
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
    if(this.data.quantity==0){
      wx.showToast({
        title: 'please select course',
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
    // options.type=1
    // options.id="751fc9a30ec04407a6237a10e2a5b941"
    getTimes({type:options.type,id:options.id}).then(res=>{
      let result1 = [];
      let result2 = [];
      let result3 = [];
      res.forEach(item => {
        if(item.status==1){
          result1.push(item);
        }else if(item.status==2){
          result2.push(item);
        }else{
          result3.push(item);
        }
      });
      this.setData({reserveList:res, result1:result1, result2:result2, result3:result3})
      console.log(result1);
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