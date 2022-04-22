import request from '@/utils/request'
import qs from  'qs'

//Statistics on venue reservations
export function getStatistics(params) {
  return request({
    url: '/order/statistics',
    method: 'get',
    params:params
  })
}

//Venue New Edit 
export function venueAddOrEdit(data) {
  return request({
    url: '/venue/edit',
    method: 'post',
    data:data
  })
}
//Venue Inquiry 
export function venueFind(data) {
  return request({
    url: '/venue/find',
    method: 'post',
    data:data
  })
}

//Venue delete 
export function venueDel(data) {
  return request({
    url: '/venue/del',
    method: 'post',
    data:data
  })
}

//Facilities New Edit
export function facilitiesAddOrEdit(data) {
  return request({
    url: '/facilities/edit',
    method: 'post',
    data:data
  })
}

//Facility Inquiry
export function facilitiesFind(data) {
  return request({
    url: '/facilities/find',
    method: 'post',
    data:data
  })
}

//Facility delete 
export function facilitiesDel(data) {
  return request({
    url: '/facilities/del',
    method: 'post',
    data:data
  })
}

//Course New Edit 
export function activitiesAddOrEdit(data) {
  return request({
    url: '/activities/edit',
    method: 'post',
    data:data
  })
}

//Course Inquiry 
export function activitiesFind(data) {
  return request({
    url: '/activities/find',
    method: 'post',
    data:data
  })
}

//Course delete 
export function activitiesDel(data) {
  return request({
    url: '/activities/del',
    method: 'post',
    data:data
  })
}

//Order Tracking 
export function orderFind(data) {
  return request({
    url: '/order/find',
    method: 'post',
    data:data
  })
}

//Edit order status
export function changgeState(data) {
  return request({
    url: '/order/change',
    method: 'post',
    data:data
  })
}

//User New Edit
export function userAddOrEdit(data) {
  return request({
    url: '/user/edit',
    method: 'post',
    data:data
  })
}

//User query
export function userFind(data) {
  return request({
    url: '/user/find',
    method: 'post',
    data:data
  })
}

//User delete
export function userDel(data) {
  return request({
    url: '/user/del',
    method: 'post',
    data:data
  })
}

