/**
 * 抓取远端API的结构
 * https://developers.douban.com/wiki/?title=movie_v2
 * @param  {String}   api     api根地址
 * @param  {String}   path    请求路径
 * @param  {Objecet}  params  查询参数
 * @return {Promise}          Promise实例对象
 */
module.exports = function (api, path, params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${api}/${path}`,
      data: Object.assign({}, params),
      method: 'GET',
      header: {
        'Content-Type': 'json'
      },
      success: resolve,
      fail: reject
    })
  })
}