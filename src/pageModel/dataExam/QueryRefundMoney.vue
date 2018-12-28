<template>
  <div>
    <div class="handle-box">
      <!--筛选条件-->
      <el-date-picker clearable size="mini" v-model="startTime" type="date" placeholder="选择日期" style="width:200px;">
      </el-date-picker>
      <el-date-picker clearable size="mini" v-model="endTime" type="date" placeholder="选择日期" style="width:200px;">
      </el-date-picker>
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
        <el-select clearable v-model="projectType" size="mini" placeholder="类别/课型不限" style="padding-top: 20px">
          <el-option v-for="item in $store.state.CourseTypeOptions" :key="item.code" :label="item.label" :value="item.value">
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
        <!--<el-button type="primary" size="mini" icon="search"  @click="screening">筛选</el-button>-->
      </div>
      <!--动态搜索框-->
      <div class="handle-content">
        <el-select clearable v-model="refund_status" size="mini" placeholder="退款状态">
          <el-option v-for="item in refundStatusList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-cascader clearable size="mini" expand-trigger="click" :options="location" v-model="selectedLocation" placeholder="学校不限" change-on-select @change="handleLocationChange">
        </el-cascader>
        <div class="search-warp">
          <el-input clearable size="mini" v-model="select_word" :fetch-suggestions="queryTeacherOrClassname" placeholder="请输入搜索内容" class="search-input">
            <el-select style="width: 100px;" v-model="selectTeacherOrClass" slot="prepend" placeholder="请选择">
              <el-option label="老师姓名" value="teacher"></el-option>
              <el-option label="班级" value="class"></el-option>
            </el-select>
            <el-button class="search-btn" slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </div>
        <el-input v-model="student_word" border="none" size="mini" clearable class="handle-input mr10" @keyup.enter.native="search" @blur="search" placeholder="请输入学员姓名/手机号" style="width:16.4%"></el-input>
        <el-input v-model="refund_tradeno" border="none" size="mini" clearable class="handle-input mr10" @keyup.enter.native="search" @blur="search" placeholder="请输入业务流水号" style="width:18%"></el-input>
        <el-checkbox :label="false" v-model="isTurnClassRefund">显示跨财务主体转班产生的退费记录</el-checkbox>
        <div style="margin: 15px 0 0 0;" v-show="$store.state.code.includes('011301') && $route.path === '/returnPremiumQuery' || $store.state.code.includes('030301') && $route.path === '/queryMoney'">
          <el-button @click="exportList" size="mini" type="primary">导出信息</el-button>
        </div>
      </div>
    </div>
    <el-table :data="data" size="mini" stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="refund_apply_time" label="发起时间"></el-table-column>
      <el-table-column prop="campus_name" label="校区"></el-table-column>
      <el-table-column prop="class_name" label="班级名称" width="250"></el-table-column>
      <el-table-column prop="teacher_name" label="老师"></el-table-column>
      <el-table-column prop="student_name" label="学员姓名"></el-table-column>
      <el-table-column prop="student_mobile" label="联系电话"></el-table-column>
      <el-table-column prop="refund_times" label="退费次数"></el-table-column>
      <el-table-column label="未退费次数">
        <template slot-scope="scope">
          {{scope.row.buytimes - scope.row.refund_times}}
        </template>
      </el-table-column>
      <el-table-column prop="total_price" label="报名金额"></el-table-column>
      <el-table-column prop="real_payment" label="实付金额"></el-table-column>
      <el-table-column label="课次退费">
        <template slot-scope="scope">
          ￥{{ scope.row.refund_single_price ? scope.row.refund_single_price.toFixed(2) : '0.00' }}
        </template>
      </el-table-column>
      <el-table-column label="额外退费">
        <template slot-scope="scope">
          ￥{{scope.row.other_refund_amount}}
        </template>
        <!-- <template slot-scope="scope">
          ￥{{(scope.row.refund_times - (scope.row.buytimes - scope.row.checkin_num)) * scope.row.refund_single_price}}
        </template> -->
      </el-table-column>
      <el-table-column prop="apply_refund_amount" label="退费总额"></el-table-column>
      <el-table-column prop="refund_status_label" label="状态"></el-table-column>
      <el-table-column prop="refund_tradeno" label="业务流水号"></el-table-column>
      <el-table-column prop="apply_staff_name" label="发起人/审核人/打款人"></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)" v-if="!isAdmin">查看 </el-button>
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)" v-if="isAdmin && scope.row.refund_status_label === '未审核'">审核</el-button>
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)" v-if="isAdmin && scope.row.refund_status_label === '已退款'">查看</el-button>
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)" v-if="isAdmin && scope.row.refund_status_label === '已审核' && scope.row.audit_result">打款</el-button>
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)" v-if="isAdmin && scope.row.refund_status_label === '已审核' && (!scope.row.audit_result || scope.row.audit_result === null)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <div class="pagination-total">
        <span>申请退费总额 ￥ {{sumRefund.apply_refund_amount && sumRefund.apply_refund_amount.toLocaleString() || 0}} 元</span>
        <span>课程退费总额 ￥ {{sumRefund.class_refund_amount && sumRefund.class_refund_amount.toLocaleString() || 0}} 元</span>
        <span>额外退费总额 ￥ {{sumRefund.other_refund_amount && sumRefund.other_refund_amount.toLocaleString() || 0}} 元</span>
        <span>真正退费总额 ￥ {{sumRefund.real_refund_amount && sumRefund.real_refund_amount.toLocaleString() || 0}} 元</span>
      </div>
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
              <h3 v-if="changeTeamLayer" class="modify-title">退费详情</h3>
            </div>
            <div v-loading="loading">
              <div class="student-info-box">
                <div style="line-height: 42px; padding-left: 20px;">
                  <div>{{rowInfo.student_name}}</div>
                </div>
                <div>
                  <div>
                    <span>上课时段：</span>{{rowInfo.start_time}} - {{rowInfo.end_time}}</div>
                  <div>
                    <span>校区：</span>{{rowInfo.campus_name}}
                    <span> 班级名称：</span> {{rowInfo.class_name}}</div>
                </div>
              </div>
              <div class="keci-list">
                <ul>
                  <li v-for="(item, index) in moneyList" :key="index" :class="{finish: item.isattend === 't'}">
                    {{item.class_sequence
                    < 10 ? '0' + item.class_sequence : item.class_sequence}} </li> </ul> </div> <el-form :model="ruleForm" :rules="rules" size="mini" ref="ruleForm" label-width="100px" class="info-style">
                      <el-row style="border-top: 1px solid #ccc; padding: 15px 0;">
                        <el-col :span="12">
                          <div>
                            <span>报名金额：</span>￥{{rowInfo.total_price}}</div>
                          <div>
                            <span>实付金额：</span>￥{{rowInfo.real_payment}}</div>
                          <div>
                            <span>优惠方式：</span>{{rowInfo.liberal_type}}</div>
                          <div>
                            <span>课次费：</span>￥{{rowInfo.refund_single_price ? rowInfo.refund_single_price.toFixed(2) : 0}} / 次</div>
                          <div>
                            <span>签到次数：</span>{{rowInfo.checkin_num}} 次</div>
                        </el-col>
                        <el-col :span="12">
                          <div>
                            <span>购买次数：</span>{{rowInfo.buytimes}}</div>
                          <div>
                            <span>退课次数：</span>{{rowInfo.refund_times}}</div>
                          <div>
                            <span>课节退费：</span>￥{{(rowInfo.refund_times * rowInfo.refund_single_price).toFixed(2)}}</div>
                          <div>
                            <span>额外退费：</span>￥{{rowInfo.other_refund_amount}}
                            <span v-show="rowInfo.other_refund_remark" style="font-size: 14px; color: #9c9c9c;"> 备注：{{rowInfo.other_refund_remark}}</span>
                          </div>
                        </el-col>
                      </el-row>
                      <el-row style="border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; padding: 15px 0;">
                        <el-col :span="12">&nbsp;</el-col>
                        <el-col :span="12">
                          <span>退费总额：</span>￥{{rowInfo.apply_refund_amount}}</el-col>
                        <el-col :span="24" style="display: flex; justify-content: space-between; padding-top: 15px;">
                          <div>
                            <span>退费方式：</span>{{rowInfo.refund_pay_type}}</div>
                          <div>
                            <span>姓名：</span>{{rowInfo.bank_card_payee}}</div>
                          <div style="position: relative;">
                            <span>卡号：</span>{{rowInfo.bankcard_no}}
                            <div style="position: absolute; right: 0; top: -35px; width: 200px; text-align: right;">
                              <img v-if="bankCode" :src="'https://apimg.alipay.com/combo.png?d=cashier&t='+bankCode">
                              <span v-else style="color: #ccc; font-size: 13px; line-height: 50px;">无法识别该银行卡</span>
                            </div>
                          </div>

                        </el-col>
                      </el-row>
                      <el-row style="padding-top: 15px;">
                        <el-col :span="24">
                          <div style="display: flex; justify-content: space-between;">
                            <span>退费原因</span>
                            <span>申请人：{{rowInfo.apply_staff_name}} | 时间：{{rowInfo.refund_apply_time}}</span>
                          </div>
                          <div style="padding: 6px 10px; line-height: 26px; height: 26px; border: 1px solid #dcdfe6; color: #6d6c6c">{{rowInfo.refund_reason || '未填写'}}</div>
                        </el-col>
                        <el-col :span="24">
                          <div style="display: flex; justify-content: space-between;">
                            <span>审核</span>
                            <span v-if="isAdmin && rowInfo.refund_status >= '02002'">审核人：{{rowInfo.audit_staff_name}} | 时间：{{rowInfo.audit_time}}</span>
                            <span v-else-if="rowInfo.refund_status >= '02002'">审核人：{{rowInfo.audit_staff_name}} | 时间：{{rowInfo.audit_time}}</span>
                          </div>
                          <div style="display: flex;">
                            <div v-if="isAdmin && rowInfo.refund_status === '02001'" style="display: flex; width: 100%;">
                              <div style="width: 100%;">
                                <el-input v-model="auditOpinion" ref="auditOpinionInp" :disabled="!$store.state.code.includes('030302')" placeholder="必须填写审核意见"></el-input>
                              </div>
                              <div style="margin-left: 10px; width: 225px;" v-if="$store.state.code.includes('030302')">
                                <el-button size="mini" type="primary" @click="refundAudit(true)">通过
                                </el-button>
                                <el-button size="mini" type="primary" @click="refundAudit(false)">不通过
                                </el-button>
                              </div>
                            </div>
                            <div v-else style="width: 100%; padding: 6px 10px; line-height: 26px; height: 26px; border: 1px solid #dcdfe6; color: #6d6c6c">
                              <span :style="{color: rowInfo.audit_result === 'f' ? 'red' : '#67c23a'}">{{rowInfo.audit_result === 'f' ? '审核不通过' : '审核通过'}}</span>：{{rowInfo.audit_remark || '无'}}
                            </div>
                          </div>
                        </el-col>
                        <el-col :span="24" v-if="rowInfo.audit_result === 't'">
                          <div style="display: flex; justify-content: space-between;">
                            <span>打款</span>
                            <span v-if="isAdmin && rowInfo.refund_status === '02003'">打款人：{{rowInfo.refund_staff_name}} | 时间：{{rowInfo.real_refund_time}}</span>
                            <span v-else-if="rowInfo.refund_status === '02003'">打款人：{{rowInfo.audit_staff_name}} | 时间：{{rowInfo.audit_time}}</span>
                          </div>
                          <div v-if="isAdmin && rowInfo.refund_status === '02002'" style="display: flex; width: 100%;">
                            <div style="width: 100%;">
                              <el-input v-model="auditPayNo" placeholder="填写业务流水号" :disabled="!$store.state.code.includes('030303')"></el-input>
                            </div>
                            <div style="margin-left: 10px; width: 60px;" v-if="$store.state.code.includes('030303')">
                              <el-button size="mini" type="primary" @click="refundPay()">打款</el-button>
                            </div>
                          </div>
                          <div v-else style="width: calc(100% - 20px); padding: 6px 10px; line-height: 26px; height: 26px; border: 1px solid #dcdfe6; color: #6d6c6c">
                            {{ rowInfo.refund_status === '02001' ? '等待审核' : rowInfo.refund_status === '02002' ? '已审核，等待打款' : ('流水号 : ' + (rowInfo.refund_tradeno || '无'))}}
                          </div>
                        </el-col>
                      </el-row>
                      </el-form>
              </div>
            </div>
        </transition>
      </div>
    </transition>
  </div>
