<template>
  <div>
    <el-dialog :title="info.isadd?'规格添加':'规格编辑'" :visible.sync="info.isshow" @close="closed">
      <el-form :model="list">
        <!-- 规格名称 -->
        <el-form-item label="规格名称" label-width="100px">
          <el-input v-model="list.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 规格属性添加 -->
        <el-form-item label="规格属性" label-width="100px">
          <div class="addinput">
            <el-input class="addput" autocomplete="off" v-model="addInput" width="100px"></el-input>
            <el-button class="addbtn" type="primary" @click="addAttribute">新增规格属性</el-button>
          </div>
        </el-form-item>
        <!-- 规格属性删除 -->
        <el-form-item label="规格属性" label-width="100px">
          <div v-for="(item,index) in attrs" :key="index" class="delinput">
            <el-input class="addput" v-model="item.value"></el-input>
            <el-button class="addbtn" type="danger" @click="delAttribute(item)">删除</el-button>
          </div>
        </el-form-item>

        <!-- 状态 -->
        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="list.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isshow = false">取 消</el-button>
        <el-button type="primary" @click="add()" v-if="info.isadd">添加</el-button>
        <el-button type="primary" @click="edit()" v-else>编辑</el-button>
      </div>
      {{list}}
    </el-dialog>
  </div>
</template>

<script>
import { reqSpecsadd, reqSpecsinfo, reqSpecsedit } from "../../../utils/http";
import { successalert, erroralert } from "../../../utils/alert";
export default {
  props: ["info"],
  methods: {
    //新增属性
    addAttribute() {
      if (this.addInput.length == 0) {
        erroralert("请输入属性");
        return;
      }
      this.attrs.push({ value: this.addInput });
      this.addInput = "";
    },
    // 删除属性
    delAttribute(item) {
      //删除当前数组
      this.attrs = this.attrs.filter(i => {
        return i !== item;
      });
    },
    //清空数据
    empty() {
      this.attrs = [];
      this.list = {
        specsname: "",
        attrs: "",
        status: 1
      };
    },
    //动画取消时回调
    closed() {
      if (!this.info.isadd) {
        this.empty();
      }
    },
    //编辑确定
    edit() {
      this.list.attrs = JSON.stringify(this.attrs.map(item => item.value));
      console.log(this.list.attrs)
      if (this.list.attrs == "[]") {
        this.list.attrs = ""
      }

      this.checkProps().then(() => {
        reqSpecsedit(this.list).then(res => {
          if (res.data.code == 200) {
            successalert(res.data.msg);
            this.empty();
            this.$emit("getspecslist");
            this.info.isshow = false;
          }
        });
      });
    },
    // 获取一条管理员信息
    getOne(id) {
      this.empty();
      let str = "";
      reqSpecsinfo({ id: id }).then(res => {
        if (res.data.code == 200) {
          this.attrs = JSON.parse(res.data.list[0].attrs).map(item => ({
            value: item
          }));

          this.list = res.data.list[0];
          this.list.attrs = JSON.parse(this.list.attrs);
        }
      });
    },
    //用户添加
    add() {
      this.list.attrs = JSON.stringify(this.attrs.map(item => item.value));
      if(this.list.attrs == "[]"){
        console.log("111")
        this.list.attrs=""
      }
      this.checkProps().then(() => {
        reqSpecsadd(this.list).then(res => {
          if (res.data.code == 200) {
            successalert(res.data.msg);
            this.info.isshow = false;
            this.empty();
            this.$emit("getspecslist");
          }
        });
      });
    },
    //验证
    checkProps() {
      return new Promise((resolve, reject) => {
        if (this.list.specsname == "") {
          erroralert("规格名称不能为空");
          return;
        }
        if (this.list.attrs == "") {
          erroralert("需要新增规格属性");
          return;
        }
        resolve();
      });
    }
  },
  //   方法
  data() {
    return {
      isshow: false,
      addInput: "",
      attrs: [],
      list: {
        specsname: "",
        attrs: "",
        status: 1
      }
    };
  }
};
</script>

<style scoped>
.addinput {
  display: flex;
}
.delinput {
  display: flex;
  margin-top: 10px;
}
.addput {
  flex: 1;
}
.addput {
  width: auto;
}
</style>