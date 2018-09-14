<template>
<div id="deContent">
    <h4>Tream Project</h4>
    <div id="userInfo">
        <p style="font-size: 15px;color: #000;">欢迎您：{{name}} </p>
        <span id="logout" @click="quit">注销登录</span>
    </div>

    <el-table :data="tableData" border style="width:100%;margin:0 auto; text-algin:center;" max-height="600px">
        <el-table-column type="index" width="50" header-align="center"></el-table-column>
        <el-table-column prop="name" label="名称" width="200px" header-align="center"></el-table-column>
        <el-table-column prop="type" label="类型" width="200px" header-align="center"></el-table-column>
        <el-table-column prop="number" label="数量" width="200px" header-align="center"></el-table-column>
        <el-table-column prop="description" label="描述" width="400px" header-align="center"></el-table-column>
    </el-table>
</div>
</template>
<style scoped>
 #deContent{
     width: 1050px;
     height: 800px;
     margin:0 auto;
 }
 #userInfo{
     position: relative;
     left: 400px;
     top: 0px;
 }
 span {
     margin-left: 20px;
     cursor:pointer;
     font-size: 15px;
     color:aquamarine;
 }
 span :hover{color:#41b883;}
</style>

<script>
  import {getCookie,delCookie} from '../../assets/js/cookie.js'
 export default {
    data(){
        return{
           tableData:[],
           name:""
        }
    },
     mounted(){
        this.getData();
    },
    methods: {
       quit(){
           delCookie();
           this.$router.push('/');
       },
       getData(){
          let self=this;
          var obj=getCookie();
          if(obj!=null){
            self.name=obj.name;
          }
          let data={'username':self.name};
          let tempData=[];
          let url="http://localhost:8088/api/v1.0/device/infoByUserName";  //后台请求
          self.$http.post(url,data).then(res=>{
               var deviceList=res.body;
              $.each(deviceList,function(i){
                  var obj={};
                  obj.id=deviceList[i][0];
                  obj.name=deviceList[i][1];
                  obj.type=deviceList[i][3];
                  obj.number=deviceList[i][4];
                  obj.description=deviceList[i][2];
                  tempData[i]=obj;
              })
              self.tableData=tempData;
          })
       }
    }
  }
</script>
