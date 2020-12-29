
import { reqMenulist } from "../utils/http"
export let actions = {
    getmenulist(context) {
        reqMenulist().then(res => {
            if (res.data.code == 200) {
                context.commit("setmenulist", res.data.list)
            }
        })
    }
}