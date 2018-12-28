<template>
  <div class="financial-class">
    <div class="handle-box">
      <div>
        <el-date-picker size="mini" v-model="daterange" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div>
        <el-cascader clearable size="mini" change-on-select expand-trigger="click" :options="location" v-model="selectedLocation" placeholder="学校不限" style="width:200px;">
        </el-cascader>
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
        <el-button size="mini" type="primary" @click="exportFinancialConfirmation">导出</el-button>
      </div>
      <div style="width: 400px;">
        <el-input size="mini" clearable v-model="selectVal" placeholder="请输入搜索内容" class="search-input" @clear="handleSearch" @keyup.native.enter="handleSearch">
          <el-select style="width: 100px;" v-model="selectTeacherOrClass" slot="prepend" placeholder="请选择">
            <el-option label="老师姓名" value="teacher"></el-option>
            <el-option label="班级名称" value="class"></el-option>
          </el-select>
          <el-button class="search-btn" slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
      <!-- <div>
        <p>总收入￥{{sumAllIncome.all_real_payment | toPrice}}</p>
        <p>实退总额￥{{sumAllIncome.all_refund_amount | toPrice}}</p>
        <p>确认总收入￥{{sumAllIncome.all_confirm_amount | toPrice}}</p>
        <p>剩余总额￥{{sumAllIncome.all_left_amount | toPrice}}</p>
      </div> -->
      </div>
    </div>
    <el-table :data="data" stripe style="width: 100%" v-loading="loading">
      <el-table-column prop="class_name" label="班级名称" width="300"></el-table-column>
      <el-table-column prop="grade" label="年级"></el-table-column>
      <el-table-column prop="subject" label="科目"></el-table-column>
      <el-table-column prop="teacher_name" label="老师"></el-table-column>
      <el-table-column prop="classroom_name" label="教室" width="100px"></el-table-column>
      <el-table-column prop="class_week_day" label="重复周期" width="150px"></el-table-column>
      <el-table-column prop="time_name" label="上课时段" width="100"></el-table-column>
      <el-table-column prop="countSignIn" label="签到"></el-table-column>
      <el-table-column prop="countSignLate" label="迟到"></el-table-column>
      <el-table-column prop="countSignleave" label="请假"></el-table-column>
      <el-table-column prop="countSignAbsent" label="旷课"></el-table-column>
      <el-table-column prop="countNotSignIn" label="未签到人数"></el-table-column>
      <el-table-column prop="countSignAbsenteeism" label="补签"></el-table-column>
      <el-table-column prop="left_amount" label="剩余总额" width="120px"></el-table-column>
      <el-table-column prop="confirm_amount" label="确认收入" width="100px"></el-table-column>
      <el-table-column prop="refund_amount" label="实退金额"></el-table-column>
      <el-table-column prop="real_payment" label="收入" width="100px"></el-table-column>
      <!-- <el-table-column label="操作" width="100px;" fixed="right">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini">收入明细</el-button>
                </template>
            </el-table-column> -->
    </el-table>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChangeClasss" @current-change="handleCurrentChangeClass" layout="total, slot, sizes, prev, pager, next, jumper" :current-page="page + 1" :total="count" :page-size="limit" :page-sizes="[10,20,30,50]">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      limit: 10,
      count: 0,
      page: 0,
      dataList: [],
      loading: false,
      selectedLocation: [],
      daterange: [
        new Date().getTime() - 3600 * 1000 * 24 * (new Date().getDate() - 1),
        new Date()
      ],
      dataList: [],
      search: {},
      selectVal: "",
      selectTeacherOrClass: "class",
      sumAllIncome: {},
      start_time:
        new Date().getTime() - 3600 * 1000 * 24 * (new Date().getDate() - 1),
      end_time: new Date().getTime()
    };
  },
  computed: {
    data() {
      return this.dataList.map(item => {
        item.grade = this.Util.GetLabelForValue(
          this.$store.state.GradeOptions,
          item.grade
        );
        item.subject = this.Util.GetLabelForValue(
          this.$store.state.SubjectOptions,
          item.subject
        );
        return item;
      });
    }
  },
  created() {
    this.location = this.$store.state.location;
    this.Util.queryAreaNav(this, -1, () => this.getData());
    this.Util.querySysconst(this, "009", this.$store.state.PeriodsOptions); //查询期别
    this.Util.querySysconst(this, "101", this.$store.state.GradeOptions); //查询年级
    this.Util.querySysconst(this, "100", this.$store.state.SubjectOptions); //查询科目
  },
  watch: {
    search: {
      handler() {
        this.getData("clearPage");
      },
      deep: true
    },
    selectedLocation(o, n) {
      if (
        this.selectedLocation.includes(
          JSON.parse(window.sessionStorage.getItem("staff")).staffOrganId
        )
      ) {
        if (o[o.length - 1] !== n[n.length - 1]) {
          this.organ_id = o[o.length - 1];
          this.getData("clearPage");
        }
      } else if (this.selectedLocation.length === 0) {
        this.organ_id = "";
        this.getData("clearPage");
      }
    },
    daterange() {
      if (this.daterange) {
        this.start_time = new Date(this.daterange[0]).getTime();
        this.end_time = new Date(this.daterange[1]).getTime();
      } else {
        this.start_time = "";
        this.end_time = "";
      }
      this.getData("clearPage");
    },
    sumAllIncome() {
      for (let key in this.sumAllIncome) {
        this.sumAllIncome[key] = this.sumAllIncome[key].toLocaleString();
      }
    }
  },
  filters: {
    toPrice(val) {
      return val && val.toLocaleString();
    }
  },
  methods: {
    handleSearch() {
      this.page = 0;
      this.getData();
    },
    // 获取数据
    getData(clearPage, campusId) {
      this.campusId = campusId;
      this.objData = {
        limit: this.limit,
        page: clearPage ? (this.page = 0) : this.page,
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        start_time: this.start_time,
        end_time: this.end_time,
        class_name: this.selectTeacherOrClass === "class" ? this.selectVal : "",
        teacher_name:
          this.selectTeacherOrClass === "teacher" ? this.selectVal : "",
        organ_id: campusId ? campusId : this.organ_id || "",
        subject: this.search.subject || "",
        grade: this.search.grade || "",
        period: this.search.period || ""
      };
      this.loading = true;
      this.$axios
        .post(
          this.GlobalVal.httpLink.listFinancialConfirmationByClass,
          JSON.stringify(this.objData)
        )
        .then(
          res => {
            if (res.data.code === "10000") {
              this.count = res.data.data.count;
              this.dataList = res.data.data.financialConfirmations || [];
              this.sumAllIncome = res.data.data.sumAllIncome || {};
              this.$emit("getTitleData", "class", this.sumAllIncome);
            } else {
              console.error(res);
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
    //限制每页的条数
    handleSizeChangeClasss(val) {
      this.limit = val;
      this.getData("clearPage");
    },
    //翻页
    handleCurrentChangeClass(val) {
      this.page = val - 1;
      this.getData("", this.campusId);
    },
    exportFinancialConfirmation() {
      this.objData.start_time = this.Util.TimeCycle(this.start_time);
      this.objData.end_time = this.Util.TimeCycle(this.end_time);
      this.$exportExcel({
        dataList: this.dataList,
        objData: this.objData,
        httpUrl: "exportFinancialConfirmation",
        title: this.$route.meta.title
      });
    }
  }
};
</script>

<style scoped>
.handle-box {
  display: flex;
  flex-wrap: wrap;
}
.handle-box > div {
  margin-right: 5px;
  margin-bottom: 20px;
}
.handle-box > div > button {
  width: 100px;
}
</style>
<style>
.financial-class .handle-box .el-range-editor--mini.el-input__inner {
  height: 31px;
}
</style>
