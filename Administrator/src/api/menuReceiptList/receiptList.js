import request from '@/utils/request'
import qs from  'qs'

//收款单列表 
export function getList(data) {
  return request({
      url: '/collection/list',
      method: 'post',
      data:data
  })
}

//新增或编辑 
export function addOrEdit(bean) {
  return request({
      url: '/collection/edit',
      method: 'post',
      data:bean
  })
}

//批量删除 
export function del(bean) {
  return request({
      url: '/collection/del',
      method: 'post',
      data:bean
  })
}

//审核 
export function check(bean) {
  return request({
      url: '/collection/check',
      method: 'post',
      data:bean
  })
}


//金额转换为大写 
export function toChinese(num) {
  return request({
    url: '/base/toChinese?num='+num,
    method: 'get',
  })
}