//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
        id: 0,
        pres: [
          {
            preX: "家具"
          },
          {
            preX: "建材"
          },
          {
            preX: "智能家居"
          },
          {
            preX: "家装"
          }
        ],
    },   
   sort_click: function (e) {
    console.log(e)
    var ids = e.currentTarget.dataset.id;
    this.setData({
      id: ids
    })
  },
  //事件处理函数
  
  onLoad: function () {
    
  },
  joinDetail:function(){
    wx.navigateTo({
      url:'/pages/joinDetail/joinDetail'
    })
  }
})
