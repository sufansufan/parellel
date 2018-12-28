<template>
  <div class="financial-statistics">
    <div v-if="activeName === 'cityLevel' || activeName === 'campus'">
      <Refund-title-list>
        <ul>
          <li v-for="(item, index) in titleType" :key="index">
            <span>●</span>
            <div>
              <p>{{item.label}}</p>
              <p><b v-if="item.type">￥</b>{{activeName === 'cityLevel' ? dataTitle[item.value] : dataCampusTitle[item.value]}}</p>
            </div>
          </li>
        </ul>
      </Refund-title-list>
    </div>
    <el-tabs v-model="activeName" @tab-click="getEcharts">
      <el-tab-pane label="按市级" name="cityLevel">
        <Financial-city @getTitleData="getTitleData" linkFinancal="cityLevel"></Financial-city>
      </el-tab-pane>
      <el-tab-pane label="按校区" name="campus">
        <Financial-city @getTitleData="getTitleData" linkFinancal="campus"></Financial-city>
      </el-tab-pane>
      <el-tab-pane label="预估确认收入" name="estimateIncome">
        <EstimateIncome ref="echartsBarComp"></EstimateIncome>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  components: {
    FinancialCity: resolve => require(["./FinancialCity"], resolve),
    RefundTitleList: resolve => require(["./RefundTitleList"], resolve),
    EstimateIncome: resolve => require(["./EstimateIncome"], resolve)
  },
  data() {
    return {
      activeName: "cityLevel",
      dataTitle: {},
      dataCampusTitle: {},
      titleType: [
        {
          label: "总收入",
          value: "total_payment",
          type: "money"
        },
        {
          label: "课程收入",
          value: "class_payment",
          type: "money"
        },
        {
          label: "其他收费",
          value: "other_payment",
          type: "money"
        },
        {
          label: "课程退费",
          value: "class_refund",
          type: "money"
        },
        {
          label: "其他退费",
          value: "other_refund",
          type: "money"
        },
        {
          label: "报名总人数",
          value: "applyPersonNumber"
        },
        {
          label: "报名总人次",
          value: "applyPersonTime"
        },
        {
          label: "退费总人数",
          value: "refundPersonNumber"
        },
        {
          label: "退费总人次",
          value: "refundPersonTime"
        }
      ]
    };
  },
  methods: {
    income(campusId) {
      this.activeName = "class";
      this.$refs.financialClass.getData("clearPage", campusId);
    },
    getTitleData(type, param) {
      type === "cityLevel"
        ? (this.dataTitle = param)
        : (this.dataCampusTitle = param);
    },
    getEcharts(tab) {
      if (tab.name === "estimateIncome") this.$refs.echartsBarComp.resize();
    }
  }
};
</script>

<style scoped>
.financial-statistics {
  padding: 20px;
}
</style>
<style>
.financial-statistics .el-tabs__header {
  margin: 0px 0px 22px;
}
.financial-statistics .el-tabs__item {
  line-height: 29px;
  font-size: 16px;
  height: auto;
}
.financial-statistics .refund-title-list .handle-box > ul > li {
  width: 143px;
}
</style>
