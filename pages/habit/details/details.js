const app = getApp();
var utils = require('../../../utils/util.js')
Page({
  data: {
    id: '1', //wx.getStorageSync("Habit0Pro0uid"),
    item: [
    /*{
      Hname: '示例习惯名',
      Htime: '20:00',
      Hrange: '21',
      Hcheck: '是',
      Hword:'成功，源于自律',
      Status: 1
    }*/
    ]
  },
  switchSex: function(e) {
    console.log(e)
    var that=this
    var contextstr = ''
    var status = 0
    if (e.detail.value) {
      contextstr = '确认将进行中的习惯替换为当前习惯'
    } else {
      contextstr = '确认终止当前习惯，会在已取消存档'
      status = 1
    }
    wx.showModal({
      content: contextstr,
      confirmText: '确认',
      confirmColor: '#e54d42',
      success(res) {
        if (res.confirm) {
          app.globalData.fromnum =1
          var openId = wx.getStorageSync("Habit0Pro0uid");
          console.log('用户点击确定')
          //进行逻辑更改，status = 1，直接更改状态为3（已取消）；status = 0，更改当前状态为1的习惯为0，设置当前习惯状态为1
          if (status == 0){
            //console.log(0)
            wx.request({
              url: 'https://habit.xiangyundiaocha.club/Api/Habit',
              header: {
                "Content-Type": "text/plain"
              },
              method: "POST",
              data: JSON.stringify({
                update: 1,
                where: 'Status=1 and UserId="' + openId + '"',
                statu: 0
              }),
              success: function (res) {
                console.log(res)
              },
              fail: function (res) {
                console.log(res)
              }
            })
            wx.request({
              url: 'https://habit.xiangyundiaocha.club/Api/Habit',
              header: {
                "Content-Type": "text/plain"
              },
              method: "POST",
              data: JSON.stringify({
                update: 1,
                where: 'Id="' + that.data.item[0].Id +'" and UserId="' + openId + '"',
                statu: 1
              }),
              success: function (res) {
                console.log(res)
                if(res.data=='ok'){
                  wx.showToast({
                    title: '修改成功'
                  })
                }
              },
              fail: function (res) {
                console.log(res)
              }
            })
          } else if (status == 1){
            wx.request({
              url: 'https://habit.xiangyundiaocha.club/Api/Habit',
              header: {
                "Content-Type": "text/plain"
              },
              method: "POST",
              data: JSON.stringify({
                update:1,
                where: 'Status=1 and UserId="' + openId + '"',
                statu: 3
              }),
              success: function (res) {
                console.log(res)
              },
              fail: function (res) {
                console.log(res)
              }
            })
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
          let array=that.data.item
          let id = array[0].Id
          let name = array[0].Hname
          let time = array[0].Htime
          let range = array[0].Hrange
          let check = array[0].Hcheck
          let word = array[0].Hword
          let statu = status
          let arrstring = {
            Id:id,
            Hname: name,
            Htime: time,
            Hrange: range,
            Hcheck: check,
            Hword: word,
            Status:statu}
          var detail = []
          detail.push(arrstring)
          that.setData({item: detail})
        }
      }
    })
  },
  sent: function() {
    wx.request({
      url: 'https://habit.xiangyundiaocha.club/Api/SentMsg',
      header: {
        "Content-Type": "text/plain"
      },
      method: "POST",
      data: JSON.stringify({code: 0}),
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },
 
  onLoad: function(options) {
    //console.log(options.id)
    var that = this;
    var array = wx.getStorageSync('Habit')
    var detail=[]
    if (array) {
      detail.push(array[options.id])
      that.setData({
        item: detail
      })
    }
  },

  onShow: function() {

  },

  onShareAppMessage: function(e) {
    var uid = e.target.dataset.id
    if (e.from === 'button') {
      // 来自页面内转发按钮
      if (uid != '') {
        return {
          title: '好友发来一项习惯监督请求',
          path: 'pages/global/share/share?uid=' + uid
        }
      } else {
        console.log('noid')
        wx.showToast({
          title: '转发失败'
        })
      }
    }
  }
})