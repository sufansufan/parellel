<template>
  <div class="query-money">
    <div>
      <Refund-title-list>
        <ul>
          <li v-for="(item, index) in titleType" :key="index">
            <span>●</span>
            <div>
              <p>{{item.label}}</p>
              <p>{{index <= 3 ? "￥" : "" }}{{dataTitle[item.value]}}</p> </div> </li> </ul> </Refund-title-list> </div> <el-tabs v-model="activeName" style="background: #fff; padding: 0 15px;" @tab-click="handleClick">
                  <el-tab-pane label="退费单" name="refundTable">
                    <RefundOrder :isAdmin="true" ng ref="refundOrder" @getTitleData="getTitleData">
                      <template slot="tableSelect">
                        <div>
                          <el-date-picker clearable v-model="times" type="daterange" align="right" size="mini" unlink-panels range-separator="至" start-placeholder="操作开始日期" end-placeholder="操作结束日期" :picker-options="pickerOptions" :default-time="['00:00:00', '23:59:59']">
                          </el-date-picker>
                        </div>
                        <div>
                          <el-input clearable v-model="options.finance_name" placeholder="请输入流水号" class="input-with-select" size="mini" @keyup.native.enter="getRefundOrderData">
                            <span slot="prepend">财务主体名称</span>
                            <el-button icon="el-icon-search" slot="append" @click="getRefundOrderData"></el-button>
                          </el-input>
                        </div>
                        <div>
                          <el-input clearable v-model="options.big_refund_order_id" placeholder="请输入退费单ID" class="input-with-select" size="mini" @keyup.native.enter="getRefundOrderData">
                            <span slot="prepend">退费单ID</span>
                            <el-button icon="el-icon-search" slot="append" @click="getRefundOrderData"></el-button>
                          </el-input>
                        </div>
                        <div>
                          <el-input clearable v-model="options.studentName" placeholder="请输入学生姓名/手机号" class="input-with-select" size="mini" @keyup.native.enter="getRefundOrderData">
                            <span slot="prepend">学生姓名/手机号</span>
                            <el-button icon="el-icon-search" slot="append" @click="getRefundOrderData"></el-button>
                          </el-input>
                        </div>
                        <div>
                          <el-input clearable v-model="options.teacherName" placeholder="请输入老师姓名" class="input-with-select" size="mini" @keyup.native.enter="getRefundOrderData">
                            <span slot="prepend">老师姓名</span>
                            <el-button icon="el-icon-search" slot="append" @click="getRefundOrderData"></el-button>
                          </el-input>
                        </div>
                        <div>
                          <el-select clearable v-model="options.watch.particularYear" placeholder="选择年份" size="mini">
                            <el-option v-for="item in $store.state.YearOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                          </el-select>
                        </div>
                        <div>
                          <el-select clearable v-model="options.watch.season" placeholder="选择季节" size="mini">
                            <el-option v-for="item in $store.state.SeasonOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                          </el-select>
                        </div>
                        <div>
                          <el-select clearable v-model="options.watch.periods" placeholder="选择期别" size="mini">
                            <el-option v-for="item in $store.state.PeriodsOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                          </el-select>
                        </div>
                        <div>
                          <el-select clearable v-model="options.watch.grade" placeholder="选择年级" size="mini">
                            <el-option v-for="item in $store.state.GradeOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                          </el-select>
                        </div>
                        <div>
                          <el-select clearable v-model="options.watch.subject" placeholder="选择科目" size="mini">
                            <el-option v-for="item in $store.state.SubjectOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                          </el-select>
                        </div>
                        <div>
                          <el-select clearable v-model="options.watch.projectType" placeholder="选择类别" size="mini">
                            <el-option v-for="item in $store.state.CourseTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                          </el-select>
                        </div>
                        <div>
                          <el-select clearable v-model="options.watch.classType" placeholder="选择班型" size="mini">
                            <el-option v-for="item in $store.state.ClassTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                          </el-select>
                        </div>
                        <div class="export">
                          <el-button size="mini" type="primary" @click="batchMoneyImport">批量打款导入</el-button>
                          <el-button size="mini" type="primary" @click="exportBigRefundOrder">导出</el-button>
                        </div>
                      </template>
                    </RefundOrder>
                  </el-tab-pane>
                  <el-tab-pane label="报名退费" name="signUpRefund">
                    <RefundTable @getTitleData="getTitleData"></RefundTable>
                  </el-tab-pane>
                  <el-tab-pane label="其他退费" name="otherRefund">
                    <OtherRefund @getTitleData="getTitleData"></OtherRefund>
                  </el-tab-pane>
                  <!-- <el-tab-pane label="财务主体退费" name="financialBodyRefund">
                    <Financial-body-refund @getTitleData="getTitleData"></Financial-body-refund>
                  </el-tab-pane> -->
                  </el-tabs>
                  <Dialog ref="MoneyImport" title="批量打款导入预览" titbg>
                    <div class="money-import-box">
                      <el-upload class="upload-demo" ref="upload" :action="upload.importFileUrl" :data="upload.data" :onError="uploadError" :onSuccess="uploadSuccess" :on-remove="handleRemove" :beforeUpload="beforeAvatarUpload" :auto-upload="true" :multiple="false" style="display: flex" :fileList="fileList">
                        <el-button type="primary" size="mini" class="handle-del mr10">选择文件</el-button>
                      </el-upload>
                      <div class="import-table">
                        <el-table size="mini" :data="previewList" stripe style="width: 100%;" height="600">
                          <el-table-column prop="id" label="退费ID"></el-table-column>
                          <el-table-column prop="campusName" label="校区"></el-table-column>
                          <el-table-column prop="financeBodyName" label="财务主体"></el-table-column>
                          <el-table-column prop="studentName" label="学员姓名"></el-table-column>
                          <el-table-column prop="mobile" label="联系电话"></el-table-column>
                          <el-table-column prop="totalApplyAmount" label="打款金额"></el-table-column>
                          <el-table-column prop="refundStatus" label="状态"></el-table-column>
                          <el-table-column prop="payRefund" label="打款操作"></el-table-column>
                          <el-table-column prop="remark" label="打款备注"></el-table-column>
                          <el-table-column label="检查结果" width="300">
                            <template slot-scope="scope">
                              <el-button :class="scope.row.exception ? 'upload-color' : 'upload-color-success'" type="text"> {{scope.row.checkResult}}</el-button>
                            </template>
                          </el-table-column>
                        </el-table>
                      </div>
                      <div class="upload-button">
                        <el-button type="primary" size="small" @click="confirmImport">确定</el-button>
                        <el-button type="primary" size="small" @click="$refs.MoneyImport.dialogVisible = false">取消</el-button>
                      </div>
                    </div>
                  </Dialog>
            </div>
