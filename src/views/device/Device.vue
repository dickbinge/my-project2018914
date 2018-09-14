<template>
<div>
   <span style="float:left;margin-bottom:10px;">
     <el-input placeholder="请输入内容" v-model="selectLabel" class="input-with-select" clearable>
      <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option label="设备名称" value="1"></el-option>
        <el-option label="设备ID" value="2"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>
  </span>
  <h3 style="display: inline;color: #99a9bf;">Device List</h3>
  <el-table :data="tableData" border style="width:100%;margin:0 auto; text-algin:center;height:400px;">
        <el-table-column type="index" width="50" header-align="center"></el-table-column>
        <el-table-column prop="name" label="名称" width="200px" header-align="center"></el-table-column>
        <el-table-column prop="type" label="类型" width="200px" header-align="center"></el-table-column>
        <el-table-column prop="number" label="数量" width="200px" header-align="center"></el-table-column>
        <el-table-column prop="description" label="描述" width="300px" header-align="center"></el-table-column>
        <el-table-column label="分配"  header-align='center'>
            <template slot-scope="scope">
                <el-button type="text" size="small" @click.native.prevent="allot(scope.$index,tableData)">分配</el-button>
                <el-button type="text" size="small" @click.native.prevent="viewUser(scope.$index,tableData)">查看</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog title="用户信息" :visible.sync="dialogTableVisible">
        <el-table :data="gridData" style="overflow: auto;" border max-height="400px"  @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="50" header-align="center" @select.native.prevent="changeFun(scope.$index,gridData)"></el-table-column>
            <el-table-column type="index" width="50" header-align="center"></el-table-column>
            <el-table-column prop="name" label="姓名" width="150" header-align="center"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="200" header-align="center"></el-table-column>
            <el-table-column prop="phone" label="电话" header-align="center"></el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confrim" size="small">确 定</el-button>
        </div>
    </el-dialog>
    <h4 style="color: #99a9bf;font-size:15px;display: block;" v-if="showUser">已分配的用户</h4>
    <div v-if="showUser">
        <el-table :data="userData" border style="width:100%;margin:0 auto; text-algin:center;overflow: auto;" max-height="200px">
            <el-table-column type="index" width="50" header-align="center"></el-table-column>
            <el-table-column prop="name" label="名称" width="300px" header-align="center"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="300px" header-align="center"></el-table-column>
            <el-table-column prop="phone" label="电话" width="300px" header-align="center"></el-table-column>
          </el-table>
      </div>
</div>
</template>
<script>
  import Conf from '../../config';
  export default {
    data(){
        return{
           select:'',
           selectLabel:'',
           tableData:[],
           dialogTableVisible:false,
           gridData:[], //当前页面设备数据
           editObj:{},  //存放父页面上选中行的设备ID
           checkData:[],
           showUser:false,
           userData:[]  //当前页面用户列表数据
        }
    },
    mounted(){
        this.getData();
    },
    methods: {
        getData(){
          let self=this;
          let tempData=[];
          let url = Conf.APIUrl + "/device/info";
          self.$http.get(url).then(res=>{
            let deviceList=res.body.data;
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
        },
        search(){
          let self=this;
          if(self.selectLabel.length!=0){
              let data=this.selectLabel+';'+this.select;
              var tempData=[];
              var url = Conf.APIUrl + "/device/infoInput";
              self.$http.post(url,data).then(res=>{
                let deviceList=res.body.data;
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
           }else{
              self.getData();
           }

       },
       allot(index,rows){
         let self=this;
         let curId=rows[index].id;
         let data={'id':curId};
         let tempData=[];
         let url = Conf.APIUrl + "/user/allotUser";
         self.dialogTableVisible=true;
         self.editObj=rows[index];
         self.$http.post(url,data).then(res=>{
           let userList=res.data;
           $.each(userList,function(i){
                var obj={};
                obj.id=userList[i][0];
                obj.name=userList[i][1];
                obj.email=userList[i][2];
                obj.phone=userList[i][3];
                tempData[i]=obj;
           })
            self.gridData=tempData;
         })
       },
       viewUser(index,rows){
         let self=this;
         let deviceID=rows[index].id;
         let tempData=[];
         let data={'id':deviceID};
         let url = Conf.APIUrl + "/user/getUserByDeviceId";
         self.showUser=true;
         self.$http.post( url,data).then(res=>{
           let userList=res.data.result;
           $.each(userList,function(i){
              let obj={};
              obj.id=userList[i][0];
              obj.name=userList[i][1];
              obj.email=userList[i][2];
              obj.phone=userList[i][3];
              tempData[i]=obj;
           })
            self.userData=tempData;
         })
       },
       confrim(){
         let arrID=[];  //存放当前勾选用户的ID
         let deviceID=this.editObj.id; //获取需要分配的设备ID
         let strID='';
         let userID=this.checkData;
         let self=this;
         $.each(this.checkData,function(i){
             arrID.push(this.id);
             strID=strID+this.id+'&';
         })
         if(arrID.length==0){  //没有勾选数据
             self.$notify({
                  title: '提示',
                  message: '请勾选一条数据',
                  type: 'info',
                  position: 'bottom-right',
                  showClose: false,
                  duration:1000
             });
             return false;
           }
            let data=deviceID+':'+strID;
            let url = Conf.APIUrl + "/user/allot";
            self.$http.post(url,data).then(res=>{
            let result=res.bodyText;
            if(result!=0){
                self.$notify({
                title: '提示',
                message: '成功分配！'+result+'个用户!',
                type: 'success',
                position: 'bottom-right',
                showClose: false,
                duration:1000
              });
            }
          }).then(res=>{
             self.dialogTableVisible=false;
             self.getData();
          })
       },
        handleSelectionChange(val) {
        this.checkData = val;
      },
    }
  }
</script>
<style>
  .dialog-footer{
    text-align: center;
  }
</style>
