<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
      class="table"
    >
      <el-table-column prop="title" label="活动名称" width="180px"></el-table-column>

      <el-table-column label="状态" width="180px">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1">启用</el-button>
          <el-button type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { reqSeckdelete } from "../../../utils/http";
import { successalert } from "../../../utils/alert";
export default {
  props: ["list"],
  methods: {
    del(id) {
      reqSeckdelete({ id: id }).then(res => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.$emit("init");
        }
      });
    },
    edit(id) {
      this.$emit("edit", id);
    },
  }
};
</script>

<style scoped lang="stylus">
img {
  width: 80px;
  height: 80px;
}
.btn {
  margin-bottom: 10px;
}
</style>