
import { reqMenulist ,resUserlogin} from "../utils/http"
import router from "../router"
import {successalert} from "../utils/alert"
export let actions = {
    getmenulist(context) {
        reqMenulist().then(res => {
            if (res.data.code == 200) {
                context.commit("setmenulist", res.data.list)
            }
        })
    },
    changeUser(context,obj){
        if(JSON.stringify(obj) == "{}"){
            context.commit("changeUserInfo",obj)
            return
        }
        resUserlogin(obj).then(res=>{
            if(res.data.code == 200){
                context.commit("changeUserInfo",res.data.list)
                successalert(res.data.msg)
                router.replace("/")
            }
        })
    }
}