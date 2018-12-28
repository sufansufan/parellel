<template>
  <div class="refund-record">
    <el-tabs v-model="activeName">
      <el-tab-pane label="退费单" name="refundOrder">
        <RefundOrder></RefundOrder>
      </el-tab-pane>
      <el-tab-pane label="报名退费" name="applyRefund">
        <RefundTable :studentId="$route.query.sid">
          <template slot="selectOptions">{{null}}</template>
        </RefundTable>
      </el-tab-pane>
      <el-tab-pane label="其他退费" name="otherRefund">
        <OtherRefund :studentId="$route.query.sid">
          <template slot="selectOptions">{{null}}</template>
        </OtherRefund>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  components: {
    RefundOrder: resolve => require(["./RefundOrder"], resolve),
    RefundTable: resolve => require(["../dataExam/RefundTable"], resolve),
    OtherRefund: resolve => require(["../dataExam/OtherRefund"], resolve)
  },
  data() {
    return {
      activeName: "refundOrder"
    };
  }
};
</script>

<style scoped>
.refund-record {
  background: #fff;
  margin-top: 10px;
  padding: 5px 20px 20px;
}
</style>
