<template>
    <div class="progress">
        <el-progress :text-inside="true" :stroke-width="18" :percentage="num"></el-progress>
    </div>
</template>

<script>
export default {
  props: ["num"],
};
</script>

<style>
.progress {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99999;
  width: 350px;
  margin-top: 35px;
}
.progress .el-progress-bar__outer {
  background: rgba(0, 0, 0, 0.4) !important;
}
.progress .el-progress-bar__inner{
  transition: all .3s;
}
</style>
