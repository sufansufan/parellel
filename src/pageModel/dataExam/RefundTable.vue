<template>
  <div class="refund-table">
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
          <el-select clearable v-model="options.watch.particularYear" size="mini" placeholder="年度">
            <el-option v-for="item in $store.state.YearOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select clearable v-model="options.watch.season" size="mini" placeholder="季节">
            <el-option v-for="item in $store.state.SeasonOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select clearable v-model="options.watch.periods" size="mini" placeholder="期别">
            <el-option v-for="item in $store.state.PeriodsOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select clearable v-model="options.watch.grade" size="mini" placeholder="年级不限">
            <el-option v-for="item in $store.state.GradeOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select clearable v-model="options.watch.subject" size="mini" placeholder="科目不限">
            <el-option v-for="item in $store.state.SubjectOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select clearable v-model="options.watch.projectType" size="mini" placeholder="类别不限">
            <el-option v-for="item in $store.state.ProjectTypeOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select clearable v-model="options.watch.classType" size="mini" placeholder="班型不限">
            <el-option v-for="item in $store.state.ClassTypeOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
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
          <el-input clearable size="mini" v-model="options.teacherName" placeholder="请输入老师姓名" @keyup.native.enter="getData">
            <el-button class="search-btn" slot="append" icon="el-icon-search" @click="getData"></el-button>
          </el-input>
        </div>
        <div>
          <el-input clearable size="mini" v-model="options.className" placeholder="请输入班级名称" @keyup.native.enter="getData">
            <el-button class="search-btn" slot="append" icon="el-icon-search" @click="getData"></el-button>
          </el-input>
        </div>
        <div>
          <el-input clearable size="mini" v-model="options.refundTradeno" placeholder="请输入打款流水号" @keyup.native.enter="getData">
            <el-button class="search-btn" slot="append" icon="el-icon-search" @click="getData"></el-button>
          </el-input>
        </div>
        <div>
          <el-input clearable size="mini" v-model="options.bigRefundOrderId" placeholder="请输入退款单ID" @keyup.native.enter="getData">
            <el-button class="search-btn" slot="append" icon="el-icon-search" @click="getData"></el-button>
          </el-input>
        </div>
        <div class="export" v-if="$store.state.code.includes('011301') || $store.state.code.includes('030301')">
          <el-button size="mini" type="primary" @click="exportList">导出</el-button>
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
        <el-table-column prop="bigRefundOrderId" label="退费单ID"></el-table-column>
        <el-table-column prop="campus_name" label="校区"></el-table-column>
        <el-table-column prop="class_name" label="班级名称" width="250px"></el-table-column>
        <el-table-column prop="finance_name" label="财务主体" width="180px"></el-table-column>
        <el-table-column prop="student_name" label="学员姓名"></el-table-column>
        <el-table-column prop="student_mobile" label="联系电话" width="110"></el-table-column>
        <el-table-column label="购课/总课次" width="100">
          <template slot-scope="scope">
            {{scope.row.buytimes + ' / ' + scope.row.total_times}}
          </template>
        </el-table-column>
        <el-table-column prop="refund_times" label="退费课次数" width="95"></el-table-column>
        <el-table-column label="应付价格" width="90">
          <template slot-scope="scope">
            ￥{{scope.row.total_price | fixTofixed}}
          </template>
        </el-table-column>
        <el-table-column label="实付金额" width="90">
          <template slot-scope="scope">
            ￥{{scope.row.real_payment | fixTofixed}}
          </template>
        </el-table-column>
        <el-table-column label="课次退费" width="90">
          <template slot-scope="scope">
            ￥{{scope.row.class_refund_amount | fixTofixed}}
          </template>
        </el-table-column>
        <el-table-column label="额外退费" width="90">
          <template slot-scope="scope">
            ￥{{scope.row.other_refund_amount | fixTofixed}}
          </template>
        </el-table-column>
        <el-table-column label="退费总额" width="90">
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
        <el-table-column prop="refund_staff_name" label="操作人"></el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="slot, total, sizes, prev, pager, next, jumper" :current-page="page + 1" :total="count" :page-size="limit" :page-sizes="[10,20,30,50]">
        <slot name="slot">
          <div class="pagination-sum" v-if="!studentId">
            <span>课次退费总额：
              <b>￥{{sumRefund.class_refund_amount | fixTofixed}}</b>
            </span>
            <span>额外退费总额：
              <b>￥{{sumRefund.other_refund_amount | fixTofixed}}</b>
            </span>
          </div>
        </slot>
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
      sumRefund: {},
      dataList: [],
      selectedLocation: [],
      location: [],
      times: [new Date().getTime() - 3600 * 1000 * 24 * 30, new Date()],
      options: {
        studentName: "", //学生姓名
        className: "", //班级名称
        startTime: "",
        endTime: "",
        studentMobile: "", //学员电话
        bigRefundOrderId: "", //业务流水号：就是订单编号
        refundTradeno: "", //退款查询的时候业务流水号
        teacherName: "", //教师姓名
        watch: {
          refundStatus: "",
          particularYear: "", //年份
          season: "", //季节
          periods: "", //期别
          grade: "", //年级
          subject: "", //科目
          projectType: "", //类别
          classType: "", //班型
          department: "" //学部
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
        this.page = 0;
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
        if (audit) {
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
    this.Util.querySysconst(this, "100", this.$store.state.SubjectOptions);
    this.Util.querySysconst(this, "006", this.$store.state.SeasonOptions);
    this.Util.querySysconst(this, "009", this.$store.state.PeriodsOptions);
    this.Util.querySysconst(this, "101", this.$store.state.GradeOptions);
    this.Util.querySysconst(this, "001", this.$store.state.ProjectTypeOptions);
    this.Util.querySysconst(this, "003", this.$store.state.ClassTypeOptions);
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
          this.GlobalVal.httpLink.queryRefundRecord,
          JSON.stringify(this.objData)
        )
        .then(
          res => {
            this.loading = false;
            if (res.data.code === "10000") {
              this.dataList = res.data.refundRecords;
              this.count = res.data.count;
              this.sumRefund = res.data.sumRefund;
              this.$emit("getTitleData", "signUpRefund", res.data.countMap);
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
    // 导出查询列表数据
    exportList() {
      const dates = this.times || ["", ""];
      this.objData.startTime = this.Util.TimeCycle(
        new Date(dates[0]).getTime()
      );
      this.objData.endTime = this.Util.TimeCycle(
        new Date(new Date(dates[1])).getTime()
      );
      this.$exportExcel({
        dataList: this.dataList,
        objData: this.objData,
        httpUrl: "exportRefund",
        title: this.$route.meta.title
      });
    }
  }
};
</script>

<style>
.refund-table .select-options {
  display: flex;
  flex-flow: wrap;
  margin-bottom: 5px;
}
.refund-table .select-options > div {
  margin: 0 10px 10px 0;
}
.refund-table .select-options .el-input--mini .el-input__inner,
.refund-table .select-options .el-input.el-input--mini {
  height: 30px !important;
}
.refund-table .select-options .export {
  display: inline-flex;
  flex-grow: 1;
  justify-content: flex-end;
}
.el-pagination {
  display: flex;
  justify-content: flex-end;
}
.pagination-sum > span {
  margin-right: 20px;
}
.pagination-sum > span > b {
  font-size: 16px;
}
</style>
