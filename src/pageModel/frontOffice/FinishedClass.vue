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
  width: 1300px;
  height: 800px;
  margin: auto;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  border-radius: 4px;
  background-color: #ffffff;
  color: #fff;
  padding-top: 60px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  box-sizing: border-box;
  z-index: 10;
}
.classTable {
  height: 745px;
  width: 100%;
  overflow-y: auto;
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
  width: 400px;
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
  <div class="class-query table2">
    <el-table size="mini" :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="campus_name" label="校区"></el-table-column>
      <el-table-column prop="class_name" label="班级名称" width="300"></el-table-column>
      <el-table-column prop="orderno" label="听课证编号" width="160"></el-table-column>
      <el-table-column prop="subject" label="科目"></el-table-column>
      <el-table-column prop="teacher_name" label="老师"></el-table-column>
      <el-table-column prop="class_week_day" label="重复周期"></el-table-column>
      <el-table-column prop="time_name" label="上课时段" width="100"></el-table-column>
      <el-table-column prop="classroom_name" label="教室"></el-table-column>
      <el-table-column prop="start_date" label="开课日期" width="100"></el-table-column>
      <el-table-column prop="end_date" label="结课日期" width="100"></el-table-column>
      <el-table-column prop="alreadyTime" label="已上课次"></el-table-column>
      <el-table-column prop="total_price" label="总金额"></el-table-column>
      <el-table-column prop="real_payment" label="实付金额"></el-table-column>
      <el-table-column prop="orderstatus" label="状态"></el-table-column>
      <el-table-column label="操作" width="250" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleApply(scope.$index, scope.row)" :disabled="scope.row.orderstatus === '转班转出'">转班</el-button>
          <!-- <el-button size="mini" type="primary" @click="handlemoney(scope.$index, scope.row)" :disabled="scope.row.orderstatus === '转班转出'">退费</el-button> -->
          <el-button size="mini" type="primary" @click="printEdit(scope.row)">打印听课证</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :total="count" :page-size="cur_limit" :page-sizes="[10,20,30,50]">
      </el-pagination>
    </div>
    <!-- 转班 -->
    <transition name="el-fade-in-linear">
      <div v-show="classTimeLayer" class="bg-layer">
        <transition name="el-zoom-in-center">
          <div v-if="classTimeLayer" class="transition-box">
            <div class="title-warp">
              <div class="close-btn" @click="classTimeLayer = !classTimeLayer">
                <i class="el-icon-close"></i>
              </div>
              <h3 class="modify-title">转班</h3>
              <div class="classTable">
                <v-turnclass :orderId="orderId" dType="zb" :attendclassList="attendclassList"></v-turnclass>
                <div style="float: right;margin-bottom: 20px;margin-right: 10px">
                  <el-button type="primary" @click="classTimeLayer=!classTimeLayer" style="width: 80px" size="mini">取消</el-button>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
    <Dialog title="退费" ref="dialog" bodyWid="40%" bodyTop="100px" titbg>
      <Refund-money :rowInfo="rowInfo" :getRefundInfoRes="getRefundInfoRes" @dialogVisible="$refs.dialog.dialogVisible=false" @getData="getData"></Refund-money>
    </Dialog>
    <Dialog title="打印听课证" ref="print" titbg bodyWid="60%">
      <Print-class-card :printInfo="printInfo" @cencelPrint='$refs.print.dialogVisible = false'></Print-class-card>
    </Dialog>
  </div>
</template>
<script>
import VTurnclass from "./../frontDesk/TurnClass.vue";
import Dialog from "../../pageModel/common/Dialog.vue";
import RefundMoney from "./RefundMoney.vue";
import PrintClassCard from "./printClassCard.vue";
export default {
  components: {
    VTurnclass,
    Dialog,
    RefundMoney,
    PrintClassCard
  },
  data() {
    return {
      cur_page: 0, //页码
      cur_limit: 10, //每次请求的数据数
      count: 0, //数据总量
      //搜索的量
      organId: "", // 机构id
      particular_year: "", //int 年份
      season: "", // 季节：[暑假，秋季，寒假，春季]等
      periods: "", //期别
      grade: "", //适用年级，[一年级，二年级]等
      subject: "", //科目，[数学，物理]等
      projectType: "", //项目类型 [长期，短期，公益，考试]等
      classType: "", //班型，[超常，培优]等
      teacherName: "", //老师名字
      className: "", //班级名称
      department: "", //学部，小学，初中，高中
      //变量
      dataList: [], //请求的list
      multipleSelection: [], //选中行的集合
      classTimeLayer: false,
      rowInfo: {},
      getRefundInfoRes: {},
      printInfo: {}
    };
  },
  //实例创建完成后被立即调用
  created() {
    this.organId = this.$store.state.organId;
    this.getData();
  },

  //计算属性
  computed: {
    //相当于过滤器
    data() {
      if (!this.dataList) {
        return [];
      }
      return this.dataList.map(d => {
        d.alreadyTime = d.total_times - d.left_times;
        d.start_date = this.Util.TimeCycle(d.start_date, "ymd");
        d.end_date = this.Util.TimeCycle(d.end_date, "ymd");
        d.orderstatus = this.Util.GetLabelForValue(
          this.$store.state.orderStatus,
          d.orderstatus
        );
        d.subject = this.Util.GetLabelForValue(
          this.$store.state.SubjectOptions,
          d.subject
        );
        return d;
      });
    }
  },
  methods: {
    //获取数据
    getData() {
      let objData = {
        source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        page: this.cur_page, //页数
        limit: this.cur_limit, //条目数
        studentId: this.$store.state.chooseStudentInfo.student_id, //学生id
        organId: this.organId, // 机构id
        particular_year: this.particular_year, //int 年份
        season: this.season, // 季节：[暑假，秋季，寒假，春季]等
        periods: this.periods, //期别
        grade: this.grade, //适用年级，[一年级，二年级]等
        subject: this.subject, //科目，[数学，物理]等
        projectType: this.projectType, //项目类型 [长期，短期，公益，考试]等
        classType: this.classType, //班型，[超常，培优]等
        teacherName: this.teacherName, //老师名字
        className: this.className, //班级名称
        department: this.department, //学部，小学，初中，高中
        studentName: this.$store.state.chooseStudentInfo.student_name, //学生姓名
        studentMobile: this.$store.state.chooseStudentInfo.student_mobile, //学生电话
        studentNo: this.$store.state.chooseStudentInfo.student_no, //学生电话
        orderStatus: "01006" //订单状态
      };
      this.$axios
        .post(this.GlobalVal.httpLink.queryStuentOrder, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              this.count = res.data.count;
              this.dataList = res.data.studentOrders;
              console.log(res.data, 9999);
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
    handleApply(index, row) {
      const self = this;
      this.$store.commit("setTurnClassInfo", row);
      this.$store.commit("setTurnSwitch", true);
      this.orderId = row.order_id;
      this.rowInfo = row;
      //清空参数
      this.oldClassTimeOptions = [];
      this.newClassTimeOptions = [];
      // this.ruleForm.oldClassSequence = null;
      // this.ruleForm.newClassSequence = null;
      // this.ruleForm.reason = "";
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        source: "PC",
        orderId: this.rowInfo.order_id //订单编号
      };
      this.$axios
        .post(this.GlobalVal.httpLink.getclassinfo, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              this.attendclassList = res.data.checkinlist;
              self.attendList = res.data.classinfo;
              this.$store.commit("setTurnClassInfo", self.attendList);
              this.classTimeLayer = true;
            } else {
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
    /* 退费 */
    handlemoney(index, row) {
      this.rowInfo = row;
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        source: "PC",
        orderId: this.rowInfo.order_id //订单编号
      };
      // let loading = this.$Loading();
      this.$axios
        .post(this.GlobalVal.httpLink.getRefundInfo, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              this.getRefundInfoRes = res.data;
              // 优惠类型，02501：买赠优惠， 02502：均价优惠
              const { buyTimes, checkinNum, signupOrder } = res.data;
              this.$nextTick(() => {
                this.$refs.dialog.dialogVisible = true;
              });
              /* switch (res.data.liberalType) {
                            case "02501":
                            this.refundTimes =
                                Math.floor(
                                signupOrder.real_payment / signupOrder.single_price
                                ) - checkinNum;
                            break;
                            case "02502":
                            default:
                            this.refundTimes = buyTimes - checkinNum;
                        } */
              // loading.close();
            } else {
              console.error(res);
              self.$message({
                type: "error",
                message: res.data.errmsg
              });
            }
            // loading.close();
          },
          res => {
            loading.close();
            this.$message("请求失败");
          }
        );
    },
    printEdit(row) {
      this.printInfo = row;
      this.$refs.print.dialogVisible = true;
    }
  }
};
</script>
