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
  margin-bottom: 20px;
}
.search-warp {
  display: inline-block;
  /*float: right;*/
}
.handle-box {
  margin-bottom: 20px;
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
  width: 334px;
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
</style>
<template>
  <div class="class-query table">
    <div class="handle-box">
      <!--筛选条件-->
      <div class="class-query-screen">
        <el-select clearable v-model="particular_year" size="mini" placeholder="年度">
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
        <el-select clearable v-model="department" size="mini" placeholder="学部">
          <el-option v-for="item in $store.state.DepartmentOptions" :key="item.code" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-cascader clearable size="mini" expand-trigger="click" :options="location" v-model="selectedLocation" placeholder="学校不限" change-on-select @change="handleLocationChange">
        </el-cascader>
        <!--change-on-select-->

        <!--<el-button type="primary" size="mini" icon="search"  @click="screening">筛选</el-button>-->
      </div>
      <br>
      <!--动态搜索框-->
      <div class="search-warp">
        <el-input size="mini" clearable v-model="select_word" :fetch-suggestions="queryTeacherOrClassname" placeholder="请输入搜索内容" class="search-input">
          <el-select style="width: 100px;" v-model="selectTeacherOrClass" slot="prepend" placeholder="请选择">
            <el-option label="老师姓名" value="teacher"></el-option>
            <el-option label="班级" value="class"></el-option>
          </el-select>
          <el-button class="search-btn" slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
        <el-input style="width: 164px;display: inline-block;" size="mini" clearable v-model="select_school" placeholder="请输入学员姓名/手机号" @keyup.enter.native="search" @blur="search"></el-input>
        <el-input style="width: 164px;display: inline-block;" size="mini" clearable v-model="studentNo" placeholder="请输入学员编号" @keyup.enter.native="search" @blur="search"></el-input>
      </div>

    </div>
    <el-table size="mini" :data="data" stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="student_name" label="学员姓名"></el-table-column>
      <el-table-column prop="student_no" label="学员编号" width="120"></el-table-column>
      <el-table-column prop="student_mobile" label="联系电话" width="110"></el-table-column>
      <el-table-column prop="campus_name" label="校区"></el-table-column>
      <el-table-column prop="class_name" label="续报班级名称" width="250"></el-table-column>
      <el-table-column prop="teacher_name" label="老师"></el-table-column>
      <el-table-column prop="class_week_day" label="重复周期"></el-table-column>
      <el-table-column prop="course_date" label="上课时段" width="100"></el-table-column>
      <el-table-column prop="classroom_name" label="教室"></el-table-column>
      <el-table-column prop="total_price" label="价格"></el-table-column>
      <el-table-column prop="left_times" label="课次剩余"></el-table-column>
      <el-table-column label="续报班级名称" width="200">
        <template slot-scope="scope" v-for="item in dataList2">
          <p v-for="(val, index) in dataList2.reSubmitClassInfo" :key="index">{{val.class_name}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="reSubmitClassInfo.signup_number" label="招生情况"></el-table-column>
      <el-table-column prop="reSubmitClassInfo.payment_number" label="缴费"></el-table-column>
      <el-table-column prop="reSubmitClassInfo.remain_numberq" label="剩余"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">续报
          </el-button>
          <el-button size="mini" type="primary" @click="enList(scope.$index, scope.row)">报名
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :current-page="cur_page + 1" :total="count" :page-size="cur_limit" :page-sizes="[10,20,30,50]">
      </el-pagination>
    </div>
    <!--添加/修改弹出框-->
    <transition name="el-fade-in-linear">
      <div v-show="addTeamLayer" class="bg-layer">
        <transition name="el-zoom-in-center">
          <div v-if="addTeamLayer" class="transition-box">
            <div class="title-warp">
              <div class="close-btn" @click="addTeamLayer=!addTeamLayer"><i class="el-icon-close"></i></div>
              <h3 v-if="!changeTeamLayer" class="modify-title">新增班级</h3>
              <h3 v-if="changeTeamLayer" class="modify-title">修改班级信息</h3>
            </div>
            <el-form :model="ruleForm" :rules="rules" size="mini" ref="ruleForm" label-width="100px" style="height: 470px;overflow-y: scroll;">
              <el-form-item label="班级名称" prop="class_name">
                <el-input v-model="ruleForm.class_name"></el-input>
              </el-form-item>
              <el-form-item v-if="!changeTeamLayer" label="选择学校">
                <el-cascader clearable expand-trigger="click" :options="location" v-model="organ_id2" change-on-select>
                </el-cascader>
              </el-form-item>
              <el-form-item label="教师名字">
                <el-input v-model="ruleForm.student_mobile"></el-input>
              </el-form-item>
              <el-form-item label="学生生日">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.student_birthday" style="width: 100%;"></el-date-picker>
              </el-form-item>
              <el-form-item label="年级">
                <el-select v-model="ruleForm.student_grade" size="mini" placeholder="请选择" style="width: 100%;">
                  <el-option v-for="item in $store.state.GradeOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="小学名字">
                <el-input v-model="ruleForm.primary_school"></el-input>
              </el-form-item>
              <el-form-item label="中学名字">
                <el-input v-model="ruleForm.middle_school"></el-input>
              </el-form-item>
              <el-form-item label="高中名字">
                <el-input v-model="ruleForm.high_school"></el-input>
              </el-form-item>
              <el-form-item label="入学成绩">
                <el-input v-model="ruleForm.enter_score"></el-input>
              </el-form-item>
              <el-form-item label="家庭住址">
                <el-input v-model="ruleForm.home_address"></el-input>
              </el-form-item>
              <el-form-item label="父亲姓名">
                <el-col :span="7">
                  <el-form-item style="margin-bottom: 0">
                    <el-input style="width: 100%;" v-model="ruleForm.father_name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="2" style="color: #5a5e66;text-align: center;">电话</el-col>
                <el-col :span="7">
                  <el-form-item style="margin-bottom: 0">
                    <el-input style="width: 100%;" v-model="ruleForm.father_mobile"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4" style="color: #5a5e66;text-align: center;">接收短信</el-col>
                <el-switch v-model="ruleForm.father_sms_enable"></el-switch>
              </el-form-item>
              <el-form-item label="母亲姓名">
                <el-col :span="7">
                  <el-form-item style="margin-bottom: 0">
                    <el-input style="width: 100%;" v-model="ruleForm.mother_name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="2" style="color: #5a5e66;text-align: center;">电话</el-col>
                <el-col :span="7">
                  <el-form-item style="margin-bottom: 0">
                    <el-input style="width: 100%;margin-bottom: 0;" v-model="ruleForm.mother_mobile"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4" style="color: #5a5e66;text-align: center;">接收短信</el-col>
                <el-switch v-model="ruleForm.mother_sms_enable"></el-switch>
              </el-form-item>
              <el-form-item label="状态">
                <el-select v-model="ruleForm.student_status" size="mini" placeholder="请选择" style="width: 100%;">
                  <el-option v-for="item in $store.state.StudentStatusOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button v-if="!changeTeamLayer" type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button v-if="changeTeamLayer" type="primary" @click="submitForm('ruleForm')">确认修改</el-button>
                <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
                <el-button @click="addTeamLayer=!addTeamLayer">取消</el-button>
              </el-form-item>
            </el-form>
            <div class="fotter-warp class-mag">
              <el-steps :space="180" :active="2" finish-status="success">
                <el-step title="基本信息" style="font-size: 13px;"></el-step>
                <el-step title="上课安排"></el-step>
                <el-step title="完成"></el-step>
              </el-steps>
              <el-button type="primary" size="mini" style="position: absolute;right: 20px;top: 10px;">下一步</el-button>
            </div>
          </div>
        </transition>
      </div>
    </transition>
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
      studentId: "", // 学生id
      organId: null, //机构id
      //搜索条件
      selectTeacherOrClass: "teacher",
      projectType: "", //项目类型 [长期，短期，公益，考试]等
      classType: "", //班型，[超常，培优]等
      grade: "", //适用年级，[一年级，二年级]等
      season: "", //季节[暑假，秋季，寒假，春季]等
      periods: "", //期别
      particular_year: null, //int 年份
      courseType: "", //课程类型，[小学数学，小升初专题]等
      subject: "", //科目，[数学，物理]等
      department: "", //学部，小学，初中，高中
      className: "", //班级名称
      teacherName: "", //老师名字
      teacherMobile: "", //老师电话
      select_word: "", //搜索的值
      studentName: "", //学生姓名
      studentMobile: "", //学生电话
      studentNo: "", //学生编号
      select_school: "", //搜索学生
      course_date: "", //上课时间段
      //变量
      role_name: "",
      status: "",
      organ_id2: [], //新增组件内的学校id,
      dataList: [], //请求的list
      dataList1: [],
      dataList2: [],
      roleIds: [],
      location: [], //校区导航
      selectedLocation: [], //选择校区
      multipleSelection: [], //选中行的集合
      arr: [], //存放报名的班级名称
      addTeamLayer: false, //新增弹出框状态
      changeTeamLayer: false, //修改弹出框状态
      ruleForm: {
        //新增数据
        class_id: null, //Id,主键
        class_name: "", //班级名称
        school_id: null, //大区id   ----> 给 null
        school_name: "", //大区名称   ----> 给 null
        branch_school_id: null, //分校id   ----> 给 null
        branch_school_name: "", //分校名字   ----> 给 null
        campus_id: null, //校区ID   ----> 给 null
        campus_name: "", //校区名字   ----> 给 null
        teacher_id: null, //教师id
        teacher_name: "", //教师名字
        time_name: "", //时间段名称
        time_id: null, //时间ID
        date_name: "", //日期
        date_id: null, //日期id
        total_times: null, //课程总次数
        left_times: null, //剩余次数
        total_fee: null, //课程总费用
        discount_fee: null, //优惠费用
        project_type: "", //项目类型：[长期，短期，公益，考试]等
        course_type: "", //课程类型，[小学数学，小升初专题]等
        class_type: "", //班型，[超常，培优]等
        subject: "", //科目，[数学，物理]等
        grade: "", //适用年级，[一年级，二年级]等
        season: "", // 期别：[暑假，秋季，寒假，春季]等
        min_entry_score: null, //最低入学成绩
        entry_rank: "", //报名级别
        max_students_no: null, //最多人数
        excess_no: null, //超额   ----> 给 null
        signup_number: null, //报名人数   ----> 给 null
        payment_number: null, //缴费人数   ----> 给 null
        remain_number: null, //剩余名额,   ----> 给 null
        waiting_number: null, //候补人数   ----> 给 null
        classroom_id: null, //教室 id
        classroom_name: "", //教室名字
        particular_year: null, //年份，2003
        department: "", //学部
        periods: "", //期数,
        city_no: "", //城市编号   ----> 给 null
        city_name: "", //城市名称   ----> 给 null
        province_no: "", //省编号,   ----> 给 null
        province_name: "", //省名称,   ----> 给 null
        signup_starttime: null, //报名开始时间
        signup_endtime: null, //结束报名时间
        web_signup_starttime: null, //网络报名开始时间
        web_signup_endtime: null, //网络报名结束时间
        status: false, //状态，true:上线，false:下线
        created_at: null, //创建时间
        updated_at: null //更新时间   ----> 给 null
      },
      //接收当前行的信息
      changeForm2: {},
      //表单校验规则
      rules: {
        class_name: [
          { required: true, message: "请输入班级名称", trigger: "blur" }
        ]
      }
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
    this.Util.querySysconst(self, "002", this.$store.state.CourseTypeOptions); //查询类别/课型
    this.Util.querySysconst(self, "003", this.$store.state.ClassTypeOptions); //查询班型
    this.Util.querySysconst(this, "007", this.$store.state.DepartmentOptions); //查询学部
    this.Util.querySysconst(this, "001", this.$store.state.ProjectTypeOptions); //项目类型
    this.Util.querySysconst(this, "100", this.$store.state.SubjectOptions); //查询科目
    self.location = self.$store.state.location;
    self.studentId = self.$store.state.chooseStudentInfo.student_id;
    //this.organId = self.$store.state.organId;
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
        d.statusStr = d.status ? "上架" : "下架";
        d.subjectComputed &&
          (d.subjectComputed = self.Util.GetLabelForValue(
            self.$store.state.SubjectOptions,
            d.subject
          ));
        d.course_date = d.start_time + "-" + d.end_time;
        return d;
      });
    }
  },
  watch: {
    select_school: function() {
      const self = this;
      if (/^\d+$/.test(this.select_school) && this.select_school !== "") {
        console.log("1");
        self.studentMobile = this.select_school;
        self.studentName = "";
      } else if (this.select_school !== "") {
        console.log("2");
        self.studentName = this.select_school;
        self.studentMobile = "";
      } else {
        console.log("3");
        self.studentName = "";
        self.studentMobile = "";
      }
    },
    selectedLocation: function() {
      if (
        this.selectedLocation.includes(
          JSON.parse(window.sessionStorage.getItem("staff")).staffOrganId
        )
      ) {
        this.organId = this.selectedLocation[this.selectedLocation.length - 1];
        this.getData();
      } else if (this.selectedLocation.length === 0) {
        this.organId = "";
        this.getData();
      }
      this.cur_page = 0;
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
    changeForm2: function() {
      //修改的参数赋值
      if (this.changeForm2.status) {
        this.ruleForm.status = "上架";
      } else {
        this.ruleForm.status = "禁用";
      }
      this.ruleForm.student_id = this.changeForm2.student_id; //此课班级的唯一id int,  --> 如果为新增,此值为空字符串
      this.ruleForm.student_name = this.changeForm2.student_name; //班级姓名
      this.ruleForm.student_no = this.changeForm2.student_no; //班级学号
      this.ruleForm.student_birthday = this.changeForm2.student_birthday; //班级生日
      this.ruleForm.student_grade = this.changeForm2.student_grade; //年级    [10010]
      this.ruleForm.student_mobile = this.changeForm2.student_mobile; //班级电话   ==>可能为空
      this.ruleForm.primary_school = this.changeForm2.primary_school; //小学名字
      this.ruleForm.middle_school = this.changeForm2.middle_school; //中学名字
      this.ruleForm.high_school = this.changeForm2.high_school; //高中名字
      this.ruleForm.enter_score = this.changeForm2.enter_score; //入学成绩，百分制
      this.ruleForm.matching_class = this.changeForm2.matching_class; //班型,(string)  ==> 数组转得字符串 ["10004,10005"]
      this.ruleForm.home_address = this.changeForm2.home_address; //家庭住址
      this.ruleForm.father_name = this.changeForm2.father_name; //父亲名字
      this.ruleForm.father_mobile = this.changeForm2.father_mobile; //父亲电话号码
      this.ruleForm.father_sms_enable = this.changeForm2.father_sms_enable; // 父亲是否接收短信 (true:接收,folse:不接收)
      this.ruleForm.mother_name = this.changeForm2.mother_name; //母亲名字
      this.ruleForm.mother_mobile = this.changeForm2.mother_mobile; //母亲电话号码
      this.ruleForm.mother_sms_enable = this.changeForm2.mother_sms_enable; //母亲是否接受短信   (true:接收,folse:不接收)
      this.ruleForm.created_at = this.changeForm2.created_at; //更新时间,时间戳
    },
    particular_year: function() {
      //年度改变
      this.cur_page = 0;
      this.getData();
    },
    season: function() {
      // 季节
      this.cur_page = 0;
      this.getData();
    },
    periods: function() {
      //期别
      this.cur_page = 0;
      this.getData();
    },
    grade: function() {
      //年级
      this.cur_page = 0;
      this.getData();
    },
    subject: function() {
      //科目
      this.cur_page = 0;
      this.getData();
    },
    projectType: function() {
      //类别/课型不限
      this.cur_page = 0;
      this.getData();
    },
    classType: function() {
      //班型
      this.cur_page = 0;
      this.getData();
    },
    department: function() {
      this.cur_page = 0;
      this.getData();
    },
    resubmitClassOnly: function() {
      this.cur_page = 0;
      this.getData();
    },
    notFullClassOnly: function() {
      this.cur_page = 0;
      this.getData();
    },
    mondayOnly: function() {
      this.cur_page = 0;
      this.getData();
    },
    tuesdayOnly: function() {
      this.cur_page = 0;
      this.getData();
    },
    wednesdayOnly: function() {
      this.cur_page = 0;
      this.getData();
    },
    thursdayOnly: function() {
      this.cur_page = 0;
      this.getData();
    },
    fridayOnly: function() {
      this.cur_page = 0;
      this.getData();
    },
    saturdayOnly: function() {
      this.cur_page = 0;
      this.getData();
    },
    sundayOnly: function() {
      this.cur_page = 0;
      this.getData();
    },
    morningOnly: function() {
      this.cur_page = 0;
      this.getData();
    },
    afternoonOnly: function() {
      this.cur_page = 0;
      this.getData();
    },
    nightOnly: function() {
      this.cur_page = 0;
      this.getData();
    }
  },
  methods: {
    //获取数据
    getData() {
      const self = this;
      let objData = {
        source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        page: this.cur_page, //页数
        limit: this.cur_limit, //条目数
        particularYear: this.particular_year, //int 年份
        season: this.season, // 季节：[暑假，秋季，寒假，春季]等
        periods: this.periods, //期别
        grade: this.grade, //适用年级，[一年级，二年级]等
        subject: this.subject, //科目，[数学，物理]等
        projectType: this.projectType, //项目类型 [长期，短期，公益，考试]等
        classType: this.classType, //班型，[超常，培优]等
        campusId: this.organId,
        studentName: this.studentName,
        studentMobile: this.studentMobile,
        studentNo: this.studentNo,
        teacherName: this.teacherName, //老师名字
        className: this.className //班级名称
        //department:this.department
      };
      //搜索框中的选择老师或者是班级搜索
      if (this.selectTeacherOrClass === "class") {
        objData.className = this.select_word;
        objData.teacherName = "";
      } else {
        objData.className = "";
        objData.teacherName = this.select_word;
      }
      console.log("查询班级发起请求的参数", objData);
      this.$axios
        .post(this.GlobalVal.httpLink.queryNotRenew, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              console.log("查询班级列表获取的对象", res.data);
              self.count = res.data.count;
              self.dataList = res.data.noRenews;
              for (let i = 0; i < res.data.noRenews.length; i++) {
                self.dataList1.push(self.dataList[i].reSubmitClassInfo);
              }
              for (let i = 0; i < self.dataList1.length; i++) {
                console.log(self.dataList1[i]);
                self.dataList2.push(self.dataList1[i]);
              }
              console.log(self.dataList2);
            } else {
              console.error(res);
              self.dataList = [];
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
    //上架事件
    handleUp(index, row) {
      const self = this;
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        classId: row.class_id, //班级ID
        status: true //boolean, true:上架， false:下架
      };
      console.log("上架事件发起请求的参数", objData);
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
                message: "上架成功!"
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
      this.cur_page = 0;
      this.getData();
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
      /*this.$store.commit("setChooseClassMge", row);
      this.$router.push({
        path: "/editClass",
        query: {
          handle: "edit"
        }
      });*/
    },
    //报名
    enList(index, row) {
      const self = this;
      let obj = {
        class_id: null,
        total_times: null,
        class_name: null,
        total_price: null
      };
      if (!row) return;
      obj.class_id = row.class_id;
      obj.total_price = row.total_price;
      obj.class_name = row.class_name;
      obj.total_times = row.total_times;
      self.arr.push(obj);
      self.$store.commit("setChooseClassApply", self.arr);
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
