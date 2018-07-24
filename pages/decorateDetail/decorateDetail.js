//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
   
  },
  //事件处理函数
  
  onLoad: function () {
    
  },
  decorateDetail:function(){
  	wx.navigateTo({
  		url:"/pages/decorateDetail/decorateDetail"
  	})
  },
  great:function(){
    wx.switchTab({
      url:'/pages/Great/great'
    })
  }
})
