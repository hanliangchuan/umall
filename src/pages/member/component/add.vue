<template>
  <div>
    <el-dialog title="会员编辑" :visible.sync="info.isshow" @closed="cancel">
      <el-form :model="user">
        <!-- 手机号 -->
        <el-form-item label="手机号" label-width="100px">
          <el-input v-model="user.phone" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 昵称 -->
        <el-form-item label="昵称" label-width="100px">
          <el-input v-model="user.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 状态 -->
        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <!-- 添加删除 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="update">修改</el-button>
      </div>
      {{user}}
    </el-dialog>
  </div>
</template>

<script>
import path from "path";
import { reqMemberinfo, reqMemberedit } from "../../../utils/http";
import { successalert,erroralert } from "../../../utils/alert";
export default {
  //接收参数
  props: ["info", "list"],
  methods: {
    //   弹框消失
    cancel() {
      this.info.isshow = false;
      this.empty();
    },
    //清空user
    empty() {
      //3.初始化user
      this.user = {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1
      };
    },
    //改变密码
    // changepass(){
    //   if(this.password){
    //     console.log("改变了 ")
    //     this.user.password = this.password
    //   }
    // },
    //获取一条数据
    getOne(uid) {
      reqMemberinfo({ uid: uid }).then(res => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.user.password = ""
        }
      });
    },
    //更新数据
    update() {
      if(this.user.password.length == 0){
        erroralert("密码不能为空")
        return
      }
      reqMemberedit(this.user).then(res => {
        if (res.data.code == 200) {
          this.cancel();
          successalert(res.data.msg);
          this.$emit("init");
        }
      });
    }
  },
  data() {
    return {
      password:"",
      user: {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1
      },

    };
  }
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>