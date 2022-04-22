import axios from 'axios'
import { MessageBox, Message,Loading } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { debounce } from'./index'

const authError = debounce(()=>{
  MessageBox.confirm('No login or login timeout', 'Confirm login', {
    confirmButtonText: 'Login again',
    cancelButtonText: 'cancel',
    type: 'warning',
    closeOnClickModal:false
  }).then(() => {
    store.dispatch('user/resetToken').then(() => {
      location.reload()
    })
  })
},3000)

// Global variable to save the loading instance
let loading;

function startLoading() {
  loading = Loading.service({
    lock: true,
    text: "加载中...",
    // background: "deepgray",
    background: "rgba(0,0,0,0.7)"
  });
}

function endLoading() {
  loading.close();
}

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API+"workhub", // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 20000, // request timeout
  // headers:{
  //   "Content-type":"application/x-www-form-urlencoded"
  // }
})
// service.defaults.headers["Content-type"] = "application/x-www-form-urlencoded"

service.interceptors.request.use(
  config => {
    startLoading();
    
    // if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      
      // config.headers['token'] = getToken()
    // }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    endLoading();
    const res = response.data
    // console.log(res)
    if (res.code && res.code != 0) {
      if(res.code == -1){
        Message({
          message: res.msg,
          type: 'warning'
        });
        return Promise.reject(new Error(res.msg || 'Error'))
      }
      if(res.code == -100){
        MessageBox.confirm('Account has been logged in', 'Login', {
          confirmButtonText: 'Login again',
          cancelButtonText: 'cancel',
          type: 'warning',
          closeOnClickModal:false
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
        return
      }
      
      // if (res.code == 500) {
      //   MessageBox.confirm(res.msg, 'tips', {
      //     confirmButtonText: 'confirm',
      //     cancelButtonText: 'cancel',
      //     type: 'warning'
      //   }).catch(()=>{
      //     endLoading();
      //   })
      // }
      
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    // console.log('debounce' + debounce)
    
    authError()
    endLoading();
    return Promise.reject(error)
  }
)

export default service
