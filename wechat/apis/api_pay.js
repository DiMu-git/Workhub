/**
 * 支付api
 */
import * as API from './request'
export default {
	/**
	 * 生成订单
	 */
	save: params => {
		return API.POST('/order/save', params);
	}
}
