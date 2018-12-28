<style>
.keci-list {
  margin-bottom: 10px;
  /* padding-left: 20px; */
}
.keci-list ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
}
.keci-list ul li {
  color: #000;
  width: 54px;
  height: 49px;
  font-size: 18px;
  text-align: center;
  /* cursor: pointer; */
  /*   line-height: 45px; */
  background: #c9c9c9;
  margin-right: 10px;
  margin-bottom: 10px;
  transition: all 0.5s;
  -webkit-user-select: none;
  padding-top: 5px;
}
.keci-list ul li.actived:not(.finish) {
  background: #409eff;
  color: #fff;
  box-shadow: 0 0 10px #409eff;
}
.keci-list ul li.finish {
  background: #f2f2f2;
}
.keci-list ul li p {
  font-size: 12px;
}
.student-info-box {
  display: flex;
  color: #444;
  font-size: 16px;
  margin-bottom: 10px;
}
.student-info-box > div:first-child {
  border-right: 1px solid #000;
  margin-right: 20px;
  padding-right: 20px;
}
.student-info-box span {
  color: #419dfd;
}
.table .screen .el-input {
  width: 120px;
}
</style>

<template>
  <div class="table">
    <div class="student-info-box">
      <div>
        <div>
          <span>姓名:</span> {{info_student_name}}</div>
        <div>
          <span>学号: </span>{{info_student_no}}</div>
      </div>
      <div>
        <div>
          <span>班级名称：</span> {{$store.state.TurnClassInfo.class_name}}　{{$store.state.TurnClassInfo.class_name1}}</div>
        <div>
          <span>上课周：</span>{{$store.state.TurnClassInfo.class_week_day}}
          <span>上课时段：</span>{{$store.state.TurnClassInfo.time_name}}
          <span>校区：</span>{{$store.state.TurnClassInfo.campus_name}}</div>
      </div>
    </div>
    <div class="keci-list">
      <ul>
        <!--  <li v-for="(item, index) in attendclassList" :key="item.id" ref="keci-item" :class="{finish: item.isfinish}" @click="addClassTimes($event, index, attendclassList)" >
          {{item.class_sequence < 10 ? '0' + item.class_sequence : item.class_sequence}} <p>{{Util.TimeCycle(new Date(item.classdate).getTime(),'md')}}</p> </li> -->
        <li v-for="(item, index) in attendclassList" :key="index" :class="{finish: item.roll_call_status === '01702' || item.roll_call_status === '01703' || item.is_mend_register === true || item.isattend === 'f'}" v-if="dType === 'tk'">
          {{item.class_sequence
          < 10 ? '0' + item.class_sequence : item.class_sequence}} <p>{{Util.TimeCycle(new Date(item.classdate).getTime(),'md')}}</p>
        </li>
        <li v-for="(item, index) in attendclassList" :key="index" ref="keci-item" :class="{actived: true, finish: item.roll_call_status === '01702' || item.roll_call_status === '01703' || item.is_mend_register === true || item.isattend === 'f'}" v-if="dType === 'zb'">
          {{item.class_sequence
          < 10 ? '0' + item.class_sequence : item.class_sequence}} <p :class="{finish: item.roll_call_status === '01702' || item.roll_call_status === '01703' || item.is_mend_register === true || item.isattend === 'f'}">{{Util.TimeCycle(new Date(item.classdate).getTime(),'md')}}</p>
        </li>
      </ul>
    </div>
    <div class="handle-box">
      <div class="screen">
        <el-select clearable v-model="particular_year" placeholder="年份">
          <el-option v-for="item in $store.state.YearOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select clearable v-model="season" placeholder="季节">
          <el-option v-for="item in $store.state.SeasonOptions" :key="item.code" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select clearable v-model="periods" placeholder="期别不限">
          <el-option v-for="item in $store.state.PeriodsOptions" :key="item.code" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select clearable v-model="grade" placeholder="年级不限">
          <el-option v-for="item in $store.state.GradeOptions" :key="item.code" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select clearable v-model="subject" placeholder="科目不限">
          <el-option v-for="item in $store.state.SubjectOptions" :key="item.code" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select clearable v-model="project_type" placeholder="类别不限">
          <el-option v-for="item in $store.state.ProjectTypeOptions" :key="item.code" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select clearable v-model="class_type" placeholder="班型不限">
          <el-option v-for="item in $store.state.ClassTypeOptions" :key="item.code" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <!--<el-button type="primary" size="mini" icon="search"  @click="screening">筛选</el-button>-->
      </div>
      <div style="display: flex;">
        <el-cascader style="margin-right: 3px; width: 120px;" clearable expand-trigger="click" :options="this.$store.state.location" v-model="selectedLocation" placeholder="学校不限" change-on-select @change="handleLocationChange">
        </el-cascader>
        <div class="search-warp">
          <el-input v-model="select_word" class="handle-input mr10" @keyup.enter.native="search" placeholder="输入要搜索的任课老师"></el-input>
          <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
      </div>
      <!--条件点击选择框-->
      <div class="checkbox-warp">
        <el-checkbox v-model="resubmitClassOnly">显示续报班级</el-checkbox>
        <el-checkbox v-model="notFullClassOnly">显示未满班级</el-checkbox>
        <el-checkbox v-model="isnotfinished">显示已结课班级</el-checkbox>
        <div class="vertical-moulding"></div>
        <el-checkbox v-model="searchWeek.mondayOnly" true-label="周一">周一</el-checkbox>
        <el-checkbox v-model="searchWeek.tuesdayOnly" true-label="周二">周二</el-checkbox>
        <el-checkbox v-model="searchWeek.wednesdayOnly" true-label="周三">周三</el-checkbox>
        <el-checkbox v-model="searchWeek.thursdayOnly" true-label="周四">周四</el-checkbox>
        <el-checkbox v-model="searchWeek.fridayOnly" true-label="周五">周五</el-checkbox>
        <el-checkbox v-model="searchWeek.saturdayOnly" true-label="周六">周六</el-checkbox>
        <el-checkbox v-model="searchWeek.sundayOnly" true-label="周日">周日</el-checkbox>
        <div class="vertical-moulding"></div>
        <el-checkbox v-model="morningOnly">上午</el-checkbox>
        <el-checkbox v-model="afternoonOnly">下午</el-checkbox>
        <el-checkbox v-model="nightOnly">晚上</el-checkbox>
      </div>
    </div>
    <el-table size="mini" :data="data" border style="width: 100%" ref="multipleTable">
      <!--<el-table-column type="selection" width="55"></el-table-column>-->
      <el-table-column prop="class_name" label="班级"></el-table-column>
      <el-table-column prop="campus_name" label="校区"></el-table-column>
      <el-table-column prop="teacher_name" label="任课老师"></el-table-column>
      <el-table-column prop="time_name" label="时间段"></el-table-column>
      <el-table-column prop="start_date" label="上课日期"></el-table-column>
      <el-table-column prop="left_times" label="剩余课次"></el-table-column>
      <el-table-column prop="total_price" label="费用"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button size="mini" v-if="dType === 'zb'" @click="handleApply(1, scope.row)" type="primary" style="margin-bottom: 10px;">确认转班</el-button>
          <el-button size="mini" v-if="dType === 'tk'" @click="handleApply(2, scope.row)" type="primary" style="margin: 0;">选择调课</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :total="count" :page-size="cur_limit" :page-sizes="[10,20,30,50]">
      </el-pagination>
    </div>
    <transition name="el-fade-in-linear">
      <div v-show="classTimeLayer" class="bg-layer">
        <transition name="el-zoom-in-center">
          <div v-if="classTimeLayer" class="transition-box">
            <div class="title-warp">
              <div class="close-btn" @click="classTimeLayer=!classTimeLayer">
                <i class="el-icon-close"></i>
              </div>
              <h3 class="modify-title" style="border: 0">调课</h3>
            </div>
            <el-form :model="ruleForm" :rules="rules" size="mini" ref="ruleForm" label-width="100px">
              <!-- <el-row>
                <el-col :span="12">
                  <el-form-item label="旧课课次" prop="total_fee" style="display: none">
                    <el-select v-model="ruleForm.oldClassSequence" size="mini" :placeholder="'从第几课次开始' + (submitRule ? '转' : '调')" style="width: 100%;">
                      <el-option v-for="item in oldClassTimeOptions" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="新课课次" prop="total_fee">
                    <el-select v-model="ruleForm.newClassSequence" size="mini" :placeholder="(submitRule ? '转' : '调') + '至新班的第几课次'" style="width: 100%;">
                      <el-option v-for="item in newClassTimeOptions" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="原因">
                <el-input style="width: 100%;" type="textarea" :rows="2" placeholder="请输入内容" v-model="ruleForm.reason">
                </el-input>
              </el-form-item> -->
              <div class="class-content">
                <div class="class-times">
                  <ul>
                    <li>
                      <b>原课次</b>
                    </li>
                    <li>{{$store.state.TurnClassInfo.class_name}}　{{$store.state.TurnClassInfo.class_name1}}</li>
                    <li>{{$store.state.TurnClassInfo.class_week_day}} &nbsp; {{$store.state.TurnClassInfo.time_name}} &nbsp; {{$store.state.TurnClassInfo.campus_name}}</li>
                    <li>
                      <p>{{oldClassTime.class_sequence
                        < 10 ? '0' + oldClassTime.class_sequence : oldClassTime.class_sequence}}</p> <p>{{Util.TimeCycle(new Date(oldClassTime.classdate).getTime(),'md')}}</p>
                    </li>
                  </ul>
                  <i class="el-icon-arrow-right"></i>
                  <div>
                    <ul>
                      <li>
                        <b>目标课次</b>
                      </li>
                      <li>{{this.rowInfo.class_name}} {{$store.state.TurnClassInfo.class_name1}}</li>
                      <li>{{this.rowInfo.class_week_day}} &nbsp; {{this.rowInfo.time_name}} &nbsp; {{this.rowInfo.campus_name}}</li>
                      <li>
                        <p>{{newClassTime.class_sequence
                          < 10 ? '0' + newClassTime.class_sequence : newClassTime.class_sequence}}</p> <p>{{Util.TimeCycle(new Date(newClassTime.classdate).getTime(),'md')}}</p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="keci-list">
                  <p style="font-size:20px;margin-bottom:10px;font-weight:700">原课次选择</p>
                  <ul>
                    <li v-for="(item, index) in attendclassList" :key="item.id" ref="keci-item" :class="{finish: item.roll_call_status === '01702' || item.roll_call_status === '01703' || item.is_mend_register === true || item.isattend === 'f'}" @click="addClassTimes($event, index, attendclassList, 'old')">
                      {{item.class_sequence
                      < 10 ? '0' + item.class_sequence : item.class_sequence}} <p :class="{finish: item.roll_call_status === '01702' || item.roll_call_status === '01703' || item.is_mend_register === true || item.isattend === 'f'}">{{Util.TimeCycle(new Date(item.classdate).getTime(),'md')}}</p>
                    </li>
                  </ul>
                </div>
                <div class="keci-list">
                  <p style="font-size:20px;margin-bottom:10px;font-weight:700">目标课次选择</p>
                  <ul>
                    <li v-for="(item, index) in newAttendclassList" :key="item.id" ref="newKeci-item" :class="{finish: item.isfinish}" @click="addClassTimes($event, index, newAttendclassList, 'new')">
                      {{item.class_sequence
                      < 10 ? '0' + item.class_sequence : item.class_sequence}} <p :class="{finish: item.isfinish}">{{Util.TimeCycle(new Date(item.classdate).getTime(),'md')}}</p>
                    </li>
                  </ul>
                </div>
                <div style="width:380px;height:50px;margin:150px auto 0px;">
                  <el-button type="primary" v-if="submitRule" @click="submitRuleForm('ruleForm')" size="medium" style="width:150px">确认</el-button>
                  <el-button type="primary" v-if="submitCourse" @click="submitCourseForm('ruleForm')" size="medium" style="width:150px">确认</el-button>
                  <el-button @click="classTimeLayer=!classTimeLayer" size="medium" type="primary" style="width:150px;margin-left: 20px;">取消</el-button>
                </div>
              </div>
            </el-form>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import vAttendClass from "../frontOffice/AttendClass.vue";
