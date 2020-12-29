<template>
  <div>
    <el-container class="con">
      <!-- 左边 -->
      <el-aside width="200px">
        <el-menu
          default-active="/"
          class="el-menu-vertical-demo"
          background-color="#20222A"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
          <!-- 首页 -->
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title" @click="get">首页</span>
          </el-menu-item>
          <!-- 系统设置 -->
          <div v-for="item in userInfo.menus" :key="item.id">
            <!-- 判断有没有children -->
            <el-menu-item v-if="!item.children" :index="item.url">{{item.title}}</el-menu-item>
            <!-- 有目录，有菜单 -->
            <el-submenu :index="item.id+''" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="i in item.children" :key="i.id" :index="i.url">{{i.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </div>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 上边 -->
        <el-header>Header</el-header>

        <!-- 主体 -->
        <el-main>
          <!-- 面包屑 -->
          <el-breadcrumb separator="/" v-if="$route.name">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>

          <!-- 二级路由出口 -->
          <router-view class="main"></router-view>
        </el-main>
        <!-- 主体 -->
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  //挂载完成
  data() {
    return {};
  },
  mounted() {
    this.getmenulist();
  },
  methods: {
    get() {
      console.log(this.userInfo);
    },
    ...mapActions({
      getmenulist: "getmenulist",
      changeUser: "changeUser"
    }),
    logout() {
      this.changeUser({}), this.$router.replace("login");
    }
  },
  computed: {
    ...mapGetters({
      menulist: "menulist",
      userInfo: "userInfo"
    })
  }
};
</script>

<style scoped>
.el-aside {
  background: #20222a;
}
.el-header {
  background: #b3c0d1;
}
.el-main {
  background: #fff;
}
.con {
  height: 100vh;
}
.main {
  margin-top: 20px;
}
</style>