//pages/index/index.js
var utils = require('../../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: [/*{
        Id: 0,
        Hname: '示例习惯养成方案',
        Status: 0,
        Htime: '7:00'
      },{
        Id: 0,
        Hname: '示例习惯养成方案',
        Status: 1,
        Htime: '20:00'
      }*/
    ],
    date: '',
    fromnum: app.globalData.fromnum //只加载一次，除非that.setdata改变其值
  },
  todetail: function(e) {
    //console.log(e)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../details/details?id=' + id
    })
  },
  delhabit: function(e) {
    var that = this
    //console.log(e)
    let id = e.currentTarget.dataset.id
    /*let inx = e.currentTarget.dataset.inx
    if (id == 0) {
      let arr = that.data.item
      arr.splice(inx, 1)
      that.setData({
        item: arr
      })
    } else {*/
    var openId = wx.getStorageSync("Habit0Pro0uid");
    if (openId) {
      wx.showModal({
        content: '删除后，将清除当前习惯的一切记录',
        confirmText: '删除',
        confirmColor: '#e54d42',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.request({
              url: 'https://habit.xiangyundiaocha.club/Api/Habit',
              header: {
                "Content-Type": "text/plain"
              },
              method: "POST",
              data: JSON.stringify({
                update: 1,
                where: 'Id="' + id + '" and UserId="' + openId + '"',
                statu: 4
              }),
              success: function(res) {
                //console.log(res)
                if (res.data == 'ok') {
                  app.globalData.fromnum = 1
                  wx.showToast({
                    title: '修改成功'
                  })
                  wx.reLaunch({
                    url: '../index/index'
                  })
                }
              },
              fail: function(res) {
                console.log(res)
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
  formSubmit: function(e) {
    //console.log(e)
    //form_id:e.detail.formId,
    var openId = wx.getStorageSync("Habit0Pro0uid");
    var time = utils.formatTime(new Date());
    //console.log(time)
    if (openId != "") {
      wx.request({
        url: 'https://habit.xiangyundiaocha.club/Api/Formid',
        method: "POST",
        data: JSON.stringify({
          oper: 'add',
          UserId: openId,
          FormId: e.detail.formId,
          Date: time.toString()
        }),
        success: function(res) {
          console.log(res)
        },
        fail: function(res) {
          console.log(res)
        }
      })
    }
    wx.navigateTo({
      url: '../addhabit/addhabit'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var time = utils.formatDate(new Date());
    that.setData({
      date: time.toString()
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
    //console.log(app.globalData.fromnum)
    var that = this
    var num = app.globalData.fromnum
    var openId = wx.getStorageSync("Habit0Pro0uid");
    if (openId != "" && num == 1) {
      wx.request({
        url: 'https://habit.xiangyundiaocha.club/Api/Habit',
        method: 'POST',
        header: {
          'content-type': 'text/plain'
        },
        data: JSON.stringify({
          where: 'Status<2 and UserId="' + openId + '"',
          oper: 'fetch',
          from: num,
          num: 10
        }),
        success: function(res) {
          //console.log(res.data)
          if (res.data.length > 0 && res.data.length < 15) {
            wx.setStorageSync('Habit', res.data)
            app.globalData.fromnum += 10
            that.setData({
              item: res.data,
              fromnum: that.data.fromnum + 10
            })
          }
        },
        fail: function(res) {
          //console.log(res)
        }
      })
    } else if (openId == "") {
      wx.login({
        success(res) {
          if (res.code) {
            wx.request({
              url: 'https://habit.xiangyundiaocha.club/Api/GetOpenid',
              header: {
                "Content-Type": "text/plain"
              },
              method: "POST",
              data: JSON.stringify({
                code: res.code
              }),
              success: function(res) {
                if (res.data != 40029 && res.data.length < 50) {
                  wx.setStorageSync('Habit0Pro0uid', res.data)
                  if (num == 1) {
                    wx.request({
                      url: 'https://habit.xiangyundiaocha.club/Api/Habit',
                      method: 'POST',
                      header: {
                        'content-type': 'text/plain'
                      },
                      data: JSON.stringify({
                        where: 'Status<2 and UserId="' + res.data + '"',
                        oper: 'fetch',
                        from: num,
                        num: 10
                      }),
                      success: function(res) {
                        if (res.data.length > 0 && res.data.length < 15) {
                          wx.setStorageSync('Habit', res.data)
                          app.globalData.fromnum += 10
                          that.setData({
                            item: res.data,
                            fromnum: that.data.fromnum + 10
                          })
                        }
                      }
                    })
                  }
                } else {
                  wx.showToast({
                    title: "登录失败"
                  })
                }
              },
              fail: function(res) {
                //console.log("fail: " + res)
              }
            })
          } else {
            //console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }
  },

  onReachBottom: function() {
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000
    })
    var that = this;
    var openId = wx.getStorageSync("Habit0Pro0uid");
    if (openId != "") {
      wx.request({
        url: 'https://habit.xiangyundiaocha.club/Api/Habit',
        method: 'POST',
        header: {
          'content-type': 'text/plain'
        },
        data: JSON.stringify({
          where: 'Status<2 and UserId="' + openId + '"',
          oper: 'fetch',
          from: that.data.fromnum,
          num: 10
        }),
        success: function(res) {
          wx.hideToast()
          //console.log(res.data)
          wx.setStorageSync('Habit', res.data)
          var array = wx.getStorageSync('Habit')
          array.push(res.data)
          wx.setStorageSync('Habit', array)
          that.setData({
            item: array,
            fromnum: that.data.fromnum + 10
          })
        },
        fail: function(res) {
          wx.hideToast()
          console.log(res)
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})