<template>
  <div class="signRecord">
    <div v-if="!signSearch">
      <el-select clearable v-model="particular_year" size="mini" placeholder="年度" style="width:131px;">
        <el-option v-for="item in $store.state.YearOptions" :key="item.code" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select clearable v-model="season" size="mini" placeholder="季节" style="width:132px;">
        <el-option v-for="item in $store.state.SeasonOptions" :key="item.code" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select clearable v-model="periods" size="mini" placeholder="期别不限">
        <el-option v-for="item in $store.state.PeriodsOptions" :key="item.code" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select clearable v-model="grade" size="mini" placeholder="年级不限">
        <el-option v-for="item in $store.state.GradeOptions" :key="item.code" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select clearable v-model="subject" size="mini" placeholder="科目不限">
        <el-option v-for="item in $store.state.SubjectOptions" :key="item.code" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select clearable v-model="projectType" size="mini" placeholder="类别不限">
        <el-option v-for="item in $store.state.ProjectTypeOptions" :key="item.code" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select clearable v-model="classType" size="mini" placeholder="班型不限" style="width:234px;">
        <el-option v-for="item in $store.state.ClassTypeOptions" :key="item.code" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <div class="searchSecond">
        <el-cascader clearable size="mini" expand-trigger="click" :options="location" v-model="selectedLocation" placeholder="学校不限" change-on-select style="width:267px">
        </el-cascader>
        <el-select clearable v-model="department" size="mini" placeholder="学部">
          <el-option v-for="item in $store.state.DepartmentOptions" :key="item.code" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <div class="search-warp">
          <el-input size="mini" v-model="select_word" placeholder="请输入搜索内容" class="search-input" style="width:378px;">
            <el-select style="width: 100px;" v-model="selectTeacherOrClass" slot="prepend" placeholder="请选择">
              <el-option label="老师姓名" value="teacher"></el-option>
              <el-option label="班级" value="class"></el-option>
              <el-option label="学员姓名" value="student"></el-option>
              <el-option label="手机号" value="mobilePhone"></el-option>
            </el-select>
            <el-button class="search-btn" slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </div>
        <el-date-picker size="mini" v-model="dateRage" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
        <el-button size="mini" type="primary">重置条件</el-button>
      </div>
    </div>
    <el-form label-position="left" inline class="demo-table-expand">
      <el-form-item label="学员姓名">
        <span>{{ recordInfo.student_name }}</span>
      </el-form-item>
      <el-form-item label="学员编号">
        <span>{{ recordInfo.student_no }}</span>
      </el-form-item>
      <el-form-item label="联系电话">
        <span>{{ recordInfo.student_mobile }}</span>
      </el-form-item>
      <!-- <el-form-item label="班级名称">
            <span>{{ recordInfo.student_name }}</span>
          </el-form-item> -->
    </el-form>
    <el-table v-if="info[1]" size="mini" :data="recordSign" stripe style="width: 100%" key="record" height="600">
      <el-table-column prop="classdate" width="100" label="课次日期"></el-table-column>
      <el-table-column prop="class_sequence" label="课次"></el-table-column>
      <el-table-column prop="amount" label="确认金额"></el-table-column>
      <el-table-column prop="remark" label="备注" width="200px"></el-table-column>
      <el-table-column prop="updated_at" label="操作时间" width="150px"></el-table-column>
      <el-table-column label="是否自动确认" width="150px">
        <template slot-scope="scope">
          {{ scope.row.sysautoremend ? "是" : "否"}}
        </template>
      </el-table-column>
      <el-table-column prop="staff_name" label="操作人"></el-table-column>
    </el-table>
    <el-table v-else size="mini" :data="recordSign" stripe style="width: 100%" key="confrim" height="600">
      <el-table-column prop="class_name" label="班级名称" width="250px"></el-table-column>
      <el-table-column prop="classdate" width="100" label="课次日期"></el-table-column>
      <el-table-column prop="class_sequence" label="课次"></el-table-column>
      <el-table-column label="签到状态">
        <template slot-scope="scope">
          <el-tag v-show="scope.row.roll_call_status" :type="scope.row.roll_call_status | tagStatus" disable-transitions>{{ scope.row.roll_call_status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="补签状态" width="150px">
        <template slot-scope="scope">
          <el-tag v-show="scope.row.is_mend_register !== null" :type="scope.row.is_mend_register ? 'success' : 'info'" disable-transitions>{{ scope.row.is_mend_register ? '是' : '否' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="mend_register_time" label="补签时间" width="150px"></el-table-column>
      <el-table-column prop="mend_register_remark" label="补签备注" width="200px"></el-table-column>
      <el-table-column prop="remark" label="备注" width="200px"></el-table-column>
      <el-table-column prop="updated_at" label="操作时间" width="150px"></el-table-column>
      <el-table-column prop="staff_name" label="操作人"></el-table-column>
    </el-table>
    <!-- <div class="pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :current-page="recordPage + 1" :total="recordCount" :page-size="recordLimit" :page-sizes="[10,20,30,50]">
            </el-pagination>
        </div> -->
  </div>
</template>

<script>
export default {
  props: ["signSearch", "info"],
  data() {
    return {
      recordPage: 0,
      recordCount: 0,
      recordLimit: 10,
      recordSign: [],
      recordInfo: {}
    };
  },
  watch: {
    info: {
      handler() {
        this.getData();
      },
      deep: true
    }
  },
  created() {
    this.getData();
  },
  filters: {
    tagStatus(val) {
      switch (val) {
        case "签到":
        case "正常上课":
          return "success";
          break;
        case "迟到":
        case "转班转入":
        case "转班转出":
          return "warning";
          break;
        case "请假":
          return "info";
          break;
        case "旷课":
        case "退款":
          return "danger";
          break;
        default:
          return "info";
      }
    }
  },
  methods: {
    getData() {
      this.$axios
        .post(
          this.GlobalVal.httpLink[
            this.info[1]
              ? "listFinanceConfirmRecordByOrderId"
              : "listCheckinRecordByOrderId"
          ],
          JSON.stringify({
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            id: this.info[0]
          })
        )
        .then(({ data }) => {
          if (data.code === "10000") {
            this.recordSign = data.data[
              this.info[1]
                ? "financialConfirmationRecords"
                : "studentAttendClasses"
            ].map(item => {
              item.updated_at &&
                (item.updated_at = this.Util.TimeCycle(
                  item.updated_at,
                  "ymd hh-mm-ss"
                ));
              item.mend_register_time &&
                (item.mend_register_time = this.Util.TimeCycle(
                  item.mend_register_time,
                  "ymd hh-mm-ss"
                ));
              item.roll_call_status &&
                (item.roll_call_status = this.$store.state.rollCallStatus.find(
                  v => v.value === item.roll_call_status
                ).label);
              return item;
            });
            this.recordInfo = data.data.student;
          }
        });
    },
    handleSizeChange(val) {
      this.recordPage = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.recordPage = val - 1;
      this.getData();
    }
  }
};
</script>

<style>
.searchSecond {
  margin-top: 10px;
  margin-bottom: 20px;
}
.search-warp {
  display: inline-block;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
