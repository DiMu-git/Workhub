import request from '@/utils/request'

import qs from  'qs'

export function login(data) {
  // let bean = qs.stringify(data)
  return request({
    url: '/user/login',
    method: 'post',
    data:data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/getUser',
    method: 'get',
    // params: { token }
  })
}
//暂时未用
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function changePassword(bean) {
  return request({
    url: '/user/changePassword',
    method: 'post',
    data:bean
  })
}

export function resetPassword(bean) {
  return request({
    url: '/user/reset',
    method: 'post',
    data:bean
  })
}


