<template>
  <div class="apply-refund-info">
    <div class="apply-user-info">
      <div>
        <p>{{selectedRow.student_name}}</p>
      </div>
      <div>
        <p>
          <span>所属校区</span>{{selectedRow.organ_name}}</p>
        <p>
          <span>联系电话</span>{{selectedRow.student_mobile}}</p>
      </div>
      <slot name="refundStatus" :row="selectedRow"></slot>
    </div>
    <div class="sign-up-refund mt20">
      <h4>报名退费</h4>
      <el-table :data="signUpRefund" border style="width: 100%">
        <el-table-column label="校区">
          <template slot-scope="scope">
            {{classTimesInfo[scope.row.now_order_id].signupOrder.organ_name}}
          </template>
        </el-table-column>
        <el-table-column label="班级名称" width="180">
          <template slot-scope="scope">
            {{classTimesInfo[scope.row.now_order_id].signupOrder.class_name}}
          </template>
        </el-table-column>
        <el-table-column label="财务主体" width="180">
          <template slot-scope="scope">
            {{classTimesInfo[scope.row.now_order_id].signupOrder.finance_name}}
          </template>
        </el-table-column>
        <el-table-column label="购买/总课次" width="105">
          <template slot-scope="scope">
            {{classTimesInfo[scope.row.now_order_id].signupOrder.buy_times + ' / ' + classTimesInfo[scope.row.now_order_id].signupOrder.total_times}}
          </template>
        </el-table-column>
        <el-table-column label="退费课次" width="85">
          <template slot-scope="scope">
            <el-popover v-model="selectTimesVisible[scope.$index]" placement="bottom" width="540" trigger="click" @show="selectTimesShow(scope.row)">
              <div class="refund-keci-list">
                <ul>
                  <li v-for="(item, index) in classTimesInfo[scope.row.now_order_id].stuCheckinItem" :key="index" :class="{finish: item.roll_call_status === '01702' || item.roll_call_status === '01703' || item.is_mend_register === true || item.isattend === 'f'}">
                    {{item.class_sequence
                    < 10 ? '0' + item.class_sequence : item.class_sequence}}</li> </ul> </div> <div v-if="!review" class="refund-times-select">
                      <p>
                        <span>课次单价</span>￥{{classTimesInfo[scope.row.now_order_id].singlePrice | price2Fixed}}</p>
                      <div>
                        <el-input type="number" placeholder="请输入退课次数" v-model="selectTimesRow[scope.$index].refund_num" size="mini" @mousewheel.native.prevent="() => false">
                          <template slot="prepend">退课次数</template>
                        </el-input>
                        <div class="el-input el-input--mini el-input-group el-input-group--prepend">
                          <span style="font-size: 12px; padding: 0px 31px 0 21px;">课节退费</span>￥{{classTimesInfo[scope.row.now_order_id].singlePrice * selectTimesRow[scope.$index].refund_num | price2Fixed}}</div>
                        <el-input type="number" placeholder="请输入额外退费" v-model="selectTimesRow[scope.$index].other_price" size="mini" @mousewheel.native.prevent="() => false">
                          <template slot="prepend">额外退费</template>
                        </el-input>
                        <el-input placeholder="请输入额外退费备注" v-model="selectTimesRow[scope.$index].other_refund_remark" size="mini" :disabled="+selectTimesRow[scope.$index].other_price === 0">
                          <template slot="prepend">退费备注</template>
                        </el-input>
                      </div>
                      <el-button type="primary" size="mini" @click="savedOtherOptions(scope.row, scope.$index)">保存</el-button>
              </div>
              <el-button type="text" slot="reference" @click="selectTimesVisible[scope.$index] = !selectTimesVisible[scope.$index]">
                {{orderList.find(item=>item.now_order_id === scope.row.now_order_id)[review ? "refund_times" : "refund_num"]}}
              </el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="应付金额" width="100">
          <template slot-scope="scope">
            ￥{{classTimesInfo[scope.row.now_order_id].signupOrder.total_price | price2Fixed}}
          </template>
        </el-table-column>
        <el-table-column label="实付金额" width="100">
          <template slot-scope="scope">
            ￥{{classTimesInfo[scope.row.now_order_id].signupOrder.real_payment | price2Fixed}}
          </template>
        </el-table-column>
        <el-table-column label="转入金额" width="100">
          <template slot-scope="scope">
            ￥{{classTimesInfo[scope.row.now_order_id].signupOrder.turn_amount | price2Fixed}}
          </template>
        </el-table-column>
        <el-table-column label="课次退费" width="100">
          <template slot-scope="scope">
            <!-- {{orderList[scope.$index]}} -->
            ￥{{(review ? classTimesInfo[scope.row.now_order_id].signupOrder.refund_times : orderList[scope.$index].refund_num) * classTimesInfo[scope.row.now_order_id].singlePrice | price2Fixed}}
          </template>
        </el-table-column>
        <el-table-column label="额外退费" width="100">
          <template slot-scope="scope">
            ￥{{scope.row[review ? "other_refund_amount" : "other_price"] ? (scope.row[review ? "other_refund_amount" : "other_price"].toFixed(2)) : "0.00"}}
          </template>
        </el-table-column>
        <el-table-column label="备注" width="180">
          <template slot-scope="scope">
            {{scope.row.other_refund_remark}}
          </template>
        </el-table-column>
        <el-table-column label="退费总额" width="100">
          <template slot-scope="scope">
            ￥{{scope.row[review ? "apply_refund_amount" : "refund_total_price"] | price2Fixed}}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="other-refund mt20">
      <h4>其他退费</h4>
      <el-table :data="otherRefund" border style="width: 100%">
        <el-table-column label="校区">
          <template slot-scope="scope">
            {{selectedRow.organ_name}}
          </template>
        </el-table-column>
        <el-table-column prop="order_name" label="收费内容">
        </el-table-column>
        <el-table-column prop="product_number" label="数量">
        </el-table-column>
        <el-table-column label="单价">
          <template slot-scope="scope">
            ￥{{scope.row.single_price | price2Fixed}}
          </template>
        </el-table-column>
        <el-table-column label="应付金额">
          <template slot-scope="scope">
            ￥{{scope.row.total_price | price2Fixed}}
          </template>
        </el-table-column>
        <el-table-column label="实付金额">
          <template slot-scope="scope">
            ￥{{scope.row.real_payment | price2Fixed}}
          </template>
        </el-table-column>
        <el-table-column label="退费数量">
          <template slot-scope="scope">
            <template v-if="review">
              {{scope.row.refund_product_number}}
            </template>
            <template v-else>
              <el-input-number size="mini" style=" width: 90px; line-height: 24px;" v-model="scope.row.refund_number" :min="1" :max="scope.row.product_number" @change="otherTotalRefundPrice(scope.row)"></el-input-number>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="退费总额" width="150">
          <template slot-scope="scope">
            <template v-if="review">
              {{scope.row.pro_refund_amount | price2Fixed}}
            </template>
            <template v-else>
              <el-input-number size="mini" style=" width: 130px; line-height: 24px;" v-model="scope.row.realRefundAmount" :min="0" :max="scope.row.maxRefundPrice"></el-input-number>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="refund-total mt20">
      <!-- <div>
        <h4>优惠类型</h4>
        <p>{{refundFormInfo.liberalType | fixStatus($store.state.LiberalTypeOptions)}}</p>
      </div> -->
      <el-form v-if="!review" :inline="true" :model="refundFormInfo" label-position="right" ref="refundFormInfo" :rules="rules">
        <div>
          <el-form-item label="退费方式" prop="refundPayType">
            <el-select v-model="refundFormInfo.refundPayType" placeholder="请选择" size="mini" style="width: 178px;">
              <el-option label="银行卡" value="01204"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="退费原因">
            <el-select v-model="refundFormInfo.refundReason" placeholder="请选择" size="mini" style="width: 178px;">
              <el-option v-for="(item, index) in $store.state.refundReason" :key="index" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户姓名" prop="bankCardPayee">
            <el-input v-model="refundFormInfo.bankCardPayee" placeholder="请输入姓名" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="银行名称">
            <el-input v-model="refundFormInfo.bankName" placeholder="请输入××银行××支行" size="mini"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="银行卡号" prop="bankcardNo" style="position: relative; width: 400px;">
            <el-input style="width: 100%;" v-model="refundFormInfo.bankcardNo" placeholder="请输入内容" @blur="getBankName" size="mini">
            </el-input>
            <div style="position: absolute; right: -130px; top: 3px; width: 120px;">
              <img v-if="bankCode" :src="'https://apimg.alipay.com/combo.png?d=cashier&t='+bankCode">
              <span v-else style="color: #ccc; font-size: 13px;">无法识别该银行卡</span>
            </div>
          </el-form-item>
        </div>
      </el-form>
      <div>
        <div>
          <span>报名退费</span>
          <h4>合计</h4>
          <b>￥{{SRTotalPrice | price2Fixed}}</b>
        </div>
        <div>
          <span>其他退费</span>
          <h4>合计</h4>
          <b>￥{{ORTotalPrice | price2Fixed}}</b>
        </div>
        <div>
          <span></span>
          <h4>退费合计</h4>
          <b>￥{{allTotalPrice | price2Fixed}}</b>
        </div>
      </div>
    </div>
    <slot name="info" :info="selectedRow"></slot>
    <div style="display: flex; justify-content: center;">
      <slot name="buttons">
        <!-- <el-button type="warning" v-if="($store.state.code && $store.state.code.includes('010104'))" @click="submitMoneyForm('refundFormInfo', 1)" style="width: 120px;">超额退费</el-button> -->
        <el-button type="primary" @click="submitMoneyForm('refundFormInfo', 0)" style="width: 120px; margin: 0 15px;">退费</el-button>
      </slot>
      <div v-if="selectedRow.refund_status === '02003' && $route.path === '/queryMoney' && $store.state.code.includes('030304')" style="margin-right: 20px;">
        <el-button type="danger" style="width: 120px" @click="statusReset">重置</el-button>
      </div>
      <el-button type="info" @click="$emit('closed')" style="width: 120px">{{review ? "关闭" : "取消"}}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    orderList: {
      type: Array,
      default: () => []
    },
    selectedRow: {
      type: Object,
      default: () => {}
    },
    review: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      signUpRefund: [],
      otherRefund: [],
      classTimesInfo: {},
      selectTimesVisible: [],
      selectTimesRow: [],
      bankCode: "",
      refundFormInfo: {
        refundPayType: "01204",
        bankCardPayee: "",
        bankName: "",
        bankcardNo: "",
        refundReason: ""
      },
      rules: {
        refundPayType: [
          { required: true, message: "请选择退费方式", trigger: "blur" }
        ],
        bankCardPayee: [
          { required: true, message: "请输入姓名", trigger: "blur" }
        ],
        bankcardNo: [
          { required: true, message: "请输入银行卡号", trigger: "blur" },
          { pattern: /^\d{10,}$/, message: "银行卡号不正确", trigger: "blur" }
        ]
      }
    };
  },
  filters: {
    price2Fixed(val) {
      return val ? val.toFixed(2) : val;
    },
    fixStatus(code, status) {
      const { label } = status.find(item => item.value === code) || {};
      return label || "无";
    }
  },
  watch: {
    orderList: {
      handler() {
        this.signUpRefund = [];
        this.otherRefund = [];
        this.selectTimesRow = [];
        const events = [];
        const loading = this.$Loading();
        this.orderList.forEach(item => {
          if (!item.class_name) {
            const otherItem = JSON.parse(JSON.stringify(item));
            otherItem.refund_number = otherItem.product_number;
            otherItem.average_price =
              otherItem.real_payment / otherItem.product_number;
            otherItem.maxRefundPrice =
              otherItem.average_price * otherItem.refund_number;
            otherItem.realRefundAmount = otherItem.real_payment;
            this.otherRefund.push(otherItem);
          } else {
            events.push(
              this.getClassTimes(item, (n, singlePrice, liberalType) => {
                item.refund_num = n;
                item.refund_total_price = n * singlePrice;
                item.other_refund_remark = "";
                item.liberalType = liberalType;
                this.selectTimesRow.push({
                  max_refund_num: n,
                  refund_num: n,
                  other_price: 0,
                  other_refund_remark: ""
                });
                this.signUpRefund.push(JSON.parse(JSON.stringify(item)));
                this.selectTimesVisible.push(false);
              })
            );
          }
        });

        this.selectedRow.bankcard_no &&
          this.getBankName(this.selectedRow.bankcard_no);
        Promise.all(events)
          .then(() => {
            loading.close();
            this.$emit("getBankName", this.bankCode);
          })
          .catch(() => {
            loading.close();
          });
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    SRTotalPrice() {
      const params = this.review ? "apply_refund_amount" : "refund_total_price";
      const price = this.signUpRefund.reduce(
        (t, n) => {
          return {
            [params]: t[params] + n[params]
          };
        },
        { [params]: 0 }
      );
      return price[params];
    },
    ORTotalPrice() {
      const params = this.review ? "pro_refund_amount" : "realRefundAmount";
      const price = this.otherRefund.reduce(
        (t, n) => {
          return {
            [params]: t[params] + n[params]
          };
        },
        { [params]: 0 }
      );
      return price[params];
    },
    allTotalPrice() {
      return this.SRTotalPrice + this.ORTotalPrice;
    }
  },
  methods: {
    otherTotalRefundPrice(row) {
      const price = row.refund_number * row.average_price;
      this.$set(row, "maxRefundPrice", price);
      this.$set(row, "realRefundAmount", price);
    },
    getBankName(e, cardNo = this.refundFormInfo.bankcardNo) {
      if (!/^\d{10,}$/.test(cardNo)) return;
      return new Promise((resolve, reject) => {
        this.$axios
          .get(this.GlobalVal.httpLink.getBank + "?cardNo=" + cardNo)
          .then(({ data }) => {
            this.bankCode = data.data.bankName;
            resolve(this.bankCode);
          })
          .catch(() => {
            reject();
          });
      });
    },
    selectTimesShow(row) {
      this.selectTimesRow.max_refund_num = row.refund_num;
      this.selectTimesRow.refund_num = row.refund_num;
    },
    savedOtherOptions(row, index) {
      const {
        refund_num,
        max_refund_num,
        other_price,
        other_refund_remark
      } = this.selectTimesRow[index];
      const { buyTimes, checkinNum, singlePrice } = this.classTimesInfo[
        row.now_order_id
      ];
      const totalRowPrice = refund_num * singlePrice + +other_price;
      if (
        !Number.isInteger(+refund_num) ||
        +refund_num < 0 ||
        +refund_num > max_refund_num
      ) {
        this.$message.error(
          `退课次数不正确，请输入0到${max_refund_num}的整数！`
        );
        this.selectTimesRow[index].refund_num = max_refund_num;
        return;
      }
      if (other_price) {
        if (!other_refund_remark) {
          this.$message.error("有额外退费时必须填写备注！");
          return;
        } else if (+refund_num !== buyTimes - checkinNum && +refund_num !== 0) {
          this.$message.error("额外退费不为0时，退费课次必须等于未上课次！");
          return;
        }
      }
      if (totalRowPrice < 0) {
        this.$message.error("退费总额不能小于0！");
        return;
      }
      this.$set(
        this.signUpRefund[index],
        "other_refund_remark",
        other_refund_remark
      );
      this.$set(
        this.orderList[index],
        [this.review ? "refund_times" : "refund_num"],
        refund_num
      );
      this.$set(this.signUpRefund[index], "refund_total_price", totalRowPrice);
      this.$set(this.signUpRefund[index], "other_price", +other_price);
      this.$set(this.selectTimesVisible, index, false);
    },
    getClassTimes(item, fn) {
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        source: "PC",
        [this.review ? "refundRecordId" : "orderId"]: item[
          this.review ? "id" : "now_order_id"
        ] //订单编号
      };
      return new Promise((resolve, reject) => {
        this.$axios
          .post(
            this.GlobalVal.httpLink[
              this.review ? "queryRefundDetail" : "getRefundInfo"
            ],
            JSON.stringify(objData)
          )
          .then(
            res => {
              if (res.data.code === "10000") {
                this.classTimesInfo[item.now_order_id] = res.data;
                // 优惠类型，02501：买赠优惠， 02502：均价优惠
                const {
                  buyTimes,
                  checkinNum,
                  singlePrice,
                  liberalType
                } = res.data;
                fn &&
                  fn(
                    this.review
                      ? res.data.refundDetail.refund_times
                      : buyTimes - checkinNum,
                    singlePrice,
                    liberalType
                  );
              } else {
                this.$message({
                  type: "error",
                  message: res.data.errmsg
                });
              }
              resolve();
            },
            res => {
              reject();
              this.$message("请求失败");
            }
          );
      });
    },
    submitMoneyForm(ruleForm, qx = false) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          const refundRequests = this.signUpRefund.map((item, index) => {
              const { now_order_id, refund_total_price, liberalType } = item,
                { buyTimes, checkinNum, singlePrice } = this.classTimesInfo[
                  now_order_id
                ],
                {
                  refund_num,
                  other_price,
                  other_refund_remark
                } = this.selectTimesRow[index];
              return {
                orderId: now_order_id,
                liberalType,
                refundSinglePrice: singlePrice,
                checkinNum,
                buyTimes,
                refundTimes: refund_num,
                classRefundAmount: refund_num * singlePrice,
                otherRefundAmount: other_price,
                other_refund_remark
              };
            }),
            otherRefundRequests = this.otherRefund.map(item => {
              const { order_id, refund_number, realRefundAmount } = item;
              return {
                orderId: order_id,
                refundProductNumber: refund_number,
                productRefundAmount: realRefundAmount,
                productRefundRemark: ""
              };
            });
          let objData = {
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            source: "PC",
            totalApplyAmount: this.allTotalPrice,
            ...this.refundFormInfo,
            alipayAcount: "", //支付宝帐号
            wechatAcount: "", //微信帐号
            isexcessRefund: qx ? true : false, // 是否超额退费
            refundRequests,
            otherRefundRequests,
            big_order_id: this.selectedRow.id
          };
          let loadingInstance = this.$Loading();
          this.$axios
            .post(this.GlobalVal.httpLink.bigRefund, JSON.stringify(objData))
            .then(
              res => {
                if (res.data.code === "10000") {
                  this.$message.success("退费成功");
                  this.$router.push({
                    path: "/studentInfo/refundInfo",
                    query: {
                      sid: this.$route.query.sid
                    }
                  });
                } else {
                  this.$message.error(res.data.errmsg);
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
    statusReset(){
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        delList: [{id : this.selectedRow.id}]
      }
      let loadingInstance = this.$Loading();
      this.$axios
        .post(this.GlobalVal.httpLink.bigRefundReset, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
                this.$emit('getData');
                this.$emit('closed');
                this.$message.success('重置成功');
            } else {
              this.$message.error(res.data.errmsg);
            }
            loadingInstance.close();
          },
          res => {
            this.$message("请求失败");
            loadingInstance.close();
          }
        );
    }
  }
};
</script>

