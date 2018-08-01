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
  userComplete:function(){
    wx.navigateTo({
      url:"/pages/userComplete/userComplete"
    })
  },
  companyConfirm:function(){
    wx.navigateTo({
      url:"/pages/companyConfirm/companyConfirm"
    })
  },
  clientList:function(){
     wx.navigateTo({
      url:"/pages/editClient/editClient"
    })
    
  },
  backMoney:function(){
     wx.navigateTo({
      url:"/pages/backMoney/backMoney"
    })
   },
   credits:function(){
     wx.navigateTo({
      url:"/pages/credits/credits"
    })
   },
   rules:function(){
     wx.navigateTo({
      url:"/pages/rules/rules"
    })
   },
   login:function(){
    wx.navigateTo({
      url:"/pages/login/login"
    })
   }
})
