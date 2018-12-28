<template>
  <div class="order">
    <el-tabs v-model="activeName" @tab-click="tabClick">
      <el-tab-pane label="订单管理" name="orderManage">
        <apply-query ref="aqBox" reqLink="queryOrder" @removeOrder="removeOrder" @removeOrderSelf="removeOrderSelf">
          <template slot-scope="modifyProp">
            <el-button v-if="$store.state.code.includes('031002')" type="warning" size="mini" @click="modifyTime(modifyProp.row)">修改时间</el-button>
            <el-button v-if="$store.state.code.includes('031003')" type="warning" size="mini" @click="modifyPrice(modifyProp.row)">修改订单</el-button>
          </template>
        </apply-query>
      </el-tab-pane>
      <el-tab-pane label="其他收费" name="second">
        <order-pay ref="orderBox" @removeOrder="removeOrder" @removeOrderSelf="removeOrderSelf"></order-pay>
      </el-tab-pane>
    </el-tabs>
    <Dialog ref="delDialog" title="订单删除" bodyWid="610px" bodyTop="250px" titbg>
      <div class="del-box">
        <div v-if="url === 'deleteOrder'">
          <p>
            <b>班级名称: {{this.changeForm.class_name}}</b>
          </p>
          <p style="margin-bottom: 15px;">姓名:{{this.changeForm.student_name}} 购买次数:{{this.changeForm.buy_times}} 课次费:{{this.changeForm.single_price}}
            <span style="color:#409eff; display:block; float:right;">缴费总额: {{applyAll}}</span>
          </p>
        </div>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="92px" label-position="left">
          <el-row :gutter="24" v-if="url === 'deleteOtherOrder'">
            <el-col :span="12">
              <el-form-item label="收费项目" size="mini">
                <el-select v-model="ruleForm.charge_item" placeholder="选择收费项目">
                  <el-option v-for="(item, index) in $store.state.ChargeProject" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="班级教材" size="mini">
                <el-input v-model="ruleForm.order_name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="订单时间" size="mini">
                <el-date-picker v-model="ruleForm.pay_time" type="datetime" placeholder="选择日期时间" style="width:175px">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="学员姓名" size="mini">
                <el-input v-model="ruleForm.student_name" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="优惠折扣" size="mini">
                <el-input type="number" v-model.number="discount" placeholder="无折扣" @mousewheel.native.prevent="(() => false)" :min="0" :max="9" :disabled="!discountType.includes(ruleForm.discount_type)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-input v-model="discount_reason" placeholder="折扣原因" size="mini" :disabled="!discountType.includes(ruleForm.discount_type)"></el-input>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="优惠立减" size="mini">
                <el-input type="number" v-model.number="reduce" placeholder="无立减" @mousewheel.native.prevent="(() => false)" :min="0" :disabled="!reduceType.includes(ruleForm.discount_type)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-input v-model="reduce_reason" placeholder="立减原因" size="mini" :disabled="!reduceType.includes(ruleForm.discount_type)"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="收费方式" size="mini">
                <el-select v-model="changeForm.payment_type" clearable size="mini" placeholder="选择缴费方式" v-if="url === 'deleteOrder'" style="width:100%">
                  <el-option v-for="(item3, index) in $store.state.PaymentTypeOptions" :key="index" :label="item3.pay_type_name" :value="item3.code"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="业务流水号" size="mini" prop="orderno">
                <el-input v-model="orderno" v-if="url === 'deleteOrder'"></el-input>
                <el-input v-model="ruleForm.trade_no" v-else></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="del-bottom">
        <el-button type="danger" size="mini" @click="removeOrder('self', changeForm.order_id, url)">删除</el-button>
        <el-button type="primary" size="mini" @click="removeOrder('self', changeForm.order_id, url, 'build')" v-show="tabLabel === '订单管理'">删除原单并生成</el-button>
        <el-button type="primary" size="mini" @click="$refs.delDialog.dialogVisible = !$refs.delDialog.dialogVisible" v-show="tabLabel === '订单管理'">取消</el-button>
      </div>
    </Dialog>
    <Dialog ref="modifyTime" title="修改订单时间" bodyWid="500px" bodyTop="200px" titbg>
      <h4 style="margin-bottom: 5px;">订单信息</h4>
      <el-row class="lesson-list-warp" type="flex">
        <el-col :span="12">
          <div class="grid-content">订单ID</div>
          <p>{{modifyData.order_id}}</p>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">学员姓名</div>
          <p>{{modifyData.student_name}}</p>
        </el-col>
      </el-row>
      <h4 style="margin-bottom: 5px;">修改时间</h4>
      <el-row class="lesson-list-warp" type="flex" style="align-items: center;">
        <el-col :span="12">
          <div class="grid-content">原订单时间</div>
          <p>{{Util.TimeCycle(new Date(modifyData.old_time).getTime(), 'ymd hh-mm-ss')}}</p>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">修改后时间</div>
          <p>
            <el-date-picker size="mini" v-model="modifyData.pay_time" type="datetime">
            </el-date-picker>
          </p>
        </el-col>
      </el-row>
      <div style=" display: flex; justify-content: space-between; margin: 20px auto 0; text-align: center;">
        <el-input type="input" v-model="remark" style="width: 80%;" size="mini">
          <template slot="prepend">请填写修改原因</template>
        </el-input>
        <el-button type="primary" @click="handleDateModify(modifyData)" size="mini" :disabled="!modifyData.pay_time">保存</el-button>
      </div>
    </Dialog>
    <Dialog ref="modify" title="修改订单" titbg>
      <PayFees v-if="reLoadComponent" :modify="true" ref="payfeeBox" @getRes="getRes">
        <div slot-scope="mdPrice" slot="modifyTitle">
          <h4 style="margin-bottom: 5px;">原订单信息</h4>
          <el-row class="lesson-list-warp" type="flex">
            <el-col :span="3">
              <div class="grid-content">订单ID</div>
              <p>{{modifyData.order_id}}</p>
            </el-col>
            <el-col :span="4">
              <div class="grid-content">学员姓名</div>
              <p>{{modifyData.student_name}}</p>
            </el-col>
            <el-col :span="2">
              <div class="grid-content">总课节数</div>
              <p>{{modifyData.total_times}}</p>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">选取课节数</div>
              <p>{{modifyData.buy_times}}</p>
            </el-col>
            <el-col :span="3">
              <div class="grid-content">原折扣</div>
              <p>{{modifyData.discount * 10}} 折</p>
            </el-col>
            <el-col :span="3">
              <div class="grid-content">原立减</div>
              <p>￥{{modifyData.subtract_amount}}</p>
            </el-col>
            <el-col :span="3">
              <div class="grid-content">原支付金额</div>
              <p>￥{{mdPrice.price}}</p>
            </el-col>
          </el-row>
        </div>
        <h4 slot="modifyAfterTitle">修改后信息</h4>
        <p slot="modifyBuyTimes" slot-scope="timesProp">
          <el-input-number type="number" size="mini" class="change-times" :min="1" :max="timesProp.buyTimes.total_times" v-model.number="timesProp.buyTimes.buy_times" style="width: 100px;" @change="val => calcBuyTimes(val, timesProp.buyTimes)" @mousewheel.native.prevent="() => false"></el-input-number>
        </p>
        <div slot="modifyRemark" style="width: 500px;">
          <el-input type="input" v-model="remark">
            <template slot="prepend">请填写修改原因</template>
          </el-input>
        </div>
        <div class="modify-commit" slot="modifyCommit">
          <el-button type="primary" @click="savedModify">保存</el-button>
        </div>
      </PayFees>
    </Dialog>
  </div>
