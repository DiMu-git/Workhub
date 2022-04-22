import request from '@/utils/request'

export function getToken() {
  return request({
    url: '/qiniu/upload/token', // Fake address replace by yourself
    method: 'get'
  })
}
