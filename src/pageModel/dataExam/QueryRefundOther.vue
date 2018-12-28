<template>
    <div class="queryRefundOther-box">
        <div class="queryRefundOther-search">
            <el-date-picker
                size="mini"
                v-model="selectDate"
                type="datetimerange"
                align="right"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>
            <el-select v-model="search.refund_status" placeholder="请选择状态" size="mini" clearable>
                <el-option v-for="item in $store.state.refundStatusList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <el-cascader clearable
                    size="mini"
                    expand-trigger="click"
                    :options="location"
                    v-model="selectedLocation"
                    placeholder="选择学校"
                    change-on-select>
            </el-cascader>
            <el-input placeholder="请输入内容" v-model="selectWord" size="mini" class="exportData-search" clearable>
                <el-select style="width: 100px;" v-model="selectTeacherOrClass" slot="prepend" placeholder="请选择">
                    <el-option label="用户名" value="use"></el-option>
                    <el-option label="手机号" value="Phone"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="searchBtn"></el-button>
            </el-input>
            <el-input placeholder="请输入业务流水号" v-model="refund_tradeno" size="mini" class="exportData-search" clearable>
                <el-button slot="append" icon="el-icon-search" @click="searchBtn"></el-button>
            </el-input>
        </div>
        <el-table :data="data" size="mini" stripe style="width: 100%">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="student_name" label="学员姓名"></el-table-column>
            <el-table-column prop="student_mobile" label="联系电话"></el-table-column>
            <el-table-column prop="order_name" label="收费项目"></el-table-column>
            <el-table-column prop="organ_name" label="订单校区"></el-table-column>
            <el-table-column prop="apply_refund_amount" label="申请退费总额"></el-table-column>
            <el-table-column prop="real_refund_amount" label="实际退费总额"></el-table-column>
            <el-table-column prop="refund_apply_time" label="发起时间"></el-table-column>
            <el-table-column prop="audit_time" label="审核时间"></el-table-column>
            <el-table-column prop="real_refund_time" label="退费时间"></el-table-column>
            <el-table-column prop="refund_status_show" label="状态"></el-table-column>
            <el-table-column prop="refund_tradeno" label="退款业务流水号"></el-table-column>
            <el-table-column label="发起人/审核人/打款人" width="200px;">
                <template slot-scope="scope">
                    {{scope.row.apply_name}}  {{scope.row.audit_name ? '/' + scope.row.audit_name : '' }}  {{scope.row.refund_name ? '/' + scope.row.refund_name : ''}}
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right">
                <template slot-scope="scope">
                     <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)" v-if="!isAdmin">查看</el-button>
                    <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)" v-if="isAdmin && scope.row.refund_status_show === '未审核'">审核</el-button>
                    <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)" v-if="isAdmin && scope.row.refund_status_show === '已退款'">查看</el-button>
                    <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)" v-if="isAdmin && scope.row.refund_status_show === '已审核' && scope.row.audit_result">打款</el-button>
                    <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)" v-if="isAdmin && scope.row.refund_status_show === '已审核' && (!scope.row.audit_result || scope.row.audit_result === null)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <div class="pagination-total">
                <span>申请退费总额 ￥ {{sumRefund.apply_refund_amount && sumRefund.apply_refund_amount.toLocaleString() || 0}} 元</span>
                <span>真正退费总额 ￥ {{sumRefund.real_refund_amount && sumRefund.real_refund_amount.toLocaleString() || 0}} 元</span>
            </div>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                layout="total, sizes, prev, pager, next, jumper"
                :current-page="page + 1"
                :total="count"
                :page-size="limit"
                :page-sizes="[10,20,30,50]">
            </el-pagination>
        </div>
        <Dialog ref="dialog" title="退费详情" titbg bodyWid="40%" bodyTop="200px">
            <div class="otherRefund-details">
                <Other-refund-details :rowInfoOther="rowInfoOther" @closeDialog='closeDialog'></Other-refund-details>
            </div>
        </Dialog>
    </div>
</template>