</template>
<script>
import RefundOrder from "../frontOffice/RefundOrder";
export default {
  components: {
    // QueryRefundMoney: resolve => require(["./QueryRefundMoney"], resolve),
    // QueryRefundOther: resolve => require(["./QueryRefundOther"], resolve),
    RefundOrder,
    RefundTable: resolve => require(["./RefundTable"], resolve),
    OtherRefund: resolve => require(["./OtherRefund"], resolve),
    FinancialBodyRefund: resolve => require(["./FinancialBodyRefund"], resolve),
    RefundTitleList: resolve => require(["./RefundTitleList"], resolve),
    Dialog: resolve => require(["../common/Dialog"], resolve)
  },
  created() {
    this.Util.querySysconst(this, "006", this.$store.state.SeasonOptions); //查询季节
    this.Util.querySysconst(this, "009", this.$store.state.PeriodsOptions); //查询期别
    this.Util.querySysconst(this, "101", this.$store.state.GradeOptions); //查询年级
    this.Util.querySysconst(this, "100", this.$store.state.SubjectOptions); //查询科目
    this.Util.querySysconst(this, "002", this.$store.state.CourseTypeOptions); //查询类别/课型
    this.Util.querySysconst(this, "003", this.$store.state.ClassTypeOptions); //查询班型
  },
  mounted() {
    this.$nextTick(() => {
      this.getRefundOrderData();
    });
  },
  watch: {
    "options.watch": {
      handler() {
        this.getRefundOrderData();
      },
      deep: true
    },
    times: {
      handler() {
        this.getRefundOrderData();
      },
      deep: true
    },
    refundDataTitle: {
      handler() {
        this.handleClick();
      },
      deep: true
    }
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      activeName: "refundTable",
      dataTitle: {},
      refundDataTitle: {
        refundTableTitle: {},
        signUpRefundTitle: {},
        otherRefundTitle: {},
        financialBodyRefundTitle: {}
      },
      times: [new Date().getTime() - 3600 * 1000 * 24 * 30, new Date()],
      options: {
        refundTradeno: "",
        finance_name: "",
        teacherName: "",
        big_refund_order_id: "",
        studentName: "",
        studentMobile: "",
        page: 0,
        watch: {
          particularYear: "",
          season: "",
          periods: "",
          grade: "",
          subject: "",
          projectType: "",
          classType: "",
          update_at: "",
          update_at_end: ""
        }
      },
      countMap: {},
      titleType: [
        {
          label: "打款总金额",
          value: "refund_income",
          type: this.activeName
        },
        {
          label: "课程打款",
          value: "refund_fee"
        },
        {
          label: "其他打款",
          value: "other_refund_fee"
        },
        {
          label: "额外退费",
          value: "other_refund_amount"
        },
        {
          label: "退费总人数",
          value: "refund_stu_count"
        },
        {
          label: "退费总人次",
          value: "count_refund_stu"
        }
      ],
      upload: {
        importFileUrl: "",
        data: {
          staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
          source: "PC"
        }
      },
      previewList: [],
      moneyStatus: [
        { value: "02001", label: "申请退款" },
        { value: "02002", label: "申请退款" },
        { value: "02003", label: "申请退款" },
        { value: "02004", label: "申请退款" }
      ],
      fileList: []
    };
  },
  methods: {
    getRefundOrderData() {
      const options = JSON.parse(JSON.stringify(this.options));
      if (options.studentName) {
        if (/^\d+$/.test(options.studentName)) {
          options.studentMobile = options.studentName;
          options.studentName = "";
        }
      }
      delete options.watch;
      const params = Object.assign({}, options, { ...this.options.watch });
      const times = this.times || ["", ""];
      params.update_at = times[0];
      params.update_at_end = times[1];
      this.$refs.refundOrder.getData(params, data => {
        this.countMap = data.data.countMap;
      });
    },
    getTitleData(type, param) {
      switch (type) {
        case "refundTable":
          this.refundDataTitle.refundTableTitle = param;
          break;
        case "signUpRefund":
          this.refundDataTitle.signUpRefundTitle = param;
          break;
        case "otherRefund":
          this.refundDataTitle.otherRefundTitle = param;
          break;
        case "financialBodyRefund":
          this.refundDataTitle.financialBodyRefundTitle = param;
          break;
      }
    },
    handleClick() {
      switch (this.activeName) {
        case "refundTable":
          this.dataTitle = this.refundDataTitle.refundTableTitle;
          break;
        case "signUpRefund":
          this.dataTitle = this.refundDataTitle.signUpRefundTitle;
          break;
        case "otherRefund":
          this.dataTitle = this.refundDataTitle.otherRefundTitle;
          break;
        case "financialBodyRefund":
          this.dataTitle = this.refundDataTitle.financialBodyRefundTitle;
          break;
      }
    },
    exportBigRefundOrder() {
      let startDate = this.$refs.refundOrder.getParams.startDate,
        endDate = this.$refs.refundOrder.getParams.endDate,
        update_at = this.$refs.refundOrder.getParams.update_at,
        update_at_end = this.$refs.refundOrder.getParams.update_at_end;

      this.$refs.refundOrder.getParams.startDate = this.Util.TimeCycle(
        new Date(startDate).getTime()
      );
      this.$refs.refundOrder.getParams.endDate = this.Util.TimeCycle(
        new Date(endDate).getTime()
      );
      this.$refs.refundOrder.getParams.update_at = this.Util.TimeCycle(
        new Date(update_at).getTime()
      );
      this.$refs.refundOrder.getParams.update_at_end = this.Util.TimeCycle(
        new Date(update_at_end).getTime()
      );
      this.$exportExcel({
        dataList: this.$refs.refundOrder.dataList,
        objData: this.$refs.refundOrder.getParams,
        httpUrl: "exportBigRefundOrder",
        title: this.$route.meta.title
      });
    },
    batchMoneyImport() {
      this.$refs.MoneyImport.dialogVisible = true;
      this.upload.importFileUrl = this.GlobalVal.httpLink.getRefundImportList;
      this.previewList = [];
      if (this.$refs.upload) {
        this.$refs.upload.clearFiles();
      }
    },
    //上传的文件错误
    uploadError(res, file, fileList) {
      this.$message({
        type: "error",
        message: "上传失败！请重试"
      });
    },
    //文件上传成功
    uploadSuccess(res, file, fileList) {
      this.previewList = res.data.refundImports;
      console.log(this.previewList);
      this.previewList.map(item => {
        if (item.refundStatus !== null) {
          if (item.refundStatus == "02002") {
            item.auditResult
              ? (item.refundStatus = "审核通过")
              : (item.refundStatus = "审核不通过");
          } else {
            item.refundStatus = this.moneyStatus.filter(
              item => item.velue == item.refundStatus
            )[0].label;
          }
        } else {
          item.refundStatus = "";
        }
        if (item.payRefund !== null) {
          item.payRefund
            ? (item.payRefund = "通过")
            : (item.payRefund = "不通过");
        }
      });
      if (res.code === "10000") {
        this.$Loading().close();
      }
    },
    //文件移除
    handleRemove(file, fileList) {
      console.log(file);
    },
    // 上传前对文件的大小的判断
    beforeAvatarUpload(file) {
      this.$Loading();
      const extension = file.name.split(".")[1] === "xls";
      const extension2 = file.name.split(".")[1] === "xlsx";
      const extension3 = file.name.split(".")[1] === "doc";
      const extension4 = file.name.split(".")[1] === "docx";
      const fileSize = file.size / 1024 / 1024 < 20;
      if (!extension && !extension2 && !extension3 && !extension4) {
        this.$message({
          type: "error",
          message: "上传模板只能是 xls、xlsx、doc、docx 格式!"
        });
      }
      if (!fileSize) {
        this.$message({
          type: "error",
          message: "上传模板大小不能超过 20MB!"
        });
      }
      return extension || extension2 || extension3 || (extension4 && fileSize);
    },
    confirmImport() {
      console.log(this.fileList);
      this.$axios
        .post(
          this.GlobalVal.httpLink.getRefundImportListConfirm,
          JSON.stringify(this.upload.data)
        )
        .then(
          res => {
            if (res.data.code === "10000") {
              this.$refs.MoneyImport.dialogVisible = false;
              this.$refs.refundOrder.getData();
              this.$message.success("操作成功");
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
    }
  }
};
</script>
<style scoped>
.query-money {
  padding: 20px;
}
.money-import-box {
  width: 100%;
  height: 700px;
}
.import-table {
  margin-top: 20px;
}
.upload-button {
  margin-top: 10px;
  text-align: center;
}
.upload-button button {
  width: 100px;
  margin-right: 20px;
}
.upload-color {
  color: red;
}
.upload-color-success {
  color: green;
}
</style>
<style>
.query-money .el-tabs__header {
  margin: 0px 0px 15px;
}
</style>
