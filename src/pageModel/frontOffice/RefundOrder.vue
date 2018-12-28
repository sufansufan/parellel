<template>
  <div class="refund-order-list">
    <div class="select-tools">
      <div>
        <el-date-picker clearable v-model="options.times" type="daterange" align="right" size="mini" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" :default-time="['00:00:00', '23:59:59']">
        </el-date-picker>
      </div>
      <div>
        <el-cascader size="mini" clearable expand-trigger="click" :options="$store.state.location" v-model="options.organId" placeholder="学校不限" change-on-select>
        </el-cascader>
      </div>
      <div>
        <el-select clearable v-model="options.refundStatus" placeholder="退款状态不限" size="mini">
          <el-option v-for="item in $store.state.refundStatusList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <el-input clearable v-model="className" placeholder="请输入班级名称" class="input-with-select" size="mini" @keyup.native.enter="getData('')">
          <span slot="prepend">班级名称</span>
          <el-button icon="el-icon-search" slot="append" @click="getData('')"></el-button>
        </el-input>
      </div>
      <slot name="tableSelect"></slot>
    </div>
    <el-table size="mini" :data="dataList" border show-overflow-tooltip stripe style="width: 100%" v-loading="loading" ref="multipleTable">
      <el-table-column label="操作时间" width="100">
        <template slot-scope="scope">
          {{scope.row.updated_at | num2time(Util.TimeCycle)}}
        </template>
      </el-table-column>
      <el-table-column label="发起时间" width="100">
        <template slot-scope="scope">
          {{scope.row.apply_time | num2time(Util.TimeCycle)}}
        </template>
      </el-table-column>
      <el-table-column prop="id" label="退费单ID" width="100"></el-table-column>
      <el-table-column prop="organ_name" label="校区"></el-table-column>
      <el-table-column prop="student_name" label="学员姓名" width="85"></el-table-column>
      <el-table-column prop="student_mobile" label="联系电话" width="120"></el-table-column>
      <el-table-column v-for="(item, key) in childOrderTh" :key="item.order_id" :label="item.label" :width="item.width">
        <template slot-scope="scope">
          <div :class="{'child-order-select': true, [key]: true}" v-for="v in scope.row.childOrders" :key="v.order_id">
            <!-- <el-tooltip :disabled="!v[key] || key !== 'class_name' && key !== 'order_name'" effect="dark" :content="v[key]" placement="top"> -->
            <div v-if="v[key] || v[key] === 0" :title="v[key]">
              <div v-if="key === 'buy_times'">
                {{v.buy_times + ' / ' + v.total_times}}
              </div>
              <div v-else-if="key === 'paystatus'">
                {{v.paystatus | fixStatus($store.state.payStatusList, v.audit_result)}}
              </div>
              <div v-else :title="v[key]">
                {{ item.fixed ? '￥' + v[key].toFixed(item.fixed) : v[key]}}
              </div>
            </div>
            <div v-else class="notxt">N/A</div>
            <!-- </el-tooltip> -->
          </div>
        </template>
      </el-table-column>
      <el-table-column label="打款金额" width="110">
        <template slot-scope="scope">
          ￥{{scope.row.total_apply_amount}}
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          {{ scope.row.refund_status | fixStatus($store.state.refundStatusList, scope.row.audit_result)}}
        </template>
      </el-table-column>
      <el-table-column prop="refund_tradeno" label="打款流水号" width="100"></el-table-column>
      <el-table-column prop="updated_name" label="操作人"></el-table-column>
      <el-table-column prop="real_payment" label="操作" width="85" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="checkRefund(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :current-page="page + 1" :total="count" :page-size="limit" :page-sizes="[10,20,30,50]">
      </el-pagination>
    </div>
    <Dialog ref="refundDialog" title="退费单" titbg>
      <RefundInfo :orderList="selectedOrder" :review="true" :selectedRow="selectedRow" @closed="() => $refs.refundDialog.dialogVisible = false" @getBankName="getBankName" @getData="getData">
        <h3 slot-scope="scope" slot="refundStatus" class="status">
          状态：{{scope.row.refund_status | fixStatus($store.state.refundStatusList, scope.row.audit_result)}}
        </h3>
        <div slot-scope="infoProp" slot="info" class="slot-info">
          <div class="infos">
            <p>
              <span>退款方式</span>
              {{infoProp.info.refund_pay_type && "银行卡"}}
            </p>
            <p>
              <span>姓名</span>
              {{infoProp.info.bank_card_payee}}
            </p>
            <p>
              <span>卡号</span>
              {{infoProp.info.bankcard_no}} {{infoProp.info.bank_name}}
            </p>
            <p>
              <img v-if="bankCode" :src="'https://apimg.alipay.com/combo.png?d=cashier&t='+bankCode">
              <span v-else style="color: #ccc; font-size: 13px;">无法识别该银行卡</span>
            </p>
          </div>
          <div>
            <div style="display: flex; justify-content: space-between;">
              <h4>退费原因</h4>
              <h4>
                <span>申请人：{{infoProp.info.apply_staff_name}} | 时间：{{infoProp.info.apply_time | num2time(Util.TimeCycle, "ymd hh:mm:ss")}}</span>
              </h4>
            </div>
            <div style="padding: 6px 10px; line-height: 26px; height: 26px; margin-bottom: 10px; color: #6d6c6c">{{infoProp.info.refund_reason || '未填写'}}</div>
            <div v-if="isAdmin || infoProp.info.refund_status > '02001'">
              <div style="display: flex; justify-content: space-between;">
                <h4>审核</h4>
                <h4>
                  <span v-if="infoProp.info.refund_status >= '02002'">审核人：{{infoProp.info.audit_staff_name}} | 时间：{{infoProp.info.audit_time | num2time(Util.TimeCycle, "ymd hh:mm:ss")}}</span>
                </h4>
              </div>
              <div style="display: flex; margin-bottom: 10px;">
                <div v-if="infoProp.info.refund_status === '02001'" style="display: flex; width: 100%; align-items: center;">
                  <div style="width: 100%;">
                    <el-input v-model="auditOpinion" ref="auditOpinionInp" :disabled="!$store.state.code.includes('030302')" placeholder="必须填写审核意见"></el-input>
                  </div>
                  <div style="margin-left: 10px; width: 225px;" v-if="$store.state.code.includes('030302')">
                    <el-button size="mini" type="success" @click="refundAudit(true, infoProp.info)">通过
                    </el-button>
                    <el-button size="mini" type="danger" @click="refundAudit(false, infoProp.info)">不通过
                    </el-button>
                  </div>
                </div>
                <div v-else style="width: 100%; padding: 6px 10px; line-height: 26px; height: 26px;">
                  <span :style="{color: infoProp.info.audit_result === false ? 'red' : '#67c23a'}">{{infoProp.info.audit_result === false ? '审核不通过' : '审核通过'}}</span>：{{infoProp.info.audit_remark || '无'}}
                </div>
              </div>
            </div>
            <div v-if="isAdmin && infoProp.info.audit_result || infoProp.info.refund_status > '02002'">
              <div style="display: flex; justify-content: space-between;">
                <h4>打款</h4>
                <h4>
                  <span v-if="infoProp.info.refund_status >= '02003'">{{infoProp.info.refund_status === '02003' ? "打款" : "操作"}}人：{{infoProp.info.refund_staff_name}} | 时间：{{infoProp.info[infoProp.info.refund_status === '02003' ? "real_refund_time" : "updated_at"] | num2time(Util.TimeCycle, "ymd hh:mm:ss")}}</span>
                </h4>
              </div>
              <div v-if="infoProp.info.refund_status === '02002'" style="display: flex; width: 100%; align-items: center; margin-top: 10px;">
                <div style="width: 100%;">
                  <el-input v-model="refundPayNo" placeholder="填写业务流水号或备注" :disabled="!$store.state.code.includes('030303')"></el-input>
                </div>
                <div style="margin-left: 10px;  width: 225px;" v-if="$store.state.code.includes('030303')">
                  <el-button size="mini" type="success" @click="refundPay(true, infoProp.info)">通过
                  </el-button>
                  <el-button size="mini" type="danger" @click="refundPay(false, infoProp.info)">不通过
                  </el-button>
                </div>
              </div>
              <div v-else style="width: calc(100% - 20px); padding: 6px 10px; line-height: 26px; height: 26px; color: #6d6c6c">
                <span :style="{color: infoProp.info.refund_status === '02004' ? 'red' : '#67c23a'}">{{infoProp.info.refund_status === '02004' ? '打款不通过' : '打款通过'}}</span>：{{ infoProp.info.refund_status === '02004' ? infoProp.info.refund_remark || '无': infoProp.info.refund_tradeno || '无'}}
              </div>
            </div>
          </div>
        </div>
        <div slot="buttons"></div>
      </RefundInfo>
    </Dialog>
  </div>
