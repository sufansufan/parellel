<style scoped>
.bg-layer {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
.transition-box.change {
  height: 400px;
}
.transition-box {
  position: absolute;
  width: 600px;
  height: 580px;
  margin: auto;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  border-radius: 4px;
  background-color: #ffffff;
  overflow-y: scroll;
  color: #fff;
  padding-top: 60px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  box-sizing: border-box;
  z-index: 10;
}

.title-warp {
  position: absolute;
  width: 600px;
  height: 50px;
  top: 0px;
  right: 0;
  z-index: 10;
  background: #ffffff;
  -webkit-box-shadow: 0px 0px 3px #ccc;
  -moz-box-shadow: 0px 0px 3px #ccc;
  box-shadow: 0px 0px 3px #ccc;
}
.fotter-warp {
  position: absolute;
  width: 600px;
  height: 50px;
  bottom: 0;
  right: 0;
  z-index: 10;
  background: #ffffff;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  overflow: hidden;
  padding-left: 20px;
}
.transition-box .el-cascader {
  width: 100%;
}
.close-btn {
  position: absolute;
  color: #ff6808;
  font-size: 20px;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.modify-title {
  font-size: 20px;
  height: 50px;
  line-height: 50px;
  color: #666666;
  border-bottom: 1px solid #cccccc;
  text-align: left;
  padding-left: 20px;
}
.handle-box {
  margin-bottom: 20px;
}
.search-warp {
  display: inline-block;
  /*float: right;*/
}
.handle-box {
  margin-bottom: 20px;
}
.handle-input {
  width: 300px;
  display: inline-block;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.search-input {
  width: 400px;
}

.checkbox-warp {
  margin-top: 10px;
}
.class-query .el-checkbox__label {
  font-size: 12px;
}
.vertical-moulding {
  display: inline-block;
  width: 1px;
  height: 12px;
  background: #cccccc;
  position: relative;
  top: 1px;
  left: 12px;
}
.vertical-moulding + .el-checkbox {
  margin-left: 25px;
}
.lesson-single-warp {
  position: fixed;
  bottom: 0;
  z-index: 9;
  box-shadow: 0 0 10px #ccc;
  width: calc(100% - 285px);
}
.box-content {
  padding: 20px;
  color: #444;
}
.box-content > div {
  margin-bottom: 15px;
}
.box-content > div:nth-child(2) {
  display: flex;
}
.box-content > div:nth-child(2) > div {
  flex: 1;
}
.box-content > div:last-child {
  display: flex;
  font-size: 16px;
  border-top: 1px solid #ccc;
  padding-top: 15px;
}
.box-content > div:last-child > div:first-child {
  padding-right: 15px;
}
.box-content > div:last-child > div > p {
  margin-top: 3px;
  margin-bottom: 10px;
}
</style>
<template>
  <div class="table">
    <class-query ref="classQuery" :preferential="preferential" @preferentialDataPush="getData"></class-query>
    <transition name="el-fade-in-linear">
      <div v-show="isShow" class="bg-layer">
        <transition name="el-zoom-in-center">
          <div v-if="isShow" class="transition-box">
            <div class="title-warp">
              <div class="close-btn" @click="isShow=!isShow">
                <i class="el-icon-close"></i>
              </div>
              <h3 class="modify-title">优惠设置</h3>
            </div>
            <div class="box-content">
              <div>
                <el-input disabled v-model="preferential.row.class_name">
                  <template slot="prepend">班级名称</template>
                </el-input>
              </div>
              <div>
                <div>
                  <p style="display: flex;">
                    <el-checkbox v-model="preferential.isDazhe" style="flex: 1;">打折</el-checkbox>
                    <span style="flex: 1;" v-if="preferential.isDazhe">打折原因</span>
                  </p>
                  <p v-if="preferential.isDazhe" style="display: flex; margin-top: 10px; padding-right: 20px;">
                    <el-input type="tel" style="flex: 1;  padding-right:10px;" size="mini" v-model="preferential.discount" placeholder="1折 ~ 10折" @blur="calcDiscount"></el-input>
                    <el-input style="flex: 1;" size="mini" v-model="preferential.daZheReason" placeholder="请输入打折原因"></el-input>
                  </p>
                </div>
                <div>
                  <p style="display: flex;">
                    <el-checkbox v-model="preferential.isYouHui" style="flex: 1;">优惠</el-checkbox>
                    <span style="flex: 1;" v-if="preferential.isYouHui">优惠原因</span>
                  </p>
                  <p v-if="preferential.isYouHui" style="display: flex; margin-top: 10px; padding-right: 20px;">
                    <el-input type="number" style="flex: 1; padding-right:10px;" size="mini" v-model.number="preferential.discountPrice" placeholder="请输入金额"></el-input>
                    <el-input style="flex: 1;" size="mini" v-model="preferential.youHuiReason" placeholder="请输入优惠原因"></el-input>
                  </p>
                </div>
              </div>
              <div>
                <el-checkbox v-model="preferential.isCoupon">允许使用优惠卷</el-checkbox>
              </div>
              <div>
                <div>优先级别</div>
                <div>
                  <p>
                    <el-radio v-model="preferential.level" label="0">无优先</el-radio>
                  </p>
                  <p>
                    <el-radio v-model="preferential.level" label="1">打折优先</el-radio>
                  </p>
                  <p>
                    <el-radio v-model="preferential.level" label="2">立减／优惠卷优先</el-radio>
                  </p>
                </div>
              </div>
            </div>
            <div style="text-align: center;">
              <el-button type="primary" @click="saved">保存</el-button>
              <el-button @click="isShow = !isShow">取消</el-button>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import classQuery from "./ClassQuery";

const mixin = {
  methods: {
    calcDiscount() {
      // 处理折扣
      let num = this.preferential.discount;
      if (num > 10) {
        num = num = 10;
      } else if (num < 1) {
        num = 1;
      }
      this.preferential.discount = num;
    },
    saved() {
      const {
        discount,
        isDazhe,
        isYouHui,
        isCoupon,
        level,
        daZheReason,
        youHuiReason
      } = this.preferential;
      if (
        (isDazhe && isYouHui) ||
        (isDazhe && isCoupon) ||
        (isYouHui && isCoupon)
      ) {
        if (!+level) {
          this.$message.warning("设置大于两种优惠时请选择优先级别！");
          return;
        }
      } else {
        if (+level > 0) {
          this.$message.warning("设置优先级别必须勾选至少两种优惠方式！");
          return;
        }
      }
      if (+level === 1 && !isDazhe) {
        this.$message.warning("设置打折优先必须勾选折扣！");
        return;
      }
      const objData = {
        source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        classId: this.preferential.row.class_id, //班级id
        discountEnable: isDazhe, //是否打折，true:打折，false:不打折
        discount: isDazhe ? discount / 10 : 1, //是否折扣.若discountEnable为False,则该项默认为1
        discountReason: isDazhe ? daZheReason : "", //打折原因。若discountEnable为False,则该项默认为空。
        subtractEnable: isYouHui, //是否立减。true:立减， false:不立减
        subtractAmount: isYouHui ? this._price : "0.0", //立减金额。若subtractEnable为false, 则该项默认为0.0
        subtractReason: isYouHui ? youHuiReason : "", //立减原因。若subtractEnable为false, 则该项默认为空
        couponEnable: isCoupon, //是否允话使用优惠券。true,允话，false,不允许
        discountPriority:
          !isDazhe && !isYouHui && !isCoupon
            ? "02901"
            : level === "1" ? "02902" : level === "2" ? "02903" : "02901"
        //优惠优先选项： 02901 无优惠 ， 02902 打折优先 ，02903 立减/优惠券优先。
        //若discountEnable=false,subtractEnable=false,couponEnable=false 则为 02901
      };
      this.$axios
        .post(this.GlobalVal.httpLink.savedDiscount, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              this.isShow = !this.isShow;
              this.$message.success("设置成功！");
              this.$refs.classQuery.getData();
            } else {
              console.error(res);
              this.$message({
                type: "error",
                message: res.data.errmsg
              });
            }
          },
          res => {
            this.$message("请求失败");
          }
        );
    }
  }
};
export default {
  components: {
    classQuery
  },
  data() {
    return {
      isShow: false,
      preferential: {
        btnTxt: "优惠设置", // 列表页面按钮文字
        row: "", // 接收的数据集
        isDazhe: false, // 是否打折
        discount: "10", // 折扣
        daZheReason: "", // 打折原因
        isYouHui: false, // 是否优惠
        discountPrice: "0.0", // 优惠金额
        youHuiReason: "", // 优惠原因
        isCoupon: false, // 是否使用优惠卷
        level: "0"
      }
    };
  },
  computed: {
    _price: {
      set(val) {
        this.preferential.discountPrice = val;
      },
      get() {
        if (this.preferential.discountPrice !== "") {
          return (+this.preferential.discountPrice).toFixed(1);
        }
      }
    }
  },
  methods: {
    getData(index, row) {
      this.isShow = !this.isShow;
      this.preferential.row = row;
      let dazhe = () => {
        this.preferential.isDazhe = true;
        this.preferential.discount = row.discount;
        this.preferential.daZheReason = row.discount_reason;
      };
      let lijian = () => {
        this.preferential.isYouHui = true;
        this.preferential.discountPrice = row.subtract_amount;
        this.preferential.youHuiReason = row.subtract_reason;
      };
      let juan = () => {
        this.preferential.isCoupon = true;
      };
      switch (row.discount_type) {
        case "02802":
          dazhe();
          break;
        case "02803":
          lijian();
          break;
        case "02804":
          juan();
          break;
        case "02805":
          lijian();
          juan();
          break;
        case "02806":
          dazhe();
          lijian();
          break;
        case "02807":
          dazhe();
          juan();
          break;
        case "02808":
          dazhe();
          lijian();
          juan();
          break;
        default:
          this.preferential.isDazhe = false;
          this.preferential.isYouHui = false;
          this.preferential.isCoupon = false;
          this.preferential.discountPrice = "0.0";
          this.preferential.discount = "10";
          this.preferential.daZheReason = "";
          this.preferential.youHuiReason = "";
      }
      switch (row.discount_priority) {
        case "02902":
          this.preferential.level = "1";
          break;
        case "02903":
          this.preferential.level = "2";
          break;
        default:
          this.preferential.level = "0";
      }
    }
  },
  mixins: [mixin]
};
</script>