</template>
<script>
import applyQuery from "../setting/applyQuery.vue";
import orderPay from "../setting/OrderPay.vue";
import Dialog from "../common/Dialog.vue";
import PayFees from "../frontOffice/PayFees";
export default {
  components: {
    applyQuery,
    orderPay,
    Dialog,
    PayFees
  },
  data() {
    return {
      activeName: "orderManage",
      url: "",
      remark: "",
      ruleForm: {},
      changeForm: {},
      signupOrders: [],
      discount: "",
      discount_reason: "",
      reduce: 0,
      reduce_reason: "",
      orderno: "",
      pay_time: "",
      loadingInstance: "",
      tabLabel: "订单管理",
      discountType: ["02802", "02806", "02807", "02808"],
      reduceType: ["02803", "02805", "02806", "02808"],
      rules: {
        orderno: [{ required: true, message: "请输入", trigger: "blur" }]
      },
      reLoadComponent: true,
      modifyData: {},
      mdPriceOnce: {},
      discountRes: {},
      mBuyTimes: 0
    };
  },
  created() {
    this.Util.querySysconst(this, "026", this.$store.state.ChargeProject);
    this.Util.chargeMode(this); //查询支付方式
  },
  //计算属性
  computed: {
    applyAll() {
      return (
        this.changeForm.buy_times *
          this.changeForm.single_price *
          (this.discount === ""
            ? parseInt(1)
            : parseFloat(this.discount / 10)) -
        this.reduce
      ).toFixed(2);
    },
    totalApply() {
      return this.changeForm.buy_times * this.changeForm.single_price;
    }
  },
  watch: {
    changeForm: {
      handler() {
        this.ruleForm = this.changeForm;
        this.orderno = this.changeForm.trade_no;
      },
      deep: true
    }
  },
  methods: {
    calcBuyTimes(val, timesProp) {
      this.mBuyTimes = val;
      this.$refs.payfeeBox.lineTotalPrice(timesProp.code, timesProp);
    },
    getRes(res) {
      this.discountRes = res;
    },
    savedModify() {
      if (this.remark === "") {
        this.$message.error("请填写修改原因！");
        return;
      } else if (this.buyTimes === "") {
        this.$message.error("请填写课节数！");
        return;
      }
      let loadingInstance = this.$Loading();
      this.$axios
        .post(
          this.GlobalVal.httpLink.changePayment,
          JSON.stringify({
            source: this.GlobalVal.constants.source,
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            orderId: this.discountRes.order_id,
            discount: this.discountRes.discount / 10,
            discountReason: this.discountRes.discount_reason,
            subtractAmount: this.discountRes.subtract_amount,
            subtractReason: this.discountRes.subtract_reason,
            realPyment: this.$refs.payfeeBox.applyAll,
            remark: this.remark,
            buyTimes: this.mBuyTimes
          })
        )
        .then(res => {
          loadingInstance.close();
          if (res.data.code === "10000") {
            this.$message.success("修改订单金额成功");
            this.$refs.aqBox.getData();
            this.$refs.modify.dialogVisible = false;
          } else {
            this.$message.error(res.data.errmsg);
          }
        })
        .catch(() => {
          loadingInstance.close();
        });
    },
    modifyPrice(row = {}) {
      this.modifyData = JSON.parse(JSON.stringify(row));
      this.$store.commit("setChoosePaymentItems", [this.modifyData]);
      this.$refs.modify.dialogVisible = true;
      this.mBuyTimes = this.modifyData.buy_times;
      this.reLoadComponent = false;
      this.$nextTick().then(() => {
        this.reLoadComponent = true;
      });
    },
    modifyTime(row = {}) {
      this.modifyData = JSON.parse(JSON.stringify(row));
      this.modifyData.pay_time = new Date(this.modifyData.pay_time);
      this.modifyData.old_time = JSON.parse(
        JSON.stringify(this.modifyData)
      ).pay_time;
      this.$refs.modifyTime.dialogVisible = true;
    },
    handleDateModify(row) {
      let objData = {
        source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS 1
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId, // 1
        orderId: row.order_id,
        remark: this.remark,
        payTime: new Date(row.pay_time).getTime()
      };
      let loadingInstance = this.$Loading();
      this.$axios
        .post(this.GlobalVal.httpLink.changeOrderTime, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              this.$message.success("修改成功");
              this.$refs.aqBox.getData();
              this.$refs.modifyTime.dialogVisible = false;
            } else {
              console.error(res);
              this.$message({
                type: "error",
                message: res.data.errmsg
              });
            }
            loadingInstance.close();
          },
          res => {
            loadingInstance.close();
            this.$message("请求失败");
          }
        );
    },
    removeOrderSelf(type, oid, url) {
      this.changeForm = oid;
      this.url = url;
      this.ruleForm.pay_time = this.changeForm.pay_time;
      /\d+/.test(this.changeForm.discount_type)
        ? this.changeForm.discount_type
        : (this.changeForm.discount_type = this.Util.GetValueForLabel(
            this.$store.state.DiscountTypeOptions,
            this.changeForm.discount_type
          ));
      /\d+/.test(this.changeForm.payment_type)
        ? this.changeForm.payment_type
        : (this.changeForm.payment_type = this.Util.GetIdNameForValue(
            this.$store.state.PaymentTypeOptions,
            this.changeForm.payment_type,
            "code",
            "pay_type_name"
          ));
      this.$refs.delDialog.dialogVisible = true;
    },
    removeOrder(type, oid, url, build) {
      let delList = []; // 删除的订单集合
      if (type === "self") {
        delList.push({
          id: oid
        });
      } else {
        delList = oid.map(item => ({ id: item.order_id }));
      }
      const reqData = {
        source: this.GlobalVal.constants.source,
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        delList
      };
      if (!delList.length) {
        this.$message.warning("请勾选需要删除的订单");
        return;
      }
      this.$confirm("此操作将永久删除该订单, 是否继续?", "警告", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          let loadingInstance = this.$Loading();
          this.$axios
            .post(this.GlobalVal.httpLink[url], JSON.stringify(reqData))
            .then(
              res => {
                if (res.data.code === "10000") {
                  this.$message.success("订单删除成功");
                  loadingInstance.close();
                  if (type === "all" || type === "self") {
                    this.$refs.aqBox.getData();
                    this.$refs.orderBox.getOtherData();
                    this.$refs.delDialog.dialogVisible = false;
                  }
                  if (type === "self" && build) {
                    this.$nextTick(() => {
                      this.applyBtn();
                    });
                  }
                } else {
                  console.error(res);
                  loadingInstance.close();
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
        })
        .catch(() => {});
    },
    /* 报名接口 */
    applyBtn() {
      const self = this;
      let objData = {
        source: "PC",
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        studentId: this.changeForm.student_id, //学生id
        isexcessSignup: true,
        classList: []
      };
      let obj = {
        classId: null,
        buytimes: null,
        preorderId: null,
        couponId: null,
        couponName: "",
        couponAmount: 0,
        realPrice: 0
      };
      obj.classId = this.changeForm.class_id;
      obj.buytimes = this.changeForm.buy_times;
      objData.classList.push(obj);
      this.loadingInstance = this.$Loading();
      this.$axios
        .post(this.GlobalVal.httpLink.signup, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              this.signupOrders = res.data.signupOrders;
              this.payBtn();
            } else {
              this.$message({
                type: "error",
                message: res.data.errmsg
              });
            }
          },
          res => {
            this.loadingInstance.close();
            console.error(res);
            this.$message({
              type: "error",
              message: "操作失败"
            });
          }
        );
    },
    /* 缴费接口 */
    payBtn() {
      const self = this;
      let objData = {
        source: this.GlobalVal.constants.source,
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        totalPayment: this.totalApply, //总支付金额
        paymentType: this.changeForm.payment_type, //支付方式：包括  现金，微信，	支付宝，银行卡，POS机_储蓄卡，POS机-信用卡，POS机-微信，POS机-支付宝。不同的支付方式有不同的手续费
        tradeno: this.orderno, //业务流水号，POS机号
        paymentItems: [] //缴费订单
      };
      let obj = {
        orderId: this.signupOrders[0].order_id, //学生报名表id
        realPrice: this.applyAll, //float,应收款，即总价减去优惠券再减去折扣后的价钱
        realPayment: this.applyAll, //float，实收款
        discount: parseFloat("0." + this.discount) || 1, //float,折扣
        discountReason: this.discount_reason || "", //打折原因
        subtract: this.reduce || 0, //立减金额
        subtractReason: this.reduce_reason, //立减原因
        couponId: "", //优惠券ID
        couponName: "", //优惠券名称
        couponAmount: 0, //优惠券金额：
        //chargeItem:null,//收费项目：课程，教材，练习册等
        payTime: new Date(this.ruleForm.pay_time).getTime()
      };
      objData.paymentItems.push(obj);
      this.$axios
        .post(this.GlobalVal.httpLink.payment, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              this.$nextTick(() => {
                this.loadingInstance.close();
                this.$refs.aqBox.getData();
                this.$refs.orderBox.getOtherData();
                this.$refs.delDialog.dialogVisible = false;
                this.orderno = "";
              });
              this.$message({
                type: "success",
                message: "缴费成功!"
              });
            } else {
              this.$message({
                type: "error",
                message: res.data.errmsg
              });
              this.$nextTick(() => {
                this.loadingInstance.close();
              });
            }
          },
          res => {
            this.loadingInstance.close();
            this.$message({
              type: "error",
              message: "操作失败"
            });
          }
        );
    },
    tabClick(tab, event) {
      this.tabLabel = tab.label;
    }
  }
};
</script>
<style>
.order .el-tabs__header {
  margin: 0 20px;
}
</style>
<style scoped>
.del-box {
  width: 100%;
  min-height: 250px;
}
.del-box p {
  font-size: 16px;
  line-height: 26px;
}
.del-bottom {
  width: 260px;
  height: auto;
  margin: 0 auto;
}
.modify-price {
  display: flex;
  flex-wrap: wrap;
}
.modify-price > div {
  margin-bottom: 10px;
}
.modify-price > div:last-child {
  width: 100%;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.modify-price > div:last-child > button {
  margin-left: 10px;
}
.change-times {
  line-height: 29px;
}
</style>
