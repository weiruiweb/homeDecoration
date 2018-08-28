//logs.js
import {Api} from '../../utils/api.js';
var api = new Api();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    key:'',
    mainData:[],
    searchItem:{
      thirdapp_id:getApp().globalData.thirdapp_id,
      user_type:0,
      user_no:wx.getStorageSync('info').user_no
    }

  },
    

  onLoad(){
    const self = this;
    self.data.paginate = api.cloneForm(getApp().globalData.paginate);
    self.getMainData()
  },

  menuClick: function (e) {
    const self = this;
    const key = e.currentTarget.dataset.key;
    self.changeSearch(key);
  },


  changeSearch(key){
    const self = this;
    this.setData({
      key: key
    });
    self.data.searchItem.passage1 = key;
    self.getMainData(true);
  },

  getMainData(isNew){
    const self = this;
    if(isNew){
      api.clearPageIndex(self);  
    };
    const postData = {};
    postData.paginate = api.cloneForm(self.data.paginate);
    postData.token = wx.getStorageSync('token');
    postData.searchItem = api.cloneForm(self.data.searchItem);
    postData.order = {
      create_time:'desc'
    }
    const callback = (res)=>{
      if(res.info.data.length>0){
        self.data.mainData.push.apply(self.data.mainData,res.info.data);
      }else{
        self.data.isLoadAll = true;
        api.showToast('没有更多了','fail');
      };
      wx.hideLoading();
      self.setData({
        web_mainData:self.data.mainData,
      });  
    };
    api.messageGet(postData,callback);
  },


  onReachBottom() {
    const self = this;
    if(!self.data.isLoadAll){
      self.data.paginate.currentPage++;
      self.getMainData();
    };
  },


  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },

  messageDelete(e){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    postData.searchItem = {};
    postData.searchItem.id = api.getDataSet(e,'id')
    const callback  = res=>{
      api.dealRes(res);
      self.getMainData(true);
    };
    api.messageDelete(postData,callback);
    
  },
  
})
