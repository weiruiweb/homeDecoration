//logs.js
import {Api} from '../../utils/api.js';
var api = new Api();

Page({
  data: {
    mainData:[]
  },

  onLoad: function (options) {
    const self = this;
    self.data.id = options.id;
    self.getArticleGet()

  },

  getArticleGet(){
    const self = this;
    const postData = {};
    postData.searchItem = {
      thirdapp_id:getApp().globalData.thirdapp_id
    };
    postData.searchItem.id = self.data.id;
    const callback = (res)=>{ 
     self.data.mainData = res;
     self.data.mainData.content = api.wxParseReturn(res.info.data[0].content).nodes;
      self.setData({
        web_mainData:self.data.mainData,
      });
    };
    api.articleGet(postData,callback);
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
