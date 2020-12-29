<template>
  <div>
    <el-button class="btn" type="primary" @click="add">添加</el-button>
    <v-list
      :specslist="specslist"
      :info="info"
      :total="total"
      :size="size"
      @edit="edit"
      @del="del"
      @current="current"
    ></v-list>
    <v-add ref="add" :info="info" @getspecslist="getspecslist"></v-add>
  </div>
</template>

<script>
import { reqSpecslist, reqSpecscount, reqSpecsdelete } from "../../utils/http";
import vList from "./component/list.vue";
import vAdd from "./component/add.vue";
import { successalert } from "../../utils/alert";
export default {
  // 挂载
  mounted() {
    //获取规格列表
    this.getspecslist();
  },
  // 方法

  methods: {
    //点击添加
    add() {
      this.info.isshow = true;
      this.info.isadd = true;
    },
    // 编辑
    edit(id) {
      this.$refs.add.getOne(id);
    },
    //删除
    del(id) {
      reqSpecsdelete({ id: id }).then(res => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.getspecslist();
        }
      });
    },
    //获取用户列表
    getspecslist() {
      reqSpecslist({ size: this.size, page: this.page }).then(res => {
        if (res.data.list.length == 0 && this.page > 1) {
          this.page--;
          this.getspecslist();
          return;
        }
        if (res.data.code == 200) {
          res.data.list.forEach(item=>{
            if(!item.attrs){
              return
            }
            item.attrs = JSON.parse(item.attrs.join(","))
          })
          this.specslist = res.data.list;
        }
      });

      //获取总条数
      reqSpecscount().then(res => {
        if (res.data.code == 200) {
          this.total = res.data.list[0].total;
        }
      });
    },

    current(page) {
      this.page = page;
      this.getspecslist();
    }
  },
  data() {
    return {
      info: {
        isshow: false,
        isadd: true
      },
      specslist: [],
      // 查询条数
      size: 2,
      // 查询页数
      page: 1,
      //总条数
      total: 0
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
  margin-bottom: 10px;
}
</style>