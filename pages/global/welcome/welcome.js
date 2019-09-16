// pages/global/welcome/welcome.js
Page({

  data: {

  },
  navigate: function() {
    setTimeout(function() {
      wx.switchTab({
        url: '../../habit/index/index'
      })
    }, 2000)
  },
  onLoad: function(options) {

  },

  onShow: function() {
    this.navigate();
  }
})