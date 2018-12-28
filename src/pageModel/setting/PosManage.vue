<template>
  <div class="pos-manage">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="POS机状态" name="status">
        <PosStatus :statusList="posStatusList"></PosStatus>
      </el-tab-pane>
      <el-tab-pane label="POS机管理" name="manage">
        <PosManageList></PosManageList>
      </el-tab-pane>
      <el-tab-pane label="历史记录" name="history">
        <PosHistory :statusList="posStatusList"></PosHistory>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import PosStatus from './PosStatus'
import PosManageList from './PosManageList'
import PosHistory from './PosHistory'
export default {
  components: {
    PosStatus,
    PosManageList,
    PosHistory
  },
  data() {
    return {
      activeName: 'status',
      posStatusList: [
        {
          value: '31000',
          label: '连接正常'
        },
        {
          value: '31001',
          label: '断开连接'
        },
        {
          value: '31002',
          label: '繁忙'
        }
      ]
    }
  }
}
</script>

<style scoped>
.pos-manage {
  margin: 20px 0px 0px 20px;
  padding: 10px 20px 20px;
  background: #fff;
}
</style>
