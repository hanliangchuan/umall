<template>
  <div>
    <el-dialog :title="info.isadd?'用户添加':'用户编辑'" :visible.sync="info.isshow" @close="closed">
      <el-form :model="list">
        <!-- 所属角色 -->
        <el-form-item label="所属角色" label-width="100px">
          <el-select v-model="list.roleid" placeholder="请选择">
            <el-option
              v-for="item in rolelist"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 用户名 -->
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="list.username" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="list.password" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 状态 -->
        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="list.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isshow = false">取 消</el-button>
        <el-button type="primary" @click="add()" v-if="info.isadd">添加</el-button>
        <el-button type="primary" @click="edit()" v-else>编辑</el-button>
      </div>
      {{list}}
    </el-dialog>
  </div>
</template>

<script>
import { resUseradd ,resUserinfo,resUseredit} from "../../../utils/http";
import { successalert } from "../../../utils/alert";
export default {
  props: ["rolelist", "info"],
//   方法
  methods: {
    //清空数据
    empty() {
      this.list = {
        roleid: "",
        username: "",
        password: "",
        status: 1
      };
    },
    //动画取消时回调
    closed(){
        if(!this.info.isadd){
            this.empty()
        }
    },  
    //编辑确定
    edit(){
        resUseredit(this.list).then(res=>{
            if(res.data.code == 200) {
                successalert(res.data.msg)
                this.empty()
            }
        })
    },
    // 获取一条管理员信息
    getOne(id){
        resUserinfo(id).then(res=>{
            this.list = res.data.list
            this.list.password=""
            this.list.id = id
        })
    },
    //用户添加
    add() {
      resUseradd(this.list).then(res => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.info.isshow = false;
          this.empty()
          this.$emit("getuserlist")
        }
      });
    }
  },
  data() {
    return {
      isshow: false,
      list: {
        roleid: "",
        username: "",
        password: "",
        status: 1
      }
    };
  }
};
</script>

<style>
</style>