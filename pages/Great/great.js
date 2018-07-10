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

    purpose:[{preX:'弱'},{preX:'一般'},{preX:'强'}],

    choose_id:0,
  },

  purpose_choose:function(e){
    console.log(e)
    var ids=e.currentTarget.dataset.id;
    this.setData({
      choose_id:ids
    })
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
  backIndex:function(){
  	wx.navigateTo({
  		url:'/pages/Index/index'
  	})
  }
})
