// pages/data/data.js
const MONTHS = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'June.', 'July.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];

Page({
  data: {
    year: new Date().getFullYear(),      // 年份
    month: new Date().getMonth() + 1,    // 月份
    day: new Date().getDate(),
    str: MONTHS[new Date().getMonth()],  // 月份字符串
    demo6_days_style: [],
    //top10
    list: [{
      rank: "1",
      url: "https://www.xiangyundiaocha.club/HabitPro/image/20190527113951.jpg",
      name: "兔袭警",
      steps: "109",
    }, {
      rank: "2",
        url: "https://www.xiangyundiaocha.club/HabitPro/image/20190527113934.jpg",
        name: "羁绊",
      steps: "95",
    }, {
      rank: "3",
        url: "https://www.xiangyundiaocha.club/HabitPro/image/20190527113946.jpg",
        name: "过期凤梨",
      steps: "80",
      }, {
        rank: "4",
        url: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLWpnbEjPCpVAzGz4Zrnu5LwW9hdO2ssUwpia731FoJcy4sgWWxOgxdvWRiac8H9ZotqULGY4c8pm9w/132",
        name: "清风思月",
        steps: "20",
      }]
  },
  todata:function(){
    wx.navigateTo({
      url: '../analyze/analyze',
    })
  },
  onLoad: function(options) {

  },
  onShow: function() {
    const days_count = new Date(this.data.year, this.data.month, 0).getDate();
    let demo6_days_style = new Array;
    for (let i = 1; i <= days_count; i++) {
      const date = new Date(this.data.year, this.data.month - 1, i);
      if (i < 12) {
        demo6_days_style.push({
          month: 'current',
          day: i,
          color: 'white',
          background: '#b49eeb'
        });
      } /*else if (i == 17) {
        demo6_days_style.push({
          month: 'current',
          day: i,
          color: 'white',
          background: '#f5a8f0'
        });
      } else if (i == 21) {
        demo6_days_style.push({
          month: 'current',
          day: i,
          color: 'white',
          background: '#aad4f5'
        });
      } else if (i == 25) {
        demo6_days_style.push({
          month: 'current',
          day: i,
          color: 'white',
          background: '#84e7d0'
        });
      } else {
        demo6_days_style.push({
          month: 'current',
          day: i,
          color: 'black'
        });
      }*/
    }
    this.setData({
      demo6_days_style
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})