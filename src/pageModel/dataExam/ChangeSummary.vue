<template>
  <div class="change-summary">
    <div class="select-option">
      <div>
        <el-date-picker clearable v-model="happenDate" type="month" placeholder="选择发生月" size="mini"></el-date-picker>
      </div>
      <div>
        <el-cascader clearable size="mini" change-on-select expand-trigger="click" :options="location" v-model="selectedLocation" placeholder="学校不限">
        </el-cascader>
      </div>
      <div>
        <el-select clearable v-model="financeAdjustType" size="mini" placeholder="类型不限">
          <el-option v-for="item in $store.state.FinanceAdjustType" :key="item.code" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <el-date-picker clearable v-model="influenceDate" type="month" placeholder="选择影响月" size="mini"></el-date-picker>
      </div>
      <div>
        <el-button type="primary" size="mini" @click="exportChangeRecord">导出</el-button>
      </div>
    </div>
    <div class="table-list">
      <el-table size="mini" :data="dataList" border stripe style="width: 100%" v-loading="loading" v-if="changeLink === 'sum'">
        <el-table-column label="修改月份">
          <template slot-scope="scope">
            {{editDate}}
          </template>
        </el-table-column>
        <el-table-column prop="organ_name" label="校区"></el-table-column>
        <el-table-column label="类型">
          <template slot-scope="scope">
            <ul class="table-type">
              <li v-for="(item, index) in scope.row.variationList" :key="item.label" :style="{'line-height': calc(scope.row.variationList[index].influenceDateList.length),'height': calc(scope.row.variationList[index].influenceDateList.length)}">{{item.type}}</li>
            </ul>
          </template>
        </el-table-column>
        <el-table-column v-for="(itemType, index) in changeSummaryType" :key="index" :label="itemType.label">
          <template slot-scope="scope">
            <ul class="table-sign" v-for="(item, index) in scope.row.variationList" :key="index" :style="{'height': calc(scope.row.variationList[index].influenceDateList.length)}">
              <li v-for="(item, num) in scope.row.variationList[index].influenceDateList" :key="num">{{item[itemType.value] | numFixed}}</li>
              <li v-if="scope.row.variationList[index].influenceDateList.length === 0">{{itemType.value === "infuenceDate" ? '' : '0.00'}}</li>
            </ul>
          </template>
        </el-table-column>
      </el-table>
      <el-table size="mini" :data="dataList" stripe style="width: 100%" v-loading="loading" v-if="changeLink === 'detail'">
        <el-table-column prop="adjust_date" label="修改时间"></el-table-column>
        <el-table-column prop="id" label="变动记录ID" width="100px"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="table_id" label="操作ID"></el-table-column>
        <el-table-column prop="staff_name" label="操作人"></el-table-column>
        <el-table-column prop="organ_name" label="校区"></el-table-column>
        <el-table-column prop="class_name" label="班级名称" width="280px"></el-table-column>
        <el-table-column prop="classsequence" label="课次"></el-table-column>
        <el-table-column prop="student_name" label="学员姓名" width="100px"></el-table-column>
        <el-table-column prop="original_status" label="原始状态" width="150px"></el-table-column>
        <el-table-column prop="current_status" label="现状态" width="150px"></el-table-column>
        <el-table-column label="原实付金额" width="120px">
          <template slot-scope="scope">
            {{scope.row.original_amount | numFixed}}
          </template>
        </el-table-column>
        <el-table-column label="现实付金额" width="120px">
          <template slot-scope="scope">
            {{scope.row.current_amount | numFixed}}
          </template>
        </el-table-column>
        <el-table-column label="原确认收入" width="120px">
          <template slot-scope="scope">
            {{scope.row.current_amount_sign | numFixed}}
          </template>
        </el-table-column>
        <el-table-column width="120px" label="现确认收入">
          <template slot-scope="scope">
            {{scope.row.refund_amount_sign | numFixed}}
          </template>
        </el-table-column>
        <el-table-column label="退费金额">
          <template slot-scope="scope">
            {{scope.row.refund_amount | numFixed}}
          </template>
        </el-table-column>
        <el-table-column v-for="(itemDet, index) in changeSummarydetials" :key="index" :label="itemDet.label" :width="itemDet.width">
          <template slot-scope="scope">
            <ul class="table-sign">
              <li v-for="item in scope.row.influenceDateList" :key="item.label">{{item[itemDet.value] | numFixed}}</li>
            </ul>
          </template>
        </el-table-column>
        <el-table-column label="操作" v-if="financeAdjustType === '03304'">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="exportDetails(scope.row)">导出</el-button>
          </template>
        </el-table-column>
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
  props: ["changeLink"],
  data() {
    return {
      limit: 10,
      page: 0,
      count: 0,
      dataTitle: {},
      objData: {},
      selectedLocation: [],
      dataList: [],
      loading: true,
      financeAdjustType: "",
      editDate: "",
      happenDate: new Date(),
      influenceDate: "",
      changeSummaryType: [
        {
          label: "课程收入变动",
          value: "courseVariation"
        },
        {
          label: "其他收入变动",
          value: "otherVariation"
        },
        {
          label: "课程确认收入变动",
          value: "courseConfirmVariation"
        },
        {
          label: "其他确认收入变动",
          value: "otherConfirmVariation"
        },
        {
          label: "课程退费变动",
          value: "courseRefundVariation"
        },
        {
          label: "影响月份",
          value: "infuenceDate"
        }
      ],
      changeSummarydetials: [
        {
          label: "课程收入变动",
          value: "courseVariation",
          width: "120px"
        },
        {
          label: "其他收入变动",
          value: "otherVariation",
          width: "120px"
        },
        {
          label: "课程确认收入变动",
          value: "courseConfirmVariation",
          width: "180px"
        },
        {
          label: "其他确认收入变动",
          value: "otherConfirmVariation",
          width: "160px"
        },
        {
          label: "课程退费变动",
          value: "courseRefundVariation",
          width: "120px"
        },
        {
          label: "影响月份",
          value: "infuenceDate",
          width: "100px"
        }
      ]
    };
  },
  created() {
    this.location = this.$store.state.location;
    this.Util.queryAreaNav(this, -1, () => this.getData());
  },
  filters: {
    numFixed(val) {
      if (/[\u4e00-\u9fa5]/.test(val)) {
        return val;
      } else {
        const price = val !== null ? +val : 0;
        return price.toFixed(2);
      }
    }
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
    happenDate() {
      this.page = 0;
      this.getData();
    },
    influenceDate() {
      this.page = 0;
      this.getData();
    },
    financeAdjustType() {
      this.page = 0;
      this.getData();
    },
    dataTitle() {
      for (const key in this.dataTitle) {
        this.dataTitle[key] = this.dataTitle[key].toLocaleString();
      }
    }
  },
  methods: {
    getData() {
      this.loading = true;
      this.objData = {
        limit: this.limit,
        page: this.page,
        source: this.GlobalVal.constants.source,
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        happenDate: (this.happenDate && this.happenDate.getTime()) || "",
        influenceDate:
          (this.influenceDate && this.influenceDate.getTime()) || "",
        organ_id:
          this.organ_id ||
          JSON.parse(window.sessionStorage.getItem("staff")).staffOrganId,
        type: this.financeAdjustType
      };
      this.$axios
        .post(
          this.changeLink === "sum"
            ? this.GlobalVal.httpLink.getFinanceChangeSummaryInfo
            : this.GlobalVal.httpLink.getFinanceChangeSummaryInfoDetails,
          JSON.stringify(this.objData)
        )
        .then(
          res => {
            if (res.data.code === "10000") {
              this.dataList = res.data.data.variationInfo.list;
              this.dataTitle = res.data.data.variationInfo.statistic;
              this.editDate = res.data.data.variationInfo.editDate;
              this.count = res.data.data.variationInfo.count;
              if (this.changeLink === "sum") {
                this.dataList.forEach(item =>
                  item.variationList.map(
                    item =>
                      (item.type = this.Util.GetLabelForValue(
                        this.$store.state.FinanceAdjustType,
                        item.type
                      ))
                  )
                );
              } else {
                this.dataList.map(item => {
                  item.original_status = this.statusChange(
                    item.original_status
                  );
                  item.current_status = this.statusChange(item.current_status);
                  item.type = this.Util.GetLabelForValue(
                    this.$store.state.FinanceAdjustType,
                    item.type
                  );
                  return item;
                });
              }
              this.$emit("getTitleData", this.changeLink, this.dataTitle);
            } else {
              this.$message({
                type: "error",
                message: res.data.errmsg
              });
            }
            this.loading = false;
          },
          res => {
            this.$message("请求失败");
            this.loading = false;
          }
        )
        .catch(error => {
          this.loading = false;
        });
    },
    handleSizeChange(val) {
      this.limit = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.page = val - 1;
      this.getData();
    },
    calc(val) {
      if (val === 0) {
        return "35px";
      } else {
        return 35 * val + "px";
      }
    },
    exportChangeRecord() {
      this.objData.happenDate = this.Util.TimeCycle(
        this.objData.happenDate,
        "ym"
      );
      this.objData.influenceDate = this.Util.TimeCycle(
        this.objData.influenceDate,
        "ym"
      );
      this.$exportExcel({
        dataList: this.dataList,
        objData: this.objData,
        httpUrl:
          this.changeLink === "sum"
            ? "exportFinanceChangeSummaryInfo"
            : "exportFinanceChangeSummaryInfoDetails",
        title: this.$route.meta.title
      });
    },
    statusChange(val) {
      if (val !== null) {
        if (!/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/.test(val)) {
          const statusArr = val.split(";");
          val = this.Util.GetLabelForValue(
            this.$store.state.rollCallStatus,
            statusArr[0]
          );
          if (statusArr.length > 1 && statusArr[1] !== undefined) {
            val += "；" + (statusArr[1] === "true" ? "补签" : "未补签");
          }
          return val;
        } else {
          return val;
        }
      }
    },
    exportDetails(row) {
      let obj = {
        staffId: this.objData.staffId,
        order_id: row.order_id,
        happenDateString: row.adjust_date
      };
      this.$exportExcel({
        dataList: this.dataList,
        objData: obj,
        httpUrl: "exportSignInRecord",
        title: this.$route.meta.title
      });
    }
  }
};
</script>

