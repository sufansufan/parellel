<template>
  <div class="table">
    <div class="class-query-screen">
      <el-select v-model="particularYear" size="mini" placeholder="年度">
        <el-option v-for="item in $store.state.YearOptions" :key="item.code" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="season" size="mini" placeholder="季节">
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
    </div>
    <div class="class-query-box">
      <el-cascader clearable size="mini" change-on-select expand-trigger="click" :options="location" v-model="selectedLocation" placeholder="学校不限" style="margin-right:5px;width:200px;">
      </el-cascader>
      <div class="search-warp">
        <el-input size="mini" clearable v-model="select_word" placeholder="请输入搜索内容" class="search-input">
          <el-select style="width: 100px;" v-model="selectTeacherOrClass" slot="prepend" placeholder="请选择">
            <el-option label="老师姓名" value="teacher"></el-option>
            <el-option label="班级" value="class"></el-option>
          </el-select>
          <el-button class="search-btn" slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </div>
      <el-button @click="resetStudent" size="mini" type="primary" style="margin-right: 10px">重置搜索条件</el-button>
      <el-button @click="exportStudent" size="mini" type="primary" v-show="$store.state.code.includes('040201')">导出</el-button>
    </div>
    <el-table size="mini" :data="data" stripe style="width: 100%" v-loading="loading">
      <el-table-column prop="student_no" label="学号" width="120"></el-table-column>
      <el-table-column prop="student_name" label="姓名"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="student_mobile" label="联系方式" width="120"></el-table-column>
      <el-table-column prop="father_mobile" label="父亲电话"></el-table-column>
      <el-table-column prop="mother_mobile" label="母亲电话"></el-table-column>
      <el-table-column prop="primary_school" label="就读小学"></el-table-column>
      <el-table-column prop="middle_school" label="就读中学"></el-table-column>
      <el-table-column prop="high_school" label="就读高中"></el-table-column>
      <el-table-column prop="branch_school_name" label="城市名称"></el-table-column>
      <el-table-column prop="campus_name" label="校区名称"></el-table-column>
      <el-table-column prop="particular_year" label="年份"></el-table-column>
      <el-table-column prop="season" label="季节"></el-table-column>
      <el-table-column prop="project_type" label="课程类型"></el-table-column>
      <el-table-column prop="department" label="学部"></el-table-column>
      <el-table-column prop="grade" label="年级"></el-table-column>
      <el-table-column prop="subject" label="科目"></el-table-column>
      <el-table-column prop="class_type" label="班型"></el-table-column>
      <el-table-column prop="class_name1" label="班级补充名称"></el-table-column>
      <el-table-column prop="class_name" label="班级名称" width="250px"></el-table-column>
      <el-table-column prop="class_campus_name" label="班级所属校区"></el-table-column>
      <el-table-column prop="orderstatus" label="状态"></el-table-column>
      <el-table-column prop="teacher_name" label="教师"></el-table-column>
      <el-table-column prop="date_slot_name" label="日期安排规律"></el-table-column>
      <el-table-column prop="class_week_day" label="重复周期"></el-table-column>
      <el-table-column prop="start_time" label="上课时间"></el-table-column>
      <el-table-column prop="end_time" label="下课时间"></el-table-column>
      <el-table-column prop="spendhours" label="课时"></el-table-column>
      <el-table-column prop="newOrOldStudent" label="新/老生"></el-table-column>
      <el-table-column :label="yearSeason.one" v-if="yearSeason.one !== ''" width="120">
        <template slot-scope="scope">
          {{scope.row.isOne === true ? '续报' : '流失'}}
        </template>
      </el-table-column>
      <el-table-column :label="yearSeason.two" v-if="yearSeason.two !== ''" width="120">
        <template slot-scope="scope">
          {{scope.row.isTwo === true ? '续报' : '流失'}}
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :current-page="page + 1" :total="count" :page-size="limit" :page-sizes="[10,20,30,50]">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //数据
      dataList: [],
      limit: 10,
      page: 0,
      count: 0,
      //搜索条件
      selectedLocation: [],
      selectTeacherOrClass: "teacher",
      select_word: "",
      particularYear: new Date().getFullYear(),
      season: "",
      periods: "",
      grade: "",
      subject: "",
      projectType: "",
      classType: "",
      department: "",
      teacherName: "",
      className: "",
      //判断
      loading: false,
      yearSeason: {
        one: "",
        two: ""
      }
    };
  },
  created() {
    if (new Date().getMonth() + 1 < 6) {
      this.season = "00604";
    } else if (new Date().getMonth() + 1 < 9 && new Date().getMonth() + 1 > 5) {
      this.season = "00601";
    } else if (
      new Date().getMonth() + 1 < 13 &&
      new Date().getMonth() + 1 > 8
    ) {
      this.season = "00602";
    }
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
      }
      this.page = 0;
      this.getData();
    },
    particularYear: function() {
      this.page = 0;
      this.getData();
    },
    season: function() {
      this.page = 0;
      this.getData();
    },
    periods: function() {
      this.page = 0;
      this.getData();
    },
    grade: function() {
      this.page = 0;
      this.getData();
    },
    subject: function() {
      this.page = 0;
      this.getData();
    },
    projectType: function() {
      this.page = 0;
      this.getData();
    },
    classType: function() {
      this.page = 0;
      this.getData();
    },
    department: function() {
      this.page = 0;
      this.getData();
    }
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
        item.orderstatus = this.Util.GetLabelForValue(
          self.$store.state.OrderStatusOptions,
          item.orderstatus
        );
        item.sex = item.sex === true ? "男" : "女";
        return item;
      });
    }
  },
  methods: {
    //获取数据
    getData() {
      this.objData = {
        limit: this.limit,
        page: this.page,
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
        organId: this.organId
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
          this.GlobalVal.httpLink.listStudentOperationData,
          JSON.stringify(this.objData)
        )
        .then(
          res => {
            if (res.data.code === "10000") {
              this.loading = false;
              this.count = res.data.data.count;
              this.dataList = res.data.data.studentOperationDataInfos;
              this.yearSeason = res.data.data.particular_year_season || {
                one: "",
                two: ""
              };
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
    //
    handleSizeChange(val) {
      this.limit = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.page = val - 1;
      this.getData();
    },
    //导出数据
    /*         exportStudent(){
            if (!this.dataList.length) {
                this.$message.warning("未查询出数据，无法导出");
                return false;
            }
            let dataLink = this.GlobalVal.httpLink.exportStudentOperationData + '?';
            for (let i in this.objData) {
                (this.objData[i] && i !== 'page' && i !== 'limit' )
                && (dataLink += i + "=" + this.objData[i] + "&");
            }
            window.open(dataLink);
        }, */
    exportStudent() {
      this.$exportExcel({
        dataList: this.dataList,
        objData: this.objData,
        httpUrl: "exportStudentOperationData",
        title: this.$route.meta.title
      });
    },
    search() {
      this.page = 0;
      this.getData();
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
  width: 12.2%;
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
</style>
