/**
 * 菜单api
 */
import * as API from './request'
export default {
	//根据门店id获取分类菜单
	getMenus: params => {
		return API.GET('/cuisineType/findByShopIdTree/'+params, null)
	}
}
