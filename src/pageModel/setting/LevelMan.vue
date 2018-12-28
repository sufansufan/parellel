<template>
  <div class="level-man">
    <div class="btn">
      <el-button type="danger" size="mini" icon="plus" class="handle-del mr10" @click="handleDelete('all')" :disabled="! (multipleSelection.length > 1)">批量删除</el-button>
      <el-button type="primary" size="mini" icon="plus" class="handle-del mr10" @click="handleLevel('add')">新增</el-button>
    </div>
    <div class="level-table">
      <el-table :data="dataList" size="mini" stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="级别名称">
          <template slot-scope="scope">
            {{scope.row.tlevel_name }}{{ scope.row.addition_salary == 0 ? "" : "+" + scope.row.addition_salary}}
          </template>
        </el-table-column>
        <el-table-column prop="tlevel_name" label="基本级别"></el-table-column>
        <el-table-column prop="addition_salary" label="级别附加"></el-table-column>
        <el-table-column prop="tlevel_salary" label="课酬"></el-table-column>
        <el-table-column prop="compulsory_hour" label="义务课时"></el-table-column>
        <el-table-column prop="relevant_number" label="关联教师数"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{scope.row.status === '00001' ? '启用' : '停用'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleLevel(scope.row)">编辑
            </el-button>
            <el-button size="mini" :type="scope.row.status === '00001' ?  'primary' : 'warning'" @click="submitLevel(scope.row)"> {{scope.row.status === '00001' ? '停用' : '启用'}}
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete('self', scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :total="count" :page-size="limit" :page-sizes="[10,20,30,50]">
      </el-pagination>
    </div>
    <Dialog :title="titleRemind" ref="dialog" titbg bodyWid="40%" bodyTop="200px">
      <div class="rule-form">
        <el-form ref="ruleForm" :model="ruleForm" label-width="0px">
          <div>
            <el-form-item>
              <span>基本级别</span>
              <el-input v-model="ruleForm.tlevel_name" size="mini" placeholder="请输入基本级别" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <span>级别名称</span>
              <div class="level-name">
                {{ruleForm.tlevel_name && (ruleForm.tlevel_name)}} {{ruleForm.addition_salary == 0 ? "":"+" + ruleForm.addition_salary}}
              </div>
            </el-form-item>
          </div>
          <div>
            <el-form-item>
              <span>级别附加</span>
              <el-input v-model="ruleForm.addition_salary" size="mini" placeholder="请输入数字" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <span>课时费</span>
              <el-input v-model="ruleForm.tlevel_salary" size="mini" placeholder="请输入数字" clearable></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item>
              <span>义务课时</span>
              <el-input v-model="ruleForm.compulsory_hour" size="mini" placeholder="请输入数字" clearable></el-input>
            </el-form-item>
          </div>
          <div class="rule-form-btn">
            <el-button size="small" type="primary" @click="submitLevel('submit')">确定</el-button>
            <el-button size="small" type="info" @click="() => {this.$refs.dialog.dialogVisible = false}">取消</el-button>
          </div>
        </el-form>
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
      page: 0,
      limit: 10,
      count: 0,
      dataList: [],
      multipleSelection: [],
      ruleForm: {
        tlevel_id: "",
        tlevel_name: "",
        addition_salary: "",
        tlevel_salary: "",
        compulsory_hour: "",
        status: ""
      },
      titleRemind: ""
    };
  },
  created() {
    this.getData();
    this.getData("00001");
  },
  methods: {
    getData(status = "") {
      let objData = {
        page: this.page, //页数
        limit: this.limit, //条目数
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        status,
        tlevelName: ""
      };
      if (status === "00001") {
        objData.page = "";
        objData.limit = "";
      }
      this.$axios
        .post(
          this.GlobalVal.httpLink.queryTeacherlevels,
          JSON.stringify(objData)
        )
        .then(
          res => {
            if (res.data.code === "10000") {
              if (status === "00001") {
                this.$store.commit("setLeveLName", res.data.teacherLevels);
              } else {
                this.count = res.data.count;
                this.dataList = res.data.teacherLevels;
              }
            } else {
              self.$message({
                type: "error",
                message: res.data.errmsg
              });
            }
          },
          res => {
            self.$message("请求失败");
          }
        );
    },
    handleLevel(row) {
      this.$refs.dialog.dialogVisible = true;
      row === "add"
        ? (this.titleRemind = "新增级别")
        : (this.titleRemind = "编辑级别");
      row !== "add"
        ? (this.ruleForm = row)
        : (this.ruleForm = {
            tlevel_id: "",
            tlevel_name: "",
            addition_salary: "",
            tlevel_salary: "",
            compulsory_hour: "",
            status: ""
          });
    },
    submitLevel(row) {
      if (row !== "submit") {
        this.ruleForm = row;
        this.ruleForm.status === "00001"
          ? (this.ruleForm.status = "00002")
          : (this.ruleForm.status = "00001");
      }
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        teacherLevel: { ...this.ruleForm }
      };
      this.$axios
        .post(this.GlobalVal.httpLink.editTeacherlevel, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              this.$refs.dialog.dialogVisible = false;
              this.getData();
              this.getData("00001");
              this.$message({
                type: "success",
                message: this.titleRemind + "成功"
              });
            } else {
              this.$message({
                type: "error",
                message: res.data.errmsg
              });
            }
          },
          res => {
            this.$message("请求失败");
          }
        );
    },
    handleDelete(type, row) {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let delList = [];
          if (type === "self") {
            if (row.relevant_number > 0) {
              this.$message({
                type: "error",
                message: "当前级别下存在教师"
              });
              return;
            } else {
              delList = [
                {
                  id: row.tlevel_id
                }
              ];
            }
          } else if (type === "all") {
            for (let i = 0; i < this.multipleSelection.length; i++) {
              if (this.multipleSelection[i].relevant_number > 0) {
                this.$message({
                  type: "error",
                  message: `第${i + 1}条级别下存在教师`
                });
                return;
              } else {
                delList.push({
                  id: this.multipleSelection[i].tlevel_id
                });
              }
            }
          }
          let objData = {
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            delList
          };
          this.$axios
            .post(
              this.GlobalVal.httpLink.delTeacherLevel,
              JSON.stringify(objData)
            )
            .then(
              res => {
                if (res.data.code === "10000") {
                  this.$message({
                    type: "success",
                    message: "删除成功!"
                  });
                  this.getData();
                  this.getData("00001");
                } else {
                  this.$message({
                    type: "error",
                    message: res.data.errmsg
                  });
                }
              },
              res => {
                this.$message({
                  type: "error",
                  message: "操作失败"
                });
              }
            );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除操作"
          });
        });
    },
    //批量刪除选中的变量
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCurrentChange(val) {
      this.page = val - 1;
      this.getData();
    },

    //每页显示数目发生变化
    handleSizeChange(val) {
      this.limit = val;
      this.getData();
    }
  }
};
</script>

<style scoped>
.level-man .btn {
  display: flex;
  justify-content: space-between;
}
.level-man .btn > button:nth-of-type(2) {
  margin-right: 20px;
}
.level-man .level-table {
  margin-top: 20px;
}
.level-man .rule-form div {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.level-man .rule-form div .el-cascader,
.level-man .rule-form div .el-select,
.level-man .rule-form div .el-autocomplete,
.level-man .rule-form div .el-date-picker,
.level-man .rule-form div .el-input,
.level-man .rule-form div div {
  width: 350px;
}
.level-man .rule-form .rule-form-btn {
  margin-top: 20px;
  justify-content: center;
}
.level-man .rule-form .rule-form-btn button {
  margin-right: 10px;
  width: 100px;
}
.level-name {
  font-size: 30px;
  margin-left: 40px;
}
</style>
