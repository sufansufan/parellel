<template>
  <div class="teacher-level-man">
    <div class="options">
      <div>
        <el-input clearable v-model="options.teacherNo" placeholder="工号" class="input-with-select" size="mini" @keyup.native.enter="getButtonData">
          <el-button icon="el-icon-search" slot="append" @click="getButtonData"></el-button>
        </el-input>
      </div>
      <div>
        <el-input clearable v-model="options.teacherNameAndPhone" placeholder="请输入教师姓名/手机号" class="input-with-select" size="mini" @keyup.native.enter="getButtonData">
          <el-button icon="el-icon-search" slot="append" @click="getButtonData"></el-button>
        </el-input>
      </div>
      <div>
        <el-select clearable v-model="options.watch.subject" placeholder="选择科目" size="mini">
          <el-option v-for="item in $store.state.SubjectOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <el-select clearable v-model="options.watch.levelName" placeholder="级别名称" size="mini">
          <el-option v-for="item in levelName" :key="item.value" :label="item.extra" :value="item.tlevel_id">
          </el-option>
        </el-select>
      </div>
      <!--  <div>
        <el-select clearable v-model="options.watch.commonLevel" placeholder="基本级别" size="mini">
          <el-option v-for="item in levelName" :key="item.value" :label="item.tlevel_name" :value="item.tlevel_id">
          </el-option>
        </el-select>
      </div> -->
      <div>
        <el-cascader size="mini" clearable expand-trigger="click" :options="location" v-model="selectOrganId" placeholder="学校不限" change-on-select>
        </el-cascader>
      </div>
      <div class="btn">
        <el-button type="primary" size="mini" icon="delete" class="handle-del mr10" @click="exportTeacher">导出</el-button>
        <el-button type="primary" size="mini" icon="plus" class="handle-del mr10" @click="handleAdd('','add')">新增</el-button>
        <el-button type="danger" size="mini" icon="plus" class="handle-del mr10" @click="handleDelete('','all')" :disabled="!(multipleSelection.length>1)">批量删除</el-button>
      </div>
    </div>
    <div class="teacher-table">
      <el-table :data="dataList" size="mini" stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange" @sort-change="sortChange" v-loading="loading">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="campusname" label="校区" sortable="custom"></el-table-column>
        <el-table-column prop="subjectname" label="科目" sortable="custom"></el-table-column>
        <el-table-column prop="teacherno" label="工号" sortable="custom"></el-table-column>
        <el-table-column prop="teachername" label="姓名"></el-table-column>
        <el-table-column prop="teachermobile" label="手机号"></el-table-column>
        <el-table-column prop="levelname" label="级别名称"></el-table-column>
        <el-table-column prop="commonlevel" label="基本级别"></el-table-column>
        <el-table-column prop="tlevelsalary" label="课时费"></el-table-column>
        <el-table-column prop="compulsoryhour" label="义务课时"></el-table-column>
        <el-table-column prop="takeeffecdateasc" label="生效日期" sortable="custom"></el-table-column>
        <el-table-column prop="updateby" label="操作人"></el-table-column>
        <el-table-column prop="updatedate" label="操作日期"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleAdd(scope.row,'edit')">编辑
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id, 'self')">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :total="count" :page-size="limit" :page-sizes="[10,20,30,50]">
      </el-pagination>
    </div>
    <Dialog :title="titleRemind" titbg ref="dialog" bodyWid="40%" bodyTop="200px">
      <div class="rule-form">
        <el-form ref="ruleForm" :model="ruleForm" label-width="0px" :rules="rules">
          <div>
            <el-form-item>
              <p>所属校区</p>
              <el-cascader size="mini" clearable expand-trigger="click" :options="location" v-model="selectedLocation" placeholder="学校不限" change-on-select>
              </el-cascader>
            </el-form-item>
            <el-form-item>
              <span>科目</span>
              <el-select clearable v-model="ruleForm.subject" placeholder="选择科目" size="mini" @change="getChangeTeacher">
                <el-option v-for="item in $store.state.SubjectOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="teacherName">
              <span>教师</span>
              <el-autocomplete size="mini" class="inline-input" popper-class="my-autocomplete" v-model="ruleForm.teacherName" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelectTeacher">
                <template slot-scope="{ item }">
                  <div class="name" style="text-align: left">{{ item.teacher_name }}</div>
                </template>
              </el-autocomplete>
            </el-form-item>
            <el-form-item prop="teacherName">
              <span>工号</span>
              <div class="teacher-no">{{teacherNo}}</div>
            </el-form-item>
          </div>
          <div class="level-name">
            <el-form-item prop="teacherLevelId">
              <span><span class="star">*</span>级别名称</span>
              <el-select clearable v-model="ruleForm.teacherLevelId" placeholder="级别名称" size="mini">
                <el-option v-for="item in levelName" :key="item.value" :label="item.extra" :value="item.tlevel_id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <span>基本级别</span>
              <div class="base-level">
                {{baseLevel}}
              </div>
            </el-form-item>
          </div>
          <div>
            <el-form-item prop="tlevelSalary">
              <span><span class="star">*</span>课时费</span>
              <div class="time">
                <el-input v-model="ruleForm.tlevelSalary" size="mini" placeholder="请输入数字" clearable></el-input>
              </div>
            </el-form-item>
            <el-form-item prop="compulsoryHour">
              <span><span class="star">*</span>义务课时</span>
              <el-input v-model="ruleForm.compulsoryHour" size="mini" placeholder="请输入数字" clearable></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item prop="takeEffectDate">
              <span><span class="star">*</span>生效日期</span>
              <el-date-picker size="mini" v-model="ruleForm.takeEffectDate" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="rule-form-btn">
            <el-button size="small" type="primary" @click="submitClick('ruleForm')">确定</el-button>
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
  components: { Dialog },
  data() {
    return {
      page: 0,
      limit: 10,
      count: 0,
      options: {
        teacherNo: "",
        teacherNameAndPhone: "",
        campusId: "",
        watch: {
          subject: "",
          levelName: "",
          campusId: "",
          commonLevel: ""
        }
      },
      ruleForm: {
        id: "",
        campusId: "",
        subject: "",
        teacherId: "",
        teacherLevelId: "",
        tlevelSalary: "",
        compulsoryHour: "",
        takeEffectDate: "",
        teacherName: ""
      },
      rules: {
        // teacherName: { required: true, message: "请选择老师", trigger: "blur" },
        teacherLevelId: {
          required: true,
          message: "请选择级别名称",
          trigger: "blur"
        },
        tlevelSalary: {
          required: true,
          validator: this.Checkout.number2,
          trigger: "blur"
        },
        compulsoryHour: {
          required: true,
          validator: this.Checkout.number2,
          trigger: "blur"
        },
        takeEffectDate: {
          required: true,
          message: "请选择有效日期",
          trigger: "blur"
        }
      },
      location: [],
      dataList: [],
      levelName: [],
      multipleSelection: [],
      TeacherList: [],
      selectedLocation: [],
      selectOrganId: [],
      objData: {},
      loading: true,
      baseLevel: "",
      titleRemind: "",
      teacherNo: ""
    };
  },
  created() {
    this.Util.queryAreaNav(this, -1, () => {});
    this.location = this.$store.state.location;
    this.Util.querySysconst(this, "100", this.$store.state.SubjectOptions); //查询科目
    this.getData();
  },
  mounted() {
    this.levelName = this.$store.state.LevelName;
    this.levelName &&
      this.levelName.map((item, index) => {
        item.extra = item.addition_salary == 0 ? "" : item.addition_salary;
        item.extra = item.tlevel_name + "+" + item.extra;
        return item;
      });
  },
  watch: {
    "options.watch": {
      handler() {
        this.page = 0;
        this.getData();
      },
      deep: true
    },
    ["ruleForm.teacherLevelId"]() {
      this.baseLevel = this.Util.GetIdNameForValue(
        this.$store.state.LevelName,
        this.ruleForm.teacherLevelId,
        "tlevel_id",
        "tlevel_name"
      );
    },
    selectOrganId() {
      if (this.selectOrganId && this.selectOrganId.length) {
        this.options.campusId = this.selectOrganId[
          this.selectOrganId.length - 1
        ];
      } else {
        this.options.campusId = "";
      }
      this.page = 0;
      this.getData();
    },
    selectedLocation() {
      if (
        this.selectedLocation &&
        this.selectedLocation.length &&
        this.selectedLocation.length > 0
      ) {
        this.ruleForm.campusId = this.selectedLocation[
          this.selectedLocation.length - 1
        ];
      }
      this.getTeacher();
    }
  },
  methods: {
    getData(data) {
      this.loading = true;
      let obj = {
        page: this.page, //页数
        limit: this.limit, //条目数
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        source: "PC",
        campusAsc: "",
        subjectAsc: "",
        teacherNoAsc: "",
        takeEffecDateAsc: "",
        ...this.options.watch,
        ...this.options
      };
      delete obj.watch;
      this.objData = Object.assign({}, obj, data);
      this.$axios
        .post(
          this.GlobalVal.httpLink.queryTeacherlevelHistory,
          JSON.stringify(this.objData)
        )
        .then(
          res => {
            if (res.data.code === "10000") {
              this.count = res.data.data.count;
              this.dataList = res.data.data.teacherLevelList;
              this.dataList.map(item => {
                item.takeeffecdateasc = this.Util.TimeCycle(
                  item.takeeffecdateasc,
                  "ymd"
                );
                item.updatedate = this.Util.TimeCycle(item.updatedate, "ymd");
              });
              this.loading = false;
            } else {
              this.$message({
                type: "error",
                message: res.data.errmsg
              });
              this.loading = false;
            }
          },
          res => {
            this.loading = false;
            this.$message("请求失败");
          }
        );
    },
    handleAdd(row, type) {
      this.getTeacher();
      this.$refs.dialog.dialogVisible = true;
      this.levelName = this.$store.state.LevelName;
      this.levelName &&
        this.levelName.map((item, index) => {
          item.extra = item.addition_salary == 0 ? "" : item.addition_salary;
          item.extra = item.tlevel_name + "+" + item.extra;
          return item;
        });
      type === "add"
        ? (this.titleRemind = "新增教师级别")
        : (this.titleRemind = "编辑教师级别");
      if (type === "edit") {
        this.selectedLocation = [];
        this.selectedLocation.push(
          1,
          row.schoolid,
          row.branchschoolid,
          row.campusid
        );
        let {
          id,
          subjectcode,
          teachername,
          compulsoryhour,
          tlevelsalary,
          levelname,
          takeeffecdateasc,
          levelid,
          teacherid,
          teacherno
        } = row;
        this.ruleForm.subject = subjectcode;
        this.ruleForm.id = id;
        this.ruleForm.teacherName = teachername;
        this.ruleForm.teacherLevelId = levelid;
        this.ruleForm.tlevelSalary = tlevelsalary;
        this.ruleForm.compulsoryHour = compulsoryhour;
        this.ruleForm.teacherId = teacherid;
        this.ruleForm.takeEffectDate = new Date(takeeffecdateasc).getTime();
        this.teacherNo = teacherno;
      } else {
        this.selectedLocation = [];
        this.ruleForm.subject = "";
        this.ruleForm.id = "";
        this.ruleForm.teacherName = "";
        this.ruleForm.teacherLevelId = "";
        this.ruleForm.tlevelSalary = "";
        this.ruleForm.compulsoryHour = "";
        this.ruleForm.teacherId = "";
        this.ruleForm.takeEffectDate = "";
        this.teacherNo = "";
      }
    },
    handleDelete(id, type) {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let ids = "";
          if (type === "self") {
            ids = id;
          } else if (type === "all") {
            let idsArr = [];
            this.multipleSelection.forEach(item => {
              idsArr.push(item.id);
            });
            ids = idsArr.join(",");
          }
          let objData = {
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            ids
          };
          this.$axios
            .post(
              this.GlobalVal.httpLink.deleteTeacherlevelHistory,
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
    getTeacher() {
      let objData = {
        source: "PC",
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        schoolId: "",
        campusId: this.ruleForm.campusId,
        subject: this.ruleForm.subject
      };
      this.$axios
        .post(
          this.GlobalVal.httpLink.getCampusTeachers,
          JSON.stringify(objData)
        )
        .then(
          res => {
            if (res.data.code === "10000") {
              this.TeacherList = res.data.teachers;
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
    getChangeTeacher() {
      this.getTeacher();
    },
    querySearch(queryString, cb) {
      var restaurants = this.TeacherList;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return restaurant.teacher_name.includes(queryString);
      };
    },
    //批量刪除选中的变量
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //选中的教师
    handleSelectTeacher(val) {
      this.ruleForm.teacherName = val.teacher_name;
      this.ruleForm.teacherId = val.teacher_id;
      this.teacherNo = val.teacher_no;
    },
    submitClick(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.takeEffectDate = new Date(
            this.ruleForm.takeEffectDate
          ).getTime();
          if (!this.teacherNo) {
            this.$message({
              type: "error",
              message: "请选择正确的老师"
            });
            return;
          }
          let objData = {
            source: this.GlobalVal.constants.source,
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            teacherLevelDistory: {
              ...this.ruleForm
            }
          };

          delete objData.teacherLevelDistory.teacherName;
          this.$axios
            .post(
              this.GlobalVal.httpLink.editAndAddTeacherlevelHistory,
              JSON.stringify(objData)
            )
            .then(
              res => {
                if (res.data.code === "10000") {
                  this.$refs.dialog.dialogVisible = false;
                  this.getData();
                  this.$message({
                    type: "success",
                    message: "修改成功"
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
        } else {
          return false;
        }
      });
    },
    sortChange(e) {
      switch (e.prop) {
        case null:
          this.getData({
            campusAsc: "",
            subjectAsc: "",
            teacherNoAsc: "",
            takeEffecDateAsc: ""
          });
          break;
        case "campusname":
          if (e.order !== null) {
            e.order === "ascending"
              ? this.getData({ campusAsc: "00001" })
              : this.getData({ campusAsc: "00002" });
          }
          break;
        case "subjectname":
          if (e.order !== null) {
            e.order === "ascending"
              ? this.getData({ subjectAsc: "00001" })
              : this.getData({ subjectAsc: "00002" });
          }
          break;
        case "teacherno":
          if (e.order !== null) {
            e.order === "ascending"
              ? this.getData({ teacherNoAsc: "00001" })
              : this.getData({ teacherNoAsc: "00002" });
          }
          break;
        case "takeeffecdateasc":
          if (e.order !== null) {
            e.order === "ascending"
              ? this.getData({ takeEffecDateAsc: "00001" })
              : this.getData({ takeEffecDateAsc: "00002" });
          }
          break;
      }
    },
    exportTeacher() {
      this.$exportExcel({
        dataList: this.dataList,
        objData: this.objData,
        httpUrl: "exportQueryTeacherlevelHistory",
        title: this.$route.meta.title
      });
    },
    getButtonData() {
      this.page = 0;
      this.getData();
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
.teacher-level-man .options {
  display: flex;
  flex-wrap: wrap;
}
.teacher-level-man .options > div {
  margin-right: 10px;
  margin-bottom: 10px;
}
.teacher-level-man .options .btn {
  flex-grow: 2;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
}
.teacher-level-man .options .btn button {
  margin-right: 10px;
}
.teacher-level-man .teacher-table {
  margin-top: 10px;
}
.teacher-level-man .rule-form div {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.teacher-level-man .rule-form div:first-child .el-cascader,
.teacher-level-man .rule-form div:first-child .el-select,
.teacher-level-man .rule-form div:first-child .el-autocomplete {
  width: 100%;
}
.teacher-no {
  width: 130px;
}
.teacher-level-man .rule-form .level-name .el-select,
.teacher-level-man .rule-form div .el-date-picker,
.teacher-level-man .rule-form div .el-input {
  width: 350px !important;
}
.teacher-level-man .rule-form .rule-form-btn {
  margin-top: 20px;
  justify-content: center;
}
.teacher-level-man .rule-form .rule-form-btn button {
  margin-right: 10px;
  width: 100px;
}
.time {
  margin-top: 4px;
}
.base-level {
  font-size: 36px;
  padding-left: 40px;
  width: 300px;
}
.star {
  color: red;
  margin-right: 5px;
}
</style>
