<template>
  <div class="income-list">
    <div class="select-income-screen">
      <div class="select-income-organ">
        <div>
          <el-date-picker clearable unlink-panels v-model="dateSlot" align="right" size="mini" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00','23:59:59']" :picker-options="pickerOptions">
          </el-date-picker>
        </div>
        <div>
          <el-cascader clearable size="mini" change-on-select expand-trigger="click" :options="location" v-model="selectedLocation" placeholder="学校不限">
          </el-cascader>
        </div>
      </div>
      <div class="select-income-options">
        <div>
          <el-select clearable v-model="option.particularYear" size="mini" placeholder="年度">
            <el-option v-for="item in $store.state.YearOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select clearable v-model="option.season" size="mini" placeholder="季节">
            <el-option v-for="item in $store.state.SeasonOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select clearable v-model="option.periods" size="mini" placeholder="期别">
            <el-option v-for="item in $store.state.PeriodsOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select clearable v-model="option.grade" size="mini" placeholder="年级不限">
            <el-option v-for="item in $store.state.GradeOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select clearable v-model="option.subject" size="mini" placeholder="科目不限">
            <el-option v-for="item in $store.state.SubjectOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select clearable v-model="option.projectType" size="mini" placeholder="类别不限">
            <el-option v-for="item in $store.state.ProjectTypeOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select clearable v-model="option.classType" size="mini" placeholder="班型不限">
            <el-option v-for="item in $store.state.ClassTypeOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <div class="search-warp">
            <el-input size="mini" clearable v-model.trim="className" placeholder="请输入班级名称" @keyup.enter.native="searchClass" class="input-with-select">
              <el-button class="search-btn" slot="append" icon="el-icon-search" @click="searchClass" style="border-radius:0px;"></el-button>
            </el-input>
          </div>
        </div>
        <div>
          <el-button size="mini" type="primary" v-if="$store.state.code.includes('030101')" @click="exportClass('all')">导出</el-button>
        </div>
      </div>
    </div>
    <div class="table-list">
      <el-table size="mini" :data="dataList" stripe style="width: 100%" v-loading="loading" sort-change="sortChange">
        <el-table-column prop="school_name" label="大区"></el-table-column>
        <el-table-column prop="city_name" label="市"></el-table-column>
        <el-table-column prop="campus_name" label="校区" v-if="incomeLink === 'campus'"></el-table-column>
        <el-table-column prop="signup_income" label="总收入" sortable width="100"></el-table-column>
        <el-table-column prop="signup_fee" label="课程收入" sortable width="110"></el-table-column>
        <el-table-column prop="other_fee" label="其他收费" sortable width="110"></el-table-column>
        <el-table-column prop="refund_fee" label="课程退费" sortable width="110"></el-table-column>
        <el-table-column prop="other_refund_fee" label="其他退费" sortable width="110"></el-table-column>
        <el-table-column prop="signup_stu_count" label="报名总人数" sortable width="150"></el-table-column>
        <el-table-column prop="count_signup_stu" label="报名总人次" sortable width="150"></el-table-column>
        <el-table-column prop="refund_stu_count" label="退费总人数" sortable width="150"></el-table-column>
        <el-table-column prop="count_refund_stu" label="退费总人次" sortable width="150"></el-table-column>
        <el-table-column prop="service_charge" label="手续费" sortable width="100"></el-table-column>
        <el-table-column prop="financialincome" label="财务收入" sortable width="110"></el-table-column>
        <el-table-column label="操作" width="100" v-if="$store.state.code.includes('030101')" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="exportClass('self', scope.row)">导出</el-button>
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
  props: ["incomeLink"],
  data() {
    return {
      limit: 10,
      page: 0,
      count: 0,
      dataTitle: {},
      dateSlot: [],
      dataList: [],
      startTime:
        new Date().getTime() - 3600 * 1000 * 24 * (new Date().getDate() - 1),
      endTime: new Date().getTime(),
      location: [],
      selectedLocation: [],
      option: {
        particularYear: "",
        periods: "",
        season: "",
        grade: "",
        subject: "",
        projectType: "",
        classType: ""
      },
      dateSlot: [
        new Date().getTime() - 3600 * 1000 * 24 * (new Date().getDate() - 1),
        new Date()
      ],
      campusId: "",
      loading: true,
      className: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
  created() {
    this.incomeLink === "campus"
      ? this.Util.queryAreaNav(this, -1, () => this.getData())
      : this.Util.queryAreaNav(this, 3, () => this.getData());
    this.location = this.$store.state.location;
    this.Util.querySysconst(this, "006", this.$store.state.SeasonOptions);
    this.Util.querySysconst(this, "009", this.$store.state.PeriodsOptions);
    this.Util.querySysconst(this, "101", this.$store.state.GradeOptions);
    this.Util.querySysconst(this, "100", this.$store.state.SubjectOptions);
    this.Util.querySysconst(this, "001", this.$store.state.ProjectTypeOptions);
    this.Util.querySysconst(this, "003", this.$store.state.ClassTypeOptions);
  },
  watch: {
    option: {
      handler() {
        this.getData();
        this.page = 0;
      },
      deep: true
    },
    dataTitle() {
      for (const key in this.dataTitle) {
        this.dataTitle[key] = this.dataTitle[key].toLocaleString();
      }
    },
    selectedLocation: function(o, n) {
      if (
        this.selectedLocation.includes(
          JSON.parse(window.sessionStorage.getItem("staff")).staffOrganId
        )
      ) {
        if (o[o.length - 1] !== n[n.length - 1]) {
          this.campusId = o[o.length - 1];
          this.page = 0;
          this.getData();
        }
      } else if (this.selectedLocation.length === 0) {
        this.campusId = "";
        this.page = 0;
        this.getData();
      }
    },
    dateSlot: function() {
      if (this.dateSlot) {
        this.startTime = this.Util.TimeCycle(
          new Date(this.dateSlot[0]).getTime(),
          "ymd"
        );
        this.endTime = this.Util.TimeCycle(
          new Date(this.dateSlot[1]).getTime(),
          "ymd"
        );
      } else {
        this.startTime = "";
        this.endTime = "";
      }
      this.page = 0;
      this.getData();
    }
  },
  methods: {
    getData() {
      this.objData = {
        limit: this.limit,
        page: this.page,
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        source: this.GlobalVal.constants.source,
        startTime: this.startTime,
        endTime: this.endTime,
        particularYear: this.option.particularYear,
        season: this.option.season,
        periods: this.option.periods,
        grade: this.option.grade,
        subject: this.option.subject,
        projectType: this.option.projectType,
        classType: this.option.classType,
        campusId: this.campusId,
        className: this.className,
        level: this.incomeLink === "campus" ? 3 : 2
      };
      this.loading = true;
      this.$axios
        .post(
          this.GlobalVal.httpLink.listFinancialIncome,
          JSON.stringify(this.objData)
        )
        .then(
          res => {
            if (res.data.code === "10000") {
              this.count = res.data.data.count;
              this.dataList = res.data.data.financialIncomes;
              this.dataTitle = res.data.data.countMap;
              this.$emit("getTitleData", this.incomeLink, this.dataTitle);
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
    searchClass() {
      this.getData();
      this.page = 0;
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
    exportClass(type, row) {
      let obj = {};
      if (type === "self") {
        obj = {
          staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
          source: this.GlobalVal.constants.source,
          organId: row.organ_id,
          startDate: this.Util.TimeCycle(this.startTime),
          endDate: this.Util.TimeCycle(this.endTime)
        };
      } else {
        this.objData.startTime = this.Util.TimeCycle(this.objData.startTime);
        this.objData.endTime = this.Util.TimeCycle(this.objData.endTime);
      }
      this.$exportExcel({
        dataList: this.dataList,
        objData: type === "all" ? this.objData : obj,
        httpUrl: type === "all" ? "exportFinancialIncome" : "exportBigOrder",
        title: this.$route.meta.title
      });
    }
  }
};
</script>

<style>
.select-income-screen .el-select,
.select-income-screen .el-date-picker,
.select-income-screen .el-cascader {
  margin-right: 5px;
  margin-bottom: 10px;
}
.select-income-organ {
  display: flex;
  flex-wrap: wrap;
}
.select-income-organ > div {
  margin-right: 5px;
}
.select-income-options {
  display: flex;
  flex-wrap: wrap;
}
.income-list .search-warp {
  margin-right: 5px;
  width: 345px;
}
.select-income-screen .search-warp .el-input-group__append {
  border-radius: 0px !important;
}
.income-list .table-list {
  margin-top: 20px;
}
</style>
