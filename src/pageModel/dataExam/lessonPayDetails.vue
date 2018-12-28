<template>
  <div class="pay-details">
    <div class="hander">
      <div>
        <div class="teacher-name">
          {{teacherObj.teacher_name}}
        </div>
        <div>
          <div>
            <span>{{teacherObj.belongedDate}}</span>
            <span>总课次 <span> {{teacherObj.finishClassCount}}</span></span>
            <span>大班课次 <span>{{teacherObj.bigClassCount}}</span> </span>
            <span>小班课次 <span> {{teacherObj.smallClassCount}}</span></span>
            <span>义务课时 <span>{{teacherObj.compulsoryHour}}</span> </span>
          </div>
          <div>
            <span>{{campusName}}</span>
            <span>{{teacherObj.tlevel_name}}</span>
            <span>{{dollars}}</span>
          </div>
        </div>
        <div class="teacher-pay">
          实际课时费 ¥{{teacherObj.salary}}
        </div>
      </div>
      <div class="btn">
        <el-button type="primary" size="mini" @click="exportTeacherDetails">导出</el-button>
      </div>
    </div>
    <div class="main">
      <div>
        <el-button @click="() =>{$router.go(-1)}" icon="el-icon-arrow-left" type="primary" size="mini">返回</el-button>
      </div>
      <div class="main-table">
        <el-table size="mini" :data="dataList" stripe style="width: 100%" v-loading="loading">
          <el-table-column prop="classCampusName" label="班级所属校区" width="150"></el-table-column>
          <el-table-column label="期别">
            <template slot-scope="scope">
              {{scope.row.periods || '无'}}
            </template>
          </el-table-column>
          <el-table-column prop="class_name" label="班级名称" width="300"></el-table-column>
          <el-table-column prop="finishClassCount" label="总课次数"></el-table-column>
          <el-table-column prop="highSchool" label="高中课次"></el-table-column>
          <el-table-column prop="bigClassCount" label="大班课次"></el-table-column>
          <el-table-column prop="smallClassCount" label="小班课次"></el-table-column>
          <el-table-column prop="dollars" label="课酬"></el-table-column>
          <el-table-column prop="preSignNumber" label="应签总数" width="150"></el-table-column>
          <el-table-column prop="teachPeople" label="授课人次"></el-table-column>
          <el-table-column prop="actualSignNumber" label="签到"></el-table-column>
          <el-table-column prop="notArriveNumber" label="迟到"></el-table-column>
          <el-table-column prop="leaveNumber" label="请假"></el-table-column>
          <el-table-column prop="truantNumber" label="旷课"></el-table-column>
          <el-table-column prop="mendRegisterNumber" label="补签"></el-table-column>
          <el-table-column prop="notArriveNumber" label="未签到"></el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, slot, sizes, prev, pager, next, jumper" :total="count" :page-size="limit" :page-sizes="[10,20,30,50]">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 0,
      limit: 10,
      count: 0,
      dataList: [],
      campusName: "",
      dollars: "",
      teacherObj: {},
      objData: {},
      loading: true
    };
  },
  created() {
    this.teacherObj = this.$store.state.PayMoneyDetial;
    this.Util.querySysconst(this, "009", this.$store.state.PeriodsOptions); //查询期别
    this.getData();
  },
  methods: {
    getData() {
      this.objData = {
        limit: this.limit,
        page: this.page,
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        source: this.GlobalVal.constants.source,
        teacherId: this.$store.state.PayMoneyDetial.teacher_id,
        belongedDate: this.$store.state.PayMoneyDetial.belongedDate,
        organId: this.$route.query.organId
      };
      this.$axios
        .post(
          this.GlobalVal.httpLink.getTeacherSalaryDetail,
          JSON.stringify(this.objData)
        )
        .then(
          res => {
            this.loading = false;
            if (res.data.code === "10000") {
              this.campusName = res.data.data.campusName;
              this.dollars = res.data.data.dollars;
              this.count = res.data.data.count;
              this.dataList = res.data.data.teacherSalaryInfos;
              this.dataList.map(
                item =>
                  (item.periods = this.Util.GetLabelForValue(
                    this.$store.state.PeriodsOptions,
                    item.periods
                  ))
              );
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
    exportTeacherDetails() {
      this.$exportExcel({
        dataList: this.dataList,
        objData: this.objData,
        httpUrl: "exportTeacherSalaryDetail",
        title: this.$route.meta.title
      });
    }
  }
};
</script>

<style scoped>
.pay-details {
  padding: 20px;
}
.pay-details .hander {
  width: 100%;
  /* height: 40px; */
  background: #fff;
  padding: 20px;
  display: flex;
  justify-content: space-between;
}
.pay-details .hander div:first-child {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.pay-details .hander div:first-child > div:nth-of-type(2) {
  margin: 5px 0px 0px 20px;
  line-height: 16px;
  font-size: 14px;
}
.pay-details .hander div:first-child > div:nth-of-type(2) > div > span {
  margin-right: 20px;
  color: #8d8989;
}
.pay-details .hander div:first-child > div:nth-of-type(2) > div > span > span {
  margin-right: 5px;
}
.teacher-name,
.teacher-pay {
  font-size: 30px;
}
.pay-details .main {
  width: 100%;
  margin-top: 20px;
  background: #fff;
  padding: 20px;
}
.btn {
  margin-top: 5px;
  margin-right: 20px;
}
.main-table {
  margin-top: 20px;
}
</style>
