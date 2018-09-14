<template>
  <div>
  <el-container>
    <el-header>
      <header-bar></header-bar>
    </el-header>
    <el-container class="el-container-body" id="el-body">
      <el-aside>
        <aside-bar></aside-bar>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
  </div>
</template>

<script>
  import {setCookie, getCookie, delCookie} from '../../assets/js/cookie.js'
  import Account from '@/views/user/Account'
  import Device from '@/views/device/Device'
  import DeviceList from '@/views/device/DeviceList'
  import HeaderBar from '@/views/home/HeaderBar'
  import AsideBar from '@/views/home/AsideBar'
  export default {
    data() {
      return {
        name: ''
      }
    },
    inject:['reload'], //注入reload方法
    components: {
      'header-bar':HeaderBar,
      'aside-bar':AsideBar
    },
    mounted() {
      function findDimensions() {
        document.getElementById("el-body").style.height= document.documentElement.clientHeight - 60 +"px";
      }

      findDimensions();
      window.onresize=findDimensions;
      let uname = getCookie('username')
      this.name = uname
    },
    methods: {
      handleOpen() {

      },
      handleClose() {

      }
    }
  }
</script>
<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 199px;
    min-height: 200px;
    background: #27304D;
  }

  .el-menu {
    list-style: none;
    margin: 0;
    padding-left: 0;
    vertical-align: top;
    text-align: left;
  }
  .el-header{
    background-color: #FFFFFF;
    color: #333;
    text-align: left;
    line-height: 60px;
  }
  .el-container-body{
    display: flex;
    /*height: 800px;*/
    height: 600px;
  }

  .el-aside {
    background-color: #27304D;
    color: #333;
    text-align: center;
    line-height: 400px;
  }

  .el-main {
    background-color: #F7FAFF;
    color: #333;
    flex: 1;
    flex-basis: auto;
    padding: 20px;
  }
  body {
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }

  #nameInfo {
    position: absolute;
    right: 30px;
    top: 10px;
  }

  #nameInfo p {
    font-size: 15px;
    font-family: 微软雅黑;
  }

  #nameInfo span #logout {
    color: blue;
    cursor: pointer;
    text-align: right;
  }

  #nameInfo span #logout:hover {
    color: #41b883;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 299px;
    min-height: 300px;
    background: #27304D;
  }

  .el-menu {
    list-style: none;
    margin: 0;
    padding-left: 0;
    vertical-align: top;
    text-align: left;
  }
</style>
