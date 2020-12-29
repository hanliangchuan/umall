import { reqgoodsCount,reqGoodslist } from "../../utils/http";
let state = {
    list:[]
}
let mutations = {
    changelist(state,arr){
        state.list = arr
    }
}
let getters = {
    list(state){
        return state.list
    }
}
let actions = {
    reqlist(context){
        reqGoodslist({}).then(res=>{
            if(res.data.code == 200){
                context.commit("changelist",res.data.list)
            }
        })
    }
}
export default {
    state,
    mutations,
    getters,
    actions

}