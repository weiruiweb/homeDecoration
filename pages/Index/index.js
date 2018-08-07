//index.js
//获取应用实例
import {Api} from '../../utils/api.js';
var api = new Api();
const app = getApp();

import {Token} from '../../utils/token.js';


Page({
  data: {
    spuItem:{},
    web_index:-1,
    web_show:false,
    region: app.globalData.region,
    mainData:[],
    artData:[],
    sliderData:[],
    labelData:[],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    parent_no:'',
  },
  //事件处理函数





  onLoad(options){
    const self = this;
    self.data.paginate = api.cloneForm(getApp().globalData.paginate);
    self.getMainData();
    self.getartData();
    self.getSliderData();
    self.getLabelData();
    var scene = decodeURIComponent(options.scene)
    if(scene){
      var token = new Token({parent_no:scene});
      token.getUserInfo();
    }

  },

  spuChange(e){
    const self = this;
    console.log(e);
    var index = api.getDataSet(e,'index');
    var itemId = api.getDataSet(e,'id');
    if(itemId){
      getApp().globalData.passage1 = itemId;
      self.getMainData(true);
    };
    if(index||index==0){
      if(self.data.web_index>=0){
        self.data.web_index = -1;
      }else{
        self.data.web_index = index;
      };
      self.setData({
        web_index:self.data.web_index
      }); 
    };     
  },


  getLabelData(){
    const self = this;
    const postData = {};
    postData.searchItem = {
      thirdapp_id:['=','59'],
      type:
        ['in','9']
    };
    const callback = (res)=>{
      self.data.labelData = res;    
      wx.hideLoading();
      self.setData({
        web_labelData:self.data.labelData,
      });
    };

    api.labelGet(postData,callback);
    
  },




  getMainData(isNew){
    const self = this;
    if(isNew){
      api.clearPageIndex(self);  
    };
    const postData = {};
    postData.paginate = api.cloneForm(self.data.paginate);
    postData.searchItem = {
      keywords:'热门推荐',
      thirdapp_id:'59',
      passage1:getApp().globalData.passage1
    };
    postData.order = {
      create_time:'desc'
    };
    const callback = (res)=>{
      if(res.info.data.length>0){
        self.data.mainData.push.apply(self.data.mainData,res.info.data);
      }else{
        self.data.isLoadAll = true;
      };
      setTimeout(function()
      {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      },300);

      wx.hideLoading();
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading(); 
      self.setData({
        web_mainData:self.data.mainData,
      });  
    };
    api.articleGet(postData,callback);
  },



  getartData(isNew){
    const self = this;
    if(isNew){
      api.clearPageIndex(self);  
    };
    const postData = {};
    postData.paginate = api.cloneForm(self.data.paginate);
    postData.searchItem = {
      menu_id:'380',
      thirdapp_id:'59'
    };
    const callback = (res)=>{
      self.data.artData = res.info.data[0];
      wx.hideLoading();
      self.setData({
        web_artData:self.data.artData,
      });  
    };
    api.articleGet(postData,callback);
  },


  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },


  getSliderData(){
    const self = this;
    const postData = {};
    postData.searchItem = {
      parentid:'381',
      thirdapp_id:'59'
    };
    const callback = (res)=>{ 
     self.data.sliderData = res;
      self.setData({
        web_sliderData:self.data.sliderData,
      });
    };
    api.labelGet(postData,callback);
  },


  onPullDownRefresh:function(){
    const self = this;
    wx.showNavigationBarLoading();
    delete getApp().globalData.passage1;

    self.getMainData(true);
  },

  
})
  
