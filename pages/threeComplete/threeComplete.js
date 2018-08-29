//logs.js
import {Api} from '../../utils/api.js';
const api = new Api();

Page({
  data: {
 

    submitData:{
      name:'',
      phone:'',
      address:'',
      email:'',
      id:''
    },

    mainData:{},
    
  },


  onLoad(){
    const self = this;
    self.getMainData();
  },


  getMainData(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('threeToken');

    const callback = (res)=>{
      console.log(res)
      self.data.mainData = res;
      self.data.submitData.phone = res.info.data[0].info.phone;
      self.data.submitData.name = res.info.data[0].info.name;
      self.data.submitData.address = res.info.data[0].info.address;
      self.data.submitData.email = res.info.data[0].info.email;
      self.data.submitData.id = res.info.data[0].info.id;
      self.setData({
        web_submitData:self.data.submitData,
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


  userInfoUpdate(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('threeToken');
    postData.data = {};
    postData.data = api.cloneForm(self.data.submitData);
    const callback = (data)=>{
      wx.hideLoading();
      api.dealRes(data);
    };
    api.userInfoUpdate(postData,callback);
  },


  submit(){
    const self = this;
    var phone = self.data.submitData.phone;
    const pass = api.checkComplete(self.data.submitData);
    console.log(self.data.submitData)
    if(pass){
      if(phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)){
        api.showToast('手机格式不正确','fail')
      }else{
        wx.showLoading();
        self.userInfoUpdate()
      }
        setTimeout(function(){
          api.pathTo('/pages/threeUser/threeUser','redi')
        },1000); 
    }else{
      api.showToast('请补全信息','fail');
    };
    
  },

  
})
