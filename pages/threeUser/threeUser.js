//logs.js
import {Api} from '../../utils/api.js';
var api = new Api();

Page({
  data: {
    web_show:false
  },

  onLoad(){

  },
  
  onShow(){
    const self = this;
    const pass = api.checkThreeLogin();
    if(pass){
      self.setData({
        web_show:true
      })
    };
  },


  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },

  removeStorageSync(){
    api.logOff();
  },


})
