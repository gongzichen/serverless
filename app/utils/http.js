let baseUrl = 'http://localhost:3000';

function http(option) {
	let {url, method="GET", data={}} = option; // 配置项
	return new Promise((res, rej) => {
		// @ts-ignore
		wx.request({
			url: baseUrl =  url,
			method: method.toUpperCase(),
			data,
			success(data) {
				res(data.data)
			},
			fail(err) {
				rej(err)
			}
 		})
	})
}

http.post = function(url, data) {
	return http({url: url, data: data, method: 'POST'})
}

http.get = function(url, data) {
	return http({url: url, data: data, method:'GET'})
}

export default http;