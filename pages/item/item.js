// 获取全局应用程序实例对象
const app = getApp();

// 创建页面实例对象
Page({
  data: {
    movie: {},
    loading: true
  },

  onLoad(params) {
    var that = this;
    console.log(params.id); // 由list电影列表点击传入的参数
    app.douban
      .getItem(params.id)
      .then((res) => {
        console.log(res);
        console.log(res.popular_reviews);
        that.setData({
          movie: res,
          loading: false
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  onShareAppMessage() {
    return {
      title: '自定义分享标题',
      desc: '自定义分享描述',
      path: '/pages/item?id=' + this.data.id
    };
  }
});
