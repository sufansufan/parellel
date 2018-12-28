<template>
  <div class="sing-query-box">
    <div class="select-option">
      <div>
        <el-date-picker size="mini" v-model="daterange" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
        </el-date-picker>
      </div>
      <div>
        <el-cascader clearable size="mini" change-on-select expand-trigger="click" :options="location" v-model="selectedLocation" placeholder="学校不限" style="width:200px;">
        </el-cascader>
      </div>
      <div>
        <el-button size="mini" type="primary" @click="exportList">导出</el-button>
      </div>

    </div>
    <div class="table-list">
      <el-table size="mini" :data="dataList" stripe style="width: 100%" v-loading="loading">
        <el-table-column prop="organ_name" label="校区"></el-table-column>
        <el-table-column prop="class_id" label="班级ID"></el-table-column>
        <el-table-column prop="class_name" label="班级名称"></el-table-column>
        <el-table-column prop="periods" label="期别"></el-table-column>
        <el-table-column prop="leave_not_mend_register" label="请假未签到"></el-table-column>
        <el-table-column prop="absent_not_mend_register" label="旷课未签到"></el-table-column>
        <el-table-column prop="non_arrival_number" label="未签到"></el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :current-page="page + 1" :total="count" :page-size="limit" :page-sizes="[10,20,30,50]">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      limit: 10,
      page: 0,
      count: 0,
      startDate:
        new Date().getTime() - 3600 * 1000 * 24 * (new Date().getDate() - 1),
      endDate: new Date().getTime(),
      daterange: [
        new Date().getTime() - 3600 * 1000 * 24 * (new Date().getDate() - 1),
        new Date()
      ],
      loading: true,
      selectedLocation: [],
      dataList: [],
      objData: {},
      organ_id: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
  created() {
    this.Util.querySysconst(this, "009", this.$store.state.PeriodsOptions);
    this.Util.queryAreaNav(this, -1, () => this.getData());
    this.location = this.$store.state.location;
  },
  watch: {
    selectedLocation(o, n) {
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
        this.organ_id = "";
        this.page = 0;
        this.getData();
      }
    },
    daterange() {
      if (this.daterange) {
        this.startDate = new Date(this.daterange[0]).getTime();
        this.endDate = new Date(this.daterange[1]).getTime();
      } else {
        this.startDate = "";
        this.endDate = "";
      }
      this.getData();
      this.page = 0;
    }
  },
  methods: {
    getData() {
      this.loading = true;
      this.objData = {
        page: this.page,
        limit: this.limit,
        source: this.GlobalVal.constants.source,
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        startDate: this.startDate,
        endDate: this.endDate,
        organ_id:
          this.organ_id ||
          JSON.parse(window.sessionStorage.getItem("staff")).staffOrganId
      };
      this.$axios
        .post(
          this.GlobalVal.httpLink.findSignInList,
          JSON.stringify(this.objData)
        )
        .then(
          res => {
            if (res.data.code === "10000") {
              this.loading = false;
              this.dataList = res.data.data.list;
              this.dataList.map(item => {
                item.periods = this.Util.GetLabelForValue(
                  this.$store.state.PeriodsOptions,
                  item.periods
                );
              });
              this.count = res.data.data.count;
              if (this.dataList.length === 0 && this.count === 0) {
                this.$nextTick(() => {
                  let tablEmpty = document.querySelector(
                    ".el-table__empty-block"
                  );
                  let img = new Image();
                  img.setAttribute("src", "../../../static/img/finish.png");
                  if (tablEmpty.children.length === 1) {
                    tablEmpty.append(img);
                  }
                });
              }
            } else {
              this.loading = false;
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
    handleSizeChange(val) {
      this.limit = val;
      this.getData();
    },
    //翻页
    handleCurrentChange(val) {
      this.page = val - 1;
      this.getData();
    },
    exportList() {
      this.objData.startDate = this.Util.TimeCycle(this.startDate);
      this.objData.endDate = this.Util.TimeCycle(this.endDate);
      this.$exportExcel({
        dataList: this.dataList,
        objData: this.objData,
        httpUrl: "exportSignInList",
        title: this.$route.meta.title
      });
    }
  }
};
</script>

<style scoped>
.sing-query-box {
  padding: 20px;
}
.table-list {
  margin-top: 20px;
}
.sing-query-box .select-option {
  display: flex;
  flex-wrap: wrap;
}
.sing-query-box .select-option > div {
  margin-right: 5px;
}
</style>
<style>
.table-list .el-table__empty-block img {
  width: 30%;
  height: 500px;
  margin-top: -50px;
}
</style>
