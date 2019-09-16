// pages/welcome/welcome.js
const app = getApp();

Page({
  
  data: {
    id:1,
    list:[{
      name:'好习惯，到底让一个人变得多优秀？',
      url:'https://www.xiangyundiaocha.club/HabitPro/image/d1.jpg',
      context:"这是环球人物对董卿的采访，问董卿关于阅读的情况。“我基本上保持每天睡之前1个小时阅读，雷打不动的，很多人问我还能坚持啊。无所谓坚持不坚持，这是一个习惯”",
      tag1:'成功人士',
      tag2:'习惯培养'
    },{
        name: '培养好习惯的七个方法',
        url: 'https://www.xiangyundiaocha.club/HabitPro/image/07.jpg',
        context: "这是培养好习惯的七个方法，一、培养好习惯的时间",
        tag1: '方法',
        tag2: '习惯培养'
    },{
        name: '习惯的力量',
        url: 'https://www.xiangyundiaocha.club/HabitPro/image/06.jpg',
        context: "大事使我们惊讶，小事使我们沮丧，久而久之，我们对这二者都会习以为常。",
        tag1: '习惯力量',
        tag2: '习惯培养'
    }],
    item: []
  },
  tonews:function(){
    wx.navigateTo({
      url: '../../global/news/news'
    })
  },
 
  onLoad: function(options) {
    this.setData({ id: options.id})
  },

  onShow: function() {
    var that = this;
    var array = wx.getStorageSync('Habit')
    var detail = []
    for (let i = 0; i<array.length;i++){
      if (array[i].Status==1){
        detail.push(array[i])
      }
    }
    if (detail.length>0) {
      that.setData({
        item: detail
      })
    }
  }
})