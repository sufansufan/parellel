<template>
    <div class="table">
        <div class="rate-setting-box" v-loading="loading">
            <ul class="handle-hender">
                <li>支付方式</li>
                <li>手续费率</li>
                <li>封顶金额</li>
                <li>
                  <img src="../../../static/img/plusRate.png" alt="" @click="rateAdd('add')">
                  <span @click="rateAdd('add')" style="cursor: pointer">新增</span>
                </li>
            </ul>
            <div class="hander-body-box">
              <ul class="hander-body" v-for="item in dataList" :key="item.ruleForm">
                <li>{{item.pay_type_name}}</li>
                <li>{{item.procedure_cost}}%</li>
                <li>￥{{item.cap_amount || ""}}元</li>
                <li>
                  <div @click="rateRemove(item.rate_id)"> <img src="../../../static/img/delRate.png" alt=""></div>
                  <div @click="rateAdd('edit', item)">
                    <img src="../../../static/img/editRate.png" alt="">
                  </div>
                </li>
              </ul>
            </div>
        </div>
        <Dialog ref="dialog" bodyTop="250px" bodyWid = "30%" :title="rateTitle" titbg>
          <el-form :model="ruleForm" class="rate-edit" ref="ruleForm" :rules="rules">
            <el-form-item label="支付方式名称" prop="pay_type_name">
                <el-input size="mini" v-model="ruleForm.pay_type_name"></el-input>
            </el-form-item>
            <el-form-item label="手续费率" class="hand-rate" prop="procedure_cost">
                <el-input size="mini" v-model="ruleForm.procedure_cost">
                </el-input>
                <span>%</span>
            </el-form-item>
            <el-form-item label="封顶金额" prop="cap_amount">
              <el-input size="mini" v-model="ruleForm.cap_amount"></el-input>
            </el-form-item>
          </el-form>
          <div class="rate-btn">
            <el-button type="primary" size="mini" @click="rateSave('ruleForm')">保存</el-button>
            <el-button type="primary" size="mini" @click="$refs.dialog.dialogVisible = false">取消</el-button>
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
      ruleForm: {
        pay_type_name: "",
        procedure_cost: "",
        cap_amount: "",
        rate_id: ""
      },
      loading: true,
      rateTitle: "",
      rules: {
        pay_type_name: [
          { min: 1, max: 12, message: "最长为12个字符", trigger: "blur" }
        ],
        procedure_cost: [{ validator: this.Checkout.number2, trigger: "blur" }],
        cap_amount: [{ validator: this.Checkout.number2, trigger: "blur" }]
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      this.$axios
        .post(
          this.GlobalVal.httpLink.getRateList,
          JSON.stringify({
            source: this.GlobalVal.constants.source,
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId
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
    rateSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let objData = {
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            source: this.GlobalVal.constants.source,
            rate_id: this.ruleForm.rate_id,
            pay_type_name: this.ruleForm.pay_type_name,
            procedure_cost: this.ruleForm.procedure_cost,
            cap_amount: this.ruleForm.cap_amount
          };
          this.$axios
            .post(
              this.GlobalVal.httpLink.createAndUpdateRate,
              JSON.stringify(objData)
            )
            .then(
              res => {
                if (res.data.code === "10000") {
                  this.getData();
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
    },
    rateAdd(type, row) {
      if (type === "edit") {
        this.ruleForm.pay_type_name = row.pay_type_name;
        this.ruleForm.procedure_cost = row.procedure_cost;
        this.ruleForm.cap_amount = row.cap_amount;
        this.ruleForm.rate_id = row.rate_id;
        this.rateTitle = "编辑费率设置";
      } else {
        this.ruleForm.pay_type_name = "";
        this.ruleForm.procedure_cost = "";
        this.ruleForm.cap_amount = "";
        this.ruleForm.rate_id = "";
        this.rateTitle = "新增费率设置";
      }
      this.$refs.dialog.dialogVisible = true;
    },
    rateRemove(id) {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let objData = {
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            source: this.GlobalVal.constants.source,
            rate_id: id
          };
          this.$axios
            .post(this.GlobalVal.httpLink.deleteRate, JSON.stringify(objData))
            .then(
              res => {
                if (res.data.code === "10000") {
                  this.$message({
                    type: "success",
                    message: "删除成功!"
                  });
                  this.getData();
                } else {
                  this.$message({
                    type: "error",
                    message: res.data.errmsg
                  });
                }
              },
              res => {
                console.error(res);
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
    }
  }
};
</script>

<style scoped>
.rate-setting-box {
  width: 700px;
  min-height: 800px;
  background: #fff;
  padding-top: 20px;
}
.handle-hender {
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  display: flex;
  justify-content: space-around;
  padding: 0px 20px 0px 20px;
}
.handle-hender li {
  height: 100%;
  width: 25%;
  list-style: none;
}
.rate-setting-box .handle-hender .el-icon-circle-plus {
  color: #419dfc;
  padding-right: 5px;
  font-size: 20px;
  cursor: pointer;
}
.handle-hender li:last-child {
  display: flex;
  justify-content: center;
}
.handle-hender li:last-child span {
  margin-left: 10px;
  color: #419dfc;
}
.handle-hender li img {
  width: 16px;
  height: 16px;
  background: #419dfc;
  border-radius: 50%;
  padding: 2px;
  margin-left: -9px;
  cursor: pointer;
}
.hander-body-box {
  width: calc(100% - 40px);
  height: 768px;
  overflow-y: auto;
  padding: 0 20px;
}
.hander-body {
  font-size: 14px;
  background: #efefef;
  width: 100%;
  height: 40px;
  line-height: 40px;
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
}
.hander-body li {
  list-style: none;
  height: 100%;
  width: 25%;
  text-align: center;
}
.hander-body li:last-child {
  display: flex;
  justify-content: center;
}
.hander-body > li > div {
  margin-top: 8px;
}
.hander-body > li > div:first-child img {
  background: #f56c6c;
}
.hander-body > li > div > img {
  width: 15px;
  height: 15px;
  padding: 4px;
  background: #419dfc;
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
}
.rate-edit .el-form-item {
  height: 70px;
}
.rate-btn {
  margin-top: 50px;
  text-align: center;
}
.rate-btn button {
  width: 100px;
}
.hand-rate {
  position: relative;
}
.hand-rate span {
  position: absolute;
  top: 43px;
  right: 10px;
}
</style>
