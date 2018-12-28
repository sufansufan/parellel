<template>
  <div class="table2 child-order-box">
    <slot name="tableSelect"></slot>
    <el-table size="mini" :data="dataList" border show-overflow-tooltip stripe style="width: 100%" v-loading="loading" ref="multipleTable">
      <el-table-column label="时间" width="100">
        <template slot-scope="scope">
          {{scope.row.pay_time | num2time(Util.TimeCycle)}}
        </template>
      </el-table-column>
      <el-table-column prop="id" label="订单ID"></el-table-column>
      <el-table-column prop="organ_name" label="校区"></el-table-column>
      <el-table-column prop="student_name" label="学员姓名" width="85"></el-table-column>
      <el-table-column prop="student_mobile" label="联系电话" width="110"></el-table-column>
      <el-table-column prop="finance_name" label="财务主体" width="250"></el-table-column>
      <el-table-column label="选择" width="55" v-if="$route.fullPath !== '/campusIncome'"></el-table-column>
      <el-table-column v-for="(item, key) in childOrderTh" :key="item.order_id" :label="item.label" :width="item.width">
        <template slot-scope="scope">
          <el-checkbox-group v-model="multipleSelection[scope.$index]">
            <div :class="{'child-order-select': true, [key]: true, 'action': $route.fullPath === '/campusIncome' && key ==='class_name'}" v-for="v in scope.row.childOrders" :key="v.order_id">
              <div v-if="key === 'class_name'" class="order-select">
                <el-checkbox :label="v" :index="scope.$index + v.order_id" :style="{display: (v.paystatus === '01303' || v.paystatus === '01304' && v.is_finish_refund === true) ? 'none' : 'block'}" v-if="$route.fullPath !== '/campusIncome'"></el-checkbox>
              </div>
              <!-- <el-tooltip :disabled="!v[key] || key !== 'class_name' && key !== 'order_name'" effect="dark" :content="v[key]" placement="top"> -->
              <div v-if="v[key]" :title="v[key]">
                <div v-if="key === 'buy_times'">
                  {{v.buy_times + ' / ' + v.total_times}}
                </div>
                <div v-else-if="key === 'class_name'" :style="{lineHeight: v.crossfinancialtype ? '40px' : 'auto'}">
                  <sup>{{v.crossfinancialtype | crossFinancialType}}</sup> {{v.class_name}}
                </div>
                <div v-else-if="key === 'paystatus'">
                  {{v.paystatus | fixStatus($store.state.payStatusList)}}
                </div>
                <div v-else-if="key === 'now_organ_name'">
                  {{v.now_organ_name}} / {{v.now_class_name}} / {{v.now_periods | fixStatus($store.state.PeriodsOptions)}}
                </div>
                <div v-else-if="key === 'discount'">
                  {{v.discount * 10}}
                </div>
                <div v-else :title="v[key]">
                  {{ item.fixed ? '￥' + v[key].toFixed(item.fixed) : v[key]}}
                </div>
              </div>
              <div v-else class="notxt">N/A</div>
              <!-- </el-tooltip> -->
            </div>
          </el-checkbox-group>
        </template>
      </el-table-column>
      <el-table-column label="总金额">
        <template slot-scope="scope">
          ￥{{scope.row.real_payment}}
        </template>
      </el-table-column>
      <el-table-column prop="trade_no" label="POS流水号" width="100"></el-table-column>
      <el-table-column prop="updated_name" label="操作人"></el-table-column>
      <el-table-column label="操作" width="200" fixed="right" v-if="$route.fullPath !== '/campusIncome'">
        <template slot-scope="scope">
          <slot name="operationButton" :row="scope.row" :index="scope.$index">
            <div class="operation-btns">
              <div style="width: 125px; margin-right: 10px;">
                <div class="child-order-select" v-for="v in scope.row.childOrders" :key="v.order_id">
                  <div>
                    <!-- <el-button :type="btnIsDisable(v) || !btnIsDisable(v) && isRefund(v) ? 'info' : 'primary'" :disabled="btnIsDisable(v) || !btnIsDisable(v) && isRefund(v)" size="mini" @click="changeOperation(v, {turnClassSwitch: true, title: '转班'})" :style="{opacity: btnIsDisable(v) || !btnIsDisable(v) && isRefund(v) ? 0.3 : 1}">转班</el-button> -->
                    <!-- <el-button :type="btnIsDisable(v) || !btnIsDisable(v) && isRefund(v) ? 'info' : 'primary'" :disabled="btnIsDisable(v) || !btnIsDisable(v) && isRefund(v)" size="mini" @click="changeOperation(v, {classCourseLayer: true, title: '调课'})" :style="{opacity: btnIsDisable(v) || !btnIsDisable(v) && isRefund(v) ? 0.3 : 1}">调课</el-button> -->
                    <el-button :type="btnIsDisable(v) ? 'info' : 'primary'" :disabled="btnIsDisable(v)" :style="{opacity: btnIsDisable(v) ? 0.3 : 1}" size="mini" @click="changeOperation(v, {printLayer: true, title: '打印听课证'})">打印听课证</el-button>
                  </div>
                </div>
              </div>
              <el-button type="primary" size="mini" @click="applyRefund(scope.$index, scope.row)" :disabled="!multipleSelection[scope.$index].length">退费</el-button>
            </div>
          </slot>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :current-page="page + 1" :total="count" :page-size="limit" :page-sizes="[10,20,30,50]">
      </el-pagination>
    </div>
    <Dialog ref="refundDialog" title="申请退费" titbg>
      <RefundInfo :orderList="selectedOrder" :selectedRow="selectedRow" @closed="() => $refs.refundDialog.dialogVisible = false"></RefundInfo>
    </Dialog>
    <Dialog ref="changeAndPrint" :title="changeAndPrintTitle" titbg>
      <ChangeAndPrint :rowInfo="rowInfo" :display="opDisplay" @close="$refs.changeAndPrint.dialogVisible = false"></ChangeAndPrint>
    </Dialog>
  </div>
