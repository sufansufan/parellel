<template>
  <div class="pay-teacher">
    <div class="handle-box" v-if="!campusObj">
      <div>
        <el-date-picker clearable v-model="belongedDate" type="month" placeholder="请选择年月" size="mini">
        </el-date-picker>
      </div>
      <div>
        <el-cascader clearable size="mini" change-on-select expand-trigger="click" :options="location" v-model="selectedLocation" placeholder="课次所属校区不限">
        </el-cascader>
      </div>
      <div>
        <el-cascader clearable size="mini" change-on-select expand-trigger="click" :options="location" v-model="selectedTeaLocation" placeholder="教师所属校区不限">
        </el-cascader>
      </div>
      <div>
        <el-input size="mini" style="width:250px;" placeholder="请输入老师姓名/手机号" v-model="teacherNameAndPhone" clearable slot="teacherName">
          <el-button class="search-btn" slot="append" icon="el-icon-search" @click="getClickData"></el-button>
        </el-input>
      </div>
      <div class="export">
        <el-button size="mini" type="primary" @click="exportTeacher">导出</el-button>
      </div>
    </div>
    <div class="pay-table">
      <el-table size="mini" :data="dataList" stripe style="width: 100%" v-loading="loading">
        <el-table-column prop="belongedDate" label="课时归属年月" width="150"></el-table-column>
        <el-table-column prop="teacher_name" label="老师姓名"></el-table-column>
        <el-table-column prop="teacher_no" label="工号" width="90"></el-table-column>
        <el-table-column prop="finishClassCount" label="总课次数" width="120"></el-table-column>
        <el-table-column prop="lengthOfTime" label="总时长"></el-table-column>
        <el-table-column prop="highSchool" label="高中课次"></el-table-column>
        <el-table-column prop="bigClassCount" label="大班课次"></el-table-column>
        <el-table-column prop="smallClassCount" label="小班课次"></el-table-column>
        <el-table-column prop="classFee" label=" 课时费"></el-table-column>
        <el-table-column prop="dollars" label="课酬"></el-table-column>
        <el-table-column prop="compulsoryHour" label="义务课课时" width="100"></el-table-column>
        <el-table-column label="剩余课次高中/大班/小班" width="190">
          <template slot-scope="scope">
            {{scope.row.surplusHighSchool}}/{{scope.row.surplusBigClassCount}} /{{scope.row.surplusSmallClassCount}}
          </template>
        </el-table-column>
        <el-table-column prop="salary" label="实际课酬"></el-table-column>
        <el-table-column prop="preSignNumber" label="应签总数" width="150"></el-table-column>
        <el-table-column prop="teachPeople" label="授课人次"></el-table-column>
        <el-table-column prop="actualSignNumber" label="签到"></el-table-column>
        <el-table-column prop="lateNumber" label="迟到"></el-table-column>
        <el-table-column prop="leaveNumber" label="请假"></el-table-column>
        <el-table-column prop="truantNumber" label="旷课"></el-table-column>
        <el-table-column prop="mendRegisterNumber" label="补签"></el-table-column>
        <el-table-column prop="notArriveNumber" label="未签到"></el-table-column>
        <el-table-column label="操作" fixed="right" v-if="!campusObj">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="seeDetails(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" ref="pagination" :current-page="page + 1" @current-change="handleCurrentChange" layout="total, slot, sizes, prev, pager, next, jumper" :total="count" :page-size="limit" :page-sizes="[10,20,30,50]">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    campusObj: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      page:
        (this.$store.state.PayMoneyTeacher &&
          this.$store.state.PayMoneyTeacher.page * 1) ||
        0,
      limit: 10,
      count: 0,
      selectedLocation: [],
      selectedTeaLocation: [],
      teacherNameAndPhone: "",
      dataList: [],
      loading: true,
      belongedDate:
        (this.$store.state.PayMoneyTeacher &&
          this.$store.state.PayMoneyTeacher.belongedDate) ||
        new Date(),
      objData: {},
      organIdByTeacher: "",
      organId: ""
    };
  },
  created() {
    this.Util.queryAreaNav(this, -1, () => {});
    this.location = this.$store.state.location;
    if (this.$store.state.SearchTeacher !== undefined) {
      let {
        selectedLocation,
        selectedTeaLocation,
        belongedDate,
        teacherNameAndPhone
      } = this.$store.state.SearchTeacher;
      this.selectedLocation = selectedLocation || "";
      this.selectedTeaLocation = selectedTeaLocation || "";
      this.belongedDate = belongedDate || new Date();
      this.teacherNameAndPhone = teacherNameAndPhone || "";
    }
    this.$store.state.PayMoneyTeacher
      ? this.getData(this.$store.state.PayMoneyTeacher)
      : this.getData();
  },
  updated() {
    this.$store.commit("setPayMoneyTeacher", {});
    this.$refs.pagination.internalCurrentPage = this.page + 1;
  },
  mounted() {
    window.addEventListener("beforeunload", () => {
      this.$store.commit("setSearchTeacher", {});
    });
  },
  watch: {
    selectedLocation: function(o, n) {
      this.$store.commit("setSearchTeacher", {
        selectedTeaLocation: this.selectedTeaLocation,
        belongedDate: this.belongedDate,
        selectedLocation: this.selectedLocation,
        teacherNameAndPhone: this.teacherNameAndPhone
      });
      if (this.selectedLocation.length >= 0) {
        if (o[o.length - 1] !== n[n.length - 1]) {
          this.organId = o[o.length - 1];
          this.page = 0;
          this.getData();
        }
      }
    },
    selectedTeaLocation: function(o, n) {
      this.$store.commit("setSearchTeacher", {
        selectedTeaLocation: this.selectedTeaLocation,
        belongedDate: this.belongedDate,
        selectedLocation: this.selectedLocation,
        teacherNameAndPhone: this.teacherNameAndPhone
      });
      if (this.selectedTeaLocation.length >= 0) {
        if (o[o.length - 1] !== n[n.length - 1]) {
          this.organIdByTeacher = o[o.length - 1];
          this.page = 0;
          this.getData();
        }
      }
    },
    belongedDate() {
      this.$store.commit("setSearchTeacher", {
        selectedTeaLocation: this.selectedTeaLocation,
        belongedDate: this.belongedDate,
        selectedLocation: this.selectedLocation,
        teacherNameAndPhone: this.teacherNameAndPhone
      });
      this.page = 0;
      this.getData();
    }
  },
  methods: {
    getData(data = {}) {
      this.objData = {
        limit: this.limit,
        page: this.page,
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        source: this.GlobalVal.constants.source,
        belongedDate: this.Util.TimeCycle(
          new Date(this.belongedDate).getTime(),
          "ym"
        ),
        teacherNameAndPhone: this.teacherNameAndPhone,
        organId: this.organId,
        organIdByTeacher: this.organIdByTeacher
      };
      this.campusObj ? (this.objData.organId = this.campusObj.campusId) : null;
      this.loading = true;
      this.$axios
        .post(
          this.GlobalVal.httpLink.listTeacherSalary,
          JSON.stringify(Object.assign({}, this.objData, data))
        )
        .then(
          res => {
            this.loading = false;
            if (res.data.code === "10000") {
              this.count = res.data.data.count;
              this.dataList = res.data.data.teacherSalaryInfos;
            } else {
              this.$message({
                type: "error",
                message: res.data.errmsg
              });
            }
          },
          res => {
            this.loading = false;
          }
        );
    },
    seeDetails(data) {
      this.$store.commit("setPayMoneyDetial", data);
      this.$store.commit("setPayMoneyTeacher", this.objData);
      this.$router.push({
        path: "/lessonPayDetails",
        query: {
          id: data.teacher_id,
          type: "teacher",
          organId: this.organId
        }
      });
    },
    //限制每页数量
    handleSizeChange(val) {
      this.limit = val;
      this.getData();
    },
    //翻页
    handleCurrentChange(val) {
      this.page = val - 1;
      this.getData();
    },
    //导出
    exportTeacher() {
      this.$exportExcel({
        dataList: this.dataList,
        objData: this.objData,
        httpUrl: "exportTeacherSalary",
        title: this.$route.meta.title
      });
    },
    getClickData() {
      this.$store.commit("setSearchTeacher", {
        selectedTeaLocation: this.selectedTeaLocation,
        belongedDate: this.belongedDate,
        selectedLocation: this.selectedLocation,
        teacherNameAndPhone: this.teacherNameAndPhone
      });
      this.page = 0;
      this.getData();
    }
  }
};
</script>

<style scoped>
.handle-box {
  display: flex;
  flex-wrap: wrap;
}
.handle-box > div {
  margin-right: 10px;
  margin-bottom: 10px;
}
.handle-box > .export {
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
}
.pay-table {
  margin-top: 10px;
}
</style>
