//index.js
//获取应用实例
import {Api} from '../../utils/api.js';
var api = new Api();
const app = getApp();

import {Token} from '../../utils/token.js';
const token = new Token();


Page({
  data: {
    
    web_show:false,
    mainData:[],
    artData:[],
    sliderData:[],
    labelData:[],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    parent_no:'',
    region: ['陕西省'+'西安市'+'雁塔区'],
  },
  //事件处理函数





  onLoad(options){
    const self = this;
    self.data.paginate = api.cloneForm(getApp().globalData.paginate);
    self.getMainData();
    self.getartData();
    self.getSliderData();
    self.setData({
      web_region: self.data.region
    });
    var scene = decodeURIComponent(options.scene)
    if(scene){
      var token = new Token({parent_no:scene});
      token.getUserInfo();
    }
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
      thirdapp_id:getApp().globalData.thirdapp_id,
    };
    const callback = (res)=>{
      if(res.info.data.length>0){
        self.data.mainData.push.apply(self.data.mainData,res.info.data);
        if(res.info.data.length>4){
          self.data.mainData = self.data.mainData.slice(0,4) 
        }
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



  getartData(){
    const self = this;
    const postData = {};
    postData.paginate = api.cloneForm(self.data.paginate);
    postData.searchItem = {
      id:'17',
      thirdapp_id:getApp().globalData.thirdapp_id
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

  intoPathTab(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'tab');
  },


  getSliderData(){
    const self = this;
    const postData = {};
    postData.searchItem = {
      menu_id:'381',
      thirdapp_id:getApp().globalData.thirdapp_id
    };
    const callback = (res)=>{ 
     self.data.sliderData = res.info.data;
      self.setData({
        web_sliderData:self.data.sliderData,
      });
    };
    api.articleGet(postData,callback);
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
        self.getMainData(true);
        self.getartData();
        self.getSliderData();
      }else{
        api.showToast('此分站暂未开通','fail');
        self.setData({
          web_region: self.data.region,
        });
        getApp().globalData.thirdapp_id = 59
      }  
      wx.hideLoading();
      console.log(getApp().globalData.thirdapp_id)
    }
    api.thirdAppGet(postData,callback);
  },


  onPullDownRefresh:function(){
    const self = this;
    wx.showNavigationBarLoading();
    delete self.data.thirdAppName
    self.setData({
      web_region: self.data.region
    })
    self.getMainData(true);
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

  
})
  
