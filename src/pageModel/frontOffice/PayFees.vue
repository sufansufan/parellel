<style scoped>
.lesson-pay {
  padding: 20px;
  background: #ffffff;
}
.lesson-list-box {
  max-height: 60vh;
  overflow-y: auto;
  margin-right: -20px;
  padding-right: 20px;
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
  height: 36px;
  line-height: 36px;
  text-align: left;
}
.apply-submit {
  /*text-align: right;*/
  margin-bottom: 30px;
}
.title-warp {
  border-bottom: 2px solid #cccccc;
}
.title {
  padding: 8px 5px;
  display: inline-block;
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
  width: 70px;
}
.choose-type .el-input__inner {
  padding: 0 5px;
}
.del-choose-lesson {
  display: inline-block;
  width: 40px;
  text-align: center;
  color: #40d6ff;
}
.applyLeft {
  margin-left: 20px;
}
.list-content .grid-content {
  height: auto;
}
.lesson-list .grid-content {
  line-height: 20px;
}
.coupon-style-box {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
}
.coupon-style {
  flex: calc(33.33% - 32px);
  width: 100px;
  min-height: 50px;
  line-height: 25px;
  border: 1px solid #409eff;
  color: #409eff;
  padding: 0 10px;
  border-radius: 5px;
  margin: 5px;
}
.coupon-style.actived {
  background: #409eff;
  color: #fff;
  box-shadow: 0 0 10px #999;
}
.coupon-style:not(.actived.notChoise):hover {
  color: #409eff;
}
.coupon-style span {
  display: block;
  font-size: 12px;
  line-height: 14px;
  padding-bottom: 5px;
}
.table-title-warp {
  margin-top: 30px;
}
.notChoise.actived {
  background: #ccc;
  border: 1px solid #ccc;
  box-shadow: none;
  cursor: default;
}
.material-list-warp {
  font-size: 12px;
  color: #419dfd;
}
.material {
  width: 100%;
}
.material-list {
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
}
.material-list.cloose {
  -webkit-transition: all 0.5s ease-in;
  -moz-transition: all 0.5s ease-in;
  -ms-transition: all 0.5s ease-in;
  -o-transition: all 0.5s ease-in;
  transition: all 5s de ease-in;
}
.allPayMoney {
  width: 100%;
  border-bottom: 2px solid #ccc;
}
.lesson-keci-list ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
}
.lesson-keci-list ul li {
  color: #fff;
  width: 54px;
  height: 49px;
  font-size: 18px;
  text-align: center;
  /* cursor: pointer; */
  /*   line-height: 45px; */
  background: #c9c9c9;
  margin-right: 10px;
  margin-bottom: 10px;
  transition: all 0.5s;
  -webkit-user-select: none;
  padding-top: 5px;
  list-style: none;
  line-height: 50px;
  position: relative;
}

.lesson-keci-list ul li.finish {
  background: #409eff;
  box-shadow: 0 0 10px #409eff;
}
.lesson-keci-list ul li.finish:after {
  width: 10px;
  height: 10px;
  content: "√";
  position: absolute;
  right: 2px;
  bottom: 22px;
  z-index: 30;
}
</style>
<style>
.reason-style {
  font-size: 12px;
}
.reason-style.el-textarea textarea,
.reason-style input {
  padding: 3px 5px !important;
}
</style>

