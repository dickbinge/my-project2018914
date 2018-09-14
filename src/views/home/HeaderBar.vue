<template>
    <div class="header">
      <div class="el-logo">Device.Management</div>
      <!--<i class="iconfont icon-service" id="icon-user"></i>-->
      <!--<i class="iconfont icon-moreunfold" id="icon-login"></i>-->
      <span class="el-user">admin</span>
      <span class="logoout" @click="logout">注销</span>
    </div>
</template>

<script>
  import {delCookie} from '../../assets/js/cookie.js'
  export default {
    name: "HeaderBar",
    data(){
        return{
          titleMgr:'Acoount List'
        }
    },
    methods:{
      logout(){
         var self=this;
         delCookie();
         self.$router.push('/');
      }
    }
  }
</script>

<style scoped>
  .header{
    text-align: left;
    margin-left: -20px;
    margin-right: -20px;
    height: 60px;
  }

  .el-logo{
    margin-left: 0px;
    background: #1f23ff;
    text-align: center;
    color: white;
    width: 300px;
    font-size:18px;
    display: inline-block;
  }
  .el-breadcrumb{
    margin-left: 20px;
    display: inline-block;
  }

  #icon-remind{
    float: right;
    margin-right: 20px;
  }

  #icon-login{
    float: right;
    margin-right: 20px;
    color: #f5ffbf;
  }

  #icon-user{
    float: right;
    margin-right: 35px;
    color: #eaff83;

  }

  .el-line-left{
    float: right;
    margin-right: 20px;
    width: 2px;
    height: 60px;
    background: #E2E8F4;
  }

  .el-line-right{
    float: right;
    margin-right: 50px;
    width: 2px;
    height: 60px;
    background: #E2E8F4;
  }

  .el-user{
    float: right;
    margin-right: 30px;
    font-size: 20px;
  }
  .logoout{
    float: right;
    font-size: 14px;
    margin-right: 30px;
    color:blue;
    display: block;
    width: 50px;
    height: 30px;
    margin-top: 16px;
    line-height: 30px;
    text-align: center;
  }
  .logoout:hover{
    cursor:pointer;
    background: orange;
    font-size: 18px;
  }
</style>
