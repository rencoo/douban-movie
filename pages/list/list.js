// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data:{
    title: '',
    subtitle: '加载中...',
    type: 'in_theaters',
    loading: true,
    hasNext: true,
    list: [],
    page: 1,
    count: 20
  },

  loadMore () {
    // https://api.douban.com/v2/movie/in_theaters?start=0&count=20&city=北京
    var that = this
    if(!that.data.hasNext) return
    console.log(that.data.page)
    that.setData({subtitle: '加载中...', loading: true})

    return app.douban.getList(that.data.type, that.data.page++, that.data.count)
      .then(res => {
        console.log(res)
        if(res.subjects.length) {
          that.setData({subtitle: res.title, list: that.data.list.concat(res.subjects), loading: false })
        } else {
          that.setData({ subtitle: res.title, hasNext: false, loading: false })
        }
      })
      .catch(err => {
        console.log(err)
        that.setData({subtitle: '获取数据异常', loading: false})
      })
  },

  /**
   * 生命周期函数--监听页面 加载
   */
  onLoad (params) {
    var that = this
    that.data.title = params.title || that.data.title

    // 类型: in_theaters  coming_soon  us_box
    that.data.type = params.type || that.data.type
    
    that.loadMore()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    var that = this
    wx.showNavigationBarLoading()

    that.setData({list: [], page: 1, hasNext: true})
    that.loadMore()
      .then(() => wx.stopPullDownRefresh())
    setTimeout(wx.hideNavigationBarLoading, 2000)
    // wx.stopPullDownRefresh()
  },

  onReachBottom () {
    this.loadMore()
  }
})