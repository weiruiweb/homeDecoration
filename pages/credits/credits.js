//logs.js
import {Api} from '../../utils/api.js';
const api = new Api();

Page({
  data: {

    mainData:[],
    userData:[]

  },


  onLoad(){
    const self = this;
    self.data.paginate = api.cloneForm(getApp().globalData.paginate);
    self.getMainData();
    self.getUserData()
  },

  getUserData(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    const callback = (res)=>{
      console.log(res);
      self.data.userData = res;
      self.setData({
        web_user:self.data.userData,
      });
     
      wx.hideLoading();
    };
    api.userGet(postData,callback);   
  },


  getMainData(isNew){
    const self = this;
    if(isNew){
      api.clearPageIndex(self);  
    };
    const postData = {};
    postData.paginate = api.cloneForm(self.data.paginate);
    postData.token = wx.getStorageSync('token');
    postData.searchItem = {
      type:'3',   
    };
    postData.order = {
      create_time:'desc',
    };
    const callback = (res)=>{
      if(res.info.data.length>0){
        self.data.mainData.push.apply(self.data.mainData,res.info.data);
      }else{
        self.data.isLoadAll = true;
        api.showToast('没有更多了','fail');
      };
      self.setData({
        web_mainData:self.data.mainData,
      });
      wx.hideLoading();
    };
    api.flowLogGet(postData,callback);
  },


  onReachBottom() {
    const self = this;
    if(!self.data.isLoadAll){
      self.data.paginate.currentPage++;
      self.getMainData();
    };
  },

 
})
