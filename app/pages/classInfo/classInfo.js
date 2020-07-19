// @ts-nocheck
let app = getApp()

Page({
  data: {
    til: "",
    img: "",
    id: "",
    price: 0,
    num: app.globalData.cartList.length,
	},
	add() {
		let ary = app.globalData.cartList;
		let obj = {
			title: this.data.til,
			img: this.data.img,
			id: this.data.id,
			price: this.data.price,
			count: 1,
		};

		let bol = ary.filter((item) => item.id == this.data.id);
		if (bol.length) {
			bol[0].count++;
		} else {
			ary.push(obj);
			this.setData({
				num: ary.length,
			});
		}
	},
	goUser() {
		wx.switchTab({
      url: "/pages/user/user",
    });
	},
	
	onLoad: function (options) {
		this.setData({
			til: options.til,
			img: options.img,
			id: options.id,
			price: options.price
		})

		this.setData({
			num: app.globalData.cartList.length
		})
	}
});