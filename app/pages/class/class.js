// @ts-nocheck
import http from '../../utils/http.js'

Page({
	data: {
		level1: [],
		level2: [],
		level3: []
	},
	onLoad: function () {
		this.getData()
	},
	getData() {
		http.get('/classList').then(data => {
			if (data.code== 0) {
				let {level1, level2, level3 } = data.data
				this.setData({
					level1,
					level2,
					level3,
				})
			}
		})
	}
})