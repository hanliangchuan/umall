<template>
  <div class="wrap">
    <div class="main">
      <h1>登录</h1>
    <el-input placeholder="请输入用户名" v-model="user.username" clearable></el-input>
    <el-input placeholder="请输入密码" v-model="user.password" clearable show-password></el-input>
    <el-button type="primary" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
import {resUserlogin} from "../../utils/http"

import {successalert} from "../../utils/alert"
export default {
  methods:{
    login(){
      resUserlogin(this.user).then(res=>{
        if(res.data.code == 200) {
          successalert(res.data.msg)
          let user = JSON.stringify(res.data.list)
          localStorage.setItem("user",user)
          this.$router.push("/")
        }
      })
    }
  },
  data(){
    return{
      user:{
        username:"",
        password:""
      }
    }
  }

};
</script>

<style scoped>
.main{
  width: 600px;
  height: 400px;
  margin: auto;
  margin-top: 200px;
  background: #fff;
}
.el-input{
  margin:5px;
}

</style>