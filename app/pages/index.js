// @ts-nocheck
import http from '../utils/http.js'

// 获取应用实例
const app = getApp()
console.log(app)
Page({
	data: {
		bannerList: [],
		classList: [], 
		showKnow: false, // 默认关闭
		showjs: false
	},

	onLoad: function () {
		this.getBanner()
		this.getPublicClass()
	},

	getBanner() {
		http.get('/banner').then(data => {
			if (data.code == 0) {
				this.setData({
					bannerList: data.data
				})
			}
		})
	},

	getPublicClass() {
		http.get('/publicList').then(data => {
			if (data.code == 0) {
				this.setData({
					classList: data.data
				})
			}
		})
	},

	closeKnow(e) {
		console.log(e, "=closeKnow");
		this.setData({
			showKnow: e.detail
		})
	},

	showKnow() {
		this.setData({
			showjs: true
		})
	},

	closejs(e) {
		this.setData({
			showjs: true
		})
	},

	showjs() {
		this.setData({
			showzf: true
		})
	}
})