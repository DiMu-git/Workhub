import request from '@/utils/request'
import qs from  'qs'

//付款单列表 
export function getMoney(params) {
  return request({
    url: '/base/getMoney',
    method: 'get',
    params:params
  })
}