<style>
.apply-refund-info .apply-user-info {
  display: flex;
  align-items: center;
}
.apply-refund-info .apply-user-info > div span {
  color: #999;
  padding-right: 10px;
}
.apply-refund-info .apply-user-info > div:first-child {
  border-right: 1px solid #ccc;
  padding-right: 20px;
  margin: 0 20px 0 15px;
}
.apply-refund-info .mt20 {
  margin-top: 20px;
}
.refund-keci-list {
  width: calc(100% + 10px);
}
.refund-keci-list ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
}
.refund-keci-list ul li {
  color: #000;
  width: 40px;
  height: 40px;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  background: #c9c9c9;
  margin: 0 10px 10px 0;
}
.refund-keci-list ul li.finish {
  background: #f2f2f2;
}
.refund-times-select {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}
.refund-times-select > p {
  padding-top: 5px;
  width: 180px;
}
.refund-times-select > p > span {
  padding-right: 50px;
}
.refund-times-select > div:nth-child(2) {
  width: 50%;
}
.refund-times-select > div:nth-child(2) > div:not(:last-child) {
  margin-bottom: 10px;
}
.refund-times-select > button {
  align-self: flex-end;
}
.apply-refund-info .refund-total {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
.apply-refund-info .refund-total > form {
  width: 60%;
}
.apply-refund-info .refund-total > form > div {
  display: flex;
  flex-wrap: wrap;
}
.apply-refund-info .refund-total > form > div > div {
  margin: 0 70px 10px 0;
}
.apply-refund-info .refund-total > form .el-form-item__error {
  padding-top: 0;
}
.apply-refund-info .refund-total > div {
  width: 40%;
  padding-bottom: 15px;
}
.apply-refund-info .refund-total > div > div {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.apply-refund-info .refund-total > div > div > h4 {
  padding: 0 10px 0 50px;
}
.apply-refund-info .refund-total > div > div > b {
  min-width: 90px;
}
.apply-refund-info .refund-total > div > div:last-child > b {
  font-size: 24px;
}
.apply-refund-info .refund-total > div > div:nth-child(2) {
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin: 5px 0 10px;
}
.apply-refund-info .el-input--mini .el-input__inner {
  height: 26px;
}
</style>
