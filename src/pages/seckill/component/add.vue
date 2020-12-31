<template>
  <div>
    <el-dialog :title="info.isadd?'秒杀添加':'秒杀修改'" :visible.sync="info.isshow" @closed="cancel">
      <el-form class="form" :model="user">
        <!-- 活动名称 -->
        <el-form-item label="活动名称" label-width="100px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 活动期限 -->
        <el-form-item label="活动期限" label-width="100px">
          <div class="block">
            <el-date-picker
              v-model="time"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              value-format="timestamp"
            ></el-date-picker>
          </div>
        </el-form-item>
        <!-- 一级分类 -->
        <el-form-item label="一级分类" label-width="100px">
          <el-select v-model="user.first_cateid" @change="firselect">
            <el-option
              v-for="item in firstlist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 二级分类 -->
        <el-form-item label="二级分类" label-width="100px">
          <el-select v-model="user.second_cateid" @change="secondselect">
            <el-option
              v-for="item in secondlist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 商品 -->
        <el-form-item label="商品" label-width="100px">
          <el-select v-model="user.goodsid">
            <el-option
              v-for="item in goodslist"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
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
import {
  reqSeckadd,
  reqSeckinfo,
  reqSeckedit,
  reqCatelist,
  reqGoodslist
} from "../../../utils/http";
import { successalert, erroralert } from "../../../utils/alert";
export default {
  //接收参数
  props: ["info"],
  mounted() {
    this.getcatelsit();
  },
  methods: {
    //一级下拉事件
    firselect(e) {
      this.fid = e;
      this.user.second_cateid = "";
      this.user.goodsid = "";
      this.secondlist = this.firstlist.filter(item => item.id == e)[0].children;
    },
    secondselect(e) {
      this.user.goodsid = "";
      console.log(this.user.first_cateid, e)
      this.getgoodslist(this.user.first_cateid, e);
    },
    //获取商品
    getgoodslist(fid, sid) {
      reqGoodslist({ fid: fid, sid: sid }).then(res => {
        if (res.data.code == 200) {
          this.goodslist = res.data.list;
        }
      });
    },
    //获取一级分类
    getcatelsit() {
      reqCatelist({ istree: true }).then(res => {
        if (res.data.code == 200) {
          this.firstlist = res.data.list;
        }
      });
    },
    //   弹框消失
    cancel() {
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    //清空user
    empty() {
      this.time = [];
      this.fid = "";
      //   二级列表
      this.secondlist = [];
      //   商品列表
      this.goodslist = [];
      //3.初始化user
      this.user = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1
      };
    },
    //   添加
    add() {
      this.user.begintime = this.time[0]
      this.user.endtime = this.time[1]
      this.checkProps().then(()=>{
        reqSeckadd(this.user).then(res => {
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
      reqSeckinfo({ id: id }).then(res => {
        if (res.data.code == 200) {
          //获取对应的二级分类列表
          this.secondlist = this.firstlist.filter(
            item => item.id == res.data.list.first_cateid
          )[0].children;
          //将时间戳改成中国标准时间
          this.time.push(res.data.list.begintime);
          this.time.push(res.data.list.endtime);
          //获取商品列表
          this.getgoodslist(
            res.data.list.first_cateid,
            res.data.list.second_cateid
          );
          this.user = res.data.list;
          this.user.id = id;
        }
      });
    },
    //更新数据
    update() {
      this.user.begintime = this.time[0]
      this.user.endtime = this.time[1]
      this.checkProps().then(()=>{
        reqSeckedit(this.user).then(res => {
          if (res.data.code == 200) {
            this.cancel();
            successalert(res.data.msg);
            this.$emit("init");
          }
        })
      })
    },
        //验证
    checkProps() {
      return new Promise((resolve, reject) => {
        if (this.user.title == "") {
          erroralert("活动名称不能为空");
          return;
        }
        if (!this.user.endtime) {
          erroralert("时间不能为空");
          return;
        }
        if (this.user.first_cateid == "") {
          erroralert("一级分类不能为空");
          return;
        }
        if (this.user.second_cateid == "") {
          erroralert("二级分类不能为空");
          return;
        }
        if (this.user.goodsid == "") {
          erroralert("商品不能为空");
          return;
        }
        resolve();
      });
    }
  },
  data() {
    return {
      fid: "",
      time: [],
      // 一级列表
      firstlist: [],
      //   二级列表
      secondlist: [],
      //   商品列表
      goodslist: [],
      //   提交的参数
      user: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1
      }
    };
  }
};
</script>

<style scoped lang="stylus">
.form >>> .el-upload {
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