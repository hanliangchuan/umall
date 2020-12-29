import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)


import {actions} from "./actions"
import {mutations,state,getters} from "./mutations"
import goods from "./modules/goods"


export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules:{
        goods,
    }

})