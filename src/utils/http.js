import axios from "axios"
import qs from "qs"
import Vue from "vue"
import { erroralert } from "./alert"
import store from "../store"
import router from "../router"
// 生产环境
let baseUrl = "/api"
Vue.prototype.$pre = "http://localhost:3000"
// 打包环境
// let baseUrl = ""
// Vue.prototype.$pre = ""
//请求拦截
axios.interceptors.request.use(config=>{

    if(config.url!==baseUrl+"/api/login"){
        config.headers.authorization=store.state.userInfo.token
    }
    return config
})
//响应拦截
axios.interceptors.response.use(res => {
    if (res.data.list == null) {
        res.data.list = []
    }
    console.group("本次请求地址是：" + res.config.url)
    console.log(res);
    console.groupEnd()
    // 统一处理失败
    if (res.data.code !== 200) {
        erroralert(res.data.msg)
    }
    if(res.data.msg == "登录已过期或访问权限受限"){
        store.dispatch("changeUser",{})
        router.push("/login")
    }
    return res
})

function dataToFromData(user){
    let data = new FormData()
    for(let  i in user){
        data.append(i,user[i])
    }
    return data
}
// -------------------------菜单的增删改查--------------------------
//菜单添加

export const reqMenuadd = (user) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: "post",
        data: qs.stringify(user)
    })
}

//菜单列表

export const reqMenulist = () => {
    return axios({
        url: baseUrl + "/api/menulist",
        method: "GET",
        params: {
            istree: true
        }
    })
}
//菜单单条数据的获取
export const reqMenuinfo = (id) => {
    return axios({
        url: baseUrl + "/api/menuinfo",
        method: "get",
        params: id
    })
}

//菜单修改
export const reqMenuedit = (user) => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: user
    })
}


// 菜单删除

export const reqMenudelete = (id) => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: "post",
        data: {
            id
        }
    })
}





// -------------------------角色的增删改查--------------------------

//角色添加

export const reqRoleadd = (list) => {
    return axios({
        url: baseUrl + "/api/roleadd",
        method: "post",
        data: list
    })
}

//角色列表

export const reqRolelist = () => {
    return axios({
        url: baseUrl + "/api/rolelist",
    })
}

//角色删除
export const reqRoledelete = (id) => {
    return axios({
        url: baseUrl + "/api/roledelete",
        method: "post",
        data: {
            id
        }
    })
}
//获取一条角色

export const reqRoleinfo = (id) => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        method: "get",
        params: {
            id
        }
    })
}
//修改角色

export const reqRoleedit = (list) => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: "post",
        data: list
    })
}





// -------------------------管理员的增删改查--------------------------
//管理员添加

export const resUseradd = (list) => {
    return axios({
        url: baseUrl + "/api/useradd",
        method: "post",
        data: list
    })
}


//管理员列表
// size查询条数
// page页码数


export const resUserlist = (list) => {
    return axios({
        url: baseUrl + "/api/userlist",
        method: "get",
        params: list
    })
}
//管理员总数
export const resUsercount = () => {
    return axios({
        url: baseUrl + "/api/usercount",
    })
}
//获取一条管理员
export const resUserinfo = (uid) => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: "get",
        params: {
            uid
        }
    })
}
//管理员修改
export const resUseredit = (list) => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: "post",
        data: list
    })
}
//管理员删除
export const resUserdelete = (uid) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: {
            uid
        }
    })
}

// 管理员登录
export const resUserlogin = (user) => {
    return axios({
        url: baseUrl + "/api/userlogin",
        method: "post",
        data: qs.stringify(user)
    })
}


// -------------------------商品分类增删改查--------------------------
// pid 上级分类编号    
// catename 商品分类名称
// img图片(文件，一般用于二级分类)
// status状态            1正常2禁用


// 商品分类添加
export const reqCateadd = (obj) => {
    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data: dataToFromData(obj)
    })
}

// 商品分类列表
// istree 是否返回树形结构
// pid
export const reqCatelist = (obj) => {
    return axios({
        url: baseUrl + "/api/catelist",
        method: "get",
        params: obj
    })
}
// 商品分类获取一条
export const reqCateinfo = (id) => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        method: "get",
        params: id
    })
}

// 商品分类修改
// id、pid、catename、img、status
export const reqCateedit = (obj) => {
    return axios({
        url: baseUrl + "/api/cateedit",
        method: "post",
        data: dataToFromData(obj)
    })
}

