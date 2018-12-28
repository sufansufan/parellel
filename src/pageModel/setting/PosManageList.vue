<template>
  <div class="pos-manage-list">
    <div class="add-btn">
      <el-button type="primary" @click="posOperation('新增')" size="mini">新增</el-button>
    </div>
    <el-table size="mini" :data="dataList" border show-overflow-tooltip stripe style="width: 100%" v-loading="loading" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="pos_number" label="POS机编号" width="150">
      </el-table-column>
      <el-table-column prop="remark" label="备注">
      </el-table-column>
      <el-table-column prop="organ_name" label="所属校区" width="100">
      </el-table-column>
      <el-table-column label="状态" width="60">
        <template slot-scope="scope">
          <div :style="{color: scope.row.color}">{{scope.row.is_block_up === '00001' ? '停用' : '启用'}}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="270">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" icon="el-icon-edit" @click="posOperation('编辑', scope.row)" size="mini">编辑</el-button>
            <el-button type="info" icon="el-icon-delete" @click="removePos(scope.row.id)" size="mini">删除</el-button>
            <el-button :type="scope.row.is_block_up === '00002' ? 'danger' : 'success'" :icon="scope.row.is_block_up === '00002' ? 'el-icon-close' : 'el-icon-check'" @click="savePos(scope.row, 'switch')" size="mini">{{scope.row.is_block_up === '00001' ? '启用' : '停用'}}</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="all-del">
      <el-button type="primary" @click="removePos('all')" size="mini" :disabled="!multipleSelection.length">批量删除</el-button>
    </div>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :current-page="page + 1" :total="count" :page-size="limit" :page-sizes="[10,20,30,50]">
      </el-pagination>
    </div>
    <Dialog ref="dialog" titbg :title="dialogTitle" bodyWid="500px">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="top" label-width="100px" size="mini">
        <el-form-item label="POS编号" prop="posNumber">
          <el-input v-model="ruleForm.posNumber"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="ruleForm.remark"></el-input>
        </el-form-item>
        <el-form-item label="所属校区" prop="campusId">
          <el-cascader size="mini" clearable expand-trigger="click" :options="location" v-model="ruleForm.campusId" placeholder="选择校区">
          </el-cascader>
        </el-form-item>
        <el-form-item align="center">
          <el-button type="primary" @click="savePos('add')">立即创建</el-button>
          <el-button @click="$refs.dialog.dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </Dialog>
  </div>
</template>

<script>
import Dialog from '../../pageModel/common/Dialog'
export default {
  components: {
    Dialog
  },
  data() {
    return {
      multipleSelection: [],
      page: 0,
      limit: 10,
      count: '',
      location: [],
      dataList: [],
      dialogTitle: '',
      ruleForm: {
        id: '',
        posNumber: '', // 必填项
        remark: '', // 备注
        campusId: [], // 校区id 必填项
        isBlockUp: ''
      },
      rules: {
        posNumber: [
          { required: true, message: '请输入POS机编号', trigger: 'blur' }
        ],
        campusId: [{ required: true, message: '请选择校区', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getData()
    this.location = this.$store.state.location
  },
  methods: {
    posOperation(title, row = '') {
      this.dialogTitle = title + 'POS机'
      this.$refs.dialog.dialogVisible = true
      if (row) {
        const { id, pos_number, remark, organ_id } = row
        this.ruleForm = {
          id,
          posNumber: pos_number,
          remark,
          campusId: this.Util.getCityLevel(this.location, organ_id)
        }
      } else {
        this.ruleForm = {
          id: '',
          posNumber: '', // 必填项
          remark: '', // 备注
          campusId: [], // 校区id 必填项
          isBlockUp: ''
        }
      }
    },
    getData() {
      const times = this.times || ['', '']
      const params = {
        staffId: JSON.parse(window.sessionStorage.getItem('staff')).staffId,
        source: 'PC',
        page: this.page,
        limit: this.limit,
        posNumber: this.posNumber
      }
      this.loading = true
      this.$axios
        .post(this.GlobalVal.httpLink.getPosInfoList, JSON.stringify(params))
        .then(res => {
          this.loading = false
          this.count = res.data.data.count
          this.dataList = res.data.data.posInfoList
          this.dataList = this.dataList.map(item => {
            let color = ''
            switch (item.is_block_up) {
              case '00002':
                color = '#67c23a'
                break
              default:
                color = '#f56c6c'
            }
            item.color = color
            return item
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
    savePos(row, type) {
      let params = {}
      if (row === 'add') {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            params = {
              ...this.ruleForm,
              campusId: this.ruleForm.campusId[
                this.ruleForm.campusId.length - 1
              ] // 校区id 必填项
            }
          } else {
            return false
          }
        })
      } else {
        params = {
          id: row.id,
          posNumber: row.pos_number, // 必填项
          remark: row.remark, // 备注
          campusId: row.organ_id, // 校区id 必填项
          isBlockUp: row.is_block_up // 是否停用
        }
        switch (type) {
          case 'editor':
            break
          case 'switch':
            params.isBlockUp = params.isBlockUp === '00001' ? '00002' : '00001'
            break
        }
      }
      this.$axios
        .post(this.GlobalVal.httpLink.savePosInfo, JSON.stringify(params))
        .then(res => {
          if (res.data.code === '10000') {
            this.$message({
              type: 'success',
              message:
                (row === 'add'
                  ? '添加'
                  : row === 'editor'
                    ? '编辑'
                    : params.isBlockUp === '00001'
                      ? '停用'
                      : '启用') + '成功!'
            })
            this.getData()
            this.$refs.dialog.dialogVisible = false
            this.ruleForm = {
              id: '',
              posNumber: '', // 必填项
              remark: '', // 备注
              campusId: [], // 校区id 必填项
              isBlockUp: ''
            }
            this.$refs.ruleForm.resetFields()
          } else {
            this.$message.error(res.data.errmsg)
          }
        })
    },
    removePos(id) {
      if (id === 'all') {
        id = this.multipleSelection.map(item => item.id).join(',')
      }
      const params = {
        staffId: JSON.parse(window.sessionStorage.getItem('staff')).staffId,
        source: 'PC',
        ids: id
      }
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          this.$axios
            .post(this.GlobalVal.httpLink.deletePosInfo, JSON.stringify(params))
            .then(res => {
              if (res.data.code === '10000') {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.getData()
              }
            })
            .catch(() => {
              this.$message({
                type: 'error',
                message: '删除失败!'
              })
            })
        })
        .catch(() => {})
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
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
.pos-manage-list .add-btn {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
}
.pos-manage-list .all-del {
  margin-top: 15px;
}
</style>
