//logs.js
import {Api} from '../../utils/api.js';
var api = new Api();

Page({
  data: {
  	mainData:[]
  },
  
  onShow() {
  	const self = this;
  	self.userGet()
  },

  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },

  userGet(){
    const self = this;
    const postData = {
      token:wx.getStorageSync('token'),
    }
    const callback = (res)=>{
      console.log(res)
      self.data.mainData = res;
      self.setData({
        web_mainData:self.data.mainData
      });
      wx.hideLoading();
    };
    api.userGet(postData,callback);
  },

})
