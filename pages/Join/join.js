//index.js
//获取应用实例
import {Api} from '../../utils/api.js';
var api = new Api();

Page({
  data: {
    num:'',
    mainData:[],
    labelData:[],
    searchItem:{

    }
  },


  menuClick: function (e) {
    const self = this;
    const num = e.currentTarget.dataset.num;
    self.changeSearch(num);
  },


  changeSearch(num){
    const self = this;
    this.setData({
      web_num: num
    });
    self.data.searchItem.menu_id = num;
    self.getMainData(true);
  },

  onLoad(){
    const self = this;
    self.data.paginate = api.cloneForm(getApp().globalData.paginate);
    
  },
  onShow(){
    const self = this;
    self.getMainData();
    self.getLabelData()
  },

  getMainData(){
    const self = this;
    const postData = {};
    postData.searchItem = {
      thirdapp_id:getApp().globalData.thirdapp_id,
      menu_id:self.data.searchItem.menu_id
    };
    const callback = (res)=>{
      self.data.mainData = {};
      self.data.mainData = res;
      wx.hideLoading();
      if(res.info.data[0]){
        self.data.mainData.content = api.wxParseReturn(res.info.data[0].content).nodes;
      }   
      self.setData({
        web_mainData:self.data.mainData,
      });  
    };
    api.articleGet(postData,callback);
  },



  getLabelData(){
    const self = this;
    const postData = {};
    postData.searchItem = {
      thirdapp_id:getApp().globalData.thirdapp_id,
    };
    postData.getBefore = {
      label:{
        tableName:'label',
        searchItem:{
          title:['=',['关于我们一级']],
          thirdapp_id:['=',[getApp().globalData.thirdapp_id]],
        },
        middleKey:'parentid',
        key:'id',
        condition:'in',
      },
    };
    const callback = (res)=>{
      if(res.info.data.length<5){  
        self.data.viewWidth = (100/(res.info.data.length)).toString()+'%';
      }else{
        self.data.viewWidth = '20'+'%'
      };
      self.data.labelData = res.info.data;
      if(res.info.data[0]){
        self.data.searchItem.menu_id = res.info.data[0].id;
        self.data.num = res.info.data[0].id;
      }  
      wx.hideLoading();
      self.setData({
        web_labelData:self.data.labelData,
        web_viewWidth:self.data.viewWidth,
        web_num:self.data.num,
      });
      self.getMainData()
    };
    api.labelGet(postData,callback);   
  },



  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },

})