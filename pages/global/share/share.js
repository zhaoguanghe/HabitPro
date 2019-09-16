// pages/share/share.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  toanalyze:function(){
    wx.navigateTo({
      url: '../../account/analyze/analyze?id=1'
    })
    wx.showToast({
      title: '帮助成功',
      icon: 'success',
      duration: 2000
    })
  },
  toindex:function(){
    app.globalData.fromnum = 1
    wx.reLaunch({
      url: '../../habit/index/index'
    })
    wx.showToast({
      title: '已拒绝',
      icon: 'none',
      duration: 2000
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  //带uid转发，一旦好友点击确认键将好友openid加入到好友关系表（密切好友社交网络分析），则定时给好友发送用户的习惯完成情况
    //console.log(options.uid)
  }
})