const {request} = require('./request.js')

module.exports={
  //get the homepage data
  getUserInfo:(params)=>request('user/get',"GET",params,true),
}