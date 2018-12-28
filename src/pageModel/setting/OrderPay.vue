<template>
  <div :class="{table:!isqueryCharge,table2:isqueryCharge}">
    <div class="handle-box" v-if="!isqueryCharge">
      <div class="class-query-screen">
        <el-date-picker style="margin-bottom: 15px;" clearable unlink-panels v-model="dateSlotOther" align="right" size="mini" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
        </el-date-picker>
        <el-select clearable v-model="orderSourceOther" size="mini" placeholder="订单来源">
          <el-option v-for="item in orderSourceList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select clearable v-model="checkStatusOther" size="mini" placeholder="订单状态">
          <el-option v-for="item in orderStatus" v-if="item.show" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select clearable v-model="paymentTypeOther" size="mini" placeholder="支付方式">
          <el-option v-for="item in $store.state.PaymentTypeOptions" :key="item.code" :label="item.pay_type_name" :value="item.code">
          </el-option>
        </el-select>
        <el-select clearable v-model="payStatusOther" size="mini" placeholder="支付状态">
          <el-option v-for="item in payStatusList" :key="item.code" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-cascader clearable size="mini" change-on-select expand-trigger="click" :options="location" v-model="selectedLocationOther" placeholder="学校不限">
        </el-cascader>
      </div>
      <!--动态旧搜索框-->
      <div class="search-warp">
        <el-input size="mini" clearable v-model="select_word" placeholder="请输入搜索内容" style="width: 400px;">
          <el-select style="width: 100px;" v-model="selectStudentOrIphone" slot="prepend" placeholder="请选择">
            <el-option label="学生姓名" value="student"></el-option>
            <el-option label="学生电话" value="studentMobile"></el-option>
          </el-select>
          <el-button class="search-btn" slot="append" icon="el-icon-search" @click="searchOther"></el-button>
        </el-input>
        <el-input size="mini" clearable placeholder="请输入搜索内容" v-model="tradenoOther" style="width: 400px">
          <template slot="prepend">业务流水号</template>
          <el-button class="search-btn" slot="append" icon="el-icon-search" @click="searchOther"></el-button>
        </el-input>
        <el-button @click="$emit('removeOrder', 'all', multipleSelection, 'deleteOtherOrder')" size="mini" type="danger">删除选中的订单</el-button>
      </div>
    </div>
    <el-table size="mini" :data="dataOtherList" stripe style="width: 100%" v-loading="loading" ref="multipleTable" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="created_at" label="时间"></el-table-column>
      <el-table-column prop="campus_name" label="校区"></el-table-column>
      <el-table-column prop="student_name" label="学员姓名"></el-table-column>
      <el-table-column prop="student_mobile" label="联系电话"></el-table-column>
      <el-table-column prop="order_source" label="订单来源"></el-table-column>
      <el-table-column prop="order_name" label="收费项目"></el-table-column>
      <el-table-column prop="payment_type" label="支付方式"></el-table-column>
      <el-table-column prop="paystatus" label="支付状态"></el-table-column>
      <el-table-column prop="total_price" label="收费金额"></el-table-column>
      <el-table-column prop="real_payment" label="实付金额"></el-table-column>
      <el-table-column label="优惠方式">
        <template slot-scope="scope">
          {{scope.row.discount_type}}
        </template>
      </el-table-column>
      <el-table-column label="手续费">
        <template slot-scope="scope">
          {{scope.row.service_charge}}
        </template>
      </el-table-column>
      <el-table-column label="财务收入">
        <template slot-scope="scope">
          {{scope.row.financial_income}}
        </template>
      </el-table-column>
      <el-table-column prop="trade_no" label="业务流水号"></el-table-column>
      <el-table-column prop="staff_name" label="操作人"></el-table-column>
      <el-table-column v-if="!isqueryCharge" fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="$emit('removeOrderSelf', 'self', scope.row, 'deleteOtherOrder')" type="danger" size="mini">删除</el-button>
          <!-- <el-button type="primary" size="mini" v-else @click="refundOrderPay(scope.row)" :disabled="!(scope.row.paystatus === '已支付')">退费</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, slot, sizes, prev, pager, next, jumper" :current-page="page + 1" :total="count" :page-size="limit" :page-sizes="[10,20,30,50]">
        <slot name="slot">
          <span>金额：￥{{ priceSum && priceSum.toLocaleString() || 0 }} 元</span>
        </slot>
      </el-pagination>
    </div>
    <Dialog ref="dialog" title="其他收费退费" titbg bodyWid="30%">
      <div class="refundOther">
        <Refund-other :refundOrderData="refundOrderData" @closeDialog='closeDialog'></Refund-other>
      </div>
    </Dialog>
  </div>
