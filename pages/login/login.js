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
  register:function(){
    wx.navigateTo({
      url:"/pages/register/register"
    })
  },
  threeUser:function(){
    wx.navigateTo({
      url:"/pages/threeUser/threeUser"
    })
  }
})
