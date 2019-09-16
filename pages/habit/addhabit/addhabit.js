var utils = require('../../../utils/util.js')
const app = getApp()
Page({

  data: {
    array: ['21', '30', '60'],
    index: 0,
    tarray: ['7:00', '20:00'],
    tindex: 0,
    hcheck: '是',
    idx: -1,
    repeat: {
      'monday': 1,
      'tuesday': 1,
      'wednesday': 1,
      'thursday': 1,
      'friday': 1,
      'saturday': 0,
      'sunday': 0
    },
    discover: false
  },
  discover: function() {
    this.setData({
      discover: !this.data.discover
    })
  },
  // 设置重复日
  changeMonday: function(e) {
    var state = this.data.repeat.monday;
    this.setData({
      'repeat.monday': (state == 1 ? 0 : 1)
    });
  },
  changeTuesday: function(e) {
    var state = this.data.repeat.tuesday;
    this.setData({
      'repeat.tuesday': (state == 1 ? 0 : 1)
    });
  },
  changeWednesday: function(e) {
    var state = this.data.repeat.wednesday;
    this.setData({
      'repeat.wednesday': (state == 1 ? 0 : 1)
    });
  },
  changeThursday: function(e) {
    var state = this.data.repeat.thursday;
    this.setData({
      'repeat.thursday': (state == 1 ? 0 : 1)
    });
  },
  changeFriday: function(e) {
    var state = this.data.repeat.friday;
    this.setData({
      'repeat.friday': (state == 1 ? 0 : 1)
    });
  },
  changeSaturday: function(e) {
    var state = this.data.repeat.saturday;
    this.setData({
      'repeat.saturday': (state == 1 ? 0 : 1)
    });
  },
  changeSunday: function(e) {
    var state = this.data.repeat.sunday;
    this.setData({
      'repeat.sunday': (state == 1 ? 0 : 1)
    });
  },
  chose: function(e) {
    var that=this
    var id = e.currentTarget.dataset.idx
    console.log(id)
    if(id==9){
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album'],
        success: function (res) {
          console.log('success:'+res)
        },
        fail: function (res) {
          console.log('fail:'+res)
        }
      })
    }else{
    this.setData({
      idx: e.currentTarget.dataset.idx
    })
    }
  },
  bindPickerChange1(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      tindex: e.detail.value
    })
  },
  bindTimeChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  switchChange(e) {
    console.log('switch 发生 change 事件，携带值为', e.detail.value)
    if (e.detail.value) {
      this.setData({
        hcheck: '是'
      })
    } else {
      this.setData({
        hcheck: '否'
      })
    }
  },
  formSubmit: function(e) {
    var that = this;
    var openId = wx.getStorageSync("Habit0Pro0uid");
    var dateTime = new Date();
    dateTime = dateTime.setDate(dateTime.getDate() + parseInt(e.detail.value.hrange)); //自动计算截至日期
    dateTime = utils.formatDate(new Date(dateTime));
    //console.log(dateTime)
    if (e.detail.value.hname != "") {
      if (openId != "") {
        //wx.request({})获取用户个性化信息，比如格言
        wx.request({
          url: 'https://habit.xiangyundiaocha.club/Api/Habit',
          method: "POST",
          data: JSON.stringify({
            oper: 'add',
            UserId: openId,
            Date: dateTime,
            Hname: e.detail.value.hname,
            Htime: e.detail.value.htime,
            Hrange: e.detail.value.hrange,
            Hword: e.detail.value.hword,
            Hcheck: that.data.hcheck,
            Status: 0
          }),
          success: function(res) {
            console.log(res)
            if (res.statusCode == 200) {
              app.globalData.fromnum = 1
              wx.showToast({
                title: '创建成功',
                icon: 'success',
                duration: 1000
              })
              wx.navigateBack({
                delta: 1
              })
            } else {
              console.log("status error: " + res.data.Exception)
              wx.showToast({
                title: '创建失败'
              })
            }
          },
          fail: function(res) {
            console.log(res)
            wx.showToast({
              title: '无服务'
            })
          }
        })
      }
    } else {
      wx.showToast({
        title: '习惯名称不能为空',
        icon: 'none',
        duration: 2000
      })
    }
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
    /*let _access_token='21_kxL_GwIfBPbtjPXExCWF06sepkMfXaRA2u74gs6hlZits4wybTt59e21pSLC4F6hbmBmuW6SZoLSe0aw3568cQuyZOeNhfzdx1COxoixlqHC16HrRXfy9HGgB7BywL2wtqc-a7MLOCpFfVULZPIfAJALBU';
    let url='https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + _access_token ;
    let _jsonData = {
      access_token: _access_token,
      touser: wx.getStorageSync('openid'),
      template_id: 'NcNJDeGcnO4zrOTerXSH4_K1s7Vz3miJ0sUJaXwFP-Q',
      form_id: e.detail.formId,
      page: "pages/index/index",
      data: {
          "keyword1": { "value": "清风思月", "color": "#173177" },
          "keyword2": { "value": "10%", "color": "#173177" },
          "keyword3": { "value": "2019/5/4", "color": "#173177" },
          "keyword4": { "value": "好的习惯至关重要，成功贵在坚持", "color": "#173177" },
      }
    }
    wx.request({
      url: url,
      data: _jsonData,
      method: "POST",
      success: function (res) {
        console.log(res)
      },
      fail: function (err) {
        console.log('request fail ', err);
      },
      complete: function (res) {
        console.log("request completed!");
      }
    })*/
  },

  onLoad: function(options) {

  },

  onShow: function() {

  }
})