<template>
  <div class="table">
    <el-tabs v-model="actionName">
      <el-tab-pane label="跨财务主体转班" name="changeFinance">
        <CrossCampusChangeClasses></CrossCampusChangeClasses>
      </el-tab-pane>
      <el-tab-pane label="跨校区转班" name="changeClass">
        <CrossCampusChangeClasses :crossCampus="false"></CrossCampusChangeClasses>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CrossCampusChangeClasses from "./CrossCampusChangeClasses";
export default {
  components: {
    CrossCampusChangeClasses
  },
  data() {
    return {
      limit: 10,
      page: 0,
      count: 0,
      actionName: "changeFinance"
    };
  }
};
</script>

<style scoped>
.oldClass {
  display: inline;
}
.oldClass b {
  display: block;
  margin: 10px 0px;
  font-size: 16px;
}
</style>
