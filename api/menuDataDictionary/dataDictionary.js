
import request from '@/utils/request'
import qs from  'qs'

//用户列表 
export function getList(data) {
  return request({
      url: '/param/find',
      method: 'post',
      data:data
  })
}

//新增或编辑 
export function addOrEdit(bean) {
  return request({
      url: '/param/edit',
      method: 'post',
      data:bean
  })
}

//批量删除 
export function del(bean) {
  return request({
      url: '/param/del',
      method: 'post',
      data:bean
  })
}
