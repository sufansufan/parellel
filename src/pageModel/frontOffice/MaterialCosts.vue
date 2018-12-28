<template>
  <div>
    <div class="lesson-single">
      <!--  <div class="title-warp1">
                <h3 class="title1">收费详情</h3>
                <el-button size="mini" type="primary"  @click="applyBtnAdd">新增收费项</el-button>
            </div> -->
      <div class="table-title-warp">
        <el-row class="lesson-list-warp" style="text-align: left;">
          <el-col :span="1" class="del-lesson" v-show="!payMoeny">
            <div class="grid-content">操作</div>
          </el-col>
          <el-col :span="1" class="del-lesson" v-show="payMoeny">
            <div class="grid-content"></div>
          </el-col>
          <el-col :span="5" :offset="payMoeny ? 1 : 0">
            <div class="grid-content">选择班级</div>
          </el-col>
          <el-col :span="6" :offset="1">
            <div class="grid-content">收费内容
              <b style="font-size:12px; color:red;">(清空后可选择)</b>
            </div>
          </el-col>
          <el-col :span="1" :offset="1">
            <div class="grid-content">数量</div>
          </el-col>
          <el-col :span="2" :offset="1">
            <div class="grid-content">产品单价</div>
          </el-col>
          <el-col :span="2" :offset="1">
            <div class="grid-content">总价</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content">实际收款</div>
          </el-col>
        </el-row>
      </div>
      <div class="lesson-list" v-for="(item, index) in PaymentClassItems" :key="index">
        <el-row class="lesson-list-warp">
          <el-col :span="1" class="del-lesson" v-show="!payMoeny">
            <div class="grid-content del-choose-lesson" @click="delChooseLesson(index)">
              <i class="el-icon-error"></i>
            </div>
          </el-col>
          <el-col :span="1" class="del-lesson" v-show="payMoeny">
            <div class="grid-content"></div>
          </el-col>
          <el-col :span="5" :offset="payMoeny ? 1 : 0">
            <div class="grid-content">
              <el-select clearable v-model="item.signupOrderId" size="mini" placeholder="请选择班级" v-if="!payMoeny" style="width:100%">
                <el-option v-for="item in choosePaymentItems" :key="item.code" :label="item.class_name" :value="item.order_id">
                </el-option>
              </el-select>
              <b v-if="payMoeny">{{Util.GetIdNameForValue(choosePaymentItems, item.signupOrderId, 'order_id', 'class_name') || "无"}}</b>
            </div>
          </el-col>
          <el-col :span="6" :offset="1">
            <div class="grid-content">
              <!-- <el-input v-model="item.order_name" size="mini" placeholder="请输入" v-if="!payMoeny"></el-input> -->
              <el-autocomplete popper-class="my-autocomplete" v-model="item.orderName" :fetch-suggestions="querySearch" placeholder="请输入或选择收费内容" @select="handleSelect($event, index)" size="mini" v-if="!payMoeny" style="width:100%;">
                <template slot-scope="{item}">
                  <div class="pay-material" style="font-size:12px;text-align:left">{{ item.name }}</div>
                </template>
              </el-autocomplete>
              <!-- <el-select v-model="item.order_name" size="mini" placeholder="请选择收费教材" v-if="!payMoeny">
                                <el-option
                                        v-for="item in chargeItems"
                                        :key="item.code"
                                        :label="item.name"
                                        :value="item.name">
                                </el-option>
                            </el-select> -->
              <b v-if="payMoeny">{{item.orderName || ""}}</b>
            </div>
          </el-col>
          <el-col :span="1" :offset="1">
            <div class="grid-content">
              <el-input type="number" v-model.number="item.productNumber" size="mini" :min="1" placeholder="请.." v-if="!payMoeny"></el-input>
              <b v-if="payMoeny">{{item.productNumber || ""}}</b>
            </div>
          </el-col>
          <el-col :span="2" :offset="1">
            <div class="grid-content">
              <el-input type="number" v-model.number="item.singlePrice" size="mini" :min="0" placeholder="请输入" v-if="!payMoeny"></el-input>
              <b v-if="payMoeny">{{item.singlePrice || ""}}</b>
            </div>
          </el-col>
          <el-col :span="2" :offset="1">
            <div class="grid-content" style="text-align: left;">
              <span v-if="!payMoeny"> ￥{{ item.realPrice }}</span>
              <b v-if="payMoeny">￥{{ item.realPrice || ""}}</b>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content">
              <el-input type="number" v-model.number="item.realPayment" ref="realPaymentInp" size="mini" :min="0" placeholder="请填写实际收款金额" v-if="!payMoeny"></el-input>
              <b v-if="payMoeny">{{item.realPayment || ""}}</b>
            </div>
          </el-col>

        </el-row>
      </div>
      <div class="total-amount">
        <el-row class="lesson-list-warp" type="flex" align="middle">
          <el-col :span="12">
          </el-col>
          <el-col :span="12" style="text-align:right;font-size: 16px;">
            <div class="grid-content">合计金额 ￥{{applyAll}}</div>
          </el-col>
        </el-row>
      </div>
      <br>
      <div class="allPayMoney">
        <el-row class="lesson-list-warp" type="flex" align="middle">
          <el-col :span="12">
          </el-col>
          <el-col :span="12" style="text-align:right;">
            <div class="grid-content">
              <b style="font-size:16px;">总合计金额 ￥{{materialPar.applyAll + applyAll*1 | priceFix}}</b>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- <div class="apply-submit">
                <el-row>
                    <el-col :span="2"><div style="line-height: 30px;text-align: right;padding-right: 5px;">收费方式:</div></el-col>
                    <el-col :span="4">
                        <el-select v-model="applyType" size="mini" placeholder="选择缴费方式">
                            <el-option v-for="(item3, index) in $store.state.PaymentTypeOptions" :key="index" :label="item3.label" :value="item3.value"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="2"><div style="line-height: 30px;text-align: right;padding-right: 5px;">业务流水号:</div></el-col>
                    <el-col :span="5"><el-input type="number" v-model.number="orderNo" size="mini" placeholder="请输入对应订单号"></el-input></el-col>
                    <el-col :span="2"><div style="line-height: 30px;text-align: right;padding-right: 5px;">收费项目:</div></el-col>
                    <el-col :span="4">
                        <el-select v-model="chargeItem" size="mini" placeholder="收费项目">
                            <el-option v-for="(item4, index) in $store.state.chargeProject" :key="index" :label="item4.label" :value="item4.value"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="1"><el-button size ="mini" type="primary" @click="applyBtn" style="margin-left: 120px">立即缴费</el-button></el-col>
                </el-row>
            </div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: ["payMoeny", "materialPar"],
  data() {
    return {
      orderNo: "", //业务流水号
      chargeItem: "", //收费项目
      applyType: "", //缴费项目
      applyAll: "0.00",
      payApplyAll: "",
      choosePaymentItems: [],
      chargeItems: [],
      restaurants: [],
      PaymentClassItems: [
        {
          orderName: "", //教材名称
          productNumber: 1, //产品数量
          realPrice: 0, //应收价格
          singlePrice: 0, //单价
          realPayment: 0, //实收款
          signupOrderId: "" //班级订单id
        }
      ] //要操作的报名订单列表
    };
  },
  created() {
    this.choosePaymentItems = this.$store.state.ChoosePaymentItems;
    this.$store.commit("setPaymentClassItems", this.PaymentClassItems);
    this.getChargeItem();
  },
  filters: {
    priceFix(value) {
      return Number(value).toFixed(2);
    }
  },
  watch: {
    PaymentClassItems: {
      handler(val, oldVal) {
        val.forEach((item, index) => {
          if (item.orderName === "") {
            this.PaymentClassItems[index].singlePrice = 0.0;
          }
        });
        this.$refs.realPaymentInp &&
          this.$refs.realPaymentInp.forEach((item, index) => {
            let children = item.$el.children[0];
            if (children !== document.activeElement) {
              let n = val[index];
              n.realPrice = (n.productNumber * n.singlePrice).toFixed(2);
              //n.realPayment = n.realPrice;
              children.classList.contains("modify") ||
                (n.realPayment = n.realPrice);
            } else {
              children.classList.add("modify");
            }
          });
        this.applyAll = val
          .reduce(
            (val, nextVal) => {
              return {
                realPayment: +val.realPayment + +nextVal.realPayment
              };
            },
            { realPayment: 0 }
          )
          .realPayment.toFixed(2);
        this.$store.commit("setPaymentClassItems", this.PaymentClassItems);
      },
      deep: true
    },
    applyAll: function() {
      this.payApplyAll = this.applyAll;
    }
  },
  methods: {
    //新增收费事项
    applyBtnAdd() {
      let obj = {
        orderName: "", //教材名称
        productNumber: 1, //产品数量
        realPrice: 0, //应收价格
        singlePrice: 0, //单价
        realPayment: 0 //实收款
      };
      this.PaymentClassItems.push(obj);
    },
    delChooseLesson(index) {
      let chooseClassObj = this.$store.state.PaymentClassItems;
      chooseClassObj.splice(index, 1);
      this.PaymentClassItems.splice(index, 1);
      this.applyAll = this.PaymentClassItems.reduce(
        (val, nextVal) => {
          return {
            realPayment: +val.realPayment + +nextVal.realPayment
          };
        },
        { realPayment: 0 }
      ).realPayment.toFixed(2);
      this.$store.commit("setPaymentClassItems", chooseClassObj);
    },
    applyBtn(payNO) {
      console.log(this.materialPar, 888888);
      let objData = {
        source: this.GlobalVal.constants.source,
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        totalPayment: this.applyAll, //总支付金额
        paymentType: this.materialPar.applyType, //支付方式：包括  现金，微信，	支付宝，银行卡，POS机_储蓄卡，POS机-信用卡，POS机-微信，POS机-支付宝。不同的支付方式有不同的手续费
        tradeno: this.materialPar.orderNo, //业务流水号，POS机号
        paymentItems: [], //缴费订单entItems: [], //缴费订单
        studentId: this.choosePaymentItems[0].student_id, //学生ID
        studentName: this.choosePaymentItems[0].student_name, //学生姓名
        paymentNo: payNO
      };
      if (this.PaymentClassItems) {
        for (let i = 0; i < this.PaymentClassItems.length; i++) {
          let obj = {
            orderName: "", //订单名称
            singlePrice: 0, //单 价
            productNumber: 0, //产品数量
            realPrice: null, //float,应收款，即总价减去优惠券再减去折扣后的价钱
            realPayment: null, //float，实收款
            discount: 1, //float,折扣
            discountReason: "没有打折", //打折原因
            subtract: 0, //立减金额
            subtractReason: "没有立减", //立减原因
            couponId: null, //优惠券ID
            couponName: "", //优惠券名称
            couponAmount: 0, //优惠券金额
            chargeItem: "", //收费项目：课程，教材，练习册等
            signupOrderId: ""
          };
          obj.chargeItem = this.materialPar.chargeItem;
          obj.orderName = this.PaymentClassItems[i].orderName;
          obj.singlePrice = this.PaymentClassItems[i].singlePrice;
          obj.productNumber = this.PaymentClassItems[i].productNumber;
          obj.realPrice = this.PaymentClassItems[i].realPrice;
          obj.realPayment = this.PaymentClassItems[i].realPayment;
          obj.signupOrderId = this.PaymentClassItems[i].signupOrderId;
          if (
            this.PaymentClassItems[i].realPayment >
            this.PaymentClassItems[i].singlePrice *
              this.PaymentClassItems[i].productNumber
          ) {
            this.$message.warning(
              "第" + (i + 1) + "项实际金额不应大于应收金额"
            );
            return;
          }
          if (this.PaymentClassItems[i].orderName === "") {
            this.$message.error("请填写班级教材");
            return;
          }
          objData.paymentItems.push(obj);
        }
      }
      let loadingInstance = this.$Loading();
      this.$axios
        .post(this.GlobalVal.httpLink.productpayment, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              this.$message({
                type: "success",
                message: "缴费成功!"
              });
              this.paymentItems = [];
              this.orderNo = "";
              this.paymentLayer = false;
            } else {
              this.$message({
                type: "error",
                message: res.data.errmsg
              });
            }
            loadingInstance.close();
          },
          res => {
            console.error(res);
            loadingInstance.close();
            this.$message({
              type: "error",
              message: "操作失败"
            });
          }
        );
    },
    getChargeItem() {
      let objData = {
        limit: this.limit,
        page: this.page,
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        source: this.GlobalVal.constants.source,
        name: this.name
      };
      this.loading = true;
      this.$axios
        .post(this.GlobalVal.httpLink.listChargeItem, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              this.count = res.data.data.count;
              this.chargeItems = res.data.data.chargeItems;
              this.restaurants = this.chargeItems;
            } else {
              console.error(res);
              this.$message({
                type: "error",
                message: res.data.errmsg
              });
            }
            this.loading = false;
          },
          res => {
            this.$message.error("请求失败");
            this.loading = false;
          }
        );
    },
    querySearch(queryString, cb) {
      let restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return restaurant.name.includes(queryString);
      };
    },
    handleSelect(val, index) {
      this.PaymentClassItems[index].orderName = val.name;
      this.PaymentClassItems[index].singlePrice = val.price;
      this.$store.commit("setPaymentClassItems", this.PaymentClassItems);
    }
  }
};
</script>

