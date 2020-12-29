<template>
  <div>
    <el-dialog :title="info.isadd?'菜单添加':'菜单编辑'" @close="closed" :visible.sync="info.isshow">
      <el-form :model="user">
        <!-- 菜单名称 -->
        <el-form-item label="菜单名称" label-width="100px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 上级菜单 -->
        <el-form-item label="上级菜单" label-width="100px">
          <el-select v-model="user.pid" placeholder="请选择" @change="changetype">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- 菜单类型 -->
        <el-form-item label="菜单类型" label-width="100px">
          <el-radio :label="1" v-model="user.type" disabled>目录</el-radio>
          <el-radio :label="2" v-model="user.type" disabled>菜单</el-radio>
        </el-form-item>
        <!-- 菜单图标 -->
        <el-form-item label="菜单图标" label-width="100px" v-if="user.type == 1">
          <el-select v-model="user.icon" placeholder="请选择">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 菜单地址 -->
        <el-form-item label="菜单地址" label-width="100px" v-else>
          <el-select v-model="user.url" placeholder="请选择">
            <el-option
              v-for="item in indexRoutes"
              :key="item.path"
              :label="item.name+'--'+item.path"
              :value="'/'+item.path"
            >{{item.name}}--{{item.path}}</el-option>
          </el-select>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isadd">添加</el-button>
        <el-button type="primary" @click="edit(user)" v-else>修改</el-button>
      </div>
      {{user}}
    </el-dialog>
  </div>
</template>

<script>
import { indexRoutes } from "../../../router/index";
import { reqMenuadd, reqMenuinfo, reqMenuedit } from "../../../utils/http";
import { successalert } from "../../../utils/alert";
export default {
  // 接收参数
  props: ["info", "list"],
  // 方法
  methods: {
    //关闭弹窗的回调
    closed() {
      if (!this.info.isadd) {
        this.empty();
      }
    },
    //隐藏
    cancel() {
      this.info.isshow = false;
      if (!this.info.isadd) {
        this.empty();
      }
    },
    // 清空样式
    empty() {
      this.user = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1
      };
    },
    // 通过判断是否为顶级菜单来改变type的值
    changetype() {
      if (this.user.pid == 0) {
        this.user.type = 1;
      } else {
        this.user.type = 2;
      }
    },
    getOne(id) {
      reqMenuinfo({ id }).then(res => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.user.id = id;
        }
      });
    },
    //  菜单编辑//编辑
    edit(user) {
      reqMenuedit(user).then(res => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.$emit("getlist");
          this.info.isshow = false;
          this.empty();
        }
      });
    },
    //菜单添加
    add() {
      reqMenuadd(this.user).then(res => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
        }
        //隐藏
        this.cancel();
        //清空
        this.empty();
        //获取列表想·
        this.$emit("getlist");
      });
    }
  },

  data() {
    return {
      user: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1
      },
      icons: [
        "el-icon-setting",
        "el-icon-user-solid",
        "el-icon-camera-solid",
        "el-icon-s-platform",
        "el-icon-s-order"
      ],
      indexRoutes
    };
  }
};
</script>

<style>
</style>