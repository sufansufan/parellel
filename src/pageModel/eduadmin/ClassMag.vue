<template>
  <div class="table">
    <div class="handle-box">
      <div class="classMange-box">
        <div>
          <el-select clearable v-model="particular_year" size="mini" placeholder="年度">
            <el-option v-for="item in $store.state.YearOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select clearable v-model="season" size="mini" placeholder="季节">
            <el-option v-for="item in $store.state.SeasonOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select clearable v-model="periods" size="mini" placeholder="期别不限">
            <el-option v-for="item in $store.state.PeriodsOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select clearable v-model="grade" size="mini" placeholder="年级不限">
            <el-option v-for="item in $store.state.GradeOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select clearable v-model="subject" size="mini" placeholder="科目不限">
            <el-option v-for="item in $store.state.SubjectOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select clearable v-model="classType" size="mini" placeholder="班型不限">
            <el-option v-for="item in $store.state.ClassTypeOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-date-picker v-model="classDate" size="mini" type="date" placeholder="请输入课次日期">
          </el-date-picker>
        </div>
        <div>
          <el-cascader clearable size="mini" expand-trigger="click" :options="location" v-model="selectedLocation" placeholder="选择学校" change-on-select @change="handleLocationChange">
          </el-cascader>
        </div>
        <div>
          <el-select v-model="status" size="mini" placeholder="请选择班级状态">
            <el-option label="上架" :value="true"></el-option>
            <el-option label="下架" :value="false"></el-option>
          </el-select>
        </div>
        <div>
          <el-date-picker v-model="classDateStep" type="daterange" size="mini" range-separator="至" start-placeholder="班级开课起始日期" end-placeholder="班级开课结束日期" :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </div>
        <div>
           <el-input v-model="className" clearable border="none" size="mini" class="handle-input mr10" @keyup.enter.native="search" placeholder="输入要搜索的班级名称" style="width: 350px;" @blur="search"></el-input>
        </div>
        <div>
          <el-input placeholder="输入要搜索的教师" v-model="select_word" clearable class="input-with-select" size="mini" style="width:400px">
            <el-button slot="append" icon="el-icon-search" @keyup.enter.native="search" @click="search"></el-button>
          </el-input>
        </div>
        <div class="select-week">
          <el-checkbox v-model="searchWeek.mondayOnly" true-label="周一">周一</el-checkbox>
          <el-checkbox v-model="searchWeek.tuesdayOnly" true-label="周二">周二</el-checkbox>
          <el-checkbox v-model="searchWeek.wednesdayOnly" true-label="周三">周三</el-checkbox>
          <el-checkbox v-model="searchWeek.thursdayOnly" true-label="周四">周四</el-checkbox>
          <el-checkbox v-model="searchWeek.fridayOnly" true-label="周五">周五</el-checkbox>
          <el-checkbox v-model="searchWeek.saturdayOnly" true-label="周六">周六</el-checkbox>
          <el-checkbox v-model="searchWeek.sundayOnly" true-label="周日">周日</el-checkbox>
          <div class="vertical-moulding"></div>
          <el-checkbox v-model="dayWeek.morningOnly">上午</el-checkbox>
          <el-checkbox v-model="dayWeek.afternoonOnly">下午</el-checkbox>
          <el-checkbox v-model="dayWeek.nightOnly">晚上</el-checkbox>
        </div>
        <div class="select-button">
          <el-button type="primary" size="mini" icon="plus" class="handle-del mr10" @click="handleAdd">新增</el-button>
          <el-button type="primary" size="mini" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
          <el-button type="primary" size="mini" icon="delete" class="handle-del mr10" @click="setAll">批量设置</el-button>
          <!--上传文件-->
          <el-button type="primary" size="mini" class="handle-del mr10" @click="uploadOpean">上传文件</el-button>
          <el-button type="primary" size="mini" class="handle-del mr10" @click="exportClass" v-show="$store.state.code.includes('020701')">导出数据</el-button>
        </div>
      </div>
    </div>
    <el-table :data="dataList" stripe ref="multipleTable" @selection-change="handleSelectionChange" v-loading="loading">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="class_name" width="300" label="班级名称"></el-table-column>
      <el-table-column prop="campus_name" label="校区"></el-table-column>
      <el-table-column prop="subject" label="科目"></el-table-column>
      <el-table-column prop="teacher_name" label="教师"></el-table-column>
      <el-table-column prop="class_week_day" label="周期" width="100"></el-table-column>
      <el-table-column prop="start_date" label="上课日期" width="100"></el-table-column>
      <el-table-column prop="time_name" label="时间段" width="100"></el-table-column>
      <el-table-column prop="date_name" label="时间安排规律" width="120"></el-table-column>
      <el-table-column prop="classroom_name" label="教室"></el-table-column>
      <el-table-column prop="total_price" label="价格"></el-table-column>
      <el-table-column prop="total_times" label="课次"></el-table-column>
      <el-table-column label="招生情况">
        <template slot-scope="scope">
          <div>{{scope.row.signup_number + '/' + scope.row.max_students_no}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="staff_name" label="操作人" width="100"></el-table-column>
      <el-table-column label="操作" width="130px">
        <template slot-scope="scope">
          <el-dropdown size="mini" type="primary" trigger="click" @command="handleCommand">
            <el-button size="mini" class="more">
              更多菜单<i class="el-icon--right el-icon-arrow-down"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="{command:'breakEdit',row:scope.row}">强行编辑</el-dropdown-item>
              <el-dropdown-item :command="{command:'edit',row:scope.row}">编辑</el-dropdown-item>
              <el-dropdown-item :command="{command:'copy',row:scope.row}">复制</el-dropdown-item>
              <el-dropdown-item :command="{command:'delete',row:scope.row}">删除</el-dropdown-item>
              <el-dropdown-item :command="{command:'shelf',row:scope.row}">下架</el-dropdown-item>
              <el-dropdown-item :command="{command:'shelfUp',row:scope.row}">上架</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <!--   <h5 style="display: inline-block;margin-right: 10px;margin-top: 20px">转班条件</h5>
        <el-select v-model="turn_class_condition" placeholder="请选择" style="width: 10%;" size="small">
            <el-option
                    v-for="item in $store.state.TurnClassConditionOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
            <el-checkbox label="是"  v-model="charge_generation" >是否带收费</el-checkbox>
            <el-checkbox v-model="web_signup_enable" >APP显示</el-checkbox>
            <el-checkbox v-model="hot_recommend">热门班级</el-checkbox>
            <el-checkbox v-model="only_show_in_background">仅后台可见</el-checkbox>
            <el-checkbox v-model="attend_enable">允许旁听</el-checkbox>
            <el-checkbox v-model="require_entrytest">要入学测试</el-checkbox> -->
    <!--<el-button type="primary" size="mini" icon="search" @click="choosewitch">批量设置</el-button>-->
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :total="count" :current-page="cur_page + 1" :page-size="cur_limit" :page-sizes="[10,20,30,50]">
      </el-pagination>
    </div>
    <!--上传文件-->
    <transition name="el-fade-in-linear">
      <div v-show="addTeamLayer" class="bg-layer">
        <transition name="el-zoom-in-center">
          <div v-if="addTeamLayer" class="transition-box">
            <div class="title-warp">
              <div class="close-btn" @click="uploadClose"><i class="el-icon-close"></i></div>
              <h3 class="modify-title">导入班级</h3>
              <div class="upload-table">
                <div class="upload-wrap">
                  <el-upload class="upload-demo" ref="upload" :action="importFileUrl" :data="upLoadData" :onError="uploadError" :onSuccess="uploadSuccess" :on-remove="handleRemove" :beforeUpload="beforeAvatarUpload" :auto-upload="false" style="display: flex">
                    <el-button type="primary" size="mini" class="handle-del mr10">选择文件</el-button>
                  </el-upload>
                </div>
                <div class="upload-open">
                  <el-button type="primary" size="mini" class="handle-del mr10" @click="opeanBrowse">打开并预览</el-button>
                  <el-button type="primary" size="mini" class="handle-del mr10" disabled>模板下载</el-button>
                </div>
                <p class="upload-all"><b>导入总数: {{borwose_count}}</b>
                  <!--<b>正确总数: 0</b><b>错误总数: 0</b>-->
                </p>

                <el-table size="mini" :data="borwoseList" stripe style="width: 100%;" height="420" v-loading="loading">
                  <el-table-column prop="result" label="导入结果"></el-table-column>
                  <!-- <el-table-column prop="class_id" label="ID"></el-table-column>-->
                  <el-table-column prop="campus_name" label="校区"></el-table-column>
                  <el-table-column prop="particular_year" label="年份"></el-table-column>
                  <el-table-column prop="season" label="季节"></el-table-column>
                  <el-table-column prop="periods" label="期别"></el-table-column>
                  <el-table-column prop="subject" label="科目"></el-table-column>
                  <el-table-column prop="project_type" label="类别"></el-table-column>
                  <el-table-column prop="grade" label="年级"></el-table-column>
                  <el-table-column prop="class_type" label="班型"></el-table-column>
                  <el-table-column prop="class_name1" label="班级补充名称"></el-table-column>
                  <el-table-column prop="total_price" label="学费"></el-table-column>
                  <el-table-column prop="min_entry_score" label="分数线"></el-table-column>
                  <el-table-column prop="max_students_no" label="招生数"></el-table-column>
                  <el-table-column prop="excess_no" label="超额人数"></el-table-column>
                  <!--   <el-table-column prop="bigclass_standard" label="大班标准人数"></el-table-column> -->
                  <el-table-column prop="teacher_name" label="上课老师"></el-table-column>
                  <el-table-column prop="classroom_name" label="教室"></el-table-column>
                  <el-table-column prop="turn_class_condition" label="转班条件"></el-table-column>
                  <!-- <el-table-column prop="liberal_type" label="优惠选项"></el-table-column>-->
                  <el-table-column prop="charge_generation" label="是否代收费"></el-table-column>
                  <!--<el-table-column prop="status" label="其他选项"></el-table-column>-->
                  <el-table-column prop="time_name" label="上课时段"></el-table-column>
                  <el-table-column prop="date_name" label="课程安排规律"></el-table-column>
                </el-table>
                <div class="pagination">
                  <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" layout="total, sizes, prev, pager, next, jumper" :total="borwose_count" :page-size="borwose_limit" :page-sizes="[10,20,30,50]">
                  </el-pagination>
                </div>
                <div class="upload-button">
                  <el-button type="primary" size="mini" class="handle-del mr10" @click="uploadSubmit">确定</el-button>
                  <el-button type="primary" size="mini" class="handle-del mr10" @click="uploadClose">关闭</el-button>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
    <!-- 批量修改班级 -->
    <Dialog ref="dialog" titbg title="批量修改班级" :closed="dialogClosed">
      <div class="setup-class">
        <div>
          <div>
            <div class="el-row--flex mbg10" style="justify-content: space-between">
              <h3 style="line-height: 30px;">课程周期</h3>
              <el-button size="mini" type="primary" @click="savedCycle">保存</el-button>
            </div>
            <div class="mbg10">
              <p>期别</p>
              <p>
                <el-select v-model="editAllClass.period" size="mini" placeholder="请选择">
                  <el-option v-for="item in $store.state.PeriodsOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </p>
            </div>
            <div>
              <p>课程安排规律</p>
              <p>
                <el-select v-model="editAllClass.dateId" filterable size="mini" placeholder="请选择">
                  <el-option v-for="item in dateslots" :key="item.date_slot_id" :label="item.date_slot_name" :value="item.date_slot_id">
                  </el-option>
                </el-select>
              </p>
            </div>
          </div>
          <div>
            <div class="el-row--flex mbg10" style="justify-content: space-between">
              <h3 style="line-height: 30px;">课节安排</h3>
              <el-button size="mini" type="primary" @click="savedClassFestival">保存</el-button>
            </div>
            <div style="height: 470px; overflow-y: auto;">
              <template>
                <el-table :data="courseList" class="courseList" v-loading="courseListLoading" border style="width: 100%" @cell-click="rowName">
                  <el-table-column type="index" label="序号" width="40">
                  </el-table-column>
                  <el-table-column prop="classdate" label="周期">
                    <template slot-scope="scope">
                      <el-date-picker :clearable="false" style="max-width: 190px;" size="mini" v-model="scope.row.classdate" type="date" placeholder="选择日期" @change="arrangeClassdate(scope.row, $event)">
                      </el-date-picker>
                    </template>
                  </el-table-column>
                  <el-table-column prop="time" label="时间">
                    <template slot-scope="scope">
                      <el-select v-model="editAllClass.timeList[scope.$index]" size="mini" :placeholder="scope.row.start_time + '-' + scope.row.end_time" @change="() => timeChange(scope.$index)" @focus="selectFocus($event)">
                        <el-option v-for="item in timeslots" :key="item.time_slot_id" :label="item.time_slot_name" :value="item.time_slot_name">
                        </el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </div>
          </div>
        </div>
        <div style="min-width: 160px;">
          <div class="el-row--flex mbg10" style="justify-content: space-between">
            <h3 style="line-height: 30px;">其他选项</h3>
            <el-button size="mini" type="primary" @click="savedOtherOptions">保存</el-button>
          </div>
          <div>
            <p>转班条件</p>
            <p class="mbg10">
              <el-select v-model="turn_class_condition" size="mini" placeholder="请选择">
                <el-option v-for="item in $store.state.TurnClassConditionOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </p>
          </div>
          <div>
            <p class="mbg10">
              <el-checkbox v-model="charge_generation" label="是否代收费"></el-checkbox>
            </p>
            <p class="mbg10">
              <el-checkbox v-model="web_signup_enable" label="APP显示"></el-checkbox>
            </p>
            <p class="mbg10">
              <el-checkbox v-model="hot_recommend" label="热门班级"></el-checkbox>
            </p>
            <p class="mbg10">
              <el-checkbox v-model="only_show_in_background" label="仅后台可见"></el-checkbox>
            </p>
            <p class="mbg10">
              <el-checkbox v-model="attend_enable" label="允许旁听"></el-checkbox>
            </p>
            <p class="mbg10">
              <el-checkbox v-model="require_entrytest" label="要入学测试"></el-checkbox>
            </p>
          </div>
          <div>
            <p>限额</p>
            <el-input type="number" v-model="ruleForm.max_students_no" size="mini" placeholder="0" style="width: 195px;"></el-input>
          </div>
        </div>
      </div>
    </Dialog>
    <!-- 导入班级后消息预览 -->
    <Dialog ref="uploadClass" titbg title="导入消息查看" bodyWid="40%" bodyTop="200px">
      <div class="uploadClass">
        <el-table :data="errorMessage" stripe style="width: 100%" height="500">
          <el-table-column prop="name" label="文件名称" width="180"></el-table-column>
          <el-table-column prop="error" label="错误信息"></el-table-column>
        </el-table>
      </div>
    </Dialog>
  </div>
</template>

<script>
import Dialog from "../common/Dialog";
export default {
  name: "ClassM",
  components: {
    Dialog
  },
  data() {
    return {
      loading: false,
      cur_page: 0, //页码
      cur_limit: 10, //每次请求的数据数
      count: 0, //数据总量
      borwose_limit: 10, //浏览请求的数据
      borwose_count: 0, //请求的数据总量
      borwose_page: 0, //页码
      organId: null, // 机构id
      periods: "", //搜索期别
      particular_year: null, //int 年份
      projectType: "", //项目类型 [长期，短期，公益，考试]等
      courseType: "", //课程类型，[小学数学，小升初专题]等
      classType: "", //班型，[超常，培优]等
      subject: "", //科目，[数学，物理]等
      grade: "", //适用年级，[一年级，二年级]等
      season: "", // 期别：[暑假，秋季，寒假，春季]等
      department: "", //学部，小学，初中，高中
      className: "", //班级名称
      teacherName: "", //老师名字
      teacherMobile: "", //老师电话
      campus_name: "", //校区名称
      select_word: "", //搜索的值
      only_show_in_background: "", //仅后台可见
      charge_generation: false, //是否代收费
      charge_gen: "",
      require_entrytest: false, //是否入学测试
      attend_enable: false, //是否允许旁听
      turn_class_condition: "02401", //转班条件
      web_signup_enable: false, //App显示
      hot_recommend: false, //热门班级
      loading: true,
      classDate: "",
      role_name: "",
      status: "",
      courseList: [],
      classDateStep: [],
      courseListLoading: true, // table Loading
      classWeekDay: '',
      editAllClass: {
        period: "", // 期别
        dateId: "", // 课程安排规律
        timeList: [],
        classdate: ""
      },
      dateslots: [], // 课程安排规律
      timeslots: [], // 上课时间段
      organ_id2: [], //新增组件内的学校id,
      dataList: [], //请求的list
      roleIds: [],
      location: [], //校区导航
      selectedLocation: [], //选择校区
      multipleSelection: [], //选中行的集合
      addTeamLayer: false, //新增弹出框状态
      changeTeamLayer: false, //修改弹出框状态
      importFileUrl: "", //上传文件路径
      borwoseList: [], //预览文件
      errorMessage: "",
      arrangeList: [],
      upLoadData: {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        source: "PC"
      },
      searchWeek: {
        mondayOnly: "",
        tuesdayOnly: "",
        wednesdayOnly: "",
        thursdayOnly: "",
        fridayOnly: "",
        saturdayOnly: "",
        sundayOnly: "",
      },
      dayWeek: {
        morningOnly: '',
        afternoonOnly: '',
        nightOnly: '',
      },
      ruleForm: {
        //新增数据
        class_id: null, //Id,主键
        class_name: "", //班级名称
        school_id: null, //大区id   ----> 给 null
        school_name: "", //大区名称   ----> 给 null
        branch_school_id: null, //分校id   ----> 给 null
        branch_school_name: "", //分校名字   ----> 给 null
        campus_id: null, //校区ID   ----> 给 null
        campus_name: "", //校区名字   ----> 给 null
        teacher_id: null, //教师id
        teacher_name: "", //教师名字
        time_name: "", //时间段名称
        time_id: null, //时间ID
        date_name: "", //日期
        date_id: null, //日期id
        total_times: null, //课程总次数
        left_times: null, //剩余次数
        total_fee: null, //课程总费用
        discount_fee: null, //优惠费用
        project_type: "", //项目类型：[长期，短期，公益，考试]等
        course_type: "", //课程类型，[小学数学，小升初专题]等
        class_type: "", //班型，[超常，培优]等
        subject: "", //科目，[数学，物理]等
        grade: "", //适用年级，[一年级，二年级]等
        season: "", // 期别：[暑假，秋季，寒假，春季]等
        min_entry_score: null, //最低入学成绩
        entry_rank: "", //报名级别
        max_students_no: 0, //最多人数
        excess_no: null, //超额   ----> 给 null
        signup_number: null, //报名人数   ----> 给 null
        payment_number: null, //缴费人数   ----> 给 null
        remain_number: null, //剩余名额,   ----> 给 null
        waiting_number: null, //候补人数   ----> 给 null
        classroom_id: null, //教室 id
        classroom_name: "", //教室名字
        particular_year: null, //年份，2003
        department: "", //学部
        periods: "", //期数,
        city_no: "", //城市编号   ----> 给 null
        city_name: "", //城市名称   ----> 给 null
        province_no: "", //省编号,   ----> 给 null
        province_name: "", //省名称,   ----> 给 null
        signup_starttime: null, //报名开始时间
        signup_endtime: null, //结束报名时间
        web_signup_starttime: null, //网络报名开始时间
        web_signup_endtime: null, //网络报名结束时间
        status: false, //状态，true:上线，false:下线
        created_at: null, //创建时间
        updated_at: null //更新时间   ----> 给 null
      },
      objData: {},
      //接收当前行的信息
      changeForm2: {},
      //表单校验规则
      rules: {
        class_name: [
          { required: true, message: "请输入班级名称", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.Util.querySysconst(this, "009", this.$store.state.PeriodsOptions); //查询期别
    this.Util.querySysconst(this, "002", this.$store.state.CourseTypeOptions);
    this.Util.querySysconst(
      this,
      "024",
      this.$store.state.TurnClassConditionOptions
    ); //转班条件
  },
  /*   beforeRouteEnter(to, from, next){
    this.getData();
  }, */
  //实例创建完成后被立即调用
  created() {
    const self = this;
    this.importFileUrl = this.GlobalVal.httpLink.importClassExclFile;
    this.Util.queryAreaNav(self, undefined, function() {
      self.getData();
    });
    this.Util.querySysconst(this, "021", this.$store.state.KnowChannleOptions); //查询了解渠道
    this.Util.querySysconst(this, "100", this.$store.state.SubjectOptions); //查询科目
    this.Util.querySysconst(this, "006", this.$store.state.SeasonOptions); //查询季节
    this.Util.querySysconst(this, "009", this.$store.state.PeriodsOptions); //查询期别
    this.Util.querySysconst(this, "101", this.$store.state.GradeOptions); //查询年级
    this.Util.querySysconst(this, "100", this.$store.state.ProjectTypeOptions); //查询科目
    this.Util.querySysconst(this, "002", this.$store.state.CourseTypeOptions); //查询类别/课型
    this.Util.querySysconst(this, "003", this.$store.state.ClassTypeOptions); //查询班型
    this.Util.querySysconst(this, "007", this.$store.state.DepartmentOptions); //查询学部
    this.Util.querySysconst(
      this,
      "024",
      this.$store.state.TurnClassConditionOptions
    ); //转班条件
    self.location = self.$store.state.location;
    // this.organId = self.$store.state.organId;
    //this.charge_generation = "是"
    this.timeRule("getCampusTimeSlot", "timeslots");
    this.timeRule("getCampusDateSlot", "dateslots");
  },
  watch: {
    status() {
      this.cur_page = 0;
      this.getData();
    },
    selectedLocation: function(o, n) {
      if (
        this.selectedLocation.includes(
          JSON.parse(window.sessionStorage.getItem("staff")).staffOrganId
        )
      ) {
        if (o[o.length - 1] !== n[n.length - 1]) {
          this.organId = o[o.length - 1];
          this.cur_page = 0;
          this.getData();
        }
      } else if (this.selectedLocation.length === 0) {
        this.organId = "";
        this.cur_page = 0;
        this.getData();
      }
    },
    organ_id2: function() {
      if (
        this.organ_id2 &&
        this.organ_id2.length &&
        this.organ_id2.length > 0
      ) {
        this.ruleForm.parent_organ_id = this.organ_id2[
          this.organ_id2.length - 1
        ];
      }
    },
    select_word: function() {
      const self = this;
      self.teacherName = self.select_word;
    },
    changeForm2: function() {
      //修改的参数赋值
      if (this.changeForm2.status) {
        this.ruleForm.status = "上架";
      } else {
        this.ruleForm.status = "禁用";
      }
      this.ruleForm.student_id = this.changeForm2.student_id; //此课班级的唯一id int,  --> 如果为新增,此值为空字符串
      this.ruleForm.student_name = this.changeForm2.student_name; //班级姓名
      this.ruleForm.student_no = this.changeForm2.student_no; //班级学号
      this.ruleForm.student_birthday = this.changeForm2.student_birthday; //班级生日
      this.ruleForm.student_grade = this.changeForm2.student_grade; //年级    [10010]
      this.ruleForm.student_mobile = this.changeForm2.student_mobile; //班级电话   ==>可能为空
      this.ruleForm.primary_school = this.changeForm2.primary_school; //小学名字
      this.ruleForm.middle_school = this.changeForm2.middle_school; //中学名字
      this.ruleForm.high_school = this.changeForm2.high_school; //高中名字
      this.ruleForm.enter_score = this.changeForm2.enter_score; //入学成绩，百分制
      this.ruleForm.matching_class = this.changeForm2.matching_class; //班型,(string)  ==> 数组转得字符串 ["10004,10005"]
      this.ruleForm.home_address = this.changeForm2.home_address; //家庭住址
      this.ruleForm.father_name = this.changeForm2.father_name; //父亲名字
      this.ruleForm.father_mobile = this.changeForm2.father_mobile; //父亲电话号码
      this.ruleForm.father_sms_enable = this.changeForm2.father_sms_enable; // 父亲是否接收短信 (true:接收,folse:不接收)
      this.ruleForm.mother_name = this.changeForm2.mother_name; //母亲名字
      this.ruleForm.mother_mobile = this.changeForm2.mother_mobile; //母亲电话号码
      this.ruleForm.mother_sms_enable = this.changeForm2.mother_sms_enable; //母亲是否接受短信   (true:接收,folse:不接收)
      this.ruleForm.created_at = this.changeForm2.created_at; //更新时间,时间戳
    },
    searchWeek: {
      handler() {
        this.cur_page = 0;
        this.classWeekDay = ''
        for(let i in this.searchWeek){
          if(this.searchWeek[i]){
            this.classWeekDay += this.searchWeek[i] + ','
          }
        }
        this.classWeekDay = this.classWeekDay.slice(0, -1)
        this.getData();
      },
      deep: true
    },
    dayWeek: {
      handler() {
        this.cur_page = 0;
        this.getData();
      },
      deep: true
    },
    particular_year: function() {
      this.cur_page = 0;
      this.getData();
    },
    season: function() {
      this.cur_page = 0;
      this.getData();
    },
    periods: function() {
      this.cur_page = 0;
      this.getData();
    },
    grade: function() {
      this.cur_page = 0;
      this.getData();
    },
    subject: function() {
      this.cur_page = 0;
      this.getData();
    },
    projectType: function() {
      this.cur_page = 0;
      this.getData();
    },
    classType: function() {
      this.cur_page = 0;
      this.getData();
    },
    classDate: function() {
      this.cur_page = 0;
      this.getData();
    },
    classDateStep(){
      this.cur_page = 0;
      this.getData();
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.path === "/editClass") {
        vm.getData();
      }
    });
  },
  methods: {
    // 关闭弹出框
    dialogClosed() {
      this.getData();
    },
    exportClass() {
      this.$exportExcel({
        dataList: this.dataList,
        objData: this.objData,
        httpUrl: "exportClassForBackstage",
        title: this.$route.meta.title
      });
    },
    // 课程周期保存操作
    savedCycle() {
      if (!this.editAllClass.period) {
        this.$message.warning("请选择期别");
        return;
      }
      this.modifyClassComInterFace("batchSetupClassPeriod", {
        period: this.editAllClass.period,
        dateSlotId: this.editAllClass.dateId
      });
    },
    // 保存课节安排
    savedClassFestival() {
      /* this.courseList.map(item => {
          item.classdate = this.Util.TimeCycle(
            new Date(item.classdate).getTime(),
            "ymd"
          );
          return item;
        }) */
      this.modifyClassComInterFace("batchSetupAttendClass", {
        attendClasses: this.arrangeList
      });
    },
    // 时间变更
    timeChange(index) {
      // let selectedTime = this.timeslots[this.editAllClass.timeList[index]];
      this.courseList[index].start_time = this.editAllClass.timeList[
        index
      ].split("-")[0];
      this.courseList[index].end_time = this.editAllClass.timeList[index].split(
        "-"
      )[1];
      if (this.arrangeList.length) {
        let isArrange = this.arrangeList.some(
          item => item.class_sequence === this.courseList[index].class_sequence
        );
        if (isArrange) {
          this.arrangeList.map(item => {
            if (item.class_sequence === this.courseList[index].class_sequence) {
              item.start_time = this.courseList[index].start_time;
              item.end_time = this.courseList[index].end_time;
            }
            return item;
          });
        } else {
          this.arrangeList.push({
            start_time: this.courseList[index].start_time,
            end_time: this.courseList[index].end_time,
            class_sequence: this.courseList[index].class_sequence
          });
        }
      } else {
        this.arrangeList.push({
          start_time: this.courseList[index].start_time,
          end_time: this.courseList[index].end_time,
          class_sequence: this.courseList[index].class_sequence
        });
      }
    },
    // 获取时间安排规律
    timeRule(url, obj) {
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        source: this.GlobalVal.constants.source
      };
      this.$axios
        .post(this.GlobalVal.httpLink[url], JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              this[obj] = res.data[obj];
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
    // 批量修改其他选项
    savedOtherOptions() {
      this.modifyClassComInterFace("batchSetupClass", {
        turnClassCondition: this.turn_class_condition,
        chargeGeneration: this.charge_gen,
        webSignupEnable: this.web_signup_enable,
        hotRecommend: this.hot_recommend,
        onlyShowInBackground: this.only_show_in_background,
        attendEnable: this.attend_enable,
        requireEntrytest: this.require_entrytest,
        maxStudentsNo: this.ruleForm.max_students_no
      });
    },
    // 修改班级公共接口
    modifyClassComInterFace(url, params = {}) {
      let idList = this.multipleSelection.map(item => ({ id: item.class_id }));
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        source: this.GlobalVal.constants.source,
        idList: idList
      };
      objData = Object.assign({}, objData, params);
      let loading = this.$Loading();
      this.$axios
        .post(this.GlobalVal.httpLink[url], JSON.stringify(objData))
        .then(
          res => {
            loading.close();
            if (res.data.code === "10000") {
              this.$message.success("修改成功");
              if (url === "batchSetupClassPeriod") {
                this.setAll("slot");
              }
            } else {
              this.$message({
                type: "error",
                message: res.data.errmsg
              });
            }
          },
          res => {
            loading.close();
            this.$message("请求失败");
          }
        );
    },
    //获取数据
    getData() {
      const self = this;
      this.loading = true;
      this.objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        page: this.cur_page, //页数
        limit: this.cur_limit, //条目数
        organId: this.organId, // 机构id
        particular_year: this.particular_year, //int 年份
        projectType: this.projectType, //项目类型 [长期，短期，公益，考试]等
        classType: this.classType, //班型，[超常，培优]等
        subject: this.subject, //科目，[数学，物理]等
        grade: this.grade, //适用年级，[一年级，二年级]等
        season: this.season, // 期别：[暑假，秋季，寒假，春季]等
        department: this.department, //学部，小学，初中，高中
        className: this.className, //班级名称
        teacherName: this.teacherName, //老师名字
        periods: this.periods, //期别
        turn_class_condition: this.turn_class_condition, //转班条件
        charge_generation: this.charge_generation, //是否代收费
        web_signup_enable: this.web_signup_enable, //App显示
        hot_recommend: this.hot_recommend, //热门班级
        only_show_in_background: this.only_show_in_background, //仅后台可见
        attend_enable: this.attend_enable, //允许旁听
        require_entrytest: this.require_entrytest, //要入学测试
        classDate: this.Util.TimeCycle(
          new Date(this.classDate).getTime(),
          "ymd"
        ),
        classDateStart: this.classDateStep && this.Util.TimeCycle(
          new Date(this.classDateStep[0]).getTime()) || '',
        classDateEnd: this.classDateStep && this.Util.TimeCycle(
          new Date(this.classDateStep[1]).getTime()) || '',
       /*  mondayOnly: this.searchWeek.mondayOnly ,
        wednesdayOnly: this.searchWeek.wednesdayOnly,
        tuesdayOnly: this.searchWeek.tuesdayOnly,
        thursdayOnly: this.searchWeek.thursdayOnly,
        fridayOnly: this.searchWeek.fridayOnly,
        saturdayOnly: this.searchWeek.saturdayOnly,
        sundayOnly: this.searchWeek.sundayOnly, */
        classWeekDay: this.classWeekDay,
        morningOnly: this.dayWeek.morningOnly,
        afternoonOnly: this.dayWeek.afternoonOnly,
        nightOnly: this.dayWeek.nightOnly,
        status: this.status
      };
      this.$axios
        .post(
          this.GlobalVal.httpLink.queryClassMag,
          JSON.stringify(this.objData)
        )
        .then(
          res => {
            if (res.data.code === "10000") {
              this.count = res.data.count;
              this.dataList = res.data.pxxClasses;
              this.dataList.map(d => {
                d.status = d.status ? "上架" : "下架";
                d.subject = this.Util.GetLabelForValue(
                  this.$store.state.SubjectOptions,
                  d.subject
                );
                d.department = this.Util.GetLabelForValue(
                  this.$store.state.DepartmentOptions,
                  d.department
                );
                d.start_date = this.Util.TimeCycle(d.start_date, "ymd");
                return d;
              });
            } else {
              self.$message({
                type: "error",
                message: res.data.errmsg
              });
            }
            this.loading = false;
          },
          res => {
            this.loading = false;
            this.$message("请求失败");
          }
        );
    },
    //重新选择了地区事件
    handleLocationChange(value) {},
    //重新筛选函数
    screening() {
      this.getData();
    },
    //复制
    copyclass(index, row) {
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        classId: row.class_id
      };
      this.$axios
        .post(this.GlobalVal.httpLink.copyClass, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              this.$message({
                type: "success",
                message: "复制成功!"
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
                id: row.class_id
              }
            ]
          };
          this.$axios
            .post(this.GlobalVal.httpLink.delClassMag, JSON.stringify(objData))
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
    //下架事件
    handleDown(index, row) {
      const self = this;
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        classId: row.class_id, //班级ID
        status: false //boolean, true:上架， false:下架
      };
      this.$axios
        .post(
          this.GlobalVal.httpLink.changeClassStatus,
          JSON.stringify(objData)
        )
        .then(
          res => {
            if (res.data.code === "10000") {
              this.$message({
                type: "success",
                message: "下架成功!"
              });
              self.getData();
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
    },
    //上架事件
    handleUp(index, row) {
      const self = this;
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        classId: row.class_id, //班级ID
        status: true //boolean, true:上架， false:下架
      };
      this.$axios
        .post(
          this.GlobalVal.httpLink.changeClassStatus,
          JSON.stringify(objData)
        )
        .then(
          res => {
            if (res.data.code === "10000") {
              this.$message({
                type: "success",
                message: "上架成功!"
              });
              self.getData();
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
    },
    choosewitch(index, row) {
      const self = this;
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        turnClassCondition: this.turn_class_condition || "",
        chargeGeneration: this.charge_gen || false,
        webSignupEnable: this.web_signup_enable || false,
        hotRecommend: this.hot_recommend || false,
        onlyShowInBackground: this.only_show_in_background || false,
        attendEnable: this.attend_enable || false,
        requireEntrytest: this.require_entrytest || false
      };
      this.$axios
        .post(this.GlobalVal.httpLink.batchSetupClass, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              this.$message({
                type: "success",
                message: "操作成功!"
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
    },
    //设置所有
    setAll(slot) {
      if (!this.multipleSelection.length) {
        this.$message.error("请批量选择");
        return;
      }
      if (this.multipleSelection.length > 0 || slot) {
        let dataIdList = this.multipleSelection.map(item => ({
          dataId: item.date_id,
          maxStudentsNo: item.max_students_no
        }));
        let isEqual = dataIdList.every(
          item => item.dataId === dataIdList[0].dataId
        );
        if (!isEqual) {
          this.$message.error("所选班级时间规律不一致，无法批量设置!");
          return;
        }
        this.editAllClass.dateId = dataIdList[0].dataId;
        this.ruleForm.max_students_no = dataIdList[0].maxStudentsNo;
        this.$refs.dialog.dialogVisible = true;
        this.editAllClass.timeList = [];
        this.arrangeList = [];
        let objData = {
          source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
          staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
          classId: this.multipleSelection[0].class_id
        };
        this.courseList = [];
        this.courseListLoading = true;
        this.$axios
          .post(
            this.GlobalVal.httpLink.queryAttendClass,
            JSON.stringify(objData)
          )
          .then(
            res => {
              this.courseListLoading = false;
              if (res.data.code === "10000") {
                this.courseList = res.data.attendClasses;
              } else {
                this.$message({
                  type: "error",
                  message: res.data.errmsg
                });
              }
            },
            res => {
              this.courseListLoading = false;
              this.$message({
                type: "error",
                message: "操作失败"
              });
            }
          );
      } else {
        this.$message({
          type: "info",
          message: "没有选中任何项"
        });
      }
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
            let delArr = [];
            for (
              let i = 0, length = self.multipleSelection.length;
              i < length;
              i++
            ) {
              delArr.push({
                id: self.multipleSelection[i].class_id
              });
            }

            let objData = {
              staffId: JSON.parse(window.sessionStorage.getItem("staff"))
                .staffId,
              delList: delArr
            };
            self.multipleSelection = [];
            this.$axios
              .post(
                this.GlobalVal.httpLink.delClassMag,
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
    handleCurrentChange1(val) {
      this.borwose_page = val - 1;
      this.opeanBrowse();
    },

    //每页显示数目发生变化
    handleSizeChange(val) {
      this.cur_limit = val;
      this.getData();
    },
    handleSizeChange1(val) {
      this.borwose_limit = val;
      this.opeanBrowse();
    },
    //搜索班级---刷新
    search() {
      this.getData();
    },
    //新增按钮事件
    handleAdd() {
      /* this.addTeamLayer = true;*/
      this.$router.push({
        path: "/editClass",
        query: {
          handle: "add"
        }
      });
    },

    //强行修改按钮事件
    handleEdit(index, row) {
      this.$store.commit("setChooseClassMge", row);
      this.$router.push({
        path: "/editClass",
        query: {
          handle: "edit",
          id: row.class_id
        }
      });
    },
    //修改按钮事件
    handleEdit2(index, row) {
      if (row.status == "上架") {
        this.$store.commit("setChooseClassMge", row);
        this.$router.push({
          path: "/editClass",
          query: {
            handle: "edit",
            id: row.class_id
          }
        });
      } else {
        this.$message("已下架");
      }
    },
    //新增/修改班级等级--重置--暂时不用
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //功能选择
    handleCommand(obj) {
      if (obj.command === "breakEdit") {
        //强行修改
        this.handleEdit(1, obj.row);
      } else if (obj.command === "edit") {
        //修改
        this.handleEdit2(1, obj.row);
      } else if (obj.command === "copy") {
        //复制
        this.copyclass(1, obj.row);
      } else if (obj.command === "delete") {
        //删除
        this.handleDelete(1, obj.row);
      } else if (obj.command === "shelf") {
        //下架
        this.handleDown(1, obj.row);
      } else if (obj.command === "shelfUp") {
        //上架
        this.handleUp(1, obj.row);
      } else {
        this.$message("不识别得指令");
      }
    },
    //文件上传
    uploadOpean() {
      this.addTeamLayer = true;
    },
    //文件移除
    handleRemove(file, fileList) {
      console.log(file, "958");
    },
    //上传的文件错误
    uploadError(res, file, fileList) {
      this.$message({
        type: "error",
        message: "上传失败！请重试"
      });
    },
    //文件上传成功
    uploadSuccess(res, file, fileList) {
      if (res.errmsg) {
        this.errorMessage = res.errmsg.split("<br>");
        this.errorMessage[0] = this.errorMessage[0].slice(5);
        this.errorMessage = this.errorMessage.map(item => {
          let obj = {
            name: item.split("：")[0],
            error: item.split("：")[1]
          };
          return obj;
        });
        this.$refs.uploadClass.dialogVisible = true;
      }
      if (res.code === "10000") {
        this.$Loading().close();
        if (!res.errmsg) {
          this.addTeamLayer = false;
        }
      }
    },
    // 上传前对文件的大小的判断
    beforeAvatarUpload(file) {
      const extension = file.name.split(".")[1] === "xls";
      const extension2 = file.name.split(".")[1] === "xlsx";
      const extension3 = file.name.split(".")[1] === "doc";
      const extension4 = file.name.split(".")[1] === "docx";
      const fileSize = file.size / 1024 / 1024 < 20;
      if (!extension && !extension2 && !extension3 && !extension4) {
        this.$message({
          type: "error",
          message: "上传模板只能是 xls、xlsx、doc、docx 格式!"
        });
      }
      if (!fileSize) {
        this.$message({
          type: "error",
          message: "上传模板大小不能超过 20MB!"
        });
      }
      return extension || extension2 || extension3 || (extension4 && fileSize);
    },
    //上传文件确认
    uploadSubmit() {
      if (this.$refs.upload.uploadFiles.length > 0) {
        this.$refs.upload.submit();
        this.$Loading();
        this.borwoseList = [];
        this.borwose_count = 0;
      } else {
        this.$message({
          type: "error",
          message: "请选择文件！"
        });
      }
    },
    //打开并预览
    opeanBrowse() {
      if (this.$refs.upload.uploadFiles.length > 0) {
        const self = this;
        let file = this.$refs.upload.$el.children[0].children[1].files[0];
        let fileUpload = new FormData();
        fileUpload.append("file", file);
        fileUpload.append(
          "staffId",
          JSON.parse(window.sessionStorage.getItem("staff")).staffId
        );
        fileUpload.append("source", this.GlobalVal.constants.source);
        fileUpload.append("limit", this.borwose_limit);
        fileUpload.append("page", this.borwose_page);
        let config = {
          headers: { "Content-Type": "multipart/form-data" }
        };
        this.loading = true;
        this.$axios
          .post(this.GlobalVal.httpLink.viewClassExclFile, fileUpload, config)
          .then(
            res => {
              if (res.data.code === "10000") {
                this.$message({
                  type: "success",
                  message: "预览成功!"
                });
                this.loading = false;
                this.borwose_count = res.data.data.count;
                this.borwoseList = res.data.data.classes;
                this.borwoseList = this.borwoseList.map(item => {
                  item.subject = self.Util.GetLabelForValue(
                    self.$store.state.SubjectOptions,
                    item.subject
                  );
                  item.season = self.Util.GetLabelForValue(
                    self.$store.state.SeasonOptions,
                    item.season
                  );
                  item.periods = self.Util.GetLabelForValue(
                    self.$store.state.PeriodsOptions,
                    item.periods
                  );
                  item.grade = self.Util.GetLabelForValue(
                    self.$store.state.GradeOptions,
                    item.grade
                  );
                  item.project_type = self.Util.GetLabelForValue(
                    self.$store.state.ProjectTypeOptions,
                    item.project_type
                  );
                  item.class_type = self.Util.GetLabelForValue(
                    self.$store.state.ClassTypeOptions,
                    item.class_type
                  );
                  item.liberal_type = self.Util.GetLabelForValue(
                    self.$store.state.LiberalTypeOptions,
                    item.liberal_type
                  );
                  item.turn_class_condition = self.Util.GetLabelForValue(
                    self.$store.state.TurnClassConditionOptions,
                    item.turn_class_condition
                  );
                  item.charge_generation =
                    item.charge_generation == false ? "否" : "是";
                  return item;
                });
              } else {
                this.$message({
                  type: "error",
                  message: res.data.errmsg
                });
              }
            },
            res => {
              console.error(res);
              this.loading = false;
              this.$message({
                type: "error",
                message: "操作失败"
              });
            }
          );
      } else {
        this.$message({
          type: "error",
          message: "请选择文件！"
        });
      }
    },
    //关闭上传文件
    uploadClose() {
      this.borwoseList = [];
      this.borwose_count = 0;
      this.addTeamLayer = false;
    },
    selectFocus(e) {
      if (
        !e.target.parentNode.parentNode.parentNode.parentNode.className.includes(
          "table-bg"
        )
      ) {
        e.target.classList.add("active");
        e.target.parentNode.parentNode.parentNode.parentNode.className +=
          "table-bg";
      }
    },
    rowName(row, column, cell, event) {
      if (!cell.className.includes("table-bg")) {
        cell.className += "table-bg";
        cell.childNodes[0].childNodes[0].childNodes[1].classList.add("active");
      }
    },
    arrangeClassdate(row, e) {
      if (this.arrangeList.length) {
        let isArrange = this.arrangeList.some(
          item => item.class_sequence === row.class_sequence
        );
        if (isArrange) {
          this.arrangeList.map(item => {
            if (item.class_sequence === row.class_sequence) {
              item.classdate = this.Util.TimeCycle(
                new Date(e).getTime(),
                "ymd"
              );
            }
            return item;
          });
        } else {
          this.arrangeList.push({
            classdate: this.Util.TimeCycle(new Date(e).getTime(), "ymd"),
            class_sequence: row.class_sequence
          });
        }
      } else {
        this.arrangeList.push({
          classdate: this.Util.TimeCycle(new Date(e).getTime(), "ymd"),
          class_sequence: row.class_sequence
        });
      }
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
}
.transition-box {
  position: absolute;
  width: 1000px;
  height: 700px;
  margin: auto;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  border-radius: 4px;
  background-color: #ffffff;
  /*overflow-y: scroll;*/
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
  width: 1000px;
  height: 50px;
  top: 0px;
  right: 0;
  z-index: 10;
  background: #ffffff;
  -webkit-box-shadow: 0px 0px 3px #ccc;
  -moz-box-shadow: 0px 0px 3px #ccc;
  box-shadow: 0px 0px 3px #ccc;
}
.fotter-warp {
  position: absolute;
  width: 1000px;
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
.search-warp {
  display: inline-block;
  /*float: right;*/
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
.more {
  color: #3692e8;
  border: none;
  background: none;
}
/*搜索*/
.search-icon {
  position: absolute;
  top: 4px;
  right: 0;
  display: block;
  margin-left: 3px;
  float: right;
  width: 40px;
  height: 26px;
  border-left: 1px solid #d2d2d2;
}
.search-warp {
  position: relative;
  display: block;
  float: right;
  /*border: 1px solid #d2d2d2;*/
  background: #fff;
  height: 36px;
  box-sizing: border-box;
  margin-left: 3px;
}
.search-icon > i {
  font-size: 20px;
  width: 30px;
  padding-left: 6px;
  display: block;
  float: right;
  margin-top: 2px;
}
.search-warp > input {
  height: 20px;
  width: 230px;
  border: none;
  outline: none;
  padding-left: 15px;
  margin-top: 2px;
}
.search-warp > input::placeholder {
  color: #d2d2d2;
  font-size: 16px;
}
/*上传文件*/
.upload-wrap {
  display: block;
  float: left;
  margin-right: 10px;
}
.upload-open {
  display: inline-block;
}
.upload-table {
  width: auto;
  height: 605px;
  padding: 20px;
  overflow-y: auto;
}
.upload-button {
  float: right;
}
.upload-button button {
  width: 100px;
}
.upload-all {
  margin-top: 20px;
  font-size: 14px;
  color: #6d4f4f;
  text-align: left;
}
.upload-all b {
  margin-right: 40px;
}
.setup-class {
  display: flex;
  flex-wrap: wrap;
}
.setup-class > div {
  flex: 1;
}
.setup-class > div:first-child {
  flex: 2;
  margin-right: 20px;
}
.setup-class > div:first-child > div {
  margin-bottom: 20px;
}
.setup-class > div:first-child > div:last-child {
  margin: 0;
  height: 500px;
}
.setup-class > div:last-child,
.setup-class > div:first-child > div {
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 6px;
}
.classMange-box {
  display: flex;
  flex-wrap: wrap;
}
.classMange-box > div{
  margin-right: 10px;
  margin-bottom: 10px;
}
.uploadClass {
  max-height: 500px;
  margin-right: -20px;
}
.select-button{
  display: flex;
  justify-content: flex-end;
  flex:1;
}
.select-button >button{
  margin-right: 10px;
}
.select-week {
  display: flex;
  margin-top: 10px;
}
.select-week .vertical-moulding {
  display: inline-block;
  width: 1px;
  height: 12px;
  background: #cccccc;
  position: relative;
  top: 1px;
  left: 12px;
}
.select-week .vertical-moulding + .el-checkbox {
  margin-left: 25px;
}
</style>
<style>
.el-table.courseList .el-table__body th,
.el-table.courseList .el-table__body td {
  padding: 2px 0 !important;
}
.el-table.courseList .has-gutter {
  display: none;
}
.el-table.courseList td,
.el-table.courseList th.is-leaf {
  border: 1px solid #ebeef5;
}
.classMange-box .el-input {
  width: 200px;
}
.courseList .table-bg {
  background: #fdf0f0 !important;
}
.courseList .el-select .el-input__inner {
  color: #f56c6c;
}
.courseList .el-input__inner.active {
  color: #f56c6c;
}
.courseList .el-input__inner::-webkit-input-placeholder {
  color: #606266;
}
.courseList .el-input__inner.active::-webkit-input-placeholder {
  color: #f56c6c !important;
}
</style>
