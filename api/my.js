const {request} = require('./request.js')

module.exports={
  //获取首页数据
  editMyMsg:(params)=>request('user/edit',"post",params,true,false),
  
  setVip:(params)=>request('user/vip',"post",params,true,false),
  
  getOrdersByUser:(params)=>request('order/getOrdersByUser',"get",params,true,false),
  
  //取消订单
  refund:(data)=>request('order/refund',"get",data,true),
}