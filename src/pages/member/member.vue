<template>
  <div>
    <v-list :list="list" @init="init" @edit="edit"></v-list>
    <v-add ref="add" :info="info" @init="init" :list="list"></v-add>
  </div>
</template>

<script>
import vList from "./component/list.vue";
import vAdd from "./component/add.vue";
import { reqMemberlist } from "../../utils/http";

export default {
  //挂载完成
  mounted() {
    this.init();
  },
  //方法
  methods: {
    //初始列表
    init() {
      reqMemberlist().then(res => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
    },
    //点击编辑
    edit(id) {
      this.info.isshow = true;
      console.log(id)
      this.$refs.add.getOne(id);
    }
  },
  data() {
    return {
      info: {
        isshow: false,
      },
      list: []
    };
  },
  components: {
    vAdd,
    vList
  }
};
</script>

<style>
</style>