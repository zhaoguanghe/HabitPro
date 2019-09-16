Page({

  /**
   * 页面的初始数据
   */
  data: {
    gridCol: 3,
    skin: false,
    iconList: [{
      icon: 'recordfill',
      color: 'red',
      badge: 1,
      name: '进行中',
      url:  '../welcome/welcome?id=2'
    }, {
      icon: 'activityfill',
      color: 'orange',
      badge: 0,
      name: '已完成',
      url: '../welcome/welcome?id=3'
    }, {
      icon: 'deletefill',
      color: 'yellow',
      badge: 0,
      name: '已取消',
      url: '../welcome/welcome?id=4'
    }]
  },
  handleContact(e) {
    console.log(e.path)
    console.log(e.query)
  },
  tomedal:function(){
    wx.navigateTo({
      url: '../medal/medal'
    })
  }
})
