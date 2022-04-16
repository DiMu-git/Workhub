import request from '@/utils/request'
import qs from  'qs'

//统计场馆预约情况
export function getStatistics(params) {
  return request({
    url: '/order/statistics',
    method: 'get',
    params:params
  })
}

//场馆 新建编辑 
export function venueAddOrEdit(data) {
  return request({
    url: '/venue/edit',
    method: 'post',
    data:data
  })
}
//场馆 查询 
export function venueFind(data) {
  return request({
    url: '/venue/find',
    method: 'post',
    data:data
  })
}

//场馆 删除 
export function venueDel(data) {
  return request({
    url: '/venue/del',
    method: 'post',
    data:data
  })
}

//设施 新建编辑 
export function facilitiesAddOrEdit(data) {
  return request({
    url: '/facilities/edit',
    method: 'post',
    data:data
  })
}
//设施 查询 
export function facilitiesFind(data) {
  return request({
    url: '/facilities/find',
    method: 'post',
    data:data
  })
}

//设施 删除 
export function facilitiesDel(data) {
  return request({
    url: '/facilities/del',
    method: 'post',
    data:data
  })
}

//活动课程 新建编辑 
export function activitiesAddOrEdit(data) {
  return request({
    url: '/activities/edit',
    method: 'post',
    data:data
  })
}
//活动课程 查询 
export function activitiesFind(data) {
  return request({
    url: '/activities/find',
    method: 'post',
    data:data
  })
}

//活动课程 删除 
export function activitiesDel(data) {
  return request({
    url: '/activities/del',
    method: 'post',
    data:data
  })
}

//订单 查询 
export function orderFind(data) {
  return request({
    url: '/order/find',
    method: 'post',
    data:data
  })
}
// 修改订单状态
export function changgeState(data) {
  return request({
    url: '/order/change',
    method: 'post',
    data:data
  })
}

//用户 新建编辑 
export function userAddOrEdit(data) {
  return request({
    url: '/user/edit',
    method: 'post',
    data:data
  })
}
//用户 查询 
export function userFind(data) {
  return request({
    url: '/user/find',
    method: 'post',
    data:data
  })
}

//用户 删除 
export function userDel(data) {
  return request({
    url: '/user/del',
    method: 'post',
    data:data
  })
}

