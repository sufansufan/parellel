<template>
  <div class="pos-history">
    <div class="select-tools">
      <div>
        <el-input size="mini" v-model="posNumber" placeholder="编号"></el-input>
      </div>
      <div>
        <el-date-picker clearable v-model="times" type="daterange" align="right" size="mini" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" :default-time="['00:00:00', '23:59:59']">
        </el-date-picker>
      </div>
      <div>
        <el-button type="primary" @click="getData('search')" size="mini">搜索</el-button>
      </div>
    </div>
    <el-table size="mini" :data="dataList" border show-overflow-tooltip stripe style="width: 100%" v-loading="loading">
      <el-table-column label="日期" width="150">
        <template slot-scope="scope">
          {{scope.row.create_date | timeFix(Util.TimeCycle)}}
        </template>
      </el-table-column>
      <el-table-column prop="pos_number" label="POS机编号" width="150">
      </el-table-column>
      <el-table-column label="事件">
        <template slot-scope="scope">
          <div :style="{color: scope.row.color}">{{scope.row.incident | statusFix(statusList, scope.row)}}</div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :current-page="page + 1" :total="count" :page-size="limit" :page-sizes="[10,20,30,50]">
      </el-pagination>
    </div>
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
      page: 0,
      limit: 10,
      count: 0,
      dataList: [],
      times: [],
      posNumber: '' // pos编号
    }
  },
  created() {
    this.getData()
  },
  filters: {
    statusFix(code, list) {
      return code ? list.find(item => item.value === code).label : code
    }
  },
  methods: {
    getData(type) {
      if (type) this.page = 0
      const times = this.times || ['', '']
      const params = {
        staffId: JSON.parse(window.sessionStorage.getItem('staff')).staffId,
        source: 'PC',
        page: this.page,
        limit: this.limit,
        posNumber: this.posNumber,
        startDate: times[0],
        endDate: times[1]
      }
      this.loading = true
      this.$axios
        .post(
          this.GlobalVal.httpLink.getPosOperationHistory,
          JSON.stringify(params)
        )
        .then(res => {
          this.loading = false
          this.count = res.data.data.count
          this.dataList = res.data.data.posHistoryList
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
    },
    handleSizeChange(val) {
      this.limit = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.page = val - 1
      this.getData()
    }
  }
}
</script>

<style scoped>
.pos-history .select-tools {
  display: flex;
  flex-flow: wrap;
  margin-bottom: 5px;
}
.pos-history .status {
  display: inline-flex;
  justify-content: flex-end;
  flex-grow: 1;
  color: #000;
}
.pos-history .select-tools > div {
  margin: 0 10px 10px 0;
}
.pos-history .select-tools .el-input--mini .el-input__inner {
  height: 30px !important;
}
</style>
