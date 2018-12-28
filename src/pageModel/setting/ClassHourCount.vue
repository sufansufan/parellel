<template>
    <div class="table">
        <div class="handle-box">
            <el-select size="mini" clearable v-model="particular" placeholder="选择年份" style="width: 200px">
                <el-option
                        v-for="item in $store.state.YearOptions"
                        :key="item.code"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-select size="mini" clearable v-model="particular" placeholder="选择月份" style="width: 200px">
                <el-option label="一月" value="1"></el-option>
                <el-option label="二月" value="2"></el-option>
            </el-select>
            <el-cascader clearable
                         size="mini"
                         expand-trigger="click"
                         :options="location"
                         v-model="selectedLocation"
                         placeholder="选择校区"
                         change-on-select>
            </el-cascader>
            <el-button type="primary" size="mini" style="width: 100px;float: right;margin-right: 20px">导出</el-button>
        </div>
        <el-table :data="data" size="mini" stripe style="width: 100%" >
            <el-table-column prop="teacher_name" label="教师姓名"></el-table-column>
            <el-table-column prop="teacher_mobile" label="员工编号"></el-table-column>
            <el-table-column prop="campus_name" label="时间范围"></el-table-column>
            <el-table-column prop="teacher_no" label="上次次数"></el-table-column>
            <el-table-column prop="teacher_no" label="等效课时"></el-table-column>
            <el-table-column label="操作" width="300">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="seeClassTable(scope.$index, scope.row)">查看课表</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="count"
                    :page-size="limit"
                    :page-sizes="[10,20,30,50]">
            </el-pagination>
        </div>
        <!--差看课表-->
        <Dialog ref="dialog" title="课表">
            <div class="classTable">
                <el-table :data="data" size="mini" stripe style="width: 100%" >
                    <el-table-column prop="teacher_name" label="教师姓名"></el-table-column>
                    <el-table-column prop="teacher_mobile" label="员工编号"></el-table-column>
                    <el-table-column prop="campus_name" label="时间范围"></el-table-column>
                    <el-table-column prop="teacher_no" label="上次次数"></el-table-column>
                    <el-table-column prop="teacher_no" label="等效课时"></el-table-column>
                </el-table>
            </div>
        </Dialog>
    </div>
</template>
<script>
import Dialog from "../common/Dialog";
export default {
  components: {
    Dialog
  },
  data() {
    return {
      limit: 10,
      page: 0,
      count: 50,
      dataList: [], //接受数据集合
      organId: "", //机构id
      location: [], //校区集合
      selectedLocation: [] //选择校区的集合
    };
  },
  created() {
    const self = this;
    this.Util.queryAreaNav(self, -1, function() {
      self.getData();
    });
    this.location = this.$store.state.location;
    this.organId = this.$store.state.organId;
  },
  computed: {
    data() {
      if (!this.dataList) {
        return [];
      }
      return this.dataList.map(item => {
        return item;
      });
    }
  },
  methods: {
    getData() {},
    seeClassTable(index, row) {
      this.$refs.dialog.dialogVisible = true;
    },
    //每页显示数目发生变化
    handleSizeChange(val) {
      this.limit = val;
      this.getData();
    },
    //翻页导航栏
    handleCurrentChange(val) {
      this.page = val - 1;
      this.getData();
    }
  }
};
</script>
<style>
.handle-box {
  margin-bottom: 20px;
}
.classTable {
  min-height: 600px;
}
</style>
