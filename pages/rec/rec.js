//index.js
var app = getApp()
Page({
  data: {
    swiperImg: [{
      pageurl: '../news/news?id=190514001',
      swiperimgurl: 'https://www.xiangyundiaocha.club/HabitPro/image/shequ1.jpg'
    }, {
      pageurl: '../news/news?id=190514002',
      swiperimgurl: 'https://www.xiangyundiaocha.club/HabitPro/image/shequ.jpg'
    }],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    req: [{
      "uname":"兔袭警",
      "avatarurl":"https://www.xiangyundiaocha.club/HabitPro/image/20190527113951.jpg",
      "content": "习惯真是一种顽强而巨大的力量，它可以主宰人生。因此，人自幼就应该通过完美的教育，去建立一种良好的习惯。——培根",
      "hashId": "607ce18b4bed0d7b0012b66ed201fb08",
      "unixtime": 1418815439,
      "updatetime": "2019-5-15 19:23:59"
    },
    {
      "uname": "羁绊",
      "avatarurl": "https://www.xiangyundiaocha.club/HabitPro/image/20190527113934.jpg",
      "content": "养成好习惯，自己就会去学习",
      "hashId": "DDE51B6C09E1557D6542627755901308",
      "unixtime": 1418967626,
      "updatetime": "2019-5-16 13:40:26",
      "url": "https://www.xiangyundiaocha.club/HabitPro/image/01.jpg"
    },
    {
      "uname": "过期凤梨",
      "avatarurl": "https://www.xiangyundiaocha.club/HabitPro/image/20190527113946.jpg",
      "content": "习惯支配着那些不善于思考的人们。——华兹华斯",
      "hashId": "20670bc096a2448b5d78c66746c930b6",
      "unixtime": 1418814837,
      "updatetime": "2019-5-17 19:13:50"
    },
    {
      "uname": "清风思月",
      "avatarurl": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLWpnbEjPCpVAzGz4Zrnu5LwW9hdO2ssUwpia731FoJcy4sgWWxOgxdvWRiac8H9ZotqULGY4c8pm9w/132",
      "content": "以为一个曾以某种方式完成某种行为的人不会再作出相同的举动，这在任何情况下都是一种误解。只要干过，就一定会再干，实际上他早已干过了。",
      "hashId": "1a0b402983f22b7ad6ff38787e238f6d",
      "unixtime": 1418814837,
      "updatetime": "2019-5-17 19:13:55"
    },
    {
      "uname": "兔袭警",
      "avatarurl": "https://www.xiangyundiaocha.club/HabitPro/image/20190527113951.jpg",
      "content": "有什么样的思想，就有什么样的行为；有什么样的行为，就有什么样的习惯；有什么样的习惯，就有什么样的性格；有什么样的性格，就有什么样的命运。",
      "hashId": "d4d750debbb73ced161066368348d611",
      "unixtime": 1418814837,
      "updatetime": "2019-5-17 19:13:57"
    },
    {
      "uname": "清风思月",
      "avatarurl": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLWpnbEjPCpVAzGz4Zrnu5LwW9hdO2ssUwpia731FoJcy4sgWWxOgxdvWRiac8H9ZotqULGY4c8pm9w/132",
      "content": "播种一个行动，你会收获一个习惯；播种一个习惯，你会收获一个个性；播种一个个性，你会收获一个命运。——普德曼",
      "hashId": "B0C3ABBEBBE0A6EA5B8FE04E27215FBC",
      "unixtime": 1418965236,
      "updatetime": "2019-5-19 13:00:36",
      "url": "https://www.xiangyundiaocha.club/HabitPro/image/09.jpg"
    }]
  },
  onLoad() {

  },
  add:function(){
    wx.navigateTo({
      url: 'add/add'
    })
  }
})

