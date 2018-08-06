//logs.js
import {Api} from '../../utils/api.js';
var api = new Api();

Page({
  data: {

  },
  
  onLoad: function () {

  },

  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  }

})
