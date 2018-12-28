<template>
  <div class="home-page">
    <div class="home-page-top">
      <div class="weather">天气</div>
      <div class="message">
        <el-tabs v-model="activeName">
          <el-tab-pane label="转班通知" name="zbtz">转班通知</el-tab-pane>
          <el-tab-pane label="调课通知" name="tktz">调课通知</el-tab-pane>
        </el-tabs>
      </div>
      <div class="refund-situation">退款情况</div>
    </div>
    <div class="charts">图表</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "zbtz"
    };
  }
};
</script>

<style scoped>
.home-page {
  padding: 20px;
}
.home-page .home-page-top {
  display: flex;
}
.home-page .home-page-top > div {
  flex: 1;
  background: #fff;
  margin-right: 20px;
  margin-bottom: 20px;
  height: 330px;
  padding: 10px 20px;
}
.home-page .home-page-top .refund-situation {
  margin: 0;
}
.home-page .charts {
  background: #fff;
  padding: 20px;
}
</style>
