//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    id:0,
    pres:[
      {preX:'木地板'},
      {preX:'吊顶'},
      {preX:'木门'},
      {preX:'橱柜'},
      {preX:'洁具'},
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
  materialsDetail:function(){
  	wx.navigateTo({
  		url:"/pages/materialsDetail/materialsDetail"
  	})
  }
})
