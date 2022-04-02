const BASE_URL = 'http://localhost:8080/renren-fast'
// const BASE_URL = 'http://localhost:8081'
const req = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			header: {
				"token":getApp().globalData.token
			},
			url: BASE_URL + options.url,
			method: options.method || "POST",
			data: options.data || {},
			sslVerify: false,
			success: (res) => {
				resolve(res);
			},
			fail: (res) => {
				reject(res);
			}
		})
	})
}
const POST = (url, params) => {
	return new Promise((resolve, reject) => {
		uni.request({
			header: {
				"token": getApp().globalData.token
			},
			url: BASE_URL + url,
			method: "POST",
			data: params || {},
			success: (res) => {
				resolve(res);
			},
			fail: (res) => {
				reject(res);
			}
		})
	})
}

const GET = (url, params) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + url,
			method: "GET",
			data: params || {},
			success: (res) => {
				resolve(res);
			},
			fail: (res) => {
				reject(res);
			}
		})
	})
}

const PUT = (url, params) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + url,
			method: "PUT",
			data: params || {},
			success: (res) => {
				resolve(res);
			},
			fail: (res) => {
				reject(res);
			}
		})
	})
}
export {
	req,
	BASE_URL,
	POST,
	GET,
	PUT
}
