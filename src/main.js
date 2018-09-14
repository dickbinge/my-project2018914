// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import $ from 'jquery'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Conf from './config';
import reset from './assets/css/reset.css'
//Vue.use(VueAxios,axios)
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.prototype.$ajax=axios   //修改Vue的原型属性
Vue.config.productionTip = false
Vue.use(VueResource);
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
