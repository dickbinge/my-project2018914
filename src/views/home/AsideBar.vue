<template>
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
      <!--<span>导航一</span>-->
      <el-submenu index="1">
        <template slot="title">
          <span>用户</span>
        </template>
        <el-menu-item index="1-1"  route="/user">
          <i class="el-icon-location"></i>
          <span>{{accoutMgr}}</span>
        </el-menu-item>
        <el-menu-item index="1-2" route="/setting">
          <i class="el-icon-location"></i>
          <span>{{accoutSet}}</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <span>设备</span>
        </template>
        <el-menu-item index="2-1"  route="/device" >
          <i class="el-icon-document"></i>
          <span>{{deviceMgr}}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  import PubSub from 'pubsub-js';
    export default {
        name: "AsideBar.vue",
        data(){
          return {
            accoutMgr: '用户管理',
            deviceMgr: '设备管理',
            accoutSet:'修改密码'
          };
        },
        methods:{
          accountCtrl(){
            var header = {"path":"/user","name": this.accoutMgr};
            PubSub.publish("updateHeader",header);
          },
          deviceCtrl(){
            var header = {"path":"/device","name": this.deviceMgr};
            PubSub.publish("updateHeader",header);
          }
        },
      mounted(){
          // this.accountCtrl();
      },
      methods:{
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
      }
    }
</script>

<style scoped>
  .el-aside-bar{
    width: 100%;
    border-style: solid;
    border-width: 1px;
    border-color: #27304D;
  }

  .el-menu {
    list-style: none;
    vertical-align: top;
    text-align: left;
  }
</style>
