<template>
<div>
  <div id="head">
    <span style="float:left;margin-bottom:10px;">
       <el-input placeholder="请输入内容" v-model="selectLabel" class="input-with-select" clearable>
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="用户名称" value="1"></el-option>
          <el-option label="用户ID" value="2"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="search" type="primary">搜索</el-button>
      </el-input>
    </span>
    <h3 style="display: inline;color: #99a9bf;">Account List</h3>
    <span style="float:right;">
        <el-button type="primary" size="small" @click="addUser">增加用户</el-button>
        <el-button type="danger" size="small"  @click="muliteRemove">批量删除</el-button>
    </span>
    <el-dialog v-bind:title="etitle" :visible.sync="dialogFormVisible" style="width:1000px; margin:0 auto;text-algin:center">
  <el-form :model="form">
    <el-form-item label="用户名" :label-width="formLabelWidth">
       <el-input type="text" v-model="form.name"  size="small"></el-input>
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth">
       <el-input type="password" v-model="form.password"  size="small"></el-input>
    </el-form-item>
     <el-form-item label="电话" :label-width="formLabelWidth">
       <el-input type="text" v-model="form.phone"  size="small"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" :label-width="formLabelWidth">
       <el-input type="text" v-model="form.email"  size="small"></el-input>
    </el-form-item>
    <el-form-item label="类型" :label-width="formLabelWidth">
       <el-input type="text" v-model="form.type"  size="small"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="reset" size="small">取 消</el-button>
    <el-button type="primary" @click="confrim" size="small">确 定</el-button>
  </div>
</el-dialog>
  </div>
    <el-table :data="tableData" type="index" border style="width:100%;margin:0 auto; text-algin:center;overflow: auto;"
    @row-click='handleRowHandle' max-height="400px" @selection-change="handleSelectionChange"
              :row-class-name="tableRowClassName">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="username" label="姓名" width="200"   header-align='center' ></el-table-column>
        <el-table-column prop="phone" label="电话" width="250"  header-align='center'></el-table-column>
        <el-table-column prop="email" label="邮箱" width="280"  header-align='center'></el-table-column>
        <el-table-column label="View"  header-align='center'>
            <template slot-scope="scope">
                <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
            </template>
        </el-table-column>
        <el-table-column label="Delete"  header-align='center'>
            <template slot-scope="scope">
                <el-button @click.native.prevent="deleteRow(scope.$index,tableData)" type="text" size="small">移除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination
  background
  layout="prev, pager, next"
  :total="1000">
</el-pagination>
    <div id="device" v-if="showDevice">
      <div>
        <el-table :data="deviceData" border style="width:100%;margin:0 auto; text-algin:center;overflow: auto;" max-height="200px">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="devicename" label="名称" width="360px" header-align="center"></el-table-column>
          <el-table-column prop="type" label="类型" width="350px" header-align="center"></el-table-column>
          <el-table-column prop="number" label="数量" width="350px" header-align="center"></el-table-column>
          <el-table-column prop="description" label="设备信息" width="500px" header-align="center"></el-table-column>
        </el-table>
      </div>
    </div>
</div>
</template>