import Dialog from "../common/Dialog.vue";
export default {
  components: {
    vAttendClass,
    Dialog
  },
  props: ["dType", "orderId", "attendclassList"],
  data() {
    return {
      studentId: "", // 学生id
      organId: "", //机构id
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
      project_type: "", //类别不限
      class_type: "", //班型不限
      info_student_name: "",
      info_student_no: "",
      turnSwitch: "", //转班开关
      couserSwitch: "", //调课开关

      //单选框筛选条件
      resubmitClassOnly: false,
      notFullClassOnly: false,
      mondayOnly: false,
      tuesdayOnly: false,
      wednesdayOnly: false,
      thursdayOnly: false,
      fridayOnly: false,
      saturdayOnly: false,
      sundayOnly: false,
      morningOnly: false,
      afternoonOnly: false,
      nightOnly: false,
      isnotfinished: "",
      isnotfinishedStatus: "",
      classWeekDay: "",
      searchWeek: {
        mondayOnly: "",
        tuesdayOnly: "",
        wednesdayOnly: "",
        thursdayOnly: "",
        fridayOnly: "",
        saturdayOnly: "",
        sundayOnly: "",
      },
      chooseSignuporder: {}, //当前被学中的学生信息
      cur_page: 0, //页码
      cur_limit: 10, //每次请求的数据数
      count: 0, //数据总量
      organName: "",
      status: "",
      organ_id2: [], //新增组件内的学校id,
      dataList: [], //请求的list
      roleIds: [],
      location: [], //校区导航
      selectedLocation: [], //选择校区
      multipleSelection: [], //选中行的集合
      classTimeLayer: false, //选择课次弹出控制
      rowInfo: {}, //要操作的行
      newAttendclassList: [], //新班级课次信息
      ruleForm: {
        oldClassSequence: null,
        newClassSequence: null,
        reason: ""
      },
      queryType: 1,
      newClassTime: [],
      oldClassTime: [],
      rules: {},
      oldClassTimeOptions: [],
      newClassTimeOptions: [],
      changeschedulelist: [],
      submitRule: false,
      submitCourse: false
    };
  },
  mounted() {
    const self = this;
    this.info_student_name = this.$store.state.chooseStudentInfo.student_name;
    this.info_student_no = this.$store.state.chooseStudentInfo.student_no;
    this.turnSwitch = this.$store.state.TurnSwitch;
    this.couserSwitch = this.$store.state.CouserSwitch;
  },

  //实例创建完成后被立即调用
  created() {
    const self = this;
    //查询区域导航
    this.turnClass = this.$store.state.isTurnClassSwitch;
    this.Util.queryAreaNav(self, -1, function() {
      self.getData();
    });
    self.organId = self.$store.state.organId;
    this.chooseSignuporder = this.$store.state.chooseSignuporder;
    this.Util.querySysconst(this, "021", this.$store.state.KnowChannleOptions); //查询了解渠道
    this.Util.querySysconst(this, "100", this.$store.state.SubjectOptions); //查询科目
    this.Util.querySysconst(this, "006", this.$store.state.SeasonOptions); //查询季节
    this.Util.querySysconst(this, "009", this.$store.state.PeriodsOptions); //查询期别
    this.Util.querySysconst(this, "101", this.$store.state.GradeOptions); //查询年级
    this.Util.querySysconst(this, "001", this.$store.state.ProjectTypeOptions); //查询类别/课型
    this.Util.querySysconst(this, "003", this.$store.state.ClassTypeOptions); //查询班型
    this.Util.querySysconst(this, "007", this.$store.state.DepartmentOptions); //查询学部
    this.queryType = this.$route.query.index;
    this.location = this.$store.state.location;
    this.Util.getCityData(
      this.$store.state.adminLocation,
      this.Util.getCityLevel(
        this.$store.state.adminLocation,
        JSON.parse(window.sessionStorage.getItem("staff")).staffOrganId
      )[2],
      this.$store.state.location
    );
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
        if (d.status) {
          d.statusStr = "启用";
        } else {
          d.statusStr = "禁用";
        }
        d.start_date = self.Util.TimeCycle(d.start_date, "ymd");
        return d;
      });
    }
  },
  watch: {
    searchWeek: {
      handler(){
        this.cur_page = 0;
        this.classWeekDay = ''
        for(let i in this.searchWeek){
          if(this.searchWeek[i]){
            this.classWeekDay += this.searchWeek[i] + ','
          }
        }
        this.classWeekDay = this.classWeekDay.slice(0, -1)
        this.getData();
      },
      deep: true
    },
    selectedLocation: function() {
      if (
        this.selectedLocation.includes(
          JSON.parse(window.sessionStorage.getItem("staff")).staffOrganId
        ) ||
        this.selectedLocation.length === 4
      ) {
        this.organId = this.selectedLocation[this.selectedLocation.length - 1];
        this.cur_page = "";
        this.getData();
      } else if (this.selectedLocation.length === 0) {
        this.cur_page = "";
        this.organId = "";
        this.getData();
      }
    },
    select_word: function() {
      this.teacherName = this.select_word;
    },
    isnotfinished() {
      if (this.isnotfinished) {
        this.isnotfinishedStatus = null;
      } else {
        this.isnotfinishedStatus = true;
      }
      this.getData();
      this.page = 0;
    },
    particular_year: function() {
      //年度改变
      this.getData();
    },
    season: function() {
      // 季节
      this.getData();
    },
    project_type() {
      this.getData();
    },
    periods: function() {
      //期别
      this.getData();
    },
    grade: function() {
      //年级
      this.getData();
    },
    subject: function() {
      //科目
      this.getData();
    },
    projectType: function() {
      //类别/课型不限
      this.getData();
    },
    class_type: function() {
      //班型
      this.getData();
    },
    department: function() {
      this.getData();
    },
    resubmitClassOnly: function() {
      this.getData();
    },
    notFullClassOnly: function() {
      this.getData();
    },
   /*  mondayOnly: function() {
      this.getData();
    },
    tuesdayOnly: function() {
      this.getData();
    },
    wednesdayOnly: function() {
      this.getData();
    },
    thursdayOnly: function() {
      this.getData();
    },
    fridayOnly: function() {
      this.getData();
    },
    saturdayOnly: function() {
      this.getData();
    },
    sundayOnly: function() {
      this.getData();
    }, */
    morningOnly: function() {
      this.getData();
    },
    afternoonOnly: function() {
      this.getData();
    },
    nightOnly: function() {
      this.getData();
    },
    turnClass: function() {}
  },
  methods: {
    // 课次列表点击处理
    addClassTimes(e, index, data, type) {
      if (e.target.classList.contains("finish")) {
        this.$message.warning("已上课次无法选中");
        return;
      } else {
        if (this.dType === "zb") {
          if (
            data.some(
              (item, i) =>
                i > index &&
                (item.roll_call_status === "01702" ||
                  item.roll_call_status === "01703" ||
                  item.is_mend_register === true ||
                  item.isattend === "f")
            )
          ) {
            this.$message.warning("所选课次后面有签到课次，请重新选择");
            return;
          }
        }
        data.forEach((item, i) => {
          if (type === "old") {
            this.$refs["keci-item"][i].classList[
              this.dType === "zb"
                ? i < index
                  ? "remove"
                  : "add"
                : i === index
                  ? "add"
                  : "remove"
            ]("actived");
          } else if (type === "new") {
            this.$refs["newKeci-item"][i].classList.remove("actived");
            this.$refs["newKeci-item"][index].classList.add("actived");
          }
        });
        if (type === "old") {
          this.oldClassTime = data[index];
          this.ruleForm.oldClassSequence = this.attendclassList[
            index
          ].class_sequence;
        } else if (type === "new") {
          this.newClassTime = data[index];
          if (this.dType === "zb") {
            this.ruleForm.newClassSequence = this.attendclassList[
              index
            ].class_sequence;
          } else if (this.dType === "tk") {
            this.ruleForm.newClassSequence = this.newAttendclassList[
              index
            ].class_sequence;
          }
        }
      }
    },
    //获取数据
    getData() {
      const self = this;
      let objData = {
        source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        page: this.cur_page, //页数
        limit: this.cur_limit, //条目数
        studentId: this.$store.state.chooseStudentInfo.student_id, // 学生ID
        particular_year: this.particular_year, //int 年份
        season: this.season, // 季节：[暑假，秋季，寒假，春季]等
        periods: this.periods, //期别
        grade: this.grade, //适用年级，[一年级，二年级]等
        subject: this.subject, //科目，[数学，物理]等
        projectType: this.projectType, //项目类型 [长期，短期，公益，考试]等
        classType: this.classType, //班型，[超常，培优]等
        organId: this.organId,
        teacherName: this.teacherName, //老师名字
        className: this.className, //班级名称
        department: this.department, //学部，小学，初中，高中
        orderId: this.orderId,
        //单选框筛选条件
        resubmitClassOnly: this.resubmitClassOnly, //只显示续报班级
        notFullClassOnly: this.notFullClassOnly, //只显示未满班级
       /*  mondayOnly: this.mondayOnly, //只显示周一有课的班级
        wednesdayOnly: this.wednesdayOnly, //只显示周二有课的班级
        tuesdayOnly: this.tuesdayOnly, //只显示周三有课的班级
        thursdayOnly: this.thursdayOnly, //只显示周四有课的班级
        fridayOnly: this.fridayOnly, //只显示周五有课的班级
        saturdayOnly: this.saturdayOnly, //只显示周六有课的班级
        sundayOnly: this.sundayOnly, //只显示周日有课的班级 */
        classWeekDay: this.classWeekDay,
        morningOnly: this.morningOnly, //只显示上午有课的班级
        afternoonOnly: this.afternoonOnly, //只显示下午有课的班级
        nightOnly: this.nightOnly, //只显示晚上有课的班级
        isnotfinished:
          this.isnotfinishedStatus === null ? this.isnotfinishedStatus : true //只显示未结课班级
      };
      this.$axios
        .post(this.GlobalVal.httpLink.queryClass, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              self.count = res.data.count;
              self.dataList = res.data.pxxClasses;
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
    },
    //重新选择了地区事件
    handleLocationChange(value) {},
    //重新筛选函数
    screening() {
      this.getData();
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

    //搜索用户---刷新
    search() {
      if (this.select_word === "") {
        this.$message({
          type: "error",
          message: "填写要搜索的名称"
        });
      }
      this.getData();
    },

    //转班按钮点击
    handleApply(index, row) {
      this.queryType = index;
      this.rowInfo = row;
      /*  if (!this.ruleForm.oldClassSequence) {
        this.$message.warning("请选择课次!");
        return;
      } */
      this.ruleForm.oldClassSequence = this.attendclassList.find(
        item =>
          item.roll_call_status !== "01702" &&
          item.roll_call_status !== "01703" &&
          item.is_mend_register !== true &&
          item.isattend !== "f"
      ).class_sequence;
      if (this.queryType === 1) {
        this.submitRule = true;
        this.submitCourse = false;
        if (this.ruleForm.oldClassSequence !== null) {
          this.submitRuleForm("ruleForm");
        } else {
          this.$message({
            type: "error",
            message: "请选择原来班级的课次"
          });
          return;
        }
        return;
      } else if (this.queryType === 2) {
        this.submitRule = false;
        this.submitCourse = true;
        this.classTimeLayer = true;
        let objData = {
          staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
          source: this.GlobalVal.constants.source,
          id: row.class_id
        };
        this.$axios
          .post(
            this.GlobalVal.httpLink.getAttendClassList,
            JSON.stringify(objData)
          )
          .then(
            res => {
              if (res.data.code === "10000") {
                this.newAttendclassList = res.data.attendclassList;
              } else {
                console.log(res.data.errmsg);
              }
            },
            res => {
              this.$message({
                type: "error",
                message: res.data.errmsg
              });
            }
          );
        // this.submitCourseForm("ruleForm");
        // return;
      }
      const self = this;
      //清空参数
      this.oldClassTimeOptions = [];
      this.newClassTimeOptions = [];
      // this.ruleForm.oldClassSequence = null;
      // this.ruleForm.newClassSequence = null;
      this.ruleForm.reason = "";
      if (this.queryType == 1) {
        let timeOld =
          parseInt(this.$store.state.TurnClassInfo.total_times) -
          parseInt(this.$store.state.TurnClassInfo.total_times) +
          1;
        for (
          let i = timeOld;
          i <= parseInt(self.$store.state.TurnClassInfo.total_times);
          i++
        ) {
          self.oldClassTimeOptions.push({
            value: i,
            label: "第" + i + "次"
          });
        }
        let timeNew = parseInt(row.total_times) - parseInt(row.total_times) + 1;
        for (let i = timeNew; i <= parseInt(row.total_times); i++) {
          self.newClassTimeOptions.push({
            value: i,
            label: "第" + i + "次"
          });
        }
      } else if (this.queryType == 2) {
        let timeOld =
          parseInt(this.$store.state.ClassCourseInfo.left_times) -
          parseInt(this.$store.state.ClassCourseInfo.left_times) +
          1;
        for (
          let i = timeOld;
          i <= parseInt(self.$store.state.ClassCourseInfo.left_times);
          i++
        ) {
          self.oldClassTimeOptions.push({
            value: i,
            label: "第" + i + "次"
          });
        }
        let timeNew = parseInt(row.total_times) - parseInt(row.total_times) + 1;
        for (let i = timeNew; i <= parseInt(row.total_times); i++) {
          self.newClassTimeOptions.push({
            value: i,
            label: "第" + i + "次"
          });
        }
      }
    },
    submitRuleForm(ruleForm) {
      const self = this;
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
        orderId: this.$store.state.TurnClassInfo.order_id, //学生报名表id
        newClassId: this.rowInfo.class_id, //要转的班级id
        oldClassSequence: this.ruleForm.oldClassSequence, //原来最后一次课的课次
        newClassSequence:
          this.ruleForm.newClassSequence || this.ruleForm.oldClassSequence, //新班的第一次课的课次
        reason: this.ruleForm.reason // 转班理由
      };
      let url = "";
      let code = JSON.parse(window.sessionStorage.menuBar)[0].subMenus[0]
        .button_ids;
      if (code && code.includes("010102")) {
        objData = Object.assign({}, objData, {
          isexcessTurnClass: true
        });
      }
      /* if (this.queryType === 1) {
        url = this.GlobalVal.httpLink.turnClass;
      } else if (this.queryType === 2) {
        url = this.GlobalVal.httpLink.changeCourseSchedule;
      } else {
        self.$message({
          title: "警告",
          message: "操作错误,未知的请求",
          type: "warning"
        });
      } */
      let loadingInstance = this.$Loading();
      this.$axios
        .post(this.GlobalVal.httpLink.turnClass, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              self.$message({
                type: "success",
                message: "转班成功!"
              });
              self.$router.push({
                path: "/studentInfo/classTransferRecord",
                query: {
                  sid: this.$route.query.sid
                }
              });
            } else {
              this.$message({
                type: "error",
                message: res.data.errmsg
              });
            }
            this.$nextTick(() => {
              loadingInstance.close();
            });
          },
          res => {
            this.$nextTick(() => {
              loadingInstance.close();
            });
            console.error(res);
            this.$message({
              type: "error",
              message: "操作失败"
            });
          }
        );
    },
    submitCourseForm(ruleForm) {
      this.changeschedulelist = [];
      const self = this;
      let obj = {
        newClassId: this.rowInfo.class_id, //要转的班级id
        oldClassSequence: this.ruleForm.oldClassSequence, //原来最后一次课的课次
        newClassSequence: this.ruleForm.newClassSequence //新班的第一次课的课次
      };
      this.changeschedulelist.push(obj);
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
        orderId: this.$store.state.ClassCourseInfo.order_id, //学生报名表id
        reason: this.ruleForm.reason, // 转班理由
        changeschedulelist: this.changeschedulelist
      };
      let code = JSON.parse(window.sessionStorage.menuBar)[0].subMenus[0]
        .button_ids;
      if (code && code.includes("010103")) {
        objData = Object.assign({}, objData, {
          isexcessChangeCourseSchedule: true
        });
      }
      let loadingInstance = this.$Loading();
      this.$axios
        .post(
          this.GlobalVal.httpLink.changeCourseSchedule,
          JSON.stringify(objData)
        )
        .then(
          res => {
            if (res.data.code === "10000") {
              self.$message({
                type: "success",
                message: "调课成功!"
              });
              self.$router.push({
                path: "/studentInfo/classRecord",
                query: {
                  sid: this.$route.query.sid
                }
              });
            } else {
              this.$message({
                type: "error",
                message: res.data.errmsg
              });
            }
            this.$nextTick(() => {
              loadingInstance.close();
            });
          },
          res => {
            this.$nextTick(() => {
              loadingInstance.close();
            });
            this.$message({
              type: "error",
              message: "操作失败"
            });
          }
        );
    }
  }
};
</script>

