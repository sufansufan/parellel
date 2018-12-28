<template>
  <div class="change-record">
    <div>
      <Refund-title-list>
        <ul>
          <li v-for="(item, index) in titleType" :key="index">
              <span>●</span>
              <div>
                <p>{{item.label}}</p>
                <p>￥ {{ activeName === 'sum' ? titleData[item.value] : titleDetails[item.value] }}</p>
              </div>
          </li>
        </ul>
      </Refund-title-list>
    </div>
    <div>
      <el-tabs v-model="activeName">
          <el-tab-pane label="变动汇总" name="sum">
            <Change-summary changeLink="sum" @getTitleData="getTitleData"></Change-summary>
          </el-tab-pane>
          <el-tab-pane label="变动明细" name="detail">
            <Change-summary changeLink="detail" @getTitleData="getTitleData"></Change-summary>
          </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    ChangeSummary: resolve => require(["./ChangeSummary"], resolve),
    RefundTitleList: resolve => require(["./RefundTitleList"], resolve)
  },
  data() {
    return {
      activeName: "sum",
      titleData: {},
      titleDetails: {},
      titleType: [
        {
          label: "总收入变动",
          value: "overallVariation"
        },
        {
          label: "课程收入变动",
          value: "courseVariation"
        },
        {
          label: "其他收费变动",
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
        }
      ]
    };
  },
  methods: {
    getTitleData(type, param) {
      type === "sum" ? (this.titleData = param) : (this.titleDetails = param);
    }
  }
};
</script>

<style scoped>
.change-record {
  padding: 20px;
}
</style>
<style>
.change-record .el-tabs__header {
  margin: 0px 0px 22px;
}
</style>

