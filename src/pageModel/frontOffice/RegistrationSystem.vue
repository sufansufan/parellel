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
}
.transition-box {
  position: absolute;
  width: 1300px;
  height: 800px;
  margin: auto;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  border-radius: 4px;
  background-color: #ffffff;
  color: #333333;
  padding-top: 60px;
  box-sizing: border-box;
  z-index: 10;
}

.title-warp {
  position: absolute;
  width: 1300px;
  height: 50px;
  top: 0px;
  right: 0;
  z-index: 10;
  background: #ffffff;
  -webkit-box-shadow: 0px 0px 3px #ccc;
  -moz-box-shadow: 0px 0px 3px #ccc;
  box-shadow: 0px 0px 3px #ccc;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
.fotter-warp {
  position: absolute;
  width: 600px;
  height: 50px;
  bottom: 0;
  right: 0;
  z-index: 10;
  background: #ffffff;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  overflow: hidden;
  padding-left: 20px;
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
  line-height: 50px;
  text-align: center;
}
.modify-title {
  font-size: 20px;
  height: 50px;
  line-height: 50px;
  color: #666666;
  border-bottom: 1px solid #fffbfb;
  text-align: left;
  padding-left: 20px;
}
.handle-box {
  margin-bottom: 20px;
}
.search-warp {
  display: inline-block;
}
.handle-input {
  width: 300px;
  display: inline-block;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.search-input {
  width: 400px;
}

.checkbox-warp {
  margin-top: 10px;
}
.class-query .el-checkbox__label {
  font-size: 12px;
}
.vertical-moulding {
  display: inline-block;
  width: 1px;
  height: 12px;
  background: #cccccc;
  position: relative;
  top: 1px;
  left: 12px;
}
.vertical-moulding + .el-checkbox {
  margin-left: 25px;
}
.check-box {
  padding-bottom: 20px;
}
.class-name-info {
  font-size: 20px;
}
.class-info {
  display: inline-block;
  font-size: 16px;
  margin-top: 10px;
  color: #8a8a8a;
}
.registration-title {
  font-size: 18px;
}
.registration-list-warp {
  font-size: 14px;
}
.grid-content {
  height: 36px;
  line-height: 36px;
  font-size: 16px;
  color: #8a8a8a;
}
.grid-content button {
  width: 80px;
  font-size: 14px;
}
.signBox {
  height: 710px;
  overflow-y: auto;
  padding: 0px 20px 20px;
}
.signStudent {
  min-height: 600px;
}
.signAll {
  margin-top: 20px;
}
.signRecord {
  min-height: 700px;
}
.searchSecond {
  margin-top: 10px;
  margin-bottom: 20px;
}
.chargeCampus {
  color: #f56c6c;
}
</style>
<style>
.check-style .el-badge__content {
  background: #f2f2f2;
  right: auto;
  color: #444;
  left: 0;
  top: 3px;
  transform: translateY(-50%) translateX(-5px);
}
.registration-list {
  padding: 0px 0 5px 10px;
  margin-bottom: 10px;
  margin-top: 5px;
  border-bottom: 1px dotted #ccc;
}
.registration-list:last-child {
  border: none;
}
.registration-list > .lesson-list-warp > div:not(.check-style) {
  margin-top: 1px;
}
.registration-list .el-badge .el-button--text {
  height: 25px;
}
.registration-list .el-badge .el-button--text span {
  line-height: 25px;
  font-size: 16px;
  font-weight: bold;
}
.registration-list.actived {
  /* animation: breath 1.5s ease-in-out infinite; */
  background: #d0e7ff;
  border-radius: 5px;
  border-color: #d0e7ff;
  /* padding-bottom: 0; */
}
@keyframes breath {
  from {
    background: rgb(255, 255, 255);
  }
  50% {
    background: rgb(208, 231, 255);
  }
  to {
    background: rgb(255, 255, 255);
  }
}
</style>

<template>
  <div class="class-query table">
    <div class="handle-box">
      <el-date-picker v-model="classdate" size="mini" align="right" type="date" placeholder="选择日期">
      </el-date-picker>
      <el-select v-model="timeSlotId" clearable size="mini" placeholder="选择时间段" style="width: 10%;display: inline-block">
        <el-option v-for="item in timeslotsList" :key="item.time_slot_id" :label="item.time_slot_name" :value="item.time_slot_id">
        </el-option>
      </el-select>
      <el-cascader clearable size="mini" expand-trigger="click" :options="location" v-model="selectedLocation" placeholder="选择学校" change-on-select @change="handleLocationChange">
      </el-cascader>
      <el-select clearable v-model="grade" size="mini" placeholder="年级不限">
        <el-option v-for="item in $store.state.GradeOptions" :key="item.code" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select clearable v-model="subject" size="mini" placeholder="科目不限">
        <el-option v-for="item in $store.state.SubjectOptions" :key="item.code" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <div class="search-warp">
        <el-input size="mini" v-model="select_word" clearable placeholder="请输入搜索内容" class="search-input">
          <el-select style="width: 100px;" v-model="selectTeacherOrClass" slot="prepend" placeholder="请选择">
            <el-option label="老师姓名" value="teacher"></el-option>
            <el-option label="班级" value="class"></el-option>
          </el-select>
          <el-button class="search-btn" slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </div>
      <el-button type="primary" size="mini" style="float:right;margin-right:20px;" @click="signRecord">签到记录</el-button>
    </div>
    <!--点击多选框搜索-->
    <div class="check-box">
      <el-checkbox v-model="morningOnly">上午</el-checkbox>
      <el-checkbox v-model="afternoonOnly">下午</el-checkbox>
      <el-checkbox v-model="nightOnly">晚上</el-checkbox>
    </div>
    <el-table size="mini" :data="data" stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange" v-loading="loading">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="campus_name" label="校区"></el-table-column>
      <el-table-column label="班级名称" width="300">
        <template slot-scope="scope">
          <div style="cursor: pointer;color: #3692e8;" @click="goClassInfo(scope.row)">{{scope.row.class_name}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="class_sequence" label="节次"></el-table-column>
      <el-table-column prop="attend_time" label="上课时间"></el-table-column>
      <el-table-column prop="classroom_name" label="教室"></el-table-column>
      <el-table-column prop="teacher_name" label="老师"></el-table-column>
      <el-table-column prop="paper_number" label="签到数/总人数"></el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :total="count" :current-page="cur_page + 1" :page-size="cur_limit" :page-sizes="[10,20,30,50]">
      </el-pagination>
    </div>
    <!--考勤签到-->
    <transition name="el-fade-in-linear">
      <div v-show="checkLayer" class="bg-layer">
        <transition name="el-zoom-in-center">
          <div v-if="checkLayer" class="transition-box">
            <div class="title-warp">
              <div class="close-btn" @click="colsecheckLayer">
                <i class="el-icon-close"></i>
              </div>
              <h3 class="modify-title">考勤签到</h3>
            </div>
            <div class="signBox">
              <div class="class-info-warp">
                <div class="class-name-info" style="background: #f2f2f2; padding: 10px;">{{changeForm2.class_name}}</div>
                <div class="class-info">{{changeForm2.classdate}}</div>
                <div class="class-info">{{changeForm2.attend_time }}</div>
                <div class="class-info">{{changeForm2.teacher_name}}</div>
                <div class="class-info">{{changeForm2.classroom_name}}</div>
              </div>
              <div class="signStudent">
                <div class="registration-system">
                  <div class="registration-title">
                    <el-row class="registration-list-warp">
                      <el-col :span="10" class="del-lesson">
                        <div class="grid-content">学生签到</div>
                      </el-col>
                      <el-col :span="12">
                        <div class="grid-content">补签登记 </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <div v-show="!attendList.length" style="padding: 10px 0; color: #ccc;">暂无学生信息</div>
                <div class="registration-list" v-for="(item,index) in attendList" :type="item.roll_call_status" :mend="item.is_mend_register" :ref="'listRow' + index" :key="item.id">
                  <el-row class="lesson-list-warp">
                    <el-col :span="2" class="check-style">
                      <el-badge :value="item.student_attend_class_type | filterStatus" class="item">
                        <el-popover placement="top-start" width="150" trigger="click">
                          <div>
                            <p>常用电话:{{item.student_mobile}}</p>
                            <p>父亲电话:{{item.father_mobile}}</p>
                            <p>母亲电话:{{item.mother_mobile}}</p>
                          </div>
                          <el-button slot="reference" type="text" :class="{chargeCampus:item.change_campus}">{{item.student_name}}</el-button>
                        </el-popover>
                      </el-badge>
                    </el-col>
                    <!--@click="signIfo(item)"-->
                    <el-col :span="2">
                      <div class="grid-content">
                        <el-button size="mini" value="01702" :ref="'sign_0_'+index" @click="signInfo(item, index,  '01702')" :type="item.roll_call_status === '01702' ? 'primary' : 'info'">签到</el-button>
                      </div>
                    </el-col>
                    <!--@click="signIfoRep(item)"-->
                    <el-col :span="2">
                      <div class="grid-content">
                        <el-button size="mini" value="01703" :ref="'sign_1_'+index" @click="signInfo(item, index, '01703')" :type="item.roll_call_status === '01703' ? 'primary' : 'info'">迟到</el-button>
                      </div>
                    </el-col>
                    <el-col :span="2">
                      <div class="grid-content">
                        <el-button size="mini" value="01704" :ref="'sign_4_'+index" @click="signInfo(item, index, '01704')" :type="item.roll_call_status === '01704' ? 'primary' : 'info'">请假</el-button>
                      </div>
                    </el-col>
                    <el-col :span="2">
                      <div class="grid-content">
                        <el-button size="mini" value="01701" :ref="'sign_2_'+index" @click="signInfo(item, index, '01701')" :type="item.roll_call_status === '01701' ? 'primary' : 'info'">旷课</el-button>
                      </div>
                    </el-col>
                    <el-col :span="2">
                      <div class="grid-content">
                        <el-button size="mini" :ref="'sign_3_'+index" @click="signInfo(item, index, null, true)" :type="item.is_mend_register ? 'primary' : 'info'">补签</el-button>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content">
                        <el-date-picker v-model="mendegisterime[index]" size="mini" type="date" placeholder="选择日期时间" @change="terimechange" style="width: 93%">
                        </el-date-picker>
                      </div>
                    </el-col>
                    <el-col :span="checkSigninFlag ? 8 : 6">
                      <div class="grid-content">
                        <el-input style="width: 94%;" size="mini" v-model="mendRegisterRemark[index]" placeholder="请填写补签原因"></el-input>
                      </div>
                    </el-col>
                    <el-col v-show="!checkSigninFlag" :span="2">
                      <div class="grid-content">
                        <el-button size="mini" type="danger" @click="saveInfo(item.id, index)">修改</el-button>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="signAll" v-if="attendList.length">
                <span>
                  <!-- v-if="checkSigninFlag" -->
                  <el-button type="primary" v-if="checkSigninFlag" size="mini" @click="signAllInfo(attendList)" style="width: 100px">全部签到</el-button>
                  <el-button type="primary" size="mini" @click="saveInfo" style="width: 100px">保存</el-button>
                </span>
                <el-button type="primary" size="mini" @click="exportSign" style="width: 100px;float: right" v-if="$store.state.code.includes('010801')">导出</el-button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
    <!-- 签到记录 -->
    <Dialog ref="dialog" title="签到记录" titbg>
      <Sign-record></Sign-record>
    </Dialog>
  </div>
</template>

<script>
import Dialog from "./../common/Dialog";
import SignRecord from "./SignRecord.vue";
export default {
  components: {
    Dialog,
    SignRecord
  },
  data() {
    return {
      cur_page: 0, //页码
      cur_limit: 10, //每次请求的数据数
      count: 0, //数据总量
      organId: null, // 机构id
      //搜索条件
      classdate: this.Util.TimeCycle(new Date().getTime(), "ymd"), //上课日期
      morningOnly: false, //只查上午
      afternoonOnly: false, //只查中午
      nightOnly: false, //只查晚上
      timeSlotId: "", //上课时间段
      selectTeacherOrClass: "teacher",
      //变量
      organ_id2: [], //新增组件内的学校id,
      dataList: [], //请求的list
      attendList: [], //所有成员list
      timeslotsList: [], //请求某天的list
      roleIds: [],
      location: [], //校区导航
      selectedLocation: [], //选择校区
      multipleSelection: [], //选中行的集合
      subject: "",
      grade: "",
      index: "",
      loading: false, //加载
      //签到弹出
      checkLayer: false, //签到弹出状态
      //签到
      mendegisterime: [], //补签时间
      mendRegisterRemark: [], //补签原因
      //接收当前行的信息
      changeForm2: {},
      sign: [], //签到集合
      retroactive: [], //补签
      //签到记录搜索条件
      recordPage: 0,
      recordLimit: 10,
      recordCount: 0,
      recordSign: [],
      particular_year: "",
      season: "",
      periods: "",
      grade: "",
      subject: "",
      projectType: "",
      classType: "",
      selectedLocation: [],
      department: "",
      select_word: "",
      selectTeacherOrClass: "",
      dateRage: "",
      classInfo: {},
      //快捷日期
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
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
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          },
          {
            text: "上一周",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },
  //实例创建完成后被立即调用
  created() {
    this.selectTeacherOrClass = "teacher";
    this.Util.queryAreaNav(this, undefined, () => this.getData());
    this.location = this.$store.state.location;
    this.organId = this.$store.state.organId;
    this.attendClassDate();
  },
  filters: {
    filterStatus(val) {
      const status = [
        { "01801": "正常上课" },
        { "01802": "请假" },
        { "01803": "转班转出" },
        { "01804": "转班转入" },
        { "01805": "调课调出" },
        { "01806": "调课调入" },
        { "01807": "试听" },
        { "01808": "退款" },
        { "01809": "取消调课" },
        { "01811": "未购买" }
      ];
      return val && status.find(item => Object.keys(item)[0] === val)[val];
    }
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
        d.attend_time =
          self.Util.TimeCycle(d.start_datetime, "hm") +
          "-" +
          self.Util.TimeCycle(d.end_datetime, "hm");
        d.paper_number = d.actual_student_number + "/" + d.pre_student_number;
        return d;
      });
    },
    checkSigninFlag() {
      return this.attendList.every(item => item.roll_call_status === null);
    }
  },
  watch: {
    selectedLocation: function() {
      if (
        this.selectedLocation.includes(
          JSON.parse(window.sessionStorage.getItem("staff")).staffOrganId
        )
      ) {
        this.campusId = this.selectedLocation[this.selectedLocation.length - 1];
      } else if (this.selectedLocation.length === 0) {
        this.campusId = "";
      }
      this.cur_page = 0;
      this.attendClassDate();
    },
    select_word: function() {
      const self = this;
      self.teacherName = self.select_word;
    },
    //获取上课时段
    classdate: function() {
      const self = this;
      this.classdate = this.Util.TimeCycle(
        new Date(this.classdate).getTime(),
        "ymd"
      );
      this.cur_page = 0;
      this.getData();
      this.attendClassDate();
    },
    timeSlotId: function() {
      this.cur_page = 0;
      this.getData();
    },
    morningOnly: function() {
      this.cur_page = 0;
      this.getData();
    },
    afternoonOnly: function() {
      this.cur_page = 0;
      this.getData();
    },
    nightOnly: function() {
      this.cur_page = 0;
      this.getData();
    },
    grade() {
      this.cur_page = 0;
      this.getData();
    },
    subject() {
      this.cur_page = 0;
      this.getData();
    },
    mendegisterime: function() {
      this.mendegisterime.filter(item => item).forEach((item, index) => {
        this.sign[index].mend_register_time = item;
      });
    },
    mendRegisterRemark: function(n) {
      this.mendRegisterRemark.filter(item => item).forEach((item, index) => {
        this.sign[index].mend_register_remark = item;
      });
    }
  },
  methods: {
    terimechange() {
      const self = this;
      this.mendegisterime = this.mendegisterime.map(d =>
        self.Util.TimeCycle(new Date(d).getTime(), "ymd")
      );
    },
    //获取数据
    getData() {
      const self = this;
      let objData = {
        page: this.cur_page, //页数
        limit: this.cur_limit, //条目数
        source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        campusId: this.campusId,
        grade: this.grade,
        subject: this.subject,
        classdate: this.classdate,
        timeSlotId: this.timeSlotId,
        morningOnly: this.morningOnly,
        afternoonOnly: this.afternoonOnly,
        nightOnly: this.nightOnly,
        teacherName:
          this.selectTeacherOrClass === "teacher" ? this.select_word : "",
        className: this.selectTeacherOrClass === "class" ? this.select_word : ""
      };
      this.loading = true;
      this.$axios
        .post(this.GlobalVal.httpLink.getAttendClass, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              self.count = res.data.count;
              self.dataList = res.data.classes;
            } else {
              console.error(res);
              self.$message({
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
    },
    //重新选择了地区事件
    handleLocationChange(value) {
      if (
        this.selectedLocation &&
        this.selectedLocation.length &&
        this.selectedLocation.length > 0
      ) {
        this.campusId = this.selectedLocation[this.selectedLocation.length - 1];
      }
      this.getData();
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
    goClassInfo(row) {
      const self = this;
      this.checkLayer = true;
      this.changeForm2 = row;
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId, //用户id
        source: this.GlobalVal.constants.source,
        attendClassId: row.id //班级上课表id
      };
      this.$axios
        .post(
          this.GlobalVal.httpLink.getClassCheckinInfo,
          JSON.stringify(objData)
        )
        .then(
          res => {
            if (res.data.code === "10000") {
              this.attendList = res.data.stuAttendClasses;
              this.classInfo = res.data.attendClass;
              this.attendList.forEach((item, index) => {
                if (item.is_mend_register && item.is_mend_register != null) {
                  this.mendegisterime[index] = item.mend_register_time;
                  this.mendRegisterRemark[index] = item.mend_register_remark;
                }
                if (item.roll_call_status) {
                  this.$nextTick(() => {
                    this.signInfo(
                      item,
                      index,
                      item.roll_call_status,
                      item.is_mend_register
                    );
                  });
                }
              });
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
    checkTime() {
      let classDate = new Date(
          this.changeForm2.classdate + " 00:00:00"
        ).getTime(),
        newDate = new Date().getTime();
      if (newDate < classDate) {
        this.$message.error("班级还未开课，不能进行此操作！");
        return false;
      } else {
        return true;
      }
    },
    signInfo(row, index, code, retroactive = false) {
      let date = new Date(new Date().getTime() - 3600 * 1000 * 24 * 10)
        .toLocaleString("zh")
        .split(" ");
      date[1] = "00:00:00";
      date = new Date(date.join(",")).getTime();
      if (this.$store.state.code.includes("010802")) {
        if (date > new Date(row.classdate + " 23:59:59").getTime()) {
          // this.$message.error("只能修改前10天的签到信息");
          // return;
        }
      } else {
        if (
          new Date().getTime() > new Date(row.classdate + " 23:59:59").getTime()
        ) {
          this.$message.error("不能修改往期课次签到信息");
          return;
        }
      }
      switch (code) {
        case "01702":
        case "01703":
        case "01701":
          if (!this.checkTime()) return;
          break;
      }
      [0, 1, 2, 3, 4].forEach(item => {
        let btn = this.$refs["sign_" + item + "_" + index][0].$el;
        if (code != null) {
          btn.classList.add("el-button--info");
          btn.classList.remove("el-button--primary");
        }
      });
      let n =
        code === "01702" ? 0 : code === "01703" ? 1 : code === "01704" ? 4 : 2;
      let btn = this.$refs["sign_" + n + "_" + index][0].$el;
      if (code === null) {
        let btn_2 = this.$refs["sign_2_" + index][0].$el,
          btn_3 = this.$refs["sign_3_" + index][0].$el,
          btn_4 = this.$refs["sign_4_" + index][0].$el;
        if (btn_2.classList.contains("el-button--primary")) {
          code = "01701";
        } else if (btn_4.classList.contains("el-button--primary")) {
          code = "01704";
        } else {
          this.$message.error("只有'请假'、'旷课'状态可以补签");
          return;
        }
        btn_3.classList.toggle("el-button--primary");
        btn_3.classList.toggle("el-button--info");
        if (!btn_3.classList.contains("el-button--primary")) {
          retroactive = false;
        }
      } else {
        btn.classList.remove("el-button--info");
        btn.classList.add("el-button--primary");
      }

      let line = this.$refs["listRow" + index][0],
        type = line.getAttribute("type"),
        mend = line.getAttribute("mend") || false;
      this.$refs["listRow" + index][0].classList[
        type
          ? code !== type || String(mend) !== String(retroactive)
            ? "add"
            : "remove"
          : "add"
      ]("actived");
      if (retroactive === true) {
        let btn = this.$refs["sign_3_" + index][0].$el;
        btn.classList.remove("el-button--info");
        btn.classList.add("el-button--primary");
      }
      let obj = {
        stuAttendClassId: row.id,
        student_name: row.student_name,
        roll_call_status: code,
        is_mend_register: retroactive || false,
        mend_register_time: this.mendegisterime[index] || "",
        mend_register_remark: this.mendRegisterRemark[index] || ""
      };
      if (this.sign.length === 0) {
        this.sign.push(obj);
      } else {
        if (
          this.sign.some(item => item.stuAttendClassId === obj.stuAttendClassId)
        ) {
          this.sign.filter((item, index) => {
            if (item.stuAttendClassId === obj.stuAttendClassId) {
              this.sign.splice(index, 1, obj);
              this.mendegisterime.filter(v => v).splice(index, 1, "");
              this.mendRegisterRemark.filter(v => v).splice(index, 1, "");
            }
          });
        } else {
          this.sign.push(obj);
        }
      }
    },
    colsecheckLayer() {
      this.checkLayer = false;
      this.sign = [];
      this.mendegisterime = [];
      this.mendRegisterRemark = [];
    },
    //全部签到
    signAllInfo(row) {
      const self = this;
      if (!this.checkTime()) return;
      if (row.length > 0) {
        this.$confirm("此操作将全部签到, 是否继续?", "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let allSign = [];
            for (let i = 0, length = row.length; i < length; i++) {
              allSign.push({
                stuAttendClassId: row[i].id,
                student_name: row[i].student_name,
                roll_call_status: "01702",
                is_mend_register: false,
                mend_register_time: "",
                mend_register_remark: ""
              });
            }
            this.sign = allSign;
            let loadingInstance = this.$Loading();
            let objData = {
              attendClassId: this.changeForm2.id,
              staffId: JSON.parse(window.sessionStorage.getItem("staff"))
                .staffId,
              source: this.GlobalVal.constants.source,
              stuCheckinList: allSign
            };
            this.sign.concat(allSign);
            self.multipleSelection = [];
            this.$axios
              .post(this.GlobalVal.httpLink.checkin, JSON.stringify(objData))
              .then(
                res => {
                  if (res.data.code === "10000") {
                    this.$message({
                      type: "success",
                      message: "签到成功!"
                    });
                    this.goClassInfo(this.classInfo);
                    loadingInstance.close();
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
                  loadingInstance.close();
                }
              );
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消全部签到"
            });
            loadingInstance.close();
          });
      } else {
        this.$message({
          type: "info",
          message: "没有选中任何项"
        });
      }
    },
    signIfoRep(row) {
      const self = this;
      let stuCheckinList = [];
      let obj = {
        stuAttendClassId: row.id,
        student_name: row.student_name,
        roll_call_status: "01704",
        is_mend_register: true,
        mend_register_time: self.Util.TimeCycle(
          new Date(this.mend_register_time).getTime(),
          "ymd"
        ),
        mend_register_remark: this.mend_register_remark
      };
      stuCheckinList.push(obj);
      let objData = {
        attendClassId: this.changeForm2.id,
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        source: this.GlobalVal.constants.source,
        stuCheckinList: stuCheckinList
      };
      this.$axios
        .post(this.GlobalVal.httpLink.checkin, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              self.$message({
                type: "success",
                message: "补签成功!"
              });
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
    saveInfo(id = null, index) {
      const self = this;
      let signInfo = [],
        signInfoArr = [];
      // let signInfoArr = signInfo.concat(this.sign, this.retroactive);
      this.sign.forEach((item, index) => {
        let row = this.$refs["listRow" + index][0],
          type = row.getAttribute("type") || "",
          mend = row.getAttribute("mend") || "";
        if (
          item.roll_call_status !== type &&
          String(mend) !== String(item.is_mend_register)
        ) {
          signInfoArr.push(item);
        }
      });
      if (!(id instanceof MouseEvent)) {
        signInfoArr = this.sign.filter(item => item.stuAttendClassId === id);
        let row = this.$refs["listRow" + index][0],
          type = row.getAttribute("type"),
          mend = row.getAttribute("mend") || false;
        if (!signInfoArr.length) {
          this.$message.warning("未做任何签到状态选择");
          return;
        } else if (
          signInfoArr[0].roll_call_status === type &&
          String(mend) === String(signInfoArr[0].is_mend_register)
        ) {
          this.$message.warning("未做变动，无法修改");
          return;
        }
      }
      if (!signInfoArr.length) {
        this.$message.warning("未做变动，无法保存");
        return;
      }
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        source: this.GlobalVal.constants.source,
        stuCheckinList: signInfoArr,
        attendClassId: this.changeForm2.id
      };
      let loadingInstance = this.$Loading();
      this.$axios
        .post(this.GlobalVal.httpLink.checkin, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              self.$message({
                type: "success",
                message: "签到成功!"
              });
              loadingInstance.close();
              this.sign = [];
              this.mendegisterime = [];
              this.mendRegisterRemark = [];
              this.checkLayer = false;
              this.getData();
            } else {
              console.error(res);
              self.$message({
                type: "error",
                message: res.data.errmsg
              });
              loadingInstance.close();
            }
          },
          res => {
            this.$message("请求失败");
            loadingInstance.close();
          }
        );
    },
    attendClassDate() {
      const self = this;
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        source: this.GlobalVal.constants.source,
        campusId: this.campusId,
        classdate: this.classdate
      };
      this.$axios
        .post(this.GlobalVal.httpLink.gettimeslot, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              this.timeslotsList = res.data.timeslots;
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
    exportSign() {
      if (!this.attendList) {
        this.$message.warning("未查询出数据，无法导出");
        return false;
      }
      let dataLink =
        this.GlobalVal.httpLink.exportClassCheckinInfo +
        "?" +
        "staffId=" +
        JSON.parse(window.sessionStorage.getItem("staff")).staffId +
        "&" +
        "attendClassId=" +
        this.changeForm2.id;
      window.open(dataLink);
    },
    signRecord() {
      this.$refs.dialog.dialogVisible = true;
    },
    search() {
      this.cur_page = 0;
      this.getData();
    }
  }
};
</script>
