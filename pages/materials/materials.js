//index.js
//获取应用实例
import {Api} from '../../utils/api.js';
var api = new Api();

Page({
  data: {
    num:'361',
    labelData:[],
    mainData:[],
    searchItem:{
      menu_id:'361'
    },
    viewWidth:''
  },



  menuClick: function (e) {
    const self = this;
    const num = e.currentTarget.dataset.num;
    self.changeSearch(num);
  },


  changeSearch(num){
    const self = this;
    this.setData({
      num: num
    });
    self.data.searchItem.menu_id = num;
    self.getMainData(true);
  },

  getLabelData(){
    const self = this;
    const postData = {};
    postData.searchItem = {
      thirdapp_id:getApp().globalData.thirdapp_id,
      parentid:['=','360']
    };
    const callback = (res)=>{
      console.log(res.info.data.length)
      if(res.info.data.length<5){
        
        function toPercent(num, total) { 
          return (Math.round(res.info.data.length / 100 * 10000) / 100.00 + "%");
        };

      }else{
        self.data.viewWidth = '20'+'%'
      };
      self.data.labelData = res.info.data;    
      wx.hideLoading();
      self.setData({
        web_labelData:self.data.labelData,
      });
    };

    api.labelGet(postData,callback);
    
  },

  onLoad(){
    const self = this;
    self.data.paginate = api.cloneForm(getApp().globalData.paginate);
    self.getMainData();
    self.getLabelData()
  },

  getMainData(isNew){
    const self = this;
    if(isNew){
      api.clearPageIndex(self);  
    };
    const postData = {};
    postData.paginate = api.cloneForm(self.data.paginate);
    postData.searchItem = {
      thirdapp_id:getApp().globalData.thirdapp_id,
      menu_id:self.data.searchItem.menu_id,
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
        api.showToast('没有更多了','fail');
      };
      wx.hideLoading();
      self.setData({
        web_mainData:self.data.mainData,
      });  
    };
    api.articleGet(postData,callback);
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

})
