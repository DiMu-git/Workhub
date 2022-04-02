const BASE_URL = 'https://api.bigtian.club/api/room'
 const req = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || "POST",
			data: options.data || {},
			sslVerify:false,
			success: (res) => {
				resolve(res);
			},
			fail: (res) => {
				reject(res);
			}
		})
	})
}
export {req,BASE_URL}
