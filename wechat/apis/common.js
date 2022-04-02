/**
 * 通用api
 */
import * as API from './request'
export default {
	/**
	 *获取手机号 
	 */
	getPhone(params){
		return API.POST('/weChat/decodePhone',params)
	}
}