<template>
  <div class="lesson-pay">
    <slot v-if="$route.path.includes('orderManage')" name="modifyTitle" :price="applyAll | priceFix" v-once></slot>
    <div class="title-warp" v-show="!modify">
      <h3 class="title">购课单</h3>
      <div class="apply-top-btn">
        <!-- 费用总计
          <span class="total-fee-top">￥{{applyAll | priceFix}}</span> -->
        <!-- <el-button size="mini" type="primary" @click="applyBtn">立即缴费</el-button> -->
        <el-button size="mini" type="primary" @click="$refs.materialOtherCost.applyBtnAdd()" v-show="!payMoeny">新增收费项</el-button>
      </div>
    </div>
    <div class="lesson-list-box">
      <div class="table-title-warp">
        <slot name="modifyAfterTitle"></slot>
        <el-row class="lesson-list-warp" type="flex">
          <el-col :span="!payMoeny ? 1 : 2" class="del-lesson" v-show="!payMoeny && !modify">
            <div class="grid-content">操作</div>
          </el-col>
          <el-col :span="1" class="del-lesson" v-show="payMoeny"></el-col>
          <el-col :span="modify ? 7 : 5">
            <div class="grid-content">班级名称 </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content">总课节数</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content">选取课节数</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content">应付金额</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content">优惠折扣</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content">优惠立减</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content">实付金额</div>
          </el-col>
        </el-row>
      </div>
      <div>
        <div class="lesson-list" v-for="(item, index) in choosePaymentItems" :key="index">
          <el-row class="lesson-list-warp list-content" type="flex" style="font-size: 14px;">
            <el-col :span="!payMoeny ? 1 : 2" class="del-lesson" v-show="!payMoeny && !modify">
              <div class="grid-content del-choose-lesson" @click="delChooseLesson(index, item.order_id)">
                <i class="el-icon-error" style="font-size: 20px; cursor: pointer;"></i>
              </div>
            </el-col>
            <el-col :span="1" class="del-lesson" v-show="payMoeny"></el-col>
            <el-col :span="modify ? 7 : 5">
              <div class="grid-content">{{item.class_name}}</div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content">{{item.total_times}}</div>
            </el-col>
            <el-col :span="3">
              <slot name="modifyBuyTimes" :buyTimes="discountRes[index]" :index="index">
                <!-- <div class="grid-content">{{item.buy_times}}</div> -->
                <el-popover placement="bottom" width="512" trigger="click" ref="popover">
                  <el-button slot="reference" type="text" size="mini" style="color:#409EFF; font-size: 18px; font-weight:bold; margin: -5px auto 0px;" @click="timeSumClick(index)">{{item.buy_times}}</el-button>
                  <div class="lesson-keci-list">
                    <ul>
                      <li v-for="(i,n) in oldBuyAttendClasses" class="finish" :key="n">{{i}}</li>
                    </ul>
                  </div>
                </el-popover>
              </slot>
            </el-col>
            <el-col :span="3">
              <div class="grid-content" style="font-size: 14px;">￥{{(item.class_total_price - (item.total_times - discountRes[index].buy_times) * item.single_price) | priceFix}}</div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content choose-type">
                <el-input type="number" v-if="!payMoeny" class="reason-style" v-model.number="discountRes[index].discount" @mousewheel.native.prevent="() => false" @input="lineTotalPrice(discountRes[index].code, discountRes[index], 'discount')" placeholder="无折扣" min="1" max="10" size="mini" :disabled="!discountRes[index].isDZ"></el-input>
                <b v-if="payMoeny">{{discountRes[index].discount || '无折扣'}}</b>
                <p style="color: #999; line-height: 20px; margin-top: 5px;">
                  <el-input v-if="!payMoeny" type="textarea" class="reason-style" resize="none" :disabled="!discountRes[index].isDZ" :autosize="{ minRows: 2, maxRows: 4}" placeholder="折扣原因" v-model="discountRes[index].discount_reason">
                  </el-input>
                  <b v-if="payMoeny" style="color:#000">{{discountRes[index].discount_reason || '无'}}</b>
                </p>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content choose-type" v-if="item.showCoupon">
              </div>
              <div class="grid-content choose-type" v-else>
                <el-input type="number" v-if="!payMoeny" :disabled="!discountRes[index].isLJ" class="reason-style" @mousewheel.native.prevent="(() => false)" v-model.number="discountRes[index].subtract_amount" size="mini" @input="lineTotalPrice(discountRes[index].code, discountRes[index])" placeholder="无立减"></el-input>
                <b v-if="payMoeny">{{discountRes[index].subtract_amount}}</b>
                <p style="color: #999; line-height: 20px; margin-top: 5px;">
                  <el-input v-if="!payMoeny" type="textarea" class="reason-style" resize="none" :disabled="!discountRes[index].isLJ" :autosize="{ minRows: 2, maxRows: 4}" placeholder="立减原因" v-model="discountRes[index].subtract_reason">
                  </el-input>
                  <b v-if="payMoeny" style="color:#000">{{discountRes[index].subtract_reason || '无'}}</b>
                </p>
              </div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content" style="font-size: 14px;">
                ￥{{discountRes[index].all_price | priceFix}}
                <p style="color: #999;  line-height: 20px;">
                  {{discountRes[index].discountPriority}}
                </p>
              </div>
              <slot name="rowBtns" :index="index"></slot>
            </el-col>
          </el-row>
          <el-row type="flex" align="middle" style="display: none">
            <el-col :span="10" :offset="2">
              <el-dropdown v-if="item.order_source === 'PC' && couponList.length && discountRes[index].isYHJ" trigger="click" @command="data => dropClick(data, index, discountRes[index])">
                <span class="el-dropdown-link">
                  <i class="el-icon-sold-out"></i> 选择优惠劵
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" class="coupon-style-box">
                  <el-dropdown-item v-for="val in couponList" :key="val.id" class="coupon-style" :command="[val, item.order_id]" :class="{actived: val.isActived, 'notChoise': (val.orderId !== item.order_id && val.orderId)}">
                    <b>￥{{ val.coupon_amount }}</b>
                    <span>{{ val.coupon_name }}</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <div style="font-size: 12px; color: #999" v-else-if="item.order_source === 'PC' && !couponList.length && discountRes[index].isYHJ">无优惠卷</div>
              <div style="font-size: 12px; color: #999" v-else-if="!discountRes[index].isYHJ">不能使用优惠卷</div>
              <div style="font-size: 12px; color: #999" v-else>{{ item.order_source }}订单</div>
            </el-col>
            <el-col :span="12" justify="end" v-if="discountRes[index].isYHJ">
              <div style="text-align: right; padding-right: 40px; color: #f00;" v-for="coupon in couponList" :key="coupon.id" v-if="coupon.orderId === item.order_id && item.order_source === 'PC'">
                已选择优惠卷：({{ coupon.coupon_name }}) &nbsp; -{{ coupon.coupon_amount }}
                <!-- <p style="tex">￥{{discountRes[index].total_price - coupon.coupon_amount}}</p> -->
              </div>
              <div style="text-align: right; padding-right: 40px; color: #f00;" v-if="item.order_source !== 'PC' && item.coupon_id">
                {{item}} 已选择优惠卷：({{ item.coupon_name }}) &nbsp; -{{ item.coupon_amount }}
                <!-- <p style="tex">￥{{discountRes[index].total_price - item.coupon_amount}}</p> -->
              </div>
            </el-col>
          </el-row>
          <el-row style="display: none">
            <el-col :span="2" :offset="2">
              <div style="font-size: 12px; color: #999" v-if="!discountRes[index].isZK && !discountRes[index].isLJ">无折扣立减</div>
              <div style="font-size: 12px; color: #999" v-if="discountRes[index].isZK">优惠折扣</div>
            </el-col>
            <el-col :span="3">
              <div style="font-size: 12px; color: #999" v-if="discountRes[index].isLJ">优惠立减</div>
            </el-col>
          </el-row>
        </div>
      </div>

      <slot name="totalAmount">
        <div class="total-amount">
          <el-row class="lesson-list-warp" type="flex" align="middle">
            <el-col :span="12">
            </el-col>
            <el-col :span="12">
              <div class="grid-content" style="text-align:right; font-size:16px;">合计金额 ￥{{applyAll | priceFix}}</div>
            </el-col>
          </el-row>
          <el-row class="material-list-warp" type="flex" align="middle" v-show="!modify">
            <el-col :span="2" style="cursor:pointer">
              <span @click="material= !material">选择教材</span>
            </el-col>
          </el-row>
        </div>
      </slot>
      <div class="material-list" :class="{cloose: material}" :style="{'display': material === true ? 'block' : 'none'}">
        <el-row type="flex">
          <Material-costs ref="materialOtherCost" class="material" :payMoeny="payMoeny" :materialPar="materialPar"></Material-costs>
        </el-row>
      </div>
      <br>
      <div class="apply-submit">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <el-tabs v-model="activeName" @tab-click="handleClick" v-show="payMoeny">
            <el-tab-pane label="普通收款" name="general">
              <div style="width:400px; display: flex; margin-bottom: 10px;">
                <div style="width: 85px;line-height: 30px; padding-right: 10px;">收费方式:
                </div>
                <el-select v-model="applyType" clearable size="mini" placeholder="选择缴费方式" style="width: 200px;">
                  <el-option v-for="(item3, index) in $store.state.PaymentTypeOptions" v-show="item3.code !== '01210'" :key="index" :label="item3.pay_type_name" :value="item3.code"></el-option>
                </el-select>
              </div>
              <div style="width:400px; display: flex; margin-bottom: 10px;">
                <div style="width: 85px;line-height: 30px;padding-right: 10px;">流水号:</div>
                <el-input style="width: 200px;" clearable v-model="orderNo" size="mini" placeholder="请输入对应订单号"></el-input>
              </div>
              <div v-if="material">
                <el-select v-model="chargeItem" size="mini" placeholder="收费项目">
                  <el-option v-for="(item4, index) in $store.state.ChargeProject" :key="index" :label="item4.label" :value="item4.value"></el-option>
                </el-select>
              </div>
            </el-tab-pane>
            <el-tab-pane label="智能POS机" name="intelligence">
              <div style="width:410px; display: flex; margin-bottom: 10px;">
                <div style="width: 85px;line-height: 30px; padding-right: 10px;">选择POS机:</div>
                <el-select v-model="selectedPos" clearable size="mini" placeholder="选择POS机" style="width: 150px; margin-right: 10px;" @visible-change="getPosStatus">
                  <el-option v-for="item in posList" v-if="item.incident === '31000'" :key="item.pos_number" :label="item.pos_number" :value="item.pos_number"></el-option>
                </el-select>
                <el-select v-model="posStatus" clearable size="mini" placeholder="收费方式" style="width: 150px;">
                  <el-option v-for="item in posStatusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </div>
              <div style="width:410px; display: flex; margin-bottom: 10px;">
                <div style="width: 85px;line-height: 30px;padding-right: 10px;">流水号:</div>
                <el-input style="width: 200px;" clearable v-model="posOrderNo" :disabled="!posPayment" size="mini" placeholder="请输入对应订单号"></el-input>
              </div>
              <div v-if="material">
                <el-select v-model="chargeItem" size="mini" placeholder="收费项目">
                  <el-option v-for="(item4, index) in $store.state.ChargeProject" :key="index" :label="item4.label" :value="item4.value"></el-option>
                </el-select>
              </div>
            </el-tab-pane>
          </el-tabs>
          <div style="width: 100%; display: flex; justify-content: flex-end;">
            <div class="applyLeft" v-show="!modify">
              <el-button size="mini" type="primary" @click="notApply" v-show="!payMoeny">稍后再缴</el-button>
              <el-button size="mini" type="primary" @click="payMoeny=!payMoeny" v-show="payMoeny" style="width:88px;">上一步</el-button>
            </div>
            <div class="applyLeft" v-show="!modify">
              <template v-show="payMoeny">
                <el-button size="mini" type="primary" @click="finalPayment" v-if="activeName === 'general' && payMoeny">支付完成</el-button>
                <el-button size="mini" type="primary" @click="payFast" v-else-if="!payMoeny">立即缴费</el-button>
              </template>
              <el-button size="mini" type="primary" v-if="activeName === 'intelligence' && payMoeny &&!posPayment" @click="applyBtn">POS机支付</el-button>
              <el-button size="mini" :type="activeName === 'intelligence' ? 'success' : 'primary'" v-show="posPayment" @click="finalPayment">POS支付完成</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MaterialCosts from "./MaterialCosts.vue";
