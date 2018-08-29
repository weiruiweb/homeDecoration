//index.js
//获取应用实例
import {Api} from '../../utils/api.js';
var api = new Api();
const app = getApp();

Page({
  data: {
    mainData:[],
    articleData:[],
    submitData:{
      title:'',
      keywords:'',
      phone:'',
      gender:1,
      type:4,
      content:'',
      score:1,
      relation_id:'',
      passage2:'',
      passage3:'',
      passage5:'', 
    },
    buttonClicked: false,

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

  onShow(){
    const self = this;
    if(getApp().globalData.id&&getApp().globalData.keywords){
      self.data.submitData.keywords = getApp().globalData.keywords,
      self.data.submitData.relation_id = getApp().globalData.id
    };
    self.setData({
      web_submitData:self.data.submitData,
    }); 
    self.userGet()
  },

  userGet(){
    const self = this;
    const postData = {
      token:wx.getStorageSync('token'),
    }
    const callback = (res)=>{
      console.log(res)
      self.data.mainData = res;
      wx.hideLoading();
      console.log(self.data.mainData.info.data[0].info.passage1)
    };
    api.userGet(postData,callback);
  },

  messageGet(){
    const self = this;
    const postData = {
      searchItem:{
        phone:self.data.submitData.phone,
        user_type:0
      },
      token:wx.getStorageSync('token')
    }
    const callback = (res)=>{
      if(res.info.data.length>0){
        api.showToast('客户已被推荐','fail');
        self.data.submitData.phone='';
        self.setData({
          web_submitData:self.data.submitData,
        });
      }
    };
    api.messageGet(postData,callback);
  },


  messageAdd(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    postData.data = {};
    postData.data = api.cloneForm(self.data.submitData);
    postData.data.product_no = wx.getStorageSync('info').parent_no
    postData.saveAfter = [
      {
        tableName:'FlowLog',
        FuncName:'add',
        data:{
          count:wx.getStorageSync('info').thirdApp.custom_rule.send,
          trade_info:'推荐积分奖励',
          user_no:wx.getStorageSync('info').user_no,
          type:3,
          thirdapp_id:getApp().globalData.thirdapp_id
        }
      }
    ]
    const callback = (data)=>{
      wx.hideLoading();
      if(data.solely_code==100000){
        api.showToast('推荐成功','fail')
      }else{
        api.showToast('推荐失败','fail')
      }
    };
    api.messageAdd(postData,callback);
  },


  submit(){
    const self = this;
    if(self.data.mainData.info.data[0].info.passage1=='1'){
      var phone = self.data.submitData.phone;
      const pass = api.checkComplete(self.data.submitData);
        if(pass){   
          if(self.data.submitData.relation_id&&self.data.submitData.relation_id!='undefined'){  
            if(phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)){
              api.showToast('手机格式不正确','fail')
            }else{
              wx.showLoading();
              const callback = (user,res) =>{
              setTimeout(function(){
                self.setData({
                  buttonClicked: false
                })
              }, 1000) 
                self.messageAdd(user);
              };
              api.getAuthSetting(callback);
            }
          }else{
            api.showToast('意向公司不存在','fail');
          };
        }else{
          api.showToast('请补全信息','fail')
        }  
    }else{
      api.showToast('账号未审核','fail')
    }
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

    if(api.getDataSet(e,'key')=='phone'&&self.data.submitData.phone){
        self.messageGet()
    };

    if(!self.data.submitData.keywords){
      self.data.lock = true;
    };
    console.log(self.data.submitData)


  },


  articleGet(Name){
    const self = this;
    const postData = {
      searchItem:{
        title:['LIKE',['%'+Name+'%']],
        thirdapp_id:getApp().globalData.thirdapp_id,,
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
        thirdapp_id:getApp().globalData.thirdapp_id,
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
