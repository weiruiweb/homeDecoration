//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    multiIndex: [0, 0, 0],
    
    region: '西安市',
    
  },
  //事件处理函数
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
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
