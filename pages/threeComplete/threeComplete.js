//logs.js
import {Api} from '../../utils/api.js';
const api = new Api();

Page({
  data: {
    sForm:{
      title:'',
      description:'',    
    },

    submitData:{
      phone:''
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
    postData.getAfter = {
      label:{
        middleKey:'passage1',
        key:'id',
        condition:'=',
        searchItem:{
          status:1
        },
        info:['title','description']  
      }
    };
    const callback = (res)=>{
      console.log(res)
      self.data.mainData = res;
      self.data.submitData.phone = res.info.data[0].info.phone;
      self.data.sForm.title = res.info.data[0].label.title;
      self.data.sForm.description = res.info.data[0].label.description;
      self.setData({
        web_submitData:self.data.submitData,
        web_sForm:self.data.sForm,
      });
      wx.hideLoading();
    };
    api.userGet(postData,callback);
  },


  changeBind(e){
    const self = this;
    api.fillChange(e,self,'submitData');
    console.log(self.data.submitData);
    self.setData({
      web_submitData:self.data.submitData,
    });  
  },


  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },


  edit(){
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
    const pass = api.checkComplete(self.data.submitData);
    if(pass){
      wx.showLoading();
      self.edit();
    }else{
      api.showToast('请补全信息','fail');
    };
  },

  
})
