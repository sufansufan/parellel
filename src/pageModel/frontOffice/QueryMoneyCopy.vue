<template>
  <div class="class-query table2">
    <el-table :data="data" size="mini" stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="refund_apply_time" label="发起时间" width="95"></el-table-column>
      <el-table-column prop="campus_name" label="校区"></el-table-column>
      <el-table-column prop="class_name" label="班级名称" width="250"></el-table-column>
      <el-table-column prop="teacher_name" label="老师"></el-table-column>
      <el-table-column prop="student_name" label="学员姓名"></el-table-column>
      <el-table-column prop="student_mobile" label="联系电话" width="110"></el-table-column>
      <el-table-column label="已上课次">
        <template slot-scope="scope">
          {{scope.row.buytimes - scope.row.refund_times}}
        </template>
      </el-table-column>
      <el-table-column prop="refund_times" label="剩余课次"></el-table-column>
      <el-table-column prop="total_price" label="报名金额"></el-table-column>
      <el-table-column prop="real_payment" label="实付金额"></el-table-column>
      <el-table-column prop="real_refund_amount" label="课次退费"></el-table-column>
      <el-table-column prop="other_refund_amount" label="额外退费"></el-table-column>
      <el-table-column prop="apply_refund_amount" label="退费总额"></el-table-column>
      <el-table-column prop="refund_tradeno" label="业务流水号"></el-table-column>
      <el-table-column prop="apply_staff_name" label="发起人/审核人/打款人"></el-table-column>
      <el-table-column label="操作" fixed="right" width="120">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.refund_status === '02001'" type="warning">等待审核</el-tag>
          <el-tag v-else-if="scope.row.refund_status === '02002'" :type="scope.row.audit_result ? 'warning' : 'danger'">{{scope.row.audit_result ? '等待打款' : '未通过审核'}}</el-tag>
          <el-button v-else-if="scope.row.refund_status === '02003'" size="mini" type="primary" @click="printEdit(scope.$index, scope.row)">打印退款单
          </el-button>
          <!-- <el-button v-else size="mini" disabled type="info">退费未完成
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :total="count" :page-size="limit" :page-sizes="[10,20,30,50]">
      </el-pagination>
    </div>
    <transition name="el-fade-in-linear">
      <div v-if="printLayer" class="bg-layer">
        <transition name="el-zoom-in-center">
          <div class="transition-box">
            <div class="title-warp">
              <div class="close-btn" @click="printLayer=!printLayer">
                <i class="el-icon-close"></i>
              </div>
              <h3 class="modify-title">打印退款记录</h3>
            </div>
            <div class="box">
              <div class="finance">
                <div class="financeLeft">
                  <div class="center">
                    <ul>
                      <li>
                        <i>学员姓名</i>
                        <p class="breadth_1">{{ printInfo.student_name }}</p>
                      </li>
                      <li>
                        <i>联系电话</i>
                        <p class="breadth_2">{{ printInfo.student_mobile }}</p>
                      </li>
                      <li>
                        <i>所属校区</i>
                        <p class="breadth_3">
                          {{ (printInfo.school_name || '') + (printInfo.branch_school_name || '') + (printInfo.campus_name || '') }}</p>
                      </li>
                      <li>
                        <i>操作人</i>
                        <p class="breadth_1">{{ printInfo.refund_staff_name }}</p>
                      </li>
                      <li>
                        <i>操作日期</i>
                        <p class="breadth_2">{{ printInfo.real_refund_time | dateFix }}</p>
                      </li>
                      <li>
                        <i>退费原因</i>
                        <p class="breadth_3">{{ printInfo.refund_reason }}</p>
                      </li>
                    </ul>

                    <table border="1" cellspacing="0" cellpadding="0">
                      <tr>
                        <th class="special">班级名称</th>
                        <th>报名金额</th>
                        <th>课次金额</th>
                        <th>已上课次</th>
                        <th>退课课次</th>
                        <th>退费金额</th>
                      </tr>
                      <tr>
                        <td>{{ printInfo.class_name }}</td>
                        <td>{{ printInfo.total_price }}</td>
                        <td>{{ printInfo.refund_single_price }}</td>
                        <td>{{ printInfo.checkin_num }}</td>
                        <td>{{ printInfo.refund_times }}</td>
                        <td>{{ printInfo.real_refund_amount }}</td>
                      </tr>
                    </table>
                    <ul>
                      <li>
                        <i>退费方式</i>
                        <p class="breadth_1">{{ printInfo.refund_pay_type }}</p>
                      </li>
                      <li>
                        <i>流水单号</i>
                        <p class="breadth_4">{{ printInfo.refund_tradeno }}</p>
                      </li>
                      <li>
                        <i class="breadth_2" style="font-weight: 700;">退费金额合计</i>
                        <p class="breadth_4" style="font-weight: 700;">￥{{ printInfo.real_refund_amount }}</p>
                      </li>
                      <li>
                        <i>操作人</i>
                        <p class="breadth_1">{{ printInfo.refund_staff_name }}</p>
                      </li>
                      <li>
                        <i>银行卡号</i>
                        <p class="breadth_2">{{ printInfo.bankcard_no }}</p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="financeRight">财务留存</div>

              </div>
              <hr />
              <div class="finance">
                <div class="financeLeft">
                  <div class="center">
                    <ul>
                      <li>
                        <i>学员姓名</i>
                        <p class="breadth_1">{{ printInfo.student_name }}</p>
                      </li>
                      <li>
                        <i>联系电话</i>
                        <p class="breadth_2">{{ printInfo.student_mobile }}</p>
                      </li>
                      <li>
                        <i>所属校区</i>
                        <p class="breadth_3">
                          {{ (printInfo.school_name || '') + (printInfo.branch_school_name || '') + (printInfo.campus_name || '') }}</p>
                      </li>
                      <li>
                        <i>操作人</i>
                        <p class="breadth_1">{{ printInfo.refund_staff_name }}</p>
                      </li>
                      <li>
                        <i>操作日期</i>
                        <p class="breadth_2">{{ printInfo.real_refund_time | dateFix }}</p>
                      </li>
                      <li>
                        <i>退费原因</i>
                        <p class="breadth_3">{{ printInfo.refund_reason }}</p>
                      </li>
                    </ul>

                    <table border="1" cellspacing="0" cellpadding="0">
                      <tr>
                        <th class="special">班级名称</th>
                        <th>报名金额</th>
                        <th>课次金额</th>
                        <th>已上课次</th>
                        <th>退课课次</th>
                        <th>退费金额</th>
                      </tr>
                      <tr>
                        <td>{{ printInfo.class_name }}</td>
                        <td>{{ printInfo.total_price }}</td>
                        <td>{{ printInfo.refund_single_price }}</td>
                        <td>{{ printInfo.checkin_num }}</td>
                        <td>{{ printInfo.refund_times }}</td>
                        <td>{{ printInfo.real_refund_amount }}</td>
                      </tr>
                    </table>
                    <ul>
                      <li>
                        <i>退费方式</i>
                        <p class="breadth_1">{{ printInfo.refund_pay_type }}</p>
                      </li>
                      <li>
                        <i>流水单号</i>
                        <p class="breadth_4">{{ printInfo.refund_tradeno }}</p>
                      </li>
                      <li>
                        <i class="breadth_2" style="font-weight: 700;">退费金额合计</i>
                        <p class="breadth_4" style="font-weight: 700;">￥{{ printInfo.real_refund_amount }}</p>
                      </li>
                      <li>
                        <i>操作人</i>
                        <p class="breadth_1">{{ printInfo.refund_staff_name }}</p>
                      </li>
                      <li>
                        <i>银行卡号</i>
                        <p class="breadth_2">{{ printInfo.bankcard_no }}</p>
                      </li>

                    </ul>

                  </div>
                </div>
                <div class="financeRight">学员留存</div>

              </div>
            </div>
            <el-button size="mini" type="primary" style="width: 200px;float: right;margin-right: 70px;margin-top: 40px" @click="cencelPrint">取消</el-button>
            <el-button size="mini" type="primary" style="width: 200px;float: right;margin-right: 70px;margin-top: 40px" @click="doPrint">打印</el-button>

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
      page: 0, //第几页
      limit: 10, //每次查询多少条
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

      particular_year: "", //年度选择
      selectedLocation: "", //学校选择
      printLayer: false,
      dataList: [
        {
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
    this.Util.querySysconst(this, "006", this.$store.state.SeasonOptions); //查询季节
    this.Util.querySysconst(this, "009", this.$store.state.PeriodsOptions); //查询期别
    this.Util.querySysconst(this, "101", this.$store.state.GradeOptions); //查询年级
    this.Util.querySysconst(this, "100", this.$store.state.ProjectTypeOptions); //查询科目
    this.Util.querySysconst(this, "002", this.$store.state.CourseTypeOptions); //查询类别/课型
    this.Util.querySysconst(this, "003", this.$store.state.ClassTypeOptions); //查询班型
    this.Util.querySysconst(this, "007", this.$store.state.DepartmentOptions); //查询学部
    this.Util.chargeMode(this); //查询支付方式
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
        d.refund_apply_time = self.Util.TimeCycle(d.refund_apply_time, "ymd");
        console.log(d);
        return d;
      });
    }
  },
  watch: {
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
  filters: {
    dateFix(value) {
      return new Date(value).toLocaleString("zh");
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
        studentId: this.$store.state.chooseStudentInfo.student_id, //学生ID
        studentName: this.student_name, //学生姓名
        className: this.class_name, //班级名称
        startTime: this.startTime, //前段传过来的数据
        endTime: this.endTime, //同上
        studentMobile: this.studentMobile, //学员电话
        orderno: this.orderno, //业务流水号：就是订单编号
        particularYear: null, //年份
        season: this.season, //季节
        periods: this.periods, //期别
        grade: this.grade, //年级
        subject: this.subject, //科目
        projectType: this.projectType, //类别
        classType: this.classType, //班型
        department: this.department, //学部
        campusId: this.campusName, //校区名称
        teacherName: this.teacherName, //教师姓名
        refundStatus: this.refundStatus //状态：申请退款，退款成功
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
    //翻页导航栏
    handleCurrentChange(val) {
      this.page = val - 1;
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
    //搜索学生姓名电话编号
    search() {
      this.getData();
    },
    handleLocationChange() {
      console.log(123);
    },
    printEdit(index, row) {
      const self = this;
      this.printInfo = row;
      this.printLayer = true;
      let payType = this.$store.state.PaymentTypeOptions.filter(
        val => val.code === this.printInfo.refund_pay_type
      );
      this.printInfo.refund_pay_type =
        this.printInfo.refund_pay_type === "01204"
          ? "银行卡"
          : payType[0] ? payType[0].label : "";
    },
    cencelPrint() {
      this.printLayer = false;
    },
    doPrint() {
      let newWindow = window.open("_blank"); //打开新窗口
      let codestr = document.querySelector(".box").innerHTML; //获取需要生成pdf页面的div代码
      codestr += `<style>
                  *{
                    margin: 0 auto;
                    padding: 0 auto;
                }
                ul,li{
                    list-style: none;
                }
                i{
                    font-style:normal;
                }
                .box{
                    width: 900px;
                    height: auto;
                    padding-bottom:20px ;
                }
                .finance{
                    margin-top:30px ;
                    width: 100%;
                    height: auto;
                    box-sizing: border-box;
                    overflow: hidden;
                    position: relative;
                }
                .financeLeft{
                    float: left;
                    width: 90%;
                    height: auto;
                    overflow: hidden;
                }
                .center{
                    width: 100%;
                    height: auto;

                }
                ul{
                    width: 100%;
                    height: auto;
                    overflow: hidden;
                }
                li{
                    float: left;
                    width: auto;
                    height: auto;
                }
                li>i{
                    display: inline-block;
                    width: 88px;
                    height: 30px;
                    line-height: 30px;
                    font-size: 16px;
                    text-align: left;
                }
                li>p{
                    display: inline-block;
                    width: 116px;
                    height: 30px;
                    line-height: 30px;
                    font-size: 16px;
                    text-align: left;
                }
                .breadth_1{
                    width: 80px;
                }
                .breadth_2{
                    width: 200px;
                }
                .breadth_3{
                    width: 292px;
                }
                .breadth_4{
                    width: 160px;
                }
                table{
                    border: 1px solid #000;
                    border-collapse: collapse;
                    margin: 20px auto;
                }
                table th{
                    padding: 0 22px;
                    font-size: 14px;
                    height: 22px;
                    line-height: 22px;
                    font-weight: 500;
                }
                table th.special{
                    width: 200px;
                }
                table td{
                    font-size: 14px;
                    height: 22px;
                    line-height: 22px;
                    font-weight: 500;
                    text-align: center;
                }
                .financeRight{
                    font-size: 16px;
                    color: #000;
                    position: absolute;
                    right: 28px;
                    top: 90px;
                    -moz-transform:rotate(90deg);
                    -webkit-transform:rotate(90deg);
                    -o-transform:rotate(90deg);
                    -ms-transform:rotate(90deg);
                    transform:rotate(90deg);

                }
                hr{
                    width: 100%;
                    height: 0px;
                    border: 0.5px solid #000;
                    margin: 20px auto;
                }</style>`;
      newWindow.document.write(codestr); //向文档写入HTML表达式或者JavaScript代码
      newWindow.document.close(); //关闭document的输出流, 显示选定的数据
      newWindow.print(); //打印当前窗口
      return true;
    }
  }
};
</script>
<style scoped>
.class-query-screen .el-select {
  width: 200px;
}

.class-query-screen .el-cascader {
  width: 200px;
}
/*打印退款记录*/
* {
  margin: 0 auto;
  padding: 0 auto;
}
ul,
li {
  list-style: none;
}
i {
  font-style: normal;
}
.box {
  width: 900px;
  height: auto;
  padding-bottom: 20px;
  color: #000;
}
.finance {
  margin-top: 30px;
  width: 100%;
  height: auto;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
}
.financeLeft {
  float: left;
  width: 90%;
  height: auto;
  overflow: hidden;
}
.center {
  width: 100%;
  height: auto;
}
ul {
  width: 100%;
  height: auto;
  overflow: hidden;
}
li {
  float: left;
  width: auto;
  height: auto;
}
li > i {
  display: inline-block;
  width: 88px;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  text-align: left;
}
li > p {
  display: inline-block;
  width: 116px;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  text-align: left;
}
.breadth_1 {
  width: 80px;
}
.breadth_2 {
  width: 200px;
}
.breadth_3 {
  width: 292px;
}
.breadth_4 {
  width: 160px;
}
table {
  border: 1px solid #000;
  border-collapse: collapse;
  margin: 20px auto;
}
table th {
  padding: 0 22px;
  font-size: 14px;
  height: 22px;
  line-height: 22px;
  font-weight: 500;
}
table th.special {
  width: 200px;
}
table td {
  font-size: 14px;
  height: 22px;
  line-height: 22px;
  font-weight: 500;
  text-align: center;
}
.financeRight {
  font-size: 16px;
  color: #000;
  position: absolute;
  right: 28px;
  top: 90px;
  -moz-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  -o-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  transform: rotate(90deg);
}
hr {
  width: 100%;
  height: 0px;
  border: 0.5px solid #000;
  margin: 20px auto;
}
</style>
<style scoped>
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
  width: 1000px !important;
  height: 600px;
  min-height: 480px;
  margin: auto;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  border-radius: 4px;
  background-color: #ffffff;
  overflow-y: auto;
  color: #333333;
  padding-top: 60px;
  padding-left: 20px;
  padding-bottom: 20px;
  box-sizing: border-box;
  z-index: 10;
}

.title-warp {
  position: absolute;
  width: 100%;
  padding: 10px;
  height: 50px;
  box-sizing: border-box;
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
