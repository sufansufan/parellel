<template>
  <div class="table">
    <div class="handle-box">
      <div>
        <el-input v-model="select_word" size="mini"  @keyup.enter.native="search" @select="handleSearch" placeholder="输入要搜索学生的姓名/电话">
        </el-input>
      </div>
      <div>
         <el-button type="primary" size="mini" icon="el-icon-search" @click="search">搜索</el-button>
      </div>
      <div>
         <el-button  type="primary" size="mini" icon="el-icon-plus" @click="addStudent">新增</el-button>
      </div>
    </div>

    <el-table :data="dataList" size="mini" stripe style="width: 100%" ref="multipleTable" v-loading="loading">
      <el-table-column label="姓名">
        <template slot-scope="scope">
          <div style="cursor: pointer; color: #3692e8;" @click="goStudentInfo(scope.row)">{{scope.row.student_name}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="student_no" label="学员编号"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="student_grade" label="年级"></el-table-column>
      <el-table-column label="出生日期" prop="student_birthday">
        <!-- <template slot-scope="scope">
                  {{scope.row.student_birthday && new Date(scope.row.student_birthday).toLocaleString('zh')}}
              </template> -->
      </el-table-column>
      <el-table-column prop="studentGreadComputed" label="就读学校"></el-table-column>
      <el-table-column prop="campus_name" label="所属校区"></el-table-column>
      <el-table-column prop="student_mobile_computed" label="联系电话"></el-table-column>
      <el-table-column prop="classnum" label="已结课/在读/已支付/总数" width="200"></el-table-column>
      <el-table-column label="操作" width="130">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleCommand({command:'payment',row:scope.row})">缴费</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :current-page="cur_page + 1" :total="count" :page-size="cur_limit" :page-sizes="[15,20,30,50]">
      </el-pagination>
    </div>
    <!--缴费弹出框-->
    <transition name="el-fade-in-linear">
      <div v-show="paymentLayer" class="bg-layer">
        <transition name="el-zoom-in-center">
          <div v-if="paymentLayer" class="transition-box">
            <div class="title-warp">
              <div class="close-btn" @click="closeCost">
                <i class="el-icon-close"></i>
              </div>
              <h3 class="modify-title">缴费</h3>
            </div>
            <div class="lesson-single">
              <div class="title-warp1">
                <h3 class="title1">收费详情</h3>
                <el-button size="mini" type="primary" @click="applyBtnAdd">新增收费项</el-button>
              </div>
              <div class="table-title-warp">
                <el-row class="lesson-list-warp" style="text-align: center;">
                  <el-col :span="1" class="del-lesson">
                    <div class="grid-content">操作</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content">收费内容
                      <b style="font-size:12px; color:red;">(清空后可选择)</b>
                    </div>
                  </el-col>
                  <el-col :span="2" :offset="2">
                    <div class="grid-content">数量</div>
                  </el-col>
                  <el-col :span="3" :offset="1">
                    <div class="grid-content">产品单价</div>
                  </el-col>
                  <el-col :span="3" :offset="1">
                    <div class="grid-content">总价</div>
                  </el-col>
                  <el-col :span="3">
                    <div class="grid-content">实际收款</div>
                  </el-col>
                </el-row>
              </div>
              <div class="lesson-list" v-for="(item, index) in PaymentClassItems" :key="index" :ref="index">
                <el-row class="lesson-list-warp">
                  <el-col :span="1" class="del-lesson">
                    <div class="grid-content del-choose-lesson" @click="delChooseLesson(index)">
                      <i class="el-icon-error"></i>
                    </div>
                  </el-col>
                  <el-col :span="6" :offset="1">
                    <div class="otherCosts-content">
                      <el-autocomplete popper-class="my-autocomplete" v-model="item.orderName" :fetch-suggestions="querySearch" placeholder="请输入或选择收费内容" @select="handleSelect($event, index)" size="mini" style="width:270px">
                        <template slot-scope="{item}">
                          <div class="name" style="font-size:12px;text-align:left;min-width:320px;"> {{ item.name }}</div>
                        </template>
                      </el-autocomplete>
                      <!--  <el-select v-model="item.orderName" size="mini" placeholder="请选择收费教材">
                                                <el-option
                                                        v-for="item in chargeItems"
                                                        :key="item.code"
                                                        :label="item.name"
                                                        :value="item.name">
                                                </el-option>
                                            </el-select> -->
                    </div>
                  </el-col>
                  <el-col :span="3" :offset="1">
                    <div class="grid-content">
                      <el-input type="number" v-model.number="item.productNumber" size="mini" :min="1" placeholder="请输入"></el-input>
                    </div>
                  </el-col>
                  <el-col :span="3" :offset="1">
                    <div class="grid-content">
                      <el-input type="number" v-model.number="item.singlePrice" size="mini" :min="0" placeholder="请输入"></el-input>
                    </div>
                  </el-col>
                  <el-col :span="3" :offset="1">
                    <div class="grid-content" style="text-align: center;">
                      ￥{{ item.realPrice }}
                    </div>
                  </el-col>
                  <el-col :span="3" :offset="1">
                    <div class="grid-content">
                      <el-input type="number" v-model.number="item.realPayment" ref="realPaymentInp" size="mini" :min="0" placeholder="请填写实际收款金额"></el-input>
                    </div>
                  </el-col>

                </el-row>
              </div>
              <div class="total-amount">
                <el-row class="lesson-list-warp">
                  <el-col :span="3" :offset="17">
                    <div class="grid-content">
                      <b style="font-size:14px;">合计金额</b>
                    </div>
                  </el-col>
                  <el-col :span="3">
                    <div class="grid-content">
                      <b style="font-size:14px;">￥{{applyAll}}</b>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <br>
              <div class="apply-submit">
                <el-row>
                  <el-col :span="2">
                    <div style="line-height: 30px;text-align: right;padding-right: 5px;">收费方式:</div>
                  </el-col>
                  <el-col :span="4">
                    <el-select v-model="applyType" size="mini" placeholder="选择缴费方式">
                      <el-option v-for="(item3, index) in $store.state.PaymentTypeOptions" :key="index" :label="item3.pay_type_name" :value="item3.code"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="2">
                    <div style="line-height: 30px;text-align: right;padding-right: 5px;">业务流水号:</div>
                  </el-col>
                  <el-col :span="5">
                    <el-input v-model="orderNo" size="mini" placeholder="请输入对应订单号"></el-input>
                  </el-col>
                  <el-col :span="2">
                    <div style="line-height: 30px;text-align: right;padding-right: 5px;">收费项目:</div>
                  </el-col>
                  <el-col :span="4">
                    <el-select v-model="chargeItem" size="mini" placeholder="收费项目">
                      <el-option v-for="(item4, index) in $store.state.ChargeProject" :key="index" :label="item4.label" :value="item4.value"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="1">
                    <el-button size="mini" type="primary" @click="applyBtn" style="margin-left: 120px">立即缴费</el-button>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
    <!--退费的弹出框-->
    <transition name="el-fade-in-linear">
      <div v-show="refundLayer" class="bg-layer">
        <transition name="el-zoom-in-center">
          <div v-if="refundLayer" class="transition-box">
            <div class="title-warp">
              <div class="close-btn" @click="refundLayer=!refundLayer">
                <i class="el-icon-close"></i>
              </div>
              <h3 class="modify-title">退费</h3>
            </div>
            <el-form :model="paymentForm" :rules="rules" size="mini" ref="refundForm" label-width="100px" style="overflow-y: scroll;">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="总价">
                    {{rowInfo.total_price}}
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="实付款">
                    {{rowInfo.real_payment}}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="课程总次数">
                    {{rowInfo.total_times}}
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="剩余次数">
                    {{rowInfo.left_times}}
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item label="实际退款金额">
                <div style="color: #ff6942;font-weight: bold;">{{refundForm.refundAmount}}</div>
              </el-form-item>
              <el-form-item label="退款原因">
                <el-input style="width: 100%;" type="textarea" :rows="2" placeholder="请输入内容" v-model="refundForm.refundReason">
                </el-input>
              </el-form-item>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="退款方式">
                    <el-select v-model="refundForm.refundPayType" size="mini" placeholder="请选择" style="width: 100%;">
                      <el-option v-for="item in $store.state.RefundTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="refundForm.refundPayType==='01201'">
                <el-form-item label="微信号">
                  <el-input style="width: 100%;" v-model="refundForm.wechatAcount" placeholder="请填写要退款的微信号"></el-input>
                </el-form-item>
              </el-row>
              <el-row v-if="refundForm.refundPayType==='01202'">
                <el-form-item label="支付宝账号" prop="total_fee">
                  <el-input style="width: 100%;" v-model="refundForm.alipayAcount" placeholder="请填写要退款的支付宝账号"></el-input>
                </el-form-item>
              </el-row>
              <el-row v-if="refundForm.refundPayType==='01205'">
                <el-col :span="12">
                  <el-form-item label="银行卡卡号">
                    <el-input style="width: 100%;" v-model="refundForm.bankCardNo"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="收款人">
                    <el-input style="width: 100%;" v-model="refundForm.bankCardPayee"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="开户行">
                    <el-input style="width: 100%;" v-model="refundForm.openingBank"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item>
                <el-button type="primary" @click="submitRefundForm('refundForm')">退费</el-button>
                <el-button @click="refundLayer=!refundLayer">取消</el-button>
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
      loading: false, // 数据loading
      cur_page: 0, //页码
      cur_limit: 15, //每次请求的数据数
      count: 0, //数据总量
      select_word: "", //搜索的值
      studentMobile: "", //学生电话号码搜索
      studentName: "", //学生名字搜索
      student_id: "", //学生ID
      student_name: "", //学生姓名
      chargeItem: "02602", //收费项目
      rowInfo: {}, //要操作的当前行
      couponOptions: {}, //获取的优惠券信息
      chooseCoupon: {}, //选择的优惠券信息
      showRefundPayType: "",
      role_name: "",
      status: "",
      organ_id2: [], //新增组件内的学校id,
      dataList: [], //请求的list
      roleIds: [],
      location: [], //校区导航
      selectedLocation: [], //选择校区
      chargeModeList: [],
      /*弹出框*/
      paymentLayer: false,
      refundLayer: false,
      addTeamLayer: false, //新增弹出框状态
      changeTeamLayer: false, //修改弹出框状态
      chargeItems: [],
      PaymentClassItems: [
        {
          orderName: "", //教材名称
          productNumber: 1, //产品数量
          realPrice: "0.00", //应收价格
          singlePrice: 0, //单价
          realPayment: 0 //实收款
        }
      ], //要操作的报名订单列表
      applyType: "01201", //缴费方式
      applyAll: "0.00",
      orderNo: "现金", //订单号
      //缴费参数
      paymentForm: {
        realPrice: "", //float,应收款，即总价减去优惠券再减去折扣后的价钱
        realPayment: "", //float，实收款
        discount: "", //float,折扣
        discountReason: "", //打折原因
        couponId: 666, //优惠券ID
        couponName: "优惠券名字", //优惠券名称
        couponAmount: 60, //优惠券金额
        paymentType: "", //支付方式：包括  微信，    支付宝，    现金，POS机，银行卡
        tradeno: "", //业务流水号，POS机号
        serviceCharge: 0, //手续费
        financialIncome: 0, //财务收入
        chargeItem: "" //收费项目
      },
      //退费参数
      refundForm: {
        refundAmount: 0, //float,实际退款金额
        refundReason: "", //退款原因
        refundPayType: "", //退款方式：现金，银行卡，微信，支付宝
        bankCardNo: "", //银行卡卡号，银行卡退款时用
        bankCardPayee: "", //银行卡收款人，银行卡退款时用
        openingBank: "", //开户行,银行卡退款时用
        alipayAcount: "", //支付宝帐号,支付宝支付时用
        wechatAcount: "" //微信号，微信支付时用
      },
      ruleForm: {
        //新增数据
        student_id: null, //此课学生的唯一id int,  --> 如果为新增,此值为空字符串
        student_name: "", //学生姓名
        student_no: null, //学生学号
        student_birthday: null, //学生生日
        student_grade: "", //年级    [10010]
        student_mobile: "", //学生电话   ==>可能为空
        primary_school: "", //小学名字
        middle_school: "", //中学名字
        high_school: "", //高中名字
        enter_score: "", //入学成绩，百分制
        matching_class: "", //班型,(string)  ==> 数组转得字符串 ["10004,10005"]
        home_address: "", //家庭住址
        father_name: "", //父亲名字
        father_mobile: "", //父亲电话号码
        father_sms_enable: false, // 父亲是否接收短信 (true:接收,folse:不接收)
        mother_name: "", //母亲名字
        mother_mobile: "", //母亲电话号码
        mother_sms_enable: false, //母亲是否接受短信   (true:接收,folse:不接收)
        student_status: "", //学生状态: 已注册，已试听，已测试，公益课，已报名，已缴费，已候补，短期班在读，长期班在读，学习完成，申请退费，已退费
        created_at: null //创建时间,时间戳
      },
      //表单校验规则
      rules: {
        student_name: [
          { required: true, message: "请输入学生名称", trigger: "blur" }
        ]
      },
      upload: false
    };
  },
  //实例创建完成后被立即调用
  created() {
    this.Util.querySysconst(this, "026", this.$store.state.ChargeItemOptions); //收费项目
    this.Util.querySysconst(this, "101", this.$store.state.GradeOptions); //查询年级
    this.Util.querySysconst(this, "026", this.$store.state.ChargeProject);
    this.getData();
    this.getChargeItem();
    this.Util.chargeMode(this); //查询支付方式
  },
  mounted() {
    this.restaurants = this.chargeItems;
  },
  watch: {
    PaymentClassItems: {
      handler(val, oldVal, index) {
        val.forEach((item, index) => {
          if (item.orderName === "") {
            this.PaymentClassItems[index].singlePrice = 0.0;
          }
        });
        this.$nextTick().then(() => {
          this.$refs.realPaymentInp &&
            this.$refs.realPaymentInp.forEach((item, index) => {
              let children = item.$el.children[0];
              if (children !== document.activeElement) {
                let n = val[index];
                n.realPrice = (n.productNumber * n.singlePrice).toFixed(2);
                n.realPayment =
                  n.realPayment === "" ? n.realPrice : n.realPayment;
                children.classList.contains("modify") ||
                  (n.realPayment = n.realPrice);
              } else {
                children.classList.add("modify");
              }
            });
        });
        this.applyAll = val
          .reduce(
            (val, nextVal) => {
              return {
                realPayment: +val.realPayment + +nextVal.realPayment
              };
            },
            { realPayment: 0 }
          )
          .realPayment.toFixed(2);
      },
      deep: true
    },

    selectedLocation: function() {
      if (
        this.selectedLocation &&
        this.selectedLocation.length &&
        this.selectedLocation.length > 0
      ) {
        this.organId = this.selectedLocation[this.selectedLocation.length - 1];
      }
    },

    select_word: function() {
      const self = this;
      if (/^\d+$/.test(this.select_word) && this.select_word !== "") {
        self.studentMobile = this.select_word;
        self.studentName = null;
      } else if (this.select_word !== "") {
        self.studentName = this.select_word;
        self.studentMobile = null;
      } else {
        self.studentName = null;
        self.studentMobile = null;
      }
    },
    changeForm2: function() {
      //修改的参数赋值
      this.ruleForm.student_status = this.changeForm2.student_status;
      this.ruleForm.student_id = this.changeForm2.student_id; //此课学生的唯一id int,  --> 如果为新增,此值为空字符串
      this.ruleForm.student_name = this.changeForm2.student_name; //学生姓名
      this.ruleForm.student_no = this.changeForm2.student_no; //学生学号
      this.ruleForm.student_birthday = this.changeForm2.student_birthday; //学生生日
      this.ruleForm.student_grade = this.changeForm2.student_grade; //年级    [10010]
      this.ruleForm.student_mobile = this.changeForm2.student_mobile; //学生电话   ==>可能为空
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
    applyType: function() {
      this.applyType === "01201"
        ? (this.orderNo = "现金")
        : (this.orderNo = "");
    }
  },
  methods: {
    //获取数据
    getData() {
      const self = this;
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        source: "PC", //请求来源
        page: this.cur_page, //页数
        limit: this.cur_limit, //条目数
        studentName: this.studentName, //学生名字
        studentMobile: this.studentMobile //学生电话
      };
      this.loading = true;
      this.$axios
        .post(
          this.GlobalVal.httpLink.queryStudentNameOrMobile,
          JSON.stringify(objData)
        )
        .then(
          res => {
            if (res.data.code === "10000") {
              this.count = res.data.count;
              this.dataList = res.data.students;
              this.dataList.map(item => {
                item.student_grade = this.Util.GetLabelForValue(
                  this.$store.state.GradeOptions,
                  item.student_grade
                );
                item.sex = this.sexShow(item.sex);
                item.student_birthday = this.Util.TimeCycle(
                  new Date(item.student_birthday).getTime(),
                  "ymd"
                );
                item.student_mobile_computed = item.student_mobile || "无";
                /* item.student_mobile_computed = this.Util.formatPhone(
                  item.student_mobile
                ); */
                item.studentGreadComputed =
                  item.high_school || item.middle_school || item.primary_school;
                return item;
              });
            } else {
              this.$message({
                type: "error",
                message: res.data.errmsg
              });
            }
            this.loading = false;
          },
          res => {
            this.loading = false;
            this.$message("请求失败");
          }
        );
    },
    queryNameOrNum(queryString, cb) {
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        page: 1, //页数
        limit: 10, //条目数
        studentName: "", //学生名字
        studentMobile: "" //学生电话
      };
      /[0-9]+/.test(queryString) === true
        ? (objData.studentMobile = queryString)
        : (objData.studentName = queryString);
      this.$axios
        .post(
          this.GlobalVal.httpLink.queryStudentNameOrMobile,
          JSON.stringify(objData)
        )
        .then(
          res => {
            if (res.data.code === "10000") {
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
    },
    handleSearch(item) {},
    goStudentInfo(row) {
      this.$store.commit("setChooseStudentInfo", row);
      this.$router.push({
        path: "/studentInfo/classQuery",
        query: {
          sid: row.student_id
        }
      });
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

    //搜索报名表---刷新
    search() {
      this.cur_page = 0;
      this.getData();
    },

    //转班
    handleTurnClass(index, row) {
      this.$store.commit("setChooseSignuporder", row);
      this.$router.push({
        path: "/turnClass",
        query: {
          order_id: row.order_id,
          total_times: row.total_times,
          left_times: row.left_times,
          index: index
        }
      });
    },
    //转课
    handleTurnObject(index, row) {},
    //请假
    /*handleLeave(index, row) {

            },*/
    //缴费
    applyBtn() {
      let objData = {
        source: this.GlobalVal.constants.source,
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        totalPayment: this.applyAll, //总支付金额
        paymentType: this.applyType, //支付方式：包括  现金，微信，	支付宝，银行卡，POS机_储蓄卡，POS机-信用卡，POS机-微信，POS机-支付宝。不同的支付方式有不同的手续费
        tradeno: this.orderNo, //业务流水号，POS机号
        paymentItems: [], //缴费订单
        studentId: this.student_id, //学生ID
        studentName: this.student_name //学生姓名
      };
      if (this.PaymentClassItems) {
        for (let i = 0; i < this.PaymentClassItems.length; i++) {
          let obj = {
            orderName: "", //订单名称
            singlePrice: 0, //单 价
            productNumber: 0, //产品数量
            realPrice: null, //float,应收款，即总价减去优惠券再减去折扣后的价钱
            realPayment: null, //float，实收款
            discount: 1, //float,折扣
            discountReason: "没有打折", //打折原因
            subtract: 0, //立减金额
            subtractReason: "没有立减", //立减原因
            couponId: null, //优惠券ID
            couponName: "", //优惠券名称
            couponAmount: 0, //优惠券金额
            chargeItem: "" //收费项目：课程，教材，练习册等
          };
          obj.chargeItem = this.chargeItem;
          obj.orderName = this.PaymentClassItems[i].orderName;
          obj.singlePrice = this.PaymentClassItems[i].singlePrice;
          obj.productNumber = this.PaymentClassItems[i].productNumber;
          obj.realPrice = this.PaymentClassItems[i].realPrice;
          obj.realPayment = this.PaymentClassItems[i].realPayment;
          if (
            this.PaymentClassItems[i].realPayment >
            this.PaymentClassItems[i].singlePrice *
              this.PaymentClassItems[i].productNumber
          ) {
            this.$message.warning(
              "第" + (i + 1) + "项实际金额不应大于应收金额"
            );
            return;
          }
          if (this.PaymentClassItems[i].orderName === "") {
            this.$message.error("请填写班级教材");
            return;
          }
          //   if (this.PaymentClassItems[i].gridContentType === "1") {
          //     //打折
          //     obj.discount = this.PaymentClassItems[i].gridContentValue; //float,折扣
          //     obj.discountReason = "填写打折原因功能没做"; //打折原因
          //   } else if (this.PaymentClassItems[i].gridContentType === "2") {
          //     //立减
          //     obj.subtract = this.PaymentClassItems[i].gridContentValue; //立减金额
          //     obj.subtractReason = "填写立减原因功能没做"; //立减原因
          //   } else if (this.PaymentClassItems[i].gridContentType === "3") {
          //     //优惠券
          //     obj.couponId = this.PaymentClassItems[i].coupon.coupon_id; //优惠券ID
          //     obj.couponName = this.PaymentClassItems[i].coupon.coupon_name; //优惠券名称
          //     obj.couponAmount = this.PaymentClassItems[i].coupon_amount; //优惠券金额：
          //   }
          objData.paymentItems.push(obj);
        }
      }
      let loadingInstance = this.$Loading();
      this.$axios
        .post(this.GlobalVal.httpLink.productpayment, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              this.$message({
                type: "success",
                message: "缴费成功!"
              });
              this.paymentItems = [];
              this.orderNo = "";
              this.paymentLayer = false;
              //   this.$router.push({
              //     path: "/student"
              //   });
            } else {
              this.$message({
                type: "error",
                message: res.data.errmsg
              });
            }
            loadingInstance.close();
          },
          res => {
            console.error(res);
            loadingInstance.close();
            this.$message({
              type: "error",
              message: "操作失败"
            });
          }
        );
    },
    /*submitPaymentForm(paymentForm) {
                let objData={
                    staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                    source:this.GlobalVal.constants.source,  //请求方式   Wechat，Android，PC，IOS
                    orderId:this.rowInfo.order_id, //学生报名表id
                    realPrice:parseFloat(this.paymentForm.realPrice),//float,应收款，即总价减去优惠券再减去折扣后的价钱
                    realPayment:parseFloat(this.paymentForm.realPayment), //float，实收款
                    discount:parseFloat(this.paymentForm.discount), //float,折扣
                    discountReason:this.paymentForm.discountReason,//打折原因
                    couponId:this.paymentForm.coupon_id?parseInt(this.paymentForm.coupon_id):666, //优惠券ID
                    couponName:this.paymentForm.couponName,//优惠券名称
                    couponAmount:this.paymentForm.couponAmount,//优惠券金额
                    paymentType:this.paymentForm.paymentType,//支付方式：包括  微信，    支付宝，    现金，POS机，银行卡
                    tradeno:this.paymentForm.tradeno, //业务流水号，POS机号
                    serviceCharge:parseFloat(this.paymentForm.serviceCharge),//手续费
                    financialIncome:parseFloat(this.paymentForm.financialIncome),//财务收入
                    chargeItem:this.paymentForm.chargeItem,//收费项目
                };
                console.log("缴费发起请求的参数",objData);
                this.$axios.post(this.GlobalVal.httpLink.payment,JSON.stringify(objData)).then(
                    res=>{
                        if(res.data.code==="10000"){
                            console.log("缴费获取的对象",res.data);
                            self.$message("缴费成功");
                            self.paymentLayer=false;
                        }else{
                            console.error(res);
                            self.$message({
                                type:"error",
                                message:res.data.errmsg
                            })
                        }
                    },
                    res=>{
                        this.$message("请求失败")
                    }
                )
            },*/
    //优惠券选择
    handlerCouponChange() {
      this.paymentForm.coupon_id = this.chooseCoupon.coupon_id
        ? this.chooseCoupon.coupon_id
        : 666;
      this.paymentForm.couponName = this.chooseCoupon.coupon_name
        ? this.chooseCoupon.coupon_name
        : "优惠券名字";
      this.paymentForm.couponAmount = this.chooseCoupon.coupon_amount
        ? this.chooseCoupon.coupon_amount
        : 50;
    },

    //退费
    submitRefundForm(refundForm) {
      const self = this;
      this.$refs[refundForm].validate(valid => {
        if (valid) {
          let objData = {
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
            orderId: this.rowInfo.order_id, //学生报名表id
            totalPrice: self.rowInfo.total_price, //float，总价
            realPayment: self.rowInfo.real_payment, //float,实付款
            totalTimes: self.rowInfo.total_times, //short, 课程总次数
            leftTimes: self.rowInfo.left_times, //short,剩余次数
            refundAmount: self.refundForm.refundAmount, //float,实际退款金额
            refundReason: self.refundForm.refundReason, //退款原因
            refundPayType: self.refundForm.refundPayType, //退款方式：现金，银行卡，微信，支付宝
            bankCardNo: self.refundForm.bankCardNo, //银行卡卡号，银行卡退款时用
            bankCardPayee: self.refundForm.bankCardPayee, //银行卡收款人，银行卡退款时用
            openingBank: self.refundForm.openingBank, //开户行,银行卡退款时用
            alipayAcount: self.refundForm.alipayAcount, //支付宝帐号,支付宝支付时用
            wechatAcount: self.refundForm.wechatAcount //微信号，微信支付时用
          };
          this.$axios
            .post(this.GlobalVal.httpLink.refund, JSON.stringify(objData))
            .then(
              res => {
                if (res.data.code === "10000") {
                  self.$message("退费成功");
                  self.refundLayer = false;
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
        } else {
          return false;
        }
      });
    },
    //业务办理功能选择
    handleCommand(obj) {
      const self = this;
      if (obj.command === "turnClass") {
        //转班
        this.handleTurnClass(1, obj.row);
      }
      if (obj.command === "turnObject") {
        //调课
        this.handleTurnClass(2, obj.row);
      }
      /*if(obj.command==="leave"){ //请假
                    this.handleLeave(3,obj.row);
                }*/
      if (obj.command === "payment") {
        //选择缴费
        this.paymentLayer = true;
        this.rowInfo = obj.row;
        this.student_id = obj.row.student_id;
        this.student_name = obj.row.student_name;
        //清空参数
        this.couponOptions = [];
        this.paymentForm.realPrice = ""; //float,应收款，即总价减去优惠券再减去折扣后的价钱
        this.paymentForm.realPayment = ""; //float，实收款
        this.paymentForm.discount = ""; //float,折扣
        this.paymentForm.discountReason = ""; //打折原因
        this.paymentForm.couponId = ""; //优惠券ID
        this.paymentForm.couponName = "优惠券名字"; //优惠券名称
        this.paymentForm.couponAmount = ""; //优惠券金额
        this.paymentForm.paymentType = ""; //支付方式：包括  微信，    支付宝，    现金，POS机，银行卡
        this.paymentForm.tradeno = ""; //业务流水号，POS机号
        this.paymentForm.serviceCharge = 0; //手续费
        this.paymentForm.financialIncome = 0; //财务收入
        this.paymentForm.chargeItem = ""; //收费项目

        let objData = {
          staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
          source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
          isvalid: true //优惠券是否有效 true-有效，false-无效
        };
        /*this.$axios.post(this.GlobalVal.httpLink.querySignupOrder,JSON.stringify(objData)).then(
                        res=>{
                            if(res.data.code==="10000"){
                                console.log("查询优惠券获取的对象",res.data);
                                self.count = res.data.count;
                                self.couponOptions=res.data.coupon;
                            }else{
                                console.error(res);
                                self.$message({
                                    type:"error",
                                    message:res.data.errmsg
                                })
                            }
                        },
                        res=>{
                            this.$message("请求失败")
                        }
                    )*/
      }
      if (obj.command === "refund") {
        //退费
        this.refundLayer = true;
        this.rowInfo = obj.row;
        //清空参数

        //实付款-原价/总次数*上了的次数=退款金额。
        this.refundForm.refundAmount = parseFloat(
          obj.row.real_payment -
            (obj.row.total_price / obj.row.total_times) *
              (obj.row.total_times - obj.row.left_times)
        ).toFixed(2);
      }
    },
    /**
     * 自动转换为浮点类的数
     * @param val
     */
    parseFloatRule(val) {
      const self = this;
      if (this.paymentForm[val]) {
        if (this.paymentForm[val].match(/\d+.+/)) {
          this.paymentForm[val] = parseFloat(
            self.paymentForm[val].match(/\d+.+/)[0]
          );
        } else {
          this.paymentForm[val] = 0;
        }
      }
    },
    /**
     * 自动转换为整形的数
     * @param val
     */
    parseIntRule(val) {
      const self = this;
      if (this.paymentForm[val]) {
        if (this.paymentForm[val].match(/\d+.+/)) {
          this.paymentForm[val] = parseInt(
            self.paymentForm[val].match(/\d+.+/)[0]
          );
        } else {
          this.paymentForm[val] = 0;
        }
      }
    },
    //新增
    addStudent() {
      this.$router.push({
        path: "/addStudent"
      });
      /* this.paymentLayer = true;
      this.PaymentClassItems = [
        {
          orderName: "", //教材名称
          productNumber: 1, //产品数量
          realPrice: "0.00", //应收价格
          singlePrice: 0, //单价
          realPayment: 0 //实收款
        }
      ];
      this.studentId = "";
      this.studentName = ""; */
    },
    //新增收费事项
    applyBtnAdd() {
      let obj = {
        orderName: "", //教材名称
        productNumber: 1, //产品数量
        realPrice: 0, //应收价格
        singlePrice: 0, //单价
        realPayment: 0 //实收款
      };
      this.PaymentClassItems.push(obj);
      //   this.$store.commit("setPaymentClassItems", this.PaymentClassItems);
    },
    delChooseLesson(index) {
      let chooseClassObj = this.$store.state.PaymentClassItems;
      chooseClassObj.splice(index, 1);
      this.PaymentClassItems.splice(index, 1);
      this.applyAll = this.PaymentClassItems.reduce(
        (val, nextVal) => {
          return {
            realPayment: +val.realPayment + +nextVal.realPayment
          };
        },
        { realPayment: 0 }
      ).realPayment.toFixed(2);
      this.$store.commit("setPaymentClassItems", chooseClassObj);
    },
    //折扣类型变化
    changeOption(index) {
      if (this.PaymentClassItems[index].gridContentType === "3") {
        this.PaymentClassItems[index].showCoupon = true;
      } else {
        this.PaymentClassItems[index].showCoupon = false;
      }
      if (this.PaymentClassItems[index].gridContentType === "1") {
        this.PaymentClassItems[index].gridContentValue = 1;
      } else if (this.PaymentClassItems[index].gridContentType === "2") {
        this.PaymentClassItems[index].gridContentValue = 0;
      }
      //this.PaymentClassItems[index].real_price = this.PaymentClassItems[index].total_price
      //计算总价钱
      this.applyAll = this.PaymentClassItems.reduce((val, nextVal) => {
        return val.realPrice + nextVal.realPrice;
      });
    },
    //选择的优惠券发生变化
    changeCouponOption(index) {
      //选择的优惠券储存再 this.choosePaymentItems[index].coupon 里
      if (this.PaymentClassItems[index].gridContentType === "3") {
        //优惠券
        this.PaymentClassItems[index].real_price =
          parseFloat(
            this.PaymentClassItems[index].total_price
              ? this.choosePaymentItems[index].total_price
              : 0
          ) -
          parseFloat(
            this.PaymentClassItems[index].coupon.coupon_amount
              ? this.choosePaymentItems[index].coupon.coupon_amount
              : 0
          );
        if (this.PaymentClassItems[index].real_price < 0) {
          this.PaymentClassItems[index].real_price = 0;
        }
      }
      //this.choosePaymentItems[index].real_price = this.choosePaymentItems[index].product_number*this.choosePaymentItems[index].real_price
      //计算总价钱
      //   let applyAll = 0;
      //   for (let i = 0; i < this.PaymentClassItems.length; i++) {
      //     applyAll += parseFloat(this.PaymentClassItems[i].realPrice1);
      //   }
      //   this.applyAll = applyAll;
    },
    //折扣后面的价格输入变化
    changeInput(index) {
      if (!this.PaymentClassItems[index].gridContentType) {
        this.$message("请先选择优惠方式");
        this.PaymentClassItems[index].gridContentValue = 0;
        return;
      } else if (this.PaymentClassItems[index].gridContentType === "1") {
        //打折
        if (
          parseFloat(this.PaymentClassItems[index].gridContentValue) > 1 ||
          parseFloat(this.PaymentClassItems[index].gridContentValue) <= 0
        ) {
          this.$message("打折的优惠参数请输入为0~1之间的数");
          this.PaymentClassItems[index].gridContentValue = 1;
          return;
        } else {
          productNumber;
          this.PaymentClassItems[index].realPayment =
            parseFloat(
              this.PaymentClassItems[index].realPrice
                ? this.PaymentClassItems[index].realPrice
                : 0
            ) *
            parseFloat(
              this.PaymentClassItems[index].gridContentValue
                ? this.PaymentClassItems[index].gridContentValue
                : 0
            );
        }
      } else if (this.PaymentClassItems[index].gridContentType === "2") {
        //立减
        if (
          parseFloat(this.PaymentClassItems[index].gridContentValue) >
          parseFloat(this.PaymentClassItems[index].realPrice)
        ) {
          this.PaymentClassItems[
            index
          ].gridContentValue = this.PaymentClassItems[index].realPrice;
          this.PaymentClassItems[index].realPrice = 0;
        } else {
          this.PaymentClassItems[index].realPayment =
            parseFloat(
              this.PaymentClassItems[index].realPrice
                ? this.PaymentClassItems[index].realPrice
                : 0
            ) -
            parseFloat(
              this.PaymentClassItems[index].gridContentValue
                ? this.PaymentClassItems[index].gridContentValue
                : 0
            );
        }
      }
      //this.PaymentClassItems[index].realPayment=this.PaymentClassItems[index].realPrice.toFixed(2);
      //this.choosePaymentItems[index].real_price=this.choosePaymentItems[index].real_price.toFixed(2);
      //计算总价钱
      let applyAll = 0;
      for (let i = 0; i < this.PaymentClassItems.length; i++) {
        applyAll += parseFloat(this.PaymentClassItems[i].realPrice1);
      }
      this.applyAll = applyAll;
    },
    sexShow: function(value) {
      if (value === true) {
        return "男";
      } else if (value === false) {
        return "女";
      } else {
        return "*";
      }
    },
    closeCost() {
      this.PaymentClassItems = [
        {
          orderName: "", //教材名称
          productNumber: 1, //产品数量
          realPrice: "0.00", //应收价格
          singlePrice: 0, //单价
          realPayment: 0 //实收款
        }
      ];
      this.applyAll = 0.0;
      this.paymentLayer = false;
    },
    getChargeItem() {
      let objData = {
        limit: this.limit,
        page: this.page,
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        source: this.GlobalVal.constants.source,
        name: this.name
      };
      this.loading = true;
      this.$axios
        .post(this.GlobalVal.httpLink.listChargeItem, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              this.count = res.data.data.count;
              this.chargeItems = res.data.data.chargeItems;
              this.restaurants = this.chargeItems;
            } else {
              console.error(res);
              this.$message({
                type: "error",
                message: res.data.errmsg
              });
            }
            this.loading = false;
          },
          res => {
            this.$message.error("请求失败");
            this.loading = false;
          }
        );
    },
    querySearch(queryString, cb) {
      let restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return restaurant.name.includes(queryString);
      };
    },
    handleSelect(val, index) {
      this.PaymentClassItems[index].orderName = val.name;
      this.PaymentClassItems[index].singlePrice = val.price;
    }
  }
};
</script>

<style scoped>
.table-title-warp {
  margin-top: 30px;
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
.transition-box {
  position: absolute;
  width: 1100px;
  height: 600px;
  margin: auto;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  border-radius: 4px;
  background-color: #ffffff;
  color: #333333;
  padding-top: 60px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  box-sizing: border-box;
  z-index: 10;
}
.title-warp {
  position: absolute;
  width: 1100px;
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
.search-warp {
  display: inline-block;
  float: right;
}
.search-warp {
  display: inline-block;
  float: right;
}
.handle-box {
  margin-bottom: 20px;
  display: flex;
}
.handle-box > div {
  margin-right: 10px;
}
.handle-box > div:last-child{
  display: flex;
  flex: 1;
  justify-content: flex-end;
  margin-right: 20px;
}
.handle-input {
  width: 200px;
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
/*缴费样式*/
.lesson-single {
  padding: 20px;
  background: #fff;
  height: 490px;
  overflow-y: auto;
  margin-right: -20px;
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
  text-align: center;
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
.more {
  color: #3692e8;
  border: none;
  background: none;
}
</style>
<style>
.lesson-list .el-input.is-disabled .el-input__inner {
  color: #1d1d1f;
}
.my-autocomplete li {
  width: 360px;
}
</style>
