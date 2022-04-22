const {request} = require('./request.js')

module.exports={
  //get the homepage data
  editMyMsg:(params)=>request('user/edit',"post",params,true,false),
  
  setVip:(params)=>request('user/vip',"post",params,true,false),
  
  getOrdersByUser:(params)=>request('order/getOrdersByUser',"get",params,true,false),
  
  //cancel the orders
  refund:(data)=>request('order/refund',"get",data,true),

  //send email
  sendOrder:(data)=>request('order/sendOrder',"post",data,true),
}