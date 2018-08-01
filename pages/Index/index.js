//index.js
//获取应用实例
import {Api} from '../../utils/api.js';
var api = new Api();

Page({
  data: {
    multiIndex: [0, 0, 0],
    
    region: '西安市',
    mainData:[],
    artData:[],
    sliderData:[],

    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
  },
  //事件处理函数




  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },


 
    

  onLoad(){
    const self = this;
    self.data.paginate = api.cloneForm(getApp().globalData.paginate);
    self.getMainData();
    self.getartData();
    self.getSliderData()
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
      thirdapp_id:'59'
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
      wx.hideLoading();
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
      console.log(self.data.sliderData)

    };
    api.labelGet(postData,callback);
  },

  
})
  
