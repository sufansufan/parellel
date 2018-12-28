<template>
  <div class="table">
    <div>
       <Refund-title-list>
        <ul>
          <li v-for="(item, index) in titleType" :key="index">
            <span>●</span>
            <div>
              <p>{{item.label}}</p>
              <p>{{statistics[item.value]}}</p>
            </div>
          </li>
        </ul>
      </Refund-title-list>
    </div>
    <div class="class-query-screen">
      <el-select clearable v-model="particularYear" size="mini" placeholder="年度">
        <el-option v-for="item in $store.state.YearOptions" :key="item.code" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select clearable v-model="season" size="mini" placeholder="季节">
        <el-option v-for="item in $store.state.SeasonOptions" :key="item.code" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select clearable v-model="periods" size="mini" placeholder="期别不限">
        <el-option v-for="item in $store.state.PeriodsOptions" :key="item.code" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select clearable v-model="grade" size="mini" placeholder="年级不限">
        <el-option v-for="item in $store.state.GradeOptions" :key="item.code" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select clearable v-model="subject" size="mini" placeholder="科目不限">
        <el-option v-for="item in $store.state.SubjectOptions" :key="item.code" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select clearable v-model="projectType" size="mini" placeholder="类别不限">
        <el-option v-for="item in $store.state.ProjectTypeOptions" :key="item.code" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select clearable v-model="classType" size="mini" placeholder="班型不限">
        <el-option v-for="item in $store.state.ClassTypeOptions" :key="item.code" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="department" clearable size="mini" placeholder="请选择学部">
        <el-option v-for="item in $store.state.DepartmentOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-cascader clearable size="mini" change-on-select expand-trigger="click" :options="location" v-model="selectedLocation" placeholder="学校不限" style="margin-right:5px;width:200px;">
      </el-cascader>
    </div>
    <div class="class-query-box">
      <div class="search-warp">
        <el-input size="mini" clearable v-model="select_word" placeholder="请输入搜索内容" class="search-input">
          <el-select style="width: 100px;" v-model="selectTeacherOrClass" slot="prepend" placeholder="请选择">
            <el-option label="老师姓名" value="teacher"></el-option>
            <el-option label="班级" value="class"></el-option>
          </el-select>
          <el-button class="search-btn" slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </div>
      <div class="checkbox-box">
        <el-checkbox v-model="mondayOnly">周一</el-checkbox>
        <el-checkbox v-model="tuesdayOnly">周二</el-checkbox>
        <el-checkbox v-model="wednesdayOnly">周三</el-checkbox>
        <el-checkbox v-model="thursdayOnly">周四</el-checkbox>
        <el-checkbox v-model="fridayOnly">周五</el-checkbox>
        <el-checkbox v-model="saturdayOnly">周六</el-checkbox>
        <el-checkbox v-model="sundayOnly">周日</el-checkbox>
        <el-checkbox v-model="morningOnly">上午</el-checkbox>
        <el-checkbox v-model="afternoonOnly">下午</el-checkbox>
        <el-checkbox v-model="nightOnly">晚上</el-checkbox>
        <!-- <el-checkbox v-model="resubmitClassOnly">只显示续报班级</el-checkbox> -->
        <el-checkbox v-model="notFullClassOnly">只显示未满班级</el-checkbox>
      </div>
      <el-button @click="resetClass" size="mini" type="primary" style="margin-right:10px">重置条件</el-button>
      <el-button @click="exportClass" size="mini" type="primary" v-show="$store.state.code.includes('040101')">导出</el-button>
    </div>
    <el-table size="mini" :data="data" stripe style="width: 100%" v-loading="loading">
      <el-table-column prop="particular_year" label="年份"></el-table-column>
      <el-table-column prop="season" label="季节"></el-table-column>
      <el-table-column prop="branch_school_name" label="城市名称"></el-table-column>
      <el-table-column prop="campus_name" label="校区名称"></el-table-column>
      <el-table-column prop="project_type" label="课程类别"></el-table-column>
      <el-table-column prop="department" label="学部"></el-table-column>
      <el-table-column prop="grade" label="年级"></el-table-column>
      <el-table-column prop="subject" label="科目"></el-table-column>
      <el-table-column prop="class_type" label="班型"></el-table-column>
      <el-table-column prop="class_name" label="班级名称" width="300px"></el-table-column>
      <el-table-column prop="class_name1" label="班级补充名称"></el-table-column>
      <el-table-column prop="classroom_name" label="教室"></el-table-column>
      <el-table-column prop="teacher_name" label="教师"></el-table-column>
      <el-table-column prop="date_name" label="日期模板名称"></el-table-column>
      <el-table-column prop="class_week_day" label="重复周期"></el-table-column>
      <el-table-column prop="start_time" label="上课时间"></el-table-column>
      <el-table-column prop="end_time" label="下课时间"></el-table-column>
      <el-table-column prop="classHour" label="课时"></el-table-column>
      <el-table-column prop="total_times" label="总课次"></el-table-column>
      <el-table-column prop="total_price" label="总金额"></el-table-column>
      <el-table-column prop="max_students_no" label="限额"></el-table-column>
      <el-table-column prop="signup_number" label="报名人数"></el-table-column>
      <el-table-column prop="turnInNumber" label="转入人数"></el-table-column>
      <el-table-column prop="turnOutNumber" label="转出人数"></el-table-column>
      <el-table-column prop="payment_number" label="在班人数"></el-table-column>
      <el-table-column prop="remain_number" label="剩余名额"></el-table-column>
      <el-table-column prop="fullRate" label="满班率"></el-table-column>
      <el-table-column prop="continuedClassNumber" label="续下期人数"></el-table-column>
      <el-table-column prop="continuedClassRate" label="续班率"></el-table-column>
      <el-table-column prop="beforeClassRefundNumber" label="课前退费人数"></el-table-column>
      <el-table-column prop="inClassRefundNumber" label="课中退费人数"></el-table-column>
      <el-table-column prop="inClassRefundRate" label="课中退费率"></el-table-column>
      <el-table-column prop="refundRate" label="总退费率"></el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :current-page="page + 1" :total="count" :page-size="limit" :page-sizes="[10,20,30,50]">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import RefundTitleList from '../dataExam/RefundTitleList'
