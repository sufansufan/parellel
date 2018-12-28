<template>
    <div class="table">
        <b>校区个数 {{dataList.length}}个</b>
        <el-row>
            <el-col class="treeSidebar">
                <el-tree :data="location" @node-click="handleClickTree" default-expand-all :expand-on-click-node="true"></el-tree>
            </el-col>
            <el-col style="width: calc(100% - 327px);margin-left: 20px;">
               <el-table :data="dataList" style="width:100%" height="790px" stripe v-loading="loading">
                    <el-table-column prop="organ_name" label="校区名称"></el-table-column>
                    <el-table-column prop="city_name" label="校区所属城市"></el-table-column>
                    <el-table-column prop="district_name" label="行政区域"></el-table-column>
                    <el-table-column prop="office_addr" label="详细地址"></el-table-column>
                    <el-table-column prop="organ_leader_mobile" label="电话"></el-table-column>
                    <el-table-column prop="finance_name" label="财务主体" width="300px"></el-table-column>
                    <el-table-column label="操作" fixed="right">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="edit(scope.row, 'edit')">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <Dialog ref="dialog" title="编辑财务主体" titbg bodyWid = "40%" bodyTop = '320px'>
            <p class="edit-finance"><span>校区名称</span>行政区域</p>
            <p class="edit-info"><span>{{editInfo.organ_name}}</span>{{editInfo.district_name}}</p>
            <el-form :model="ruleForm" class="finance"  ref="ruleForm">
                <el-form-item label="财务主体名称">
                    <el-select v-model="ruleForm.finance_id" size="medium" placeholder="请选择财务主体" style="width: 100%;">
                      <el-option
                        v-for="item in financeList"
                        :key="item.finance_id"
                        :label="item.finance_name"
                        :value="item.finance_id">
                      </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div class="dialog-btn">
                <el-button type="primary" size="mini" style="width: 100px;" @click="submitForm('ruleForm')">保存</el-button>
                <el-button type="primary" size="mini" style="width: 100px;" @click="edit('', 'cancle')">取消</el-button>
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
      dataList: [],
      location: [],
      ruleForm: {
        finance_id: ""
      },
      editInfo: {},
      financeList: [],
      loading: true,
      camId: ""
    };
  },
  created() {
    this.Util.queryAreaNav(this, 3, () =>
      this.getData(
        JSON.parse(window.sessionStorage.getItem("staff")).staffOrganId
      )
    );
    this.location = this.$store.state.location;
    //获取财务主体
    this.$axios
      .post(
        this.GlobalVal.httpLink.getAllFinanceBody,
        JSON.stringify({
          source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
          staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId
        })
      )
      .then(
        res => {
          if (res.data.code === "10000") {
            this.financeList = res.data.finance_bodies;
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
  methods: {
    getData(id) {
      this.loading = true;
      this.$axios
        .post(
          this.GlobalVal.httpLink.findSchoolListByAreaId,
          JSON.stringify({
            source: this.GlobalVal.constants.source,
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            id
          })
        )
        .then(
          res => {
            if (res.data.code === "10000") {
              this.dataList = res.data.data.list;
            } else {
              this.$message({
                type: "error",
                message: res.data.errmsg
              });
            }
            this.loading = false;
          },
          res => {
            this.$message("请求失败");
            this.loading = false;
          }
        )
        .catch(error => {
          this.loading = false;
          this.$message({
            type: "error",
            message: error
          });
        });
    },
    handleClickTree(val) {
      this.getData(val.value);
      this.camId = val.value;
    },
    edit(row, type) {
      type === "edit"
        ? (this.$refs.dialog.dialogVisible = true)
        : (this.$refs.dialog.dialogVisible = false);
      if (row) {
        this.editInfo = row;
        this.ruleForm.finance_id = row.finance_id;
      }
    },
    //编辑财务区域
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let objData = {
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            source: this.GlobalVal.constants.source,
            organ_id: this.editInfo.organ_id,
            finance_id: this.ruleForm.finance_id,
            finance_name: this.Util.GetIdNameForValue(
              this.financeList,
              this.ruleForm.finance_id,
              "finance_id",
              "finance_name"
            )
          };
          this.$axios
            .post(
              this.GlobalVal.httpLink.editSchoolFinanceBody,
              JSON.stringify(objData)
            )
            .then(
              res => {
                if (res.data.code === "10000") {
                  this.getData(
                    this.camId ||
                      JSON.parse(window.sessionStorage.getItem("staff"))
                        .staffOrganId
                  );
                  this.$refs.dialog.dialogVisible = false;
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
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.treeSidebar {
  width: 297px;
  height: 790px;
  background: #fff;
  padding: 20px;
  overflow-y: auto;
}
.table b {
  font-size: 18px;
  display: block;
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
  margin-bottom: 20px;
}
.edit-finance {
  font-weight: 700;
  padding-right: 10px;
  font-size: 16px;
}
.edit-finance span {
  margin-right: 30px;
}
.edit-info {
  font-size: 16px;
}
.edit-info span {
  margin-right: 60px;
}
.dialog-btn {
  text-align: center;
}
</style>
<style>
.finance .el-form-item__label {
  font-size: 16px;
}
</style>

