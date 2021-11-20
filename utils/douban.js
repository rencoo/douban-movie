// https://api.douban.com/v2/movie/
// const baseUrl = 'http://127.0.0.1:8010' // 考虑写到app.js以公享
const baseUrl = 'https://movie.douban.com'
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
 * @param  {String}  tag     标签
 * @param  {String}  search  搜索关键词
 * @return {Promise}         Promise实例对象  
 */
function getList (type, page, count, tag, search) {
  // https://api.douban.com/v2/movie/in_theaters?start=0&count=20&city=北京
  // https://api.douban.com/v2/movie/search?start=0&count=20&city=北京&q=叶问
  // https://api.douban.com/v2/movie/search?start=0&count=20&city=北京&tag=动作
  page = page || 1
  count = count || 20
  tag = tag || ''
  search = search || ''
  const params = {start: (page - 1) * count, count: count, city: getApp().data.city}
  // return fetch(type, search ? Object.assign(params, {q: search}) : params)
  //   .then(res => res.data) // 响应拦截
  if (search) {
    return fetch(type, Object.assign(params, {q: search}))
      .then(res => res.data) // 响应拦截
  }
  if (tag) {
    return fetch(type, Object.assign(params, {tag: tag}))
      .then(res => res.data) // 响应拦截
  }
  return fetch(type, params)
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