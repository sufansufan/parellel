<template>
    <div class="table">
        <div class="class-box">
            <span style="font-size: 16px;">类别</span><i class="el-icon-circle-plus-outline" @click="handleAdd1('ProjectType')">新增</i>
            <div>
                <div v-for="(item, index) in dataList" class="classType" :key="index"><span>{{item.value}}</span><i class="el-icon-edit-outline" @click="handleEdit1(item)"></i><i class="el-icon-minus" @click="handleDelete1(item.id)"></i></div>
            </div>
        </div>
        <div class="class-box">
            <span style="font-size: 16px">学部</span><i class="el-icon-circle-plus-outline" @click="handleAdd1('Department')">新增</i>
            <div>
                <div v-for="(item, index) in dataList1" class="classType" :key="index">{{item.value}}<i class="el-icon-edit-outline" @click="handleEdit1(item)"></i><i class="el-icon-minus" @click="handleDelete1(item.id)"></i> </div>
            </div>
        </div>
        <div class="class-box">
            <span style="font-size: 16px">年级</span><i class="el-icon-circle-plus-outline" @click="handleAdd1('Grade')">新增</i>
            <div>
                <div v-for="(item, index) in dataList2" class="classType" :key="index">{{item.value}} <i class="el-icon-edit-outline" @click="handleEdit1(item)"></i><i class="el-icon-minus" @click="handleDelete1(item.id)"></i></div>
            </div>
        </div>
        <div class="class-box">
            <span style="font-size: 16px">科目</span><i class="el-icon-circle-plus-outline" @click="handleAdd1('Subject')">新增</i>
            <div>
                <div v-for="(item, index) in dataList3" class="classType" :key="index">{{item.value}}<i class="el-icon-edit-outline" @click="handleEdit1(item)"></i><i class="el-icon-minus" @click="handleDelete1(item.id)"></i> </div>
            </div>
        </div>
        <div class="class-box">
            <span style="font-size: 16px">班型</span><i class="el-icon-circle-plus-outline" @click="handleAdd1('ClassType')">新增</i>
            <div>
                <div v-for="(item, index) in dataList4" class="classType" :key="index">{{item.value}}&nbsp&nbsp&nbsp&nbsp {{item.remark}} <i class="el-icon-edit-outline" @click="handleEdit1(item)"></i><i class="el-icon-minus" @click="handleDelete1(item.id)"></i></div>
            </div>
        </div>
        <!--<div class="handle-box">
            <el-select v-model="sysconstModel" size="mini" placeholder="常量类型不限">
                <el-option
                        v-for="item in $store.state.SysconstType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" size="mini" icon="plus" class="handle-del mr10" @click="handleAdd">新增</el-button>
            <el-button type="danger" size="mini" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
        </div>-->
        <!--<el-button type="primary" size="mini" icon="plus" class="handle-del mr10" @click="handleAdd">新增</el-button>-->
        <!--<el-table :data="data" size="mini" stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="typeComputed" label="常量类型"></el-table-column>
            <el-table-column prop="code" label="常量编码"></el-table-column>
            <el-table-column prop="value" label="常量值"></el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary"
                               @click="handleEdit(scope.$index, scope.row)">修改
                    </el-button>
                    <el-button size="mini" type="primary"
                               @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>-->
        <!--<div class="pagination">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="count"
                    :page-size="cur_limit"
                    :page-sizes="[10,20,30,50]">
            </el-pagination>
        </div>-->
        <!--添加/修改弹出框-->
        <transition name="el-fade-in-linear">
            <div v-show="addTeamLayer" class="bg-layer">
                <transition name="el-zoom-in-center">
                    <div v-if="addTeamLayer" class="transition-box">
                        <div class="title-warp">
                            <div class="close-btn" @click="addTeamLayer=!addTeamLayer"><i class="el-icon-close"></i></div>
                            <h3 v-if="!changeTeamLayer" class="modify-title">新增常量</h3>
                            <h3 v-if="changeTeamLayer" class="modify-title">修改常量</h3>
                        </div>
                        <el-form :model="ruleForm"
                                 :rules="rules"
                                 ref="ruleForm"
                                 label-width="100px"
                                 size="mini"
                                 style="margin-top: 10px">
                            <el-form-item label="常量类型">
                                <el-select style="width: 100%;"
                                           v-model="ruleForm.type"
                                           placeholder="请选择常量类型" disabled>
                                    <el-option
                                            v-for="(item, index) in $store.state.SysconstType"
                                            :key="index"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item><!--
                            <el-form-item label="常量编码" >
                                <el-input v-model="ruleForm.code"></el-input>
                            </el-form-item>-->
                            <el-form-item label="常量值" prop="value">
                                <el-input v-model="ruleForm.value"></el-input>
                            </el-form-item>
                            <el-form-item label="备注" prop="remark">
                                <el-input v-model="ruleForm.remark"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button v-if="!changeTeamLayer" type="primary" @click="submitForm('ruleForm')" style="margin-left: 20px">保存</el-button>
                                <el-button v-if="changeTeamLayer" type="primary" @click="submitForm('ruleForm')">保存</el-button>
                                <el-button @click="addTeamLayer=!addTeamLayer"  type="primary" >取消</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </transition>
            </div>
        </transition>

    </div>
