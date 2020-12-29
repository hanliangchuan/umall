<template>
  <div>
    <el-button class="btn" type="primary" @click="add">添加</el-button>
    <v-list :userlist="userlist" :info="info" :total="total" :size="size" @edit="edit" @del="del" @current="current"></v-list>
    <v-add :rolelist="rolelist" ref="add" :info="info" @getuserlist="getuserlist"></v-add>
  </div>
</template>

<script>
import {
  reqRolelist,
  resUserlist,
  resUsercount,
  resUserdelete
} from "../../utils/http";
import vList from "./component/list.vue";
import vAdd from "./component/add.vue";
import { successalert } from "../../utils/alert";
export default {
  // 挂载
  mounted() {
    //获取角色列表
    reqRolelist().then(res => {
      if (res.data.code == 200) {
        this.rolelist = res.data.list;
      }
    }),
      //获取用户列表
      this.getuserlist();
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
    del(uid) {
      resUserdelete(uid).then(res => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.getuserlist();
        }
      });
    },
    //获取用户列表
    getuserlist() {
      resUserlist({ size: this.size, page: this.page }).then(res => {
        if(res.data.list.length == 0 && this.page>1){
          this.page -- 
          this.getuserlist()
          return
        }
        if (res.data.code == 200) {
          if (res.data.list) {
            this.userlist = res.data.list;
          }
        }
      });

      //获取总条数
      resUsercount().then(res => {
        if (res.data.code == 200) {
          this.total = res.data.list[0].total;
        }
      });
    },

    current(page) {
      this.page = page;
      this.getuserlist();
    }
  },
  data() {
    return {
      info: {
        isshow: false,
        isadd: true
      },
      rolelist: [],
      userlist: [],
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