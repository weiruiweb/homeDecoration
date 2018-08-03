//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

    imgURL:'http://yijiao.oss-cn-qingdao.aliyuncs.com/images/http://tmp/wx1b4e5e756cd48af1.o6zAJsws4grEQvYrWTjBigy-6QaU.0llhudiKSF2V955a1c48350d9328ef064b4d36d12746.jpg'

  //事件处理函数
  },

  onLoad: function () {
    const self = this;
    self.getQrData()
  },

  getQrData(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    postData.param = wx.getStorageSync('info').user_no;
    postData.output = 'url';
    postData.ext = 'png';
    const callback = (res)=>{
      console.log(res);
      self.data.QrData = res;
      self.setData({
        web_QrData:self.data.QrData,
      });
     
      wx.hideLoading();
    };
    api.getQrCode(postData,callback);
 },


  saveImgToPhotosAlbum(){
    const self = this;
    wx.downloadFile({
      url: self.data.imgURL,
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
            console.log(res);
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
