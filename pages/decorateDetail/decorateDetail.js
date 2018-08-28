//index.js
//获取应用实例
import {Api} from '../../utils/api.js';
var api = new Api();
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
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



  intoPath:function(e){
    const self = this;
    var id = e.currentTarget.dataset.id;
    var keywords = e.currentTarget.dataset.keywords;
    getApp().globalData.id = id;
    getApp().globalData.keywords = keywords;
    wx.switchTab({
      url: '/pages/Great/great'
    });
  },

  calling() {
    const self = this;
    var phone = self.data.mainData.info.data[0].contactPhone;
    wx.makePhoneCall({
        phoneNumber: phone,
        success: function () {
            console.log("拨打电话成功！")
        },
        fail: function () {
            console.log("拨打电话失败！")
        }
    })
  }

  
})
