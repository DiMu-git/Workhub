import Vue from 'vue'
import App from './App'
import api from './api'
import util from './common/util'
import store from './store'
import {req} from './apis/request.js'

Vue.config.productionTip = false

App.mpType = 'app'
import uView from "uview-ui";
Vue.use(uView);
Vue.prototype.$store = store
Vue.prototype.$api = api
Vue.prototype.$util = util
Vue.prototype.$req=req
import initModal from "@/store/myAlert.js";
initModal(Vue);
const app = new Vue({
	store,
    ...App
})
app.$mount()
