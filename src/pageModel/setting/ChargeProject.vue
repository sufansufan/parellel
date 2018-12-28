<template>
  <div class="chargeProject-box">
    <div class="chargeProject-hender">
      <div>
        <el-input placeholder="请输入收费名称" v-model="name" size="mini" clearable style="width: 400px">
          <el-button slot="append" icon="el-icon-search" style="width:60px;" @click="search"></el-button>
        </el-input>
      </div>
      <div>
        <el-button size="mini" type="primary" @click="addChargeProject({})">新增</el-button>
        <el-button size="mini" type="danger" @click="chargeProjectDel('')">批量删除</el-button>
      </div>

    </div>
    <el-table size="mini" :data="dataList" stripe style="width: 100%" v-loading="loading" ref="multipleTable" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="收费名称"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column label="年级">
        <template slot-scope="scope">
          {{Util.GetLabelForValue($store.state.GradeOptions, scope.row.class_by)}}
        </template>
      </el-table-column>
      <el-table-column label="类别">
        <template slot-scope="scope">
          {{Util.GetLabelForValue($store.state.ChargeProject, scope.row.category)}}
        </template>
      </el-table-column>
      <el-table-column prop="updated_at" label="编辑时间">
        <template slot-scope="scope">
          {{Util.TimeCycle(scope.row.updated_at)}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="addChargeProject(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="chargeProjectDel(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChangeClasss" @current-change="handleCurrentChangeClass" layout="total, slot, sizes, prev, pager, next, jumper" :current-page="page + 1" :total="count" :page-size="limit" :page-sizes="[10,20,30,50]">
      </el-pagination>
    </div>
    <Dialog ref="dialog" :title="chargeTitle" titbg bodyWid="30%" bodyTop="300px">
      <div class="dialog-content">
        <el-form ref="ruleFrom" :model="ruleFrom" :rules="rules" label-width="60px">
          <el-form-item label="名称">
            <el-input v-model="ruleFrom.name"></el-input>
          </el-form-item>
          <el-form-item label="价格" prop="price">
            <el-input v-model="ruleFrom.price"></el-input>
          </el-form-item>
          <el-form-item label="年级">
            <el-select clearable v-model="ruleFrom.class_by" placeholder="请选择" style="width:100%">
              <el-option v-for="item in $store.state.GradeOptions" :key="item.code" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类别">
            <el-select clearable v-model="ruleFrom.category" placeholder="请选择" style="width:100%">
              <el-option v-for="item in $store.state.ChargeProject" :key="item.code" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <div class="dialog-content-btn">
            <el-button size="mini" type="primary" @click="submitForm('ruleFrom')">保存</el-button>
            <el-button size="mini" type="primary" @click="$refs.dialog.dialogVisible=false">取消</el-button>
          </div>
        </el-form>
      </div>
    </Dialog>

  </div>
</template>

<script>
import Dialog from "../common/Dialog.vue";
export default {
  components: {
    Dialog
  },
  data() {
    return {
      limit: 10,
      page: 0,
      count: 20,
      dataList: [],
      ruleFrom: {
        id: "",
        name: "",
        price: "",
        class_by: "",
        category: ""
      },
      multipleSelection: [],
      loading: false,
      chargeTitle: "",
      name: "",
      rules: {
        price: [
          { required: true, validator: this.Checkout.money, trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getData();
    this.Util.querySysconst(this, "101", this.$store.state.GradeOptions);
    this.Util.querySysconst(this, "026", this.$store.state.ChargeProject);
  },
  methods: {
    getData() {
      let objData = {
        limit: this.limit,
        page: this.page,
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        source: this.GlobalVal.constants.source,
        name: this.name
      };
      this.loading = true;
      this.$axios
        .post(this.GlobalVal.httpLink.listChargeItem, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              this.count = res.data.data.count;
              this.dataList = res.data.data.chargeItems;
            } else {
              console.error(res);
              this.$message({
                type: "error",
                message: res.data.errmsg
              });
            }
            this.loading = false;
          },
          res => {
            this.$message.error("请求失败");
            this.loading = false;
          }
        );
    },
    submitForm(formName) {
      //表单验证
      this.$refs[formName].validate(valid => {
        if (valid) {
          let objData = {
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            source: this.GlobalVal.constants.source,
            chargeItem: this.ruleFrom
          };
          this.$axios
            .post(
              this.GlobalVal.httpLink.editChargeItem,
              JSON.stringify(objData)
            )
            .then(
              res => {
                if (res.data.code === "10000") {
                  this.$message.success("保存成功");
                  this.$refs.dialog.dialogVisible = false;
                  this.getData();
                } else {
                  console.error(res);
                  this.$message({
                    type: "error",
                    message: res.data.errmsg
                  });
                }
              },
              res => {
                this.$message.error("请求失败");
              }
            );
        } else {
          return false;
        }
      });
    },
    //删除收费项目
    chargeProjectDel(id) {
      if (this.multipleSelection.length === 0 && id === "") {
        this.$message.error("所选项目为空");
        return;
      }
      this.$confirm("此操作将永久删除该数据,是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          let delList = [];
          if (this.multipleSelection.length > 0) {
            this.multipleSelection.forEach(item => {
              delList.push({
                id: item.id
              });
            });
          }
          id ? (delList = [{ id }]) : "";
          let objData = {
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            source: this.GlobalVal.constants.source,
            delList: delList
          };
          this.$axios
            .post(
              this.GlobalVal.httpLink.deleteChargeItem,
              JSON.stringify(objData)
            )
            .then(
              res => {
                if (res.data.code === "10000") {
                  this.$message.success("删除成功");
                  this.getData();
                } else {
                  console.error(res);
                  this.$message({
                    type: "error",
                    message: res.data.errmsg
                  });
                }
              },
              res => {
                this.$message.error("请求失败");
              }
            );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //批量删除选中
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //条数限制
    handleSizeChangeClasss(val) {
      this.limit = val;
      this.page = 0;
      this.getData();
    },
    handleCurrentChangeClass(val) {
      this.page = val - 1;
      this.getData();
    },
    addChargeProject(row) {
      this.$refs.dialog.dialogVisible = true;
      row.id === undefined
        ? (this.chargeTitle = "新增收费项目")
        : (this.chargeTitle = "编辑收费项目");
      this.ruleFrom = {
        name: row.name,
        price: row.price,
        id: row.id || "",
        class_by: row.class_by || "",
        category: row.category || ""
      };
    },
    search() {
      this.page = 0;
      this.getData();
    }
  }
};
</script>

<style scoped>
.chargeProject-box {
  padding: 20px;
}
.chargeProject-hender {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.chargeProject-hender button {
  width: 100px;
}
.dialog-content {
  width: 100%;
  min-height: 300px;
}
.dialog-content-btn {
  text-align: center;
}
.dialog-content-btn button {
  width: 100px;
}
</style>
