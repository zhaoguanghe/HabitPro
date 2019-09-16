// pages/rec/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList: [],
    id:0
  },
  onLoad: function (options) {
    if (options.id==1){
      wx.setNavigationBarTitle({
        title: '意见反馈'
      })
      this.setData({ id: options.id })
    }
  },
  chooseImage:function() {
    const that = this
    wx.chooseImage({
      count: 9,  
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function (res) {
        console.log('success: '+res)
        that.setData({
          imageList: res.tempFilePaths
        })
      },
      fail: function (res) {
        console.log('fail: ' +res)
      }
    })
  },
  previewImage:function(e) {
    const current = e.target.dataset.src
    wx.previewImage({
      current,
      urls: this.data.imageList
    })
  },
  //按钮点击事件
  formSubmit: function(e) {
    console.log(e)
    if (e.detail.value.advice.length == 0) {
      wx.showToast({
        title: '数据为空',
        icon: 'loading',
        duration: 2000
      })
    } else {
      wx.request({
        url: 'https://www.xiangyundiaocha.club/advice.php',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          advice: e.detail.value.advice,
          openid: 'HabitPro'
          /*openid: wx.getStorageSync('openid'),
          formId: e.detail.formId*/
        },
        success: function(res) {
          wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000
            }),
            setTimeout(function() {
              wx.navigateBack({
                delta: 1
              })
            }, 1000)
        },
        fail: function(res) {
          wx.showToast({
            title: '提交失败',
            icon: 'loading',
            duration: 2000
          })
        }
      })
    }
  }
})