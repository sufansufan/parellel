<template>
    <div class="table">
        <!--<div class="handle-box">
            <el-cascader clearable
                    size="mini"
                    expand-trigger="click"
                    :options="$store.state.SchoolTypeOptions"
                    v-model="selectedLocation"
                    placeholder="优惠券类型"
                    change-on-select
                    @change="handleLocationChange">
            </el-cascader>
            <el-switch v-model="isvalid" inactive-text="是否有效"        border="1px solid #000"></el-switch>
            <div class="search-warp">
                <el-input v-model="select_word" size="mini" placeholder="" class="handle-input mr10" @keyup.enter.native="search" placeholder="输入要搜索的优惠券类型/是否有效"></el-input>
                <el-button type="primary" size="mini" icon="search"  @click="search">搜索</el-button>
            </div><br>
            <el-button type="primary" size="mini" icon="plus" class="handle-del mr10" @click="handleAdd">新增</el-button>
            <el-button type="danger" size="mini" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
        </div>-->
        <div class="handle-box">
            <el-button @click="goback" icon="el-icon-arrow-left" type="primary" size="mini">返回</el-button>
        </div>
        <el-table :data="data" size="mini" stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="student_name" label="学生姓名"></el-table-column>
            <el-table-column prop="coupon_name" label="优惠券名称"></el-table-column>
            <el-table-column prop="coupon_name" label="优惠券名称"></el-table-column>
            <el-table-column prop="coupon_amount" label="优惠券面值"></el-table-column>
            <el-table-column prop="need_consume" label="满多少使用"></el-table-column>
            <el-table-column prop="coupon_type" label="优惠券类型"></el-table-column>
            <el-table-column prop="begin_date" label="开始日期"></el-table-column>
            <el-table-column prop="end_date" label="结束日期"></el-table-column>
            <!--<el-table-column prop="send_date" label="发放日期"></el-table-column>-->
            <el-table-column prop="use_date" label="使用日期"></el-table-column>
            <el-table-column prop="province" label="发送省份"></el-table-column>
            <el-table-column prop="city" label="发送城市"></el-table-column>
            <el-table-column prop="isvalidServer" label="是否有效"></el-table-column>
            <el-table-column prop="isusedServer" label="是否使用"></el-table-column>
            <el-table-column prop="staff_name" label="发放人"></el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
  data() {
    return {
      staffId: "",
      page: 0, //页码
      limit: 10, //一次查询多少条
      count: 20, //数据总量
      isvalid: false,
      isused: false,
      dataList: [],
      selectedLocation: [], //选择学校类型
      multipleSelection: [], //选中行的集合  即删除行
      addTeamLayer: false, //新增弹出框状态
      changeTeamLayer: false, //修改弹出框状态
      ruleForm: {
        //新增的信息
        student_id: "", //学生ID
        student_name: "", //学生姓名
        coupon_desc: "", //优惠券描述
        coupon_name: "", //优惠券名称
        coupon_amount: "", //优惠券面值
        need_consume: "", //需要消费多少才能使用
        getdate: "", //获得优惠券的日期
        begin_date: "", //优惠券开始使用日期
        end_date: "", //优惠券结束使用日期
        isvalid: "", //优惠券是否有效 true 有效，false无效
        reason: "", //发放理由
        isused: "", //是否已使用true 已经使用，false没使用
        use_date: "", //使用日期
        province_no: "", //发给那个省
        province: "", //省名称
        city_no: "", //发给那个城市
        city: "", //城市名称
        coupon_type: "", //优惠券类型
        sender_id: "", //发放者ID
        sender_name: "", //发放者姓名
        created_at: "", //创建日期
        update_at: "" //修改日期
      },
      //接收当前行的信息
      changeForm2: {},
      rules: {}
    };
  },
  created() {
    const self = this;
    this.getData();
  },
  //计算属性
  computed: {
    data() {
      const self = this;
      if (!self.dataList) {
        return [];
      }
      return self.dataList.filter(function(d) {
        d.begin_date = self.Util.TimeCycle(d.begin_date, "ymd");
        d.end_date = self.Util.TimeCycle(d.end_date, "ymd");
        d.send_date = self.Util.TimeCycle(d.send_date, "ymd");
        d.use_date = self.Util.TimeCycle(d.use_date, "ymd");
        if (d.isvalid == true) {
          d.isvalidServer = "有效";
        } else {
          d.isvalidServer = "失效";
        }
        if (d.isused == true) {
          d.isusedServer = "已使用";
        } else {
          d.isusedServer = "暂没使用";
        }
        return d;
      });
    }
  },
  watch: {
    changeForm2: function() {
      //修改的参数赋值
      this.ruleForm.coupon_id = this.changeForm2.coupon_id; //优惠券唯一id
      this.ruleForm.student_id = this.changeForm2.student_id; //学生id
      this.ruleForm.student_name = this.changeForm2.student_name; //学生姓名
      this.ruleForm.coupon_desc = this.changeForm2.coupon_desc; //优惠券描述
      this.ruleForm.coupon_name = this.changeForm2.coupon_name; //满足多少消费可以使用
      this.ruleForm.coupon_amount = this.changeForm2.coupon_amount; //优惠券面值
      this.ruleForm.need_consume = this.changeForm2.need_consume; //需要消费多少才能使用
      this.ruleForm.getdate = this.changeForm2.getdate; //获得优惠券的日期
      this.ruleForm.begin_date = this.changeForm2.begin_date; //开始使用日期
      this.ruleForm.end_date = this.changeForm2.end_date; //结束使用日期
      this.ruleForm.coupon_type = this.changeForm2.coupon_type; //优惠券的类型
      console.log(this.changeForm2.isvalid);
      this.ruleForm.isvalid = this.changeForm2.isvalid; //优惠券是否有效
      this.ruleForm.isused = this.changeForm2.isused; //是否使用
      this.ruleForm.use_date = this.changeForm2.use_date; //使用日期
      this.ruleForm.reason = this.changeForm2.reason; //发放理由
      this.ruleForm.province_no = this.changeForm2.province_no; //发给那个省
      this.ruleForm.province = this.changeForm2.province; //省名称
      this.ruleForm.city_no = this.changeForm2.city_no; //发给哪个城市
      this.ruleForm.city = this.changeForm2.city; //城市名称
      //this.ruleForm.sender_id = this.changeForm2.sender_id //发放者id
      this.ruleForm.sender_name = this.changeForm2.sender_name; //发放者姓名
      this.ruleForm.created_at = this.changeForm2.created_at; //创建日期
      this.ruleForm.update_at = this.changeForm2.update_at; //修改日期
    }
  },
  methods: {
    getData() {
      const self = this;
      let objData = {
        source: this.GlobalVal.constants.source,
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        page: this.page, //页数
        limit: this.limit, //条目数
        student_name: "", //学生姓名
        coupon_type: "", // 优惠券类型
        coupon_id: this.$route.query.couponId, //this.$store.state.ChooseCouponInfo.coupon_id, //优惠卷id
        isvalid: true //  优惠卷是否有效
      };
      console.log("查询用户优惠券发起请求的参数", objData);
      this.$axios
        .post(
          this.GlobalVal.httpLink.queryStudentCoupon,
          JSON.stringify(objData)
        )
        .then(
          res => {
            if (res.data.code === "10000") {
              console.log("查询用户优惠券列表获取的对象", res.data);
              self.count = res.data.count;
              self.dataList = res.data.studentCoupons;
            } else {
              console.error(res);
              self.$message({
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
    //重新筛选函数
    screening() {
      this.getData();
    },
    //翻页导航栏
    handleCurrentChange(val) {
      this.cur_page = val - 1;
      this.getData();
    },
    //每页显示数目发生变化
    handleSizeChange(val) {
      this.limit = val;
      this.getData();
    },
    //新增按钮事件
    handleAdd() {
      //this.resetForm("ruleForm");
      this.addTeamLayer = true;
      this.changeTeamLayer = false;
      //清空参数
    },
    //修改按钮事件
    handleEdit(index, row) {
      this.changeTeamLayer = true;
      this.addTeamLayer = true;
      this.changeForm2 = row;
    },
    //新增/修改--提交
    submitForm(formName) {
      const self = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let objData = {
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            studentCoupon: this.varJug(this.ruleForm)
          };
          console.log("新增/修改用户优惠券发起请求的参数", objData);
          this.$axios
            .post(
              this.GlobalVal.httpLink.editPublicSchool,
              JSON.stringify(objData)
            )
            .then(
              res => {
                if (res.data.code === "10000") {
                  console.log("新增/修改优惠券获取的对象", res.data);
                  self.addTeamLayer = false;
                  if (this.changeTeamLayer) {
                    self.$message({
                      type: "success",
                      message: "修改成功"
                    });
                  } else {
                    self.$message({
                      type: "success",
                      message: "新增成功"
                    });
                  }
                  self.getData();
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
        } else {
          return false;
        }
      });
    },

    varJug(obj) {
      let self = this;
      let o = obj;
      o.created_at = new Date().getTime();
      o.update_at = new Date().getTime();
      console.log(o);
      return o;
    },
    //删除事件
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let objData = {
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            delList: [
              {
                id: row.id
              }
            ]
          };
          this.$axios
            .post(
              this.GlobalVal.httpLink.delStudentCoupon,
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
    },
    //删除全部
    delAll() {
      //批量删除按钮触发
      const self = this;
      if (this.multipleSelection.length > 0) {
        this.$confirm("此操作将永久删除这些名单, 是否继续?", "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let delTeacher = [];
            for (
              let i = 0, length = self.multipleSelection.length;
              i < length;
              i++
            ) {
              delTeacher.push({
                id: self.multipleSelection[i].student_id
              });
            }

            let objData = {
              staffId: JSON.parse(window.sessionStorage.getItem("staff"))
                .staffId,
              delList: delTeacher
            };
            self.multipleSelection = [];
            this.$axios
              .post(this.GlobalVal.httpLink.delCoupon, JSON.stringify(objData))
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
              message: "已取消删除"
            });
          });
      } else {
        this.$message({
          type: "info",
          message: "没有选中任何项"
        });
      }
    },
    //将选中的行存储在一个变量中
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //重新选择了类型
    handleLocationChange(value) {},
    goback() {
      this.$router.push({
        path: "/specialOffer"
      });
    }
  }
};
</script>
<style scoped>
.handle-box {
  margin-bottom: 20px;
}
.search-warp {
  display: inline-block;
  float: right;
}
.handle-input {
  width: 300px;
  display: inline-block;
}
.handle-del {
  margin-top: 20px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 120px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.bg-layer {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
.transition-box.change {
  height: 400px;
  min-height: 400px;
}
.transition-box {
  position: absolute;
  width: 600px;
  height: 480px;
  min-height: 480px;
  margin: auto;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  border-radius: 4px;
  background-color: #ffffff;
  overflow-y: scroll;

  color: #fff;
  padding-top: 60px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  box-sizing: border-box;
  z-index: 10;
}

.title-warp {
  position: absolute;
  width: 100%;
  height: 50px;
  top: 0px;
  right: 0;
  z-index: 10;
  background: #ffffff;
  -webkit-box-shadow: 0px 0px 3px #ccc;
  -moz-box-shadow: 0px 0px 3px #ccc;
  box-shadow: 0px 0px 3px #ccc;
}
.transition-box .el-cascader {
  width: 100%;
}
.close-btn {
  position: absolute;
  color: #ff6808;
  font-size: 20px;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.modify-title {
  font-size: 20px;
  height: 50px;
  line-height: 50px;
  color: #666666;
  border-bottom: 1px solid #cccccc;
  text-align: left;
  padding-left: 20px;
}
.switch {
  color: #333333;
}
</style>
