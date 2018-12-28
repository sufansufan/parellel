<template>
  <div class="financial-body-refund">
    <div class="select-options">
      <div>
        <el-date-picker clearable unlink-panels v-model="times" align="right" size="mini" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00','23:59:59']">
        </el-date-picker>
      </div>
      <div>
        <el-cascader clearable size="mini" change-on-select expand-trigger="click" :options="location" v-model="options.watch.oldOrganId" placeholder="选择原班组织架构">
        </el-cascader>
      </div>
      <div>
        <el-cascader clearable size="mini" change-on-select expand-trigger="click" :options="location" v-model="options.watch.newOrganId" placeholder="选择目标组织架构">
        </el-cascader>
      </div>
      <div>
        <el-select clearable v-model="options.watch.oldParticularYear" size="mini" placeholder="年度">
          <el-option v-for="item in $store.state.YearOptions" :key="item.code" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <el-select clearable v-model="options.watch.oldSeason" size="mini" placeholder="季节">
          <el-option v-for="item in $store.state.SeasonOptions" :key="item.code" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <el-select clearable v-model="options.watch.oldPeriods" size="mini" placeholder="期别">
          <el-option v-for="item in $store.state.PeriodsOptions" :key="item.code" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <el-select clearable v-model="options.watch.oldGrade" size="mini" placeholder="年级不限">
          <el-option v-for="item in $store.state.GradeOptions" :key="item.code" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <el-select clearable v-model="options.watch.oldSubject" size="mini" placeholder="科目不限">
          <el-option v-for="item in $store.state.SubjectOptions" :key="item.code" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <el-select clearable v-model="options.watch.oldProjectType" size="mini" placeholder="类别不限">
          <el-option v-for="item in $store.state.ProjectTypeOptions" :key="item.code" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <el-select clearable v-model="options.watch.oldClassType" size="mini" placeholder="班型不限">
          <el-option v-for="item in $store.state.ClassTypeOptions" :key="item.code" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <el-input clearable size="mini" v-model="options.studentName" placeholder="请输入学员姓名/手机号" @keyup.native.enter="getData">
          <el-button class="search-btn" slot="append" icon="el-icon-search" @click="getData"></el-button>
        </el-input>
      </div>
      <div>
        <el-input clearable size="mini" v-model="options.oldClassName" placeholder="请输入原班级名称" @keyup.native.enter="getData">
          <el-button class="search-btn" slot="append" icon="el-icon-search" @click="getData"></el-button>
        </el-input>
      </div>
      <div>
        <el-input clearable size="mini" v-model="options.newClassName" placeholder="请输入目标班级名称" @keyup.native.enter="getData">
          <el-button class="search-btn" slot="append" icon="el-icon-search" @click="getData"></el-button>
        </el-input>
      </div>
      <div>
        <el-input clearable size="mini" v-model="options.oldFinanceName" placeholder="请输入原财务主体" @keyup.native.enter="getData">
          <el-button class="search-btn" slot="append" icon="el-icon-search" @click="getData"></el-button>
        </el-input>
      </div>
      <div>
        <el-input clearable size="mini" v-model="options.newFinanceName" placeholder="请输入目标财务主体" @keyup.native.enter="getData">
          <el-button class="search-btn" slot="append" icon="el-icon-search" @click="getData"></el-button>
        </el-input>
      </div>
      <div class="export">
        <el-button size="mini" type="primary" @click="exportStepFinance">导出</el-button>
      </div>
    </div>
    <div class="table-list">
      <el-table size="mini" :data="dataList" stripe style="width: 100%" v-loading="loading">
        <el-table-column label="发起时间" width="100px">
          <template slot-scope="scope">
            {{scope.row.created_at | num2time(Util.TimeCycle)}}
          </template>
        </el-table-column>
        <el-table-column prop="old_organ_name" label="校区"></el-table-column>
        <el-table-column prop="old_finance_name" label="财务主体" width="150"></el-table-column>
        <el-table-column prop="old_class_name" label="班级名称" width="250"></el-table-column>
        <el-table-column label="期别">
          <template slot-scope="scope">
            {{scope.row.old_periods | fixStatus($store.state.PeriodsOptions)}}
          </template>
        </el-table-column>
        <el-table-column prop="student_name" label="学员姓名" width="110"></el-table-column>
        <el-table-column prop="student_mobile" label="联系电话" width="120">
        </el-table-column>
        <el-table-column prop="turn_out_times" label="转出课次数" width="100px"></el-table-column>
        <el-table-column label="转出金额" width="100px">
          <template slot-scope="scope">
            ￥{{scope.row.turn_out_amount | fixTofixed}}
          </template>
        </el-table-column>
        <el-table-column prop="new_organ_name" label="目标校区"></el-table-column>
        <el-table-column prop="new_finance_name" label="目标财务主体" width="150"></el-table-column>
        <el-table-column prop="new_class_name" label="目标班级" width="250"></el-table-column>
        <el-table-column label="目标期别" width="100">
          <template slot-scope="scope">
            {{scope.row.new_periods | fixStatus($store.state.PeriodsOptions)}}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="slot, total, sizes, prev, pager, next, jumper" :current-page="page + 1" :total="count" :page-size="limit" :page-sizes="[10,20,30,50]">
        <slot name="slot">
          <span style="padding-right: 10px;">{{amounts}}元</span>
        </slot>
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    crossCampus: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      limit: 10,
      page: 0,
      count: 0,
      amounts: 0,
      dataList: [],
      times: [new Date().getTime() - 3600 * 1000 * 24 * 30, new Date()],
      location: [],
      options: {
        isStepFinace: this.crossCampus,
        startTime: "", //开始时间
        endTime: "", //结束时间
        oldFinanceName: "", //原财务主体名称
        oldClassName: "", //原班级名称
        studentName: "", //学生姓名
        studentMobile: "", //学生电话
        newFinanceName: "", //目标财务主体名称
        newClassName: "", //目标班级名称
        watch: {
          oldOrganId: [], //原组织架构id
          newOrganId: [], //新组织架构id
          oldParticularYear: "", //原班级年份
          oldSeason: "", //原班级季节
          oldPeriods: "", //原班级期别
          oldGrade: "", //原班级年级
          oldSubject: "", //原班级科目
          oldProjectType: "", //原班级类别
          oldClassType: "" //原班级班型
        }
      },
      objData: {},
      loading: false
    };
  },
  created() {
    this.Util.querySysconst(this, "009", this.$store.state.PeriodsOptions); //查询期别
    this.location = this.$store.state.location;
    this.getData();
  },
  watch: {
    times: {
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
    fixStatus(code, status) {
      return code ? status.find(item => item.value === code).label : code;
    }
  },
  methods: {
    getData() {
      const times = this.times || ["", ""];
      this.options.startTime = times[0];
      this.options.endTime = times[1];
      this.objData = {
        source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        page: this.page, //页数
        limit: this.limit //条目数
      };
      const options = JSON.parse(JSON.stringify(this.options));
      if (options.studentName) {
        if (/^\d+$/.test(options.studentName)) {
          options.studentMobile = options.studentName;
          options.studentName = "";
        }
      }
      this.objData = Object.assign({}, this.objData, {
        ...options,
        ...options.watch
      });
      delete this.objData.watch;
      this.objData.oldOrganId = this.objData.oldOrganId.length
        ? this.objData.oldOrganId[this.objData.oldOrganId.length - 1]
        : "";
      this.objData.newOrganId = this.objData.newOrganId.length
        ? this.objData.newOrganId[this.objData.newOrganId.length - 1]
        : "";
      this.loading = true;
      this.$axios
        .post(
          this.GlobalVal.httpLink.listTurnClassHistory,
          JSON.stringify(this.objData)
        )
        .then(
          res => {
            this.loading = false;
            if (res.data.code === "10000") {
              this.dataList = res.data.data.turnClassHistorys;
              this.amounts = res.data.data.amounts;
              this.count = res.data.data.count;
              this.$emit(
                "getTitleData",
                "financialBodyRefund",
                res.data.data.countMap
              );
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
    exportStepFinance() {
      this.objData.startTime = this.Util.TimeCycle(
        new Date((this.times && this.times[0]) || "").getTime()
      );
      this.objData.endTime = this.Util.TimeCycle(
        new Date(this.objData.endTime).getTime()
      );

      this.$exportExcel({
        dataList: this.dataList,
        objData: this.objData,
        httpUrl: "exportTurnClassHistory",
        title: this.$route.meta.title
      });
    }
  }
};
</script>

<style>
.financial-body-refund .select-options {
  display: flex;
  flex-flow: wrap;
  margin-bottom: 5px;
}
.financial-body-refund .select-options > div {
  margin: 0 10px 10px 0;
}
.financial-body-refund .select-options .el-input--mini .el-input__inner,
.financial-body-refund .select-options .el-input.el-input--mini {
  height: 30px !important;
}
.financial-body-refund .select-options .export {
  display: inline-flex;
  flex-grow: 1;
  justify-content: flex-end;
}
</style>
