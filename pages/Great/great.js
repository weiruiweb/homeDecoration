//index.js
//获取应用实例
import {Api} from '../../utils/api.js';
var api = new Api();

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


    submitData:{
      title:'',
      keywords:'',
      phone:'',
      gender:'',
      type:4,
      content:'',
      score:''
    },

    sexItem:[
      {
          name:'男',
          value:'1'
      },
      {
          name:'女',
          value:'0'
      }
    ],

    purposeItem:[
      {
          name:'弱',
          value:'1'
      },
      {
          name:'一般',
          value:'2'
      },
      {
          name:'强',
          value:'3'
      },
    ]
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
  	wx.switchTab({
  		url:'/pages/Index/index'
  	})
  },

  messageAdd(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    postData.data = {};
    postData.data = api.cloneForm(self.data.submitData);
    const callback = (data)=>{
      wx.hideLoading();
      api.dealRes(data);
    };
    api.messageAdd(postData,callback);
  },

  submit(){
    const self = this;
    const pass = api.checkComplete(self.data.submitData);
    if(pass){
      wx.showLoading();
   /*   const callback = (res) =>{
        console.log(res)*/
        self.messageAdd();
     /* };*/
    }else{
      api.showToast('请补全信息','fail');
    };
  },

  changeBind(e){
    const self = this;
    api.fillChange(e,self,'submitData');
    console.log(self.data.submitData);
    self.setData({
      web_submitData:self.data.submitData,
    });    
  },



})