</template>

<script>
export default {
  props: ["massage"],
  data() {
    return {
      cur_page: 0, //页码
      cur_limit: 10, //每次请求的数据数
      count: 0, //数据总量
      dataList: [], //请求的list
      dataList1: [], //请求的list
      dataList2: [], //请求的list
      dataList3: [], //请求的list
      dataList4: [], //请求的list
      multipleSelection: [], //选中行的集合
      sysconstModel: "", //选择得值
      addTeamLayer: false, //新增弹出框状态
      changeTeamLayer: false, //修改弹出框状态
      ruleForm: {
        //新增数据
        id: null, //bigint, 常量id
        type: "", //String,常量类型
        code: "", //String, 常量编码
        value: "", //String,常量值
        remark: ""
      },
      //接收当前行的信息
      //修改的参数赋值
      changeForm2: {},
      //表单校验规则
      rules: {
        value: [
          { required: true, message: "请输入常量值", trigger: "blur" },
          { min: 0, max: 12, message: "最多能输入12字符", trigger: "blur" }
        ]
      }
    };
  },

  //实例创建完成后被立即调用
  created() {
    const self = this;
    self.sysconstModel = self.$options.propsData.massage;
    this.Util.querySysconst(this, "002", this.$store.state.CourseTypeOptions); //查询类别/课型
    this.Util.querySysconst(this, "007", this.$store.state.DepartmentOptions); //查询学部
    this.Util.querySysconst(this, "101", this.$store.state.GradeOptions); //查询年级
    this.Util.querySysconst(this, "100", this.$store.state.SubjectOptions); //查询科目
    this.Util.querySysconst(this, "003", this.$store.state.ClassTypeOptions); //查询班型
    this.getData();
  },
  //计算属性
  computed: {
    //相当于过滤器
    data() {
      const self = this;
      if (!self.dataList) {
        return [];
      }
      return self.dataList.filter(function(d) {
        d.typeComputed = self.Util.GetLabelForValue(
          self.$store.state.SysconstType,
          d.type
        );
        return d;
      });
    }
  },
  watch: {
    sysconstModel: function() {
      this.getData();
    },
    changeForm2: function() {
      //修改的参数赋值
      this.ruleForm.id = this.changeForm2.id;
      this.ruleForm.type = this.changeForm2.type;
      this.ruleForm.code = this.changeForm2.code;
      this.ruleForm.value = this.changeForm2.value;
      this.ruleForm.remark = this.changeForm2.remark;
    }
  },
  methods: {
    //获取数据
    getData() {
      const self = this;
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        type: "ProjectType" // 常量类型，必填项
      };
      this.$axios
        .post(this.GlobalVal.httpLink.querySysconst, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              self.count = res.data.count;
              self.dataList = res.data.sysconsts;
              console.log(self.dataList);
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
      let objData1 = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        type: "Department" // 常量类型，必填项
      };
      this.$axios
        .post(this.GlobalVal.httpLink.querySysconst, JSON.stringify(objData1))
        .then(
          res => {
            if (res.data.code === "10000") {
              self.count = res.data.count;
              self.dataList1 = res.data.sysconsts;
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
      let objData2 = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        type: "Grade" // 常量类型，必填项
      };
      this.$axios
        .post(this.GlobalVal.httpLink.querySysconst, JSON.stringify(objData2))
        .then(
          res => {
            if (res.data.code === "10000") {
              self.count = res.data.count;
              self.dataList2 = res.data.sysconsts;
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
      let objData3 = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        type: "Subject" // 常量类型，必填项
      };
      this.$axios
        .post(this.GlobalVal.httpLink.querySysconst, JSON.stringify(objData3))
        .then(
          res => {
            if (res.data.code === "10000") {
              self.count = res.data.count;
              self.dataList3 = res.data.sysconsts;
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
      let objData4 = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        type: "ClassType" // 常量类型，必填项
      };
      this.$axios
        .post(this.GlobalVal.httpLink.querySysconst, JSON.stringify(objData4))
        .then(
          res => {
            if (res.data.code === "10000") {
              self.count = res.data.count;
              self.dataList4 = res.data.sysconsts;
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

    //删除事件
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let objData = {
            source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            delList: [
              {
                id: row.id
              }
            ]
          };
          this.$axios
            .post(this.GlobalVal.httpLink.delSysconst, JSON.stringify(objData))
            .then(
              res => {
                if (res.data.code === "10000") {
                  this.$message({
                    type: "success",
                    message: "删除成功!"
                  });
                  this.getData();
                  window.location.reload();
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
    //修改过的删除
    handleDelete1(row) {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let objData = {
            source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            delList: [
              {
                id: row
              }
            ]
          };
          this.$axios
            .post(this.GlobalVal.httpLink.delSysconst, JSON.stringify(objData))
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
                id: self.multipleSelection[i].id
              });
            }
            let objData = {
              source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
              staffId: JSON.parse(window.sessionStorage.getItem("staff"))
                .staffId,
              delList: delTeacher
            };
            self.multipleSelection = [];
            this.$axios
              .post(
                this.GlobalVal.httpLink.delSysconst,
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

    //翻页导航栏
    handleCurrentChange(val) {
      this.cur_page = val - 1;
      this.getData();
    },

    //每页显示数目发生变化
    handleSizeChange(val) {
      this.cur_limit = val;
      this.getData();
    },

    //搜索常量---刷新
    search() {
      if (this.select_word === "") {
        this.$message({
          type: "error",
          message: "填写要搜索的姓名或电话"
        });
      }
      this.getData();
    },
    //新增按钮事件
    handleAdd() {
      this.addTeamLayer = true;
      this.changeTeamLayer = false;
      //清空参数
      this.ruleForm.id = null; //bigint, 常量id
      //this.ruleForm.type="";//String,常量类型
      this.ruleForm.type = this.$options.propsData.massage;
      this.ruleForm.code = ""; //String, 常量编码
      this.ruleForm.value = ""; //String,常量值
    },
    handleAdd1(type) {
      this.addTeamLayer = true;
      this.changeTeamLayer = false;
      console.log(type);
      //清空参数
      this.ruleForm.id = null; //bigint, 常量id
      //this.ruleForm.type="";//String,常量类型
      //this.ruleForm.type = this.$options.propsData.massage;
      this.ruleForm.type = type;
      this.ruleForm.code = ""; //String, 常量编码
      this.ruleForm.value = ""; //String,常量值
      this.ruleForm.remark = "";
    },
    //新增/修改时候参数判断-转换
    varJug(obj) {
      let self = this;
      let o = obj;
      return o;
    },

    //新增--提交
    submitForm(formName) {
      const self = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let objData = {
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            sysconst: this.varJug(this.ruleForm)
          };
          console.log("新增/修改常量发起请求的参数", objData);
          this.$axios
            .post(this.GlobalVal.httpLink.editSysconst, JSON.stringify(objData))
            .then(
              res => {
                if (res.data.code === "10000") {
                  console.log("新增/修改常量获取的对象", res.data);
                  self.addTeamLayer = false;
                  self.getData();

                  if (this.changeTeamLayer) {
                    self.$message({
                      type: "success",
                      message: "修改成功"
                    });
                    this.getData();
                  } else {
                    self.$message({
                      type: "success",
                      message: "新增成功"
                    });
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
        } else {
          return false;
        }
      });
    },
    //修改按钮事件
    handleEdit(index, row) {
      this.changeTeamLayer = true;
      this.addTeamLayer = true;
      this.changeForm2 = row;
    },
    handleEdit1(row) {
      console.log(row);
      this.ruleForm.value = row.value;
      this.ruleForm.id = row.id;
      this.ruleForm.remark = row.remark;
      this.ruleForm.type = row.type;
      this.ruleForm.code = row.code;
      this.changeTeamLayer = true;
      this.addTeamLayer = true;
    }
  }
};
</script>

<style scoped>
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
  height: 280px;
}
.transition-box {
  position: absolute;
  width: 400px;
  height: 280px;
  margin: auto;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  border-radius: 4px;
  background-color: #ffffff;
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
.handle-box {
  margin-bottom: 20px;
}
.classType-box {
  width: 100%;
  height: 100%;
}
.class-box {
  width: 220px;
  height: 785px;
  background: #ffffff;
  float: left;
  padding: 20px;
  margin-right: 20px;
}
.el-icon-circle-plus-outline {
  font-size: 16px;
  float: right;
  cursor: pointer;
}
.classType {
  margin-top: 10px;
  font-size: 16px;
  background: #efefef;
  margin-bottom: 10px;
  padding-left: 20px;
  padding-bottom: 10px;
  padding-top: 10px;
  padding-right: 10px;
}
.classType i {
  float: right;
  font-size: 20px;
  cursor: pointer;
}
.class-box > div {
  height: 770px;
  margin-right: -20px;
  padding-right: 20px;
  overflow-y: auto;
}
</style>
