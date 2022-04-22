const {request} = require('./request.js')

module.exports={
  //getVenueList
  getVenueList:()=>request('venue/list',"post",{},true),

   //get the facilities or courses of venue
   getList:(params)=>request('venue/getList',"get",params,true),

   //get the reservation of facilities and courses of venue
   getTimes:(params)=>request('venue/getTimes',"get",params,true),

   //submit facilities orders
   orderPay:(data)=>request('order/pay',"post",data,true),

   //serach
   getListByTime:(params)=>request('venue/getListByTime',"get",params,true),

}
