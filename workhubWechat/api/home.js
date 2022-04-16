const {request} = require('./request.js')

module.exports={
  //获取场馆列表
  getVenueList:()=>request('venue/list',"post",{},true),

   //获取场馆的设施和课程
   getList:(params)=>request('venue/getList',"get",params,true),

   //获取场馆的设施和课程 的可预约情况
   getTimes:(params)=>request('venue/getTimes',"get",params,true),

   //提交设施订单
   orderPay:(data)=>request('order/pay',"post",data,true),

   //搜索
   getListByTime:(params)=>request('venue/getListByTime',"get",params,true),

}