</template>

<script>
import Dialog from "../common/Dialog";
import RefundInfo from "./ApplyRefundInfo";
export default {
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    },
    ng: {
      type: undefined,
      default: null
    }
  },
  components: {
    Dialog,
    RefundInfo
  },
  data() {
    return {
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
      },
      limit: 10,
      page: 0,
      count: 0,
      loading: false,
      className: "",
      bankCode: "",
      options: {
        times: [new Date().getTime() - 3600 * 1000 * 24 * 90, new Date()],
        organId: [],
        refundStatus: ""
      },
      selectedOrder: [],
      selectedRow: {},
      getParams: {},
      extParams: {},
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
        refund_times: {
          label: "退课次数",
          width: "85"
        },
        total_price: {
          label: "应付金额",
          width: "85",
          fixed: 2
        },
        real_payment: {
          label: "实付金额",
          width: "85",
          fixed: 2
        },
        class_fefund_amount: {
          label: "课次退费",
          width: "85",
          fixed: 2
        },
        other_refund_amount: {
          label: "额外退费",
          width: "85",
          fixed: 2
        },
        pro_refund_amount: {
          label: "其他退费",
          width: "85",
          fixed: 2
        },
        apply_refund_amount: {
          label: "实际退费额",
          width: "100",
          fixed: 2
        }
      },
      dataList: [],
      auditOpinion: "",
      refundPayNo: ""
    };
  },
  watch: {
    options: {
      handler() {
        this.page = 0;
        this.getData("");
      },
      deep: true
    },
  },
  filters: {
    num2time(num, fn, type = "ymd") {
      return fn(new Date(num).getTime(), type);
    },
    fixStatus(code, status, audit) {
      if (code === "02002") {
        let str = "审核不通过";
        if ((audit || audit === "t") && audit !== "f") {
          str = "审核通过";
        }
        return str;
      }
      return status.find(item => item.value === code).label;
    }
  },
  created() {
    this.ng === null && this.getData("");
  },
  methods: {
    getBankName(code) {
      this.bankCode = code;
    },
    getData(bigOrderId = "", fn) {
      this.loading = true;
      const times = this.options.times || ["", ""];
      this.getParams = {
        limit: this.limit,
        page: this.page,
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        organId: this.options.organId[this.options.organId.length - 1],
        refundStatus: this.options.refundStatus,
        class_name: this.className,
        studentId: this.$route.query.sid,
        startDate: times[0],
        endDate: times[1],
        big_refund_order_id: ""
      };
      if (typeof bigOrderId === "object") {
        this.extParams = bigOrderId;
      } else {
        this.getParams.big_refund_order_id = bigOrderId;
      }
      this.getParams = Object.assign({}, this.getParams, this.extParams);
      this.getParams.page = this.page
      this.$axios
        .post(
          this.GlobalVal.httpLink.listBigRefundOrder,
          JSON.stringify(this.getParams)
        )
        .then(({ data }) => {
          this.loading = false;
          this.dataList = data.data.bigBigRefundOrders;
          this.count = data.data.count;
          this.$emit("getTitleData", "refundTable", data.data.countMap);
          fn && fn(data);
        })
        .catch(() => {
          this.loading = false;
        });
    },
    handleParams(params, fn) {
      const list = {
        refundAuditRequests: [],
        otherRefundAuditRequests: []
      };
      params.forEach(item => {
        list[
          item.type === 1 ? "refundAuditRequests" : "otherRefundAuditRequests"
        ].push(fn && fn(item));
      });

      return list;
    },
    // 退款审核
    refundAudit(flag, orderInfo) {
      const inp = this.$refs.auditOpinionInp.$el.children[0];
      if (this.auditOpinion === "") {
        inp.style.borderColor = "#f56c6c";
        this.$message.warning("必须填写审核意见");
        return;
      } else {
        inp.style.borderColor = "#dcdfe6";
      }
      const audioList = {
        refundAuditRequests: [],
        otherRefundAuditRequests: []
      };
      orderInfo.childOrders.forEach(item => {
        audioList[
          item.type === 1 ? "refundAuditRequests" : "otherRefundAuditRequests"
        ].push({
          order_id: item.order_id,
          refund_record_id: item.id,
          audit_remark: this.auditOpinion,
          audit_result: flag
        });
      });
      const objData = {
        source: this.GlobalVal.constants.source,
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        big_refund_order_id: orderInfo.id,
        audit_result: flag,
        audit_remark: this.auditOpinion,
        ...audioList
      };
      let loading = this.$Loading();
      this.$axios
        .post(this.GlobalVal.httpLink.bigRefundAudit, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              this.$message.success(
                `完成操作！审核${flag ? "通过" : "不通过"}`
              );
              this.getData("");
              this.$refs.refundDialog.dialogVisible = false;
            } else {
              console.error(res);
              this.$message({
                type: "error",
                message: res.data.errmsg
              });
            }
            loading.close();
          },
          res => {
            loading.close();
            this.$message("请求失败");
          }
        );
    },
    // 退款发放
    refundPay(flag, orderInfo) {
      const payList = {
        refundPayRequests: [],
        otherRefundPayRequests: []
      };
      orderInfo.childOrders.forEach(item => {
        payList[
          item.type === 1 ? "refundPayRequests" : "otherRefundPayRequests"
        ].push({
          order_id: item.order_id,
          refund_record_id: item.id,
          refund_tradeno: this.refundPayNo
        });
      });
      const objData = {
        source: this.GlobalVal.constants.source,
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        big_refund_order_id: orderInfo.id,
        refund_tradeno: this.refundPayNo,
        audit_result: flag,
        ...payList
      };
      const loading = this.$Loading();
      this.$axios
        .post(this.GlobalVal.httpLink.bigRefundPay, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              this.$message.success(
                `完成操作！打款${flag ? "通过" : "不通过"}`
              );
              this.$refs.refundDialog.dialogVisible = false;
              this.getData("");
            } else {
              this.$message({
                type: "error",
                message: res.data.errmsg
              });
            }
            loading.close();
            this.refundPayNo = "";
          },
          res => {
            loading.close();
            this.$message("请求失败");
          }
        );
    },
    checkRefund(row) {
      const data = JSON.parse(JSON.stringify(row));
      this.selectedOrder = data.childOrders.map(item => item);
      this.selectedRow = data;
      this.$refs.refundDialog.dialogVisible = true;
    },
    handleSizeChange(val) {
      this.limit = val;
      this.getData("");
    },
    handleCurrentChange(val) {
      this.page = val - 1;
      this.getData("");
    }
  }
};
</script>

