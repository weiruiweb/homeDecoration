//logs.js
import {Api} from '../../utils/api.js';
const api = new Api();

Page({
  data: {
    sForm:{
      phone:'',
      city:'',
      name:'',    
    },
    text: '获取验证码', //按钮文字
    currentTime: 61, //倒计时
    disabled: false, //按钮是否禁用
    phone: '',//获取到的手机栏中的值
    mainData:{},
    
  },


  onLoad(){
    const self = this;
    self.userInfoGet();
  },


  userInfoGet(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    const callback = (res)=>{
      console.log(res)
      self.data.mainData = res;
      self.data.sForm.phone = res.info.data[0].phone;
      self.data.sForm.city = res.info.data[0].city;
      self.data.sForm.name = res.info.data[0].name;
      self.setData({
        web_sForm:self.data.sForm,
      });
      wx.hideLoading();
    };
    api.userInfoGet(postData,callback);
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
    const callback = (data)=>{
      wx.hideLoading();
      api.dealRes(data);
    };
    api.userInfoAdd(postData,callback);
  },
  

  submit(){
    const self = this;
    const pass = api.checkComplete(self.data.sForm);
    if(pass){
      if(wx.getStorageSync('info').info){
        wx.showLoading();
        self.userInfoUpdate();
      }else{
        wx.showLoading();
        self.userInfoAdd();
      }  
    }else{
      api.showToast('请补全信息','fail');
    };
  },


  phoneInput: function (e) {
    const self = this;
    self.setData({
      phone: e.detail.value
    })
  },
 


  bindButtonTap: function () {
    const self = this;
    self.setData({
      disabled: true, 
      color: '#ccc',
    });
    var phone = self.data.phone;
    var currentTime = self.data.currentTime 
    var warn = null; 
    if(phone == ''){
      warn = "号码不能为空";
    }else if(phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
      warn = "手机号格式不正确";
    }else{
      wx.showToast({
        title: '短信验证码已发送',
        icon: 'none',
        duration: 2000
      });
      var interval = setInterval(function () {
        currentTime--; 
        self.setData({
          text: currentTime + 's', 
        });
        if (currentTime <= 0) { 
          clearInterval(interval)
          self.setData({
            text: '重新发送',
            currentTime: 61,
            disabled: false,
            color: '#929fff'
          })
        }
      },1000);
    };
    if(warn != null){
      wx.showModal({
        title: '提示',
        content: warn
      });
      self.setData({
        disabled: false,
        color: '#ef4f4f'
      });
        return;
    };
  },
 
})
