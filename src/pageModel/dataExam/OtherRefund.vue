<template>
  <div class="other-refund">
    <slot name="selectOptions">
      <div class="select-options">
        <div>
          <el-date-picker clearable unlink-panels v-model="times" align="right" size="mini" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00','23:59:59']">
          </el-date-picker>
        </div>
        <div>
          <el-cascader clearable size="mini" change-on-select expand-trigger="click" :options="location" v-model="selectedLocation" placeholder="学校不限">
          </el-cascader>
        </div>
        <div>
          <el-select clearable v-model="options.watch.refundStatus" size="mini" placeholder="退款状态">
            <el-option v-for="item in $store.state.refundStatusList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-input clearable size="mini" v-model="options.studentName" placeholder="请输入学员姓名/手机号" @keyup.native.enter="getData">
            <el-button class="search-btn" slot="append" icon="el-icon-search" @click="getData"></el-button>
          </el-input>
        </div>
        <div>
          <el-input clearable size="mini" v-model="options.orderName" placeholder="请输入收费内容" @keyup.native.enter="getData">
            <el-button class="search-btn" slot="append" icon="el-icon-search" @click="getData"></el-button>
          </el-input>
        </div>
        <div>
          <el-input clearable size="mini" v-model="options.bigRefundOrderId" placeholder="请输入退费单ID" @keyup.native.enter="getData">
            <el-button class="search-btn" slot="append" icon="el-icon-search" @click="getData"></el-button>
          </el-input>
        </div>
        <div class="export">
          <el-button type="primary" size="mini" @click="exportOtherList">导出</el-button>
        </div>
      </div>
    </slot>
    <div class="table-list">
      <el-table size="mini" :data="dataList" stripe style="width: 100%" v-loading="loading">
        <el-table-column label="发起时间" width="145">
          <template slot-scope="scope">
            {{scope.row.refund_apply_time | num2time(Util.TimeCycle)}}
          </template>
        </el-table-column>
        <el-table-column prop="big_refund_order_id" label="退费单ID"></el-table-column>
        <el-table-column prop="organ_name" label="校区"></el-table-column>
        <el-table-column prop="finance_name" label="财务主体" width="150"></el-table-column>
        <el-table-column prop="order_name" label="收费内容" width="200"></el-table-column>
        <el-table-column prop="student_name" label="学员姓名"></el-table-column>
        <el-table-column prop="student_mobile" label="联系电话" width="110"></el-table-column>
        <el-table-column label="应付价格" width="90">
          <template slot-scope="scope">
            ￥{{scope.row.total_price | fixTofixed}}
          </template>
        </el-table-column>
        <el-table-column label="实付金额" width="90">
          <template slot-scope="scope">
            ￥{{scope.row.real_price | fixTofixed}}
          </template>
        </el-table-column>
        <el-table-column label="退费总额">
          <template slot-scope="scope">
            ￥{{scope.row.apply_refund_amount | fixTofixed}}
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{scope.row.refund_status | fixStatus($store.state.refundStatusList, scope.row.audit_result)}}
          </template>
        </el-table-column>
        <el-table-column prop="refund_tradeno" label="打款流水号" width="100"></el-table-column>
        <el-table-column prop="refund_name" label="操作人"></el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :current-page="page + 1" :total="count" :page-size="limit" :page-sizes="[10,20,30,50]">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    studentId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      limit: 10,
      page: 0,
      count: 0,
      dataList: [],
      selectedLocation: [],
      times: [new Date().getTime() - 3600 * 1000 * 24 * 30, new Date()],
      options: {
        studentName: "", //学生姓名
        orderName: "", //班级名称
        startTime: "",
        endTime: "",
        studentMobile: "", //学员电话
        bigRefundOrderId: "",
        watch: {
          refundStatus: ""
        }
      },
      loading: false
    };
  },
  watch: {
    times: {
      handler() {
        this.getData();
      },
      deep: true
    },
    selectedLocation: {
      handler() {
        this.getData();
      },
      deep: true
    },
    options: {
      handler() {
        this.page = 0;
      },
      deep: true
    },
    "options.watch": {
      handler() {
        this.getData();
      },
      deep: true
    }
  },
  filters: {
    fixTofixed(val) {
      return val || val === 0 ? val.toFixed(2) : val;
    },
    num2time(num, fn) {
      return fn(new Date(num).getTime(), "ymd");
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
    this.Util.queryAreaNav(this, -1, () => this.getData());
    this.location = this.$store.state.location;
  },
  methods: {
    getData() {
      const times = this.times || ["", ""];
      this.options.startTime = times[0];
      this.options.endTime = times[1];
      const objData = {
        source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        page: this.page, //页数
        limit: this.limit, //条目数
        studentId: this.studentId, //学生ID
        campusId: this.selectedLocation[this.selectedLocation.length - 1] || "" //校区名称
      };
      const options = JSON.parse(JSON.stringify(this.options));
      if (options.studentName) {
        if (/^\d+$/.test(options.studentName)) {
          options.studentMobile = options.studentName;
          options.studentName = "";
        }
      }
      this.objData = Object.assign({}, objData, {
        ...options,
        ...options.watch
      });
      delete this.objData.watch;
      this.loading = true;
      this.$axios
        .post(
          this.GlobalVal.httpLink.listOtherRefundRecord,
          JSON.stringify(this.objData)
        )
        .then(
          res => {
            this.loading = false;
            if (res.data.code === "10000") {
              this.dataList = res.data.data.otherRefundRecords;
              this.count = res.data.data.count;
              this.$emit("getTitleData", "otherRefund", res.data.data.countMap);
            } else {
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
    handleSizeChange(val) {
      this.limit = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.page = val - 1;
      this.getData();
    },
    exportOtherList() {
      this.objData.startTime = this.Util.TimeCycle(this.objData.startTime);
      this.objData.endTime = this.Util.TimeCycle(
        new Date(this.objData.endTime).getTime()
      );
      this.$exportExcel({
        dataList: this.dataList,
        objData: this.objData,
        httpUrl: "exportOtherRefundRecord",
        title: this.$route.meta.title
      });
    }
  }
};
</script>

<style>
.other-refund .select-options {
  display: flex;
  flex-flow: wrap;
  margin-bottom: 5px;
}
.other-refund .select-options > div {
  margin: 0 10px 10px 0;
}
.other-refund .select-options .el-input--mini .el-input__inner,
.other-refund .select-options .el-input.el-input--mini {
  height: 30px !important;
}
.other-refund .select-options .export {
  display: inline-flex;
  flex-grow: 1;
  justify-content: flex-end;
}
</style>
