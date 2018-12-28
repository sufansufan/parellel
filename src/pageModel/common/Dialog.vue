<template>
    <el-dialog
    :title="title || '标题'"
    :visible.sync="dialogVisible"
    :width="bodyWid || '70%'"
    :top="bodyTop || '70px'"
    :close-on-click-modal="false"
    :class="{titbg: this.titbg !== undefined}"
    @close="this.closed"
    center>
        <slot></slot>
    </el-dialog>
</template>

<script>
export default {
  props: {
    title: String,
    titbg: undefined,
    closed: {
      type: Function,
      default: () => {}
    },
    bodyWid: String,
    bodyTop: String
  },
  data() {
    return {
      dialogVisible: false // 是否显示
    };
  }
};
</script>

<style>
.titbg .el-dialog__header {
  background: #f5f5f5;
  padding: 10px 0 9px;
  height: 24px;
  line-height: 24px;
  border-bottom: 1px solid #eee;
}
.titbg .el-dialog__headerbtn {
  top: 15px;
}
</style>
