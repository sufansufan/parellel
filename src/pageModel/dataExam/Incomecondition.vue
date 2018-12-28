<template>
    <div class="income-condition">
        <div>
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
        <div class="income-condition-box">
          <el-tabs v-model="activeName">
            <el-tab-pane label="按市级" name="cityLevel">
              <IncomeList incomeLink="cityLevel" @getTitleData="getTitleData"></IncomeList>
            </el-tab-pane>
            <el-tab-pane label="按校区" name="campus">
              <IncomeList incomeLink="campus" @getTitleData="getTitleData"></IncomeList>
            </el-tab-pane>
          </el-tabs>
        </div>
    </div>
</template>
<script>
import IncomeList from "./IncomeList";
import RefundTitleList from "./RefundTitleList";
export default {
  components: {
    IncomeList,
    RefundTitleList
  },
  data() {
    return {
      objData: {},
      activeName: "cityLevel",
      dataTitle: {},
      dataCampusTitle: {},
      titleType: [
        {
          label: "总收入",
          value: "signup_income",
          type: "money"
        },
        {
          label: "课程收入",
          value: "signup_fee",
          type: "money"
        },
        {
          label: "其他收费",
          value: "other_fee",
          type: "money"
        },
        {
          label: "课程退费",
          value: "refund_fee",
          type: "money"
        },
        {
          label: "其他退费",
          value: "other_refund_fee",
          type: "money"
        },
        {
          label: "报名总人数",
          value: "signup_stu_count"
        },
        {
          label: "报名总人次",
          value: "count_signup_stu"
        },
        {
          label: "退费总人数",
          value: "refund_stu_count"
        },
        {
          label: "退费总人次",
          value: "count_refund_stu"
        }
      ]
    };
  },
  methods: {
    getTitleData(type, param) {
      type === "cityLevel"
        ? (this.dataTitle = param)
        : (this.dataCampusTitle = param);
    }
  }
};
</script>
<style scoped>
.income-condition {
  padding: 20px;
}
</style>
<style>
.income-condition-box .el-tabs__item {
  font-size: 16px;
}
.income-condition .refund-title-list .handle-box > ul > li {
  width: 143px;
}
.income-condition .el-tabs__header {
  margin: 0px 0px 22px;
}
</style>




