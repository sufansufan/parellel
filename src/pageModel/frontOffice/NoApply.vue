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
  height: 200px;
  margin: auto;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  border-radius: 4px;
  background-color: #ffffff;
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
  width: 332px;
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
/*缴费弹出*/
.bg-layer1 {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
.transition-box1 {
  position: absolute;
  width: 1000px;
  height: 600px;
  margin: auto;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  border-radius: 4px;
  background-color: #ffffff;
  overflow-y: auto;
  padding-top: 60px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  box-sizing: border-box;
  z-index: 10;
}
.transition-box1 .lesson-single-warp {
  position: relative;
  bottom: auto;
  box-shadow: none;
  width: 100%;
}
.transition-box1 .lesson-single .title-warp {
  width: 100% !important;
  box-shadow: none !important;
}
.title-warp2 {
  position: absolute;
  width: 1000px;
  height: 50px;
  top: 0px;
  right: 0;
  z-index: 10;
  background: #ffffff;
  -webkit-box-shadow: 0px 0px 3px #ccc;
  -moz-box-shadow: 0px 0px 3px #ccc;
  box-shadow: 0px 0px 3px #ccc;
}
.transition-box1 .el-cascader {
  width: 100%;
}
.close-btn1 {
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
.modify-title1 {
  font-size: 20px;
  height: 50px;
  line-height: 50px;
  color: #666666;
  border-bottom: 1px solid #cccccc;
  text-align: left;
  padding-left: 20px;
}
/*缴费样式*/
.lesson-single {
  padding: 20px;
  background: #fff;
}
.lesson-list,
.total-amount {
  padding: 5px 0px 5px 0;
  border-bottom: 1px solid #cccccc;
}
.del-lesson {
  text-align: left;
}
.grid-content {
  height: 36px;
  line-height: 36px;
}
.apply-submit {
  /*text-align: right;*/
  margin-bottom: 30px;
  float: right;
}
.title-warp1 {
  border-bottom: 2px solid #cccccc;
}
.title-warp1 .el-button {
  float: right;
}
.title1 {
  padding: 8px 5px;
  display: inline-block;
  color: #000;
}
.apply-top-btn {
  display: inline-block;
  float: right;
}
.total-fee-top {
  margin: 0 5px;
}
.lesson-list-warp {
  font-size: 12px;
}
.actual-amount-warp {
  background: #ececec;
}
.choose-type {
  width: 90px;
}
.del-choose-lesson {
  display: inline-block;
  width: 40px;
  text-align: center;
  color: #40d6ff;
}
</style>
<template>
    <div class="class-query table">
        <div class="handle-box">
            <!--筛选条件-->
            <div class="class-query-screen">
                <el-select clearable v-model="particular_year" size="mini" placeholder="年度" ref="select_year">
                    <el-option v-for="item in $store.state.YearOptions" :key="item.code" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>

                <el-select clearable v-model="season" size="mini" placeholder="季节">
                    <el-option v-for="item in $store.state.SeasonOptions" :key="item.code" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-select clearable v-model="periods" size="mini" placeholder="期别不限">
                    <el-option icon="el-icon-caret-top" v-for="item in $store.state.PeriodsOptions" :key="item.code" :label="item.label" :value="item.value">
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
                <el-select clearable v-model="department" size="mini" placeholder="请选择学部">
                    <el-option v-for="item in $store.state.DepartmentOptions" :key="item.code" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-cascader clearable size="mini" expand-trigger="click" :options="location" v-model="selectedLocation" placeholder="学校不限" change-on-select @change="handleLocationChange" style="width: 263px;">
                </el-cascader>
                <!--<el-button type="primary" size="mini" icon="search"  @click="screening">筛选</el-button>-->
            </div>
            <br>
            <!--动态搜索框-->
            <div class="search-warp">
                <el-input size="mini" v-model="select_word" clearable :fetch-suggestions="queryTeacherOrClassname" placeholder="请输入搜索内容" class="search-input">
                    <el-select style="width: 100px;" v-model="selectTeacherOrClass" slot="prepend" placeholder="请选择">
                        <el-option label="老师姓名" value="teacher"></el-option>
                        <el-option label="班级" value="class"></el-option>
                    </el-select>
                    <el-button class="search-btn" slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
            </div>
            <el-input v-model="student_word" border="none" size="mini" clearable @keyup.enter.native="search" placeholder="请输入学员姓名/手机号" style="width:334px" @blur="search"></el-input>
            <el-input v-model="student_no" border="none" size="mini" clearable @keyup.enter.native="search" placeholder="请输入学员编号" style="width:334px" @blur="search"></el-input>
            <el-button size="mini" type="primary" @click="delAll" style="float: right;margin-right: 20px">批量删除</el-button>
        </div>
        <el-table size="mini" :data="data" stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="student_name" label="学员姓名" fixed></el-table-column>
            <el-table-column prop="student_no" label="学员编号" width="120"></el-table-column>
            <el-table-column prop="student_mobile" label="联系电话" width="110"></el-table-column>
            <el-table-column prop="campus_name" label="校区"></el-table-column>
            <el-table-column prop="class_name" label="班级名称" width="250" fixed></el-table-column>
            <el-table-column prop="teacher_name" label="老师"></el-table-column>
            <el-table-column prop="class_week_day" label="重复周期"></el-table-column>
            <el-table-column prop="time_name" label="上课时段" width="100"></el-table-column>
            <el-table-column prop="classroom_name" label="教室"></el-table-column>
            <el-table-column prop="total_price" label="价格"></el-table-column>
            <el-table-column prop="left_times" label="剩余课次"></el-table-column>
            <el-table-column label="招生情况">
                <template slot-scope="scope">
                    <div>{{scope.row.signup_number + '/' + scope.row.max_students_no}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="payment_number" label="缴费"></el-table-column>
            <el-table-column prop="remain_number" label="剩余"></el-table-column>
            <el-table-column prop="waiting_number" label="候补人数"></el-table-column>
            <el-table-column prop="pay_time_limit" label="缴费截止日期" width="100"></el-table-column>
            <el-table-column prop="staff_name" label="报名操作人"></el-table-column>
            <el-table-column prop="signup_time" label="操作时间" width="100"></el-table-column>
            <el-table-column label="操作" width="300" fixed="right">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                    <el-button size="mini" type="primary" @click="handlePay(scope.$index, scope.row)">缴费
                    </el-button>
                    <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">修改截止日期
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
                            <h3 v-if="changeTeamLayer" class="modify-title">修改截止日期</h3>
                        </div>
                        <el-form :model="ruleForm" :rules="rules" size="mini" ref="ruleForm" label-width="100px" style="height: 200px;">
                            <el-form-item label="缴费截止日期" style="padding-top: 30px">
                                <el-date-picker v-model="ruleForm.pay_time_limit" type="datetime" placeholder="选择日期时间">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-button v-if="!changeTeamLayer" type="primary" @click="submitForm('ruleForm')">保存</el-button>
                                <el-button v-if="changeTeamLayer" type="primary" @click="submitForm('ruleForm')" style="margin-left: 100px">保存</el-button>
                                <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
                                <el-button @click="addTeamLayer=!addTeamLayer">取消</el-button>
                            </el-form-item>
                        </el-form>
                        <!--<div class="fotter-warp class-mag">
                            <el-steps :space="180"
                                      :active="2"
                                      finish-status="success">
                                <el-step title="基本信息"
                                         style="font-size: 13px;"></el-step>
                                <el-step title="上课安排"></el-step>
                                <el-step title="完成"></el-step>
                            </el-steps>
                            <el-button type="primary" size="mini"
                                       style="position: absolute;right: 20px;top: 10px;">下一步</el-button>
                        </div>-->
                    </div>
                </transition>
            </div>
        </transition>
        <!--缴费弹出框-->
        <transition name="el-fade-in-linear">
            <div v-show="paymentLayer" class="bg-layer1">
                <transition name="el-zoom-in-center">
                    <div v-if="paymentLayer" class="transition-box1">
                        <div class="title-warp2">
                            <div class="close-btn1" @click="paymentLayer=!paymentLayer"><i class="el-icon-close"></i></div>
                            <h3 class="modify-title1">缴费</h3>
                        </div>
                        <div class="lesson-single">
                            <div class="lesson-single-warp">
                                <v-payfees @handleClose="onClose"></v-payfees>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </transition>
    </div>
</template>

<script>
import vPayfees from "./PayFees.vue";
export default {
  components: {
    vPayfees
  },
  data() {
    return {
      cur_page: 0, //页码
      cur_limit: 10, //每次请求的数据数
      count: 0, //数据总量
      organId: null, // 机构id
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
      student_word: "", //搜索学生电话、姓名的值
      student_no: "", //学生编号
      //变量
      role_name: "",
      status: "",
      organ_id2: [], //新增组件内的学校id,
      dataList: [], //请求的list
      roleIds: [],
      location: [], //校区导航
      selectedLocation: [], //选择校区
      multipleSelection: [], //选中行的集合
      addTeamLayer: false, //新增弹出框状态
      changeTeamLayer: false, //修改弹出框状态
      paymentLayer: false, //缴费弹出框
      PaymentClassItems: "", //要操作的报名订单列表
      choosePaymentItems: null, //要操作的报名订单列表
      ruleForm: {
        //新增数据
        pay_time_limit: "" //缴费截止日期
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
    this.Util.querySysconst(this, "100", this.$store.state.SubjectOptions); //查询科目
    this.Util.querySysconst(self, "002", this.$store.state.CourseTypeOptions); //查询类别/课型
    this.Util.querySysconst(self, "003", this.$store.state.ClassTypeOptions); //查询班型
    this.Util.querySysconst(this, "007", this.$store.state.DepartmentOptions); //查询学部
    this.Util.querySysconst(this, "001", this.$store.state.ProjectTypeOptions); //项目类型
    self.location = self.$store.state.location;
    // self.organId=self.$store.state.organId;
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
        d.pay_time_limit =
          self.Util.TimeCycle(d.pay_time_limit, "ymd") +
          self.Util.TimeCycle(d.pay_time_limit, "hm");
        d.signup_time = self.Util.TimeCycle(d.signup_time, "ymd");
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
    select_word: function() {
      const self = this;
      self.teacherName = self.select_word;
    },
    student_word: function() {
      const self = this;
      if (/^\d+$/.test(this.student_word) && this.student_word !== "") {
        console.log("1");
        self.studentMobile = this.student_word;
        self.studentName = null;
      } else if (this.student_word !== "") {
        console.log("2");
        self.studentName = this.student_word;
        self.studentMobile = null;
      } else {
        console.log("3");
        self.studentName = null;
        self.studentMobile = null;
      }
    },
    changeForm2: function() {
      //修改的参数赋值
      this.ruleForm.pay_time_limit = this.changeForm2.pay_time_limit; //此课班级的唯一id int,  --> 如果为新增,此值为空字符串
      this.ruleForm.orderId = this.changeForm2.order_id; //此课班级的唯一id int,  --> 如果为新增,此值为空字符串
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
    continueClass: function() {
      this.cur_page = 0;
      this.getData();
    },
    underClass: function() {
      this.cur_page = 0;
      this.getData();
    },
    student_no: function() {
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
        studentId: null, //学生id
        organId: this.organId, // 机构id
        particular_year: this.particular_year, //int 年份
        season: this.season, // 期别：[暑假，秋季，寒假，春季]等
        periods: this.periods, //老师电话
        grade: this.grade, //适用年级，[一年级，二年级]等
        subject: this.subject, //科目，[数学，物理]等
        projectType: this.projectType, //项目类型 [长期，短期，公益，考试]等
        classType: this.classType, //班型，[超常，培优]等
        teacherName: this.teacherName, //老师名字
        className: this.className, //班级名称
        department: this.department, //学部，小学，初中，高中
        studentName: this.studentName, //学生姓名
        studentMobile: this.studentMobile, //学生电话
        studentNo: this.student_no, //学生编号
        orderStatus: "01001" //未缴费编号
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
        .post(this.GlobalVal.httpLink.queryStuentOrder, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              console.log("查询班级列表获取的对象", res.data);
              self.count = res.data.count;
              self.dataList = res.data.studentOrders;
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
    onClose() {
      this.paymentLayer = !this.paymentLayer;
    },
    //重新选择了地区事件
    handleLocationChange(value) {},
    //重新筛选函数
    screening() {
      this.getData();
    },

    //删除事件
    handleDelete(index, row) {
      this.$confirm("此操作将取消订单信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let objData = {
            source: this.GlobalVal.constants.source, //请求方式
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            orderStatus: "01009",
            idlist: [
              {
                id: row.order_id
              }
            ]
          };
          this.$axios
            .post(
              this.GlobalVal.httpLink.updateOrderStatus,
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
            message: "已取消删除操作"
          });
        });
    },
    //删除全部
    delAll() {
      //批量删除按钮触发
      const self = this;
      if (this.multipleSelection.length > 0) {
        this.$confirm("此操作将取消订单信息, 是否继续?", "警告", {
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
                id: self.multipleSelection[i].order_id
              });
            }

            let objData = {
              source: this.GlobalVal.constants.source, //请求方式
              orderStatus: "01009",
              staffId: JSON.parse(window.sessionStorage.getItem("staff"))
                .staffId,
              idlist: delArr
            };
            self.multipleSelection = [];
            this.$axios
              .post(
                this.GlobalVal.httpLink.updateOrderStatus,
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
    //下架事件
    /* handleDown(index, row) {
                const self = this;
                let objData={
                    staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                    classId:row.class_id, //班级ID
                    status:false //boolean, true:上架， false:下架
                };
                console.log("下架事件发起请求的参数",objData);
                this.$axios.post(this.GlobalVal.httpLink.changeClassStatus,JSON.stringify(objData)).then(
                    res=>{
                        if(res.data.code ==="10000"){
                            this.$message({
                                type: 'success',
                                message: '下架成功!'
                            });
                            self.getData();
                        }else{
                            this.$message({
                                type: 'error',
                                message: res.data.errmsg
                            });
                        }
                    },
                    res=>{
                        this.$message({
                            type: 'error',
                            message: "操作失败"
                        });
                    }
                );
            },*/
    //上架事件
    /*handleUp(index, row) {
                const self = this;
                let objData={
                    staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                    classId:row.class_id, //班级ID
                    status:true //boolean, true:上架， false:下架
                };
                console.log("上架事件发起请求的参数",objData);
                this.$axios.post(this.GlobalVal.httpLink.changeClassStatus,JSON.stringify(objData)).then(
                    res=>{
                        if(res.data.code ==="10000"){
                            this.$message({
                                type: 'success',
                                message: '上架成功!'
                            });
                            self.getData();
                        }else{
                            this.$message({
                                type: 'error',
                                message: res.data.errmsg
                            });
                        }
                    },
                    res=>{
                        this.$message({
                            type: 'error',
                            message: "操作失败"
                        });
                    }
                );
            },*/

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
      /*if(this.select_word===""){
                    this.$message({
                        type: 'error',
                        message: '填写要搜索的姓名或电话'
                    });
                }*/
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
      this.addTeamLayer = true;
      this.changeTeamLayer = true;
      this.changeForm2 = row;
    },

    //新增/修改--提交
    submitForm(formName) {
      const self = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let objData = {
            source: this.GlobalVal.constants.source,
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            orderId: this.ruleForm.orderId,
            newpaytimelimit: this.varJug(this.ruleForm.pay_time_limit)
          };
          console.log("修改缴费截止日期发起请求的参数", objData);
          this.$axios
            .post(
              this.GlobalVal.httpLink.updatepaytimelimit,
              JSON.stringify(objData)
            )
            .then(
              res => {
                if (res.data.code === "10000") {
                  console.log("修改缴费截止日期学校获取的对象", res.data);
                  self.addTeamLayer = false;
                  if (this.changeTeamLayer) {
                    self.$message({
                      type: "success",
                      message: "修改成功"
                    });
                  } else {
                    self.$message({
                      type: "success",
                      message: "新增成功"
                    });
                  }
                  self.getData();
                } else {
                  self.$message({
                    type: "error",
                    message: res.data.errmsg
                  });
                }
              },
              res => {
                self.$message("请求失败");
              }
            );
        } else {
          return false;
        }
      });
    },
    //修改的时候参数转换
    varJug(obj) {
      let self = this;
      let o = obj;
      o = self.Util.TimeCycle(new Date(o).getTime());
      return o;
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
    },
    //搜索学生姓名电话编号
    search() {
      this.getData();
    },
    //缴费
    handlePay(inde, row) {
      const self = this;
      let objData = {
        source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        studentId: row.student_id,
        orderId: row.order_id
      };
      console.log("查询班级发起请求的参数", objData);
      this.$axios
        .post(this.GlobalVal.httpLink.getnotpaidorder, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              console.log("查询班级列表获取的对象", res.data);
              self.count = res.data.count;
              self.choosePaymentItems = res.data.signupOrders;
              self.$store.commit(
                "setChoosePaymentItems",
                self.choosePaymentItems
              );
              self.$store.commit(
                "setStudentValidCoupons",
                res.data.studentValidCoupons
              );
              this.paymentLayer = true;
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
};
</script>
