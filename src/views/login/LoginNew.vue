<template>
  <div id="container">
    <div class="header"></div>
    <div class="content">
      <div class="login_frame">
        <span class="login_title">账户登录</span>
        <Form ref="formInline" :model="formInline"  inline>
          <FormItem prop="user">
            <Input type="text" v-model="formInline.user" placeholder="Username" size="large">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem><br>
          <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="Password" size="large">
            <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
          </FormItem><br>
          <FormItem>
            <Checkbox v-model="keepPassWord"><span>记住密码</span></Checkbox>
            <span class="forget_pass">忘记密码?</span>
          </FormItem>
          <br>
          <FormItem>
            <Button type="primary" @click="handleSubmit">登录</Button>
          </FormItem><br>
          <FormItem>
            <span class="registe">去注册</span>
          </FormItem>
        </Form>
      </div>
    </div>
    <div class="footer"></div>
  </div>

</template>
<script>
  export default {
    data () {
      return {
        formInline: {
          user: '',
          password: ''
        },
        keepPassWord: false,
        ruleInline: {
          user: [
            { required: true, message: 'Please fill in the user name', trigger: 'blur' }
          ],
          password: [
            { required: true, message: 'Please fill in the password.', trigger: 'blur' },
            { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
          }
        })
      }
    }
  }
</script>
<style>
  .login_title{
    font:italic bold 20px arial,sans-serif;
    display: block;

  }
  #container{
    width: 100%;
    height: 100%;
    position: absolute;
    background: #FFF url("../../assets/login_screen1_bg.jpg") no-repeat fixed top;
    overflow: hidden;
  }
  .login_frame{
    position: relative;
    width: 400px;
    height: 400px;
    background-color: wheat;
    top: 270px;
    left: 1200px;
  }
</style>
