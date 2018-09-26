// https://api.douban.com/v2/movie/
// const baseUrl = 'http://127.0.0.1:8010' // 考虑写到app.js以公享
const baseUrl = 'https://douban.uieee.com/v2/movie/'
const Fetch = require('./fetch')

/**
 * 抓取豆瓣电影特定类型的API
 * https://developers.douban.com/wiki/?title=movie_v2
 * @param   {String}   type    类型，ex 'in_theaters'
 * @param   {Object}   params  查询参数
 * @return  {Promise}          Promise实例对象
 */
function fetch (type, params) {
  return Fetch(baseUrl, type, params)
}

/**
 * 获取列表类型的数据
 * @param  {String}  type    类型，ex 'in_theaters'
 * @param  {Number}  page    页码
 * @param  {String}  count   每页条数
 * @param  {String}  search  搜索关键词
 * @return {Promise}         Promise实例对象  
 */
function getList (type, page, count, search) {
  // https://api.douban.com/v2/movie/in_theaters?start=0&count=20&city=北京
  page = page || 1
  count = count || 20
  search = search || ''
  const params = {start: (page - 1) * count, count: count, city: getApp().data.city}
  return fetch(type, search ? Object.assign(params, {q: search}) : params)
    .then(res => res.data) // 响应拦截
}

/**
 * 获取单条类型的数据
 * @param   {Number}  id  电影id
 * @return  {Promise}     Promise实例对象
 */
function getItem (id) {
  // https://api.douban.com/v2/movie/subject/26696879
  return fetch('subject/' + id)
    .then(res => res.data) // 响应拦截
}

module.exports = { getList, getItem }