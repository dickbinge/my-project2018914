import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/Login.vue'
import LoginNew from '@/views/login/Login.vue'
import Home from '@/views/home/Home.vue'
import AddUp from '@/views/home/AddUp.vue'
import Test from '@/views/home/Test.vue'
import Account from '@/views/user/Account.vue'
import Device from '@/views/device/Device.vue'
import DeviceList from '@/views/device/DeviceList.vue'
import Setting from '@/views/setting/Setting.vue'
import HeaderBar from '@/views/home/HeaderBar.vue'
import User from '@/views/user/User.vue'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(Router);
Vue.use(iView);
export default new Router({
  // mode:'history', 在跟后台交互的时候使用
  routes: [
    {
      path:'/',
      name:'AddUp',
      component:AddUp
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      //加重定向
      redirect:'/user',
      children:[
        {
          path:'/user',
          name:'Account',
          component:Account
        },
        {
          path:'/device',
          name:'Device',
          component:Device
        },{
          path:'/setting',
          name:'Setting',
          component:Setting
        }
      ]
    },

    {
      path:'/user',
      name:'Account',
      component:Account
    },
    {
      path:'/device',
      name:'Device',
      component:Device
    },
    {
      path:'/devicelist',
      name:'DeviceList',
      component:DeviceList
    },
    {
      path:'/userInfo',
      name:'User',
      component:User,
      //加重定向
      redirect:'/userInfo/devicelist',
      children:[
        {
          path:'/userInfo/devicelist',
          name:'DeviceList',
          component:DeviceList
        },{
          path:'/userInfo/setting',
          name:'Setting',
          component:Setting
        }
      ]
    }
  ]
})
