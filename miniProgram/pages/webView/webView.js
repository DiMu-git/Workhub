// pages/webView/webView.js
const app = getApp();
Page({
  /**
   * Initial page data
   */
  data: {
    webUrl:"",
  },
  /**
   * Lifecycle functions - listening for page loads
   */
  onLoad: function (options) {
    let webUrl = app.webUrl
    if(JSON.parse(options.ifHaveParams)){
      webUrl = webUrl+'&uuid='+app.globalData.userInfo.uuid;
    }else{
      webUrl = webUrl+'?uuid='+app.globalData.userInfo.uuid;
    }
    this.setData({webUrl: webUrl})
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