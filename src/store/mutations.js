export let state = {
    menulist: [],
    userList:{}
}
export let getters = {  
    menulist(state){
        return state.menulist
    },
    userlist(state){
        return state.userlist
    }
}
export let mutations = {
    setmenulist(state, list) {
        state.menulist = list
    }
}