<script>
import Dialog from "../common/Dialog.vue";
import OtherRefundDetails from "./OtherRefundDetails.vue";
export default {
  components: {
    Dialog,
    OtherRefundDetails
  },
  data() {
    return {
      limit: 10,
      page: 0,
      count: 0,
      dataList: [],
      selectDate: [],
      selectTeacherOrClass: "use",
      search: {
        refund_status: ""
      },
      rowInfoOther: {},
      selectedLocation: [],
      sumRefund: {},
      selectWord: "",
      refund_tradeno: ""
    };
  },
  computed: {
    data() {
      return this.dataList.map(item => {
        item.refund_apply_time = this.Util.TimeCycle(
          new Date(item.refund_apply_time).getTime(),
          "ymd"
        );
        item.audit_time = this.Util.TimeCycle(
          new Date(item.audit_time).getTime(),
          "ymd"
        );
        item.real_refund_time = this.Util.TimeCycle(
          new Date(item.real_refund_time).getTime(),
          "ymd"
        );
        item.refund_status_show = this.Util.GetLabelForValue(
          this.$store.state.refundStatusList,
          item.refund_status
        );
        return item;
      });
    },
    isAdmin() {
      return this.$route.path.includes("queryMoney");
    }
  },
  created() {
    this.location = this.$store.state.location;
    this.getData();
  },
  watch: {
    search: {
      handler() {
        this.getData("pageClear");
      },
      deep: true
    },
    selectedLocation() {
      if (
        this.selectedLocation.includes(
          JSON.parse(window.sessionStorage.getItem("staff")).staffOrganId
        )
      ) {
        this.organId = this.selectedLocation[this.selectedLocation.length - 1];
        this.getData("pageClear");
      } else if (this.selectedLocation.length === 0) {
        this.organId = "";
        this.getData("pageClear");
      }
    },
    selectDate() {
      if (this.selectDate) {
        this.startTime = new Date(this.selectDate[0]).getTime();
        this.endTime = new Date(this.selectDate[1]).getTime();
      } else {
        this.startTime = "";
        this.endTime = "";
      }
      this.getData("pageClear");
    }
  },
  methods: {
    getData(pageClear) {
      this.objData = {
        source: this.GlobalVal.constants.source,
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        page: pageClear ? (this.page = 0) : this.page, //页数
        limit: this.limit, //条目数
        studentId: "", //学生ID
        studentName: this.studentName || "", //学生姓名
        className: this.class_name || "", //班级名称
        startTime: this.startTime || "", //前段传过来的数据
        endTime: this.endTime || "", //同上
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
        campusId: this.organId || null, //校区名称
        teacherName: this.teacherName, //教师姓名
        refundStatus: this.search.refund_status //状态：申请退款，退款成功
      };
      //搜索框中的选择老师或者是班级搜索
      if (this.selectTeacherOrClass === "use") {
        this.objData.studentName = this.selectWord;
        this.objData.studentMobile = "";
      } else {
        this.objData.studentName = "";
        this.objData.studentMobile = this.selectWord;
      }
      this.$axios
        .post(
          this.GlobalVal.httpLink.listOtherRefundRecord,
          JSON.stringify(this.objData)
        )
        .then(
          res => {
            if (res.data.code === "10000") {
              this.count = res.data.data.count;
              this.dataList = res.data.data.otherRefundRecords;
              this.sumRefund = res.data.data.sumRefund;
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
    handleEdit(index, row) {
      this.rowInfoOther = row;
      console.log(this.rowInfoOther);
      this.$refs.dialog.dialogVisible = true;
    },
    closeDialog() {
      this.$refs.dialog.dialogVisible = false;
      this.getData();
    },
    searchBtn() {
      this.getData("pageClear");
    },
    //限制条数
    handleSizeChange(val) {
      this.limit = val;
      this.getData("pageClear");
    },
    // 翻页
    handleCurrentChange(val) {
      this.page = val - 1;
      this.getData();
    }
  }
};
</script>

<style scoped>
.queryRefundOther-search {
  margin-bottom: 20px;
}
.exportData-search {
  width: 250px;
}
.otherRefund-details {
  width: 100%;
  max-height: 600px;
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
