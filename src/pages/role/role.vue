<template>
  <div>
    <el-button class="btn" type="primary" @click="add">添加</el-button>
    <v-list :rolelist="rolelist" :info="info" @del="del" ref="list" @edit="edit"></v-list>
    <v-add :menuList="menuList" :info="info" ref="add" @edit="roleList" @rolelist="roleList"></v-add>
  </div>
</template>

<script>
import vList from "./component/list.vue";
import vAdd from "./component/add.vue";
import { reqMenulist, reqRolelist, reqRoledelete } from "../../utils/http";
import { successalert } from "../../utils/alert";
import router from "../../router";
export default {
  methods: {
    //点击添加按钮
    add() {
      this.info.isshow = true;
      this.info.isadd = true
    },
    // 删除列表项
    del(id) {
      reqRoledelete(id).then(res => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.roleList();
        }
      });
    },
    edit(id) {
      this.info.isshow = true;
      this.info.isadd=false;
      this.$refs.add.getOne(id);
    },
    //添加确定

    //获取角色列表
    roleList() {
      reqRolelist().then(res => {
        if (res.data.code == 200) {
          if(res.data.list){
            this.rolelist = res.data.list;
          }else{
            this.rolelist=[]
          }
        }
      });
    }
  },
  data() {
    return {
      info: {
        isshow: false,
        isadd:true
      },
      menuList: [],
      rolelist: []
    };
  },
  mounted() {
    reqMenulist().then(res => {
      if (res.data.code == 200) {
        this.menuList = res.data.list;
      }
    }),
      this.roleList();
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