<style scoped>
.lesson-single {
  background: #fff;
  width: 100%;
  height: auto;
  overflow-y: auto;
  margin-right: -20px;
  padding: 0px;
}
.lesson-list,
.total-amount {
  padding: 5px 0px 5px 0;
  border-bottom: 1px solid #cccccc;
}
.del-lesson {
  text-align: left;
}
.grid-content {
  line-height: 36px;
}
.title-warp1 {
  /*   border-bottom: 2px solid #cccccc; */
  display: flex;
  justify-content: flex-end;
}
/* .title-warp1 .el-button {
  float: right;
} */
.title1 {
  padding: 8px 5px;
  display: inline-block;
  color: #000;
}
.apply-top-btn {
  display: block;
  float: right;
}
.total-fee-top {
  margin: 0 5px;
}
.lesson-list-warp {
  font-size: 12px;
}
.actual-amount-warp {
  background: #ececec;
}
.choose-type {
  width: 90px;
}
.del-choose-lesson {
  display: inline-block;
  width: 40px;
  text-align: center;
  color: #40d6ff;
}
.pay-material {
  width: 100%;
  margin-top: 12px;
  white-space: normal;
}
</style>
<style>
.lesson-list .el-input.is-disabled .el-input__inner {
  color: #1d1d1f;
}
.my-autocomplete li {
  width: 100%;
  line-height: 20px;
  white-space: normal;
}
.el-autocomplete-suggestion li {
  padding: 0 10px;
}
</style>
