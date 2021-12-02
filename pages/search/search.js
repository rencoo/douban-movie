// 获取全局应用程序实例对象
const app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    count: 20,
    subtitle: '输入你想看的电影',
    list: [],
    search: '',
    loading: false,
    hasNext: false,
    tag: '',
    hotTag: ['动作', '喜剧', '爱情', '悬疑'],
    isShow: false
  },

  loadMore() {
    // 考虑 loadMore是否可以写成一个调用的辅助函数
    // https://api.douban.com/v2/movie/search?start=0&count=20&city=北京&q=叶问
    const that = this;
    if (!that.data.hasNext) return;

    that.setData({ subtitle: '加载中...', loading: true, isShow: false });
    return app.douban
      .getList(
        'search',
        that.data.page++,
        that.data.count,
        that.data.tag,
        that.data.search
      )
      .then((res) => {
        console.log(res);
        if (res.subjects.length) {
          that.setData({
            subtitle: res.title,
            list: that.data.list.concat(res.subjects),
            loading: false,
            isShow: true
          });
        } else {
          that.setData({
            subtitle: res.title,
            hasNext: false,
            loading: false,
            isShow: false
          });
        }
      })
      .catch((err) => {
        console.log(err);
        that.setData({ subtitle: '获取数据异常', loading: false });
      });
  },

  handleSearch(evt) {
    const that = this;
    console.log(evt);
    if (!evt.detail.value) return;
    that.setData({ list: [], page: 1 });
    that.setData({
      subtitle: '加载中...',
      hasNext: true,
      loading: true,
      search: evt.detail.value
    });

    that.loadMore();
  },

  searchByTag(evt) {
    var that = this;
    const target = evt.currentTarget;
    const tag = target.dataset.tag;

    that.setData({ list: [], page: 1 });
    that.setData({
      subtitle: '加载中...',
      hasNext: true,
      loading: true,
      tag: tag
    });

    that.loadMore();
  }
});
