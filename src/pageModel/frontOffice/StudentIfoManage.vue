<style>
.class-query-screen .el-cascader {
  width: 15.111%;
}

.class-query-screen .el-select {
  width: 9.511%;
}
</style>
<template>
  <div class="table">
    <div class="handle-box">
      <h2 @click="classSelect" style="cursor: pointer;">所在班级 <i class="el-icon-arrow-down" :style="{transition: 'transform .3s', transform: (selectChange ? 'rotateZ(-180deg)' : '')}"></i></h2>
      <div v-if="selectChange">
        <div class="class-query-screen">
          <el-select clearable v-model="particular_year" size="mini" placeholder="年度">
            <el-option v-for="item in $store.state.YearOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select clearable v-model="season" size="mini" placeholder="季节">
            <el-option v-for="item in $store.state.SeasonOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select clearable v-model="periods" size="mini" placeholder="期别不限">
            <el-option v-for="item in $store.state.PeriodsOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select clearable v-model="grade" size="mini" placeholder="年级不限">
            <el-option v-for="item in $store.state.GradeOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select clearable v-model="subject" size="mini" placeholder="科目不限">
            <el-option v-for="item in $store.state.SubjectOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select clearable v-model="project_type" size="mini" placeholder="类别不限">
            <el-option v-for="item in $store.state.ProjectTypeOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select clearable v-model="class_type" size="mini" placeholder="班型不限">
            <el-option v-for="item in $store.state.ClassTypeOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select clearable v-model="department" size="mini" placeholder="学部">
            <el-option v-for="item in $store.state.DepartmentOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-cascader clearable size="mini" expand-trigger="click" :options="location" v-model="selectedLocation" placeholder="选择学校" change-on-select style="width: 215px;margin-top: 20px;">
          </el-cascader>
        </div>
        <!--动态搜索框-->
        <div class="search-warp">
          <el-input size="mini" v-model="select_word" placeholder="请输入搜索内容" class="input-with-select">
            <el-select style="width: 100px;" v-model="selectTeacherOrClass" slot="prepend" placeholder="请选择">
              <el-option label="老师姓名" value="teacher"></el-option>
              <el-option label="班级" value="class"></el-option>
            </el-select>
            <el-button class="search-btn" slot="append" icon="el-icon-search" @click="searchClass"></el-button>
          </el-input>
        </div>
      </div>
      <h2 style="padding-top: 20px;cursor: pointer;" @click="natureSelect">个人属性 <i class="el-icon-arrow-down" :style="{transition: 'transform .3s', transform: (natureChange ? 'rotateZ(-180deg)' : '')}"></i></h2>
      <div v-if="natureChange">
        <div class="class-query-screen">
          <el-input v-model="select_student" clearable border="none" style="width: 215px;margin-top: 20px" size="mini" placholder="" class="handle-input mr10" @blur="searchPerson" @keyup.enter.native="searchPerson" placeholder="输入学员姓名/手机号"></el-input>
          <el-input v-model="student_no" clearable border="none" style="width: 210px;margin-top: 20px" size="mini" placholder="" class="handle-input mr10" @blur="searchPerson" @keyup.enter.native="searchPerson" placeholder="输入学员编号"></el-input>
          <el-input v-model="publicSchool" clearable border="none" style="width: 210px;margin-top: 20px" size="mini" class="handle-input mr10" @blur="searchPerson" @keyup.enter.native="searchPerson" placeholder="输入就读学校名称"></el-input>
          <el-cascader size="mini" clearable expand-trigger="click" :options="location" v-model="selectedLocation1" placeholder="所属校区不限" change-on-select style="width: 200px; margin-top: 20px">
          </el-cascader>
          <el-select v-model="knownChannle" size="mini" placeholder="了解渠道" clearable>
            <el-option v-for="item in $store.state.KnowChannleOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="sex" size="mini" placeholder="性别不限" clearable>
            <el-option v-for="item in $store.state.sexOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>

          <el-input v-model="email" border="none" style="width: 180px;padding-top: 20px" size="mini" class="handle-input mr10" @blur="searchPerson" @keyup.enter.native="searchPerson" placeholder="邮箱"></el-input>
          <el-input v-model="homeAddress" border="none" style="width: 180px;padding-top: 20px" size="mini" class="handle-input mr10" @blur="searchPerson" @keyup.enter.native="searchPerson" placeholder="地址"></el-input>
          <el-input v-model="idcardno" border="none" style="width: 180px;padding-top: 20px" size="mini" class="handle-input mr10" @blur="searchPerson" @keyup.enter.native="searchPerson" placeholder="身份证号"></el-input>
          <el-date-picker :editable="false" v-model="startTime" :picker-options="startTimeOptions" type="date" size="mini" placeholder="选择生日开始日期" style="width: 160px">
          </el-date-picker>
          <el-date-picker :editable="false" v-model="endTime" :picker-options="endTimeOptions" type="date" size="mini" placeholder="选择生日结束日期" style="width: 160px">
          </el-date-picker>
          <el-button type="primary" size="mini" style="width:100px;height:29px;margin-left:10px;" @click="exportStudent" v-show="$store.state.code.includes('021201')">导出</el-button>
        </div>
      </div>
    </div>

    <el-table :data="data" size="mini" stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange" v-loading="loading">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="student_name" label="学员姓名"></el-table-column>
      <el-table-column prop="student_no" label="学员编号"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="student_grade" label="年级"></el-table-column>
      <el-table-column prop="student_birthday" label="出生日期"></el-table-column>
      <el-table-column prop="reception_signup_starttime" label="就读学校"></el-table-column>
      <el-table-column prop="campus_name" label="所属校区"></el-table-column>
      <el-table-column prop="student_mobile" label="联系电话"></el-table-column>
      <el-table-column prop="classnum" label="报班个数"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" type="primary">编辑
          </el-button>
          <el-button size="mini" type="primary" @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :total="count" :current-page="cur_page + 1" :page-size="cur_limit" :page-sizes="[10,20,30,50]">
      </el-pagination>
    </div>
    <!--添加弹出框-->
    <transition name="el-fade-in-linear">
      <div v-show="addTeamLayer" class="bg-layer">
        <transition name="el-zoom-in-center">
          <div v-if="addTeamLayer" class="transition-box">
            <div class="title-warp">
              <div class="close-btn" @click="addTeamLayer=!addTeamLayer"><i class="el-icon-close"></i></div>
              <!--<h3 v-if="!changeTeamLayer" class="modify-title">新增教室</h3>-->
              <h3 v-if="changeTeamLayer" class="modify-title">编辑学员信息</h3>
            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="姓名" prop="student_name" style="display: inline-block">
                <el-input v-model="ruleForm.student_name" style="width: 100%;"></el-input>
              </el-form-item>
              <!--<el-form-item label="学号" prop="student_no" style="display: inline-block">
                                <el-input v-model="ruleForm.student_no"  style="width: 100%;"></el-input>
                            </el-form-item>-->
              <el-form-item label="性别" style="display: inline-block">
                <el-select v-model="ruleForm.sex" placeholder="请选择" style="width: 100%;">
                  <el-option label="女" value="false"></el-option>
                  <el-option label="男" value="true"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="年级" style="display: inline-block">
                <el-select v-model="ruleForm.student_grade" placeholder="请选择" style="width: 100%;">
                  <el-option v-for="item in $store.state.GradeOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="选择学校" style="display: inline-block">
                <el-cascader clearable expand-trigger="click" :options="location" v-model="organ_id2" change-on-select style="width: 505px" @change="handleLocationChange">
                </el-cascader>
              </el-form-item>
              <el-form-item label="出生日期" prop="student_birthday" style="display: inline-block">
                <div class="block">
                  <el-date-picker v-model="ruleForm.student_birthday" type="date" placeholder="选择日期时间">
                  </el-date-picker>
                </div>
              </el-form-item>
              <el-form-item label="学部">
                <el-select v-model="ruleForm.department" placeholder="请选择" @change="departmentChange">
                  <el-option v-for="item in $store.state.DepartmentOptions" :key="item.value" :label="item.label" :value="item.label">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="就读学校" prop="croom_name">
                <div v-if="ruleForm.department=='小学部'">
                  <el-form-item label="">
                    <el-select v-model="ruleForm.ps_province_no" size="medium" placeholder="请选择省" style="width: 100%;" @change="provinceBlur('ruleForm')">
                      <el-option v-for="item in provinceList" :key="item.province_no" :label="item.province_name" :value="item.province_no">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="">
                    <el-select v-model="ruleForm.ps_city_no" size="medium" placeholder="请选择市" style="width: 100%;" @change="cityBlur('ruleForm')">
                      <el-option v-for="item in cityList" :key="item.city_no" :label="item.city_name" :value="item.city_no">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="">
                    <el-select v-model="ruleForm.ps_district_no" size="medium" placeholder="请选择区" style="width: 100%;" @change="districtsBlur('ruleForm')">
                      <el-option v-for="item in districtsList" :key="item.district_no" :label="item.district_name" :value="item.district_no">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="">
                    <el-select v-model="ruleForm.school_name" size="medium" placeholder="请选择校区" style="width: 100%;" @change="districtsBlur('ruleForm')">
                      <el-option v-for="item in publicSchools1" :key="item.city_no" :label="item.school_name" :value="item.school_name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div v-if="ruleForm.department=='初中部'">
                  <el-form-item label="">
                    <el-select v-model="ruleForm.ms_province_no" size="medium" placeholder="请选择省" style="width: 100%;" @change="provinceBlur('ruleForm')">
                      <el-option v-for="item in provinceList" :key="item.province_no" :label="item.province_name" :value="item.province_no">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="">
                    <el-select v-model="ruleForm.ms_city_no" size="medium" placeholder="请选择市" style="width: 100%;" @change="cityBlur('ruleForm')">
                      <el-option v-for="item in cityList" :key="item.city_no" :label="item.city_name" :value="item.city_no">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="">
                    <el-select v-model="ruleForm.ms_district_no" size="medium" placeholder="请选择区" style="width: 100%;" @change="districtsBlur('ruleForm')">
                      <el-option v-for="item in districtsList" :key="item.district_no" :label="item.district_name" :value="item.district_no">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="">
                    <el-select v-model="ruleForm.school_name" size="medium" placeholder="请选择校区" style="width: 100%;" @change="districtsBlur('ruleForm')">
                      <el-option v-for="item in publicSchools1" :key="item.city_no" :label="item.school_name" :value="item.school_name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div v-if="ruleForm.department=='高中部'">
                  <el-form-item label="">
                    <el-select v-model="ruleForm.hs_province_no" size="medium" placeholder="请选择省" style="width: 100%;" @change="provinceBlur('ruleForm')">
                      <el-option v-for="item in provinceList" :key="item.province_no" :label="item.province_name" :value="item.province_no">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="">
                    <el-select v-model="ruleForm.hs_city_no" size="medium" placeholder="请选择市" style="width: 100%;" @change="cityBlur('ruleForm')">
                      <el-option v-for="item in cityList" :key="item.city_no" :label="item.city_name" :value="item.city_no">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="">
                    <el-select v-model="ruleForm.hs_district_no" size="medium" placeholder="请选择区" style="width: 100%;" @change="districtsBlur('ruleForm')">
                      <el-option v-for="item in districtsList" :key="item.district_no" :label="item.district_name" :value="item.district_no">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="">
                    <el-select v-model="ruleForm.school_name" size="medium" placeholder="请选择校区" style="width: 100%;" @change="districtsBlur('ruleForm')">
                      <el-option v-for="item in publicSchools1" :key="item.city_no" :label="item.school_name" :value="item.school_name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-form-item>
              <el-form-item label="常用电话" prop="student_mobile" style="width: 300px">
                <el-input v-model="ruleForm.student_mobile"></el-input>
              </el-form-item>
              <el-form-item label="父亲电话" prop="father_mobile" style="width: 460px;display: inline-block">
                <el-input v-model="ruleForm.father_mobile"></el-input>
                <el-checkbox v-model="ruleForm.father_sms_enable">是否接受短信</el-checkbox>
              </el-form-item>
              <el-form-item label="母亲电话" prop="mother_mobile" style="width: 460px;display: inline-block">
                <el-input v-model="ruleForm.mother_mobile"></el-input>
                <el-checkbox v-model="ruleForm.mother_sms_enable">是否接受短信</el-checkbox>
              </el-form-item>
              <div class="subject-result">
                <p class="subject-result-title">科目入学成绩</p>
                <div>
                  <el-tag v-for="(tag,index) in subjectResultTags" size="small" @close="handleCloseTag(tag)" :key="index" closable>
                    <span class="student-mark-subject">{{tag.subject}}</span><span class="student-mark-mark">{{tag.mark}}</span>
                  </el-tag>
                </div>
              </div>
              <el-form-item label="科目入学成绩">
                <el-select v-model="ruleForm.subject" placeholder="请选择科目" style="width: 49%;display: inline-block">
                  <el-option v-for="item in $store.state.SubjectOptions" :key="item.value" :label="item.label" style="width: 50%" :value="item.value">
                  </el-option>
                </el-select>
                <el-input v-model="entry_score" placeholder="请填写分数" style="width: 49%;display: inline-block"></el-input>
              </el-form-item>
              <el-form-item label="了解渠道">
                <el-select v-model="ruleForm.known_channle" placeholder="请选择" style="display: inline-block">
                  <el-option v-for="item in $store.state.KnowChannleOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="邮箱" prop="email" style="display: inline-block">
                <el-input v-model="ruleForm.email"></el-input>
              </el-form-item>
              <el-form-item label="地址" prop="home_address" style="display: inline-block">
                <el-input v-model="ruleForm.home_address"></el-input>
              </el-form-item>
              <el-form-item label="身份证号" prop="idcardno" style="display: inline-block">
                <el-input v-model="ruleForm.idcardno"></el-input>

              </el-form-item>
              <el-form-item style="padding-top: 20px">
                <el-button v-if="!changeTeamLayer" type="primary" size="medium" style="width: 195px;margin-left: 140px" @click="submitForm('ruleForm')">保存</el-button>
                <el-button v-if="changeTeamLayer" type="primary" @click="submitForm('ruleForm')" style="width: 195px;margin-left: 140px">保存</el-button>
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
      count: 0, //总数
      selectTeacherOrClass: "teacher",
      studentName: "", //学生姓名搜索
      particular_year: "", //年份搜索
      season: "", //季节搜索
      periods: "", //期数搜索
      project_type: "", //搜索科目
      class_type: "", //搜索班级类型
      grade: "", //适用年级搜索
      subject: "", //科目搜索
      projectType: "", //项目类型搜索
      classType: "", //班型搜索
      department: "", //学部搜索
      schoolId: "", //大区id搜索
      teacherName: "", //教师姓名搜索
      classroomName: "", //教室名称搜索
      studentMobile: "", //学生常用电话搜索
      publicSchool: "", //学校搜索
      knownChannle: "", //了解渠道搜索
      sex: "", //性别搜索
      campusId: "", //所属校区ID搜索
      startTime: "", //生日开始日期搜索
      startTimeOptions: {},
      endTime: "", //生日结束日期搜索
      endTimeOptions: {},
      email: "", //学生邮箱搜索
      homeAddress: "", //家庭住址搜索
      idcardno: "", //身份证号搜索
      ps_province_name: "",
      provinceList: [], //省名称
      select_word: "",
      cityList: [], //市名称
      student_no: "",
      districtsList: [], //区名称
      publicSchools1: [], //获取校区
      select_teacher: [],
      select_student: "", //搜索学员姓名和电话
      organ_id2: [],
      dataList: [], //请求的list
      location: [], //校区导航
      selectedLocation: [], //选择校区
      multipleSelection: [], //选中行的集合
      addTeamLayer: false, //新增弹出框状态
      changeTeamLayer: false, //修改弹出框状态
      publicSchools: [],
      entryScoreList: [],
      selectedLocation1: [], //所属校区
      selectChange: true,
      natureChange: true,
      objData: {},
      ruleForm: {
        //新增数据
        resubmit_signup_starttime: "",
        app_signup_starttime: "",
        reception_signup_starttime: "",
        app_re_signup_starttime: "",
        web_signup_starttime: "",
        student_birthday: "",
        sex: "",
        student_grade: "",
        subject: "",
        home_address: "",
        idcardno: "",
        email: "",
        known_channle: "",
        father_sms_enable: "",
        mother_sms_enable: ""
      },
      loading: false,
      //接收当前行的信息
      changeForm2: {},
      subjectResultTags: [],
      //表单校验规则
      rules: {
        /*  croom_name: [
                          { required: true, message: '请输入活动名称', trigger: 'blur' },
                      ],
                      max_student_number: [
                          { required: true, validator: checkNum, trigger: 'blur' }
                      ],*/
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
    /*this.getData()*/
    self.location = self.$store.state.location;
    this.Util.querySysconst(this, "021", this.$store.state.KnowChannleOptions); //查询了解渠道
    this.Util.querySysconst(this, "006", this.$store.state.SeasonOptions); //查询季节
    this.Util.querySysconst(this, "009", this.$store.state.PeriodsOptions); //查询期别
    this.Util.querySysconst(this, "101", this.$store.state.GradeOptions); //查询年级
    this.Util.querySysconst(this, "100", this.$store.state.SubjectOptions); //查询科目
    this.Util.querySysconst(this, "002", this.$store.state.CourseTypeOptions); //查询类别/课型
    this.Util.querySysconst(this, "003", this.$store.state.ClassTypeOptions); //查询班型
    this.Util.querySysconst(this, "007", this.$store.state.DepartmentOptions); //查询学部
    this.Util.querySysconst(this, "001", this.$store.state.ProjectTypeOptions); //项目类型
    let objData = {
      staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId
    };
    this.$axios
      .post(this.GlobalVal.httpLink.queryProvince, JSON.stringify(objData))
      .then(
        res => {
          if (res.data.code === "10000") {
            self.provinceList = res.data.provinces;
            window.sessionStorage.setItem(
              "queryProvince",
              JSON.stringify(res.data.provinces)
            );
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
  //计算属性
  computed: {
    data() {
      const self = this;
      if (!self.dataList) {
        return [];
      }
      return self.dataList.filter(function(d) {
        d.student_birthday = self.Util.TimeCycle(d.student_birthday, "ymd");
        d.student_grade = self.Util.GetLabelForValue(
          self.$store.state.GradeOptions,
          d.student_grade
        );
        if (d.sex == true) {
          d.sex = "男";
        } else {
          d.sex = "女";
        }
        if (d.high_school) {
          d.reception_signup_starttime = d.high_school;
        } else if (d.middle_school) {
          d.reception_signup_starttime = d.middle_school;
        } else if (d.primary_school) {
          d.reception_signup_starttime = d.primary_school;
        }
        return d;
      });
    }
  },
  watch: {
    entry_score: function() {
      if (!this.subject) {
        this.$message("请先选择科目入学成绩栏下的选择科目选项");
        return;
      }
      let obj = {
        subject:
          this.Util.GetLabelForValue(
            this.$store.state.SubjectOptions,
            this.subject
          ) + " - ",
        mark: this.studentMark
      };
      this.subjectResultTags[0] = obj;
    },
    selectedLocation: function() {
      if (
        this.selectedLocation.includes(
          JSON.parse(window.sessionStorage.getItem("staff")).staffOrganId
        )
      ) {
        this.coupon_id = this.selectedLocation[
          this.selectedLocation.length - 1
        ];
        this.cur_page = 0;
        this.getData();
      } else if (this.selectedLocation.length === 0) {
        this.cur_page = 0;
        this.coupon_id = "";
        this.getData();
      }
    },
    selectedLocation1(newVal, oldVal) {
      if (
        this.selectedLocation1 &&
        this.selectedLocation1.length &&
        this.selectedLocation1.length > 0
      ) {
        this.studentCouponId = this.selectedLocation1[
          this.selectedLocation1.length - 1
        ];
      } else {
        this.studentCouponId = "";
      }
      this.cur_page = 0;
      this.getData();
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
            this.ruleForm.campus_name = obj[i].label;
          }
        }

        this.ruleForm.organ_id = this.organ_id2[this.organ_id2.length - 1];
      }
    },
    changeForm2: function() {
      this.ruleForm.student_id = this.changeForm2.student_id;
      this.ruleForm.student_name = this.changeForm2.student_name;
      this.ruleForm.sex = this.changeForm2.sex;
      this.ruleForm.student_grade = this.changeForm2.student_grade;
      this.ruleForm.campus_name = this.changeForm2.campus_name;
      this.ruleForm.student_birthday = this.changeForm2.student_birthday;
      this.ruleForm.ps_province_no = this.changeForm2.ps_province_no;
      this.ruleForm.ps_city_no = this.changeForm2.ps_city_no;
      this.ruleForm.ps_district_no = this.changeForm2.ps_district_no;
      this.ruleForm.ms_province_no = this.changeForm2.ms_province_no;
      this.ruleForm.ms_city_no = this.changeForm2.ms_city_no;
      this.ruleForm.ms_district_no = this.changeForm2.ms_district_no;
      this.ruleForm.hs_province_no = this.changeForm2.hs_province_no;
      this.ruleForm.hs_district_no = this.changeForm2.hs_district_no;
      this.ruleForm.hs_city_no = this.changeForm2.hs_city_no;
      this.ruleForm.student_mobile = this.changeForm2.student_mobile;
      this.ruleForm.father_mobile = this.changeForm2.father_mobile;
      this.ruleForm.mother_mobile = this.changeForm2.mother_mobile;
      this.ruleForm.father_sms_enable = this.changeForm2.father_sms_enable;
      this.ruleForm.known_channle = this.changeForm2.known_channle;
      this.ruleForm.home_address = this.changeForm2.home_address;
      this.ruleForm.idcardno = this.changeForm2.idcardno;
      this.ruleForm.email = this.changeForm2.email;
    },
    particular_year: function() {
      //年度改变
      this.cur_page = 0;
      this.getData();
    },
    season: function() {
      // 季节
      this.cur_page = 0;
      this.getData();
    },
    periods: function() {
      //期别
      this.cur_page = 0;
      this.getData();
    },
    grade: function() {
      //年级
      this.cur_page = 0;
      this.getData();
    },
    subject: function() {
      //科目
      this.cur_page = 0;
      this.getData();
    },
    projectType: function() {
      //类别/课型不限
      this.cur_page = 0;
      this.getData();
    },
    class_type: function() {
      //班型
      this.cur_page = 0;
      this.getData();
    },
    department: function() {
      this.cur_page = 0;
      this.getData();
    },
    select_student: function() {
      if (/^\d+$/.test(this.select_student) && this.select_student !== "") {
        this.studentMobile = this.select_student;
        this.studentName = null;
      } else if (this.select_student !== "") {
        this.studentName = this.select_student;
        this.studentMobile = null;
      } else {
        this.studentMobile = null;
        this.studentName = null;
      }
    },
    startTime: function(newVal) {
      this.endTimeOptions = {
        disabledDate(data) {
          if (!newVal) {
            return false;
          }
          return newVal.getTime() + 86400000 > data.getTime();
        }
      };
      this.cur_page = 0;
      this.getData();
    },
    endTime: function(newVal) {
      this.startTimeOptions = {
        disabledDate(data) {
          if (!newVal) {
            return false;
          }
          return newVal.getTime() - 86400000 < data.getTime();
        }
      };
      this.cur_page = 0;
      this.getData();
    },
    sex: function() {
      this.cur_page = 0;
      this.getData();
    },
    knownChannle: function() {
      this.cur_page = 0;
      this.getData();
    },
    project_type: function() {
      this.cur_page = 0;
      this.getData();
    }
  },
  methods: {
    handleCloseTag(tag) {
      this.subjectResultTags.splice(this.subjectResultTags.indexOf(tag), 1);
      this.subject = "";
      this.studentMark = "";
    },
    getData() {
      this.objData = {
        source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        page: this.cur_page,
        limit: this.cur_limit,
        classCampusId: this.coupon_id, //所属校区ID
        particularYear: this.particular_year,
        season: this.season,
        periods: this.periods, //一期\二期\三期
        grade: this.grade, //适用年级，一年级，二年级等
        subject: this.subject, //科目,数学,物理等
        projectType: this.project_type, //项目类型：长期，短期，公益，考试等
        classType: this.class_type, //班型，超常，培优等
        department: this.department, //学部
        teacherName: this.teacherName, //教师姓名
        className: this.className, //教室名称
        //个人
        studentName: this.studentName,
        studentMobile: this.studentMobile, //学生常用电话,APP帐号
        studentNo: this.student_no,
        publicSchool: this.publicSchool, //学校
        knownChannle: this.knownChannle, //了解渠道
        sex: this.sex, //性别 true-男
        studentCampusId: this.studentCouponId, //所属校区ID
        startTime: this.Util.TimeCycle(
          new Date(this.startTime).getTime(),
          "ymd"
        ), //生日开始日期
        endTime: this.Util.TimeCycle(new Date(this.endTime).getTime(), "ymd"), //生日结束日期
        email: this.email, //学生邮箱
        homeAddress: this.homeAddress, //家庭住址
        idcardno: this.idcardno //身份证号
      };
      this.loading = true;
      if (this.selectTeacherOrClass === "class") {
        this.objData.className = this.select_word;
        this.objData.teacherName = "";
      } else {
        this.objData.className = "";
        this.objData.teacherName = this.select_word;
      }
      this.$axios
        .post(
          this.GlobalVal.httpLink.queryStudentsByClassInfo,
          JSON.stringify(this.objData)
        )
        .then(
          res => {
            if (res.data.code === "10000") {
              this.count = res.data.count;
              this.dataList = res.data.students;
              this.loading = false;
            } else {
              console.error(res);
              this.$message({
                type: "error",
                message: res.data.errmsg
              });
              this.loading = false;
            }
          },
          res => {
            this.$message("请求失败");
            this.loading = false;
          }
        );
    },

    //重新选择了地区事件
    handleLocationChange(value) {},
    screening() {}, //重新筛选函数

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
                id: row.student_id
              }
            ]
          };
          this.$axios
            .post(this.GlobalVal.httpLink.delStudents, JSON.stringify(objData))
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
    handleAdd() {
      this.ruleForm.status = true;
      this.addTeamLayer = true;
      this.ruleForm.croom_id = "";
      this.ruleForm.croom_name = "";
      this.ruleForm.organ_id = "";
      this.ruleForm.organ_name = "";
      this.ruleForm.max_student_number = "";
      this.ruleForm.equipment = [];
      this.organ_id2 = [];
      this.ruleForm_equipment = [];
      this.ruleForm.created_at = null;
    },
    //新增/修改时候参数判断-转换
    varJug(obj) {
      let self = this;
      let o = obj;
      return o;
    },
    //新增--提交
    /*submitForm(formName) {
                const self = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let obj = {
                            entry_score:"",
                            subject:"",
                        }
                        obj.entry_score = this.entry_score;
                        obj.subject = this.ruleForm.subject;
                        this.entryScoreList.push(obj);
                        let objData={
                            source:this.GlobalVal.constants.source,  //请求方式   Wechat，Android，PC，IOS
                            staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                            student:{
                                student_id: this.ruleForm.student_id,
                                student_name:this.ruleForm.student_name,
                                student_no:this.ruleForm.student_no,
                                sex:this.ruleForm.sex,
                                student_grade:this.ruleForm.student_grade,
                                campus_id:this.ruleForm.organ_id,
                                //campus_name:this.ruleForm.campus_name,
                                student_birthday:self.Util.TimeCycle(new Date(this.ruleForm.student_birthday).getTime(),'ymd'),
                                primary_school:this.ruleForm.primary_school,
                                middle_school:this.ruleForm.middle_school,
                                high_school:this.ruleForm.high_school,
                                ps_province_no:this.ruleForm.ps_province_no,
                                ps_province_name:self.Util.GetIdNameForValue(this.provinceList,this.ruleForm.ps_province_no,"province_no","province_name"),
                                ps_city_no:this.ruleForm.ps_city_no,
                                ps_city_name:self.Util.GetIdNameForValue(this.cityList,this.ruleForm.ps_city_no,"city_no","city_name"),
                                ps_district_no:this.ruleForm.ps_district_no,
                                ps_district_name:self.Util.GetIdNameForValue(this.districtsList,this.ruleForm.ps_district_no,"district_no","district_name"),
                                ms_province_no:this.ruleForm.ms_province_no,
                                ms_province_name:self.Util.GetIdNameForValue(this.provinceList,this.ruleForm.ms_province_no,"province_no","province_name"),
                                ms_city_no:this.ruleForm.ms_city_no,
                                ms_city_name:self.Util.GetIdNameForValue(this.cityList,this.ruleForm.ms_city_no,"city_no","city_name"),
                                ms_district_no:this.ruleForm.ms_district_no,
                                ms_district_name:self.Util.GetIdNameForValue(this.districtsList,this.ruleForm.ms_district_no,"district_no","district_name"),
                                hs_province_no:this.ruleForm.hs_province_no,
                                hs_province_name:self.Util.GetIdNameForValue(this.provinceList,this.ruleForm.hs_province_no,"province_no","province_name"),
                                hs_city_no:this.ruleForm.hs_city_no,
                                hs_city_name:self.Util.GetIdNameForValue(this.cityList,this.ruleForm.hs_city_no,"city_no","city_name"),
                                hs_district_no:this.ruleForm.hs_district_no,
                                hs_district_name:self.Util.GetIdNameForValue(this.districtsList,this.ruleForm.hs_district_no,"district_no","district_name"),
                                student_mobile:this.ruleForm.student_mobile,
                                father_mobile:this.ruleForm.father_mobile,
                                mother_mobile:this.ruleForm.mother_mobile,
                                father_sms_enable:this.ruleForm.father_sms_enable,
                                mother_sms_enable:this.ruleForm.mother_sms_enable,
                                known_channle:this.ruleForm.known_channle,
                                home_address:this.ruleForm.home_address,
                                idcardno:this.ruleForm.idcardno,
                                email:this.ruleForm.email,
                                entryScoreList:this.entryScoreList,
                            }
                        };
                       /!* let objData2 = {
                            staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                            entryScore:{
                                student_id:this.ruleForm.student_id,
                                entry_score:this.entry_score,
                                subject:this.ruleForm.subject,
                            }
                        };*!/
                        console.log("编辑学员信息发起请求的参数",objData);
                       /!* console.log("编辑学员信息发起请求的参数",objData2);*!/
                        this.$axios.post(this.GlobalVal.httpLink.editStudents,JSON.stringify(objData)).then(
                            res=>{
                                if(res.data.code==="10000"){
                                    console.log("编辑学员信息获取的对象",res.data);
                                    self.$message({
                                        type:"success",
                                        message:"编辑成功"
                                    });
                                    self.getData();
                                }else{
                                    console.error(res);
                                    self.$message({
                                        type:"error",
                                        message:res.data.errmsg
                                    })
                                }
                                self.addTeamLayer = false;
                            },
                            res=>{
                                self.$message("请求失败")
                            }
                        )
                        /!*this.$axios.post(this.GlobalVal.httpLink.editEntryScore,JSON.stringify(objData2)).then(
                            res=>{
                                if(res.data.code==="10000"){
                                    console.log("新增教师等级获取的对象",res.data);
                                    self.$message({
                                        type:"success",
                                        message:"新增成功"
                                    });
                                    self.getData();
                                }else{
                                    console.error(res);
                                    self.$message({
                                        type:"error",
                                        message:res.data.errmsg
                                    })
                                }
                                self.addTeamLayer = false;
                            },
                            res=>{
                                self.$message("请求失败")
                            }
                        )*!/
                    } else {
                        return false;
                    }
                });
            },*/
    //修改按钮事件
    handleEdit(index, row) {
      this.$store.commit("setStudentInfo", row);
      this.$router.push({
        path: "/editStudent",
        query: {
          sid: row.student_id
        }
      });
    },
    //新增/修改教师等级--重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    blur() {
      this.getData();
    },
    departmentChange() {
      let objData = {
        page: this.cur_page,
        limit: this.cur_limit,
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        schoolType: this.ruleForm.department
      };
      this.$axios
        .post(this.GlobalVal.httpLink.queryPubicSchool, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              self.publicSchools = res.data.publicSchools;
              window.sessionStorage.setItem(
                "queryProvince",
                JSON.stringify(res.data.provinces)
              );
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
    provinceBlur(formName) {
      const self = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let objData2 = {
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            province_no:
              this.ruleForm.ps_province_no ||
              this.ruleForm.ms_province_no ||
              this.ruleForm.hs_province_no
          };
          this.$axios
            .post(this.GlobalVal.httpLink.queryCities, JSON.stringify(objData2))
            .then(
              res => {
                if (res.data.code === "10000") {
                  self.cityList = res.data.citys;
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
        }
      });
    },
    cityBlur(formName) {
      const self = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let objData2 = {
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            city_no:
              this.ruleForm.ps_city_no ||
              this.ruleForm.ms_city_no ||
              this.ruleForm.hs_city_no
          };
          this.$axios
            .post(this.GlobalVal.httpLink.queryDiss, JSON.stringify(objData2))
            .then(
              res => {
                if (res.data.code === "10000") {
                  self.districtsList = res.data.districts;
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
        }
      });
    },
    districtsBlur(formName) {
      const self = this;
      if (this.ruleForm.ps_district_name !== "") {
        self.district_name =
          this.ruleForm.ps_district_name ||
          this.ruleForm.ms_district_name ||
          this.ruleForm.hs_district_name;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          let objData2 = {
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            page: this.cur_page,
            limit: this.cur_limit,
            districtName: self.district_name
          };
          this.$axios
            .post(
              this.GlobalVal.httpLink.queryPubicSchool,
              JSON.stringify(objData2)
            )
            .then(
              res => {
                if (res.data.code === "10000") {
                  self.publicSchools1 = res.data.publicSchools;
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
        }
      });
    },
    searchClass() {
      this.cur_page = 0;
      this.getData();
    },
    searchPerson() {
      this.cur_page = 0;
      this.getData();
    },
    classSelect() {
      this.selectChange = !this.selectChange;
    },
    natureSelect() {
      this.natureChange = !this.natureChange;
    },
    //搜索框动态提示内容
    /*queryTeacherOrClassname(queryString, cb){
                if(this.selectTeacherOrClass==="class"){
                    let objData={
                        staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                        page:1, //页数
                        limit:10, //条目数
                        className:queryString , //班级名字
                    };
                    console.log("查询班级搜索提出内容发起请求的参数",objData);
                    this.$axios.post(this.GlobalVal.httpLink.queryClassName,JSON.stringify(objData)).then(
                        res=>{
                            if(res.data.code==="10000"){
                                console.log("查询班级搜索提出内容获取的对象",res.data);
                                cb(res.data.res);
                            }else{
                                console.error(res);
                                self.$message({
                                    type:"error",
                                    message:res.data.errmsg
                                })
                            }
                        },
                        res=>{
                            this.$message("请求失败")
                        }
                    )
                }else if(this.selectTeacherOrClass==="teacher"){
                    let objData={
                        staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                        page:1, //页数
                        limit:10, //条目数
                        teacherName:queryString , //班级名字
                    };
                    console.log("查询老师搜索提示内容发起请求的参数",objData);
                    this.$axios.post(this.GlobalVal.httpLink.queryTeacherName,JSON.stringify(objData)).then(
                        res=>{
                            if(res.data.code==="10000"){
                                console.log("查询老师搜索提示内容获取的对象",res.data);
                                cb(res.data.res);
                            }else{
                                console.error(res);
                                self.$message({
                                    type:"error",
                                    message:res.data.errmsg
                                })
                            }
                        },
                        res=>{
                            this.$message("请求失败")
                        }
                    )
                }

            },*/
    exportStudent() {
      this.$exportExcel({
        dataList: this.dataList,
        objData: this.objData,
        httpUrl: "exportStudentList",
        title: this.$route.meta.title
      });
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
  height: 400px;
  min-height: 400px;
}

.transition-box {
  position: absolute;
  width: 1000px;
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
  width: 100%;
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

.demo-ruleForm {
  height: 550px;
}

.el-icon-close::before {
  line-height: 50px;
  color: #b7b7b7;
}

.add-student .el-tag .el-icon-close::before {
  line-height: inherit;
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
  float: right;
}

.search-warp {
  display: inline-block;
  padding-top: 20px;
  /*float: right;*/
}

.search-input {
  width: 400px;
}

.subject-result-title {
  padding: 9px 0;
}

.subject-result-choose {
  margin-top: 10px;
}

.student-mark-subject {
  color: #000;
}

.submit-btn {
  text-align: center;
}
</style>
