//logs.js
import {Api} from '../../utils/api.js';
const api = new Api();

Page({
  data: {
    userData:[],

    submitData:{
      name:'',
      id:''
    },

    mainData:{},
    
  },


  onLoad(){
    const self = this;
    self.setData({
      web_submitData:self.data.submitData,
    });
    self.getUserData()
  },


  getMainData(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    postData.searchItem = {
      name:self.data.submitData.name,
      id:self.data.submitData.id
    }
    const callback = (res)=>{
      self.setData({
        web_submitData:self.data.submitData,
      });
      wx.hideLoading();
      api.dealRes(res);
    };
    api.companyAuth(postData,callback);
  },

  getUserData(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    postData.getAfter = {
      threeInfo:{
        tableName:'userInfo',
        middleKey:'parent_no',
        key:'user_no',
        condition:'=',
        searchItem:{
          status:1
        },
        info:['id','name']
      } 
    }
    const callback = (res)=>{
      self.data.userData = res;
      self.setData({
        web_userData:self.data.userData,
      });
      wx.hideLoading();
    };
    api.userGet(postData,callback);
  },


  changeBind(e){
    const self = this;
    api.fillChange(e,self,'submitData');
    self.setData({
      web_submitData:self.data.submitData,
    });  
  },


  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },





  submit(){
    const self = this;
    const pass = api.checkComplete(self.data.submitData);
    if(pass){
      if(JSON.stringify(wx.getStorageSync('info').info) != '[]'){
        wx.showLoading();
        self.getMainData();
      }else{
        api.showToast('请前往完善资料','fail');
      } 
    }else{
      api.showToast('请补全信息','fail');
    };
      setTimeout(function(){
        api.pathTo('/pages/User/user','tab')
      },1000);  
  },

  
})
