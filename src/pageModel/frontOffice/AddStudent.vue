<style scoped>
.handle-box {
  margin-bottom: 20px;
  padding: 20px 0 0 20px;
}
.student-from {
  margin: 20px 0 10px 20px;
  background: #ffffff;
  padding: 20px 60px 20px 20px;
}
.line {
  width: 100%;
  height: 1px;
  background: #f0f0f0;
  margin-bottom: 10px;
  margin-top: 10px;
}
.subject-result-title {
  font-size: 14px;
  color: #606266;
  padding: 9px 0;
}
.subject-result-choose {
  margin-top: 20px;
  margin-bottom: 20px;
}
.student-mark-subject {
  color: #000;
}
.submit-btn {
  text-align: center;
}
</style>

<style>
.add-student .el-tag + .el-tag {
  margin-left: 10px;
}
.add-student .el-cascader {
  width: 100%;
}
.student-from .el-input.is-disabled .el-input__inner {
  color: #5f5959;
}
</style>
<template>
  <div class="warp add-student">
    <div class="handle-box">
      <el-button @click="goback" icon="el-icon-arrow-left" type="primary" size="mini">返回</el-button>
    </div>
    <div class="student-from">
      <el-form :model="ruleForm" :rules="rules" size="mini" ref="ruleForm" label-position="left" label-width="100px" font-size="16px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="学生姓名" prop="student_name" style="font-size: 16px;">
              <el-input v-model="ruleForm.student_name" placeholder="请输入学生姓名" @blur="checkRepeat"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="学生性别" prop="sex" style="font-size: 16px;">
              <el-select v-model="ruleForm.sex" size="mini" placeholder="请选择" style="width: 100%;">
                <el-option label="男" value="true"></el-option>
                <el-option label="女" value="false"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="年级" prop="student_grade">
              <el-select v-model="ruleForm.student_grade" size="mini" placeholder="请选择" style="width: 100%;">
                <el-option v-for="(item, index) in $store.state.GradeOptions" :key="index" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="常用电话" prop="student_mobile">
              <el-input v-model="ruleForm.student_mobile" @blur="checkRepeat"></el-input>
            </el-form-item>
            <!-- <el-form-item label="所属校区" style="width: 100%;" prop="selectedLocation">
                            <el-cascader clearable
                                    size="mini"
                                    expand-trigger="click"
                                    :options="location"
                                    v-model="selectedLocation"
                                    placeholder="学校不限"
                                    change-on-select
                                    @change="handleLocationChange">
                            </el-cascader>
                        </el-form-item> -->
          </el-col>
          <el-col :span="8">
            <el-form-item label="学部" prop="department">
              <el-select v-model="ruleForm.department" size="mini" placeholder="学部" style="width: 100%;" disabled>
                <el-option v-for="(item, index) in $store.state.DepartmentOptions" :key="index" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出生日期" prop="student_birthday">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.student_birthday" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="18">
            <el-form-item label="就读学校" prop="school_name" style="font-size: 16px;">
              <el-row :gutter="20">
                <el-col :span="4">
                  <el-select v-model="province" clearable  size="mini" placeholder="选择省" >
                    <el-option v-for="item in $store.state.ProvinceOptions || provinces" :key="item.province_no" :label="item.province_name" :value="item.province_no">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="4">
                  <el-select v-model="city" clearable  size="mini" placeholder="选择市">
                    <el-option v-for="item in $store.state.CityOptions || citys" :key="item.city_no" :label="item.city_name" :value="item.city_no">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="4">
                  <el-select v-model="county" clearable  size="mini" placeholder="选择县/区"  @change="districtsChange('ruleForm')">
                    <el-option v-for="item in $store.state.CountyOptions || districts" :key="item.district_no" :label="item.district_name" :value="item.district_no">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="4">
                  <el-select v-model="school" size="mini" clearable placeholder="选择学校" style="width: 100%;">
                    <div v-loading="loading">
                      <el-option v-for="item in publicSchools" :key="item.school_name" :label="item.school_name" :value="item.school_name">
                      </el-option>
                    </div>
                    <p style="text-align:center;color:#409EFF;font-size:12px;cursor:pointer" @click="moreLoading" v-if="cur_limit < count">加载更多</p>
                  </el-select>
                </el-col>
                <el-col :span="5">
                  <el-input placeholder="输入其他学校" v-model="school" clearable ></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="父亲姓名">
              <el-input v-model="ruleForm.father_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="母亲姓名">
              <el-input v-model="ruleForm.mother_name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <!-- <el-col :span="6">
                        <el-form-item label="常用电话" prop="student_mobile">
                            <el-input v-model="ruleForm.student_mobile"></el-input>
                        </el-form-item>
                    </el-col> -->
          <el-col :span="6">
            <el-form-item label="父亲电话">
              <el-input v-model="ruleForm.father_mobile"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="padding-top: 6px;">
            <el-checkbox v-model="ruleForm.father_sms_enable">接收通知短信</el-checkbox>
          </el-col>
          <el-col :span="6">
            <el-form-item label="母亲电话">
              <el-input v-model="ruleForm.mother_mobile"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="padding-top: 6px;">
            <el-checkbox v-model="ruleForm.mother_sms_enable">接收通知短信</el-checkbox>
          </el-col>
        </el-row>

        <!--分割线-->
        <div class="line"></div>

        <!--科目入学成绩-->
        <div class="subject-result">
          <p class="subject-result-title">科目入学成绩</p>
          <div>
            <el-tag v-for="(tag, index) in subjectResultTags" :key="index" size="small" @close="handleCloseTag(tag)" closable>
              <span class="student-mark-subject">{{tag.subject}} - </span>
              <span class="student-mark-mark">{{tag.mark1}}</span>
            </el-tag>
          </div>
        </div>
        <el-row :gutter="20" class="subject-result-choose">
          <el-col :span="4">
            <el-select v-model="subject" multiple collapse-tags size="mini" placeholder="请选择科目">
              <el-option v-for="item in $store.state.SubjectOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-input size="mini" placeholder="请填写分数" v-model="studentMark"></el-input>
          </el-col>
          <el-button size="mini" @click="studentMark1" type="primary">添加</el-button>
        </el-row>

        <!--分割线-->
        <div class="line"></div>

        <!--次要信息-->
        <el-row :gutter="20" class="subject-result-choose">
          <el-col :span="6">
            <el-form-item label="了解渠道" style="font-size: 16px;">
              <el-select v-model="ruleForm.known_channle" size="mini" placeholder="请选择">
                <el-option v-for="item in $store.state.KnowChannleOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="邮箱" prop="email" style="font-size: 16px;">
              <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="身份证号" prop="idcardno" style="font-size: 16px;">
              <el-input v-model="ruleForm.idcardno"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="subject-result-choose">
          <el-col :span="24">
            <el-form-item label="联系地址" style="font-size: 16px;" prop="home_address">
              <el-input v-model="ruleForm.home_address" type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="submit-btn">
          <el-button style="width: 196px;" size="mini" type="primary" @click="submitForm('ruleForm')">保存</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
