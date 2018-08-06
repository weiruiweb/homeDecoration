//index.js
//获取应用实例
import {Api} from '../../utils/api.js';
var api = new Api();

Page({
  data: {


    submitData:{
      title:'',
      keywords:'',
      phone:'',
      gender:1,
      type:4,
      content:'',
      score:1,
      relation_id:'',
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



  
  onLoad(options) {
    const self = this;
    self.labelGetTwo();
  },


  messageAdd(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    postData.data = {};
    postData.data = api.cloneForm(self.data.submitData);
    postData.data.product_no = wx.getStorageSync('info').parent_no
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
      const callback = (user,res) =>{
        self.messageAdd(user);
      };
      api.getAuthSetting(callback);
    }else{
      api.showToast('请补全信息','fail');
    };
  },

  changeBind(e){
    const self = this;
    if(api.getDataSet(e,'value')){
      self.data.submitData[api.getDataSet(e,'key')] = api.getDataSet(e,'value');
    }else{
      api.fillChange(e,self,'submitData');
    };
    self.setData({
      web_submitData:self.data.submitData,
    }); 

    if(api.getDataSet(e,'key')=='keywords'&&self.data.submitData.keywords){
      if(self.data.timeFunc){
        return;
      };
      self.data.timeFunc = setTimeout(function(){
        self.articleGet(self.data.submitData.keywords);
        self.data.timeFunc = false;
      },1000);
    };

    if(!self.data.submitData.keywords){
      self.data.lock = true;
    };

  },


  articleGet(Name){
    const self = this;
    const postData = {
      searchItem:{
        title:['LIKE',['%'+Name+'%']],
        thirdapp_id:59,
      }
    };
    const callback = (res)=>{
      if(!self.data.lock){
        if(res.info.data.length>0){
          self.data.submitData.keywords = res.info.data[0].title;
          self.data.submitData.relation_id = res.info.data[0].id;
        }else{
          api.showToast('公司不存在','fail');
        };
        self.setData({
          web_submitData:self.data.submitData,
        });
      }else{
        self.data.lock = false;
      }
      
    };
    api.articleGet(postData,callback);
  },
  

  labelGetTwo(Name){
    const self = this;
    const postData = {
      searchItem:{
        thirdapp_id:59,
        parentid:352
      }
    };
    const callback = (res)=>{
      self.setData({
        web_labelData:res.info.data
      });
    };
    api.labelGet(postData,callback);
  }



})
