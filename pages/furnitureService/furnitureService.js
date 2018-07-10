//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    id:0,
    pres:[
      {preX:'简中风格'},
      {preX:'欧式风格'}
    ]
   
  },
  //事件处理函数
  sort_click:function(e){
     console.log(e)
    var ids = e.currentTarget.dataset.id;
    this.setData({
      id: ids
    })
  },
  onLoad: function () {
    
  },
  furnitureDetail:function(){
  	wx.navigateTo({
  		url:"/pages/furnitureDetail/furnitureDetail"
  	})
  }
})