export default {
  props: {
    modify: {
      type: Boolean,
      default: () => false
    }
  },
  components: {
    MaterialCosts
  },
  data() {
    return {
      gridContentType: "01201", //折扣类型
      gridContentValue: "", //折扣类型后的输入值
      activeName: "general",
      applyAll: 0, //合计金额
      totalPrice: [],
      couponTotalPrice: 0, // 优惠卷总价
      choosePaymentItems: null, //要操作的报名订单列表
      applyType: "01201",
      orderNo: "现金",
      couponList: [], //优惠券列表
      discountRes: [],
      chargeModeList: [],
      oldBuyAttendClasses: [],
      material: false,
      payMoeny: false,
      paymentNo: "",
      chargeItem: "", //收费项目
      discountType: ["02802", "02806", "02807", "02808"],
      reduceType: ["02803", "02805", "02806", "02808"],
      materialPar: {
        orderNo: "现金",
        applyType: "01201",
        paymentNo: "",
        chargeItem: "",
        applyAll: ""
      },
      selectedPos: "",
      posOrderNo: "",
      posPayment: false,
      posList: [],
      posStatus: "",
      posStatusList: [
        {
          value: "32001",
          label: "支付宝付款码"
        },
        {
          value: "32002",
          label: "微信付款码"
        },
        {
          value: "32003",
          label: "银联付款码"
        },
        {
          value: "32004",
          label: "银行卡支付"
        }
      ]
    };
  },
  created() {
    this.choosePaymentItems = this.$store.state.ChoosePaymentItems;
    this.Util.querySysconst(this, "026", this.$store.state.ChargeProject);
    // this.getSignupOrders();
    this.calcWeight();
    this.Util.chargeMode(this);
  },
  mounted() {
    const self = this;
    this.otherApplyAll = this.$refs.materialOtherCost.applyAll;
    this.choosePaymentItems = self.$store.state.ChoosePaymentItems;
    for (let i = 0; i < this.choosePaymentItems.length; i++) {
      this.choosePaymentItems[i].real_price = this.choosePaymentItems[
        i
      ].total_price;
    }
    // 设置优惠卷信息
    // this.couponList = this.$store.state.StudentValidCoupons.map(item => {
    //   let { id, coupon_name, coupon_amount } = item;
    //   return { id, coupon_name, coupon_amount, isActived: false, orderId: "" };
    // });
    // this.choosePaymentItems.forEach((item, index) => {
    //   if (item.order_source === "Android") {
    //     let self = this.couponList.filter(item => item.id === item.coupon_id);
    //   }
    // });
    // this.calcPrice(this.couponList);
  },
  //计算属性
  computed: {
    //相当于过滤器
    choosePaymentItems2() {
      //ChooseClassApply
      const self = this;
      if (!this.$store.state.ChoosePaymentItems) {
        return [];
      }
      return this.$store.state.ChoosePaymentItems.filter(function(d) {
        return d;
      });
    },
    calcTotalPrice() {
      let list = this.$store.state.PaymentClassItems.map(item => {
        item = Object.assign({}, item, {
          discount: 1, //float,折扣
          discountReason: "没有打折", //打折原因
          subtract: 0, //立减金额
          subtractReason: "没有立减", //立减原因
          couponId: null, //优惠券ID
          couponName: "", //优惠券名称
          couponAmount: 0, //优惠券金额
          chargeItem: this.chargeItem
        });
        if (item.orderName === "") {
          item = "";
        }
        return item;
      }).filter(item => item);
      return (
        +this.applyAll.toFixed(2) +
        list.reduce(
          (s, n) => ({ realPayment: +s.realPayment + +n.realPayment }),
          { realPayment: 0 }
        ).realPayment
      );
    }
  },
  watch: {
    couponList: {
      handler(newVal, oldVal) {
        this.calcPrice(newVal);
      },
      deep: true
    },
    orderNo() {
      this.materialPar.orderNo = this.orderNo;
    },
    paymentNo() {
      this.materialPar.paymentNo = this.paymentNo;
    },
    applyType() {
      this.applyType === "01201"
        ? (this.materialPar.orderNo = "现金")
        : (this.materialPar.orderNo = "");
      this.applyType === "01201"
        ? (this.orderNo = "现金")
        : (this.orderNo = "");
      this.materialPar.applyType = this.applyType;
    },
    chargeItem() {
      this.materialPar.chargeItem = this.chargeItem;
    },
    applyAll() {
      this.materialPar.applyAll = this.applyAll;
    }
  },
  filters: {
    priceFix(value) {
      return Number(value).toFixed(2);
    }
  },
  methods: {
    getPosStatus(v) {
      if (!v) return;
      const params = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        posNumber: "", // pos标号
        incident: "", // 状态
        campusId: this.$store.state.orderId // 校区id
      };
      this.$axios
        .post(this.GlobalVal.httpLink.getAllPosStatus, JSON.stringify(params))
        .then(res => {
          this.posList = res.data.data.posStatusList;
        });
    },
    calcWeight() {
      let discountRes = this.discountRes;
      /*
    权重	优先方式	      折扣方式

    00	无优先		        无折扣

    01	无优先		        仅打折
    02	无忧先		        仅立减
    03	无忧先		        仅优惠卷

    14	折扣优先          立减+优惠卷
    24	立减优惠卷优先     立减+优惠卷

    15	折扣优先	        打折+立减
    25	立减优惠卷优先	  打折+立减

    16	折扣优先	        打折+优惠卷
    26	立减优惠卷优先	   打折+优惠卷

    17	折扣优先	        打折+立减+优惠卷
    27	立减优惠卷优先	  打折+立减+优惠卷
    */
      this.choosePaymentItems.forEach((item, index) => {
        discountRes[index] = {};
        discountRes[index].order_id = item.order_id;
        discountRes[index].discount = item.discount ? item.discount * 10 : 10;
        discountRes[index].discount_reason = item.discount_reason;
        discountRes[index].subtract_amount = item.subtract_amount;
        discountRes[index].buy_times = item.buy_times;
        discountRes[index].single_price = item.single_price;
        discountRes[index].subtract_reason = item.subtract_reason;
        discountRes[index].real_payment = item.real_payment;
        discountRes[index].all_price = 0;
        discountRes[index].coupon_price = 0;
        discountRes[index].total_times = item.total_times;
        discountRes[index].total_price = item.class_total_price;
        discountRes[index].isLJ = true;
        discountRes[index].isYHJ = true;
        discountRes[index].isDZ = true;
        switch (item.discount_type) {
          case "02802": // '打折';
            discountRes[index].isLJ = false;
            discountRes[index].isYHJ = false;
            discountRes[index].code = 1;
            break;
          case "02803": // '立减';
            discountRes[index].isYHJ = false;
            discountRes[index].isDZ = false;
            discountRes[index].code = 2;
            break;
          case "02804": // '优惠卷';
            discountRes[index].isLJ = false;
            discountRes[index].isDZ = false;
            discountRes[index].code = 3;
            break;
          case "02805": // '立减＋优惠卷';
            discountRes[index].isDZ = false;
            discountRes[index].code = 4;
            break;
          case "02806": // '打折＋立减';
            discountRes[index].isYHJ = false;
            discountRes[index].code = 5;
            break;
          case "02807": // '打折＋优惠卷';
            discountRes[index].isLJ = false;
            discountRes[index].code = 6;
            break;
          case "02808": // '打折＋立减＋优惠卷';
            discountRes[index].code = 7;
            break;
          default:
            // '无优惠';
            discountRes[index].isLJ = false;
            discountRes[index].isYHJ = false;
            discountRes[index].isDZ = false;
            discountRes[index].code = 0;
        }
        switch (item.discount_priority) {
          case "02901":
            let str = "";
            switch (item.discount_type) {
              case "02802": // '打折';
                str = "仅打折";
                break;
              case "02803": // '立减';
                str = "仅立减";
                break;
              case "02804": // '优惠卷';
                str = "仅优惠卷";
                break;
              default:
                str = "无优惠";
            }
            discountRes[index].code = 0 + "" + discountRes[index].code;
            discountRes[index].discountPriority = str;
            break;
          case "02902":
            discountRes[index].discountPriority = "折扣优先";
            discountRes[index].code = 1 + "" + discountRes[index].code;
            break;
          case "02903":
            discountRes[index].code = 2 + "" + discountRes[index].code;
            discountRes[index].discountPriority = "立减/优惠劵优先";
            break;
        }
        this.lineTotalPrice(discountRes[index].code, discountRes[index]);
      });
    },
    lineTotalPrice(code, line, type) {
      if (type) {
        if (line.discount > 10) line.discount = 10;
        else if (line.discount < 1) line.discount = 1;
      }
      const discount = line.discount / 10;
      const total_price =
        line.total_price -
        (line.total_times - line.buy_times) * line.single_price;

      switch (code) {
        case "00":
          line.all_price = total_price;
          break;
        case "01":
          line.all_price = total_price * discount;
          break;
        case "02":
          line.all_price = total_price - line.subtract_amount;
          break;
        case "03":
          line.all_price = total_price - line.coupon_price;
          break;
        case "14":
        case "24":
          line.all_price =
            total_price - line.coupon_price - line.subtract_amount;
          break;
        case "15":
          line.all_price = total_price * discount - line.subtract_amount;
          break;
        case "25":
          line.all_price = (total_price - line.subtract_amount) * discount;
          break;
        case "16":
          line.all_price = total_price * discount - line.coupon_price;
          break;
        case "26":
          line.all_price = (total_price - line.coupon_price) * discount;
          break;
        case "17":
          line.all_price =
            total_price * discount - line.coupon_price - line.subtract_amount;
          break;
        case "27":
          line.all_price =
            (total_price - line.coupon_price - line.subtract_amount) * discount;
          break;
        default:
      }
      // line.all_price = line.all_price.toFixed(2);
      this.applyAll = this.discountRes.reduce(
        (p, n) => {
          return { all_price: p.all_price + n.all_price };
        },
        { all_price: 0 }
      ).all_price;
      this.$emit("getRes", this.discountRes);
    },
    calcDiscount({ val = 0, index = 0, isZK = false }) {
      let couponPrice = 0;
      if (
        this.choosePaymentItems[index].order_source !==
        this.GlobalVal.constants.source
      ) {
        couponPrice = this.choosePaymentItems[index].coupon_amount;
      } else {
        couponPrice =
          this.couponList
            .map(item => {
              if (item.orderId === this.discountRes[index].order_id) {
                return item.coupon_amount;
              }
            })
            .filter(item => item)[0] || 0;
      }
      if (isZK) {
        if (val < 0) {
          val = 0;
          this.discountRes[index].discount = 0;
        } else if (val > 10) {
          val = 10;
          this.discountRes[index].discount = 10;
        }
        this.discountRes[index].all_price =
          this.discountRes[index].total_price * (val ? val / 10 : 1) -
          this.discountRes[index].subtract_amount -
          couponPrice;
      } else {
        if (val < 0) {
          val = 0;
          this.discountRes[index].subtract_amount = 0;
        }
        this.discountRes[index].all_price =
          this.discountRes[index].total_price *
            (this.discountRes[index].discount
              ? this.discountRes[index].discount / 10
              : 1) -
          val -
          couponPrice;
      }

      if (!this.totalPrice.length) {
        this.totalPrice.push({
          orderId: this.discountRes[index].order_id,
          price: +this.discountRes[index].all_price
        });
      } else {
        if (
          !this.totalPrice.some(
            val => val.orderId === this.discountRes[index].order_id
          )
        ) {
          this.totalPrice.push({
            orderId: this.discountRes[index].order_id,
            price: +this.discountRes[index].all_price
          });
        } else {
          this.totalPrice[index].price = this.discountRes[index].all_price;
        }
      }
      this.applyAll = this.totalPrice
        .map(item => item.price)
        .reduce((item, next) => +item + +next, 0);
    },
    calcPrice(val) {
      val = val.filter(item => item.orderId);
      let couponAmount =
        this.$store.state.ChoosePaymentItems.map(item => {
          if (item.order_source !== "PC" && item.coupon_id) {
            return item.coupon_amount;
          }
        }).reduce((c, n) => +c + +n, 0) || 0;
      //this.couponTotalPrice = val.map(item=>+item.coupon_amount).reduce((item, next) => item + next, couponAmount);
    },
    dropClick(data, index, row) {
      let addNum = 0;
      if (data[0].orderId !== row.order_id && !data[0].orderId) {
        this.couponList = this.couponList.map(item => {
          if (item.orderId === row.order_id && item.id !== data[0].id) {
            item.orderId = "";
            item.isActived = false;
          }
          return item;
        });
        data[0].isActived = true;
        data[0].orderId = data[1];
        addNum = data[0].coupon_amount;
      } else {
        if (data[0].orderId === row.order_id) {
          data[0].isActived = false;
          data[0].orderId = "";
          addNum = data[0].coupon_amount;
        } else {
          return false;
        }
      }
      row.coupon_price = addNum;
      if (!data[0].isActived) {
        row.coupon_price = 0;
      }
      this.lineTotalPrice(row.code, row);
    },
    applyBtn() {
      const amount = this.calcTotalPrice;
      if (!this.selectedPos) {
        this.$message.error("请选择POS机!");
        return;
      } else if (!this.posStatus) {
        this.$message.error("请选择POS机收费方式!");
        return;
      }
      const params = {
        amount,
        payType: this.posStatus,
        posNumber: this.selectedPos,
        dateLength: new Date().getTime()
      };
      const lockScreen = this.$Loading("请及时在POS机上进行支付操作", 60000);
      this.$axios
        .post(this.GlobalVal.httpLink.sendPayByPos, JSON.stringify(params))
        .then(res => {
          if (res.data.code === "10000") {
            params.dateLength += res.data.data.uuId;
            let SSE = new EventSource(
              this.GlobalVal.httpLink.sendPayByPosResult +
                "?staffId=" +
                JSON.parse(window.sessionStorage.getItem("staff")).staffId +
                "&uuId=" +
                params.dateLength
            );
            SSE.onmessage = event => {
              const { isSuccess, msg } = JSON.parse(event.data);
              lockScreen.async.catch(() => {
                SSE.close();
              });
              if (isSuccess === "00001" || isSuccess === "00002") {
                lockScreen.close();
                SSE.close();
                if (isSuccess === "00001") {
                  this.posOrderNo = msg;
                  this.posPayment = true;
                  this.$message.success("收款成功，请点击支付完成");
                } else {
                  this.$message.error(msg);
                }
              }
            };
          } else {
            this.$message.error("已与支付系统断开连接!");
          }
        })
        .catch(() => {
          this.$message.error("已与支付系统断开连接!");
        });
    },
    finalPayment() {
      const amount = this.calcTotalPrice;
      let list = this.$store.state.PaymentClassItems.map(item => {
        item = Object.assign({}, item, {
          discount: 1, //float,折扣
          discountReason: "没有打折", //打折原因
          subtract: 0, //立减金额
          subtractReason: "没有立减", //立减原因
          couponId: null, //优惠券ID
          couponName: "", //优惠券名称
          couponAmount: 0, //优惠券金额
          chargeItem: this.chargeItem
        });
        if (item.orderName === "") {
          item = "";
        }
        return item;
      }).filter(item => item);
      if (this.material) {
        if (
          this.chargeItem === "" &&
          this.$store.state.PaymentClassItems.length > 0
        ) {
          this.$message.error("请选择收费项目!");
          return;
        }
      }
      let objData = {
        source: this.GlobalVal.constants.source,
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        totalPayment: amount, //&& this.applyAll.toFixed(1),  //总支付金额
        paymentType: this.posPayment ? this.posStatus : this.applyType, //支付方式：包括  现金，微信，	支付宝，银行卡，POS机_储蓄卡，POS机-信用卡，POS机-微信，POS机-支付宝。不同的支付方式有不同的手续费
        tradeno: this.posPayment ? this.posOrderNo : this.orderNo, //业务流水号，POS机号
        paymentItems: [], //缴费订单
        productPaymentItems: list
      };
      if (
        !objData.paymentType &&
        this.$store.state.PaymentClassItems.map(item => item.orderName)
      ) {
        this.$message("请选择支付方式");
        return;
      }
      if (!objData.tradeno && objData.paymentType !== "01201") {
        this.$message("请输入订单编号");
        return;
      }
      if (this.discountRes.some(item => item.all_price < 0)) {
        this.$message.error("订单实际金额有误，请修改");
        return;
      }
      this.discountRes.forEach((resItem, i) => {
        let obj = {
          orderId: null, //学生报名表id
          realPrice: null, //float,应收款，即总价减去优惠券再减去折扣后的价钱
          realPayment: null, //float，实收款
          discount: (resItem.discount && resItem.discount / 10) || 1, //float,折扣
          discountReason: resItem.discount_reason || "", //打折原因
          subtract: resItem.subtract_amount || 0, //立减金额
          subtractReason: resItem.subtract_reason || "", //立减原因
          couponId: 0, //优惠券ID
          couponName: "", //优惠券名称
          couponAmount: 0, //优惠券金额：
          //chargeItem:null,//收费项目：课程，教材，练习册等
          payTime: null
        };
        let selfCouponList = this.couponList.filter(
          item => item.orderId === resItem.order_id
        );
        let couponAmount = selfCouponList[0]
          ? selfCouponList[0].coupon_amount
          : 0;
        obj.orderId = resItem.order_id;

        if (
          this.$store.state.ChoosePaymentItems[i].order_source ===
          this.GlobalVal.constants.source
        ) {
          obj.couponId = (selfCouponList[0] && selfCouponList[0].id) || null;
          obj.couponName =
            (selfCouponList[0] && selfCouponList[0].coupon_name) || "";
          obj.couponAmount =
            (selfCouponList[0] && selfCouponList[0].coupon_amount) || 0;
          obj.realPrice = resItem.all_price;
          obj.realPayment = resItem.all_price;
        } else {
          obj.couponId = (resItem && resItem.coupon_id) || null;
          obj.couponName = (resItem && resItem.coupon_name) || "";
          obj.couponAmount = (resItem && resItem.coupon_amount) || 0;
          obj.realPrice = resItem.all_price;
          obj.realPayment = resItem.all_price;
        }
        objData.paymentItems.push(obj);
      });
      let loadingInstance = this.$Loading();
      this.$axios
        .post(this.GlobalVal.httpLink.payment, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              this.paymentNo = res.data.paymentNo;
              this.$store.commit("setChoosePaymentItems", []);
              this.$store.commit("isPayFeesCommit", true);
              // if (
              //   this.$store.state.PaymentClassItems.map(item => item.orderName)
              // ) {
              //   this.$refs.materialOtherCost.applyBtn(res.data.paymentNo);
              // }
              this.$nextTick(() => {
                loadingInstance.close();
              });
              this.$message({
                type: "success",
                message: "缴费成功!"
              });
              let toHref = "";
              switch (res.data.orderStatus) {
                case "01004":
                  toHref =
                    "/studentInfo/payFinish?sid=" + this.$route.query.sid;
                  break;
                case "01005":
                  toHref =
                    "/studentInfo/attendClass?sid=" + this.$route.query.sid;
                  break;
              }
              this.$router.push({
                path: toHref,
                replace: true
              });
            } else {
              this.$message({
                type: "error",
                message: res.data.errmsg
              });
              this.$nextTick(() => {
                loadingInstance.close();
              });
            }
          },
          res => {
            console.error(res);
            this.$message({
              type: "error",
              message: "操作失败"
            });
          }
        );
    },
    delChooseLesson(index, orderId) {
      this.couponList = this.couponList.map(item => {
        if (item.orderId === orderId) {
          item.isActived = false;
          item.orderId = "";
        }
        return item;
      });
      let chooseClassObj = this.$store.state.ChoosePaymentItems;
      chooseClassObj.splice(index, 1);
      if (this.discountRes.length) {
        this.discountRes.splice(index, 1);
        this.totalPrice = [];
        this.discountRes.forEach(item => {
          this.totalPrice.push({
            orderId: item.order_id,
            price: item.all_price
          });
        });
      }

      this.applyAll = this.totalPrice.length
        ? this.totalPrice
            .map(item => item.price)
            .reduce((item, next) => +item + +next, 0)
        : 0;

      this.$store.commit("setChoosePaymentItems", chooseClassObj);
      /*   for(let i = 0; i<$store.state.ChooseClassApply.length; i++){
                    applyAll += parseFloat(this.choosePaymentItems[i].real_price)
                }
                this.applyAll = applyAll;*/
      //this.$message("已报名的订单暂时不能删除")
      //计算总价钱
      // let applyAll = 0;
      // for(let i = 0; i<this.choosePaymentItems.length; i++){
      //     applyAll += parseFloat(this.choosePaymentItems[i].real_price)
      // }
      //this.applyAll = applyAll;
    },
    //折扣类型变化
    changeOption(index) {
      if (this.choosePaymentItems[index].gridContentType === "3") {
        this.choosePaymentItems[index].showCoupon = true;
      } else {
        this.choosePaymentItems[index].showCoupon = false;
      }
      if (this.choosePaymentItems[index].gridContentType === "1") {
        this.choosePaymentItems[index].gridContentValue = 1;
      } else if (this.choosePaymentItems[index].gridContentType === "2") {
        this.choosePaymentItems[index].gridContentValue = 0;
      }
      this.choosePaymentItems[index].real_price = this.choosePaymentItems[
        index
      ].total_price;
    },
    //折扣后面的价格输入变化
    changeInput(index) {
      if (!this.choosePaymentItems[index].gridContentType) {
        this.$message("请先选择优惠方式");
        this.choosePaymentItems[index].gridContentValue = 0;
        return;
      } else if (this.choosePaymentItems[index].gridContentType === "1") {
        //打折
        if (
          parseFloat(this.choosePaymentItems[index].gridContentValue) > 1 ||
          parseFloat(this.choosePaymentItems[index].gridContentValue) <= 0
        ) {
          this.$message("打折的优惠参数请输入为0~1之间的数");
          this.choosePaymentItems[index].gridContentValue = 1;
          return;
        } else {
          this.choosePaymentItems[index].real_price =
            parseFloat(
              this.choosePaymentItems[index].total_price
                ? this.choosePaymentItems[index].total_price
                : 0
            ) *
            parseFloat(
              this.choosePaymentItems[index].gridContentValue
                ? this.choosePaymentItems[index].gridContentValue
                : 0
            );
        }
      } else if (this.choosePaymentItems[index].gridContentType === "2") {
        //立减
        if (
          parseFloat(this.choosePaymentItems[index].gridContentValue) >
          parseFloat(this.choosePaymentItems[index].total_price)
        ) {
          this.choosePaymentItems[
            index
          ].gridContentValue = this.choosePaymentItems[index].total_price;
          this.choosePaymentItems[index].real_price = 0;
        } else {
          this.choosePaymentItems[index].real_price =
            parseFloat(
              this.choosePaymentItems[index].total_price
                ? this.choosePaymentItems[index].total_price
                : 0
            ) -
            parseFloat(
              this.choosePaymentItems[index].gridContentValue
                ? this.choosePaymentItems[index].gridContentValue
                : 0
            );
        }
      }
      this.choosePaymentItems[index].real_price = this.choosePaymentItems[
        index
      ].real_price;
      //计算总价钱
      // let applyAll = 0;
      // for(let i = 0; i<this.choosePaymentItems.length; i++){
      //     applyAll += parseFloat(this.choosePaymentItems[i].real_price)
      // }
      // this.applyAll = applyAll;
    },
    notApply() {
      this.$store.commit("setChooseClassApply", []);
      this.$store.commit("isPayFeesCommit", true);
      this.$emit("handleClosed");
    },
    payFast() {
      if (this.applyAll < 0) {
        this.$message.error("订单金额有误");
        return;
      }
      this.payMoeny = !this.payMoeny;
      if (this.material) {
        if (this.$store.state.PaymentClassItems.length > 0) {
          this.payMoeny = true;
          this.$store.state.PaymentClassItems.forEach((item, index) => {
            if (item.orderName === "") {
              this.$message.error("第" + (index + 1) + "项为空");
              this.payMoeny = false;
            }
          });
        }
      }
    },
    timeSumClick(index) {
      console.log(this.choosePaymentItems[index]);
      let objData = {
        source: "PC",
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        student_id: this.choosePaymentItems[index].student_id, //学生id
        class_id: this.choosePaymentItems[index].class_id,
        order_id: this.choosePaymentItems[index].order_id
      };
      this.$axios
        .post(
          this.GlobalVal.httpLink.listStudentSignupAttendClass,
          JSON.stringify(objData)
        )
        .then(
          ({ data }) => {
            if (data.code === "10000") {
              this.oldBuyAttendClasses = data.data.oldBuyAttendClasses;
            } else {
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
</script>
