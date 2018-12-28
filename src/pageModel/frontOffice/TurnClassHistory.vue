<style>
.class-query-screen .el-cascader {
  width: 15.111%;
}
.class-query-screen .el-select {
  width: 10.111%;
}
.el-input-group__append,
.el-input-group__prepend {
  border-radius: 0px !important;
}
.class-query .el-input-group__append {
  background-color: #fff;
}
</style>
<style scoped>
.bg-layer {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
.transition-box.change {
  height: 400px;
}
.transition-box {
  position: absolute;
  width: 600px;
  height: 580px;
  margin: auto;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  border-radius: 4px;
  background-color: #ffffff;
  overflow-y: scroll;
  color: #fff;
  padding-top: 60px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  box-sizing: border-box;
  z-index: 10;
}

.title-warp {
  position: absolute;
  width: 600px;
  height: 50px;
  top: 0px;
  right: 0;
  z-index: 10;
  background: #ffffff;
  -webkit-box-shadow: 0px 0px 3px #ccc;
  -moz-box-shadow: 0px 0px 3px #ccc;
  box-shadow: 0px 0px 3px #ccc;
}
.fotter-warp {
  position: absolute;
  width: 600px;
  height: 50px;
  bottom: 0;
  right: 0;
  z-index: 10;
  background: #ffffff;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  overflow: hidden;
  padding-left: 20px;
}
.transition-box .el-cascader {
  width: 100%;
}
.close-btn {
  position: absolute;
  color: #ff6808;
  font-size: 20px;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.modify-title {
  font-size: 20px;
  height: 50px;
  line-height: 50px;
  color: #666666;
  border-bottom: 1px solid #cccccc;
  text-align: left;
  padding-left: 20px;
}
.handle-box {
  margin-bottom: 10px;
}
.handle-input {
  width: 300px;
  display: inline-block;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.search-input {
  width: 410px;
}

.checkbox-warp {
  margin-top: 10px;
}
.class-query .el-checkbox__label {
  font-size: 12px;
}
.vertical-moulding {
  display: inline-block;
  width: 1px;
  height: 12px;
  background: #cccccc;
  position: relative;
  top: 1px;
  left: 12px;
}
.vertical-moulding + .el-checkbox {
  margin-left: 25px;
}
.titleAttend {
  margin: 10px 0px;
  font-weight: 700;
  color: #554b4b;
  float: left;
}
.el-scrollbar {
  min-width: 162px;
}
.class-query-screen .el-select {
  width: 100%;
}
.class-query-screen > div {
  margin-left: 10px;
  /* margin-bottom: 10px; */
}
.class-query-screen {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}
.hender-box {
  margin-bottom: 10px;
}
</style>
<template>
  <div class="class-query table">
    <div class="handle-box">
      <!--筛选旧条件-->
      <div class="hender-box">
        <el-date-picker size="mini" v-model="startTime" type="date" placeholder="选择开始日期">
        </el-date-picker>
        <el-date-picker size="mini" v-model="endTime" type="date" placeholder="选择结束日期">
        </el-date-picker>
        <el-button @click="exportList" size="mini" type="primary" style="float: right;margin-right: 20px" v-show="$store.state.code.includes('010601')">导出</el-button>
      </div>
      <div class="class-query-screen">
        <div>
          <h3 class="titleAttend">原班级:</h3>
        </div>
        <div>
          <el-select clearable v-model="oldParticularYear" size="mini" placeholder="年度">
            <el-option v-for="item in $store.state.YearOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select clearable v-model="oldSeason" size="mini" placeholder="季节">
            <el-option v-for="item in $store.state.SeasonOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select clearable v-model="oldPeriods" size="mini" placeholder="期别不限">
            <el-option v-for="item in $store.state.PeriodsOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select clearable v-model="oldGrade" size="mini" placeholder="年级不限">
            <el-option v-for="item in $store.state.GradeOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select clearable v-model="oldSubject" size="mini" placeholder="科目不限">
            <el-option v-for="item in $store.state.SubjectOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select clearable v-model="oldProjectType" size="mini" placeholder="类别/课型不限">
            <el-option v-for="item in $store.state.ProjectTypeOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select clearable v-model="oldClassType" size="mini" placeholder="班型不限">
            <el-option v-for="item in $store.state.ClassTypeOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-cascader clearable size="mini" expand-trigger="click" :options="location" v-model="selectedLocation" placeholder="学校不限" change-on-select @change="handleLocationChange" style="width:164px;">
          </el-cascader>
        </div>
        <div class="search-warp">
          <el-input clearable size="mini" v-model="oldTeacherOrClassName" :fetch-suggestions="queryTeacherOrClassname" placeholder="请输入搜索内容" class="search-input">
            <el-select style="width: 100px;" v-model="selectTeacherOrClass" slot="prepend" placeholder="请选择">
              <el-option label="老师姓名" value="teacher"></el-option>
              <el-option label="班级" value="class"></el-option>
            </el-select>
            <el-button class="search-btn" slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </div>
      </div>

      <div class="class-query-screen">
        <div>
          <h3 class="titleAttend">转入班级:</h3>
        </div>
        <div>
          <el-select clearable v-model="newParticularYear" size="mini" placeholder="年度">
            <el-option v-for="item in $store.state.YearOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select clearable v-model="newSeason" size="mini" placeholder="季节">
            <el-option v-for="item in $store.state.SeasonOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select clearable v-model="newPeriods" size="mini" placeholder="期别不限">
            <el-option v-for="item in $store.state.PeriodsOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select clearable v-model="newGrade" size="mini" placeholder="年级不限">
            <el-option v-for="item in $store.state.GradeOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select clearable v-model="newSubject" size="mini" placeholder="科目不限">
            <el-option v-for="item in $store.state.SubjectOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select clearable v-model="newProjectType" size="mini" placeholder="类别不限">
            <el-option v-for="item in $store.state.ProjectTypeOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select clearable v-model="newClassType" size="mini" placeholder="班型不限">
            <el-option v-for="item in $store.state.ClassTypeOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-cascader clearable size="mini" expand-trigger="click" :options="location" v-model="selectedLocation1" placeholder="学校不限" change-on-select @change="handleLocationChange" style="width:164px;">
          </el-cascader>
        </div>
        <div class="search-warp">
          <el-input clearable size="mini" v-model="newTeacherOrClassName" :fetch-suggestions="queryTeacherOrClassname" placeholder="请输入搜索内容" class="search-input">
            <el-select style="width: 100px;" v-model="selectTeacherOrClass" slot="prepend" placeholder="请选择">
              <el-option label="老师姓名" value="teacher"></el-option>
              <el-option label="班级" value="class"></el-option>
            </el-select>
            <el-button class="search-btn" slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </div>
      </div>

    </div>
    <el-table size="mini" :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="student_name" label="学员姓名"></el-table-column>
      <el-table-column prop="student_no" label="学员编码" width="120"></el-table-column>
      <el-table-column prop="student_mobile" label="联系电话" width="110"></el-table-column>
      <el-table-column prop="oldcampus_name" label="原校区"></el-table-column>
      <el-table-column prop="oldclass_name" label="原班级名称" width="250"></el-table-column>
      <el-table-column prop="oldteacher_name" label="老师"></el-table-column>
      <el-table-column prop="oldclass_week_day" label="重复周期"></el-table-column>
      <el-table-column prop="oldtime_interval" label="上课时段" width="100"></el-table-column>
      <el-table-column prop="oldclassroom_name" label="教室"></el-table-column>
      <el-table-column prop="real_payment" label="转班金额"></el-table-column>
      <el-table-column prop="oldleft_times" label="课次剩余"></el-table-column>
      <el-table-column prop="newcampus_name" label="现校区"></el-table-column>
      <el-table-column prop="newclass_name" label="现班级名称" width="250"></el-table-column>
      <el-table-column prop="newteacher_name" label="老师"></el-table-column>
      <el-table-column prop="newclass_week_day" label="重新周期"></el-table-column>
      <el-table-column prop="endtime_interval" label="上课时段" width="100"></el-table-column>
      <el-table-column prop="newclassroom_name" label="教室"></el-table-column>
      <el-table-column prop="staff_name" label="操作人"></el-table-column>
      <el-table-column prop="turn_class_time" label="操作时间" width="100"></el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :current-page="cur_page + 1" :total="count" :page-size="cur_limit" :page-sizes="[10,20,30,50]">
      </el-pagination>
    </div>
    <!--添加/修改弹出框-->
  </div>
</template>

<script>
import vLessonsingle from "./LessonSingle.vue";
import vPayfees from "./PayFees.vue";
export default {
  components: {
    vLessonsingle,
    vPayfees
  },
  data() {
    return {
      cur_page: 0, //页码
      cur_limit: 10, //每次请求的数据数
      count: 0, //数据总量
      organId: null, // 机构id

      //搜索久条件
      selectTeacherOrClass: "teacher",
      className: "", //班级名称
      teacherName: "", //老师名字
      teacherMobile: "", //老师电话
      select_word: "", //搜索的值
      oldParticularYear: "", //旧班级年份
      oldSeason: "", //旧班级季节暑假，秋季，寒假，春季
      oldPeriods: "", //旧班级期别
      oldGrade: "", //旧班级适用年级，一年级，二年级等
      oldSubject: "", //旧班级科目，数学，物理等
      oldProjectType: "", //旧班级项目类型：长期，短期，公益，考试等
      oldClassType: "", //旧班级班型，超常，培优等
      oldTeacherOrClassName: "", //旧教师或班级姓名
      oldCampusName: "", //旧班级校区名称
      oldCampusId: "", //旧班级校区id
      startTime: "", //开始日期
      endTime: "", //结束日期
      //搜索新条件
      newParticularYear: "", //新班级年份
      newSeason: "", //新班级季节暑假，秋季，寒假，春季
      newPeriods: "", //新班级期别
      newGrade: "", //新班级适用年级，一年级，二年级等
      newSubject: "", //新班级科目，数学，物理等
      newProjectType: "", //新班级项目类型：长期，短期，公益，考试等
      newClassType: "", //新班级班型，超常，培优等
      newTeacherOrClassName: "", //新教师或班级姓名
      newCampusName: "", //新班级校区名称
      newCampusId: "", //新班级校区id

      //变量
      role_name: "",
      status: "",
      organ_id2: [], //新增组件内的学校id,
      dataList: [], //请求的list
      roleIds: [],
      location: [], //校区导航
      oldtime_interval: "", //旧时间段
      newtime_interval: "", //新时间段
      selectedLocation: [], //选择校区
      selectedLocation1: [], //
      multipleSelection: [], //选中行的集合
      addTeamLayer: false, //新增弹出框状态
      changeTeamLayer: false, //修改弹出框状态
      //表单校验规则
      rules: {
        class_name: [
          { required: true, message: "请输入班级名称", trigger: "blur" }
        ]
      },
      objData: {} // 请求参数
    };
  },
  //实例创建完成后被立即调用
  created() {
    const self = this;
    this.Util.queryAreaNav(self, undefined, function() {
      self.getData();
    });

    this.Util.querySysconst(self, "006", this.$store.state.SeasonOptions); //查询季节
    this.Util.querySysconst(self, "009", this.$store.state.PeriodsOptions); //查询期别
    this.Util.querySysconst(self, "101", this.$store.state.GradeOptions); //查询年级
    this.Util.querySysconst(this, "100", this.$store.state.SubjectOptions); //查询科目
    this.Util.querySysconst(self, "002", this.$store.state.CourseTypeOptions); //查询类别/课型
    this.Util.querySysconst(self, "003", this.$store.state.ClassTypeOptions); //查询班型
    this.Util.querySysconst(this, "007", this.$store.state.DepartmentOptions); //查询学部
    this.Util.querySysconst(this, "001", this.$store.state.ProjectTypeOptions); //项目类型
    self.location = self.$store.state.location;
    self.organId = self.$store.state.organId;
  },

  //计算属性
  computed: {
    //相当于过滤器
    data() {
      const self = this;
      if (!self.dataList) {
        return [];
      }
      return self.dataList.filter(function(d) {
        d.turn_class_time = self.Util.TimeCycle(d.turn_class_time, "ymd");
        d.oldtime_interval = d.oldstart_time + "-" + d.oldend_time;
        d.endtime_interval = d.newstart_time + "-" + d.newend_time;
        return d;
      });
    }
  },
  watch: {
    selectedLocation: function() {
      if (
        this.selectedLocation.includes(
          JSON.parse(window.sessionStorage.getItem("staff")).staffOrganId
        )
      ) {
        this.oldCampusId = this.selectedLocation[
          this.selectedLocation.length - 1
        ];
        this.getData("pageClear");
      } else if (this.selectedLocation.length === 0) {
        this.oldCampusId = "";
        this.getData("pageClear");
      }
    },
    selectedLocation1: function() {
      if (
        this.selectedLocation1.includes(
          JSON.parse(window.sessionStorage.getItem("staff")).staffOrganId
        )
      ) {
        this.newCampusId = this.selectedLocation1[
          this.selectedLocation1.length - 1
        ];
        this.getData("pageClear");
      } else if (this.selectedLocation1.length === 0) {
        this.newCampusId = "";
        this.getData("pageClear");
      }
    },
    organ_id2: function() {
      console.log(this.organ_id2);
      if (
        this.organ_id2 &&
        this.organ_id2.length &&
        this.organ_id2.length > 0
      ) {
        console.log(this.organ_id2[this.organ_id2.length - 1]);
        this.ruleForm.parent_organ_id = this.organ_id2[
          this.organ_id2.length - 1
        ];
      }
    },
    select_word: function() {
      const self = this;
      self.teacherName = self.select_word;
    },
    oldParticularYear: function() {
      this.getData("pageClear");
    },
    oldSeason: function() {
      this.getData("pageClear");
    },
    oldPeriods: function() {
      this.getData("pageClear");
    },
    oldGrade: function() {
      this.getData("pageClear");
    },
    oldSubject: function() {
      this.getData("pageClear");
    },
    oldProjectType: function() {
      this.getData("pageClear");
    },
    oldClassType: function() {
      this.getData("pageClear");
    },
    newParticularYear: function() {
      this.getData("pageClear");
    },
    newSeason: function() {
      this.getData("pageClear");
    },
    newPeriods: function() {
      this.getData("pageClear");
    },
    newGrade: function() {
      this.getData("pageClear");
    },
    newSubject: function() {
      this.getData("pageClear");
    },
    newProjectType: function() {
      this.getData("pageClear");
    },
    newClassType: function() {
      this.getData("pageClear");
    },
    startTime: function() {
      this.getData("pageClear");
    },
    endTime: function() {
      this.getData("pageClear");
    }
  },
  methods: {
    // 导出查询列表数据
    /*  exportList() {
      if (!this.dataList.length) {
        this.$message.warning("未查询出数据，无法导出");
        return false;
      }
      let dataLink = this.GlobalVal.httpLink.exportTurnClassRefund + "?";
      for (let i in this.objData) {
        this.objData[i] &&
          i !== "page" &&
          i !== "limit" &&
          (dataLink += i + "=" + this.objData[i] + "&");
      }
      window.open(dataLink);
    }, */
    exportList() {
      this.$exportExcel({
        dataList: this.dataList,
        objData: this.objData,
        httpUrl: "exportTurnClassRefund",
        title: this.$route.meta.title
      });
    },
    //获取数据
    getData(pageClear) {
      const self = this;
      this.objData = {
        source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        page: pageClear ? (this.cur_page = 0) : this.cur_page, //页数
        limit: this.cur_limit, //条目数
        startTime: this.startTime
          ? this.Util.TimeCycle(this.startTime.getTime(), "ymd")
          : "", //转班时间开始范围
        endTime: this.endTime
          ? this.Util.TimeCycle(this.endTime.getTime(), "ymd")
          : "", //转班时间结束范围
        oldParticularYear: this.oldParticularYear, //旧班级年份
        oldSeason: this.oldSeason, //旧班级季节暑假，秋季，寒假，春季
        oldPeriods: this.oldPeriods, //旧班级期别
        oldGrade: this.oldGrade, //旧班级适用年级，一年级，二年级等
        oldSubject: this.oldSubject, //旧班级科目，数学，物理等
        oldProjectType: this.oldProjectType, //旧班级项目类型：长期，短期，公益，考试等
        oldClassType: this.oldClassType, //旧班级班型，超常，培优等
        oldTeacherOrClassName: this.oldTeacherOrClassName, //旧教师或班级姓名
        oldCampusName: this.oldCampusName, //旧班级校区名称
        oldCampusId: this.oldCampusId, //旧班级校区id
        newParticularYear: this.newParticularYear, //新班级年份
        newSeason: this.newSeason, //新班级季节暑假，秋季，寒假，春季
        newPeriods: this.newPeriods, //新班级期别
        newGrade: this.newGrade, //新班级适用年级，一年级，二年级等
        newSubject: this.newSubject, //新班级科目，数学，物理等
        newProjectType: this.newProjectType, //新班级项目类型：长期，短期，公益，考试等
        newClassType: this.newClassType, //新班级班型，超常，培优等
        newTeacherOrClassName: this.newTeacherOrClassName, //新教师或班级姓名
        newCampusName: this.newCampusName, //新班级校区名称
        newCampusId: this.newCampusId //新班级校区id
      };
      //搜索框中的选择老师或者是班级搜索
      if (this.selectTeacherOrClass === "class") {
        //this.objData.className=this.select_word;
        //this.objData.teacherName="";
      } else {
        //this.objData.className="";
        //this.objData.teacherName=this.select_word;
      }
      console.log("查询班级发起请求的参数", this.objData);
      this.$axios
        .post(
          this.GlobalVal.httpLink.queryTurnClassHistory,
          JSON.stringify(this.objData)
        )
        .then(
          res => {
            if (res.data.code === "10000") {
              console.log("查询班级列表获取的对象", res.data);
              self.count = res.data.count;
              self.dataList = res.data.turnClassHistories;
            } else {
              console.error(res);
              self.dataList = [];
              /*self.$message({
                                type:"error",
                                message:res.data.errmsg
                            })*/
            }
          },
          res => {
            this.$message("请求失败");
          }
        );
    },
    //重新选择了地区事件
    handleLocationChange(value) {},
    //重新筛选函数
    screening() {
      this.getData();
    },

    //删除事件
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let objData = {
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            delList: [
              {
                id: row.class_id
              }
            ]
          };
          this.$axios
            .post(this.GlobalVal.httpLink.delClassMag, JSON.stringify(objData))
            .then(
              res => {
                if (res.data.code === "10000") {
                  this.$message({
                    type: "success",
                    message: "删除成功!"
                  });
                  this.getData();
                } else {
                  this.$message({
                    type: "error",
                    message: res.data.errmsg
                  });
                }
              },
              res => {
                console.error(res);
                this.$message({
                  type: "error",
                  message: "操作失败"
                });
              }
            );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除操作"
          });
        });
    },
    //下架事件
    handleDown(index, row) {
      const self = this;
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        classId: row.class_id, //班级ID
        status: false //boolean, true:上架， false:下架
      };
      console.log("下架事件发起请求的参数", objData);
      this.$axios
        .post(
          this.GlobalVal.httpLink.changeClassStatus,
          JSON.stringify(objData)
        )
        .then(
          res => {
            if (res.data.code === "10000") {
              this.$message({
                type: "success",
                message: "下架成功!"
              });
              self.getData();
            } else {
              this.$message({
                type: "error",
                message: res.data.errmsg
              });
            }
          },
          res => {
            this.$message({
              type: "error",
              message: "操作失败"
            });
          }
        );
    },
    //删除全部
    delAll() {
      //批量删除按钮触发
      const self = this;
      if (this.multipleSelection.length > 0) {
        this.$confirm("此操作将永久删除这些名单, 是否继续?", "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let delArr = [];
            for (
              let i = 0, length = self.multipleSelection.length;
              i < length;
              i++
            ) {
              delArr.push({
                id: self.multipleSelection[i].class_id
              });
            }

            let objData = {
              staffId: JSON.parse(window.sessionStorage.getItem("staff"))
                .staffId,
              delList: delArr
            };
            self.multipleSelection = [];
            this.$axios
              .post(
                this.GlobalVal.httpLink.delClassMag,
                JSON.stringify(objData)
              )
              .then(
                res => {
                  if (res.data.code === "10000") {
                    this.$message({
                      type: "success",
                      message: "删除成功!"
                    });
                    this.getData();
                  } else {
                    this.$message({
                      type: "error",
                      message: res.data.errmsg
                    });
                  }
                },
                res => {
                  console.error(res);
                  this.$message({
                    type: "error",
                    message: "操作失败"
                  });
                }
              );
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } else {
        this.$message({
          type: "info",
          message: "没有选中任何项"
        });
      }
    },

    //将选中的行存储在一个变量中
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    //翻页导航栏
    handleCurrentChange(val) {
      this.cur_page = val - 1;
      this.getData();
    },

    //每页显示数目发生变化
    handleSizeChange(val) {
      this.cur_limit = val;
      this.getData();
    },

    //搜索班级---刷新
    search() {
      this.getData("pageClear");
    },
    //新增按钮事件
    handleAdd() {
      this.$router.push({
        path: "/editClass",
        query: {
          handle: "add"
        }
      });
    },

    //修改按钮事件
    handleEdit(index, row) {
      this.$store.commit("setChooseClassMge", row);
      this.$router.push({
        path: "/editClass",
        query: {
          handle: "edit"
        }
      });
    },
    //新增/修改班级等级--重置--暂时不用
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //搜索框动态提示内容
    queryTeacherOrClassname(queryString, cb) {
      if (this.selectTeacherOrClass === "class") {
        let objData = {
          staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
          page: 1, //页数
          limit: 10, //条目数
          className: queryString //班级名字
        };
        console.log("查询班级搜索提出内容发起请求的参数", objData);
        this.$axios
          .post(this.GlobalVal.httpLink.queryClassName, JSON.stringify(objData))
          .then(
            res => {
              if (res.data.code === "10000") {
                console.log("查询班级搜索提出内容获取的对象", res.data);
                cb(res.data.res);
              } else {
                console.error(res);
                self.$message({
                  type: "error",
                  message: res.data.errmsg
                });
              }
            },
            res => {
              this.$message("请求失败");
            }
          );
      } else if (this.selectTeacherOrClass === "teacher") {
        let objData = {
          staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
          page: 1, //页数
          limit: 10, //条目数
          teacherName: queryString //班级名字
        };
        console.log("查询老师搜索提示内容发起请求的参数", objData);
        this.$axios
          .post(
            this.GlobalVal.httpLink.queryTeacherName,
            JSON.stringify(objData)
          )
          .then(
            res => {
              if (res.data.code === "10000") {
                console.log("查询老师搜索提示内容获取的对象", res.data);
                cb(res.data.res);
              } else {
                console.error(res);
                self.$message({
                  type: "error",
                  message: res.data.errmsg
                });
              }
            },
            res => {
              this.$message("请求失败");
            }
          );
      }
    }
  }
};
</script>
