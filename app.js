/**
 * Douban API 模块
 * @type {Object}
 */
const douban = require('./utils/douban.js')
//app.js
App({
  data: {
    city: '北京'
  },
  /**
     * Douban API
     */
  douban: douban,
  onLaunch: function () {
    // wechat 
    //   .getLocation()
    //   .then(res => {

    //   })
  }
})