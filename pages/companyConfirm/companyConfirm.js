//logs.js
import {Api} from '../../utils/api.js';
const api = new Api();

Page({
  data: {
 

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
