<template>
  <div class="table">
    <el-tabs v-model="activeName">
      <el-tab-pane label="教师级别" name="teacherLevel">
        <TeacherLevelMan ref="teacherLevel"></TeacherLevelMan>
      </el-tab-pane>
      <el-tab-pane label="级别管理" name="levelMan">
        <LevalMan @levelMan="levelMan"></LevalMan>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  components: {
    TeacherLevelMan: resolve => require(["./TeacherLevelMan"], resolve),
    LevalMan: resolve => require(["./LevelMan"], resolve)
  },
  data() {
    var checkNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("课酬不能为空"));
      }
      console.log(value);
      setTimeout(() => {
        if (isNaN(value)) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }, 500);
    };

    return {
      activeName: "teacherLevel"
    };
  },
  methods: {
    levelMan() {
      // this.$refs.teacherLevel.getData();
    }
  }
};
</script>

<style scoped>
</style>
