import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import { state } from '../store/mutations'
function checkEnter(path, next) {
  if (state.userInfo.menus_url.includes(path)) {
    next()
  } else {
    next("/")
  }
}
export let indexRoutes = [
  {
    path: "menu",
    name: "菜单管理",
    component: () => import("../pages/menu/menu"),
    beforeEnter(to, from, next) {
      checkEnter("/menu", next)
    }
  },
  {
    path: "role",
    name: "角色管理",
    component: () => import("../pages/role/role"),
    beforeEnter(to, from, next) {
      checkEnter("/role", next)
    }
  },
  {
    path: "manage",
    name: "管理员管理",
    component: () => import("../pages/manage/manage"),
    beforeEnter(to, from, next) {
      checkEnter("/manage", next)
    }
  },
  {
    path: "cate",
    name: "商品分类",
    component: () => import("../pages/cate/cate"),
    beforeEnter(to, from, next) {
      checkEnter("/cate", next)
    }
  },
  {
    path: "specs",
    name: "商品规格",
    component: () => import("../pages/specs/specs"),
    beforeEnter(to, from, next) {
      checkEnter("/specs", next)
    }
  },
  {
    path: "goods",
    name: "商品管理",
    component: () => import("../pages/goods/goods"),
    beforeEnter(to, from, next) {
      checkEnter("/goods", next)
    }
  },
  {
    path: "member",
    name: "会员管理",
    component: () => import("../pages/member/member"),
    beforeEnter(to, from, next) {
      checkEnter("/member", next)
    }
  },
  {
    path: "banner",
    name: "轮播图管理",
    component: () => import("../pages/banner/banner"),
    beforeEnter(to, from, next) {
      checkEnter("/banner", next)
    }
  },
  {
    path: "seckill",
    name: "秒杀活动",
    component: () => import("../pages/seckill/seckill"),
    beforeEnter(to, from, next) {
      checkEnter("/seckill", next)
    }
  },
]


Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: "/",
      component: () => import("../pages/index/index"),
      children: [
        {
          path: "/home",
          name: "首页",
          component: () => import("../pages/home/home")
        },
        {
          path: "/",
          component: () => import("../pages/home/home")
        },
        ...indexRoutes
      ]
    },
    {
      path: "/login",
      component: () => import("../pages/login/login")
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.path == "/login") {
    next()
    return
  }
  if (store.state.userInfo.id) {
    next()
    return
  }
  next("/login")
})
export default router
