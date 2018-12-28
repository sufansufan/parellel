<template>
    <div class="table">
        <div class="handle-box">
            <el-select clearable v-model="particular_year" size="mini" placeholder="年度">
                <el-option
                        v-for="item in $store.state.YearOptions"
                        :key="item.code"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-select clearable v-model="season" size="mini" placeholder="季节">
                <el-option
                        v-for="item in $store.state.SeasonOptions"
                        :key="item.code"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-select clearable v-model="periods" size="mini" placeholder="期别不限">
                <el-option
                        v-for="item in $store.state.PeriodsOptions"
                        :key="item.code"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-select clearable v-model="grade" size="mini" placeholder="年级不限">
                <el-option
                        v-for="item in $store.state.GradeOptions"
                        :key="item.code"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-select clearable v-model="subject" size="mini" placeholder="科目不限">
                <el-option
                        v-for="item in $store.state.SubjectOptions"
                        :key="item.code"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-select clearable v-model="projectType" size="mini" placeholder="类别不限">
                <el-option

                        v-for="item in $store.state.ProjectTypeOptions"
                        :key="item.code"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-select clearable v-model="classType" size="mini" placeholder="班型不限">
                <el-option
                        v-for="item in $store.state.ClassTypeOptions"
                        :key="item.code"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-cascader clearable
                    size="mini"
                    expand-trigger="click"
                    :options="location"
                    v-model="selectedLocation"
                    placeholder="选择学校"
                    change-on-select
                    style="width: 240px;">
            </el-cascader>
            <!--<div class="headle-right">
                <el-button type="primary" size="mini" icon="plus" class="handle-del mr10" @click="handleAdd">新增</el-button>
                &lt;!&ndash;<el-button type="primary" size="mini" icon="search"  @click="screening">筛选</el-button>&ndash;&gt;
                <el-button type="primary" size="mini" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
            </div>-->
        </div>
        <el-table :data="data" size="mini" stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="campus_name" label="校区"></el-table-column>
            <el-table-column prop="class_type" label="班型"></el-table-column>
            <el-table-column prop="classroom_name" label="教室"></el-table-column>
            <el-table-column prop="resubmit_signup_starttime" label="续报开始日期"></el-table-column>
            <el-table-column prop="app_signup_starttime" label="APP报名日期"></el-table-column>
            <el-table-column prop="app_re_signup_starttime" label="APP预定日期"></el-table-column>
            <el-table-column prop="reception_signup_starttime" label="前台报名日期"></el-table-column>
            <el-table-column prop="web_signup_starttime" label="网页报名日期"></el-table-column>
            <el-table-column label="操作" width="200">

                <template slot-scope="scope">
                    <el-button size="mini"
                               @click="handleEdit(scope.$index, scope.row)" type="primary">编辑
                    </el-button>
                    <el-button size="mini" type="primary"
                               @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <div class="pagination">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="count"
                    :page-size="cur_limit"
                    :page-sizes="[10,20,30,50]">
            </el-pagination>
        </div>
        <!--添加弹出框-->
        <transition name="el-fade-in-linear">
            <div v-show="addTeamLayer" class="bg-layer">
                <transition name="el-zoom-in-center">
                    <div v-if="addTeamLayer" class="transition-box">
                        <div class="title-warp">
                            <div class="close-btn" @click="addTeamLayer=!addTeamLayer"><i class="el-icon-close"></i></div>
                            <h3 v-if="!changeTeamLayer" class="modify-title">新增教室</h3>
                            <h3 v-if="changeTeamLayer" class="modify-title">编辑网报时间维护</h3>
                        </div>
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                            <el-form-item label="教室名称" prop="croom_name" >
                                <el-input v-model="ruleForm.classroom_name"  disabled ></el-input>
                            </el-form-item>
                            <el-form-item  label="校区">
                                <el-input v-model="ruleForm.campus_name"  disabled ></el-input>
                            </el-form-item>
                            <el-form-item label="续报日期" prop="resubmit_signup_starttime" style="display: inline-block;width: 200px;padding-right: 150px">
                                <div class="block">
                                    <el-date-picker
                                            v-model="ruleForm.resubmit_signup_starttime"
                                            type="date"
                                            placeholder="选择日期时间">
                                    </el-date-picker>
                                </div>
                            </el-form-item>
                            <el-form-item label="App报名日期" prop="app_signup_starttime" style="display: inline-block;width: 200px">
                                <div class="block">
                                    <el-date-picker
                                            v-model="ruleForm.app_signup_starttime"
                                            type="date"
                                            placeholder="选择日期时间">
                                    </el-date-picker>
                                </div>
                            </el-form-item>
                            <el-form-item label="前台报名日期" prop="reception_signup_starttime" style="display: inline-block;width: 200px;padding-right: 150px">
                                <div class="block">
                                    <el-date-picker
                                            v-model="ruleForm.reception_signup_starttime"
                                            type="date"
                                            placeholder="选择日期时间">
                                    </el-date-picker>
                                </div>
                            </el-form-item>
                            <el-form-item label="App预定日期" prop="app_re_signup_starttime" style="display: inline-block;width: 200px">
                                <div class="block">
                                    <el-date-picker
                                            v-model="ruleForm.app_re_signup_starttime"
                                            type="date"
                                            placeholder="选择日期时间">
                                    </el-date-picker>
                                </div>
                            </el-form-item>
                            <el-form-item label="网页报名日期" prop="web_signup_starttime">
                                <div class="block">
                                    <el-date-picker
                                            v-model="ruleForm.web_signup_starttime"
                                            type="date"
                                            placeholder="选择日期时间">
                                    </el-date-picker>
                                </div>
                            </el-form-item>
                            <el-form-item>
                                <el-button v-if="!changeTeamLayer" type="primary" size="medium" style="width: 195px;margin-left: 40px" @click="submitForm('ruleForm')">保存</el-button>
                                <el-button v-if="changeTeamLayer" type="primary" @click="submitForm('ruleForm')" style="width: 195px;margin-left: 40px">保存</el-button>
                                <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
                                <el-button @click="addTeamLayer=!addTeamLayer" size="medium" style="width: 195px;background: #dcdcdc;color: #f3f3f3">取消</el-button>
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
    return {
      cur_page: 0, //页码
      cur_limit: 10, //每次请求的数据数
      count: 0,
      particular_year: "", //年份
      season: "", //期别(春,秋,寒,暑)
      periods: "", //期数 一期 ,二期
      grade: "", //年级
      subject: "", //科目
      project_type: "", //项目类型：长期，短期，公益，考试等
      classType: "",
      class_type: "", //班型
      campus_id: "", //校区名称
      organ_id2: [],
      dataList: [
        {
          campus_name: "45454"
        }
      ], //请求的list
      projectType: "",
      location: [], //校区导航
      selectedLocation: [], //选择校区
      multipleSelection: [], //选中行的集合
      addTeamLayer: false, //新增弹出框状态
      changeTeamLayer: false, //修改弹出框状态
      ruleForm: {
        //新增数据
        resubmit_signup_starttime: "",
        app_signup_starttime: "",
        reception_signup_starttime: "",
        app_re_signup_starttime: "",
        web_signup_starttime: ""
      },
      //接收当前行的信息
      changeForm2: {},
      //表单校验规则
      rules: {
        resubmit_signup_starttime: [
          { required: true, message: "请输入时间", trigger: "blur" }
        ],
        app_signup_starttime: [
          { required: true, message: "请输入时间", trigger: "blur" }
        ],
        reception_signup_starttime: [
          { required: true, message: "请输入时间", trigger: "blur" }
        ],
        app_re_signup_starttime: [
          { required: true, message: "请输入时间", trigger: "blur" }
        ],
        web_signup_starttime: [
          { required: true, message: "请输入时间", trigger: "blur" }
        ]
      }
    };
  },
  //实例创建完成后被立即调用
  created() {
    const self = this;
    //查询区域导航
    this.Util.queryAreaNav(self, -1, function() {
      self.getData();
    });
    self.location = self.$store.state.location;
    this.Util.querySysconst(this, "021", this.$store.state.KnowChannleOptions); //查询了解渠道
    this.Util.querySysconst(this, "100", this.$store.state.SubjectOptions); //查询科目
    this.Util.querySysconst(this, "006", this.$store.state.SeasonOptions); //查询季节
    this.Util.querySysconst(this, "009", this.$store.state.PeriodsOptions); //查询期别
    this.Util.querySysconst(this, "101", this.$store.state.GradeOptions); //查询年级
    this.Util.querySysconst(this, "001", this.$store.state.ProjectTypeOptions); //项目类型
    this.Util.querySysconst(this, "002", this.$store.state.CourseTypeOptions); //查询类别/课型
    this.Util.querySysconst(this, "003", this.$store.state.ClassTypeOptions); //查询班型
    this.Util.querySysconst(this, "007", this.$store.state.DepartmentOptions); //查询学部
  },
  //计算属性
  computed: {
    data() {
      const self = this;
      if (!self.dataList) {
        return [];
      }
      return self.dataList.map(function(d) {
        for (let i in d) {
          if (d[i] && d[i] !== null) {
            if (i == "class_type" && !isNaN(+d[i])) {
              let classType = self.Util.GetLabelForValue(
                self.$store.state.ClassTypeOptions,
                d[i]
              );
              if (classType !== "未知") {
                d[i] = classType;
              }
            } else if (
              [
                "resubmit_signup_starttime",
                "app_signup_starttime",
                "app_re_signup_starttime",
                "reception_signup_starttime",
                "web_signup_starttime"
              ].indexOf(i) != -1
            ) {
              d[i] = self.Util.TimeCycle(d[i], "ymd");
            }
          }
        }
        return d;
      });
    }
  },
  watch: {
    selectedLocation: function() {
      if (
        this.selectedLocation.includes(
          JSON.parse(window.sessionStorage.getItem("staff")).staffOrganId
        )
      ) {
        this.coupon_id = this.selectedLocation[
          this.selectedLocation.length - 1
        ];
        this.getData("pageClear");
      } else if (this.selectedLocation.length === 0) {
        this.coupon_id = "";
        this.getData("pageClear");
      }
    },
    organ_id2: function() {
      //选择学校
      function getOrganName(obj, id) {
        for (let i = 0; i < obj.length; i++) {
          if (obj[i].value === id) {
            if (obj[i].children.length > 0) {
              return obj[i].children;
            }
          }
        }
      }

      if (
        this.organ_id2 &&
        this.organ_id2.length &&
        this.organ_id2.length > 0
      ) {
        let obj = this.location;
        for (let i = 0; i < this.organ_id2.length - 1; i++) {
          obj = getOrganName(obj, this.organ_id2[i]);
        }
        for (let i = 0; i < obj.length; i++) {
          if (this.organ_id2[this.organ_id2.length - 1] === obj[i].value) {
            this.ruleForm.organ_name = obj[i].label;
          }
        }

        this.ruleForm.organ_id = this.organ_id2[this.organ_id2.length - 1];
      }
    },
    /*  select_equipment:function () {
                const  self = this;
                if(this.select_equipment!==""){
                    console.log('1');
                    self.equipment = this.select_equipment.join('');
                }

            },*/
    changeForm2: function() {
      this.ruleForm.classroom_name = this.changeForm2.classroom_name;
      this.ruleForm.campus_name = this.changeForm2.campus_name;
      this.ruleForm.resubmit_signup_starttime = this.changeForm2.resubmit_signup_starttime;
      console.log(11111111, this.changeForm2);
      this.ruleForm.class_id = this.changeForm2.class_id;
      this.ruleForm.reception_signup_starttime = this.changeForm2.reception_signup_starttime;
      this.ruleForm.web_signup_starttime = this.changeForm2.web_signup_starttime;
      this.ruleForm.app_signup_starttime = this.changeForm2.app_signup_starttime;
      this.ruleForm.app_re_signup_starttime = this.changeForm2.app_re_signup_starttime;
    },
    particular_year: function() {
      //年度改变
      this.getData("pageClear");
    },
    season: function() {
      // 季节
      this.getData("pageClear");
    },
    periods: function() {
      //期别
      this.getData("pageClear");
    },
    grade: function() {
      //年级
      this.getData("pageClear");
    },
    subject: function() {
      //科目
      this.getData("pageClear");
    },
    projectType: function() {
      //类别/课型不限
      this.getData("pageClear");
    },
    classType: function() {
      //班型
      this.getData("pageClear");
    }
  },
  methods: {
    //获取数据
    getData(pageClear) {
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        page: pageClear ? (this.cur_page = 0) : this.cur_page,
        limit: this.cur_limit,
        particularYear: this.particular_year,
        season: this.season,
        periods: this.periods,
        grade: this.grade,
        subject: this.subject,
        projectType: this.projectType,
        classType: this.classType,
        campusId: this.coupon_id
      };
      console.log("查询网报学校管理发起请求的参数", objData);
      this.$axios
        .post(this.GlobalVal.httpLink.queryClassTime, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              console.log("网报学校管理获取的对象", res.data);
              this.count = res.data.count;
              this.dataList = res.data.pxxClass;
              console.log(res.data.pxxClass);
            } else {
              console.error(res);
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
    //重新选择了地区事件
    handleLocationChange(value) {},

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
                id: row.class_id
              }
            ]
          };
          this.$axios
            .post(this.GlobalVal.httpLink.delClassTime, JSON.stringify(objData))
            .then(
              res => {
                if (res.data.code === "10000") {
                  this.$message({
                    type: "success",
                    message: "删除成功!"
                  });
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
    /*  delAll() { //批量删除按钮触发
                const self = this;
                if(this.multipleSelection.length>0) {
                    this.$confirm('此操作将永久删除这些名单, 是否继续?', '警告', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let roomId = [];
                        for (let i = 0, length = self.multipleSelection.length; i < length; i++) {
                            roomId.push({
                                id: self.multipleSelection[i].croom_id
                            });
                        }

                        let objData={
                            staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                            delList:roomId
                        };
                        self.multipleSelection = [];
                        this.$axios.post(this.GlobalVal.httpLink.delClassroom,JSON.stringify(objData)).then(
                            res=>{
                                if(res.data.code==="10000"){
                                    this.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    });
                                    this.getData();
                                }else{
                                    console.error(res);
                                    this.$message({
                                        type: 'error',
                                        message: res.data.errmsg
                                    });
                                }
                            },
                            res=>{
                                console.error(res);
                                this.$message({
                                    type: 'error',
                                    message: "操作失败"
                                });
                            }
                        );
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }else{
                    this.$message({
                        type: 'info',
                        message: '没有选中任何项'
                    });
                }
            },*/

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

    //新增按钮事件
    /*  handleAdd(){
                this.ruleForm.status=true;
                this.addTeamLayer = true;
                this.ruleForm.croom_id="";
                this.ruleForm.croom_name="";
                this.ruleForm.organ_id="";
                this.ruleForm.organ_name="";
                this.ruleForm.max_student_number="";
                this.ruleForm.equipment=[];
                this.organ_id2=[];
                this.ruleForm_equipment=[];
                this.ruleForm.created_at=null;
            },*/
    //新增/修改时候参数判断-转换
    varJug(obj) {
      let self = this;
      let o = obj;
      o.resubmit_signup_starttime = this.Util.TimeCycle(
        new Date(o.resubmit_signup_starttime).getTime(),
        "ymd"
      );
      o.app_signup_starttime = this.Util.TimeCycle(
        new Date(o.app_signup_starttime).getTime(),
        "ymd"
      );
      o.reception_signup_starttime = this.Util.TimeCycle(
        new Date(o.reception_signup_starttime).getTime(),
        "ymd"
      );
      o.app_re_signup_starttime = this.Util.TimeCycle(
        new Date(o.app_re_signup_starttime).getTime(),
        "ymd"
      );
      o.web_signup_starttime = this.Util.TimeCycle(
        new Date(o.web_signup_starttime).getTime(),
        "ymd"
      );

      return o;
    },
    //新增--提交
    submitForm(formName) {
      const self = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let objData = {
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            pxxclass: this.varJug(this.ruleForm)
          };
          console.log("编辑网报时间发起请求的参数", objData);
          this.$axios
            .post(
              this.GlobalVal.httpLink.updateClassTime,
              JSON.stringify(objData)
            )
            .then(
              res => {
                if (res.data.code === "10000") {
                  console.log("编辑网报时间获取的对象", res.data);
                  self.$message({
                    type: "success",
                    message: "编辑成功"
                  });
                  self.getData();
                } else {
                  console.error(res);
                  self.$message({
                    type: "error",
                    message: res.data.errmsg
                  });
                }
                self.addTeamLayer = false;
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
      console.log(22222, row);
      this.changeTeamLayer = true;
      this.addTeamLayer = true;
      this.changeForm2 = row;
    },
    //新增/修改教师等级--重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //选择年份
    yearChange() {
      const self = this;
      if (this.particular_year !== "") {
        console.log("1");
        self.particular_year = this.particular_year.join("");
        console.log(self.particular_year);
      }
      this.getData();
    },
    //选择季节
    seasonChange() {
      const self = this;
      if (this.season !== "") {
        console.log("1");
        self.season = this.season.join("");
        console.log(self.season);
      }
      this.getData();
    },
    //选择期别
    periodsChange() {
      const self = this;
      if (this.periods !== "") {
        console.log("1");
        self.periods = this.periods.join("");
        console.log(self.periods);
      }
      this.getData();
    },
    //年级不限
    gradeChange() {
      const self = this;
      if (this.grade !== "") {
        console.log("1");
        self.grade = this.grade.join("");
        console.log(self.grade);
      }
      this.getData();
    },
    //科目不限
    projectChange() {
      const self = this;
      if (this.subject !== "") {
        console.log("1");
        self.subject = this.subject.join("");
        console.log(self.subject);
      }
      this.getData();
    },
    schoolGradeChange() {
      const self = this;
      if (this.project_type !== "") {
        console.log("1");
        self.project_type = this.project_type.join("");
        console.log(self.project_type);
      }
      this.getData();
    },
    classTypeChange() {
      const self = this;
      if (this.class_type !== "") {
        console.log("1");
        self.class_type = this.class_type.join("");
        console.log(self.class_type);
      }
      this.getData();
    },
    //重新筛选函数
    screening() {
      const self = this;
      if (this.campus_id !== "") {
        console.log("1");
        self.campus_id = this.campus_id.join("");
        console.log(self.campus_name);
      }
      this.getData();
    }
  }
};
</script>
<style>
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
  height: 650px;
  min-height: 480px;
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
.title-warp > h3 {
  font-size: 16px;
}
.demo-ruleForm .el-form-item {
  margin-bottom: 35px;
}
.el-icon-close::before {
  line-height: 50px;
  color: #b7b7b7;
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
.headle-right {
  display: block;
  float: right;
}
</style>
