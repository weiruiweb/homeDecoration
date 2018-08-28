//logs.js
import {Api} from '../../utils/api.js';
var api = new Api();

import {Token} from '../../utils/token.js';
var token = new Token();

Page({

  data: {

    sForm:{
      login_name:'',
      password:''

    }
    
  },

  onShow(){
    const self = this;
    if(wx.getStorageSync('threeInfo')){
        wx.redirectTo({
          url: '/pages/threeUser/threeUser'
        })
    }
  },

  submit(){
    const self = this;
    wx.setStorageSync('login',self.data.sForm);
    const callback = (res)=>{
      if(res){
        if(res.data.info.scope==1){
          wx.setStorageSync('threeInfo',res.data.info); 
          wx.redirectTo({
            url: '/pages/threeUser/threeUser'
          })
          api.showToast('登陆成功','success')  
        }else{
          api.showToast('用户未审核','fail')
        };
      }else{
         api.showToast('用户不存在','fail')
      }
    }
    token.getToken(callback);
  },


  bindInputChange(e){
    const self = this;
    api.fillChange(e,self,'sForm');
    self.setData({
      web_sForm:self.data.sForm,
    });
  },



  check(e){
    const self = this;  
    wx.showLoading(); 
    if(api.checkComplete(self.data.sForm)){
      wx.hideLoading();  
      self.submit();
    }else{
      api.showToast('请填写账号密码','fail')
    };
  },


  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },
  
})
