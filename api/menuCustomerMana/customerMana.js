
import request from '@/utils/request'
import qs from  'qs'

//用户列表 
export function getList(data) {
  return request({
      url: '/customer/list',
      method: 'post',
      data:data
  })
}

//新增或编辑 
export function addOrEdit(bean) {
  return request({
      url: '/customer/edit',
      method: 'post',
      data:bean
  })
}

//批量删除 
export function del(bean) {
  return request({
      url: '/customer/del',
      method: 'post',
      data:bean
  })
}
