// @ts-nocheck
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    total: 0,
    cartList: [],
  },

  // 事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      // 保留当前页面 .跳转到某个应用
      url: "../logs/logs",
    });
  },

  onLoad: function () {
    let ary = app.globalData.cartList;
    let t = ary.reduce((pre, next) => prev + next.price * next.count, 0);
    this.setData({
      carlist: ary,
      total: t,
		});
		 if (app.globalData.userInfo) {
       //获得用户的信息就并且有权限
       this.setData({
         userInfo: app.globalData.userInfo,
         hasUserInfo: true,
       });
     } else if (this.data.canIUse) {
			 // 兼容_网络延迟
				app.userInfoReadyCallback = (res) => {
					this.setData({
						userInfo: res.userInfo,
						hasUserInfo: true,
					});
				};
		 } else {
			// 在没有 open-type=getUserInfo 版本的兼容处理
				wx.getUserInfo({
					success: (res) => {
						app.globalData.userInfo = res.userInfo;
						this.setData({
							userInfo: res.userInfo,
							hasUserInfo: true,
						});
					},
				});
		}
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    });
  },
  Change(e) {
    let ary = app.globalData.cartList;
    ary.forEach((item) => {
      item.id == e.target.dataset.item.id
        ? (item.count = e.detail.value * 1)
        : null;
    });
    let t = ary.reduce((prev, next) => prev + next.price * next.count, 0); //获得表框数字的课程的总价
    //console.log(e, ary, t)
    this.setData({
      cartList: ary,
      total: t,
    });
  },
  onShow() {
    let ary = app.globalData.carList;
    let t = ary.reduce((prev, next) => prev + next.price * next.count, 0);
    //console.log(ary, t)
    this.setData({
      cartList: ary,
      total: t,
    });
  },
});