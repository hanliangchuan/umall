<template>
  <div>
    <el-table
      :data="userlist"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="用户编号"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="rolename" label="所属角色"></el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1">启用</el-button>
          <el-button type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          <del-btn @confirm="del(scope.row.uid)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        :page-size="size"
        :pager-count="5"
        layout="prev, pager, next"
        :total="total"
        @current-change="current"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  props: ["userlist", "total", "info", "size"],
  //挂载完成
  mounted() {},
  //方法
  methods: {
    //   编辑
    edit(id) {
      this.info.isshow = true;
      this.info.isadd = false;
      this.$emit("edit", id);
    },

    //删除
    del(uid) {
      this.$emit("del", uid);
    },
    //页数发生了变化
    current(page) {
      this.$emit("current", page);
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.block {
  float: right;
  margin-right: 100px;
}
</style>