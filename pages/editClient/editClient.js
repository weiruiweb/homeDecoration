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
  modifyInfo:function(){
   wx.navigateTo({
        url:"/pages/clientModify/clientModify"
      })
  },
  clientDetail:function(){
    wx.navigateTo({
      url:"/pages/clientDetail/clientDetail"
    })
  }
})
