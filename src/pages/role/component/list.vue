<template>
  <div>
    <!-- 列表 -->
    <el-table
      :data="rolelist"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="角色编号"></el-table-column>
      <el-table-column prop="rolename" label="角色名称"></el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1">启用</el-button>
          <el-button type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
           <del-btn @confirm="del(scope.row.id)"></del-btn>
          <!-- <el-button type="danger" @click="del(scope.row.id)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ["rolelist", "info"],
  methods: {
    //   删除
    del(id) {
      this.$emit("del", id);
    },
    // 编辑
    edit(id) {
      this.$emit("edit", id);
    }
  },

  data() {
    return {};
  }
};
</script>

<style>
</style>