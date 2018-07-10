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
  furnitureService:function(){
    wx.navigateTo({
      url:'/pages/furnitureService/furnitureService'
    })
  },
  materials:function(){
    wx.navigateTo({
      url:'/pages/materials/materials'
    })
  },
  decorateDetail:function(){
    wx.navigateTo({
      url:"/pages/decorateDetail/decorateDetail"
    })
  },
  aboutDetail:function(){
    wx.navigateTo({
      url:'/pages/aboutDetail/aboutDetail'
    })
  }
})
