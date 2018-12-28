<template>
    <div style="width:100%; height:680px; overflow-y:auto;padding-right:20px;">
        <div class="student-info-box">
            <div>
                <div>
                    <span>姓名:</span> {{rowInfo.student_name}}</div>
                <div>
                    <span>学号: </span>{{rowInfo.student_no}}</div>
            </div>
            <div>
                <div>
                    <span>校区：</span>{{rowInfo.school_name}}
                    <span> 班级名称：</span> {{rowInfo.class_name}}</div>
                <div>
                    <span>上课周：</span>{{rowInfo.class_week_day}}
                    <span>上课时段：</span>{{rowInfo.time_name}} </div>
            </div>
        </div>
        <div class="keci-list">
            <ul>
                <li v-for="(item, index) in getRefundInfoRes.stuCheckinItem" :key="index" :class="{finish: item.roll_call_status === '01702' || item.roll_call_status === '01703' ||item.is_mend_register===true}">
                    <p style="margin-top:15px;"></p>
                    {{item.class_sequence
                    < 10 ? '0' + item.class_sequence : item.class_sequence}} </li>
            </ul>
        </div>
        <div class="line"></div>
        <el-form :model="ruleForm" :rules="rules" size="mini" ref="ruleForm" label-width="100px" style="color:#333333;">
            <el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="签到次数">
                            <span>{{getRefundInfoRes.checkinNum}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="购买次数">
                            <span>{{getRefundInfoRes.buyTimes}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="报名金额">
                            <span>{{getRefundInfoRes.signupOrder.total_price}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="退课次数">
                            <el-input style="width: 100%;" type="text" placeholder="请输入内容" v-model="refundTimes">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="实付金额">
                            <span>{{getRefundInfoRes.signupOrder.real_payment}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="课次费">
                            <span>{{(getRefundInfoRes.singlePrice).toFixed(2)}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="优惠类型">
                            <span>{{liberalType}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="课节退费">
                            <span>{{(getRefundInfoRes.singlePrice*refundTimes).toFixed(2)}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="额外退费">
                            <el-input style="width: 80px;" type="number" placeholder="请输入内容" @mousewheel.native.prevent="(() => false)" v-model="otherRefundAmount">
                            </el-input>
                            <el-input style="width: 170px;" type="text" placeholder="请输入内容" v-model="other_refund_remark">
                                <template slot="prepend">备注</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="退费总额">
                            <span>{{classRefundAmount}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="退费方式" prop="refundPayType">
                            <el-select v-model="ruleForm.refundPayType" style="width:100%">
                                <el-option label="银行卡" value="01204"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="line"></div>
                <el-row>
                    <el-col :span="7">
                        <el-form-item label="姓名" prop="bankCardPayee">
                            <el-input type="text" placeholder="请输入内容" v-model="ruleForm.bankCardPayee">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-input type="text" placeholder="请输入××银行××支行" size="mini" style="margin-left:10px" v-model="ruleForm.bankName"></el-input>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="银行卡号" prop="bankcardNo" style="position: relative;">
                            <el-input style="width: 100%;" type="text" placeholder="请输入内容" v-model="ruleForm.bankcardNo" @blur="getBankName">
                            </el-input>
                            <div style="position: absolute; right: -130px; top: 0; width: 120px;">
                                <img v-if="bankCode" :src="'https://apimg.alipay.com/combo.png?d=cashier&t='+bankCode">
                                <span v-else style="color: #ccc; font-size: 13px;">无法识别该银行卡</span>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- <el-row>
                    <el-col :span="12">
                        <el-form-item label="支付宝账号">
                            <el-input
                                    style="width: 100%;"
                                    type="text"
                                    placeholder="请输入内容"
                                    v-model="ruleForm.alipayAcount">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="微信账号">
                            <el-input
                                    style="width: 100%;"
                                    type="text"
                                    placeholder="请输入内容"
                                    v-model="ruleForm.wechatAcount">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>-->
                <el-form-item label="退课原因">
                    <el-input style="width: 100%;" type="textarea" :rows="2" placeholder="请输入内容" v-model="ruleForm.refundReason">
                    </el-input>
                </el-form-item>
            </el-row>
            <el-form-item style="display: flex; justify-content: center; margin-left: -100px;">
                <el-button type="primary" v-if="($store.state.code && $store.state.code.includes('010104'))" @click="submitMoneyForm('ruleForm', 1)" style="width: 120px;">超额退费</el-button>
                <el-button type="primary" @click="submitMoneyForm('ruleForm', 0)" style="width: 120px;">退费</el-button>
                <el-button type="primary" @click="closeCancle" style="width: 120px">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
  props: ["rowInfo", "getRefundInfoRes"],
  data() {
    return {
      otherRefundAmount: null,
      classRefundAmount: "",
      bankCode: "",
      refundTimes: "",
      ruleForm: {
        refundPayType: "01204"
      },
      other_refund_remark: "",
      rules: {
        class_name: [
          { required: true, message: "请输入班级名称", trigger: "blur" }
        ],
        refundPayType: [
          { required: true, message: "请选择退费方式", trigger: "blur" }
        ],
        bankCardPayee: [
          { required: true, message: "请输入姓名", trigger: "blur" }
        ],
        bankcardNo: [
          { required: true, message: "请输入银行卡号", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    /*  refundTimes(){
                return this.getRefundInfoRes.buyTimes - this.getRefundInfoRes.checkinNum
            }, */
    liberalType() {
      return this.Util.GetLabelForValue(
        this.$store.state.LiberalTypeOptions,
        this.getRefundInfoRes.liberalType
      );
    }
  },
  watch: {
    getRefundInfoRes: {
      handler() {
        this.refundTimes =
          this.getRefundInfoRes.buyTimes - this.getRefundInfoRes.checkinNum < 0
            ? (this.refundTimes = 0)
            : this.getRefundInfoRes.buyTimes - this.getRefundInfoRes.checkinNum;
      },
      deep: true
    },
    refundTimes: function() {
      this.returnSinglePrice =
        this.getRefundInfoRes.signupOrder.single_price * this.refundTimes;
      this.classRefundAmount = (
        this.getRefundInfoRes.singlePrice * this.refundTimes +
        this.otherRefundAmount * 1
      ).toFixed(2);
      if (
        this.classRefundAmount > this.getRefundInfoRes.signupOrder.real_payment
      ) {
        this.classRefundAmount = this.getRefundInfoRes.signupOrder.real_payment;
      }
      if (this.refundTimes > this.getRefundInfoRes.buyTimes) {
        this.$message({
          type: "error",
          message: "退款次数大于购买次数"
        });
        this.refundTimes = this.getRefundInfoRes.buyTimes;
        return;
      }
    },
    otherRefundAmount: function() {
      this.classRefundAmount = (
        this.getRefundInfoRes.singlePrice * this.refundTimes +
        this.otherRefundAmount * 1
      ).toFixed(2);
    }
  },
  mounted() {
    this.otherRefundAmount = Number(this.otherRefundAmount);
    this.Util.querySysconst(this, "025", this.$store.state.LiberalTypeOptions);
    this.refundTimes =
      this.getRefundInfoRes.buyTimes - this.getRefundInfoRes.checkinNum < 0
        ? (this.refundTimes = 0)
        : this.getRefundInfoRes.buyTimes - this.getRefundInfoRes.checkinNum;
  },
  methods: {
    getBankName() {
      this.$axios
        .get(
          "/bank/validateAndCacheCardInfo.json?_input_charset=utf-8&cardNo=" +
            this.ruleForm.bankcardNo +
            "&cardBinCheck=true"
        )
        .then(res => {
          this.bankCode = res.data.bank;
        });
    },
    submitMoneyForm(ruleForm, qx = false) {
      const self = this;
      if (+this.otherRefundAmount !== 0) {
        if (!this.other_refund_remark) {
          this.$message.error("额外退费必须填写备注！");
          return;
        } else if (
          +this.refundTimes !==
          this.getRefundInfoRes.signupOrder.buy_times -
            this.getRefundInfoRes.checkinNum
        ) {
          this.$message.error("额外退费不为0时，退费课次必须等于未上课次！");
          return;
        }
      }
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          if (this.liberalType == "买赠优惠") {
            this.ruleForm.liberalType = "02501";
          } else if (this.liberalType == "均价优惠") {
            this.ruleForm.liberalType = "02502";
          }
          let objData = {
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            source: "PC",
            orderId: this.rowInfo.order_id, //订单编号
            liberalType: this.ruleForm.liberalType, //优惠类型，02501：买赠优惠， 02502：均价优惠
            refundSinglePrice: this.getRefundInfoRes.singlePrice, //退款时的单价，与实付价，买赠优惠，均价优惠有关，不是订单表中的单价
            checkinNum: this.getRefundInfoRes.checkinNum, //签到次数
            buyTimes: this.getRefundInfoRes.buyTimes, //购买次数
            refundTimes: this.refundTimes, //退课次数
            classRefundAmount: (
              this.getRefundInfoRes.singlePrice * this.refundTimes
            ).toFixed(6), //退课价钱
            otherRefundAmount: this.otherRefundAmount || 0, //额外退费
            other_refund_remark: this.other_refund_remark,
            refundReason: this.ruleForm.refundReason, //退款原因
            refundPayType: this.ruleForm.refundPayType, //退费支付方式
            bankCardPayee: this.ruleForm.bankCardPayee, //银行卡户主
            bankcardNo: this.ruleForm.bankcardNo, //银行卡帐号
            alipayAcount: "", //支付宝帐号
            wechatAcount: "", //微信帐号
            isexcessRefund: qx ? true : false, // 是否超额退费
            bankName: this.ruleForm.bankName
          };
          let loadingInstance = this.$Loading();
          this.$axios
            .post(this.GlobalVal.httpLink.refund, JSON.stringify(objData))
            .then(
              res => {
                if (res.data.code === "10000") {
                  this.classMoneyLayer = false;
                  self.$message({
                    type: "success",
                    message: "退费成功"
                  });
                  this.$router.push({
                    path: "/studentInfo/refundInfo",
                    query: {
                      sid: this.$route.query.sid
                    }
                  });
                  loadingInstance.close();
                  this.$emit("dialogVisible");
                  this.$emit("getData");
                } else {
                  self.$message({
                    type: "error",
                    message: res.data.errmsg
                  });
                }
                loadingInstance.close();
              },
              res => {
                this.$message("请求失败");
                loadingInstance.close();
              }
            );
        } else {
          return false;
        }
      });
    },
    closeCancle() {
      this.$emit("dialogVisible");
      this.$emit("getData");
    }
  }
};
</script>
<style scoped>
/*分割线*/
.line {
  width: 100%;
  height: 1px;
  background: #cccccc;
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>