<style scoped>
/* 调课 */
.class-times {
  width: 100%;
  height: 250px;
  display: flex;
  justify-content: space-between;
}
.class-times ul {
  width: 400px;
  height: 100%;
  list-style: none;
  font-size: 16px;
}
.class-times ul li:last-child {
  text-align: center;
  width: 150px;
  height: 110px;
  font-size: 20px;
  background: #c9c9c9;
  margin-top: 20px;
  margin-left: 30px;
  padding-top: 40px;
}
.el-icon-arrow-right {
  font-size: 70px;
  line-height: 300px;
  color: #f8f0f0;
  margin-right: 30px;
}
.bg-layer {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0);
  z-index: 150;
}
.transition-box {
  position: absolute;
  width: 1300px;
  height: 780px;
  margin: auto;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  border-radius: 4px;
  background-color: #ffffff;
  /*  overflow-y: auto; */
  padding-top: 60px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  box-sizing: border-box;
  z-index: 10;
}

.title-warp {
  position: absolute;
  width: 1300px;
  height: 50px;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 10;
  background: #ffffff;
  -webkit-box-shadow: 0px 0px 3px #ccc;
  -moz-box-shadow: 0px 0px 3px #ccc;
  box-shadow: 0px 0px 3px #ccc;
}
.class-content {
  width: 100%;
  height: 710px;
  overflow-y: auto;
  padding-right: 20px;
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
  line-height: 50px;
  text-align: center;
}
.modify-title {
  font-size: 20px;
  height: 50px;
  line-height: 50px;
  color: #666666;
  border-bottom: 1px solid #f2f2f2;
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
.screen {
  margin-bottom: 5px;
}
.student-info-warp {
  /* width: 100px;
        height: 40px;
        clear: both;*/
  padding-bottom: 50px;
}
.student-info {
  float: left;
  padding-right: 8px;
  line-height: 40px;
  color: #888888;
  font-size: 14px;
}
.student-info.btn {
  text-decoration: underline;
}
.checkbox-warp {
  margin-top: 10px;
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
