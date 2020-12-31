<template>
  <div>
    <el-dialog
      :title="info.isadd?'商品添加':'商品修改'"
      :visible.sync="info.isshow"
      @closed="cancel"
      @opened="open"
    >
      <el-form class="form" :model="user">
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
          <el-select v-model="user.second_cateid">
            <!-- <el-option value label="--请选择--" disabled></el-option> -->
            <el-option
              v-for="item in secondlist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 商品名称 -->
        <el-form-item label="商品名称" label-width="100px">
          <el-input v-model="user.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 价格 -->
        <el-form-item label="价格" label-width="100px">
          <el-input v-model="user.price" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 市场价格 -->
        <el-form-item label="市场价格" label-width="100px">
          <el-input v-model="user.market_price" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 图片 -->
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
        <!-- 商品规格 -->
        <el-form-item label="商品规格" label-width="100px">
          <el-select v-model="user.specsid" @change="specsselect">
            <el-option value label="--请选择--" disabled></el-option>
            <el-option
              v-for="item in specslist"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 规格属性 -->
        <el-form-item label="规格属性" label-width="100px">
          <el-select v-model="user.specsattr" multiple filterable allow-create default-first-option>
            <el-option v-for="item in attributelist" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- 是否新品 -->
        <el-form-item label="是否新品" label-width="100px">
          <el-radio :label="1" v-model="user.isnew">是</el-radio>
          <el-radio :label="2" v-model="user.isnew">否</el-radio>
        </el-form-item>
        <!-- 是否热卖 -->
        <el-form-item label="是否热卖" label-width="100px">
          <el-radio :label="1" v-model="user.ishot">是</el-radio>
          <el-radio :label="2" v-model="user.ishot">否</el-radio>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <!-- 商品描述 -->
        <el-form-item label="商品描述" label-width="100px">
          <div id="edit"></div>
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
import E from "wangeditor";
import {
  reqGoodsadd,
  reqGoodsinfo,
  reqGoodsedit,
  reqCatelist,
  //规格列表
  reqSpecslist
} from "../../../utils/http";
import { successalert, erroralert } from "../../../utils/alert";
export default {
  mounted() {
    reqCatelist({ istree: true }).then(res => {
      if (res.data.code == 200) {
        this.firstlist = res.data.list;
      }
    });
    reqSpecslist().then(res => {
      if (res.data.code == 200) {
        this.specslist = res.data.list;
      }
    });
  },
  //接收参数
  props: ["info"],
  methods: {
    firselect(e) {
      this.user.second_cateid = "";
      this.secondlist = this.firstlist.filter(item => item.id == e)[0].children;
    },
    specsselect(e) {
      this.user.specsattr = [];
      this.attributelist = this.specslist.filter(item => item.id == e)[0].attrs;
      this.attributelist = JSON.parse(this.attributelist);
    },
    //动画打开时的回调
    open() {
      this.editor = new E("#edit");
      this.editor.create();
      this.editor.txt.html(this.user.description);
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
      this.imgUrl = "";
      //3.初始化user
      this.user = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1
      };
    },
    //   添加
    add() {
      this.user.description = this.editor.txt.html();
      let data = {
        ...this.user,
        specsattr: JSON.stringify(this.user.specsattr)
      };
    this.checkProps().then(()=>{
      reqGoodsadd(data).then(res => {
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
      reqGoodsinfo({ id: id }).then(res => {
        if (res.data.code == 200) {
          //获取对应的二级分类列表
          this.secondlist = this.firstlist.filter(
            item => item.id == res.data.list.first_cateid
          )[0].children;
          //获取对应的规格属性列表
          if (
            this.specslist.filter(item => item.id == res.data.list.specsid)
              .length !== 0
          ) {
            this.attributelist = JSON.parse(
              this.specslist.filter(item => item.id == res.data.list.specsid)[0]
                .attrs
            );
          } else {
            this.attributelist = [];
          }
          // 已选中的规格
          res.data.list.specsattr = JSON.parse(res.data.list.specsattr);

          this.user = res.data.list;
          this.user.id = id;
          this.imgUrl = this.$pre + this.user.img;

          if (!!this.editor) {
            this.editor.txt.html(this.user.description);
          }
        }
      });
    },
    //更新数据
    update() {
      this.user.description = this.editor.txt.html();
      let data = {
        ...this.user,
        specsattr: JSON.stringify(this.user.specsattr)
      };
      if(data.specsattr == "[]"){
        this.user.specsattr = ""
      }
      this.checkProps().then(()=>{
        reqGoodsedit(data).then(res => {
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
        if (this.user.first_cateid == "") {
          erroralert("一级分类不能为空");
          return;
        }
        if (this.user.second_cateid == "") {
          erroralert("二级分类不能为空");
          return;
        }
        if (this.user.goodsname == "") {
          erroralert("商品名称不能为空");
          return;
        }
        if (this.user.price == "") {
          erroralert("价格不能为空");
          return;
        }
        if (this.user.market_price == "") {
          erroralert("市场价格不能为空");
          return;
        }
        if (this.user.img == null) {
          erroralert("图片不能为空");
          return;
        }
        if (this.user.specsid == "") {
          erroralert("商品规格不能为空");
          return;
        }
        if (this.user.specsid == "") {
          erroralert("商品规格不能为空");
          return;
        }
        if (this.user.specsattr == "") {
          erroralert("规格属性不能为空");
          return;
        }
        if (this.user.description == "") {
          erroralert("商品描述不能为空");
          return;
        }
        resolve();
      });
    }
  },
  data() {
    return {
      firstlist: [],
      secondlist: [],
      //   商品规格
      specslist: [],
      //   商品属性
      attributelist: [],
      imgUrl: "",
      user: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
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