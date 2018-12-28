<template>
  <div class="table">
    <div class="search-warp">
      <el-input clearable size="mini" v-model="select_word" placeholder="输入要搜索的用户组名称" class="search-input">
        <el-button class="search-btn" slot="append" icon="el-icon-search" @keyup.enter.native="search" @click="search"></el-button>
      </el-input>
    </div>
    <div class="handle-box">
      <el-button type="primary" size="mini" icon="plus" class="handle-del mr10" @click="handleAdd">新增</el-button>
      <el-button type="primary" size="mini" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
    </div>
    <el-table :data="data" size="mini" stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="role_name" label="用户组名称"></el-table-column>
      <el-table-column prop="staff_number" label="关联人数"></el-table-column>
      <el-table-column prop="readOnly" label="是否只读"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button size="mini" type="primary" @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :total="count" :page-size="cur_limit" :page-sizes="[10,20,30,50]">
      </el-pagination>
    </div>
    <!--添加/修改弹出框-->
    <transition name="el-fade-in-linear">
      <div v-show="addTeamLayer" class="bg-layer">
        <transition name="el-zoom-in-center">
          <div v-if="addTeamLayer" class="transition-box">
            <div class="title-warp">
              <div class="close-btn" @click="addTeamLayer=!addTeamLayer">
                <i class="el-icon-close"></i>
              </div>
              <h3 v-if="!changeTeamLayer" class="modify-title">新增用户组</h3>
              <h3 v-if="changeTeamLayer" class="modify-title">编辑用户组</h3>
            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" style="height:480px;overflow-y:auto;margin-right:-20px;padding-right:20px;">
              <el-form-item label="角色名字" prop="role_name">
                <el-input v-model="ruleForm.role_name"></el-input>
              </el-form-item>
              <el-form-item label="是否只读">
                <el-radio-group v-model="ruleForm.read_only">
                  <el-radio label="是"></el-radio>
                  <el-radio label="否"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="权限分配">
                <el-tree :data="menuBars" show-checkbox node-key="id" ref="tree" :default-checked-keys="checkedQx" highlight-current @check="handleCheckChange" :props="defaultProps">
                </el-tree>
              </el-form-item>

              <el-form-item>
                <el-button v-if="!changeTeamLayer" type="primary" @click="submitForm('ruleForm')" style="width: 195px;margin-left: 40px">立即创建
                </el-button>
                <el-button v-if="changeTeamLayer" type="primary" @click="submitForm('ruleForm')" style="width: 195px;margin-left: 40px">确认修改
                </el-button>
                <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
                <el-button @click="addTeamLayer=!addTeamLayer" style="width: 195px;background: #dcdcdc;color: #f3f3f3">取消</el-button>
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
  data() {
    var checkNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("容纳人数不能为空"));
      }
      setTimeout(() => {
        if (isNaN(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value > 999 || value < 1) {
            callback(new Error("容纳人数在1-999之间"));
          } else {
            callback();
          }
        }
      }, 500);
    };

    return {
      cur_page: 0, //页码
      cur_limit: 10, //每次请求的数据数
      count: 0, //数据总量
      roleName: "",
      dataList: [], //请求的list
      checkedQx: [], // 选中的权限
      multipleSelection: [], //选中行的集合
      select_word: "", //搜索的值
      addTeamLayer: false, //新增弹出框状态
      changeTeamLayer: false, //修改弹出框状态
      ruleForm: {
        //新增数据
        role_id: "",
        role_name: "",
        staff_number: "",
        read_only: ""
      },

      //接收当前行的信息
      changeForm2: {},
      //表单校验规则
      rules: {
        role_name: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { max: 12, message: "最多能输入12字符", trigger: "blur" }
        ]
      },
      checkAll: [],
      checkedCities: [],
      menuBars: [],
      isIndeterminate: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      menuList: [] // 提交时选中的权限
    };
  },
  //实例创建完成后被立即调用
  created() {
    const self = this;
    this.getData();
    let objData = {};
    this.$axios.post(this.GlobalVal.httpLink.getAllMenu, JSON).then(
      res => {
        if (res.data.code === "10000") {
          console.log("查询所有菜单项-获取-的列表", res.data);

          this.menuBars = res.data.menuBar.map((item, i) => {
            return {
              id: item.menuId,
              button_ids: item.button_ids,
              label: item.menuName,
              children: item.subMenus.map((val, index) => {
                if (val.menuName === "报名") {
                  val.id = 9999;
                  let nav = [
                    { id: val.menuId, menuName: val.menuName },
                    { id: "010101", menuName: "超额报名" },
                    { id: "010102", menuName: "超额转班" },
                    { id: "010103", menuName: "超额调课" },
                    { id: "010104", menuName: "超额退费" },
                    { id: "010105", menuName: "退款申请" }
                  ];
                  return this.addNav(val, nav);
                }
                if (val.menuName === "班级查询") {
                  let nav = [
                    { id: val.menuId, menuName: val.menuName },
                    { id: "010301", menuName: "导出班级" },
                    { id: "010302", menuName: "导出学生" }
                  ];
                  return this.addNav(val, nav);
                }
                if (val.menuName === "转班查询") {
                  let nav = [
                    { id: val.menuId, menuName: val.menuName },
                    { id: "010601", menuName: "转班导出" }
                  ];
                  return this.addNav(val, nav);
                }
                if (val.menuName === "调课查询") {
                  let nav = [
                    { id: val.menuId, menuName: val.menuName },
                    { id: "010701", menuName: "调课导出" }
                  ];
                  return this.addNav(val, nav);
                }
                if (val.menuName === "签到管理") {
                  let nav = [
                    { id: val.menuId, menuName: val.menuName },
                    { id: "010802", menuName: "超时修改签到" },
                    { id: "010801", menuName: "签到信息导出" }
                  ];
                  return this.addNav(val, nav);
                }
                if (val.menuName === "教室管理") {
                  let nav = [
                    { id: val.menuId, menuName: val.menuName },
                    { id: "020201", menuName: "导出教室课表" }
                  ];
                  return this.addNav(val, nav);
                }
                if (val.menuName === "学员信息管理") {
                  let nav = [
                    { id: val.menuId, menuName: val.menuName },
                    { id: "021201", menuName: "导出学员" }
                  ];
                  return this.addNav(val, nav);
                }
                if (val.menuName === "班级运营数据") {
                  let nav = [
                    { id: val.menuId, menuName: val.menuName },
                    { id: "040101", menuName: "导出班级运营数据" }
                  ];
                  return this.addNav(val, nav);
                }
                if (val.menuName === "学员运营数据") {
                  let nav = [
                    { id: val.menuId, menuName: val.menuName },
                    { id: "040201", menuName: "导出学员运营数据" }
                  ];
                  return this.addNav(val, nav);
                }
                if (val.menuName === "收入情况") {
                  let nav = [
                    { id: val.menuId, menuName: val.menuName },
                    { id: "030101", menuName: "导出收入情况" }
                  ];
                  return this.addNav(val, nav);
                }
                if (val.menuName === "退费管理") {
                  let nav = [
                    { id: val.menuId, menuName: val.menuName },
                    { id: "030301", menuName: "导出退费情况" },
                    { id: "030302", menuName: "退款审核" },
                    { id: "030303", menuName: "退款打款" },
                    { id: "030304", menuName: "打款重置" }
                  ];
                  return this.addNav(val, nav);
                }
                if (val.menuId === 75) {
                  let nav = [
                    { id: val.menuId, menuName: val.menuName },
                    { id: "131002", menuName: "修改订单时间" },
                    { id: "131003", menuName: "修改订单价钱" }
                  ];
                  return this.addNav(val, nav);
                }
                if (val.menuId === 63) {
                  let nav = [
                    { id: val.menuId, menuName: val.menuName },
                    { id: "031001", menuName: "删除订单" },
                    { id: "031002", menuName: "修改订单时间" },
                    { id: "031003", menuName: "修改订单价钱" }
                  ];
                  return this.addNav(val, nav);
                }
                return {
                  id: val.menuId,
                  button_ids: val.button_ids,
                  label: val.menuName,
                  children:
                    val.subMenus &&
                    val.subMenus.map(val => {
                      console.log(val);
                      if (val.menuName === "业务量查询列表") {
                        let nav = [
                          { id: val.menuId, menuName: val.menuName },
                          { id: "011101", menuName: "业务量导出" }
                        ];
                        return this.addNav(val, nav);
                      }
                      if (val.menuName === "缴费查询") {
                        let nav = [
                          { id: val.menuId, menuName: val.menuName },
                          { id: "011201", menuName: "订单导出" },
                          { id: "011202", menuName: "其他订单导出" }
                        ];
                        return this.addNav(val, nav);
                      }
                      if (val.menuName === "校区对帐") {
                        let nav = [
                          { id: val.menuId, menuName: val.menuName },
                          { id: "011401", menuName: "校区对账导出" }
                        ];
                        return this.addNav(val, nav);
                      }
                      if (val.menuName === "退费查询") {
                        let nav = [
                          { id: val.menuId, menuName: val.menuName },
                          { id: "011301", menuName: "退费导出" }
                        ];
                        return this.addNav(val, nav);
                      }
                      if (val.menuName === "教师管理") {
                        let nav = [
                          { id: val.menuId, menuName: val.menuName },
                          { id: "020301", menuName: "导出教师课表" }
                        ];
                        return this.addNav(val, nav);
                      }
                      if (val.menuName === "班级管理") {
                        let nav = [
                          { id: val.menuId, menuName: val.menuName },
                          { id: "020701", menuName: "导出班级" }
                        ];
                        return this.addNav(val, nav);
                      }
                      return {
                        id: val.menuId,
                        button_ids: val.button_ids,
                        label: val.menuName,
                        children: ""
                      };
                    })
                };
              })
            };
          });
          console.log("checkin", this.menuBars);
          for (let i = 0; i < this.menuBars.length; i++) {
            this.$set(this.checkAll, i, false);
            this.$set(this.isIndeterminate, i, false);
            this.$set(this.checkedCities, i, []);
          }
        } else {
          this.$message({
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
  //计算属性
  computed: {
    //相当于过滤器
    data() {
      const self = this;
      if (!self.dataList) {
        return [];
      }
      return self.dataList.filter(function(d) {
        if (d.read_only) {
          d.readOnly = "是";
        } else {
          d.readOnly = "否";
        }

        return d;
      });
    }
  },
  watch: {
    select_word: function() {
      this.role_name = this.select_word;
    },
    changeForm2: function() {
      //修改的参数赋值
      if (this.changeForm2.read_only) {
        this.ruleForm.read_only = "是";
      } else {
        this.ruleForm.read_only = "否";
      }
      this.ruleForm.role_id = this.changeForm2.role_id;
      this.ruleForm.role_name = this.changeForm2.role_name;
      this.ruleForm.staff_number = this.changeForm2.staff_number;
      this.ruleForm.created_at = this.changeForm2.created_at;
      let menuBarOption = [],
        menuNameOption = [];
      //   for (let i = 0; i < this.changeForm2.menuBar.length; i++) {
      //     menuBarOption.push(this.changeForm2.menuBar[i].menuName);
      //     this.checkAll[i] = menuBarOption;
      //     for (let j = 0; j < this.changeForm2.menuBar[i].subMenus.length; j++) {
      //       menuNameOption.push(this.changeForm2.menuBar[i].subMenus[j].menuName);
      //       this.checkedCities[j] = menuNameOption;
      //     }
      //   }
    }
  },
  methods: {
    addNav(val, nav) {
      val.children = nav.map(item => {
        return {
          id: item.id,
          fid: val.menuId,
          button_ids: item.id,
          label: item.menuName,
          children: ""
        };
      });
      return {
        id: val.menuId,
        button_ids: val.button_ids,
        label: val.menuName,
        children: val.children
      };
    },
    // tree节点点击
    handleCheckChange(data, isChecked) {
      let keys = [...new Set(isChecked.checkedKeys)];
      this.menuList = keys.map(item => {
        if (item && typeof item !== "string") {
          let obj = {
            menu_id: item
          };
          let button = "";
          isChecked.checkedNodes.forEach((ele, index) => {
            if (ele.fid) {
              if (item === ele.fid) {
                let str = ele.fid + ",";
                button += ele.id + ",";
                obj.button_ids = button.slice(str.length);
              }
            }
          });
          return obj;
        }
      });
      /*  let buttonIds = keys.filter(item=>(typeof item === 'string')).join(',');
        this.menuList = keys.map(item=>{
          if(item && typeof item !== 'string'){
              let obj = {
                  menu_id: item
              };
              if(item === 6){
                  obj.button_ids = buttonIds;
              }
              return obj;
          }
        }) */
      let parentKeys = isChecked.halfCheckedKeys.map(item => ({
        menu_id: item
      }));
      this.menuList.forEach(item => {
        if (item !== undefined) {
          parentKeys = parentKeys.filter(val => val.menu_id !== item.menu_id);
        }
      });
      this.menuList.unshift(...parentKeys);
    },
    //获取数据
    getData() {
      const self = this;
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        page: this.cur_page, //页数
        limit: this.cur_limit, //条目数
        roleName: this.role_name
      };
      console.log("查询角色发起请求的参数", objData);
      this.$axios
        .post(this.GlobalVal.httpLink.queryRoles, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              console.log("查询角色获取的对象", res.data);
              this.count = res.data.count;
              this.dataList = res.data.roles;
              console.log(res.data.roles);
            } else {
              this.$message({
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

    handleCheckAllChange(index) {
      console.log(index, "handleCheckAllChange");
      let checkOption = [];
      if (
        this.checkedCities[index].length !==
        this.menuBars[index].subMenus.length
      ) {
        this.checkAll[index] = true;
        for (
          let i = 0, length = this.menuBars[index].subMenus.length;
          i < length;
          i++
        ) {
          checkOption.push(this.menuBars[index].subMenus[i].menuName);
        }
        this.checkedCities[index] = checkOption;
      } else {
        this.checkedCities[index] = [];
      }
      this.isIndeterminate[index] = false;
    },
    handleCheckedCitiesChange(index) {
      console.log(index, "handleCheckedCitiesChange");
      console.log(this.checkedCities, "checkedCities");
      let checkedCount = this.checkedCities[index].length;
      this.isIndeterminate[index] =
        checkedCount > 0 && checkedCount < this.menuBars[index].subMenus.length;
      this.checkAll[index] =
        checkedCount === this.menuBars[index].subMenus.length;
      console.log(this.checkAll, "checkAll");
    },

    //重新选择了地区事件
    handleLocationChange(value) {},
    //重新筛选函数
    screening() {
      this.getData();
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
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            delList: [
              {
                id: row.role_id
              }
            ]
          };
          this.$axios
            .post(this.GlobalVal.httpLink.delRole, JSON.stringify(objData))
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
                id: self.multipleSelection[i].role_id
              });
            }

            let objData = {
              staffId: JSON.parse(window.sessionStorage.getItem("staff"))
                .staffId,
              delList: delTeacher
            };
            self.multipleSelection = [];
            this.$axios
              .post(this.GlobalVal.httpLink.delRole, JSON.stringify(objData))
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
    //搜索用户组名称---刷新
    search() {
      this.cur_page = 0;
      this.getData();
    },
    //新增按钮事件
    handleAdd() {
      //this.resetForm("ruleForm");
      this.addTeamLayer = true;
      this.changeTeamLayer = false;
      //清空参数
      this.ruleForm.role_id = "";
      this.ruleForm.role_name = "";
      this.ruleForm.staff_number = "";
      this.ruleForm.read_only = "";
      //this.ruleForm.menuList = [];
      //this.ruleForm.created_at = null;
    },
    //新增/修改时候参数判断-转换
    varJug(obj) {
      let self = this;
      let o = obj;
      if (o.read_only === "是") {
        o.read_only = true;
      } else {
        o.read_only = false;
      }
      return o;
    },

    //新增--提交
    submitForm(formName) {
      const self = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let objData = {
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            role: this.varJug(this.ruleForm),
            menuList: this.menuList.filter(item => item)
          };
          console.log("新增/修改角色发起请求的参数", objData);
          if (!this.menuList.length) {
            // 如果未操作权限就直接关闭弹出框，不做请求处理
            this.addTeamLayer = false;
            return;
          }
          let loadingInstance = this.$Loading();
          this.$axios
            .post(this.GlobalVal.httpLink.editRole, JSON.stringify(objData))
            .then(
              res => {
                if (res.data.code === "10000") {
                  console.log("新增/修改角色获取的对象", res.data);
                  self.addTeamLayer = false;
                  self.$message({
                    type: "success",
                    message: "操作成功"
                  });
                  self.getData();
                } else {
                  self.$message({
                    type: "error",
                    message: res.data.errmsg
                  });
                }
                loadingInstance.close();
              },
              res => {
                loadingInstance.close();
                self.$message("请求失败");
              }
            );
        } else {
          return false;
        }
      });
    },
    //编辑按钮点击事件
    handleEdit(index, row) {
      /*
        TODO
        单独只选中报名－报名时候还存在BUG待调试.
      */
      this.changeTeamLayer = true;
      this.addTeamLayer = true;
      this.changeForm2 = row;
      this.menuList = []; // 重置选中的节点
      if (this.dataList.length) {
        let arrBP = arr =>
          arr.reduce((a, b) => a.concat(Array.isArray(b) ? arrBP(b) : b), []);
        let key =
          this.dataList[index].menuBar &&
          this.dataList[index].menuBar.map(item => {
            return (
              item.subMenus &&
              item.subMenus.map(item => {
                if (item.button_ids) {
                  let arr = [];
                  arr.push(item.menuId);
                  arr.push(...item.button_ids.split(","));
                  return arr;
                }
                return item.menuId;
              })
            );
          });
        key = key ? arrBP(key) : [];
        console.log(key);
        this.checkedQx = key;
      }
    },
    /*//修改提交事件
            submitEditForm(formName){
                const self = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let objData={
                            staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                            teacher:this.varJug(this.ruleForm)
                        };
                        console.log("修改教师发起请求的参数",objData);
                        this.$axios.post(this.GlobalVal.httpLink.editTeacherlevel,JSON.stringify(objData)).then(
                            res=>{
                                if(res.data.code==="10000"){
                                    console.log("修改教师获取的对象",res.data);
                                    this.changeTeamLayer = false;
                                    this.$message({
                                        type:"success",
                                        message:"修改成功"
                                    });
                                    self.getData();
                                }else{
                                    this.$message({
                                        type:"error",
                                        message:res.data.errmsg
                                    })
                                }
                            },
                            res=>{
                                this.$message("请求失败")
                            }
                        )
                    } else {
                        return false;
                    }
                });
            },*/
    //新增/修改教师等级--重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.add-qx {
  margin-left: 0;
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
  width: 750px;
  height: 550px;
  min-height: 550px;
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
  width: 750px;
  height: 50px;
  top: 0px;
  right: 0;
  z-index: 10;
  background: #f3f3f3;
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
.el-icon-close::before {
  line-height: 50px;
  color: #b7b7b7;
}
.title-warp > h3 {
  font-size: 16px;
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
  /*display: inline-block;*/
  float: right;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
/*搜索*/
.search-warp {
  display: inline-block;
  width: 300px;
}
</style>
