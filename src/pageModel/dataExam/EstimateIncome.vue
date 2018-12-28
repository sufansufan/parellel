<template>
  <div>
    <div class="select-tools">
      <div>
        <el-cascader clearable size="mini" change-on-select expand-trigger="click" :options="location" v-model="selectedLocation" placeholder="学校不限">
        </el-cascader>
      </div>
      <div>
        <el-select clearable v-model="options.particular_year" size="mini" placeholder="年度">
          <el-option v-for="item in $store.state.YearOptions" :key="item.code" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <el-select clearable v-model="options.season" placeholder="选择季节" size="mini">
          <el-option v-for="item in $store.state.SeasonOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <el-select clearable v-model="options.grade" placeholder="选择年级" size="mini">
          <el-option v-for="item in $store.state.GradeOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <el-select clearable v-model="options.subject" placeholder="选择科目" size="mini">
          <el-option v-for="item in $store.state.SubjectOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <el-button type="primary" size="mini" @click="search">搜索</el-button>
      </div>
      <div>
        <el-button type="primary" size="mini" @click="resetSelect">重置搜索条件</el-button>
      </div>
    </div>
    <ve-bar :data="chartData" :settings="chartSettings" v-loading="loading" :legend-visible="false" ref="chartsBar"></ve-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      location: [],
      selectedLocation: [],
      options: {
        particular_year: "",
        season: "",
        grade: "",
        subject: ""
      },
      chartData: {
        columns: ["cmonth", "confirmincome"]
      },
      chartSettings: {
        labelMap: {
          confirmincome: "预估确认收入"
        }
      }
    };
  },
  created() {
    this.location = this.$store.state.location;
    this.getData();
  },
  methods: {
    search() {
      this.getData();
    },
    resize() {
      this.$nextTick(() => {
        this.$refs.chartsBar.echarts.resize();
      });
    },
    getData() {
      const params = Object.assign(
        {},
        {
          staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
          source: "PC",
          organ_id:
            this.selectedLocation[this.selectedLocation.length - 1] || ""
        },
        this.options
      );
      this.loading = true;
      this.$axios
        .post(
          this.GlobalVal.httpLink.listFinancialEstimateConfirmIncome,
          params
        )
        .then(res => {
          this.loading = false;
          this.$set(this.chartData, "rows", res.data.data.confirmIncomes);
        })
        .catch(() => {
          this.loading = false;
        });
    },
    resetSelect() {
      this.selectedLocation = [];
      this.options = {
        particular_year: "",
        season: "",
        grade: "",
        subject: ""
      };
      this.getData();
    }
  }
};
</script>

<style scoped>
.select-tools {
  display: flex;
  flex-flow: wrap;
  margin-bottom: 5px;
}
.select-tools > div {
  margin: 0 10px 10px 0;
}
.select-tools .el-input--mini .el-input__inner {
  height: 30px !important;
}
</style>
