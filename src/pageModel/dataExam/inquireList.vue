<template>
  <div class="table">
    <!--地址选择-->
    <div style="margin-bottom: 20px; overflow: hidden;">
      <div class="handle-box" style="float:left;">
        <div class="border">
          <!--  <el-cascader size="medium" expand-trigger="click" ref="cascaderLoaction" :options="location" v-model="selectedLocation" placeholder="选择学校" style="opacity: 0; position: absolute; left: 30px;" change-on-select @change="handleLocationChange">
          </el-cascader>
          <div class="multi-cascader" @click="openCascader">
            <span v-for="(item, index) in multiCascader" :key="item.value">
              <i class="el-tag__close el-icon-close" @click="removeCascaderItem(index, item, $event)"></i>
              {{ item.label }}
            </span>
            <p v-show="multiCascader.length === 0">请选择校区</p>
          </div> -->
          <el-cascader clearable size="medium" expand-trigger="click" :options="location" v-model="selectedLocation" placeholder="选择学校" change-on-select @change="handleLocationChange">
          </el-cascader>
          <el-autocomplete class="inline-input" size="medium" v-model="staffName" value-key="staff_name" :fetch-suggestions="queryStaffSearch" @select="handleQueryStaff" placeholder="请输入操作人名称"></el-autocomplete>
        </div>
      </div>

      <!--时间选择-->
      <template>
        <div class="block" style="display: inline-block;float: right;">
          <!--<span class="demonstration">带快捷选项</span>-->
          <el-date-picker v-model="startAndEndDate" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
          </el-date-picker>
        </div>
      </template>

    </div>

    <!-- echarts -->
    <div v-if="chart" id="chart-box">
      <ve-line v-loading="loading" class="line-box" :data="lineData" :extend="chartSettings"></ve-line>
    </div>
    <!--多选框-->
    <div v-if="!chart" style="padding: 0 20px 0 0;">
      <el-radio-group v-model="selectRadio" @change="selectRadioChange">
        <el-radio label="isLongTermCourse">长期班缴费人数</el-radio>
        <el-radio label="isShortTermCourse">短期班缴费人数</el-radio>
        <el-radio label="isRefund">退费人数</el-radio>
        <el-radio label="isTurnClass">转班人数</el-radio>
        <el-radio label="isChangeClass">调课人数</el-radio>
        <el-radio label="isCancle">撤单人数</el-radio>
        <div style="margin: 15px 0 10px;">
          <el-radio label="isGrade">
            <el-select size="mini" v-model="grade" placeholder="请选择">
              <el-option v-for="item in $store.state.GradeOptions" :key="item.code" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            每个年级缴费人数
          </el-radio>
          <el-radio label="isAllGrade">年级总人数</el-radio>
        </div>

      </el-radio-group>
      <el-button v-if="!chart && $store.state.code.includes('011101') " @click="exportInfo" size="mini" type="primary" class="export-style">导出</el-button>
    </div>

    <!--查询列表-->
    <el-table v-if="!chart" :data="data" size="mini" stripe style="width: 100%; margin-top:10px;" v-loading="loading">
      <el-table-column label="学生姓名">
        <template slot-scope="scope">
          <div style="cursor: pointer; color: #3692e8;" @click="goStudentInfo(scope.row)">{{scope.row.student_name}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="student_id" label="学员编码"></el-table-column>
      <el-table-column label="性别">
        <template slot-scope="scope">
          {{ scope.row.sex ? '男' : '女'}}
        </template>
      </el-table-column>
      <el-table-column prop="student_grade" label="年级"></el-table-column>
      <el-table-column label="出生日期" width="150">
        <template slot-scope="scope">
          {{ Util.TimeCycle(new Date(scope.row.student_birthday).getTime(), 'ymd')}}
        </template>
      </el-table-column>
      <el-table-column label="就读学校" width="150">
        <template slot-scope="scope">
          {{ scope.row.high_school || scope.row.middle_school || scope.row.primary_school || '未填写'}}
        </template>
      </el-table-column>
      <el-table-column label="所属校区">
        <template slot-scope="scope">
          {{ scope.row.campus_name || '未填写'}}
        </template>
      </el-table-column>
      <el-table-column prop="student_mobile" label="联系电话"></el-table-column>
      <el-table-column prop="classnum" label="报班个数"></el-table-column>
    </el-table>

    <div v-if="!chart" class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :total="count" :page-size="cur_limit" :page-sizes="[10,20,30,50]">
      </el-pagination>
    </div>
  </div>

</template>



<script>
export default {
  props: {
    chart: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      /*变量*/
      loading: true,
      page: 0, //页码
      cur_limit: 10, //每次请求的数据数
      limit: 10, //一次查询多少条
      count: 0, //数据总量
      location: [],
      selectedLocation: [], //存放校区
      multipleSelection: [], //多选数据
      objData: {}, // 发送请求的参数
      dataList: [], //List
      organ_id: "",
      /*弹出框*/
      addTeamLayer: false, //新增弹出框状态
      noStandard: [], //审核不合格
      //表单校验规则
      rules: {
        /*school_name: [
                        { required: true, message: '请输入学校名称', trigger: 'blur' },
                    ],*/
      },
      ruleForm: {
        //编辑数据
      },
      //接收当前行的信息
      changeForm2: {},
      checkAll: false,
      selectRadio: "isLongTermCourse",
      grade: "", //每个年级报名人数
      selectRadioList: {
        isLongTermCourse: this.chart ? null : true, //长期班缴费人数 true为选中，单选
        isShortTermCourse: null, //短期班缴费人数
        isRefund: null, //退费人数
        isTurnClass: null, //转班人数 转出 转入
        isChangeClass: null, //调课人数 调出 调入
        isCancle: null, //撤单人数
        isAllGrade: null, //年级总人数,
        isGrade: null
      },
      school_ids: [], // 大区
      branch_school_ids: [], // 分校
      campus_ids: [], //　校区
      staffList: [], // 操作人列表
      staffName: "", //　查询的操作人名称
      multiCascader: [],
      isIndeterminate: true,
      lineData: {
        columns: [],
        rows: []
      },
      chartSettings: {
        grid: {
          left: 10,
          right: 40
        }
      },
      pickerOptions2: {
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
      startAndEndDate: []
    };
  },
  created() {
    //查询区域导航
    const self = this;
    this.Util.queryAreaNav(self, -1, function() {
      self.getData();
    });
    this.Util.querySysconst(this, "101", this.$store.state.GradeOptions); //查询年级
    this.location = self.$store.state.location;
    console.log(this.location);
    // this.getData();
    this.setParams();
    this.queryStaffList();
  },
  computed: {
    //相当于过滤器
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
    startAndEndDate() {
      this.getData();
    },
    selectedLocation: function(o, n) {
      if (
        this.selectedLocation.includes(
          JSON.parse(window.sessionStorage.getItem("staff")).staffOrganId
        )
      ) {
        if (o[o.length - 1] !== n[n.length - 1]) {
          this.organ_id = o[o.length - 1];
          this.page = 0;
          this.getData();
        }
      } else if (this.selectedLocation.length === 0) {
        this.page = 0;
        this.organ_id = "";
        this.getData();
      }
    },
    // selectedLocation() {
    //   this.getData();
    // },
    multiCascader() {
      //   if (
      //     this.multiCascader.includes(
      //       JSON.parse(window.sessionStorage.getItem("staff")).staffOrganId
      //     ) ||
      //     this.multiCascader.includes(+sessionStorage.areaNavParentId)
      //   ) {
      //     this.organId = this.multiCascader[this.multiCascader.length - 1];
      //     this.getData();
      //   }
      this.getData();
    },
    selectRadioList: {
      handler() {
        this.getData();
      },
      deep: true
    },
    grade() {
      if (this.selectRadioList.isGrade) {
        this.getData();
      }
    },
    staffName(n, v) {
      n === "" && this.getData();
    }
  },
  methods: {
    // 筛选用户时触发操作
    handleQueryStaff(staff) {
      this.getData(staff.staff_id);
    },
    // 查询系统所有用户
    queryStaffList() {
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        staffMobile: "",
        staffName: "",
        page: 0,
        limit: 9999
        // roleName: this.staffName
      };
      this.$axios
        .post(this.GlobalVal.httpLink.queryStaffs, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              this.staffList = res.data.staffs;
            } else {
              this.$message({
                type: "error",
                message: res.data.errmsg
              });
            }
          },
          res => {
            self.$message("请求失败");
          }
        );
    },
    queryStaffSearch(queryString, cb) {
      var restaurants = this.staffList;
      var results = queryString
        ? restaurants.filter(item => item.staff_name.includes(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    // 业务查询列表导出
    /* exportInfo() {
      if (!this.dataList.length) {
        this.$message.warning("未查询出数据，无法导出");
        return false;
      }
      let dataLink = this.GlobalVal.httpLink.exportStudentBusiness + "?";
      for (let i in this.objData) {
        this.objData[i] &&
          this.objData[i] != "" &&
          i !== "page" &&
          i !== "limit" &&
          (dataLink += i + "=" + this.objData[i] + "&");
      }
      window.open(dataLink);
    }, */
    exportInfo() {
      this.objData.startDate = this.Util.TimeCycle(
        new Date(this.objData.startDate).getTime()
      );
      this.objData.endDate = this.Util.TimeCycle(
        new Date(this.objData.startDate).getTime()
      );
      /* this.objData.school_ids =
        this.objData.school_ids && JSON.stringify(this.objData.school_ids);
      this.objData.branch_school_ids =
        this.objData.branch_school_ids &&
        JSON.stringify(this.objData.branch_school_ids);
      this.objData.campus_ids =
        this.objData.campus_ids && JSON.stringify(this.objData.campus_ids); */
      this.$exportExcel({
        dataList: this.dataList,
        objData: this.objData,
        httpUrl: "exportStudentBusiness",
        title: this.$route.meta.title
      });
    },
    // radio单选框change
    selectRadioChange(data) {
      for (let i in this.selectRadioList) {
        i !== data && (this.selectRadioList[i] = null);
      }
      this.selectRadioList[data] = true;
    },
    // 学生姓名点击跳转到详情
    goStudentInfo(row) {
      this.$router.push({
        path: "/studentInfo/classQuery",
        query: {
          sid: row.student_id
        }
      });
    },
    // 设置数据
    setParams(staff = null) {
      this.objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        page: this.page,
        limit: this.limit,
        /* school_ids: this.school_ids,
        branch_school_ids: this.branch_school_ids,
        campus_ids: this.campus_ids, */
        organ_id: this.organ_id,
        opeId: staff, // 操作人id
        startDate: this.startAndEndDate
          ? new Date(this.startAndEndDate[0]).getTime()
          : "",
        endDate: this.startAndEndDate
          ? new Date(this.startAndEndDate[1]).getTime()
          : "",
        isLongTermCourse: this.selectRadioList.isLongTermCourse, //长期班缴费人数 true为选中，单选
        isShortTermCourse: this.selectRadioList.isShortTermCourse, //短期班缴费人数
        isRefund: this.selectRadioList.isRefund, //退费人数
        isTurnClass: this.selectRadioList.isTurnClass, //转班人数 转出 转入
        isChangeClass: this.selectRadioList.isChangeClass, //调课人数 调出 调入
        isCancle: this.selectRadioList.isCancle, //撤单人数
        grade: this.grade, //每个年级报名人数
        isGrade: this.selectRadioList.isGrade,
        isAllGrade: this.selectRadioList.isAllGrade, //年级总人数,
        source: "PC"
      };
    },
    //获取数据
    getData(staff = null) {
      this.setParams(staff);
      this.loading = true;
      this.$axios
        .post(
          this.GlobalVal.httpLink[
            this.chart
              ? "queryStudentBusinessForECharts"
              : "queryStudentBusiness"
          ],
          JSON.stringify(this.objData)
        )
        .then(
          res => {
            if (res.data.code === "10000") {
              if (this.chart) {
                let data = res.data.data,
                  rows = [];
                data.dates.forEach((item, index) => {
                  rows.push({});
                  data.list.forEach(val => {
                    rows[index][val.name] = val.data[index];
                  });
                  rows[index]["date"] = item;
                });
                this.lineData.columns = data.list.map(item => {
                  return item.name;
                });
                this.lineData.columns.unshift("date");
                this.lineData.rows = rows;
              } else {
                console.log("获取信息", res.data);
                this.dataList = res.data.data.studentBusinessInfos;
                console.log(this.dataList);
                !this.dataList && (this.page = 0);
                this.dataList =
                  this.dataList &&
                  this.dataList.map(val => {
                    let grade = this.$store.state.GradeOptions.filter(
                      item => item.value === val.student_grade
                    );
                    val.student_grade = grade[0] && grade[0].label;
                    return val;
                  });
                this.count = res.data.data.count;
              }
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
    //将选中的行存储在一个变量中
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //重新选择了地区事件
    handleLocationChange(value) {
      let val = value[value.length - 1];
      let arr = null;
      const returnVal = data => {
        data.children.forEach(item => {
          if (item.value === val) {
            arr = {
              type: item.type,
              label: item.label
            };
          } else {
            item.children && !arr && returnVal(item);
          }
        });
      };
      returnVal(this.location[0]);

      let keys = this.multiCascader.map(item => item.value);

      if (!keys.includes(val) || !keys.length) {
        console.log(arr);
        if (arr) {
          switch (arr.type) {
            case 1:
              this.school_ids.push({
                id: val
              });
              break;
            case 2:
              this.branch_school_ids.push({
                id: val
              });
              break;
            case 3:
              this.campus_ids.push({
                id: val
              });
              break;
            default:
          }
          if (
            value.includes(
              JSON.parse(window.sessionStorage.getItem("staff")).staffOrganId
            )
          ) {
            this.multiCascader.push({
              type: arr.type,
              value: val,
              label: arr.label
            });
          }
        }
      }
    },
    openCascader() {
      this.$refs.cascaderLoaction.$el.click();
    },
    removeCascaderItem(index, item, event) {
      event.stopPropagation();
      const arr = ["school_ids", "branch_school_ids", "campus_ids"];
      let thisData = this[arr[item.type - 1]];
      thisData = thisData.map(val => {
        if (val.id !== item.value) {
          return val;
        }
      });
      this[arr[item.type - 1]] = thisData.filter(item => item);
      this.multiCascader.splice(index, 1);
    },
    handleCurrentChange(val) {
      this.page = val - 1;
      this.getData();
    },
    //每页显示数目发生变化
    handleSizeChange(val) {
      this.limit = val;
      this.getData();
    },

    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
      const self = this;
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        page: this.page,
        limit: this.limit,
        source: "PC"
      };
    }
  }
  // mixins: [this.mixin]
};
</script>
<style scoped>
/*新增*/
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
  width: 750px;
  height: 605px;
  min-height: 480px;
  margin: auto;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  border-radius: 4px;
  background-color: #ffffff;
  color: #333;
  padding-top: 60px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  box-sizing: border-box;
  z-index: 10;
  overflow-y: scroll;
}
.title-warp {
  position: absolute;
  width: 100%;
  height: 50px;
  top: 0px;
  right: 0;
  z-index: 10;
  background: #f3f3f3;
  -webkit-box-shadow: 0px 0px 3px #ccc;
  -moz-box-shadow: 0px 0px 3px #ccc;
  box-shadow: 0px 0px 3px #ccc;
}
.title-warp > h3 {
  font-size: 16px;
}
.transition-box .el-cascader {
  width: 100%;
}
.el-icon-close::before {
  line-height: 50px;
  color: #b7b7b7;
}
.close-btn {
  position: absolute;
  color: #b7b7b7;
  font-size: 24px;
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
.multi-cascader {
  font-size: 14px;
  line-height: 29px;
  margin-right: 20px;
  padding: 5px 5px 0 15px;
  color: #606266;
  width: 217px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  cursor: pointer;
  text-align: left;
  border: 1px solid #dcdfe6;
  float: left;
  min-height: 34px;
  display: flex;
  flex-wrap: wrap;
  background: #fff;
}
.multi-cascader > span {
  background-color: #f0f2f5;
  border-radius: 4px;
  color: #909399;
  height: 24px;
  line-height: 24px;
  margin: 0 0 5px;
  padding: 0 23px 0 8px;
  margin-right: 5px;
  position: relative;
  font-size: 12px;
}
.multi-cascader > p {
  color: #d1c4d0;
}
.multi-cascader > span > i::after {
  position: absolute;
  content: "\E60F";
  transform: translateY(0.5px);
  background-color: #c0c4cc;
  right: 5px;
  top: 5px;
  border-radius: 50%;
  color: #fff;
}
.multi-cascader > span > i::before {
  content: "";
}
.export-style {
  position: absolute;
  right: 20px;
}
#chart-box {
  padding: 20px 20px 0;
  background: #fff;
  margin-bottom: 10px;
}
#chart-box > .line-box {
  width: 100%;
  margin: 20px;
}
</style>
