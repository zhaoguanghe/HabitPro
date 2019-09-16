//app.js
App({
  onLaunch: function() {
    wx.login({
      success(res) {
        if (res.code) {
          wx.request({
            url: 'https://habit.xiangyundiaocha.club/Api/GetOpenid',
            header: {
              "Content-Type": "text/plain"
            },
            method: "POST",
            data: JSON.stringify({code:res.code}),
            success: function(res) {
              //console.log("Habit0Pro0uid: " + res.data)
              if (res.data != 40029 && res.data.length<50) {
                wx.setStorageSync('Habit0Pro0uid', res.data)
              } else {
                wx.showToast({
                  title: "登录失败"
                })
              }
            },
            fail: function(res) {
              console.log("fail: " + res)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    fromnum:1
  }
})