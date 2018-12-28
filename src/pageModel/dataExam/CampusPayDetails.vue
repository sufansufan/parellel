<template>
  <div class="pay-details">
    <div class="hander">
      <div>
        <div class="teacher-name">
          <span>总部-{{campusObj.schoolName}}-{{campusObj.branchSchoolName}}-{{campusObj.campusName}}</span>
        </div>
        <div>
        </div>
        <div class="teacher-pay">
          实际课时费 ¥ {{campusObj.salary || '0'}}
        </div>
        <div class="campus-date"> {{campusObj.belongedDate}} </div>
      </div>
      <div class="btn">
        <el-button type="primary" size="mini" @click="exportCampusDetails">导出</el-button>
      </div>
    </div>
    <div class="main">
      <div>
        <el-button @click="() =>{$router.push({path: '/lessonTeacherPay',query: {date:campusObj.belongedDate,type: 'campus', page: $route.query.page}})}" icon="el-icon-arrow-left" type="primary" size="mini">返回</el-button>
      </div>
      <div class="main-table">
        <TeacherPayInTeacher :campusObj="campusObj" ref="campus"></TeacherPayInTeacher>
      </div>
    </div>
  </div>
</template>

<script>
import TeacherPayInTeacher from "./TeacherPayInTeacher";
export default {
  components: {
    TeacherPayInTeacher
  },
  data() {
    return {
      campusObj: {}
    };
  },
  created() {
    this.campusObj = this.$store.state.PayMoneyDetial;
  },
  methods: {
    exportCampusDetails() {
      this.$refs.campus.exportTeacher();
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
.campus-date {
  font-size: 14px;
  margin-left: 20px;
  margin-top: 20px;
  color: #8d8989;
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
