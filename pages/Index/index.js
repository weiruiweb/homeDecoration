//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
   
  },
  //事件处理函数
  
  onLoad: function () {
    
  },
  decorateService:function(){
  	wx.navigateTo({
  		url:'/pages/decorateService/decorateService'
  	})
  },
  aboutDetail:function(){
    wx.navigateTo({
      url:'/pages/aboutDetail/aboutDetail'
    })
  }
})
