
import Vue from "vue"
let vm = new Vue()
export let successalert = (msg) => {
    vm.$message({
        showClose: true,
        message: msg,
        type: "success"
    });
}
export let erroralert = (msg) => {
    vm.$message({
        showClose: true,
        message: msg,
        type: 'warning'
    });
}
