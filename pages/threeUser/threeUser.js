//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  threeComplete:function(){
    wx.navigateTo({
      url:"/pages/threeComplete/threeComplete"
    })
  },
  threeTeam:function(){
    wx.navigateTo({
      url:"/pages/threeTeam/threeTeam"
    })
  },
  threeClient:function(){
     wx.navigateTo({
      url:"/pages/threeClient/threeClient"
    })
    
  },
  threebackMoney:function(){
     wx.navigateTo({
      url:"/pages/threebackMoney/threebackMoney"
    })
   },
   threeCredits:function(){
     wx.navigateTo({
      url:"/pages/threeCredits/threeCredits"
    })
   },
   threeAbout:function(){
     wx.navigateTo({
      url:"/pages/threeAbout/threeAbout"
    })
   },
   threeQrcode:function(){
    wx.navigateTo({
      url:"/pages/threeQrcode/threeQrcode"
    })
   },
   animite:function(){
    wx.navigateTo({
      url:"/pages/animite/animite"
    })
   }
})
