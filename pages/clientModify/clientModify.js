//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
   repContent: [{ message: '家具' }, { message: '建材' }, { message: '家装' }, { message: '建材' }, { message: '其他' },
    { message: '家具' }, { message: '建材' }, { message: '家装' }, { message: '建材' }, { message: '其他' }],
    selectIndex: [
      { sureid: false },
      { sureid: false },
      { sureid: false },
      { sureid: false },
      { sureid: false },
      { sureid: false },
      { sureid: false },
      { sureid: false },
      { sureid: false },
      { sureid: false },
    ],
  },
  //事件处理函数
  selectRep:function(e){
    let index = e.currentTarget.dataset.selectindex;  //当前点击元素的自定义数据，这个很关键
    let selectIndex = this.data.selectIndex;    //取到data里的selectIndex
    selectIndex[index].sureid = !selectIndex[index].sureid;   //点击就赋相反的值
    this.setData({
      selectIndex: selectIndex   //将已改变属性的json数组更新
    })
  },
  onLoad: function () {
    
  },
  threeUser:function(){
    wx.navigateTo({
      url:'/pages/clientList/clientList'
    })
  }
})
