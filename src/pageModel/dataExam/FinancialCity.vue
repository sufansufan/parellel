<template>
  <div class="financial-city">
    <div class="select-option-box">
      <div>
        <el-date-picker v-model="startDate" type="month" placeholder="选择月" size="mini"></el-date-picker>
      </div>
      <div>
        <el-cascader clearable size="mini" change-on-select expand-trigger="click" :options="location" v-model="selectedLocation" placeholder="学校不限" style="width:200px;">
        </el-cascader>
      </div>
      <div>
        <el-select clearable v-model="search.particular_year" size="mini" placeholder="年度">
          <el-option v-for="item in $store.state.YearOptions" :key="item.code" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <el-select clearable v-model="search.season" size="mini" placeholder="季节">
          <el-option v-for="item in $store.state.SeasonOptions" :key="item.code" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <el-select clearable v-model="search.grade" size="mini" placeholder="年级不限">
          <el-option v-for="item in $store.state.GradeOptions" :key="item.code" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <el-select clearable v-model="search.period" size="mini" placeholder="期别不限">
          <el-option v-for="item in $store.state.PeriodsOptions" :key="item.code" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <el-select clearable v-model="search.subject" size="mini" placeholder="科目不限">
          <el-option v-for="item in $store.state.SubjectOptions" :key="item.code" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <el-button size="mini" type="primary" style="width:100px;" @click="exportFinancialConfirmation('all')">导出</el-button>
      </div>
    </div>
    <div class="table-list">
      <el-table size="mini" :data="dataList" stripe style="width: 100%" v-loading="loading">
        <el-table-column prop="school_name" label="大区"></el-table-column>
        <el-table-column prop="branch_school_name" label="市"></el-table-column>
        <el-table-column prop="campus_name" label="校区" v-if="linkFinancal === 'campus'"></el-table-column>
        <el-table-column prop="total_payment" label="总收入" width="120px"></el-table-column>
        <el-table-column prop="class_payment" label="课程收入" width="120px"></el-table-column>
        <el-table-column prop="other_payment" label="其他收费"></el-table-column>
        <el-table-column prop="class_confirm" label="课程确认收入" width="120px"></el-table-column>
        <el-table-column prop="other_confirm" label="其他确认收入" width="120px"></el-table-column>
        <el-table-column prop="class_refund" label="课程退费" width="120px"></el-table-column>
        <el-table-column prop="other_refund" label="其他退费"></el-table-column>
        <el-table-column prop="classnum" label="班级数"></el-table-column>
        <el-table-column prop="actual_attend_student_num" label="授课人次"></el-table-column>
        <el-table-column prop="checkin_normal_num" label="签到"></el-table-column>
        <el-table-column prop="checkin_late_num" label="迟到"></el-table-column>
        <!-- <el-table-column prop="checkin_leave_num" label="请假"></el-table-column>
        <el-table-column prop="checkin_absent_num" label="旷课"></el-table-column> -->
        <el-table-column prop="mend_register_num" label="补签"></el-table-column>
        <!-- <el-table-column prop="checkin_null_num" label="未签到"></el-table-column> -->
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="exportFinancialConfirmation('self', scope.row)">导出</el-button>
          </template>
        </el-table-column>
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
  props: ["linkFinancal"],
  data() {
    return {
      limit: 10,
      page: 0,
      count: 0,
      dataTitle: {},
      selectMonth: new Date(),
      dataList: [],
      location: [],
      selectedLocation: [],
      startDate: new Date(),
      search: {
        particular_year: "",
        season: "",
        grade: "",
        period: "",
        subject: ""
      },
      loading: true
    };
  },
  created() {
    this.linkFinancal === "cityLevel"
      ? this.Util.queryAreaNav(this, 3, () => this.getData())
      : this.Util.queryAreaNav(this, -1, () => this.getData());
    this.location = this.$store.state.location;
    this.Util.querySysconst(this, "006", this.$store.state.SeasonOptions);
    this.Util.querySysconst(this, "101", this.$store.state.GradeOptions);
    this.Util.querySysconst(this, "100", this.$store.state.SubjectOptions);
    this.Util.querySysconst(this, "009", this.$store.state.PeriodsOptions);
  },
  watch: {
    selectedLocation(o, n) {
      if (
        this.selectedLocation.includes(
          JSON.parse(window.sessionStorage.getItem("staff")).staffOrganId
        )
      ) {
        if (o[o.length - 1] !== n[n.length - 1]) {
          this.organ_id = o[o.length - 1];
          this.page = 0;
          this.getData();
        }
      } else if (this.selectedLocation.length === 0) {
        this.organ_id = "";
        this.page = 0;
        this.getData();
      }
    },
    startDate() {
      this.page = 0;
      this.getData();
    },
    search: {
      handler() {
        this.page = 0;
        this.getData();
      },
      deep: true
    },
    dataTitle() {
      for (const key in this.dataTitle) {
        this.dataTitle[key] !== null
          ? (this.dataTitle[key] = this.dataTitle[key].toLocaleString())
          : (this.dataTitle[key] = 0);
      }
    }
  },
  methods: {
    getData() {
      this.objData = {
        limit: this.limit,
        page: this.page,
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        source: this.GlobalVal.constants.source,
        organ_id:
          this.organ_id ||
          JSON.parse(window.sessionStorage.getItem("staff")).staffOrganId,
        operationType: this.linkFinancal === "cityLevel" ? 1 : 2,
        endDate: "",
        startDate: (this.startDate && this.startDate.getTime()) || "",
        ...this.search
      };
      this.loading = true;
      this.$axios
        .post(
          this.GlobalVal.httpLink.confirmIncomeStatement,
          JSON.stringify(this.objData)
        )
        .then(
          res => {
            if (res.data.code === "10000") {
              this.count = res.data.data.financeStatistics.count;
              this.dataList = res.data.data.financeStatistics.list;
              this.dataTitle = res.data.data.financeStatistics.statistic;
              this.dataList.map(item => {
                item.total_payment =
                  (item.total_payment && item.total_payment.toFixed(2)) ||
                  "0.00";
                item.class_payment =
                  (item.class_payment && item.class_payment.toFixed(2)) ||
                  "0.00";
                item.other_payment =
                  (item.other_payment && item.other_payment.toFixed(2)) ||
                  "0.00";
                item.class_confirm =
                  (item.class_confirm && item.class_confirm.toFixed(2)) ||
                  "0.00";
                item.other_confirm =
                  (item.other_confirm && item.other_confirm.toFixed(2)) ||
                  "0.00";
                item.class_refund =
                  (item.class_refund && item.class_refund.toFixed(2)) || "0.00";
                item.other_refund =
                  (item.other_refund && item.other_refund.toFixed(2)) || "0.00";
                return item;
              });
              this.$emit("getTitleData", this.linkFinancal, this.dataTitle);
            } else {
              this.$message({
                type: "error",
                message: res.data.errmsg
              });
            }
            this.loading = false;
          },
          res => {
            this.$message("请求失败");
            this.loading = false;
          }
        );
    },
    //每页条数
    handleSizeChange(val) {
      this.limit = val;
      this.getData();
    },
    //翻页
    handleCurrentChange(val) {
      this.page = val - 1;
      this.getData();
    },
    exportFinancialConfirmation(type, row) {
      console.log(row);
      if (type === "self") {
        this.linkFinancal === "cityLevel"
          ? (this.objData.organ_id = row.branch_school_id)
          : (this.objData.organ_id = row.campus_id);
      }
      this.objData.startDate = this.Util.TimeCycle(
        this.objData.startDate,
        "ym"
      );
      this.$exportExcel({
        dataList: this.dataList,
        objData: this.objData,
        httpUrl:
          type === "all"
            ? "exportConfirmIncomeStatement"
            : "exportFinanceConfirmSign",
        title: this.$route.meta.title
      });
    }
  }
};
</script>

<style>
.select-option-box .el-select,
.select-option-box .el-cascader,
.select-option-box .el-date-picker,
.select-option-box .el-button {
  margin-bottom: 20px;
}
.select-option-box > div {
  margin-right: 5px;
}
.select-option-box {
  display: flex;
  flex-wrap: wrap;
}
</style>