</template>

<script>
import Dialog from "../common/Dialog";
import RefundInfo from "./ApplyRefundInfo";
import ChangeAndPrint from "./ChangedAndPrint";
export default {
  props: {
    params: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    Dialog,
    RefundInfo,
    ChangeAndPrint
  },
  data() {
    return {
      limit: 10,
      page: 0,
      count: 0,
      loading: false,
      multipleSelection: [],
      selectedOrder: [],
      selectedRow: {},
      childOrderTh: {
        class_name: {
          label: "班级名称",
          width: "250"
        },
        order_name: {
          label: "收费内容",
          width: "250"
        },
        buy_times: {
          label: "购课/总课次",
          width: "102"
        },
        now_organ_name: {
          label: "当前校区/班级",
          width: "380"
        },
        discount: {
          label: "折扣",
          width: "auto"
        },
        subtract_amount: {
          label: "立减",
          width: "auto"
        },
        coupon_amount: {
          label: "优惠券",
          width: "auto"
        },
        single_price: {
          label: "单价",
          width: "auto",
          fixed: 2
        },
        product_number: {
          label: "数量",
          width: "auto"
        },
        total_price: {
          label: "应付价格",
          width: "100",
          fixed: 2
        },
        real_payment: {
          label: "实付金额",
          width: "100",
          fixed: 2
        },
        paystatus: {
          label: "状态",
          width: "auto"
        }
      },
      dataList: [],
      rowInfo: {},
      opDisplay: {},
      changeAndPrintTitle: "",
      delList: []
    };
  },
  computed: {
    btnIsDisable() {
      return row => {
        return row.type === 2 ? true : false;
      };
    },
    isRefund() {
      return row => {
        return (
          row.paystatus === "01303" ||
          (row.paystatus === "01304" && row.is_finish_refund === true)
        );
      };
    }
  },
  filters: {
    num2time(num, fn) {
      return fn(new Date(num).getTime(), "ymd");
    },
    fixStatus(code, status) {
      return code ? status.find(item => item.value === code).label : code;
    },
    crossFinancialType(code) {
      switch (code) {
        case 1:
          return "跨财务主体转班";
        case 2:
          return "跨区转班";
        case 3:
          return "同校区转班";
        case 4:
          return "未转班";
      }
    }
  },
  created() {
    this.Util.querySysconst(this, "009", this.$store.state.PeriodsOptions); //查询期别
    this.getData();
  },
  methods: {
    changeOperation(row, o) {
      this.rowInfo = row.orderInfo;
      this.opDisplay = o;
      this.changeAndPrintTitle = o.title;
      this.$refs.changeAndPrint.dialogVisible = true;
    },
    getData(params = this.params) {
      this.loading = true;
      if(params){
        this.params = params
      }
      params = Object.assign(
        {},
        {
          limit: this.limit,
          page: this.page,
          staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
          studentId: this.$route.query.sid
        },
        params
      );
      this.$axios
        .post(this.GlobalVal.httpLink.listBigOrder, JSON.stringify(params))
        .then(({ data }) => {
          this.dataList = data.data.bigOrders.map((item, index) => {
            this.multipleSelection.push([]);
            return item;
          });
          this.count = data.data.count;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    applyRefund(index, row) {
      this.delList = [];
      this.multipleSelection[index].forEach(item => {
        if (item.class_name) {
          this.delList.push({ id: item.order_id });
        }
      });
      this.$axios
        .post(
          this.GlobalVal.httpLink.checkIsHaveTurnClass,
          JSON.stringify({
            delList: this.delList,
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId
          })
        )
        .then(({ data }) => {
          if (data.code === "10000") {
            let errmg = data.errmsg;
            let br = errmg.lastIndexOf("<br>");
            this.$confirm(
              `<div>
              <p class="refund-font">${errmg.slice(0, br)}</p>
              <p class="refund-info">${errmg.slice(br * 1 + 4)}</p>
              </div>`,
              "提示",
              {
                dangerouslyUseHTMLString: true,
                confirmButtonText: "确定",
                cancelButtonText: "继续退费",
                type: "warning",
                center: true,
                distinguishCancelAndClose: true,
                customClass: "dialogStyle",
                beforeClose: this.confirmClose
              }
            )
              .then(() => {
                this.multipleSelection[index] = [];
              })
              .catch(n => {
                if (n == "cancel") {
                  this.selectedOrder = this.multipleSelection[index];
                  this.selectedRow = row;
                  this.$refs.refundDialog.dialogVisible = true;
                }
              });
          } else {
            this.selectedOrder = this.multipleSelection[index];
            this.selectedRow = row;
            this.$refs.refundDialog.dialogVisible = true;
          }
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "请求失败"
          });
        });
    },
    handleSizeChange(val) {
      this.limit = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.page = val - 1;
      this.getData();
    },
    getToNewClass(delList) {
      return new Promise((resolve, reject) => {
        this.$axios
          .post(
            this.GlobalVal.httpLink.turnClassToNowClass,
            JSON.stringify({
              staffId: JSON.parse(window.sessionStorage.getItem("staff"))
                .staffId,
              delList
            })
          )
          .then(({ data }) => {
            resolve(data.code);
            if (data.code === "10000") {
              this.getData();
              this.$message({
                type: "success",
                message: data.errmsg
              });
            } else {
              this.$message({
                type: "error",
                message: data.errmsg
              });
            }
          })
          .catch(() => {
            this.$message({
              type: "error",
              message: "请求失败"
            });
          });
      });
    },
    confirmClose(action, instance, done) {
      if (action === "confirm") {
        this.getToNewClass(this.delList).then(data => {
          if (data === "10000") {
            instance.close();
          }
        });
      } else {
        instance.close();
      }
    }
  }
};
</script>

<style>
.child-order-box .cell {
  overflow: initial !important;
}
.child-order-box .pagination {
  text-align: center;
}
.child-order-box .el-table td,
.child-order-box .el-table th.is-leaf {
  border-right: 1px solid #ebeef5;
  border-bottom: 1px solid #d6d6d6;
}
.child-order-select {
  position: relative;
  font-size: 12px;
}
.child-order-select > div {
  min-height: 28px;
  max-height: 28px;
  line-height: 28px;
}
.child-order-select > div > div {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
}
.child-order-select > div > div > sup {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 10px;
  height: 16px;
  line-height: 16px;
  transform: scale(0.8);
  background: #fef0f0;
  color: #f56c6c;
}
.child-order-select:not(:last-child)::after {
  content: "";
  position: absolute;
  left: -10px;
  bottom: 0;
  width: calc(100% + 20px);
  border-bottom: 1px solid #ebeef5;
}
.child-order-select .notxt {
  font-size: 12px;
  color: #ddd;
}
.child-order-select.class_name::after {
  width: calc(100% + 20px + 55px);
  left: -65px;
}
.action.child-order-select.class_name::after {
  width: calc(100% + 20px + 55px);
  left: -10px;
}
.child-order-box .cell .child-order-select:last-child:after {
  display: none;
}
.child-order-select > .order-select {
  position: absolute;
  left: -45px;
  top: 50%;
  transform: translateY(-50%);
}
.child-order-select > .order-select .el-checkbox__label {
  display: none;
}
.child-order-box .select-tools {
  display: flex;
  flex-flow: wrap;
  margin-bottom: 5px;
}
.child-order-box .status {
  display: inline-flex;
  justify-content: flex-end;
  flex-grow: 1;
  color: #000;
}
.child-order-box .select-tools > div {
  margin: 0 10px 10px 0;
}
.child-order-box .select-tools .el-input--mini .el-input__inner {
  height: 30px !important;
}
.child-order-box .pagination {
  text-align: center;
}
.child-order-box .operation-btns {
  display: flex;
  align-items: center;
}
.child-order-box .operation-btns .child-order-select > div {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-right: 5px;
}
.child-order-box .operation-btns .el-button--mini {
  height: 22px;
  line-height: 7px;
}
.child-order-box .operation-btns .child-order-select::before {
  content: "";
  position: absolute;
  top: -10px;
  right: 0;
  width: 1px;
  height: calc(100% + 20px);
  background: #ebeef5;
}
.child-order-box .el-table--mini td {
  padding: 0;
}
.child-order-box .operation-btns .child-order-select:not(:last-child)::after {
  width: calc(100% + 10px);
}
.refund-info {
  text-align: center;
  font-size: 16px;
  color: #f50101;
}
.refund-font {
  font-size: 14px;
}
.dialogStyle {
  width: 430px;
}
</style>