<script>
import Device from '@/views/device/Device'
import Conf from '../../config';
 export default{
   data(){
     return{
       selectLabel:'',
       tableData:[],   //用户列表数据源
       showDevice:false,
       dialogFormVisible: false,
       form: {
         id:'',
         name: '',
         password: '',
         phone:'',
         email:'',
         type:''
       },
       select:'',
       formLabelWidth: '120px',
       deviceData:[],     //设备列表数据源
       editData:{},    //点击编辑存储当前数据
       etitle:'',
       checkData:[]
     }
   },
   mounted(){
      this.getData();
   },
   inject:['reload'], //注入reload方法
   methods:{
     /**
      * 初始用户列表加载
      */
     getData(){
        let self=this;
        let dataTemp=[];  //临时存放数据
        let url = Conf.APIUrl + "/user/info";
        self.$http.get(url).then(res=>{
          let userlist=res.body.data;
          $.each(userlist,function(i){
             let obj={};
             obj.id=userlist[i][0];
             obj.username=userlist[i][1];
             obj.password=userlist[i][2];
             obj.type=userlist[i][3];
             obj.phone=userlist[i][4];
             obj.email=userlist[i][5];
             dataTemp[i]=obj;
          })
          self.tableData=dataTemp;
        })
     },
     /**
      * 点击用户弹出对应分配的设备信息
      */
     tableRowClassName({row, rowIndex}) {
       if (rowIndex === 1) {
         return 'warning-row';
       } else if (rowIndex === 3) {
         return 'success-row';
       }
       return '';
     },
     handleRowHandle(row, event, column){
        let self=this;
        let dataTemp=[];  //临时存放数据
        let url=Conf.APIUrl + "/device/infoByUserId";
        let data={'id':row.id};   //获取当前选中行的id
        self.showDevice=true;
        self.$http.post(url,data).then(res=>{
           var deviceList=res.body;
           $.each(deviceList,function(i){
              var obj={};
              obj.devicename=deviceList[i][1];
              obj.description=deviceList[i][2];
              obj.type=deviceList[i][3];
              obj.number=deviceList[i][4];
              dataTemp[i]=obj;
           })
           self.deviceData=dataTemp;
        })
     },
     /**
      * 搜索用户
      */
     search(){
        let self=this;
        let dataTemp=[];  //临时存放数据
        if(this.selectLabel!=undefined&&this.selectLabel.length!=0){
            let data=this.selectLabel+';'+this.select;
            let url=Conf.APIUrl + "/user/infoInput";
            self.$http.post(url,data).then(res=>{
               var userlist=res.body.data;
               $.each(userlist,function(i){
                  var obj={};
                  obj.id=userlist[i][0];
                  obj.username=userlist[i][1];
                  obj.password=userlist[i][2];
                  obj.type=userlist[i][3];
                  obj.phone=userlist[i][4];
                  obj.email=userlist[i][5];
                  dataTemp[i]=obj;
              })
              self.tableData=dataTemp;
            })
         }else{
           self.getData();
         }
     },
     /**
      * 点击新增用户
      */
     addUser(){
        let self=this;
        self.getInit();
        self.etitle="新增用户";
        self.dialogFormVisible=true;

     },
     /**
      * 新增用户弹窗确认
      */
     confrim(){
        let self=this;
        if(self.form.name.length==0||self.form.password.length==0){
          self.notify("提示","请将信息补充完整！","warning");
          return false;
        }
        if(self.form.id.length==0){  //新增用户界面
            let data={'id':'','username':this.form.name,'password':this.form.password,'phone':this.form.phone,'email':this.form.email,'type':this.form.type};
            let url=Conf.APIUrl + "/user/check_account";
            self.$http.post(url,data).then(res=>{
              var result=res.body.userID;
              if(result.length>0){
                self.notify("提示","当前用户名已存在，请修改后重新注册！","warning");
                return false;
              }else{
                  self.insertUser();
                  self.getData();
              }
            })
        }
        else{  //用户id已存在，是编辑界面
            let data={'id':this.form.id,'username':this.form.name,'password':this.form.password,'phone':this.form.phone,'email':this.form.email,'type':this.form.type};
            let url=Conf.APIUrl + "/user/info";
            self.$http.put(url,data).then(res=>{
            if(res.body.result){
               self.notify("提示","用户信息修改成功！","success");
            }
          }).then(res=>{
             this.dialogFormVisible=false;
              self.getData();
          })

          }
     },
     reset(){
        this.dialogFormVisible=false;
     },
     /**
      * 新增用户逻辑
      */
     insertUser(){
       let self=this;
       let data={'id':'','username':this.form.name,'password':this.form.password,'phone':this.form.phone,'email':this.form.email,'type':this.form.type};
       let url=Conf.APIUrl + "/user/info";
       self.$http.post(url,data).then(res=>{
          if(res.body.id!=null){
             self.notify("提示","用户信息添加成功！","success");
          }
        }).then(res=>{
           self.dialogFormVisible=false;
           self.getData();
        })

     },
     /**
      * 单条删除用户信息
      */
      deleteRow(index, rows) {
        let self=this;
        let id=rows[index].id;
        let url=Conf.APIUrl + "/user/info?id="+id;
        self.$http.delete(url).then(res=>{
          let result=res.bodyText;
          if(result=='success'){
            self.notify("提示","用户信息删除成功！","success");
          }
        }).then(res=>{
           self.getData();
        })
    },
     handleSelectionChange(val) {
      this.checkData = val;
    },
    /**
     * 批量删除用户信息
     */
    muliteRemove(){
      let self=this;
      let arrID=[];
      let strID='';
      let url=Conf.APIUrl + "/user/batch?ids=";
      $.each(this.checkData,function(){
          arrID.push(this.id);
          strID=strID+this.id+';';
      })
      if(arrID.length==0){
        self.notify("提示","请勾选一条用户数据！","warning");
        return false;
      }
      url=url+strID;
      self.$http.delete(url).then(res=>{
         let result=res.bodyText;
         if(result!=0){
            let msg='成功删除！'+result+'条数据!';
            self.notify("提示",msg,"success");
         }
      }).then(res=>{
           self.getData();
      })
    },
    getInit(){
      let self=this;
      self.form.id='';
      self.form.name='';
      self.form.password='';
      self.form.phone='';
      self.form.email='';
      self.form.type='';
    },
    handleEdit(index,rows){
      let self=this;
      self.dialogFormVisible=true;
      self.editData=rows;
      self.etitle="编辑用户";
      self.getInit();
      self.form={
         id:rows.id,
         name:rows.username,
         password:rows.password,
         phone:rows.phone,
         email:rows.email,
         type:rows.type
      };
     },
     notify(title, msg, type) {
       let self = this;
       self.$notify({
         title: title,
         message: msg,
         type: type,
         position: 'bottom-right',
         showClose: false,
         duration: 2000
       });
     }
   }
 }
</script>
<style>
  .el-table .table-head-th{
    background-color:#f4f4f4;
    font-size: large;
  }
  #device{
    margin-top:30px;
  }
  .el-select .el-input {
    width: 100px;
  }
  .dialog-footer{
    text-align: center;
  }
  .el-form-item__content{
    margin-left: 90px!important;
  }
  .el-form-item__label{
    text-align: center;
    width: 90px!important;
  }
  .el-form{
    width: 420px;
    height: 300px;
  }
  .el-dialog__body{
    padding-top: 10px;
  }
  .el-table .warning-row {
    background: oldlace;
  }
  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
