<template>
  <el-dialog :title="details && details.class_name" :visible.sync="centerDialogVisible" width="96%" top="70px" :close-on-click-modal="false" center>
    <div class="dialog-content">
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="info" class="inp-box">
          <!-- 基本信息 -->
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <div class="sub-title">年份</div>
                <el-input :value="classInfo.particular_year" disabled></el-input>
              </div>
            </el-col>
            <el-col :span="8">
              <el-col :span="12" style="padding-left: 0;">
                <div class="grid-content bg-purple">
                  <div class="sub-title">季度</div>
                  <el-input :value="classInfo.season" disabled></el-input>
                </div>
              </el-col>
              <el-col :span="12" style="padding-right: 0;">
                <div class="grid-content bg-purple">
                  <div class="sub-title">期别</div>
                  <el-input :value="classInfo.periods" disabled></el-input>
                </div>
              </el-col>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <div class="sub-title">科目</div>
                <el-input :value="classInfo.subject" disabled></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <div class="sub-title">类别</div>
                <el-input :value="classInfo.project_type" disabled></el-input>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <div class="sub-title">年级</div>
                <el-input :value="classInfo.grade" disabled></el-input>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <div class="sub-title">班型</div>
                <el-input :value="classInfo.class_type" disabled></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="16">
              <div class="grid-content bg-purple">
                <div class="sub-title">班级名称</div>
                <el-input :value="classInfo.class_name" disabled></el-input>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <div class="sub-title">分数线</div>
                <el-input :value="classInfo.min_entry_score" disabled></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <div class="sub-title">学费</div>
                <el-input :value="classInfo.total_price" disabled></el-input>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <div class="sub-title">上课课次</div>
                <el-input :value="classInfo.total_times" disabled></el-input>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <div class="sub-title">重复周期</div>
                <el-input :value="classInfo.class_week_day" disabled></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <div class="grid-content bg-purple">
                <div class="sub-title">校区</div>
                <el-input :value="classInfo.campus_name" disabled></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <div class="sub-title">招生情况</div>
                <el-input :value="classInfo.signup_number + '/' + classInfo.max_students_no" disabled></el-input>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <div class="sub-title">缴费人数</div>
                <el-input :value="classInfo.payment_number" disabled></el-input>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <div class="sub-title">剩余</div>
                <el-input :value="classInfo.remain_number" disabled></el-input>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <div class="sub-title">候补人数</div>
                <el-input :value="classInfo.waiting_number" disabled></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <div class="sub-title">上课老师</div>
                <b style="font-size: 22px; padding: 15px; display: block;">{{ classInfo.teacher_name }}</b>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <div class="sub-title">转班条件</div>
                <el-radio-group v-model="classInfo.turn_class_condition">
                  <el-radio label="允许跨校转班" disabled style="display: block; margin-top: 10px;">允许跨校转班</el-radio>
                  <el-radio label="允许同校转班" disabled style="display: block; margin: 10px 0 10px 0;">允许同校转班</el-radio>
                  <el-radio label="不允许转班" disabled style="display: block; margin: 0;">不允许转班</el-radio>
                </el-radio-group>
              </div>
            </el-col>
            <el-col :span="10">
              <div class="grid-content bg-purple">
                <div class="sub-title">是否代为收费</div>
                <el-radio-group v-model="classInfo.charge_generation">
                  <el-radio :label="true" disabled>是</el-radio>
                  <el-radio :label="false" disabled>否</el-radio>
                </el-radio-group>
              </div>
              <div class="grid-content bg-purple">
                <div class="sub-title">其他选项</div>
                <el-checkbox label="APP显示" v-model="classInfo.web_signup_enable" disabled></el-checkbox>
                <el-checkbox label="热门班级" v-model="classInfo.hot_recommend" disabled></el-checkbox>
                <el-checkbox label="仅后台可见" v-model="classInfo.only_show_in_background" disabled></el-checkbox>
                <el-checkbox label="允许旁听" v-model="classInfo.attend_enable" disabled></el-checkbox>
                <el-checkbox label="要入学测试" v-model="classInfo.require_entrytest" disabled></el-checkbox>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="课次日期&签到" name="date">
          <div class="class-data-signin">
            <div style="width: 400px;">
              <p>课节安排</p>
              <el-table :data="classList" style="width: 100%" @row-click="handleClassClick" highlight-current-row v-loading="kjap">
                <el-table-column prop="class_sequence" width="20px">
                </el-table-column>
                <el-table-column prop="classdate">
                </el-table-column>
                <el-table-column>
                  <template slot-scope="scope">
                    {{scope.row.start_time + '~' + scope.row.end_time}}
                  </template>
                </el-table-column>
                <el-table-column prop="teacher_name">
                </el-table-column>
                <el-table-column prop="classroom_name">
                </el-table-column>
                <el-table-column width="50px">
                  <template slot-scope="scope">
                    {{scope.row.actual_student_number + '/' + scope.row.pre_student_number}}
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div style="max-width: 300px; min-width: 300px;">
              <p>学生签到情况</p>
              <el-table :data="attendList" style="width: 100%" v-loading="xsqd">
                <el-table-column width="100" align="left">
                  <template slot-scope="scope">
                    <el-popover placement="top-start" :title="scope.row.student_name" width="200" trigger="hover">
                      <p>常用电话：{{scope.row.student_mobile}}</p>
                      <p>父亲电话：{{scope.row.father_mobile}}</p>
                      <p>母亲电话：{{scope.row.mother_mobile}}</p>
                      <el-button slot="reference" type="text" size="mini" style="height: 28px;">{{scope.row.student_name}}</el-button>
                    </el-popover>
                  </template>
                </el-table-column>
                <el-table-column>
                  <template slot-scope="scope">
                    <div class="checkin-list">
                      <span :class="{checkin: scope.row.roll_call_status === '01702'}">签到</span>
                      <span :class="{checkin: scope.row.roll_call_status === '01703'}">迟到</span>
                      <span :class="{checkin: scope.row.roll_call_status === '01704'}">请假</span>
                      <span :class="{checkin: scope.row.roll_call_status === '01701'}">旷课</span>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div>
              <p>补签情况</p>
              <el-table :data="attendList" style="width: 100%" v-loading="xsqd">
                <el-table-column>
                  <template slot-scope="scope">
                    <div v-if="scope.row.is_mend_register" class="checkin-list" style="justify-content: flex-start;">
                      <span class="checkin">补签</span>
                      <div class="supplement">
                        <p>{{scope.row.mend_register_time && new Date(scope.row.mend_register_time).toLocaleString('zh')}}</p>
                        <p>{{scope.row.mend_register_remark}}</p>
                      </div>
                    </div>
                    <div v-else style="height: 28px;"></div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="学生列表" name="list" style="position: relative; width: 100%;">
          <!-- 学生列表 -->
          <div style="width: 100%;">
            <el-table size="mini" :data="tableData" height="550" border style="width: 100%" stripe>
              <el-table-column prop="student_name" label="学员姓名">
              </el-table-column>
              <el-table-column prop="student_no" label="学员编码">
              </el-table-column>
              <el-table-column prop="student_mobile" label="联系电话">
              </el-table-column>
              <el-table-column prop="campus_name" label="校区">
              </el-table-column>
              <el-table-column label="就读学校">
                <template slot-scope="scope">
                  <span>{{scope.row.publicSchool || '无'}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="paystatus" label="缴费状态">
              </el-table-column>
              <el-table-column prop="signup_time" label="报名时间">
              </el-table-column>
              <el-table-column prop="signup_staff_name" label="报名操作人">
              </el-table-column>
              <el-table-column prop="pay_time" label="缴费时间">
              </el-table-column>
              <el-table-column prop="pay_staff_name" label="缴费操作人">
              </el-table-column>
            </el-table>
          </div>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" style="margin-top: 20px; text-align: center;" background layout="total" :total="count">
          </el-pagination>
          <div style="position: absolute; right: 0; bottom: 0;">
            <el-button @click="exportClassList" type="primary" v-show="$store.state.code.includes('010302')">导出学生列表</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="变动记录" name="record">
          <div style="height: 600px; overflow-y: auto; padding: 10px;">
            <el-row :gutter="20" v-for="(item, index) in logsRecord" :key="index" id="record">
              <el-col :span="20">[{{item.optime}}] [{{item.staff_name}}]
                <span style="color: #ff0000">{{item.type}}</span> {{item.remark}}</el-col>
            </el-row>
            <!--  <el-button type="primary" size="mini" @click="download()">导出</el-button> -->
          </div>
        </el-tab-pane>
        <el-tab-pane label="收入情况" name="income">
          <el-table size="mini" :data="studentList" height="650" border style="width: 100%" v-loading="incomeLoading" stripe>
            <el-table-column type="index" label="序号" width="50" fixed>
            </el-table-column>
            <el-table-column prop="order_id" label="订单ID" fixed>
            </el-table-column>
            <el-table-column prop="student_name" label="学员姓名" fixed>
            </el-table-column>
            <el-table-column v-for="(item, index) in incomeList" :key="item.id" :render-header="(h, r) => renderTitle(h, r, item)">
              <template slot-scope="scope">
                <div class="student-list">
                  <div class="cont" v-if="scope.row.studentAttendClasss[index] && (scope.row.studentAttendClasss[index].roll_call_status || scope.row.studentAttendClasss[index].student_attend_class_type)">
                    <p v-if="scope.row.studentAttendClasss[index].roll_call_status">
                      <el-popover :disabled="!scope.row.studentAttendClasss[index].mend" placement="top-start" width="200" trigger="hover">
                        <p>
                          <b>补签时间：</b>{{scope.row.studentAttendClasss[index].mend_register_time}}</p>
                        <p>
                          <b>补签备注：</b>{{scope.row.studentAttendClasss[index].mend_register_remark}}</p>
                        <div slot="reference">
                          <el-tag :type="scope.row.studentAttendClasss[index].roll_call_status | tagStatus" disable-transitions>{{ scope.row.studentAttendClasss[index].roll_call_status }}
                            <b style="color: #ff00e9;">{{scope.row.studentAttendClasss[index].mend}}</b>
                          </el-tag>
                        </div>
                      </el-popover>
                    </p>
                    <p v-else-if="scope.row.studentAttendClasss[index].student_attend_class_type !== '01808' && scope.row.studentAttendClasss[index].student_attend_class_type !== '01803'">
                      <el-tag type="info" disable-transitions>未签到</el-tag>
                    </p>
                    <p v-show="scope.row.studentAttendClasss[index].student_attend_class_type">
                      <el-tag :type="scope.row.studentAttendClasss[index].student_attend_class_type | filterStatus | tagStatus" disable-transitions>{{ scope.row.studentAttendClasss[index].student_attend_class_type | filterStatus }}</el-tag>
                    </p>
                  </div>
                  <div style="color: #ccc; font-size: 12px;">N/A</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="支付状态" fixed="right">
              <template slot-scope="scope">
                <div class="student-list">
                  {{ scope.row.paystatus | fixStatus($store.state.payStatusList) }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="订单状态" fixed="right">
              <template slot-scope="scope">
                <div class="student-list">
                  <el-tag :type="scope.row.orderstatus | tagStatus" disable-transitions>{{ scope.row.orderstatus }}</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="single_price" label="课次单价" fixed="right">
            </el-table-column>
            <el-table-column prop="real_payment" label="实付金额" fixed="right">
            </el-table-column>
            <el-table-column prop="confirm_amount" label="确认金额" fixed="right">
            </el-table-column>
            <el-table-column prop="left_amount" label="剩余金额" fixed="right">
            </el-table-column>
            <el-table-column prop="refund_amount" label="实退金额" fixed="right">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ["details"],
  data() {
    return {
      cur_page: 0, //页码
      cur_limit: 10, //每次请求的数据数
      count: 0, //数据总量
      centerDialogVisible: false, // 是否显示
      activeName: "info", // 初始显示的tab 和name对应
      classInfo: {},
      tableData: [],
      changeClass: "",
      isCharge: "",
      otherOptions: "",
      logsRecord: [],
      classList: [],
      attendList: [],
      incomeLoading: true,
      incomeList: [],
      studentList: [],
      kjap: true,
      xsqd: false,
      payStatusList: [
        {
          value: "01301",
          label: "未支付"
        },
        {
          value: "01302",
          label: "已支付"
        },
        {
          value: "01303",
          label: "申请退款"
        },
        {
          value: "01304",
          label: "退款成功"
        }
      ]
    };
  },
  created() {
    this.Util.querySysconst(this, "006", this.$store.state.SeasonOptions); //查询季节
    this.Util.querySysconst(this, "009", this.$store.state.PeriodsOptions); //查询期别
    this.Util.querySysconst(this, "101", this.$store.state.GradeOptions); //查询年级
    this.Util.querySysconst(this, "100", this.$store.state.SubjectOptions); //查询科目
    this.Util.querySysconst(this, "002", this.$store.state.CourseTypeOptions); //查询类别/课型
    this.Util.querySysconst(this, "003", this.$store.state.ClassTypeOptions); //查询班型
    this.Util.querySysconst(this, "001", this.$store.state.ProjectTypeOptions); //项目类型
    this.Util.querySysconst(
      this,
      "024",
      this.$store.state.TurnClassConditionOptions
    ); //转班条件
  },
  watch: {
    centerDialogVisible(p) {
      if (p) {
        this.getData();
        this.getAttendClass();
      }
    }
  },
  filters: {
    tagStatus(val) {
      switch (val) {
        case "签到":
        case "正常上课":
        case "在读":
        case "退费成功":
        case "支付完成":
          return "success";
          break;
        case "转班转入":
        case "调课调入":
          return "";
          break;
        case "迟到":
        case "转班转出":
        case "调课调出":
        case "申请退费":
          return "warning";
          break;
        case "请假":
          return "info";
          break;
        case "旷课":
        case "退款":
          return "danger";
          break;
        default:
          return "info";
      }
    },
    filterStatus(val) {
      const status = [
        { "01801": "正常上课" },
        { "01802": "请假" },
        { "01803": "转班转出" },
        { "01804": "转班转入" },
        { "01805": "调课调出" },
        { "01806": "调课调入" },
        { "01807": "试听" },
        { "01808": "退款" },
        { "01809": "取消调课" },
        { "01810": "取消退款" },
        { "01811": "未购买" }
      ];
      return val && status.find(item => Object.keys(item)[0] === val)[val];
    },
    fixStatus(code, status) {
      return status.find(item => item.value === code).label;
    }
  },
  methods: {
    /*  download(){
        let record = document.getElementById('record');
    }, */
    renderTitle(h, r, item) {
      return h("span", [
        h("span", "课次" + item.class_sequence),
        h("p", { class: "titDate" }, item.classdate)
      ]);
    },
    // 导出学生列表
    exportClassList() {
      if (!this.tableData.length) {
        this.$message.warning("未查询出数据，无法导出");
        return false;
      }
      let dataLink = this.GlobalVal.httpLink.exportStudent + "?",
        objData = {
          source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
          staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
          id: this.details.class_id
        };
      for (let i in objData) {
        objData[i] &&
          i !== "page" &&
          i !== "limit" &&
          (dataLink += i + "=" + objData[i] + "&");
      }
      window.open(dataLink);
    },
    // 获取班级详情
    getData() {
      let objData = {
        source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        id: this.details.class_id
      };
      this.$axios
        .post(this.GlobalVal.httpLink.getClassById, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              console.log("查询班级详情获取的对象", res.data);
              this.classInfo = res.data.pxxclass;
              let periods = this.$store.state.PeriodsOptions.filter(
                val => val.value === this.classInfo.periods
              );
              this.classInfo.periods = periods[0] && periods[0].label;
              let grade = this.$store.state.GradeOptions.filter(
                val => val.value === this.classInfo.grade
              );
              this.classInfo.grade = grade[0] && grade[0].label;
              let subject = this.$store.state.SubjectOptions.filter(
                val => val.value === this.classInfo.subject
              );
              this.classInfo.subject = subject[0] && subject[0].label;
              let class_type = this.$store.state.ClassTypeOptions.filter(
                val => val.value === this.classInfo.class_type
              );
              this.classInfo.class_type = class_type[0] && class_type[0].label;
              let season = this.$store.state.SeasonOptions.filter(
                val => val.value === this.classInfo.season
              );
              this.classInfo.season = season[0] && season[0].label;
              let project_type = this.$store.state.ProjectTypeOptions.filter(
                val => val.value === this.classInfo.project_type
              );
              this.classInfo.project_type =
                project_type[0] && project_type[0].label;
              let turn_class_condition = this.$store.state.TurnClassConditionOptions.filter(
                val => val.value === this.classInfo.turn_class_condition
              );
              this.classInfo.turn_class_condition =
                turn_class_condition[0] && turn_class_condition[0].label;
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
      this.count = 0;
      this.tableData = [];
      this.$axios
        .post(
          this.GlobalVal.httpLink.queryClassStudent,
          JSON.stringify(objData)
        )
        .then(
          res => {
            if (res.data.code === "10000") {
              this.count = res.data.students.length;
              this.tableData = res.data.students.map(item => {
                item.pay_time = this.Util.TimeCycle(
                  new Date(item.pay_time).getTime(),
                  "ymd"
                );
                item.signup_time = this.Util.TimeCycle(
                  new Date(item.signup_time).getTime(),
                  "ymd"
                );
                item.paystatus = this.payStatusList.filter(
                  val => val.value === item.paystatus
                )[0].label;
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
      this.$axios
        .post(
          this.GlobalVal.httpLink.getClassChangeHistory,
          JSON.stringify(objData)
        )
        .then(
          res => {
            if (res.data.code === "10000") {
              const self = this;
              this.logsRecord = res.data.logs;
              this.logsRecord = this.logsRecord.map(item => {
                item.optime = self.Util.TimeCycle(item.optime);
                item.updated_at = self.Util.TimeCycle(item.updated_at);
                return item;
              });
            } else {
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
      this.incomeLoading = true;
      this.$axios
        .post(
          this.GlobalVal.httpLink.listIncomeSituationByClassId,
          JSON.stringify(objData)
        )
        .then(res => {
          this.incomeLoading = false;
          if (res.data.code === "10000") {
            this.incomeList = res.data.data.attendClasses;
            const totalLen = this.incomeList.length;
            this.studentList = res.data.data.students.map(item => {
              item.orderstatus &&
                (item.orderstatus = this.$store.state.orderStatus.find(
                  v => v.value === item.orderstatus
                ).label);
              item.studentAttendClasss.map(item => {
                item.mend_register_time &&
                  (item.mend_register_time = this.Util.TimeCycle(
                    item.mend_register_time,
                    "ymd hh-mm-ss"
                  ));
                if (item.roll_call_status) {
                  let status = item.roll_call_status;
                  item.roll_call_status = this.$store.state.rollCallStatus.find(
                    v => v.value === item.roll_call_status
                  ).label;
                  if (
                    (status === "01701" || status === "01704") &&
                    item.is_mend_register
                  ) {
                    item.mend = "补签";
                  } else {
                    item.mend = "";
                  }
                }
                return item;
              });
              return item;
            });
            this.studentList = this.studentList.map(item => {
              let rowLen = item.studentAttendClasss.length;
              if (rowLen && totalLen - rowLen !== 0) {
                item.studentAttendClasss = [
                  ...new Array(totalLen - rowLen).fill({
                    roll_call_status: null,
                    student_attend_class_type: null
                  }),
                  ...item.studentAttendClasss
                ];
              }
              return item;
            });
          }
        })
        .catch(() => {
          this.incomeLoading = false;
        });
    },
    handleClassClick(row) {
      this.xsqd = true;
      this.$axios
        .post(
          this.GlobalVal.httpLink.getClassCheckinInfo,
          JSON.stringify({
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId, //用户id
            source: this.GlobalVal.constants.source,
            attendClassId: row.id //班级上课表id
          })
        )
        .then(
          res => {
            if (res.data.code === "10000") {
              console.log("查询班级学生列表获取的对象", res.data);
              this.attendList = res.data.stuAttendClasses;
            } else {
              console.error(res);
              this.$message({
                type: "error",
                message: res.data.errmsg
              });
            }
            this.xsqd = false;
          },
          res => {
            this.xsqd = false;
            this.$message("请求失败");
          }
        );
    },
    getAttendClass() {
      this.kjap = true;
      this.attendList = [];
      let objData = {
        source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        class_id: this.details.class_id
      };
      this.$axios
        .post(this.GlobalVal.httpLink.getAttendClass, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              this.classList = res.data.classes;
              console.log(this.classList)
            } else {
              console.error(res);
              this.$message({
                type: "error",
                message: res.data.errmsg
              });
            }
            this.kjap = false;
          },
          res => {
            this.kjap = false;
            this.$message("请求失败");
          }
        );
    },
    // 翻页导航栏
    handleCurrentChange(val) {
      console.log(val);
      this.cur_page = val - 1;
      //this.getData();
    },

    // 每页显示数目发生变化
    handleSizeChange(val) {
      console.log(val);
      this.cur_limit = val;
      //this.getData();
    }
  }
};
</script>
<style>
.class-data-signin {
  display: flex;
}
.class-data-signin .has-gutter {
  display: none;
}
.class-data-signin .cell {
  padding: 0;
}
.class-data-signin > div {
  flex: 1;
  margin-right: 10px;
}
.class-data-signin > div:last-child {
  margin: 0;
}
.checkin-list {
  display: flex;
  justify-content: flex-end;
}
.checkin-list > span {
  width: 50px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  margin-right: 5px;
  background: #f2f2f2;
  display: block;
}
.checkin-list > span.checkin {
  background: #409eff;
  color: #fff;
}
.checkin-list .supplement {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.checkin-list .supplement > p {
  font-size: 12px;
  line-height: 13px;
  text-align: left;
  color: #a09b9b;
}
.checkin-list .supplement > p:last-child {
  font-size: 14px;
  line-height: 14px;
  color: #444;
}
.class-data-signin > div > p {
  line-height: 38px;
  padding: 0 10px;
  margin-bottom: 10px;
  font-size: 16px;
  color: #444;
  background: #f2f2f2;
}
.dialog-content .el-table td,
.dialog-content .el-table th {
  padding: 5px 0 !important;
}
.dialog-content .dialog-content {
  min-height: 650px;
}
.dialog-content .grid-content .sub-title {
  padding: 10px 0 3px;
}
.dialog-content .el-input.is-disabled .el-input__inner {
  color: #444 !important;
}
.dialog-content .inp-box .el-row .grid-content {
  height: auto;
}
.dialog-content .inp-box .el-row .is-checked .el-radio__label,
.dialog-content .inp-box .el-row .is-checked .el-checkbox__label {
  color: #409eff !important;
}
.dialog-content .inp-box .el-row .is-checked .el-radio__inner,
.dialog-content .inp-box .el-row .is-checked .el-checkbox__inner {
  border-color: #409eff;
  background: #409eff;
}
.dialog-content .inp-box .el-row .is-checked .el-radio__inner::after {
  background: #fff;
}
.dialog-content .inp-box .el-row .is-checked .el-checkbox__inner::after {
  border-color: #fff;
}
.el-dialog__wrapper {
  overflow: none !important;
}
.student-list > div:nth-last-child(2) + div {
  display: none;
}
.student-list > .cont + .cont {
  border-top: 1px dotted #000;
  padding-top: 5px;
  margin-top: 5px;
}
.student-list .el-tag {
  height: 21px;
  line-height: 20px;
  border-radius: 5px;
}
.student-list .el-tag:hover {
  background: #fff;
}
.titDate {
  font-size: 12px;
  height: 14px;
  line-height: 14px;
  color: #6f6666;
  transform: scale(0.9);
  width: max-content;
  margin: 0 auto;
}
</style>
