<template>
    <div class ="financial-box">
      <Refund-title-list>
        <ul>
          <li v-for="(item, index) in titleType" :key="index">
              <span>●</span>
              <div>
                <p>{{item.label}}</p>
                <p><b v-if="item.type">￥</b>{{dataTitle[item.value]}}</p>
              </div>
          </li>
        </ul>
      </Refund-title-list>
      <el-tabs v-model="activeName">
        <el-tab-pane label="按班级" name="class">
          <FinancialClass ref="financialClass" @getTitleData="getTitleData"></FinancialClass>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>
<script>
export default {
  components: {
    // FinancialCampus: resolve => require(["./FinancialCampus"], resolve),
    FinancialClass: resolve => require(["./FinancialClass"], resolve),
    RefundTitleList: resolve => require(["./RefundTitleList"], resolve)
  },
  data() {
    return {
      activeName: "class",
      dataTitle: {},
      titleType: [
        {
          label: "总收入",
          value: "all_real_payment",
          type: "money"
        },
        {
          label: "实退款总额",
          value: "all_refund_amount",
          type: "money"
        },
        {
          label: "确认总收入",
          value: "all_confirm_amount",
          type: "money"
        },
        {
          label: "剩余总额",
          value: "all_left_amount",
          type: "money"
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
      this.dataTitle = param;
    }
  }
};
</script>

<style scoped>
.financial-box {
  padding: 20px;
}
</style>
<style>
.financial-box .el-tabs__header {
  margin: 0px 0px 22px;
}
.financial-box .el-tabs__item {
  line-height: 29px;
  font-size: 16px;
  height: auto;
}
</style>
