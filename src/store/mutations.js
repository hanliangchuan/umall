export let state = {
    menulist: [],
    userInfo:sessionStorage.getItem("userInfo")?JSON.parse(sessionStorage.getItem("userInfo")):{}
} 
export let getters = {  
    menulist(state){
        return state.menulist
    },
    userInfo(state){
        return state.userInfo
    }
}
export let mutations = {
    setmenulist(state, list) {
        state.menulist = list
    },
    changeUserInfo(state,obj){
        state.userInfo = obj
        if(obj.username){
            sessionStorage.setItem("userInfo",JSON.stringify(obj))
        }else{
            sessionStorage.removeItem("userInfo")
        }

    }
}
