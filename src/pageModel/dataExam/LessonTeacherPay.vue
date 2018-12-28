<template>
  <div class="table">
    <el-tabs v-model="activeName">
      <el-tab-pane label="按老师" name="teacher">
        <TeacherPayInTeacher></TeacherPayInTeacher>
      </el-tab-pane>
      <el-tab-pane label="按校区" name="campus">
        <TeacherPayInCampus></TeacherPayInCampus>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Dialog from "../common/Dialog.vue";
export default {
  components: {
    Dialog,
    TeacherPayInTeacher: resolve =>
      require(["./TeacherPayInTeacher.vue"], resolve),
    TeacherPayInCampus: resolve => require(["./TeacherPayInCampus"], resolve)
  },
  data() {
    return {
      activeName: "teacher"
    };
  },
  methods: {
    getData(pageData) {
      this.objData = {
        limit: this.teacherLimit,
        page: pageData ? (this.teacherPage = 0) : this.teacherPage,
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        source: this.GlobalVal.constants.source,
        belongedDate: this.Util.TimeCycle(
          new Date(this.particularYearTeacher).getTime(),
          "ym"
        ),
        teacherName: this.select_word,
        organId: this.organId
      };
      this.loading = true;
      this.$axios
        .post(
          this.GlobalVal.httpLink.listTeacherSalary,
          JSON.stringify(this.objData)
        )
        .then(
          res => {
            this.loading = false;
            if (res.data.code === "10000") {
              console.log("查询教师课酬按教师列表获取的对象", res.data);
              this.teacherCount = res.data.data.count;
              this.dataList = res.data.data.teacherSalaryInfos;
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
            this.loading = false;
          }
        );
    },
    openDialog(row) {
      this.teacherInfo = row;
      this.$refs.dialog.dialogVisible = true;
      //this.$refs.dialog.dialogVisible = true;
    },
    openDialogView() {
      this.$refs.dialogCom.dialogVisible = true;
    },
    search() {
      this.getData();
    },
    //限制每页数量
    handleSizeChangeTea(val) {
      this.teacherLimit = val;
      this.getData();
    },
    handleSizeChangeCom(val) {
      this.compusLimit = val;
      this.getData();
    },
    //翻页
    handleCurrentChangeCom(val) {
      this.compusPage = val - 1;
      this.getData();
    },
    handleCurrentChangeTea(val) {
      this.teacherPage = val - 1;
      this.getData();
    },
    //按老师导出
    exportTeacher() {
      if (!this.dataList.length) {
        this.$message.warning("未查询出数据，无法导出");
        return false;
      }
      let dataLink = this.GlobalVal.httpLink.exportTeacherSalary + "?";
      for (let i in this.objData) {
        this.objData[i] &&
          i !== "page" &&
          i !== "limit" &&
          (dataLink += i + "=" + this.objData[i] + "&");
      }
      window.open(dataLink);
    }
  }
};
</script>
<style scoped>
.handle-box {
  margin: 10px 0px 20px;
}
.handle-box span {
  font-size: 14px;
  font-weight: 600;
}
.search-warp {
  margin: 0px 5px;
  display: inline-block;
}
.search-warp .el-input-group__prepend {
  border-radius: 0px !important;
}
.export {
  float: right;
  margin-right: 20px;
}
.export span {
  margin-right: 20px;
  line-height: 30px;
  font-size: 16px;
}
/* 教师详情*/
.teacherPay {
  display: flex;
  justify-content: flex-start;
  list-style: none;
  margin-bottom: 20px;
}
.teacherPay li {
  height: 80px;
  flex: 1;
  background: #f5f5f5;
  margin-right: 10px;
  padding-left: 20px;
}
.teacherPay li:nth-of-type(2) {
  display: flex;
}
.teacherPay li:first-child {
  line-height: 80px;
}
.teacherPay li:nth-of-type(2) span {
  margin-top: 20px;
  margin-right: 20px;
}
.teacherPay li:nth-of-type(2) span b {
  line-height: 16px;
  display: block;
}
.teacherPay li:nth-of-type(3) {
  flex: 2;
}
.teacherPay li:nth-of-type(3) p:first-child {
  margin-top: 20px;
  line-height: 16px;
}
.teacherPay li:last-child {
  background: none;
  line-height: 80px;
  text-align: right;
}
/* 校区课酬详情 */
.compusPay {
  display: flex;
  height: 30px;
  justify-content: flex-start;
  list-style: none;
  margin-bottom: 20px;
}
.compusPay li {
  height: 30px;
  flex: 1;
  margin-right: 10px;
}
.compusPay li:first-child {
  background: #f5f5f5;
  line-height: 30px;
  padding-left: 20px;
}
.compusPay li:last-child {
  text-align: end;
}
.compusPay li:last-child span {
  font-weight: 700;
  font-size: 16px;
  padding-right: 20px;
}
</style>
<style>
.el-input-group__append,
.el-input-group__prepend {
  border-radius: 0px !important;
}
.el-input-group__prepend {
  border-radius: 0px !important;
}
.el-tabs__item {
  text-align: center;
  font-size: 16px;
}
</style>