// 商品分类删除
export const reqCatedelete = (id) => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data: id
    })
}



// -------------------------轮播图管理--------------------------
// title 轮播图名称
// img status

// 轮播图添加
export const reqBanneradd = (obj) => {
    return axios({
        url: baseUrl + "/api/banneradd",
        method: "post",
        data: dataToFromData(obj)
    })
}

// 轮播图列表
export const reqBannerlist = () => {
    return axios({
        url: baseUrl + "/api/bannerlist",
        method: "get"
    })
}

// 获取一条轮播图
export const reqBannerinfo = (id) => {
    return axios({
        url: baseUrl + "/api/bannerinfo",
        method: "get",
        params: id
    })
}
//轮播图修改
// 参数---id、title、img、status
export const reqBanneredit = (obj) => {
    return axios({
        url: baseUrl + "/api/banneredit",
        method: "post",
        data: dataToFromData(obj)
    })
}
//轮播图删除
export const reqBannerdelete = (id) => {
    return axios({
        url: baseUrl + "/api/bannerdelete",
        method: "post",
        data: qs.stringify(id)
    })
}
// ----------------------------会员管理--------------------------
// 会员列表

export const reqMemberlist = () => {
    return axios({
        url: baseUrl + "/api/memberlist",
        method: "get"
    })
}


// 获取会员一条数据

export const reqMemberinfo = (uid) => {
    return axios({
        url: baseUrl + "/api/memberinfo",
        method: "get",
        params:uid
    })
}

// 会员修改

// uid、nickbane、phone/passwrod/status
export const reqMemberedit = (obj) => {
    return axios({
        url: baseUrl + "/api/memberedit",
        method: "post",
        data:qs.stringify(obj)
    })
}


// ----------------------------商品规格管理--------------------------
// 商品规格添加
// specsname 商品规格名称 “颜色”
// attrs 商品规格属性 “【白色，红色】”
// status


// 商品规格添加
export const reqSpecsadd = (obj) => {
    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data:qs.stringify(obj)
    })
}

//商品规格总数
export const reqSpecscount = () => {
    return axios({
        url: baseUrl + "/api/specscount",
        method: "get"
    })
}
// 商品规格列表（分页）---size page
export const reqSpecslist = (obj) => {
    return axios({
        url: baseUrl + "/api/specslist",
        method: "get",
        params:obj
    })
}

// 商品规格获取一条
export const reqSpecsinfo = (id) => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params:id
    })
}
//商品规格修改 -- id/specsname/attrs/status
export const reqSpecsedit = (obj) => {
    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data:qs.stringify(obj)
    })
}
//商品规格删除
export const reqSpecsdelete = (id) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data:id
    })
}



// ----------------------------商品管理--------------------------

export const reqGoodsadd = (obj) => {
    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data: dataToFromData(obj)
    })
}

// 商品总数(用于分页)
export const reqGoodscount = () => {
    return axios({
        url: baseUrl + "/api/goodscount",
    })
}

// 商品列表
export const reqGoodslist = (obj) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        method: "get",
        params:obj
    })
}

// 商品获取一条
export const reqGoodsinfo = (id) => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params: id
    })
}

// 商品修改
// 一坨参数
export const reqGoodsedit= (obj) => {
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: dataToFromData(obj)
    })
}

// 商品删除
export const reqGoodsdelete = (id) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: id
    })
}


// ----------------------------秒杀--------------------------

// 秒杀添加
export const reqSeckadd = (obj) => {
    return axios({
        url: baseUrl + "/api/seckadd",
        method: "post",
        data: qs.stringify(obj)
    })
}


// 秒杀列表
export const reqSecklist = () => {
    return axios({
        url: baseUrl + "/api/secklist",
        method: "get"
    })
}

// 秒杀获取一条
export const reqSeckinfo = (id) => {
    return axios({
        url: baseUrl + "/api/seckinfo",
        method: "get",
        params: id
    })
}

// 秒杀修改
export const reqSeckedit= (obj) => {
    return axios({
        url: baseUrl + "/api/seckedit",
        method: "post",
        data: qs.stringify(obj)
    })
}

//秒杀删除
export const reqSeckdelete = (id) => {
    return axios({
        url: baseUrl + "/api/seckdelete",
        method: "post",
        data: id
    })
}



