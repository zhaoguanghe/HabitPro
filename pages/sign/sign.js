// pages/sign/sign.js
var utils = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperImg: [{
      pageurl: '../global/news/news?id=190514001',
      swiperimgurl: 'https://www.xiangyundiaocha.club/HabitPro/image/new/748-161112104H4.png'
    }, {
        pageurl: '../global/news/news?id=190514002',
        swiperimgurl: 'https://www.xiangyundiaocha.club/HabitPro/image/new/830-160GPR913.jpg'
    }, {
        pageurl: '../global/news/news?id=190514003',
        swiperimgurl: 'https://www.xiangyundiaocha.club/HabitPro/image/new/861-1F313121206.png'
    }, {
      pageurl: '../global/news/news?id=190514004',
        swiperimgurl: 'https://www.xiangyundiaocha.club/HabitPro/image/new/6362268072864168121208711.png'
    }],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    isLogin: true,
    signed: false,
    total_sign: 0,
    modalHidden: true
  },
  preview:function(){
  wx.previewImage({
    current: 'https://www.xiangyundiaocha.club/HabitPro/image/new/u=2787617134,1889866213&fm=26&gp=0.jpg',
    urls: ['https://www.xiangyundiaocha.club/HabitPro/image/new/u=2787617134,1889866213&fm=26&gp=0.jpg',
      'https://www.xiangyundiaocha.club/HabitPro/image/new/20150406H1102_t45dU.thumb.700_0.jpeg', 'https://www.xiangyundiaocha.club/HabitPro/image/new/20150411H1727_YwPhQ.thumb.700_0.jpeg', 'https://www.xiangyundiaocha.club/HabitPro/image/new/20150419H1318_mF5vn.thumb.224_0.jpeg', 'https://www.xiangyundiaocha.club/HabitPro/image/new/201504260505_NFuBw.thumb.700_0.jpeg', 'https://www.xiangyundiaocha.club/HabitPro/image/new/20140811101419_fuQQe.thumb.700_0.jpeg', 'https://www.xiangyundiaocha.club/HabitPro/image/new/20150427180317_WRXAt.thumb.224_0.jpeg', 'https://www.xiangyundiaocha.club/HabitPro/image/new/20150512121932_GBS2f.thumb.700_0.jpeg']
  })
  },
  /**
   * 点击取消
   */
  modalCandel: function () {
    // do something
    this.setData({
      modalHidden: true
    })
  },

  /**
   *  点击确认
   */
  modalConfirm: function () {
    // do something
    this.setData({
      modalHidden: true
    })
  },
  btnchange:function(){
    var that=this
    if (!that.data.signed){
    that.setData({
      total_sign: that.data.total_sign + 1,
      signed: true,
      modalHidden: false
    })
    /*wx.showToast({
      title: '打卡成功',
      icon: 'success',
      duration: 2000
    })*/
    }else{
      wx.showToast({
        title: '您今日已打卡',
        icon: 'success',
        duration: 2000
      })
    }
  },
  formSubmit: function(e) {
    console.log(e)
    var that = this;
    var openId = wx.getStorageSync("Habit0Pro0uid");
    var time = utils.formatTime(new Date());
    var date = utils.formatDate(new Date());
    if (openId != "") {
      wx.request({
        url: 'https://habit.xiangyundiaocha.club/Api/Formid',
        method: "POST",
        data: JSON.stringify({
          oper: 'add',
          UserId: openId,
          FormId: e.detail.formId,
          Date: time
        }),
        success: function(res) {
          console.log(res)
        },
        fail: function(res) {
          console.log(res)
        }
      })
    }
    if (!that.data.signed && openId != '') {
      wx.request({
        url: 'https://habit.xiangyundiaocha.club/Api/Sign',
        header: {
          "Content-Type": "text/plain"
        },
        method: "POST",
        data: JSON.stringify({
          oper: 'add',
          UserId: openId,
          Date: date.toString()
        }),
        success: function(res) {
          console.log(res)
          if (res.data == 'ok') {
            that.setData({
              total_sign: that.data.total_sign + 1,
              signed: true,
              modalHidden: false
            })
            /*wx.showToast({
              title: '打卡成功',
              icon: 'success',
              duration: 2000
            })*/
          } else {
            console.log("status error: " + res.data.Exception)
          }
        },
        fail: function(res) {
          console.log(res)
        }
      })
    } else {
      wx.showToast({
        title: '您今日已签到',
        icon: 'success',
        duration: 2000
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 20000,
      mask:true
    })
    var that = this;
    var time = utils.formatDate(new Date());
    var openId = wx.getStorageSync("Habit0Pro0uid");
    if (openId != "") {
      //wx.request({})获取用户个性化信息，比如格言
      wx.request({
        url: 'https://habit.xiangyundiaocha.club/Api/Sign',
        method: "POST",
        data: JSON.stringify({
          oper: 'sign',
          UserId: openId,
          Date: time.toString()
        }),
        success: function(res) {
          wx.hideToast()
          //console.log(res)
          if (res.statusCode == 200) {
            that.setData({
              total_sign: res.data.total,
              signed: res.data.signed
            })
          } else {
            console.log("status error: " + res.data.Exception)
          }
        },
        fail: function(res) {
          wx.showToast({
            title: '网络请求失败',
            icon: 'none',
            duration: 5000
          })
          //console.log(res)
        }
      })
    }
  },
  backHome: function () {
    app.globalData.fromnum = 1
    wx.reLaunch({
      url: '../habit/index/index'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  }
})