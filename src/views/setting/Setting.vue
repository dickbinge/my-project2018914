<template>
  <div class="content">
    <header>
      <div class="desc">修改密码</div>
    </header>
    <section>
      <div class="registDiv">
        <div class="regist_box">
          <label class="label_input" for="userName" id="userName">账号</label>
          <el-input type="text" name="userName"  class="text_field" placeholder="请输入用户名"  v-model="userName" clearable/>
          <span v-bind:class="{ errorInfo: isError,sucInfo:isSuc}" v-if="isUser">{{user_info}}</span>
        </div>
        <div class="regist_box">
          <span><label class="label_input">密码</label></span>
          <el-input type="password" name="passWord"  class="text_field " v-model="passWord" clearable/>
          <span v-bind:class="{ errorInfo: isError,sucInfo:isSuc}" v-if="isPass">{{pass_info}}</span>
        </div>
        <div class="regist_box" v-if="showRegist">
          <span><label class="label_input">确认密码</label></span>
          <el-input type="password" name="prepassWord" class="text_field " v-model="prepassWord" clearable/>
          <span v-bind:class="{ errorInfo: isError,sucInfo:isSuc}" v-if="isPrePass">{{prePass_info}}</span>
        </div>
        <div class="regist_box" v-if="showOhterInfo">
          <span><label class="label_input">邮箱</label></span>
          <el-input type="text" name="email" class="text_field " v-model="email" clearable/>
        </div>
        <div class="regist_box"  v-if="showOhterInfo">
          <span><label class="label_input">电话</label></span>
          <el-input type="text" name="phone" class="text_field " v-model="phone" clearable/>
        </div>
        <div class="regist_box"  v-if="showOhterInfo">
          <span><label class="label_input">类型</label></span>
          <el-input type="text" name="type" class="text_field " v-model="type" clearable/>
        </div>
        <div id="login_control">
          <el-button type="primary"  class="btn" @click="confrim" size="mini">确定</el-button>
          <el-button type="primary"  class="btn" @click="reset" size="mini">取消</el-button>
        </div>
      </div>
    </section>

  </div>
</template>
<script>
  import Conf from '../../config';
  import {getCookie,delCookie} from '../../assets/js/cookie.js'
  export default{
    data() {
      return{
        userName:"",
        passWord:"",
        prepassWord:"",
        isError:false,
        isSuc:false,

        isUser:false,
        isPass:false,
        isPrePass:false,
        user_info:"",
        pass_info:"",
        prePass_info:"",

        email:"",
        phone:"",
        type:"",
        showRegist:true,
        showOhterInfo:true
      }
    },
    methods:{
      checkUserInfo(){
        let self=this;
        var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
        let retMsg="";
        if(self.userName.length==0){
          retMsg="请输入用户名";
        }
        else if(pattern.test(self.userName)){
          retMsg="当前用户名中含有非法字符，请检查！";
        }
        else if(self.passWord.length==0){
          retMsg="请输入密码！";
        }
        else if(self.prepassWord.length==0){
          retMsg="请确认密码！";
        }
        else if(self.passWord!=self.prepassWord){
          retMsg="密码不一致请修改!";
        }
        return retMsg;
      },
      checkName(){
        let self=this;
        let retMsg="";
        let data={'id':'','username':self.userName,'password':self.passWord,'phone':self.phone,'email':self.email,'type':self.type};
        let url=Conf.APIUrl + "/user/check_account";
        self.$http.post(url,data).then(res=> {
          var result = res.body.result;
          if (result == "0") {
            retMsg="当前用户名不存在,请确认是否要新增该用户!";
          }
        });
        return retMsg;
      },
      confrim(){
        let self=this;
        let msg=self.checkUserInfo();
        if(msg.length>0){
          self.message(msg,"warning",false);
          return false;
        }
        let data={'id':'','username':self.userName,'password':self.passWord,'phone':self.phone,'email':self.email,'type':self.type};
        let url=Conf.APIUrl + "/user/check_account";
        self.$http.post(url,data).then(res=> {
          var result = res.body.userID;
          if (result.length == 0) {    //当前用户名不存在
            self.message("当前用户名不存在！","warning",false);
            return false;
          }else{
            let id=result[0];
            let dataModify={'id':id,'username':self.userName,'password':self.passWord,'phone':self.phone,'email':self.email,'type':self.type};
            let urlModify=Conf.APIUrl + "/user/info";
            self.$http.put(urlModify,dataModify).then(res=> {
              if (res.body.result) {
                self.message("用户信息修改成功！", "success", false);
                self.$router.push('/');
                delCookie();
              }else{
                self.message("用户信息修改失败！", "warning", false);
                return false;
              }

            })
          }
        })
      },
      insertUser(data) {
        let self = this;
        let url = Conf.APIUrl + "/user/info";
        self.$http.post(url, data).then(res => {
          if (res.body.id != null) {
            self.notify("提示", "用户信息添加成功！", "success");
          }
        })
      },
      reset(){

      },
      message(title,type,showClose){
        let self=this;
        self.$message({
          showClose: showClose,
          message: title,
          type:type
        });
      },
    }
  }
</script>
<style scoped>
.errorInfo{
  color:red;
  font-size: 13px;
}
.sucInfo{
  color: green;
  font-size: 13px;
}
.desc{
  font: bold 24px arial,sans-serif;
}
.content{
  width: 500px;
  height: 400px;
}
.btn{
  width: 60px;
}
.registDiv{
  width: 400px;
  margin: auto;
  margin-top: 40px;
}
.regist_box {
  border: 1px solid #ddd;
  margin-bottom: 20px;
}
.label_input {
  width: 100px;
  height: 20px;
  line-height: 20px;
  padding-left: 20px;
  display: inline-block;
  font:  16px arial,sans-serif;
}
label {
  cursor: default;
}
label #userName{
  word-spacing: 10px;
}

</style>
