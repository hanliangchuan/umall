<template>
  <div>
    <el-table
      :data="specslist"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="规格编号"></el-table-column>
      <el-table-column prop="specsname" label="规格名称"></el-table-column>
      <el-table-column prop="attrs" label="规格属性">
        <template slot-scope="scope">
          <span class="span" v-for="item in scope.row.attrs" :key="item">{{item}}</span>
        </template>
      </el-table-column>

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
  props: ["specslist", "total", "info", "size"],
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
.span{
    display: inline-block;
    padding: 1px 3px;
    margin-right: 5px;
    border: 1px solid #D9ECFF;
    color: #409EFF;
    background: #ECF5FF;
    border-radius: 5px;
}
</style>