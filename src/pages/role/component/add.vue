<template>
  <div>
    <el-dialog :title="info.isadd?'角色添加':'角色编辑'" @closed="closed" :visible.sync="info.isshow">
      <el-form :model="list">
        <!-- 角色名称 -->
        <el-form-item label="角色名称" label-width="100px">
          <el-input v-model="list.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <!-- //角色权限 -->
        <el-form-item label="角色权限" label-width="100px">
          <el-tree
            :data="menuList"
            :props="defaultProps"
            show-checkbox
            node-key="id"
            v-model="list.menus"
            @check-change="change"
            ref="tree"
          ></el-tree>
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
      {{list}}----{{idkey}}
    </el-dialog>
  </div>
</template>

<script>
import { reqRoleinfo, reqRoleedit, reqRoleadd } from "../../../utils/http";
import { successalert } from "../../../utils/alert";
export default {
  props: ["menuList", "info"],
  methods: {
    // 清空样式
    empty() {
      this.list = {
        //角色名称
        rolename: "",
        //角色权限id数组 字符串数组
        menus: "",
        // 状态1正常，2禁用
        status: 1
      };
      this.$refs.tree.setCheckedKeys([]);
    },
    // 动画结束时回调
    closed() {
      if (!this.info.isadd) {
        this.empty();
      }
    },
    //获取单条数据
    getOne(id) {
      reqRoleinfo(id).then(res => {
        if (res.data.code == 200) {
          this.list = res.data.list;
          this.list.id = id;
          this.$refs.tree.setCheckedKeys(JSON.parse(this.list.menus));
          // this.idkey = JSON.parse(this.list.menus);
        }
      });
    },
    //获取id值
    change() {
      console.log(this.$refs.tree.getCheckedKeys());
      this.idkey = this.$refs.tree.getCheckedKeys();
      this.list.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
    },
    //添加
    add() {
      reqRoleadd(this.list).then(res => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.info.isshow = false;
          this.$emit("rolelist");
          this.empty();
        }
      });
    },

    //编辑
    edit() {
      reqRoleedit(this.list).then(res => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.info.isshow = false;
          this.$emit("rolelist");
        }
      });
    }
  },
  data() {
    return {
      list: {
        //角色名称
        rolename: "",
        //角色权限id数组 字符串数组
        menus: "",
        // 状态1正常，2禁用
        status: 1
      },
      idkey: [],
      defaultProps: {
        children: "children",
        label: "title"
      }
    };
  }
};
</script>

<style>
</style>