const {request} = require('./request.js')

module.exports={
  //获取首页数据
  getUserInfo:(params)=>request('user/get',"GET",params,true),
}