<style>
.refund-order-list .select-tools {
  display: flex;
  flex-flow: wrap;
  margin-bottom: 5px;
}
.refund-order-list .status {
  display: inline-flex;
  justify-content: flex-end;
  flex-grow: 1;
  color: #000;
}
.refund-order-list .select-tools > div {
  margin: 0 10px 10px 0;
}
.refund-order-list .select-tools .el-input--mini .el-input__inner {
  height: 30px !important;
}
.refund-order-list .pagination {
  text-align: center;
}
.refund-order-list .cell {
  overflow: initial !important;
}
.refund-order-list .el-table td,
.refund-order-list .el-table th.is-leaf {
  border-right: 1px solid #ebeef5;
  border-bottom: 1px solid #d6d6d6;
}
.refund-order-list .child-order-select {
  position: relative;
  font-size: 12px;
}
.refund-order-list .child-order-select > div {
  min-height: 28px;
  max-height: 28px;
  line-height: 28px;
}
.refund-order-list .child-order-select > div > div {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.refund-order-list .child-order-select:not(:last-child)::after {
  content: "";
  position: absolute;
  left: -10px;
  bottom: 0;
  width: calc(100% + 20px);
  border-bottom: 1px solid #ebeef5;
}
.refund-order-list .child-order-select .notxt {
  font-size: 12px;
  color: #ddd;
}
.refund-order-list .slot-info {
  margin-bottom: 20px;
}
.refund-order-list .slot-info > .infos {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 43px;
}
.refund-order-list .slot-info > .infos > p:last-child {
  display: inline-flex;
  align-items: center;
}
.refund-order-list .slot-info > .infos > p > span {
  color: #999;
  padding-right: 10px;
}
.refund-order-list .select-tools .export {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
}
.refund-order-list .select-tools .export button {
  margin-right: 10px;
}
</style>
