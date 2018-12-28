<template>
  <div class="pay-campus">
    <div class="handle-box">
      <div>
        <el-date-picker clearable v-model="belongedDate" type="month" placeholder="请选择年月" size="mini">
        </el-date-picker>
      </div>
      <div>
        <el-cascader clearable size="mini" change-on-select expand-trigger="click" :options="location" v-model="selectedLocation" placeholder="学校不限">
        </el-cascader>
      </div>
      <div>
        <el-button type="primary" size="mini" @click="getData({})">搜索</el-button>
      </div>
      <div class="export">
        <el-button size="mini" type="primary" @click="exportCampus">导出</el-button>
      </div>
    </div>
    <div class="pay-table">
      <el-table size="mini" :data="dataList" stripe style="width: 100%" v-loading="loading">
        <el-table-column prop="belongedDate" label="课时归属年月" width="150"></el-table-column>
        <el-table-column prop="schoolName" label="大区"></el-table-column>
        <el-table-column prop="branchSchoolName" label="市"></el-table-column>
        <el-table-column prop="campusName" label="校区" width="120"></el-table-column>
        <el-table-column prop="highSchool" label="高中课次"></el-table-column>
        <el-table-column prop="bigClassCount" label="大班课次"></el-table-column>
        <el-table-column prop="smallClassCount" label="小班课次"></el-table-column>
        <el-table-column prop="dollars" label="课酬"></el-table-column>
        <el-table-column prop="compulsoryHour" label="义务课次数" width="100"></el-table-column>
        <el-table-column prop="salary" label="实际课酬"></el-table-column>
        <el-table-column prop="preSignNumber" label="应签总数" width="150"></el-table-column>
        <el-table-column prop="teachPeople" label="授课人次"></el-table-column>
        <el-table-column prop="actualSignNumber" label="签到"></el-table-column>
        <el-table-column prop="lateNumber" label="迟到"></el-table-column>
        <el-table-column prop="leaveNumber" label="请假"></el-table-column>
        <el-table-column prop="truantNumber" label="旷课"></el-table-column>
        <el-table-column prop="mendRegisterNumber" label="补签"></el-table-column>
        <el-table-column prop="notArriveNumber" label="未签到"></el-table-column>
        <el-table-column label="操作">
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
  data() {
    return {
      page:
        (this.$store.state.PayMoneyCampus &&
          this.$store.state.PayMoneyCampus.page * 1) ||
        0,
      limit: 10,
      count: 0,
      belongedDate:
        (this.$store.state.PayMoneyCampus &&
          this.$store.state.PayMoneyCampus.belongedDate) ||
        new Date(),
      dataList: [],
      selectedLocation: [],
      organId: "",
      loading: true
    };
  },
  watch: {
    belongedDate() {
      this.page = 0;
      this.getData();
    },
    selectedLocation: function(o, n) {
      if (this.selectedLocation.length >= 0) {
        if (o[o.length - 1] !== n[n.length - 1]) {
          this.organId = o[o.length - 1];
          this.page = 0;
        }
      }
    }
  },
  created() {
    this.Util.queryAreaNav(this, -1, () => {});
    this.location = this.$store.state.location;
    this.$store.state.PayMoneyCampus
      ? this.getData(this.$store.state.PayMoneyCampus)
      : this.getData();
  },
  updated() {
    this.$store.commit("setPayMoneyCampus", {});
    this.$refs.pagination.internalCurrentPage = this.page + 1;
    /* for (
      let i = 0;
      i < this.$refs.pagination.$children[4].$el.children.length;
      i++
    ) {
      this.$refs.pagination.$children[4].$el.children[i].classList.remove(
        "active"
      );
    }
    this.$refs.pagination.$children[4].$el.children[
      this.$refs.pagination.$children[4].$el.children.length === 8
        ? this.page
        : 4
    ].classList.add("active"); */
  },
  methods: {
    getData(data) {
      this.objData = {
        limit: this.limit,
        page: this.page,
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        source: this.GlobalVal.constants.source,
        belongedDate: this.Util.TimeCycle(
          new Date(this.belongedDate).getTime(),
          "ym"
        ),
        organId:
          this.organId ||
          JSON.parse(window.sessionStorage.getItem("staff")).staffOrganId
      };
      this.loading = true;
      this.$axios
        .post(
          this.GlobalVal.httpLink.listTeacherSalaryByCampus,
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
      this.$store.commit("setPayMoneyCampus", this.objData);
      this.$router.push({
        path: "/campusPayDetails",
        query: {
          type: "campus"
        }
      });
    },
    exportCampus() {
      this.$exportExcel({
        dataList: this.dataList,
        objData: this.objData,
        httpUrl: "exportTeacherSalaryByCampus",
        title: this.$route.meta.title
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
