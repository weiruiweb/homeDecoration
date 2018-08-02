//logs.js
import {Api} from '../../utils/api.js';
var api = new Api();

Page({
  data: {
    web_show:false
  },

  onLoad: function () {
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

  removeStorageSync(){
    const self= this;
    api.logOff();
  },

  threeComplete:function(){
    wx.navigateTo({
      url:"/pages/threeComplete/threeComplete"
    })
  },
  threeTeam:function(){
    wx.navigateTo({
      url:"/pages/threeTeam/threeTeam"
    })
  },
  threeClient:function(){
     wx.navigateTo({
      url:"/pages/threeClient/threeClient"
    })
    
  },
  threebackMoney:function(){
     wx.navigateTo({
      url:"/pages/threebackMoney/threebackMoney"
    })
   },
   threeCredits:function(){
     wx.navigateTo({
      url:"/pages/threeCredits/threeCredits"
    })
   },
   threeAbout:function(){
     wx.navigateTo({
      url:"/pages/threeAbout/threeAbout"
    })
   },
   threeQrcode:function(){
    wx.navigateTo({
      url:"/pages/threeQrcode/threeQrcode"
    })
   },
   animite:function(){
    wx.navigateTo({
      url:"/pages/animite/animite"
    })
   }
})
