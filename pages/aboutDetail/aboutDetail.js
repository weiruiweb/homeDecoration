//index.js
//获取应用实例
import {Api} from '../../utils/api.js';
var api = new Api();

Page({


  data: {
    
    mainData:[]

  },
    

  onLoad(options){
    const self = this;
    self.data.paginate = api.cloneForm(getApp().globalData.paginate);
    self.data.id = options.id;
    self.getMainData();
  },


  getMainData(){
    const self = this;
    const postData = {};
    postData.searchItem = {
      thirdapp_id:getApp().globalData.thirdapp_id,
    };
    postData.searchItem.id = self.data.id;
    const callback = (res)=>{
      self.data.mainData = res
      wx.hideLoading();
      self.data.mainData.content = api.wxParseReturn(res.info.data[0].content).nodes;
      self.setData({
        web_mainData:self.data.mainData,
      });  
    };
    api.articleGet(postData,callback);
  },




  
})