export default {
  components: {
    RefundTitleList
  },
  data() {
    return {
      //数据
      dataList: [],
      limit: 10,
      page: 0,
      count: 0,
      loading: false,
      objData: {},
      //搜索条件
      selectedLocation: [],
      selectTeacherOrClass: "teacher",
      select_word: "",
      particularYear: "",
      season: "",
      periods: "",
      grade: "",
      subject: "",
      projectType: "",
      classType: "",
      teacherName: "",
      className: "",
      department: "",
      notFullClassOnly: false, //只显示未满班级
      resubmitClassOnly: false, //只显示续报班级
      mondayOnly: false, //只显示周一有课的班级
      tuesdayOnly: false, //只显示周二有课的班级
      wednesdayOnly: false, //只显示周三有课的班级
      thursdayOnly: false, //只显示周四有课的班级
      fridayOnly: false, //只显示周五有课的班级
      saturdayOnly: false, //只显示周六有课的班级
      sundayOnly: false, //只显示周日有课的班级
      morningOnly: false, //只显示上午有课的班级
      afternoonOnly: false, //只显示下午有课的班级
      nightOnly: false, //只显示晚上有课的班级
      isnotfinished: false, //只显示未结课班级
      statistics: {},
      titleType: [
        {
          label: "班级数量",
          value: "count",
        },
        {
          label: "班级限额人次",
          value: "maxstudentsnocount",
        },
        {
          label: "在读人次",
          value: "paymentnumbercount",
        },
        {
          label: "剩余名额",
          value: "remainnumbercount",
        },
        {
          label: "总满班率",
          value: "fullRateCount",
        },
        {
          label: "课前退费人数",
          value: "beforeclassrefundnumbercount"
        },
        {
          label: "总课前退费率",
          value: "beforeClassRefundNumberRateCount"
        },
        {
          label: "课中退费人数",
          value: "inclassrefundnumbercount"
        },
         {
          label: "总课中退费率",
          value: "inClassRefundRateCount"
        },
         {
          label: "总退费率",
          value: "refundRateCount"
        }
      ]
    };
  },
  created() {
    this.Util.querySysconst(this, "100", this.$store.state.SubjectOptions); //查询科目
    this.Util.querySysconst(this, "006", this.$store.state.SeasonOptions); //查询季节
    this.Util.querySysconst(this, "009", this.$store.state.PeriodsOptions); //查询期别
    this.Util.querySysconst(this, "101", this.$store.state.GradeOptions); //查询年级
    this.Util.querySysconst(this, "001", this.$store.state.ProjectTypeOptions); //项目类型类别不限
    this.Util.querySysconst(this, "003", this.$store.state.ClassTypeOptions); //查询班型
    this.Util.querySysconst(this, "007", this.$store.state.DepartmentOptions); //查询学部
    const self = this;
    this.location = this.$store.state.location;
    this.Util.queryAreaNav(self, -1, function() {
      self.getData();
    });
    //this.organId = this.$store.state.organId;
  },
  computed: {
    data() {
      const self = this;
      if (!this.dataList) {
        return [];
      }
      return this.dataList.map(item => {
        item.season = this.Util.GetLabelForValue(
          self.$store.state.SeasonOptions,
          item.season
        );
        item.project_type = this.Util.GetLabelForValue(
          self.$store.state.ProjectTypeOptions,
          item.project_type
        );
        item.department = this.Util.GetLabelForValue(
          self.$store.state.DepartmentOptions,
          item.department
        );
        item.grade = this.Util.GetLabelForValue(
          self.$store.state.GradeOptions,
          item.grade
        );
        item.subject = this.Util.GetLabelForValue(
          self.$store.state.SubjectOptions,
          item.subject
        );
        item.class_type = this.Util.GetLabelForValue(
          self.$store.state.ClassTypeOptions,
          item.class_type
        );
        return item;
      });
    }
  },
  watch: {
    selectedLocation: function(o, n) {
      if (
        this.selectedLocation.includes(
          JSON.parse(window.sessionStorage.getItem("staff")).staffOrganId
        )
      ) {
        if (this.selectedLocation.length > 1) {
          if (o[o.length - 1] !== n[n.length - 1]) {
            this.organId = o[o.length - 1];
            this.page = 0;
            this.getData();
          }
        }
      } else if (this.selectedLocation.length === 0) {
        this.organId = "";
        this.page = 0;
        this.getData();
      }
    },
    particularYear: function() {
      this.getData("pageData");
    },
    season: function() {
      this.getData("pageData");
    },
    periods: function() {
      this.getData("pageData");
    },
    grade: function() {
      this.getData("pageData");
    },
    subject: function() {
      this.getData("pageData");
    },
    projectType: function() {
      this.getData("pageData");
    },
    classType: function() {
      this.getData("pageData");
    },
    mondayOnly: function() {
      this.getData("pageData");
    },
    tuesdayOnly: function() {
      this.getData("pageData");
    },
    wednesdayOnly: function() {
      this.getData("pageData");
    },
    thursdayOnly: function() {
      this.getData("pageData");
    },
    fridayOnly: function() {
      this.getData("pageData");
    },
    saturdayOnly: function() {
      this.getData("pageData");
    },
    sundayOnly: function() {
      this.getData("pageData");
    },
    morningOnly: function() {
      this.getData("pageData");
    },
    afternoonOnly: function() {
      this.getData("pageData");
    },
    nightOnly: function() {
      this.getData("pageData");
    },
    resubmitClassOnly: function() {
      this.getData("pageData");
    },
    notFullClassOnly: function() {
      this.getData("pageData");
    },
    department: function() {
      this.getData("pageData");
    }
  },
  methods: {
    //获取数据
    getData(pageData) {
      this.objData = {
        limit: this.limit,
        page: pageData ? (this.page = 0) : this.page,
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        source: this.GlobalVal.constants.source,
        particular_year: this.particularYear,
        season: this.season,
        periods: this.periods,
        grade: this.grade,
        subject: this.subject,
        projectType: this.projectType,
        classType: this.classType,
        teacherName: this.teacherName,
        className: this.className,
        department: this.department,
        organId: this.organId,
        notFullClassOnly: this.notFullClassOnly,
        resubmitClassOnly: this.resubmitClassOnly,
        mondayOnly: this.mondayOnly,
        tuesdayOnly: this.tuesdayOnly,
        wednesdayOnly: this.wednesdayOnly,
        thursdayOnly: this.thursdayOnly,
        fridayOnly: this.fridayOnly,
        saturdayOnly: this.saturdayOnly,
        sundayOnly: this.sundayOnly,
        morningOnly: this.morningOnly,
        afternoonOnly: this.afternoonOnly,
        nightOnly: this.nightOnly,
        isnotfinished: this.isnotfinished
      };
      if (this.selectTeacherOrClass === "class") {
        this.objData.className = this.select_word;
        this.objData.teacherName = "";
      } else {
        this.objData.className = "";
        this.objData.teacherName = this.select_word;
      }
      this.loading = true;
      this.$axios
        .post(
          this.GlobalVal.httpLink.listClassOperationData,
          JSON.stringify(this.objData)
        )
        .then(
          res => {
            if (res.data.code === "10000") {
              console.log("查询班级运营数据列表获取的对象", res.data);
              this.loading = false;
              this.count = res.data.data.count;
              this.dataList = res.data.data.classOperationDataInfos;
              this.statistics =  res.data.data.statistics
              this.statistics.count = res.data.data.count
            } else {
              console.error(res);
              this.loading = false;
              this.$message({
                type: "error",
                message: res.data.errmsg
              });
            }
          },
          res => {
            this.$message("请求失败");
            this.loading = false;
          }
        );
    },
    //重置搜索条件
    resetStudent() {
      this.selectTeacherOrClass = "teacher";
      this.select_word = "";
      this.particularYear = "";
      this.season = "";
      this.periods = "";
      this.grade = "";
      this.subject = "";
      this.projectType = "";
      this.classType = "";
      this.department = "";
      this.page = 0;
    },
    //限制条数
    handleSizeChange(val) {
      this.limit = val;
      this.getData();
    },
    //翻页
    handleCurrentChange(val) {
      this.page = val - 1;
      this.getData();
    },
    search() {
      this.getData("pageData");
    },
    //重置班级数据
    resetClass() {
      this.selectedLocation = [];
      this.selectTeacherOrClass = "teacher";
      this.select_word = "";
      this.particularYear = "";
      this.season = "";
      (this.periods = ""), (this.grade = "");
      this.subject = "";
      this.projectType = "";
      this.classType = "";
      this.teacherName = "";
      this.className = "";
      this.notFullClassOnly = false; //只显示未满班级
      this.resubmitClassOnly = false; //只显示续报班级
      this.mondayOnly = false; //只显示周一有课的班级
      this.tuesdayOnly = false; //只显示周二有课的班级
      this.wednesdayOnly = false; //只显示周三有课的班级
      this.thursdayOnly = false; //只显示周四有课的班级
      this.fridayOnly = false; //只显示周五有课的班级
      this.saturdayOnly = false; //只显示周六有课的班级
      this.sundayOnly = false; //只显示周日有课的班级
      this.morningOnly = false; //只显示上午有课的班级
      this.afternoonOnly = false; //只显示下午有课的班级
      this.nightOnly = false; //只显示晚上有课的班级
      this.isnotfinished = false; //只显示未结课班级
    },
    //导出班级数据
    /*  exportClass(){
             if (!this.dataList.length) {
                this.$message.warning("未查询出数据，无法导出");
                return false;
            }
            let dataLink = this.GlobalVal.httpLink.exportClassOperationData + '?';
            for (let i in this.objData) {
                (this.objData[i] && i !== 'page' && i !== 'limit' )
                && (dataLink += i + "=" + this.objData[i] + "&");
            }
            window.open(dataLink);
        } */
    exportClass() {
      this.$exportExcel({
        dataList: this.dataList,
        objData: this.objData,
        httpUrl: "exportClassOperationData",
        title: this.$route.meta.title
      });
    }
  }
};
</script>
<style scoped>
.class-query-screen {
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
}
.class-query-screen .el-select {
  width: 10.6%;
}
.search-warp .el-input-group__prepend {
  border-radius: 0px !important;
}
.class-query-box {
  display: flex;
  justify-content: flex-start;
}
.class-query-box .el-button {
  height: 29px;
}
.search-warp {
  width: 403px;
  margin-right: 10px;
  padding-bottom: 20px;
}
.checkbox-box {
  margin-right: 20px;
  line-height: 30px;
}
.el-checkbox + .el-checkbox {
  margin-left: 19px !important;
}
</style>
<style>
.el-scrollbar {
  min-width: 170px;
}
</style>