</template>
<script>
import Dialog from "../common/Dialog.vue";
import RefundOther from "./RefundOther.vue";
export default {
  props: ["isqueryCharge"],
  components: {
    Dialog,
    RefundOther
  },
  data() {
    return {
      limit: 10,
      page: 0,
      count: 0,
      loading: false,
      location: [],
      dataOtherList: [],
      multipleSelection: [],
      dateSlotOther: {},
      orderSourceOther: "",
      checkStatusOther: "",
      paymentTypeOther: "",
      payStatusOther: "",
      select_word: "",
      tradenoOther: "",
      organId: "",
      selectStudentOrIphone: "student",
      selectedLocationOther: [],
      refundOrderData: {},
      priceSum: "",
      orderSourceList: [
        {
          value: "PC",
          label: "PC"
        },
        {
          value: "IOS",
          label: "IOS"
        },
        {
          value: "Android",
          label: "Android"
        }
      ],
      orderStatus: [
        {
          value: "01001",
          label: "已报名",
          show: false
        },
        {
          value: "01002",
          label: "已候补",
          show: false
        },
        {
          value: "01003",
          label: "发起支付",
          show: true
        },
        {
          value: "01004",
          label: "支付完成",
          show: true
        },
        {
          value: "01005",
          label: "在读",
          show: true
        },
        {
          value: "01006",
          label: "课程结束",
          show: true
        },
        {
          value: "01007",
          label: "申请退费",
          show: true
        },
        {
          value: "01008",
          label: "退费成功",
          show: true
        },
        {
          value: "01009",
          label: "已取消",
          show: false
        },
        {
          value: "01010",
          label: "已收藏",
          show: false
        },
        {
          value: "01011",
          label: "转班转出",
          show: true
        }
      ],
      payStatusList: [
        {
          value: "01301",
          label: "未支付"
        },
        {
          value: "01302",
          label: "已支付"
        },
        {
          value: "01303",
          label: "申请退款"
        },
        {
          value: "01304",
          label: "退款成功"
        }
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  created() {
    this.location = this.$store.state.location;
    this.Util.queryAreaNav(this, -1, () => this.getOtherData());
    this.Util.chargeMode(this); //查询支付方式
  },
  watch: {
    selectedLocationOther: function(o, n) {
      if (
        this.selectedLocationOther.includes(
          JSON.parse(window.sessionStorage.getItem("staff")).staffOrganId
        )
      ) {
        if (o[o.length - 1] !== n[n.length - 1]) {
          this.organId = o[o.length - 1];
          this.page = 0;
          this.getOtherData();
        }
      } else if (this.selectedLocationOther.length === 0) {
        this.organId = "";
        this.page = 0;
        this.getOtherData();
      }
    },
    dateSlotOther: function() {
      if (this.dateSlotOther != null) {
        this.startTimeOther = this.Util.TimeCycle(
          new Date(this.dateSlotOther[0]).getTime(),
          "ymd"
        );
        this.endTimeOther = this.Util.TimeCycle(
          new Date(this.dateSlotOther[1]).getTime(),
          "ymd"
        );
      } else {
        this.startTimeOther = "";
        this.endTimeOther = "";
      }
      this.page = 0;
      this.getOtherData();
    },
    orderSourceOther() {
      this.page = 0;
      this.getOtherData();
    },
    checkStatusOther() {
      this.page = 0;
      this.getOtherData();
    },
    paymentTypeOther() {
      this.page = 0;
      this.getOtherData();
    },
    payStatusOther() {
      this.page = 0;
      this.getOtherData();
    }
  },
  methods: {
    searchOther() {
      this.page = 0;
      this.getOtherData();
    },
    getOtherData() {
      let objData = {
        page: this.page,
        limit: this.limit,
        source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId, //
        startDate: this.startTimeOther, //开始时间(前台给)
        endDate: this.endTimeOther, //结束时间(前台给)
        order_source: this.orderSourceOther, // 订单来源
        orderStatus: this.checkStatusOther, // 订单状态
        paymentStatus: this.payStatusOther, //支付状态
        payment: this.paymentTypeOther, //支付类型
        tradeno: this.tradenoOther || "",
        studentName:
          this.selectStudentOrIphone === "student" ? this.select_word : "", //this.studentName, 学生姓名 1
        studentMobile:
          this.selectStudentOrIphone === "studentMobile"
            ? this.select_word
            : "", //学生手机号 1
        campusId: this.campusId, //校区名称
        organId: this.organId,
        studentId: this.$route.path.includes("otherCharges")
          ? this.$route.query.sid
          : ""
      };
      this.$axios
        .post(this.GlobalVal.httpLink.queryOtherOrder, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              this.count = res.data.data.count;
              this.dataOtherList = res.data.data.productOrders;
              this.priceSum = res.data.data.sum;
              this.dataOtherList = this.dataOtherList.map(item => {
                //item.pay_time = new Date(item.pay_time);
                //item.old_time = item.pay_time;
                let payStatusList = this.payStatusList.filter(
                  val => val.value === item.paystatus
                );
                let orderStatus = this.orderStatus.filter(
                  val => val.value === item.orderStatus
                );
                item.created_at = this.Util.TimeCycle(item.created_at, "ymd");
                item.paystatus = payStatusList[0] && payStatusList[0].label;
                item.payment_type = this.Util.GetIdNameForValue(
                  this.$store.state.PaymentTypeOptions,
                  item.payment_type,
                  "code",
                  "pay_type_name"
                );
                item.orderStatus = orderStatus[0] && [0].label;
                return item;
              });
            } else {
              console.error(res);
              this.$message({
                type: "error",
                message: res.data.errmsg
              });
            }
          },
          res => {
            this.loading = false;
            this.$message("请求失败");
          }
        );
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.limit = val;
      this.getOtherData();
    },
    handleCurrentChange(val) {
      this.page = val - 1;
      this.getOtherData();
    },
    //其他收费退费
    refundOrderPay(row) {
      this.refundOrderData = row;
      this.$refs.dialog.dialogVisible = true;
    },
    closeDialog() {
      this.$refs.dialog.dialogVisible = false;
      this.getOtherData();
    }
  }
};
</script>

<style scoped>
.search-warp {
  display: flex;
  /*float: right;*/
}
.search-warp > div:not(:last-child) {
  width: 40%;
  margin-right: 3px;
}
.handle-box {
  margin-bottom: 20px;
}
.refundOther {
  min-height: 300px;
}
</style>
