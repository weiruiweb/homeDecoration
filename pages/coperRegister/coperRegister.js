// pages/teacher/data.js
import {Api} from '../../utils/api.js';
const api = new Api();

Page({
  data: {
    sForm:{
      name:'',
      phone:'',
      address:'',
      passage1:'',
      login_name:'',
      password:''  
    },
    mainData:[],
    region: ['陕西省'+'西安市'+'雁塔区'],

  },


  onLoad(){
    const self = this;
    self.setData({
      web_region: self.data.region
    });

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
  

  coperRegister(){
    const self = this;
    const postData = {

      user:{
        thirdapp_id:getApp().globalData.thirdapp_id,
        login_name:self.data.sForm.login_name,
        password:self.data.sForm.password,
        behavior:3,
        scope:0
      },
      userInfo:{
        name:self.data.sForm.name,
        address:self.data.sForm.address,
        passage1:self.data.sForm.passage1,
        phone:self.data.sForm.phone,
      }
    };
    const callback = (res)=>{
      wx.hideLoading();
      if(res.solely_code==100000){
        api.dealRes(res);
        setTimeout(function(){
          api.pathTo('/pages/login/login','redi')
        },1000);  
      }else{
        api.dealRes(res);
      }     
    };
    api.coperRegister(postData,callback);
  },

  bindRegionChange: function (e) {
    const self = this;
    self.data.thirdAppName = e.detail.value[0]+e.detail.value[1]+e.detail.value[2];
    this.setData({
      web_region: self.data.thirdAppName
    })
    console.log()
    self.thirdAppGet()
  },


  thirdAppGet(){
    const self = this;
    const postData = {
      searchItem:{
        name: self.data.thirdAppName
      }
    };
    const callback = (res)=>{ 
      if(res.info.data!=''&&res.info.data[0].id){
        getApp().globalData.thirdapp_id = res.info.data[0].id;
      }else{
        setTimeout(function(){
          self.setData({
            web_region: self.data.region,
          }); 
        },1000);  
        api.showToast('此分站暂未开通','fail');
        getApp().globalData.thirdapp_id = 59
      }  
      wx.hideLoading();
    }
    api.thirdAppGet(postData,callback);
  },


  submit(){
    const self = this;
    var phone = self.data.sForm.phone;
    const pass = api.checkComplete(self.data.sForm);
    if(pass){
        if(phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)){
          api.showToast('手机格式错误','fail')
        }else{
            self.coperRegister();       
        }
    }else{
      api.showToast('请补全信息','fail');
    };
  },
  
})