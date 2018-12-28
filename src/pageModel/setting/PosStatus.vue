<template>
  <div class="pos-status">
    <div class="select-tools">
      <div>
        <el-input size="mini" v-model="posNumber" placeholder="编号"></el-input>
      </div>
      <div>
        <el-select clearable v-model="incident" placeholder="状态" size="mini">
          <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <el-cascader size="mini" clearable expand-trigger="click" :options="$store.state.location" v-model="campusId" placeholder="校区" change-on-select>
        </el-cascader>
      </div>
      <div>
        <el-button type="primary" @click="getData" size="mini">搜索</el-button>
      </div>
      <div>
        <el-button type="primary" @click="getData" size="mini">更新状态</el-button>
      </div>
    </div>
    <el-table size="mini" :data="dataList" border show-overflow-tooltip stripe style="width: 100%" v-loading="loading">
      <el-table-column prop="pos_number" label="POS机编号" width="150">
      </el-table-column>
      <el-table-column prop="organ_name" label="所属校区">
      </el-table-column>
      <el-table-column label="当前状态" width="200">
        <template slot-scope="scope">
          <div :style="{color: scope.row.color}">{{scope.row.incident | statusFix(statusList, scope.row)}}</div>
        </template>
      </el-table-column>
      <el-table-column label="更新日期" width="200">
        <template slot-scope="scope">
          {{scope.row.update_date | timeFix(Util.TimeCycle)}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    statusList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      loading: true,
      dataList: [],
      posNumber: '', // pos编号
      incident: '', // 状态
      campusId: [] // 校区id
    }
  },
  created() {
    this.getData()
  },
  filters: {
    statusFix(code, list = []) {
      return code ? list.find(item => item.value === code).label : code
    }
  },
  methods: {
    getData() {
      const params = {
        staffId: JSON.parse(window.sessionStorage.getItem('staff')).staffId,
        posNumber: this.posNumber, // pos标号
        incident: this.incident, // 状态
        campusId: this.campusId[this.campusId.length - 1] // 校区id
      }
      this.loading = true
      this.$axios
        .post(this.GlobalVal.httpLink.getAllPosStatus, JSON.stringify(params))
        .then(res => {
          this.loading = false
          this.dataList = res.data.data.posStatusList
          this.dataList = this.dataList.map(item => {
            let color = ''
            switch (item.incident) {
              case '31000':
                color = '#67c23a'
                break
              case '31001':
                color = '#f56c6c'
                break
              default:
                color = '#e6a23c'
            }
            item.color = color
            return item
          })
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style scoped>
.pos-status .select-tools {
  display: flex;
  flex-flow: wrap;
  margin-bottom: 5px;
}
.pos-status .status {
  display: inline-flex;
  justify-content: flex-end;
  flex-grow: 1;
  color: #000;
}
.pos-status .select-tools > div {
  margin: 0 10px 10px 0;
}
.pos-status .select-tools .el-input--mini .el-input__inner {
  height: 30px !important;
}
</style>
