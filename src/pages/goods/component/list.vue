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
      <el-table-column prop="id" label="商品编号" width="100px"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称"></el-table-column>
      <el-table-column prop="price" label="商品价格"></el-table-column>
      <el-table-column prop="market_price" label="市场价格"></el-table-column>

      <el-table-column label="图片" width="100px">
        <template slot-scope="scope">
          <img v-if="scope.row.img !=='null'" :src="$pre+scope.row.img" alt />
        </template>
      </el-table-column>
      <el-table-column label="是否新品" width="100px">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.isnew == 1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖" width="100px">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.ishot == 1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
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
import { reqGoodsdelete } from "../../../utils/http";
import { successalert } from "../../../utils/alert";
export default {
  props: ["list", "total", "size"],
  methods: {
    del(id) {
      reqGoodsdelete({ id: id }).then(res => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.$emit("init");
        }
      });
    },
    edit(id) {
      this.$emit("edit", id);
    },
    //页数发生了变化
    current(page) {
      this.$emit("current", page);
    }
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