<style scoped>
.select-option {
  display: flex;
  flex-wrap: wrap;
}
.select-option > div {
  margin-right: 5px;
}
.select-option .el-date-picker,
.select-option .el-select,
.select-option .el-cascader {
  margin-bottom: 20px;
}
/* table */
.table-type {
  width: 100%;
  height: auto;
  box-sizing: border-box;
}
.table-type li {
  width: 100%;
  box-sizing: border-box;
  line-height: 35px;
  height: 35px;
  border-bottom: 1px solid #ebeef5;
}
.table-type li:last-child {
  border-bottom: none;
}
.table-sign {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  border-bottom: 1px solid #ebeef5;
}
.table-sign:last-child {
  border-bottom: none;
}
.table-sign li {
  width: 100%;
  height: 35px;
  line-height: 35px;
  box-sizing: border-box;
  color: #616266;
  border-bottom: 1px solid #ebeef5;
}
.table-sign li:last-child {
  border-bottom: none;
}
</style>
<style>
.change-summary .table-list .el-table td,
.change-summary .table-list .el-table th.is-leaf {
  border-bottom: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
}
.change-summary .table-list .el-table .cell {
  padding-left: 0px;
  padding-right: 0px;
}
.change-summary .table-list .el-table--mini td {
  padding: 0px 0px;
}
</style>