</template>
<script>
const refundStatusList = [
  {
    value: "02001",
    label: "未审核"
  },
  {
    value: "02002",
    label: "已审核"
  },
  {
    value: "02003",
    label: "已退款"
  }
];
export default {
  data() {
    return {
      loading: true,
      page: 0, //第几页
      limit: 10, //每次查询多少条
      count: 3, //数据的总量
      bankCode: "",
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
      refundStatusList: refundStatusList,
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
      campusId: "", //校区名称
      teacherName: "", //教师姓名
      student_word: "", //搜索学生电话、姓名的值
      student_no: "", //搜索学员编号
      particular_year: "", //年度选择
      selectedLocation: "", //学校选择
      rowInfo: {},
      moneyList: [],
      auditOpinion: "", //退款审核意见
      auditPayNo: "", //退款流水号
      refund_tradeno: "", //退费的业务流水号
      isTurnClassRefund: "", //是否显示跨财务主体转班引起的退费记录
      sumRefund: {},
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
        refund_status: "", //申请退款状态：申请退款，退款成功
        refund_number: "" // 退款流水号
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
        ],
        refund_number: [
          { required: true, message: "请输入退款流水号", trigger: "blur" }
        ]
      },
      objData: {}
    };
  },
  created() {
    const self = this;
    this.Util.queryAreaNav(this, undefined, function() {
      self.getData();
    });
    this.Util.querySysconst(this, "006", this.$store.state.SeasonOptions); //查询季节
    this.Util.querySysconst(this, "009", this.$store.state.PeriodsOptions); //查询期别
    this.Util.querySysconst(this, "101", this.$store.state.GradeOptions); //查询年级
    this.Util.querySysconst(this, "100", this.$store.state.SubjectOptions); //查询科目
    this.Util.querySysconst(this, "002", this.$store.state.CourseTypeOptions); //查询类别/课型
    this.Util.querySysconst(this, "025", this.$store.state.LiberalTypeOptions); //优惠类型
    this.Util.querySysconst(this, "003", this.$store.state.ClassTypeOptions); //查询班型
    this.Util.querySysconst(this, "007", this.$store.state.DepartmentOptions); //查询学部
    this.Util.chargeMode(this); //支付方式
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
    },
    isAdmin() {
      return this.$route.path.includes("queryMoney");
    }
  },
  watch: {
    refund_status() {
      this.getData();
    },
    select_word: function() {
      const self = this;
      self.teacherName = self.select_word;
    },
    student_word: function() {
      console.log(this.student_word);
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
    selectedLocation() {
      if (
        this.selectedLocation.includes(
          JSON.parse(window.sessionStorage.getItem("staff")).staffOrganId
        )
      ) {
        this.campusId = this.selectedLocation[this.selectedLocation.length - 1];
        this.getData("pageClear");
      } else if (this.selectedLocation.length === 0) {
        this.campusId = "";
        this.getData("pageClear");
      }
      /* this.campusId = this.selectedLocation[3];
      this.getData(); */
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
      this.getData("pageClear");
    },
    season: function() {
      // 季节

      this.getData("pageClear");
    },
    periods: function() {
      //期别
      this.getData("pageClear");
    },
    grade: function() {
      //年级
      this.getData("pageClear");
    },
    subject: function() {
      //科目
      this.getData("pageClear");
    },
    projectType: function() {
      //类别/课型不限
      this.getData("pageClear");
    },
    classType: function() {
      //班型
      this.getData("pageClear");
    },
    orderno: function() {
      //业务流水号
      this.getData("pageClear");
    },
    startTime() {
      this.getData("pageClear");
    },
    endTime() {
      this.getData("pageClear");
    },
    isTurnClassRefund() {
      this.getData("pageClear");
    }
  },
  methods: {
    // 退款审核
    refundAudit(res) {
      let inp = this.$refs.auditOpinionInp.$el.children[0];
      if (this.auditOpinion === "") {
        inp.style.borderColor = "#f56c6c";
        this.$message.warning("必须填写审核意见");
        return;
      } else {
        inp.style.borderColor = "#dcdfe6";
      }
      let objData = {
        source: this.GlobalVal.constants.source,
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        order_id: this.rowInfo.order_id,
        audit_result: res,
        audit_remark: this.auditOpinion
      };
      this.$axios
        .post(this.GlobalVal.httpLink.refundAudit, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              this.$message.success("审核成功");
              this.addTeamLayer = false;
              this.getData();
            } else {
              console.error(res);
              this.$message({
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
    // 退款发放
    refundPay() {
      this.$confirm(`确定发放退款?`, "提示", {
        confirmButtonText: "发放",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          let objData = {
            source: this.GlobalVal.constants.source,
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            order_id: this.rowInfo.order_id,
            refund_tradeno: this.refundPayNo || ""
          };
          this.$axios
            .post(this.GlobalVal.httpLink.refundPay, JSON.stringify(objData))
            .then(
              res => {
                if (res.data.code === "10000") {
                  this.$message.success("打款成功");
                  this.addTeamLayer = false;
                  this.getData();
                } else {
                  this.$message({
                    type: "error",
                    message: res.data.errmsg
                  });
                }
                this.refundPayNo = "";
              },
              res => {
                this.$message("请求失败");
              }
            );
        })
        .catch(() => {});
    },
    // 导出查询列表数据
    exportList() {
      this.$exportExcel({
        dataList: this.dataList,
        objData: this.objData,
        httpUrl: "exportRefund",
        title: this.$route.meta.title
      });
    },
    getData(pageClear) {
      const self = this;
      this.objData = {
        source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        page: pageClear ? (this.page = 0) : this.page, //页数
        limit: this.limit, //条目数
        studentId: "", //学生ID
        studentName: this.studentName, //学生姓名
        className: this.class_name, //班级名称
        startTime:
          this.Util.TimeCycle(new Date(this.startTime).getTime(), "ymd") || "", //前段传过来的数据
        endTime:
          this.Util.TimeCycle(new Date(this.endTime).getTime(), "ymd") || "", //同上
        studentMobile: this.studentMobile, //学员电话
        orderno: this.orderno, //业务流水号：就是订单编号
        refundTradeno: this.refund_tradeno, //退款查询的时候业务流水号
        particularYear: null, //年份
        season: this.season, //季节
        periods: this.periods, //期别
        grade: this.grade, //年级
        subject: this.subject, //科目
        projectType: this.projectType, //类别
        classType: this.classType, //班型
        department: this.department, //学部
        campusId: this.campusId || null, //校区名称
        teacherName: this.teacherName, //教师姓名
        refundStatus: this.refund_status, //状态：申请退款，退款成功
        isTurnClassRefund: this.isTurnClassRefund || false
      };
      //搜索框中的选择老师或者是班级搜索
      if (this.selectTeacherOrClass === "class") {
        this.objData.className = this.select_word;
        this.objData.teacherName = "";
      } else {
        this.objData.className = "";
        this.objData.teacherName = this.select_word;
      }
      console.log("查询退款订单发起请求的参数", this.objData);
      this.$axios
        .post(
          this.GlobalVal.httpLink.queryRefundRecord,
          JSON.stringify(this.objData)
        )
        .then(
          res => {
            if (res.data.code === "10000") {
              console.log("查询支付订单列表获取的对象", res.data);

              let refuntStatusLabel = null;
              this.count = res.data.count;
              this.dataList = res.data.refundRecords;
              this.sumRefund = res.data.sumRefund;
              this.dataList = this.dataList.map(item => {
                item.refund_apply_time = this.Util.TimeCycle(
                  new Date(item.refund_apply_time).getTime(),
                  "ymd"
                );
                refuntStatusLabel = refundStatusList.filter(
                  val => item.refund_status === val.value
                )[0];
                item.refund_status_label = refuntStatusLabel
                  ? refuntStatusLabel.label
                  : "状态异常";
                return item;
              });
            } else {
              console.error(res);
              this.$message({
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
    //每页显示数目发生变化
    handleSizeChange(val) {
      this.limit = val;
      this.getData();
    },
    //翻页导航栏
    handleCurrentChange(val) {
      this.page = val - 1;
      this.getData();
    },

    //搜索退款---刷新
    search() {
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
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        source: this.GlobalVal.constants.source,
        refundRecordId: row.id
      };
      console.log("新增/修改退款订单发起请求的参数", objData);
      this.loading = true;
      this.$axios
        .post(
          this.GlobalVal.httpLink.queryRefundDetail,
          JSON.stringify(objData)
        )
        .then(
          res => {
            if (res.data.code === "10000") {
              this.rowInfo = res.data.refundDetail;
              this.rowInfo.apply_refund_amount = this.rowInfo.apply_refund_amount.toFixed(
                2
              );
              let liberal_type = this.$store.state.LiberalTypeOptions.filter(
                item => item.value === this.rowInfo.liberal_type
              )[0];
              this.$axios
                .get(
                  this.GlobalVal.httpLink.getBank +
                    "?cardNo=" +
                    this.rowInfo.bankcard_no
                )
                .then(({ data }) => {
                  this.bankCode = data.data.bankName;
                });
              this.rowInfo.refund_apply_time =
                this.rowInfo.refund_apply_time &&
                this.Util.getDateFormat2(this.rowInfo.refund_apply_time);
              this.rowInfo.audit_time =
                this.rowInfo.audit_time &&
                this.Util.getDateFormat2(this.rowInfo.audit_time);
              this.rowInfo.real_refund_time =
                this.rowInfo.real_refund_time &&
                this.Util.getDateFormat2(this.rowInfo.real_refund_time);
              this.rowInfo.liberal_type = liberal_type && liberal_type.label;
              let payType = this.$store.state.PaymentTypeOptions.filter(
                val => val.code === this.rowInfo.refund_pay_type
              );
              this.rowInfo.refund_pay_type =
                this.rowInfo.refund_pay_type === "01204"
                  ? "银行卡"
                  : payType[0].label;
              // this.rowInfo.refund_status = (function(s) {
              //   switch (s.refund_status) {
              //     case "02001":
              //       return "等待审核";
              //       break;
              //     case "02002":
              //       return "审核成功，等待打款";
              //       break;
              //     case "02003":
              //       return `退款完成 | 流水号：${s.refund_tradeno}`;
              //       break;
              //   }
              // })(this.rowInfo);
              this.moneyList = res.data.stuCheckinItem;
            } else {
            }
            this.loading = false;
          },
          res => {
            this.loading = false;
            self.$message("请求失败");
          }
        );
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
      this.getData("pageClear");
    },
    handleLocationChange() {
      console.log(123);
    }
  }
};
</script>
<style scoped>
.class-query-screen {
  margin-top: -10px;
}
.class-query-screen .el-select {
  width: 200px;
}
.class-query-screen .el-cascader {
  width: 200px;
}
.handle-content {
  margin-top: 10px;
}
.handle-content .el-select {
  width: 200px;
}
.handle-content .el-cascader {
  width: 200px;
}
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
  height: 600px;
  min-height: 600px;
}

.transition-box {
  position: absolute;
  width: 800px;
  height: 800px;
  min-height: 800px;
  margin: auto;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  border-radius: 4px;
  background-color: #ffffff;
  /*  overflow-y: auto; */
  color: #fff;
  padding-top: 60px;
  padding-left: 20px;
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
.keci-list {
  margin-bottom: 20px;
  padding-left: 20px;
}
.keci-list ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
}
.keci-list ul li {
  color: #000;
  width: 45px;
  height: 45px;
  font-size: 18px;
  text-align: center;
  line-height: 45px;
  background: #c9c9c9;
  margin-right: 10px;
  margin-bottom: 10px;
}
.keci-list ul li.finish {
  background: #f2f2f2;
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
.info-style {
  color: #000;
  font-size: 16px;
  line-height: 30px;
  padding: 0 20px;
  margin-right: 20px;
}
.pagination {
  display: flex;
  justify-content: flex-end;
}
.pagination-total {
  line-height: 32px;
}
.pagination-total span {
  font-weight: 600;
  margin-right: 10px;
  font-size: 14px;
}
</style>
