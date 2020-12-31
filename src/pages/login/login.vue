<template>
  <div class="wrap">
    <div class="main">
   <h3 class="center">登录</h3>
    <el-input placeholder="请输入用户名" v-model="user.username" clearable></el-input>
    <el-input placeholder="请输入密码" v-model="user.password" clearable show-password></el-input>
    <el-button class="center" type="primary" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex"

export default {

methods:{
  login(){
    this.changeUser(this.user)
  },
  ...mapActions({
      changeUser:"changeUser"
  })
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
.wrap {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #553544, #433a52, #303d60);
}
.main {
  width: 400px;
  background: #ffffff;
  padding: 20px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
}
.el-input {
  margin-top: 10px;
}
.center {
  text-align: center;
}
</style>