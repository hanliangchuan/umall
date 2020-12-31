<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list :list="list" @init="init" @edit="edit" :total="total" :size="size" @current="current"></v-list>
    <v-add ref="add" :info="info" @init="init($event)" :list="list"></v-add>
  </div>
</template>

<script>
import vList from "./component/list.vue";
import vAdd from "./component/add.vue";
import { reqGoodslist, reqGoodscount } from "../../utils/http";
export default {
  //挂载完成
  mounted() {
    this.init();
  },
  //方法
  methods: {
    //初始列表
    init() {
      reqGoodslist({ size: this.size, page: this.page }).then(res => {
        if (res.data.list.length == 0 && this.page > 1) {
          this.page--;
          this.init();
          return;
        }
        if (res.data.code == 200) {
          if (res.data.list) {
            this.list = res.data.list;
          }
        }
      });
      //获取总条数
      reqGoodscount().then(res => {
        if (res.data.code == 200) {
          this.total = res.data.list[0].total;
        }
      });
    },
    // 点击当前页获取
     current(page) {
      this.page = page;
      this.init();
    },
    //点击添加
    willAdd() {
      this.info.isshow = true;
      this.info.isadd = true
    },
    //点击编辑
    edit(id) {
      this.info.isshow = true;
      this.info.isadd = false;
      this.$refs.add.getOne(id);
    }
  },
  data() {
    return {
      info: {
        isshow: false,
        isadd: true
      },
      // 商品列表
      list: [],
      // 查询条数
      size: 2,
      // 查询页数
      page: 1,
      //总条数
      total: 0
    };
  },
  components: {
    vList,
    vAdd
  }
};
</script>

<style>
</style> 