// 获取全局应用程序实例对象
const app = getApp()

// 数据请求地址
// var requestURL_movie = 'https://api.douban.com/v2/movie/in_theaters?count=3'  

Page({
  data: {
    list: [],
    type: 'in_theaters',
    page: 1,
    count: 3
  },
  loadMore () {
    // https://api.douban.com/v2/movie/in_theaters?start=0&count=20&city=北京
    var that = this

    return app.douban.getList(that.data.type, that.data.page, that.data.count)
      .then(res => {
        console.log(res)
        if(res.subjects.length) {
          that.setData({ list: that.data.list.concat(res.subjects) })
        }
      })
      .catch(err => {
        console.log(err)
        that.setData({subtitle: '获取数据异常', loading: false})
      })
  },
  onLoad () {
    var that = this
    that.loadMore()
  }
})