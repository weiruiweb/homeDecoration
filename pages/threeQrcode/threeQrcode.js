//index.js
//获取应用实例
import {Api} from '../../utils/api.js';
var api = new Api();

Page({
  data: {

    
    userData:[],
    QrData:[]

  },

  onLoad: function () {
    const self = this;
    self.getQrData();
    self.getMainData()
  },

  getQrData(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('threeToken');
    postData.qrInfo = {
      scene:wx.getStorageSync('threeInfo').user_no,
      path:'pages/index/index',
    };
    postData.output = 'url';
    postData.ext = 'png';
    const callback = (res)=>{
      self.data.QrData = res;
      self.setData({
        web_QrData:self.data.QrData,
      });
     
      wx.hideLoading();
    };
    api.getQrCode(postData,callback);
 },

  getMainData(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('threeToken');
    const callback = (res)=>{
      self.data.userData = res.info.data[0].info;
      self.setData({
        web_userData:self.data.userData,
      });
      wx.hideLoading();
    };
    api.userGet(postData,callback);
  },


  saveImgToPhotosAlbum(){
    const self = this;
    wx.downloadFile({
      url: self.data.QrData.info.url,
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (data) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: function (err) {
            if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              api.getAuthSettingOfImg()
            }
          },
          complete(res){
          }
        })
      }
    })
  }, 

  decorateDetail:function(){
  	wx.navigateTo({
  		url:"/pages/decorateDetail/decorateDetail"
  	})
  }
})
