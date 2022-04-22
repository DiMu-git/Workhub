module.exports={
  // Current Environment：dev  prod  test
  nowEnv:"test",
  // nowEnv:"prod",
  //Develop Environment
  dev:{
    baseUrl:"http://127.0.0.1:8088",
  },
  //Produce Environment
  prod:{
    baseUrl:"",
  },
  //Test Environment
  test:{
    baseUrl:"http://42.193.41.204:8088",
  }
}