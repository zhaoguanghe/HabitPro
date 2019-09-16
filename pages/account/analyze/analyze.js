// pages/index/lookrecord/lookrecord.js
var wxCharts = require('../../../utils/wxcharts-min.js');   //引入wxChart文件
var app = getApp();
var lineChart = null;
Page({

  data: {

  },

  torecord() {
    wx.navigateBack({
      delta: 1,
    })
  },
  touchHandler: function (e) {
    lineChart.showToolTip(e, {
      // background: '#7cb5ec',
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },

  onLoad: function (e) {
    if(e.id==1){
      wx.setNavigationBarTitle({
        title: '好友签到数据'
      })
    }
    var windowWidth = '', windowHeight = '';    //定义宽高
    try {
      var res = wx.getSystemInfoSync();    //试图获取屏幕宽高数据
      windowWidth = res.windowWidth / 750 * 690;   //以设计图750为主进行比例算换
      windowHeight = res.windowWidth / 750 * 550    //以设计图750为主进行比例算换
    } catch (e) {
      console.error('getSystemInfoSync failed!');   //如果获取失败
    }
    lineChart = new wxCharts({     //定义一个wxCharts图表实例
      canvasId: 'lineCanvas',     //输入wxml中canvas的id
      type: 'line',       //图标展示的类型有:'line','pie','column','area','ring','radar'
      categories: ['2018-5-27', '2018-5-28', '2018-5-29', '2018-5-30', '2018-5-31', '2018-6-1', '2018-6-2'],  //模拟的x轴横坐标参数
      animation: true,  //是否开启动画
      series: [{   //具体坐标数据
        name: '签到时间',  //名字
        data: [7, 20, 20, 20, 20, 7, 20],  //数据点
        format: function (val, name) {  //点击显示的数据注释
          return val;
        }
      }],
      xAxis: {   //是否隐藏x轴分割线
        disableGrid: true,
      },
      yAxis: {      //y轴数据
        title: '时间',  //标题
        format: function (val) {  //返回数值
          return val.toFixed(2);
        },
        min: 5,   //最小值
        max: 22,   //最大值
        gridColor: '#D8D8D8',
      },
      width: windowWidth,  //图表展示内容宽度
      height: windowHeight,  //图表展示内容高度
      dataLabel: false,  //是否在图表上直接显示数据
      dataPointShape: true, //是否在图标上显示数据点标志
      extra: {
        lineStyle: 'curve'  //曲线
      }
    });
  },

  onReady: function () {

  },

  onShow: function () {

  }
})