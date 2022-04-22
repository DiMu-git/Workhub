/**
 * 门店api
 */
import * as API from './request'
export default{
	/**
	 * 根据门店id获取门店信息
	 */
	getShopInfo(params){
		return API.POST("/shop/findByShopId",params)
	},
}