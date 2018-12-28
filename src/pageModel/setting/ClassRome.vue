<template>
    <div class="table">
        <div class="handle-box">
            <el-cascader clearable
                    size="small"
                    expand-trigger="click"
                    :options="location"
                    v-model="selectedLocation"
                    placeholder="选择学校"
                    change-on-select
                    style="width: 285px;"
                    @blur="blur">
            </el-cascader>
            <!-- <el-select multiple
                size="small"
                expand-trigger="click"
                :options="$store.state.SchoolEquipmentOptions"
                v-model="select_equipment"
                placeholder="设备不限"
                change-on-select
                @change="handleLocationChange" style="width: 190px;"
                @blur="selectEquipment">
            </el-select> -->
            <el-select
                v-model="select_equipment"
                size="small"
                multiple
                placeholder="设备不限"
                style="min-width: 190px;"
                @remove-tag="remove_equipment"
                @change="handleLocationChange">
                <el-option
                v-for="item in $store.state.SchoolEquipmentOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-input v-model="leastStudentNumber" size="small" placeholder="最少人数" style="width: 115px;" @blur="blur" clearable></el-input>
            <el-input v-model="maxStudentNumber" size="small" placeholder="最多人数" style="width: 115px" @blur="blur" clearable></el-input>
            <div class="headle-right">
                <el-button type="primary" size="mini" icon="plus" class="handle-del mr10" @click="handleAdd">新增</el-button>
                <!--<el-button type="primary" size="mini" icon="search"  @click="screening">筛选</el-button>-->
                <el-button type="primary" size="mini" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                <el-button type="primary" size="mini" icon="delete" class="handle-del mr10" @click="exportTable" v-show="$store.state.code.includes('020201')">导出教室用表</el-button>
            </div>
        </div>
        <div class="handle-date">
            <span>教室利用率筛选</span>
            <el-date-picker
                    style="margin-bottom: 15px;"
                    clearable
                    unlink-panels
                    v-model="croomsDate"
                    align="right"
                    size="small"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerClass">
            </el-date-picker>
        </div>
        <el-table :data="data" size="mini" stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange" v-loading="loading">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="croom_name" label="教室名称"></el-table-column>
            <el-table-column prop="campus_name" label="校区"></el-table-column>
            <el-table-column prop="max_student_number" label="容纳人数"></el-table-column>
            <el-table-column prop="rank" label="教室设备"></el-table-column>
            <el-table-column prop="created_at" label="创建时间"></el-table-column>
            <el-table-column prop="utility" label="利用率">
                <template slot-scope="scope">
                    {{(scope.row.utility * 100).toFixed(2) +'%'}}
                </template>
            </el-table-column>
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
                            <h3 v-if="changeTeamLayer" class="modify-title">修改教室</h3>
                        </div>
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="教室名称" prop="croom_name">
                                <el-input v-model="ruleForm.croom_name"></el-input>
                            </el-form-item>
                            <el-form-item label="容纳人数" prop="max_student_number">
                                <el-input v-model="ruleForm.max_student_number"></el-input>
                            </el-form-item>
                            <el-form-item label="选择学校">
                                <el-cascader clearable
                                        expand-trigger="click"
                                        :options="location"
                                        v-model="organ_id2"
                                        change-on-select
                                        @change="handleLocationChange">
                                </el-cascader>
                            </el-form-item>
                            <el-form-item label="拥有设备" prop="type">
                                <el-checkbox-group v-model="ruleForm_equipment">
                                    <el-checkbox label="电脑" name="type"></el-checkbox>
                                    <el-checkbox label="白板" name="type"></el-checkbox>
                                    <el-checkbox label="投影仪" name="type"></el-checkbox>
                                    <el-checkbox label="麦克风" name="type"></el-checkbox>
                                    <el-checkbox label="无线网" name="type"></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item label="备注">
                                <el-input v-model="ruleForm.remark" type="textarea" resize="none"></el-input>
                            </el-form-item>
                            <el-form-item label="是否启用">
                                <el-switch v-model="status"></el-switch>
                            </el-form-item>
                            <el-form-item>
                                <!--<el-button v-if="!changeTeamLayer" type="primary" @click="submitForm('ruleForm')" style="width: 195px;margin-left: 40px">保存</el-button>-->
                                <el-button type="primary" @click="submitForm('ruleForm')" style="width: 125px;margin-left: 120px;" size="mini">保存</el-button>
                                <el-button type="primary" @click="addTeamLayer=!addTeamLayer" style="width: 125px;" size="mini">取消</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </transition>
            </div>
        </transition>
        <!--导出教室用表-->
        <transition name="el-fade-in-linear">
            <div v-show="exportClassroom" class="bg-layer">
                <transition name="el-zoom-in-center">
                    <div v-if="exportClassroom" class="transition-box1">
                        <div class="title-warp1">
                            <div class="close-btn" @click="exportClassroom=!exportClassroom"><i class="el-icon-close"></i></div>
                            <h3 class="modify-title">导出教室预览</h3>
                            <div class="export-table">
                              <!--  <div class="export-distance">
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
                                    <el-select clearable v-model="periods" size="mini" placeholder="期别">
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
                                </div>-->
                               <div class="tableDistance">
                                  <!-- <div class="search-warp">
                                       <el-input
                                               size="mini"
                                               v-model="select_word"
                                               placeholder="请输入搜索内容"
                                               class="search-input">
                                           <el-select style="width: 100px;" v-model="selectTeacherOrClass" slot="prepend" placeholder="请选择">
                                               <el-option label="老师姓名" value="teacher"></el-option>
                                               <el-option label="班级" value="class"></el-option>
                                           </el-select>
                                           <el-button class="search-btn" slot="append" icon="el-icon-search" @click="search"></el-button>
                                       </el-input>
                                   </div>-->
                                   <el-date-picker
                                           size="mini"
                                           v-model="seachDate"
                                           type="date"
                                           placeholder="选择日期"
                                           style="width: 200px;"
                                           :picker-options="pickerOptions">
                                   </el-date-picker>
                                   <!--<el-select clearable v-model="department" size="mini" placeholder="学部">
                                       <el-option
                                               v-for="item in $store.state.DepartmentOptions"
                                               :key="item.code"
                                               :label="item.label"
                                               :value="item.value">
                                       </el-option>
                                   </el-select>-->
                                   <el-cascader clearable
                                                size="mini"
                                                expand-trigger="click"
                                                :options="location"
                                                v-model="selectedLocationExport"
                                                placeholder="学校不限"
                                                @change="handleLocationChange"
                                                style="width: 300px">
                                   </el-cascader>
                               </div>
                                <el-table :data="acsList" size="mini" stripe style="width: 100%;min-height: 500px" v-loading="loading">
                                        <el-table-column label="时间点">
                                            <template slot-scope="scope">
                                                {{dateList[scope.$index]}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column v-for="(item, i) in dataRooms" :key="item.id" :label="item.name">
                                            <template slot-scope="scope">
                                                {{scope.row[i] || '无'}}
                                            </template>
                                        </el-table-column>
                                </el-table>
                                <div class="export-btn">
                                    <el-button slot="append" size="mini" type="primary" @click="exportRooms">导出</el-button>
                                    <el-button slot="append" size="mini" type="primary" @click="exportCancel">取消</el-button>
                                </div>

                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
  name: "ClassRoom",
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
      organId: "",
      organName: "",
      leastStudentNumber: null,
      minStudentNumber: null,
      equipment: "",
      have_pc: null,
      have_white_board: null,
      hava_projection: null,
      have_mike: null,
      have_wifi: null,
      select_equipment: [], //选择设备
      ruleForm_equipment: "",
      organ_id2: [],
      campus_name: "",
      campus_id: "",
      status: "",
      loading: true,
      dateList: [
        "8:00-10:00",
        "10:10-12:00",
        "14:00-16:00",
        "16:20-18:20",
        "18:30-20:30"
      ],
      dataList: [], //请求的list
      location: [], //校区导航
      select_Location: [], //选择校区
      selectedLocation: [], //选择校区2
      selectedequipment: [], //选择设备
      multipleSelection: [], //选中行的集合
      selectedLocationExport: [],
      areaNavName: [],
      areaNavId: [],
      maxStudentNumber: "",
      addTeamLayer: false, //新增弹出框状态
      changeTeamLayer: false, //修改弹出框状态
      exportClassroom: false, //导出教室
      startDate: this.Util.TimeCycle(new Date().getTime(), "ymd"), //开始时间
      endDate: this.Util.TimeCycle(new Date().getTime(), "ymd"), //结束时间
      dataRooms: [],
      croomsDate: [],
      ruleForm: {
        //新增数据
        croom_id: "",
        croom_name: "",
        max_student_number: "",
        equipment: "",
        have_pc: false,
        have_white_board: false,
        hava_projection: false,
        have_mike: false,
        have_wifi: false,
        status: true,
        created_at: null,
        open_time: ""
      },
      //导出班级进行搜索
      particular_year: "",
      season: "",
      periods: "",
      grade: "",
      subject: "",
      projectType: "",
      classType: "",
      select_word: "",
      department: "",
      seachDate: "",
      selectTeacherOrClass: "teacher",
      classroomData: [],
      acsList: [],
      objData: {},
      loading: false,
      //接收当前行的信息
      changeForm2: {},
      //时间调节
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "下一周",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              console.log(picker.$emit("pick"), "362");
              picker.$emit("pick", date);
            }
          },
          {
            text: "上一周",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              console.log(picker.$emit("pick"), "362");
              picker.$emit("pick", date);
            }
          }
        ]
      },
      //表单校验规则
      rules: {
        croom_name: [
          { required: true, message: "请输入教室名称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        max_student_number: [
          { required: true, validator: checkNum, trigger: "blur" }
        ]
      },
      pickerClass: {
        shortcuts: [
          {
            text: "上一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "下一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          }
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
    //self.organId=self.$store.state.organId;
    /* self.equipment = self.$store.state.equipment;*/
    this.Util.querySysconst(this, "006", this.$store.state.SeasonOptions); //查询季节
    this.Util.querySysconst(this, "009", this.$store.state.PeriodsOptions); //查询期别
    this.Util.querySysconst(this, "101", this.$store.state.GradeOptions); //查询年级
    this.Util.querySysconst(this, "100", this.$store.state.SubjectOptions); //查询科目
    this.Util.querySysconst(this, "002", this.$store.state.CourseTypeOptions); //查询类别/课型
    this.Util.querySysconst(this, "003", this.$store.state.ClassTypeOptions); //查询班型
    this.Util.querySysconst(this, "007", this.$store.state.DepartmentOptions); //查询学部
    this.Util.querySysconst(this, "001", this.$store.state.ProjectTypeOptions); //项目类型
    this.organId = self.$store.state.organId;
  },
  //计算属性
  computed: {
    //相当于过滤器,暂时不用
    data() {
      const self = this;
      if (!self.dataList) {
        return [];
      }
      return self.dataList.filter(function(d) {
        let rank = "";
        if (d.have_pc) {
          rank += "电脑 ";
        }
        if (d.have_white_board) {
          rank += "白板 ";
        }
        if (d.hava_projection) {
          rank += "投影仪 ";
        }
        if (d.have_mike) {
          rank += "麦克风 ";
        }
        if (d.have_wifi) {
          rank += "无线网 ";
        }
        d.rank = rank;
        d.created_at = self.Util.TimeCycle(d.created_at, "ymd");
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
        this.organId = this.selectedLocation[this.selectedLocation.length - 1];
        this.getData("pageClear");
      } else if (this.selectedLocation.length === 0) {
        this.organId = "";
        this.getData("pageClear");
      }
    },
    organ_id2: function() {
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
            this.campus_name = obj[i].label;
            console.log(this.campus_name);
            this.areaNavName[i] = obj[i].label;
          }
        }
        this.campus_id = this.organ_id2[this.organ_id2.length - 1];
        this.areaNavId = this.organ_id2;
      }
    },
    select_equipment: function() {
      const self = this;
      /*if(this.select_equipment!==""){
                    let equipmentList =this.select_equipment.map((item)=>item+",");
                    self.equipment =equipmentList.join('');
                }*/
      if (this.select_equipment !== "") {
        /* for(let i=0;i<this.select_equipment.length;i++){
                        switch (item){
                            case '电脑':this.have_pc = true;break;
                            case '白板':this.have_white_board = true;break;
                            case '无线网':this.have_wifi = true;break;
                            case '麦克风':this.have_mike = true;break;
                            case '投影仪':this.hava_projection = true;break;
                        }
                    }*/
        this.select_equipment.filter(item => {
          switch (item) {
            case "电脑":
              this.have_pc = true;
              break;
            case "白板":
              this.have_white_board = true;
              break;
            case "无线网":
              this.have_wifi = true;
              break;
            case "麦克风":
              this.have_mike = true;
              break;
            case "投影仪":
              this.hava_projection = true;
              break;
          }
        });
      }
      console.log(this.select_equipment);
      this.getData();
    },
    select_Location: function() {
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
        this.organName = obj;
        this.equipment = "";
        for (let i = 0; i < this.selectedLocation.length - 1; i++) {
          obj = getOrganName(obj, this.selectedLocation[i]);
        }
        for (let i = 0; i < obj.length; i++) {
          if (
            this.selectedLocation[this.selectedLocation.length - 1] ===
            obj[i].value
          ) {
            console.log(obj[i].label);
            this.organName = obj[i].label;
          }
        }
      }
      this.getData("pageClear");
    },
    changeForm2: function() {
      this.ruleForm_equipment = [];
      if (this.changeForm2.have_pc) {
        this.ruleForm_equipment.push("电脑");
      }
      if (this.changeForm2.have_white_board) {
        this.ruleForm_equipment.push("白板");
      }
      if (this.changeForm2.hava_projection) {
        this.ruleForm_equipment.push("投影仪");
      }
      if (this.changeForm2.have_mike) {
        this.ruleForm_equipment.push("麦克风");
      }
      if (this.changeForm2.have_wifi) {
        this.ruleForm_equipment.push("无线网");
      }
      this.ruleForm.croom_id = this.changeForm2.croom_id;
      this.ruleForm.croom_name = this.changeForm2.croom_name;
      this.ruleForm.max_student_number = this.changeForm2.max_student_number;
      /*this.ruleForm.equipment=[];*/
      this.ruleForm.have_pc = this.changeForm2.have_pc;
      this.ruleForm.have_white_board = this.changeForm2.have_white_board;
      this.ruleForm.hava_projection = this.changeForm2.hava_projection;
      this.ruleForm.have_mike = this.changeForm2.have_mike;
      this.ruleForm.have_wifi = this.changeForm2.have_wifi;
      this.ruleForm.status = this.changeForm2.status;
      this.status = this.changeForm2.status;
      this.ruleForm.created_at = this.changeForm2.created_at;
      this.ruleForm.created_at = this.changeForm2.created_at;
      this.ruleForm.open_time = this.changeForm2.open_time;
      this.ruleForm.remark = this.changeForm2.remark;
      this.organ_id2[0] = 1;
      this.organ_id2[1] = this.changeForm2.school_id;
      this.organ_id2[2] = this.changeForm2.branch_school_id;
      this.organ_id2[3] = this.changeForm2.campus_id;
    },
    select_word: function() {
      const self = this;
      self.teacherName = self.select_word;
    },
    seachDate: function() {
      this.selectedLocationExport.length > 3 && this.seachDate
        ? this.exportTable()
        : this.$message.error("请选择校区和选择日期");
    },
    selectedLocationExport: function() {
      this.selectedLocationExport.length > 3 && this.seachDate
        ? this.exportTable()
        : this.$message.error("请选择校区和选择日期");
    },
    croomsDate: function() {
      if (this.croomsDate != null && this.croomsDate.length > 1) {
        this.startDate = this.Util.TimeCycle(
          new Date(this.croomsDate[0]).getTime(),
          "ymd"
        );
        this.endDate = this.Util.TimeCycle(
          new Date(this.croomsDate[1]).getTime(),
          "ymd"
        );
      } else {
        this.startTimeOther = "";
        this.endTimeOther = "";
      }
      this.getData("pageClear");
    }
  },
  methods: {
    //获取数据
    getData(pageClear) {
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        page: pageClear ? (this.cur_page = 0) : this.cur_page, //页数
        limit: this.cur_limit, //条目数
        classroomName: "",
        campusId: this.selectedLocation[3], //.机构ID, int,可能为空
        mostStudentNumber: this.maxStudentNumber, //short int容纳人数
        leastStudentNumber: this.leastStudentNumber, //short int容纳人数
        equipment: this.equipment, //搜索设备
        //以下参数也为可选
        havePC: this.have_pc, //是否有电脑
        haveWhiteBoard: this.have_white_board, //是否有白板
        havaProjection: this.hava_projection, //是否有投影仪
        haveMike: this.have_mike, //是否有麦克风
        haveWifi: this.have_wifi, //是否有无线网络
        startDate: this.startDate, //开始时间
        endDate: this.endDate //结束时间
      };
      this.loading = true;
      console.log("查询教室列表发起请求的参数", objData);
      this.$axios
        .post(this.GlobalVal.httpLink.queryClassrooms, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              console.log("查询教室列表获取的对象", res.data);
              this.count = res.data.count;
              this.dataList = res.data.classrooms;
            } else {
              console.error(res);
              /* this.$message({
                                type:"error",
                                message:res.data.errmsg
                            })*/
            }
            this.loading = false;
          },
          res => {
            this.$message("请求失败");
            this.loading = false;
          }
        );
    },
    //重新选择了地区事件
    handleLocationChange(value) {},
    //重新筛选函数
    screening() {
      if (this.select_Location === "") {
        this.$message({
          type: "error",
          message: "填写要搜索的学校"
        });
      }
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
                id: row.croom_id
              }
            ]
          };
          this.$axios
            .post(this.GlobalVal.httpLink.delClassroom, JSON.stringify(objData))
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
            let roomId = [];
            for (
              let i = 0, length = self.multipleSelection.length;
              i < length;
              i++
            ) {
              roomId.push({
                id: self.multipleSelection[i].croom_id
              });
            }

            let objData = {
              staffId: JSON.parse(window.sessionStorage.getItem("staff"))
                .staffId,
              delList: roomId
            };
            self.multipleSelection = [];
            this.$axios
              .post(
                this.GlobalVal.httpLink.delClassroom,
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

    //新增按钮事件
    handleAdd() {
      this.addTeamLayer = true;
      this.status = true;
      this.ruleForm.croom_id = "";
      this.ruleForm.croom_name = "";
      this.ruleForm.max_student_number = "";
      this.ruleForm.equipment = [];
      this.organ_id2 = [];
      this.ruleForm_equipment = [];
      this.ruleForm.created_at = null;
      this.ruleForm.have_pc = "";
      this.ruleForm.have_white_board = "";
      this.ruleForm.hava_projection = "";
      this.ruleForm.have_mike = "";
      this.ruleForm.have_wifi = "";
      this.ruleForm.remark = "";
    },
    //新增/修改时候参数判断-转换
    varJug(obj) {
      console.log(obj);
      let self = this;
      let o = obj;
      let havaObj = {
        have_pc: false,
        have_white_board: false,
        hava_projection: false,
        have_mike: false,
        have_wifi: false
      };
      if (this.ruleForm_equipment.length == 0) {
        o.equipment = "";
      } else {
        for (let i = 0; i < this.ruleForm_equipment.length; i++) {
          if (this.ruleForm_equipment[i] === "电脑") {
            havaObj.have_pc = true;
          } else if (this.ruleForm_equipment[i] === "白板") {
            havaObj.have_white_board = true;
          } else if (this.ruleForm_equipment[i] === "投影仪") {
            havaObj.hava_projection = true;
          } else if (this.ruleForm_equipment[i] === "麦克风") {
            havaObj.have_mike = true;
          } else if (this.ruleForm_equipment[i] === "无线网") {
            havaObj.have_wifi = true;
          }
          if (o.equipment === "") {
            o.equipment = this.ruleForm_equipment[i];
          } else {
            o.equipment += "," + this.ruleForm_equipment[i];
          }
        }
      }
      o.have_pc = havaObj.have_pc;
      o.have_white_board = havaObj.have_white_board;
      o.hava_projection = havaObj.hava_projection;
      o.have_mike = havaObj.have_mike;
      o.have_wifi = havaObj.have_wifi;
      o.status = this.status;
      //o.status = o.status==="启用"?true:false;
      o.campus_id = this.organ_id2[3];
      o.branch_school_id = this.organ_id2[2];
      o.school_id = this.organ_id2[1];
      o.campus_name = this.campus_name;
      o.branch_school_name = "";
      o.school_name = "";
      return o;
    },

    //新增--提交
    submitForm(formName) {
      const self = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let objData = {
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            classroom: this.varJug(this.ruleForm)
          };
          console.log("新增教师等级发起请求的参数", objData);
          this.$axios
            .post(
              this.GlobalVal.httpLink.editClassroom,
              JSON.stringify(objData)
            )
            .then(
              res => {
                if (res.data.code === "10000") {
                  this.areaNavId = [];
                  this.getData();
                  console.log("新增教师等级获取的对象", res.data);
                  self.$message({
                    type: "success",
                    message: "操作成功"
                  });
                } else {
                  console.error(res);
                  self.$message({
                    type: "error",
                    message: res.data.errmsg
                  });
                }
                self.addTeamLayer = false;
                //this.getData();
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
    selectEquipment() {
      if (this.selectedLocation === "") {
        this.$message({
          type: "error",
          message: "填写要搜索的设备"
        });
      }
      this.getData("pageClear");
    },
    //新增/修改教师等级--重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    blur() {
      this.getData("pageClear");
    },
    remove_equipment(item) {
      console.log(item);
      switch (item) {
        case "电脑":
          this.have_pc = null;
          break;
        case "白板":
          this.have_white_board = null;
          break;
        case "无线网":
          this.have_wifi = null;
          break;
        case "麦克风":
          this.have_mike = null;
          break;
        case "投影仪":
          this.hava_projection = null;
          break;
      }
      this.getData();
    },
    exportRooms() {
      if (!this.dataRooms.length) {
        this.$message.warning("未查询出数据，无法导出");
        return false;
      }
      let dataLink = this.GlobalVal.httpLink.exportClassroomTimeTable + "?";
      for (let i in this.objData) {
        this.objData[i] &&
          i !== "page" &&
          i !== "limit" &&
          (dataLink += i + "=" + this.objData[i] + "&");
      }
      //console.log(dataLink.slice(-2))
      window.open(dataLink);
    },
    exportTable() {
      this.exportClassroom = true;
      if (this.seachDate !== "" && this.selectedLocationExport.length > 2) {
        this.objData = {
          staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
          source: this.GlobalVal.constants.source,
          date: this.Util.TimeCycle(new Date(this.seachDate).getTime(), "ymd"),
          campusId: this.selectedLocationExport[3] //校区
        };
        this.loading = true;
        console.log("导出教室用表发起请求的参数", this.objData);
        this.$axios
          .post(
            this.GlobalVal.httpLink.previewClassroomTimeTable,
            JSON.stringify(this.objData)
          )
          .then(
            res => {
              if (res.data.code === "10000") {
                console.log("导出教室用表获取的对象", res.data);
                if (this.acsList.length === 0) {
                  this.acsList.push(
                    res.data.acs1,
                    res.data.acs2,
                    res.data.acs3,
                    res.data.acs4,
                    res.data.acs5
                  );
                }
                this.dataRooms = res.data.crooms;
                this.loading = false;
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
              this.loading = false;
            }
          );
      }
    },
    search() {},
    exportCancel() {
      this.exportClassroom = false;
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
  width: 750px;
  height: 550px;
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
.transition-box1 {
  position: absolute;
  width: 1100px;
  height: 700px;
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
.title-warp1 {
  position: absolute;
  width: 1100px;
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
.title-warp1 > h3 {
  font-size: 16px;
}
.demo-ruleForm {
  margin-top: 20px;
}
.demo-ruleForm .el-form-item {
  margin-bottom: 20px;
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
  padding-bottom: 10px;
  border-bottom: 1px solid #dbe3e2;
}
.handle-date {
  padding-top: 10px;
  float: right;
  padding-right: 20px;
}
.headle-right {
  display: block;
  float: right;
  padding-right: 20px;
}
.export-table {
  padding: 20px;
  height: 600px;
  overflow-y: auto;
}
.search-warp {
  display: inline-block;
  /*float: right;*/
}
.tableDistance {
  padding: 10px 0 20px;
}
.search-input {
  width: 450px;
}
.export-btn {
  padding-top: 20px;
  float: right;
}
.export-btn .el-button {
  width: 100px;
}
</style>
<style>
.export-table .el-select .el-input {
  width: 148px;
}
</style>
