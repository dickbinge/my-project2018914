<template>
  <div>
    <el-container>

      <el-container class="el-container-body" id="el-body">
        <el-aside>
          <div class="el-aside-bar">
            <el-menu
              @open="handleOpen"
              @close="handleClose"
              class="el-menu-vertical-demo"
              background-color="#27304D"
              text-color="#fff"
              active-text-color="#ffd04b"
              default-openeds="[1,2]"
              router>
              <el-submenu index="1">
                <template slot="title">
                  <span>设备</span>
                </template>
                <el-menu-item index="1-1" route="/userInfo/devicelist">
                  <i class="el-icon-location"></i>
                  <span>{{deviceMgr}}</span>
                </el-menu-item>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <span>账户</span>
                </template>
                <el-menu-item index="2-1"  route="/userInfo/setting" >
                  <i class="el-icon-document"></i>
                  <span>{{accoutSet}}</span>
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
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
        name: '',
        accoutSet:"修改账户",
        deviceMgr:"设备信息",
      }
    },
    components: {
    },
    mounted() {
      function findDimensions() {
        document.getElementById("el-body").style.height= document.documentElement.clientHeight - 60 +"px";
      }

      findDimensions();
      window.onresize=findDimensions;
      //let uname = getCookie('username')
      this.name = this.$route.params.username;
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

