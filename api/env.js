module.exports={
  // 当前环境：dev  prod  test
  nowEnv:"test",
  // nowEnv:"prod",
  //开发环境
  dev:{
    baseUrl:"http://127.0.0.1:8080",
  },
  //生产环境
  prod:{
    baseUrl:"",
  },
  //测试环境
  test:{
    baseUrl:"http://42.193.41.204:8088",
  }
}