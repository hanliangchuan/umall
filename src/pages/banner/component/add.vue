<template>
  <div>
    <el-dialog :title="info.isadd?'添加轮播图':'编辑轮播图'" :visible.sync="info.isshow" @closed="cancel">
      <el-form class="form" :model="user">
        <!-- 分类名称 -->
        <el-form-item label="标题" label-width="100px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="100px">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <!-- 状态 -->
        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <!-- 添加删除 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="this.info.isadd">添加</el-button>
        <el-button type="primary" @click="update" v-else>修改</el-button>
      </div>
      {{user}}
    </el-dialog>
  </div>
</template>

<script>
import path from "path";
import {
  reqBanneradd,
  reqBannerinfo,
  reqBanneredit
} from "../../../utils/http";
import { successalert, erroralert } from "../../../utils/alert";
export default {
  //接收参数
  props: ["info", "list"],
  methods: {
    //   弹框消失
    cancel() {
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    //清空user
    empty() {
      this.imgUrl = "";
      //3.初始化user
      this.user = {
        title: "",
        img: null,
        status: 1
      };
    },
    //   添加
    add() {
      this.checkProps().then(()=>{
        reqBanneradd(this.user).then(res => {
          if (res.data.code == 200) {
            successalert(res.data.msg);
            this.cancel();
            this.empty();
            this.$emit("init");
          }
        })
      })
    },
    //获取一条数据
    getOne(id) {
      reqBannerinfo({ id: id }).then(res => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.user.id = id;
          this.imgUrl = this.$pre + this.user.img;
        }
      });
    },
    //更新数据
    update() {
      this.checkProps().then(()=>{
        reqBanneredit(this.user).then(res => {
          if (res.data.code == 200) {
            this.cancel();
            successalert(res.data.msg);
            this.$emit("init");
          }
        })
      })
    },
    //获取图片信息
    changeImg(e) {
      let arr = [".gif", ".png", ".jpg", ".jpeg", ".svg"];
      let extname = path.extname(e.raw.name);
      if (!arr.some(item => item == extname)) {
        erroralert("请上传图片");
        return;
      }
      if (e.raw.size > 2 * 1024 * 1024) {
        erroralert("不能超过2M");
        return;
      }
      let file = e.raw;
      this.imgUrl = URL.createObjectURL(file);
      this.user.img = file;
    },
    //验证
    checkProps() {
      return new Promise((resolve, reject) => {
        if (this.user.title == "") {
          erroralert("标题不能为空");
          return;
        }
        if(this.user.img == null){
          erroralert("图片不能为空")
          return
        }
        resolve();
      });
    }
  },
  data() {
    return {
      imgUrl: "",
      user: {
        title: "",
        img: null,
        status: 1
      }
    };
  }
};
</script>

<style scoped lang="stylus">
.form >>>.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>