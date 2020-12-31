<template>
  <div>
    <el-button class="btn" type="primary" @click="add">添加</el-button>
    <v-list :info="info" :list="list" @del="del($event)" @edit="edit($event)"></v-list>
    <v-add :info="info" ref="addname" :list="list" @getlist="getlist1"></v-add>
  </div>
</template>

<script>
import vList from "./component/list.vue"
import vAdd from "./component/add.vue";
import { reqMenulist, reqMenudelete } from "../../utils/http";
import { successalert } from "../../utils/alert";
export default {
  mounted() {
    this.getlist();
  },
  //方法
  methods: {
    //添加
    add() {
      this.info.isshow = true;
      this.info.isadd = true;
    },
    //编辑列表
    edit(id) {
      this.info.isshow = true;
      this.info.isadd = false;
      this.$refs.addname.empty();
      this.$refs.addname.getOne(id);
    },
    //获取列表
    getlist1() {
      this.getlist();
    },
    getlist() {
      reqMenulist().then(res => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }else{
          this.list = []
        }
      });
    },
    //删除数据
    del(id) {
      reqMenudelete(id).then(res => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.getlist();
        }
      });
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
    vAdd,
    vList
  }
};
</script>

<style scoped>
.btn {
  margin: 0.7rem 0;
}
</style>