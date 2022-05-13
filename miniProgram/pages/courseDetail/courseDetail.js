// pages/courseDetail/courseDetail.js
const app = getApp();
const {getTimes,orderPay} = require("../../api/home.js");
import Dialog from '@vant/weapp/dialog/dialog';
Page({

  data: {
    discount:1,
    reserveList:[],
    minimum:50,
    quantity:0,
    result1:[],
    result2:[],
    result3:[],

    quan1:[],
    quan2:[],
    quan3:[],


    Length: 6,
    isFocus: false,
    Value: "",
    ispassword: true,
    disabled: true,
    show: false,

    morning_price:0,
    afternoon_price:0,
    evening_price:0,
    price:0,
    radio:"1",
    bankNum:"",
    peopleNum:0,
    msg:{
      "type":1,
      "money":0,
      "bank":"",
      "flag":1,
      "userId":"",
      "data":[],
      "peopleNum":0
    }
  },

  Focus(e) {
    var that = this;
    console.log(e.detail.value);
    var inputValue = e.detail.value;
    var ilen = inputValue.length;
    if (ilen == 6) {
      that.setData({
        disabled: false,
      })
    } else {
      that.setData({
        disabled: true,
      })
    }
    that.setData({
      Value: inputValue,
    })
  },
  Tap() {
    var that = this;
    that.setData({
      isFocus: true,
    })
  },
  formSubmit(e) {
    this.setData({
      show: false,
    })
   console.log(e.detail.value.password)

   if(e.detail.value.password==123456){
    orderPay(this.data.msg).then(res=>{
      wx.showToast({
        title: 'Success',
        icon: 'success',
        duration: 2000
      })
      app.login()
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        }) 
      }, 2000);
    });
   } else{
    wx.showToast({
      title: 'Wrong Password',
      icon:'error',
      duration: 2000
    })
   }
  },
  
  showPopup() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({
      show: false
    });
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
    let quantity = this.data.quan1.length+this.data.quan2.length+this.data.quan3.length
    let moneyTemp = 0;
    let dataTemp = [];
    let numTemp = 50;
    this.setData({
      minimum:this.data.result1[0].num
  });
    this.data.result1.forEach((item,index) => {
      let obj={id:item.id}
      if(this.data.quan1.indexOf(index+'')>-1){ 
        moneyTemp += parseFloat(item.price*this.data.discount-2)
        dataTemp.push(obj)
        if(item.remainNum<=numTemp){
          numTemp=item.remainNum
        }
      }

    });
    this.data.result2.forEach((item,index) => {
      let obj={id:item.id}
      if(this.data.quan2.indexOf(index+'')>-1){ 
        moneyTemp += parseFloat(item.price*this.data.discount)
        dataTemp.push(obj)
        if(item.remainNum<=numTemp){
          numTemp=item.remainNum
        }
      }

    });
    this.data.result3.forEach((item,index) => {
      let obj={id:item.id}
      if(this.data.quan3.indexOf(index+'')>-1){ 
        moneyTemp += parseFloat(item.price*this.data.discount-4)
        dataTemp.push(obj)
        if(item.remainNum<=numTemp){
          numTemp=item.remainNum
        }
      }

    });
    if(quantity>2){
      moneyTemp = (moneyTemp * 0.8).toFixed(2)
    }else{

      moneyTemp = moneyTemp.toFixed(2)

    }
    this.data.msg.money = parseFloat(moneyTemp)

    this.data.msg.data = dataTemp
    this.data.msg.money = moneyTemp
    console.log(moneyTemp)
    this.setData({
      price:moneyTemp*this.data.peopleNum*100,
      quantity:quantity,
      minimum:numTemp
    });

    if(this.data.peopleNum>this.data.minimum){
      this.data.peopleNum = this.data.minimum;
      this.setData({
        peopleNum: this.data.minimum,
        price:moneyTemp*this.data.minimum*100
      });
      wx.showToast({
        title: 'Insufficient quantity',
        icon:'error',
        duration: 2000
      })
    }
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

  onChangeNum(event){
    let moneyTemp=0;
    moneyTemp = this.data.msg.money

    if(event.detail>=this.data.minimum){
      this.data.peopleNum = this.data.minimum;
      this.setData({
        peopleNum: this.data.minimum,
        price:moneyTemp*this.data.minimum*100
      });
      wx.showToast({
        title: 'Insufficient quantity',
        icon:'error',
        duration: 2000
      })
    }
    else{
      console.log(this.data.msg.money);
      console.log(moneyTemp);
      console.log(event.detail);
      this.data.peopleNum = event.detail;
      this.data.price = moneyTemp*event.detail
      this.setData({
        peopleNum: event.detail,
        price:moneyTemp*event.detail*100
      });
    }

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
        title: 'Select one',
        icon: 'error',
        duration: 2000
      })
      return
    }
    if(this.data.peopleNum==0){
      wx.showToast({
        title: 'Reserve one',
        icon: 'error',
        duration: 2000
      })
      return
    }
    if(this.data.radio==1 && !this.data.bankNum){
      wx.showToast({
        title: 'Input correct card info',
        icon: 'error',
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
    let message = "Jump to outside website..."
    if(this.data.radio==1){
      title = "bank pay"
      message="Jump to outside website..."
    }
    if(this.data.radio==2){
      title = "cash pay"
      message="To be confirmed after cash payment"
    }
    if(this.data.radio==3){
      title = "weChat pay"
      message="weChat password required"
    }
    this.data.msg.peopleNum=this.data.peopleNum
    this.data.msg.money=this.data.price/100
   if(this.data.radio==2){
      Dialog.confirm({
        title: title,
        message: message,
        confirmButtonText:"Confirm",
        cancelButtonText:"Cancel"
      }).then(() => {
        orderPay(this.data.msg).then(res=>{
          wx.showToast({
            title: 'Success',
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
    } else{
      console.log("11")
      this.showPopup();
      console.log(this.data.show)
    }
  },


  onLoad: function (options) {
    // options.type=2
    // options.id="751fc9a30ec04407a6237a10e2a5b941"
    getTimes({type:options.type,id:options.id}).then(res=>{
      let result1 = [];
      let result2 = [];
      let result3 = [];
      var price = 0;
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
      if(app.globalData.userInfo.vip==1){
        this.data.discount = 0.8;
      }
      else{
        this.data.discount = 1;
      }
      
this.setData({
  discount:this.data.discount
})
      price = res[0].price
      this.setData({
        morning_price: ((price-2)*this.data.discount).toFixed(0),
        afternoon_price: ((price)*this.data.discount).toFixed(0),
        evening_price: ((price-4)*this.data.discount).toFixed(0)
      })
    })
    this.setData({
      bankNum:app.globalData.userInfo.bank
    })

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