//import Checkout from "../static/js/checkout";
export default {
  data() {
    return {
      cur_page: 0,
      cur_limit: 10,
      count: 0,
      publicSchools: [],
      areaNavName: [],
      areaNavId: [],
      campus_id: "",
      campus_name: "",
      student_grade: "",
      studentIsRepeat: true,
      loading: false,
      ruleForm: {
        //新增数据
        student_id: null, //此课学生的唯一id int,  --> 如果为新增,此值为空字符串
        student_name: "", //学生姓名
        sex: null, //学生性别
        student_grade: "", //学生年级
        student_birthday: "", //生日
        primary_school: "", //小学名字
        middle_school: "", //中学名字
        high_school: "", //高中名字
        ps_province_name: "", //小学所在省
        ps_city_name: "", //小学所在市
        ps_district_name: "", //小学所在区
        ms_province_name: "", //初中所在省
        ms_city_name: "", //初中所在市
        ms_district_name: "", //初中所在区
        hs_province_name: "", //高中所在省
        hs_city_name: "", //高中所在市
        hs_district_name: "", //高中所在区
        student_mobile: "", //学生电话
        father_mobile: "", //父亲电话
        mother_mobile: "", //母亲电话
        father_sms_enable: "", //父亲是否接短信
        mother_sms_enable: "", //母亲是否接短信
        known_channle: "", //了解渠道
        home_address: "", //家庭住址
        idcardno: "", //身份证号码
        email: "", //电子邮箱
        father_name: "", //父亲姓名
        mother_name: "", //母亲姓名
        campus_id: "", //学校id,
        department: "" //学部
      },
      //表单校验规则
      rules: {
        student_name: [
          { required: true, message: "请输入学生姓名", trigger: "blur" },
          { max: 12, message: "最多输入 12 个字符", trigger: "blur" }
        ],
        student_grade: [
          { required: true, message: "请选择学生年级", trigger: "blur" }
        ],
        school_name: [
          { max: 12, message: "最多输入 12 个字符", trigger: "blur" }
        ],
        selectedLocation: [
          { required: true, message: "请选择所需校区", trigger: "blur" }
        ],
        department: [
          { required: true, message: "请选择学部", trigger: "blur" }
        ],
        home_address: [
          { max: 50, message: "最多输入 50 个字符", trigger: "blur" }
        ],
        sex: [{ required: true, message: "请选择学生性别", trigger: "blur" }],
        email: [{ validator: this.Checkout.email, trigger: "blur" }],
        idcardno: [{ validator: this.Checkout.idCard, trigger: "blur" }],
        student_birthday: [
          { required: true, message: "请选择出生日期", trigger: "blur" }
        ],
        student_mobile: [
          { required: true, validator: this.Checkout.phone, trigger: "blur" }
        ]
      },

      subjectResultTags: [],
      subject: "", //分数 科目
      studentMark: "", //学生分数
      upload: false,
      selectedLocation: [], //选择的学校
      location: "", //校区导航
      department: "", //学部
      school: "", //学校
      province: "", //省
      city: "", //市
      county: "", //县/区
      entryScoreList: [],
      markArr: [],
      provinces: [],
      districts: [],
      citys: []
    };
  },
  mounted() {
    this.Util.querySysconst(this, "021", this.$store.state.KnowChannleOptions); //查询了解渠道
    this.Util.querySysconst(this, "100", this.$store.state.SubjectOptions); //查询科目
    this.Util.querySysconst(this, "006", this.$store.state.SeasonOptions); //查询季节
    this.Util.querySysconst(this, "009", this.$store.state.PeriodsOptions); //查询期别
    this.Util.querySysconst(this, "101", this.$store.state.GradeOptions); //查询年级
    this.Util.querySysconst(this, "100", this.$store.state.SubjectOptions); //查询科目
    this.Util.querySysconst(this, "002", this.$store.state.CourseTypeOptions); //查询类别/课型
    this.Util.querySysconst(this, "003", this.$store.state.ClassTypeOptions); //查询班型
    this.Util.querySysconst(this, "007", this.$store.state.DepartmentOptions); //查询学部
    this.Util.querySysconst(this, "021", this.$store.state.KnowChannleOptions); //了解渠道
  },
  //实例创建完成后被立即调用
  created() {
    const self = this;
    this.Util.queryAreaNav(self, -1, function() {}); //查询区域导航
    this.location = this.$store.state.location;
    this.organId = this.$store.state.organId;
    this.getProvinces();
  },
  watch: {
    studentMark: function() {
      if (this.studentMark > 200) {
        this.$message({
          type: "error",
          message: "输入的成绩必须小于200"
        });
      } else if (this.studentMark < 0) {
        this.$message({
          type: "error",
          message: "输入的成绩必须大于0"
        });
      }
    },
    selectedLocation: function() {
      console.log(this.selectedLocation);
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
        this.selectedLocation &&
        this.selectedLocation.length &&
        this.selectedLocation.length > 0
      ) {
        let obj = this.location;
        for (let i = 0; i < this.selectedLocation.length - 1; i++) {
          obj = getOrganName(obj, this.selectedLocation[i]);
        }
        for (let i = 0; i < obj.length; i++) {
          if (
            this.selectedLocation[this.selectedLocation.length - 1] ===
            obj[i].value
          ) {
            this.campus_name = obj[i].label;
            this.areaNavName.push(this.campus_name);
          }
        }
      }
      this.campus_id = this.selectedLocation[this.selectedLocation.length - 1];
      this.areaNavId = this.selectedLocation;
    },

    province: function() {
      this.city = ""
      this.getCitys()
    },
    city: function() {
      this.county = '';
      this.getDistrict()
    },
    ["ruleForm.student_grade"]: function() {
      if (
        this.ruleForm.student_grade == "10101" ||
        this.ruleForm.student_grade == "10102" ||
        this.ruleForm.student_grade == "10103" ||
        this.ruleForm.student_grade == "10104" ||
        this.ruleForm.student_grade == "10105" ||
        this.ruleForm.student_grade == "10106"
      ) {
        this.ruleForm.department = "00701";
      } else if (
        this.ruleForm.student_grade == "10107" ||
        this.ruleForm.student_grade == "10108" ||
        this.ruleForm.student_grade == "10109"
      ) {
        this.ruleForm.department = "00702";
      } else if (
        this.ruleForm.student_grade == "10110" ||
        this.ruleForm.student_grade == "10111" ||
        this.ruleForm.student_grade == "10112"
      ) {
        this.ruleForm.department = "00703";
      }
    },
    ["ruleForm.department"]: function(){
      this.districtsChange();
    }
  },
  methods: {
    checkRepeat() {
      if (
        this.ruleForm.student_name &&
        this.ruleForm.student_mobile.length === 11
      ) {
        this.$axios
          .post(
            this.GlobalVal.httpLink.studentIsRepeat,
            JSON.stringify({
              student_name: this.ruleForm.student_name,
              student_mobile: this.ruleForm.student_mobile
            })
          )
          .then(
            res => {
              if (res.data.code === "10000" && res.data.data.studentIsRepeat) {
                this.$message.error("此学员已存在");
                this.studentIsRepeat = true;
              } else {
                this.studentIsRepeat = false;
              }
            },
            res => {
              this.$message("请求失败");
            }
          );
      }
    },
    handleCloseTag(tag) {
      this.subjectResultTags.splice(this.subjectResultTags.indexOf(tag), 1);
    },
    goback() {
      this.$router.go(-1);
    },
    //新增时候参数判断-转换
    varJug(obj) {
      let self = this;
      let o = obj;
      this.subjectResultTags = this.subjectResultTags.filter(item => {
        item.subject = this.Util.GetValueForLabel(
          this.$store.state.SubjectOptions,
          item.subject
        );
        return item;
      });
      for (let i = 0; i < this.subjectResultTags.length; i++) {
        this.entryScoreList.push({
          subject: this.subjectResultTags[i].subject,
          entry_score: this.subjectResultTags[i].mark,
          id: null,
          student_id: null,
          test_date: null
        });
      }
      let pxxStudent = {
        student_id: "", //id，主键
        student_name: this.ruleForm.student_name, //学生姓名
        student_mobile: this.ruleForm.student_mobile, //学生常用电话，app账号
        student_birthday: this.ruleForm.student_birthday, //生日
        sex: this.ruleForm.sex, //学生性别，true-男
        student_grade: this.ruleForm.student_grade, //当前年级
        campus_id: this.selectedLocation[3] || "",
        branch_school_id: this.selectedLocation[2] || "",
        school_id: this.selectedLocation[1] || "",
        campus_name: "",
        branch_school_name: "",
        school_name: "",
        primary_school: "", //小学
        middle_school: "", //初中
        high_school: "", //高中
        ps_province_no: "", //小学所在省编号
        ps_province_name: "", //小学所在省名称
        ps_city_no: "", //小学所在市编号
        ps_city_name: "", //小学所在市名称
        ps_district_no: "", //小学所在区编号
        ps_district_name: "", //小学所在区名称
        ms_province_no: "", //中学所在省编号
        ms_province_name: "", //中学所在省名称
        ms_city_no: "", //中学所在市编号
        ms_city_name: "", //中学所在市名称
        ms_district_no: "", //中学所在区编号
        ms_district_name: "", //中学所在区名称
        hs_province_no: "", //高中所在省编号
        hs_province_name: "", //高中所在省名称
        hs_city_no: "", //高中所在市编号
        hs_city_name: "", //高中所在市名称
        hs_district_no: "", //高中所在区编号
        hs_district_name: "", //高中所在区名称
        father_name: this.ruleForm.father_name, //父亲姓名
        father_mobile: this.ruleForm.father_mobile, //父亲电话
        father_sms_enable: this.ruleForm.father_sms_enable, //父亲是否接受短信
        mother_name: this.ruleForm.mother_name, //母亲姓名
        mother_mobile: this.ruleForm.mother_mobile, //母亲电话
        mother_sms_enable: this.ruleForm.mother_sms_enable, //母亲是否接受短信
        known_channle: this.ruleForm.known_channle, //了解渠道
        home_address: this.ruleForm.home_address, //家庭住址
        email: this.ruleForm.email, //学生邮箱
        idcardno: this.ruleForm.idcardno //学生身份证号
      };
      pxxStudent.sex = pxxStudent.sex === "true" ? true : false;
      if (this.ruleForm.department === "00701") {
        //小学
        pxxStudent.primary_school = this.school;
        pxxStudent.ps_province_no = this.province;
        pxxStudent.ps_city_no = this.city;
        pxxStudent.ps_district_no = this.county;
        pxxStudent.ms_province_no = null;
        pxxStudent.ms_city_no = null;
        pxxStudent.ms_district_no = null;
        pxxStudent.hs_province_no = null;
        pxxStudent.hs_city_no = null;
        pxxStudent.hs_district_no = null;
        pxxStudent.ps_province_name = self.Util.GetIdNameForValue(
          self.$store.state.ProvinceOptions,
          this.province,
          "province_no",
          "province_name"
        );
        pxxStudent.ps_city_name = self.Util.GetIdNameForValue(
          self.$store.state.CityOptions,
          this.city,
          "city_no",
          "city_name"
        );
        pxxStudent.ps_district_name = self.Util.GetIdNameForValue(
          self.$store.state.CountyOptions,
          this.county,
          "district_no",
          "district_name"
        );
      } else if (this.ruleForm.department === "00702") {
        //初中
        pxxStudent.middle_school = this.school;
        pxxStudent.ms_province_no = this.province;
        pxxStudent.ms_city_no = this.city;
        pxxStudent.ms_district_no = this.county;
        pxxStudent.hs_province_no = null;
        pxxStudent.hs_city_no = null;
        pxxStudent.hs_district_no = null;
        pxxStudent.ps_province_no = null;
        pxxStudent.ps_city_no = null;
        pxxStudent.ps_district_no = null;
        pxxStudent.ms_province_name = self.Util.GetIdNameForValue(
          self.$store.state.ProvinceOptions,
          this.province,
          "province_no",
          "province_name"
        );
        pxxStudent.ms_city_name = self.Util.GetIdNameForValue(
          self.$store.state.CityOptions,
          this.city,
          "city_no",
          "city_name"
        );
        pxxStudent.ms_district_name = self.Util.GetIdNameForValue(
          self.$store.state.CountyOptions,
          this.county,
          "district_no",
          "district_name"
        );
      } else if (this.ruleForm.department === "00703") {
        //高中
        pxxStudent.high_school = this.school;
        pxxStudent.ps_province_no = null;
        pxxStudent.ps_city_no = null;
        pxxStudent.ps_district_no = null;
        pxxStudent.ms_province_no = null;
        pxxStudent.ms_city_no = null;
        pxxStudent.ms_district_no = null;
        pxxStudent.hs_province_no = this.province;
        pxxStudent.hs_city_no = this.city;
        pxxStudent.hs_district_no = this.county;
        pxxStudent.hs_province_name = self.Util.GetIdNameForValue(
          self.$store.state.ProvinceOptions,
          this.province,
          "province_no",
          "province_name"
        );
        pxxStudent.hs_city_name = self.Util.GetIdNameForValue(
          self.$store.state.CityOptions,
          this.city,
          "city_no",
          "city_name"
        );
        pxxStudent.hs_district_name = self.Util.GetIdNameForValue(
          self.$store.state.CountyOptions,
          this.county,
          "district_no",
          "district_name"
        );
      }
      return pxxStudent;
    },
    //新增--提交
    submitForm(formName) {
      const self = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let objData = {
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            source: this.GlobalVal.constants.source,
            student: this.varJug(self.ruleForm),
            entryScoreList: this.entryScoreList
          };
          let loadingInstance = this.$Loading();
          console.log("新增学生发起请求的参数", objData);
          if (this.studentIsRepeat) {
            this.$message.error("此学员已存在");
            loadingInstance.close();
            return;
          }
          self.$axios
            .post(this.GlobalVal.httpLink.editStudents, JSON.stringify(objData))
            .then(
              res => {
                if (res.data.code === "10000") {
                  console.log("新增学生获取的对象", res.data);
                  self.$message({
                    type: "success",
                    message: "新增成功"
                  });
                  this.$router.push({
                    path: "studentInfo/classQuery",
                    query: {
                      sid: res.data.data.student_id
                    }
                  });
                  loadingInstance.close();
                } else {
                  self.$message({
                    type: "error",
                    message: res.data.errmsg
                  });
                  loadingInstance.close();
                }
              },
              res => {
                self.$message("请求失败");
                loadingInstance.close();
              }
            );
        } else {
          return false;
        }
      });
    },
    handleLocationChange(value) {
      this.ruleForm.selectedLocation = this.selectedLocation;
      /* this.ruleForm.campus_id = this.areaNavId[3];
                this.ruleForm.branch_school_id=this.areaNavId[2];
                this.ruleForm.school_id = this.areaNavId[1];*/
    },

    /**
     * 自动转换为浮点类的数
     * @param val
     */
    parseFloatRule(val) {
      const self = this;
      if (this.paymentForm[val]) {
        if (this.paymentForm[val].match(/\d+.+/)) {
          this.paymentForm[val] = parseFloat(
            self.paymentForm[val].match(/\d+.+/)[0]
          );
        } else {
          this.paymentForm[val] = 0;
        }
      }
    },
    /**
     * 自动转换为整形的数
     * @param val
     */
    parseIntRule(val) {
      const self = this;
      if (this.paymentForm[val]) {
        if (this.paymentForm[val].match(/\d+.+/)) {
          this.paymentForm[val] = parseInt(
            self.paymentForm[val].match(/\d+.+/)[0]
          );
        } else {
          this.paymentForm[val] = 0;
        }
      }
    },
    districtsChange(formName) {
      if (this.county !== "") {
        this.district_name =
          this.Util.GetIdNameForValue(
            this.$store.state.CountyOptions || this.districts,
            this.county,
            "district_no",
            "district_name"
          ) ||
          this.Util.GetIdNameForValue(
            this.districtsList,
            this.ruleForm.ps_district_no,
            "district_no",
            "district_name"
          ) ||
          this.Util.GetIdNameForValue(
            this.districtsList,
            this.ruleForm.hs_district_no,
            "district_no",
            "district_name"
          );
      }
      formName ? (this.cur_limit = 10) : this.cur_limit;
      this.loading = true;
      let objData2 = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        page: 0,
        limit: this.cur_limit,
        districtName: this.district_name,
        department: this.ruleForm.department
      };
      setTimeout(() => {
        this.$axios
          .post(
            this.GlobalVal.httpLink.queryPubicSchool,
            JSON.stringify(objData2)
          )
          .then(
            res => {
              if (res.data.code === "10000") {
                this.count = res.data.count;
                this.publicSchools = res.data.publicSchools;
                /* if (this.cur_limit > res.data.count) {
                  this.$message.error("已加载完数据");
                } */
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
          );
      }, 1000);
    },
    studentMark1() {
      if (!this.subject || !this.subject.length) {
        this.$message({
          showClose: true,
          message: "请先选择科目入学成绩栏下的选择科目选项"
        });
        return false;
      } else if (!this.studentMark) {
        this.$message({
          showClose: true,
          message: "请填写分数"
        });
        return false;
      }
      let subjectArr = [];
      for (let i = 0; i < this.subject.length; i++) {
        subjectArr[i] = this.Util.GetLabelForValue(
          this.$store.state.SubjectOptions,
          this.subject[i]
        );
      }

      let obj = [...this.subjectResultTags];
      subjectArr.forEach((item, i) => {
        obj.forEach((val, ind) => {
          if (val.subject === item) {
            obj.splice(ind, 1);
          }
        });
        obj.push({
          subject: item,
          mark: this.studentMark
        });
      });
      this.subjectResultTags = obj.filter(function(d) {
        d.mark1 = "-" + d.mark;
        return d;
      });
      this.studentMark = "";
    },
    moreLoading() {
      this.cur_limit += 30;
      this.districtsChange();
    },
    getProvinces() {
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        source: this.GlobalVal.constants.source //请求方式   Wechat，Android，PC，IOS
      };
      this.$axios
        .post(this.GlobalVal.httpLink.queryProvince, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              this.provinces = res.data.provinces;
              this.$store.commit("setProvinceOptions", res.data.provinces);
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
    getCitys(){
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        source: this.GlobalVal.constants.source,
        province_no: this.province //省份编号
      };
      this.$axios
        .post(this.GlobalVal.httpLink.queryCities, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              this.citys = res.data.citys;
              this.$store.commit("setCityOptions", res.data.citys);
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
  getDistrict(){
    let objData = {
      staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
      source: this.GlobalVal.constants.source,
      city_no: this.city
    };
    this.$axios
      .post(this.GlobalVal.httpLink.queryDiss, JSON.stringify(objData))
      .then(
        res => {
          if (res.data.code === "10000") {
            this.districts = res.data.districts;
            this.$store.commit("setCountyOptions", res.data.districts);
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
  }
  }
};
</script>
