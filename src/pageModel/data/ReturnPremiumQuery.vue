<template>
    <div class="table">
        <div class="handle-box">
            <!--筛选条件-->
            <el-date-picker size="mini" v-model="startTime" type="date" placeholder="选择日期">
            </el-date-picker>
            <el-date-picker size="mini" v-model="endTime" type="date" placeholder="选择日期">
            </el-date-picker>
            <br>
            <div class="class-query-screen">
                <el-select v-model="particular_year" size="mini" placeholder="年度">
                    <el-option v-for="item in $store.state.YearOptions" :key="item.code" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="season" size="mini" placeholder="季节">
                    <el-option v-for="item in $store.state.SeasonOptions" :key="item.code" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="periods" size="mini" placeholder="期别不限">
                    <el-option v-for="item in $store.state.PeriodsOptions" :key="item.code" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="grade" size="mini" placeholder="年级不限">
                    <el-option v-for="item in $store.state.GradeOptions" :key="item.code" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="subject" size="mini" placeholder="科目不限">
                    <el-option v-for="item in $store.state.SubjectOptions" :key="item.code" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="projectType" size="mini" placeholder="类别/课型不限" style="padding-top: 20px">
                    <el-option v-for="item in $store.state.CourseTypeOptions" :key="item.code" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="classType" size="mini" placeholder="班型不限">
                    <el-option v-for="item in $store.state.ClassTypeOptions" :key="item.code" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="department" size="mini" placeholder="学部">
                    <el-option v-for="item in $store.state.DepartmentOptions" :key="item.code" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-cascader clearable size="mini" expand-trigger="click" :options="location" v-model="selectedLocation" placeholder="学校不限" change-on-select @change="handleLocationChange">
                </el-cascader>
                <!--<el-button type="primary" size="mini" icon="search"  @click="screening">筛选</el-button>-->
            </div>
            <br>
            <!--动态搜索框-->
            <div class="search-warp">
                <el-autocomplete size="mini" v-model="select_word" :fetch-suggestions="queryTeacherOrClassname" placeholder="请输入搜索内容" class="search-input">
                    <el-select style="width: 100px;" v-model="selectTeacherOrClass" slot="prepend" placeholder="请选择">
                        <el-option label="老师姓名" value="teacher"></el-option>
                        <el-option label="班级" value="class"></el-option>
                    </el-select>
                    <el-button class="search-btn" slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-autocomplete>
            </div>
            <el-input v-model="student_word" border="none" size="mini" class="handle-input mr10" @keyup.enter.native="search" placeholder="请输入学员姓名/手机号" style="width:18%"></el-input>
            <el-input v-model="orderno" border="none" size="mini" class="handle-input mr10" @keyup.enter.native="search" placeholder="请输入业务流水号" style="width:18%"></el-input>
            <el-button size="mini" type="primary" @click="delAll" style="float: right;margin-right: 20px">批量删除</el-button>
        </div>
        <el-table :data="data" size="mini" stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="refund_apply_time" label="发起时间"></el-table-column>
            <el-table-column prop="campus_name" label="校区"></el-table-column>
            <el-table-column prop="class_name" label="班级名称"></el-table-column>
            <el-table-column prop="teacher_name" label="老师"></el-table-column>
            <el-table-column prop="student_name" label="学员姓名"></el-table-column>
            <el-table-column prop="student_mobile" label="联系电话"></el-table-column>
            <el-table-column prop="refund_staff_name" label="已上课次"></el-table-column>
            <el-table-column prop="left_times" label="剩余课次"></el-table-column>
            <el-table-column prop="apply_refund_amount" label="报名金额"></el-table-column>
            <el-table-column prop="refund_staff_name" label="实付金额"></el-table-column>
            <el-table-column prop="class_fefund_amount " label="课次退费"></el-table-column>
            <el-table-column prop="other_refund_amount " label="额外退费"></el-table-column>
            <el-table-column prop="apply_refund_amount" label="退费总额"></el-table-column>
            <el-table-column prop="refund_status" label="状态"></el-table-column>
            <el-table-column prop="orderno" label="业务流水号"></el-table-column>
            <el-table-column prop="apply_staff_name" label="发起人/审核人/打款人"></el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">详情
                    </el-button><br>
                    <el-button size="mini" type="primary" @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :total="count" :page-size="limit" :page-sizes="[10,20,30,50]">
            </el-pagination>
        </div>
        <!--添加/修改弹出框-->
        <transition name="el-fade-in-linear">
            <div v-show="addTeamLayer" class="bg-layer">
                <transition name="el-zoom-in-center">
                    <div v-if="addTeamLayer" class="transition-box">
                        <div class="title-warp">
                            <div class="close-btn" @click="addTeamLayer=!addTeamLayer">
                                <i class="el-icon-close"></i>
                            </div>
                            <h3 v-if="!changeTeamLayer" class="modify-title">新增退款信息</h3>
                            <h3 v-if="changeTeamLayer" class="modify-title">修改退款信息</h3>
                        </div>
                        <el-form :model="ruleForm" :rules="rules" size="mini" ref="ruleForm" label-width="100px" style="height: 400px;overflow-y: scroll;">
                            <el-form-item label="学生ID" prop="student_id">
                                <el-input v-model="ruleForm.student_id"></el-input>
                            </el-form-item>
                            <el-form-item label="学生姓名" prop="student_name">
                                <el-input v-model="ruleForm.student_name"></el-input>
                            </el-form-item>
                            <el-form-item label="班级ID" prop="class_id">
                                <el-input v-model="ruleForm.class_id"></el-input>
                            </el-form-item>
                            <el-form-item label="班级名称" prop="class_name">
                                <el-input v-model="ruleForm.class_name"></el-input>
                            </el-form-item>
                            <el-form-item label="订单ID" prop="order_id">
                                <el-input v-model="ruleForm.order_id"></el-input>
                            </el-form-item>
                            <el-form-item label="订单总价" prop="total_price">
                                <el-input v-model="ruleForm.total_price"></el-input>
                            </el-form-item>
                            <el-form-item label="订单实付价" prop="real_payment">
                                <el-input v-model="ruleForm.real_payment"></el-input>
                            </el-form-item>
                            <el-form-item label="课程总次数" prop="total_times">
                                <el-input v-model="ruleForm.total_times"></el-input>
                            </el-form-item>
                            <el-form-item label="课程剩余次数" prop="left_times">
                                <el-input v-model="ruleForm.left_times"></el-input>
                            </el-form-item>
                            <el-form-item label="申请退款时间" prop="refund_apply_time">
                                <el-input v-model="ruleForm.refund_apply_time"></el-input>
                            </el-form-item>
                            <el-form-item label="申请退款来源" prop="refund_apply_source">
                                <el-input v-model="ruleForm.refund_apply_source"></el-input>
                            </el-form-item>
                            <el-form-item label="申请退款金额" prop="apply_refund_amount">
                                <el-input v-model="ruleForm.apply_refund_amount"></el-input>
                            </el-form-item>
                            <el-form-item label="申请退款原因" prop="refund_reason">
                                <el-input v-model="ruleForm.refund_reason"></el-input>
                            </el-form-item>
                            <el-form-item label="退款支付类型" prop="refund_pay_type">
                                <el-input v-model="ruleForm.refund_pay_type"></el-input>
                            </el-form-item>
                            <el-form-item label="银行卡卡号" prop="bankcard_no">
                                <el-input v-model="ruleForm.bankcard_no"></el-input>
                            </el-form-item>
                            <el-form-item label="开户行" prop="opening_bank">
                                <el-input v-model="ruleForm.opening_bank"></el-input>
                            </el-form-item>
                            <el-form-item label="支付宝帐号" prop="alipay_acount">
                                <el-input v-model="ruleForm.alipay_acount"></el-input>
                            </el-form-item>
                            <el-form-item label="微信支付帐号" prop="wechat_acount">
                                <el-input v-model="ruleForm.wechat_acount"></el-input>
                            </el-form-item>
                            <el-form-item label="员工ID" prop="apply_staff_id">
                                <el-input v-model="ruleForm.apply_staff_id"></el-input>
                            </el-form-item>
                            <el-form-item label="员工姓名" prop="apply_staff_name">
                                <el-input v-model="ruleForm.apply_staff_name"></el-input>
                            </el-form-item>
                            <el-form-item label="实际退款金额" prop="real_refund_amount">
                                <el-input v-model="ruleForm.real_refund_amount"></el-input>
                            </el-form-item>
                            <el-form-item label="实际退款时间" prop="real_refund_time">
                                <el-input v-model="ruleForm.real_refund_time"></el-input>
                            </el-form-item>
                            <el-form-item label="实际退款员工ID" prop="refund_staff_id">
                                <el-input v-model="ruleForm.refund_staff_id"></el-input>
                            </el-form-item>
                            <el-form-item label="实际退款员工姓名" prop="refund_staff_name">
                                <el-input v-model="ruleForm.refund_staff_name"></el-input>
                            </el-form-item>
                            <el-form-item label="申请退款状态" prop="refund_status">
                                <el-input v-model="ruleForm.refund_status"></el-input>
                            </el-form-item>

                            <el-form-item>
                                <el-button v-if="!changeTeamLayer" type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                                <el-button v-if="changeTeamLayer" type="primary" @click="submitForm('ruleForm')">确认修改</el-button>
                                <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
                                <el-button @click="addTeamLayer=!addTeamLayer">取消</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </transition>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
  data() {
    return {
      page: "", //第几页
      limit: "", //每次查询多少条
      count: 3, //数据的总量
      selectTeacherOrClass: "teacher",
      select_word: "", //搜索集合
      staffId: "", //用户id3
      student_id: "", //学生ID
      student_name: "", //学生姓名
      class_id: "", //班级ID
      class_name: "", //班级名称
      order_id: "", //订单ID
      refund_apply_source: "", //申请退款来源
      refund_pay_type: "", //退款支付类型
      refund_status: "", //申请退款状态：申请退款，退款成功
      studentName: "", //学生姓名
      classId: "", //  班级ID
      className: "", //班级名称
      orderId: "", //订单id
      refundApplySource: "", //申请退款来源
      refundPayType: "", //退款支付的类型
      refundStatus: "", //申请退款的状态
      startTime: "", //前段传过来的数据
      endTime: "", //同上
      studentMobil: "", //学员电话
      orderno: "", //业务流水号：就是订单编号
      particularYear: null, //年份
      season: "", //季节
      periods: "", //期别
      grade: "", //年级
      subject: "", //科目
      projectType: "", //类别
      classType: "", //班型
      department: "", //学部
      campusName: "", //校区名称
      teacherName: "", //教师姓名
      student_word: "", //搜索学生电话、姓名的值
      student_no: "", //搜索学员编号
      dataList: [
        {
          id: "", //主键
          student_id: "", //学生ID
          student_name: "2131", //学生姓名
          class_id: "", //班级ID
          class_name: "133", //班级名称
          order_id: "", //订单ID
          total_price: "", //订单总价
          real_payment: "", //订单实付价
          total_times: "", //课程总次数
          left_times: "", //课程剩余次数
          refund_apply_time: "", //申请退款时间
          refund_apply_source: "", //申请退款来源
          apply_refund_amount: "", //申请退款金额n
          refund_reason: "", //申请退款原因
          refund_pay_type: "", //退款支付类型
          bankcard_no: "", //银行卡卡号
          bank_card_payee: "", //银行卡户主
          opening_bank: "", //开户行
          alipay_acount: "", //支付宝帐号
          wechat_acount: "", //微信支付帐号
          apply_staff_id: "", //申请退款的员工ID，仅在从前台申请退款时用
          apply_staff_name: "", //申请退款的员工姓名，仅在从前台申请退款时用
          real_refund_amount: "", //实际退款金额
          real_refund_time: "", //实际退款时间
          refund_staff_id: "", //实际退款员工ID
          refund_staff_name: "", //实际退款员工姓名
          refund_status: "" //申请退款状态：申请退款，退款成功
        }
      ],
      addTeamLayer: false, //新增弹出框状态
      changeTeamLayer: false, //修改弹出框状态
      ruleForm: {
        //新增数据
        id: "", //主键
        student_id: "", //学生ID
        student_name: "", //学生姓名
        class_id: "", //班级ID
        class_name: "", //班级名称
        order_id: "", //订单ID
        total_price: "", //订单总价
        real_payment: "", //订单实付价
        total_times: "", //课程总次数
        left_times: "", //课程剩余次数
        refund_apply_time: "", //申请退款时间
        refund_apply_source: "", //申请退款来源
        apply_refund_amount: "", //申请退款金额
        refund_reason: "", //申请退款原因
        refund_pay_type: "", //退款支付类型
        bankcard_no: "", //银行卡卡号
        bank_card_payee: "", //银行卡户主
        opening_bank: "", //开户行
        alipay_acount: "", //支付宝帐号
        wechat_acount: "", //微信支付帐号
        apply_staff_id: "", //申请退款的员工ID，仅在从前台申请退款时用
        apply_staff_name: "", //申请退款的员工姓名，仅在从前台申请退款时用
        real_refund_amount: "", //实际退款金额
        real_refund_time: "", //实际退款时间
        refund_staff_id: "", //实际退款员工ID
        refund_staff_name: "", //实际退款员工姓名
        refund_status: "" //申请退款状态：申请退款，退款成功
      },
      //接收当前行的信息
      changeForm2: {},
      //表单校验规则
      rules: {
        school_name: [
          { required: true, message: "请输入学校名称", trigger: "blur" }
        ],
        school_phone: [
          { required: true, message: "请输入学校电话", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    const self = this;
    this.Util.queryAreaNav(self, undefined, function() {
      self.getData();
    });
    this.Util.querySysconst(self, "006", this.$store.state.SeasonOptions); //查询季节
    this.Util.querySysconst(self, "009", this.$store.state.PeriodsOptions); //查询期别
    this.Util.querySysconst(self, "101", this.$store.state.GradeOptions); //查询年级
    this.Util.querySysconst(self, "100", this.$store.state.SubjectOptions); //查询科目
    this.Util.querySysconst(self, "002", this.$store.state.CourseTypeOptions); //查询类别/课型
    this.Util.querySysconst(self, "003", this.$store.state.ClassTypeOptions); //查询班型
    this.Util.querySysconst(self, "007", this.$store.state.DepartmentOptions); //查询学部
    self.location = self.$store.state.location;
    self.organId = self.$store.state.organId;
  },
  computed: {
    data() {
      const self = this;
      if (!self.dataList) {
        return [];
      }
      return self.dataList.filter(function(d) {
        return d;
      });
    }
  },
  watch: {
    select_word: function() {
      const self = this;
      self.teacherName = self.select_word;
    },
    /*select_word:function () {
                const self = this;
                if((/^\d+$/).test(this.select_word) && this.select_word!==""){
                    console.log('1');
                    self.orderno = this.select_word;
                    self.student_name="";
                }else if(this.select_word!==""){
                    console.log('2');
                    self.student_name= this.select_word;
                    console.log(self.student_name);
                    self.orderno ="";
                }else{
                    console.log('3');
                    self.student_name ="";
                    self.orderno="";
                }
            },*/
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
      //修改参数赋值
      this.ruleForm.id = this.changeForm2.id; //学生id
      this.ruleForm.student_id = this.changeForm2.student_id; //学生id
      this.ruleForm.student_name = this.changeForm2.student_name; //学生姓名
      this.ruleForm.class_id = this.changeForm2.class_id; //班级id
      this.ruleForm.class_name = this.changeForm2.class_name; //班级名称
      this.ruleForm.order_id = this.changeForm2.order_id; //订单ID
      this.ruleForm.total_price = this.changeForm2.total_price; //订单总价
      this.ruleForm.real_payment = this.changeForm2.real_payment; //订单实付价
      this.ruleForm.total_times = this.changeForm2.total_times; //支付类型
      this.ruleForm.left_times = this.changeForm2.left_times; //订单编号
      this.ruleForm.refund_apply_time = this.changeForm2.refund_apply_time; //业务流水号
      this.ruleForm.refund_apply_source = this.changeForm2.refund_apply_source; //操作员工id
      this.ruleForm.apply_refund_amount = this.changeForm2.apply_refund_amount; //操作员工姓名
      this.ruleForm.refund_reason = this.changeForm2.refund_reason; //请求方式
      this.ruleForm.refund_pay_type = this.changeForm2.refund_pay_type; //创建日期
      this.ruleForm.bankcard_no = this.changeForm2.bankcard_no; //修改日期
      this.ruleForm.bank_card_payee = this.changeForm2.bank_card_payee; //修改日期
      this.ruleForm.opening_bank = this.changeForm2.opening_bank; //修改日期
      this.ruleForm.alipay_acount = this.changeForm2.alipay_acount; //修改日期
      this.ruleForm.wechat_acount = this.changeForm2.wechat_acount; //修改日期
      this.ruleForm.apply_staff_id = this.changeForm2.apply_staff_id; //修改日期
      this.ruleForm.apply_staff_name = this.changeForm2.apply_staff_name; //修改日期
      this.ruleForm.real_refund_amount = this.changeForm2.real_refund_amount; //修改日期
      this.ruleForm.refund_staff_id = this.changeForm2.refund_staff_id; //修改日期
      this.ruleForm.refund_staff_name = this.changeForm2.refund_staff_name; //修改日期
      this.ruleForm.refund_status = this.changeForm2.refund_status; //修改日期
      this.ruleForm.created_at = this.changeForm2.created_at; //修改日期
      this.ruleForm.updated_at = this.changeForm2.updated_at; //修改日期
    },
    particular_year: function() {
      //年度改变
      this.getData();
    },
    season: function() {
      // 季节
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
    classType: function() {
      //班型
      this.getData();
    },
    orderno: function() {
      //业务流水号
      this.getData();
    }
  },
  methods: {
    getData() {
      const self = this;
      let objData = {
        source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        page: this.page, //页数
        limit: this.limit, //条目数
        studentId: "", //学生ID
        studentName: this.student_name, //学生姓名
        classId: this.class_id, //  班级ID
        className: this.class_name, //班级名称
        startTime: this.startTime, //前段传过来的数据
        endTime: this.endTime, //同上
        studentMobil: this.studentMobil, //学员电话
        orderno: this.orderno, //业务流水号：就是订单编号
        particularYear: null, //年份
        season: this.season, //季节
        periods: this.periods, //期别
        grade: this.grade, //年级
        subject: this.subject, //科目
        projectType: this.projectType, //类别
        classType: this.classType, //班型
        department: this.department, //学部
        campusName: this.campusName, //校区名称
        teacherName: this.teacherName //教师姓名
      };
      //搜索框中的选择老师或者是班级搜索
      if (this.selectTeacherOrClass === "class") {
        objData.className = this.select_word;
        objData.teacherName = "";
      } else {
        objData.className = "";
        objData.teacherName = this.select_word;
      }
      console.log("查询退款订单发起请求的参数", objData);
      this.$axios
        .post(
          this.GlobalVal.httpLink.queryRefundRecord,
          JSON.stringify(objData)
        )
        .then(
          res => {
            if (res.data.code === "10000") {
              console.log("查询支付订单列表获取的对象", res.data);
              self.count = res.data.count;
              self.dataList = res.data.refundRecords;
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
    //翻页导航栏
    handleCurrentChange(val) {
      this.cur_page = val - 1;
      this.getData();
    },
    //每页显示数目发生变化
    handleSizeChange(val) {
      this.limit = val;
      this.getData();
    },
    //搜索退款---刷新
    search() {
      if (this.select_word === "") {
        this.$message({
          type: "error",
          message: "填写要搜索的学生姓名或订单编号"
        });
      }
      this.getData();
    },
    //新增按钮事件
    handleAdd() {
      this.addTeamLayer = true;
      this.changeTeamLayer = false;
      //清空参数
    },
    //修改按钮事件
    handleEdit(index, row) {
      this.changeTeamLayer = true;
      this.addTeamLayer = true;
      this.changeForm2 = row;
    },
    submitForm(formName) {
      const self = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let objData = {
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            refundRecord: this.varJug(this.ruleForm)
          };
          console.log("新增/修改退款订单发起请求的参数", objData);
          this.$axios
            .post(
              this.GlobalVal.httpLink.editRefundRecord,
              JSON.stringify(objData)
            )
            .then(
              res => {
                if (res.data.code === "10000") {
                  console.log("新增/修改退款订单获取的对象", res.data);
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
    varJug(obj) {
      let self = this;
      let o = obj;
      return o;
    },
    //删除事件
    handleDelete(index, row) {
      console.log(index, row);
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
                id: row.id
              }
            ]
          };
          this.$axios
            .post(
              this.GlobalVal.httpLink.delRefundRecord,
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
        this.$confirm("此操作将永久删除这些名单, 是否继续?", "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let delTeacher = [];
            for (
              let i = 0, length = self.multipleSelection.length;
              i < length;
              i++
            ) {
              delTeacher.push({
                id: self.multipleSelection[i].id
              });
            }

            let objData = {
              staffId: JSON.parse(window.sessionStorage.getItem("staff"))
                .staffId,
              delList: delTeacher
            };
            self.multipleSelection = [];
            this.$axios
              .post(
                this.GlobalVal.httpLink.delRefundRecord,
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
    }
  }
};
</script>
<style>
.handle-box {
  margin-bottom: 20px;
}
.search-warp {
  display: inline-block;
  /*float: right;*/
}
.handle-input {
  width: 300px;
  display: inline-block;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 100px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
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
  min-height: 400px;
}
.transition-box {
  position: absolute;
  width: 600px;
  height: 480px;
  min-height: 480px;
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
  width: 100%;
  height: 50px;
  top: 0px;
  right: 0;
  z-index: 10;
  background: #ffffff;
  -webkit-box-shadow: 0px 0px 3px #ccc;
  -moz-box-shadow: 0px 0px 3px #ccc;
  box-shadow: 0px 0px 3px #ccc;
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
</style>
