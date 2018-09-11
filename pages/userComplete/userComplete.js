//logs.js
import {Api} from '../../utils/api.js';
const api = new Api();

Page({
  data: {
    sForm:{
      phone:'',
      name:'',
      email:'',
      level:'',
      address:'',
/*    passage1:0,
      behavior:0,*/  
    },
    mainData:{},
    
  },


  onShow(){
    const self = this;
    self.userGet();
  },


  userGet(){
    const self = this;
    const postData = {
      token:wx.getStorageSync('token'),
    }
    const callback = (res)=>{
      console.log(res)
      self.data.mainData = res;
      self.data.sForm.phone = res.info.data[0].info.phone;
      self.data.sForm.name = res.info.data[0].info.name;
      self.data.sForm.email = res.info.data[0].info.email;
      self.data.sForm.level = res.info.data[0].info.level;
      self.data.sForm.address = res.info.data[0].info.address; 
      self.setData({
        web_sForm:self.data.sForm,
        web_mainData:self.data.mainData
      });
      wx.hideLoading();
    };
    api.userGet(postData,callback);
  },


  changeBind(e){
    const self = this;
    api.fillChange(e,self,'sForm');
    console.log(self.data.sForm);
    self.setData({
      web_sForm:self.data.sForm,
    });  
  },


  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },


  userInfoUpdate(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    postData.data = {};
    postData.data = api.cloneForm(self.data.sForm);
    postData.data.passage1 = 0;
    postData.data.behavior = 0;
    postData.saveAfter = 
    [
      {
        tableName:'user',
        FuncName:'update',
        data:{
          scope:0
        },
        searchItem:{
          res:{
            user_no:'user_no'
          }
        }
      }
    ];
    const callback = (data)=>{
      wx.hideLoading();
      api.dealRes(data);
    };
    api.userInfoUpdate(postData,callback);
  },
  

  userInfoAdd(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    postData.data = {};
    postData.data = api.cloneForm(self.data.sForm);
    postData.data.passage1 = 0;
    postData.data.behavior = 0;
    const callback = (data)=>{
      if(data.solely_code==100000){
        api.showToast('提交成功','none')
      }
      wx.hideLoading();
    };
    api.userInfoAdd(postData,callback);
  },
  

  submit(){
    const self = this;
    console.log(self.data.mainData)
    if(self.data.mainData.info.data[0]&&self.data.mainData.info.data[0].scope==1&&self.data.mainData.info.data[0].info.passage1==1){
      api.showToast('已通过审核，勿重复提交','none')
    }else{
      var phone = self.data.sForm.phone;
      const pass = api.checkComplete(self.data.sForm);
    if(pass){
      if(phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)){
        api.showToast('手机格式不正确','fail')
      }else{
        if(JSON.stringify(wx.getStorageSync('info').info)=='[]'){
          wx.showLoading();
          self.userInfoAdd();
        }else{
          wx.showLoading();
          self.userInfoUpdate();
        }
          setTimeout(function(){
           api.pathTo('/pages/User/user','tab')
          },1000);  
      }
    }else{
      api.showToast('请补全信息','none');
    };  
    }

  },
 
})
