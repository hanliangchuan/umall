<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list :list="list" @init="init" @edit="edit"></v-list>
    <v-add ref="add" :info="info" @init="init" :list="list"></v-add>
  </div>
</template>

<script>
import vList from "./component/list.vue";
import vAdd from "./component/add.vue";
import { reqCatelist } from "../../utils/http";
export default {

  //挂载完成
  mounted() {
    this.init();
  },
  //方法
  methods: {
    //初始列表
    init() {
      reqCatelist({istree:true}).then(res => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
    },
    //点击添加
      willAdd(){
      this.info.isshow=true
    },
    //点击编辑
    edit(id){
      this.info.isshow = true
      this.info.isadd = false
      this.$refs.add.getOne(id)
    }

  },
  data() {
    return {
      info: {
        isshow: false,
        isadd: true
      },
      list: []
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