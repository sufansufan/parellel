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
.transition-box {
  position: absolute;
  width: 600px;
  height: 440px;
  margin: auto;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  border-radius: 4px;
  background-color: #ffffff;
  overflow-y: auto;
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
.search-warp {
  float: right;
}

.handle-input {
  width: 200px;
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
.studetn-info {
  margin-bottom: 10px;
  background: #ffffff;
  min-height: 100px;
  overflow: hidden;
  position: relative;
  transition: max-height 0.4s;
}
.studetn-info > .base {
  font-size: 12px;
  border-left: 3px solid #409eff;
  padding-left: 5px;
  font-weight: bold;
  margin-top: 5px;
}
/* .studetn-info > .msg-toggle::after {
  content: "更多信息↓";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20px;
  text-align: center;
  color: #409eff;
  cursor: pointer;
  background: linear-gradient(transparent, #fff);
  font-size: 12px;
  font-style: initial;
}
.studetn-info.actived {
  max-height: 1000px;
  transition: max-height 0.8s;
}
.studetn-info.actived > .msg-toggle::after {
  content: "收起↑";
} */
.el-row {
  margin-bottom: 15px;
}
.el-col-3 {
  color: #000;
}
.el-col-5 {
  color: #354445;
}
.handle-box {
  margin-bottom: 20px;
}
.manu-level {
  padding-left: 0px;
}
.tagMessage {
  width: 100%;
}
.student-mark-subject {
  color: #000;
}
.studetn-info .info-list {
  display: flex;
  flex-wrap: wrap;
}
.studetn-info > .info-box {
  padding: 5px 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.studetn-info .info-list > .student-name {
  font-size: 30px;
}
.studetn-info .info-list > .student-grade {
  margin-left: 20px;
  font-size: 14px;
  display: flex;
  align-items: flex-end;
}
.studetn-info .info-list > .student-grade > p {
  margin-right: 10px;
}
.studetn-info .info-list > .student-grade > div {
  display: flex;
}
.studetn-info .info-list > .student-grade > div > p > span {
  margin-left: 10px;
}
.studetn-info .info-details {
  display: flex;
  flex-wrap: wrap;
  color: #6a6363;
  font-size: 14px;
  margin-top: 5px;
}
.studetn-info .info-details > p {
  margin: 0px 5px;
}
/* .studetn-info > .info-list > div {
  display: flex;
  flex: calc(33.33% - 20px);
  margin: 10px;
  font-size: 14px;
}
.studetn-info > .info-list > div > span {
  line-height: 16px;
  background: #efefef;
  color: #7a7a7a;
  display: inline-flex;
  padding: 7px 15px;
  min-width: 60px;
  justify-content: flex-end;
  align-items: center;
}
.studetn-info > .info-list p {
  box-sizing: border-box;
  display: inline-flex;
  border: 1px solid #efefef;
  line-height: 16px;
  padding: 6px 15px 1px;
  min-width: 150px;
  flex-wrap: wrap;
}
.studetn-info > .info-list p b {
  box-sizing: border-box;
  padding: 5px 10px;
  margin-right: 5px;
  margin-bottom: 5px;
  background: #f7f7f7;
  font-size: 14px;
  align-content: center;
  color: #3692e8;
}
.studetn-info > .info-list p b > span {
  color: #616161;
  padding-right: 5px;
} */
.coupons-list > b {
  height: 22px;
  line-height: 22px;
  background: #1296db !important;
  color: #fff !important;
  border-radius: 3px;
  border: 0 !important;
  position: relative;
  padding: 0 10px !important;
}
.coupons-list > b::after,
.coupons-list > b::before {
  content: "";
  position: absolute;
  left: -3px;
  top: 50%;
  transform: translateY(-50%);
  background: #fff;
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
.coupons-list > b::before {
  left: auto;
  right: -3px;
}
.el-menu--horizontal > .el-menu-item.is-active {
  font-weight: 700;
}
</style>
<style>
.manu-level .el-menu--horizontal > .el-menu-item {
  height: 40px;
  line-height: 40px;
}
</style>

<template>
  <div class="table">
    <div class="handle-box">
      <el-button @click="goback" icon="el-icon-arrow-left" type="primary" size="mini">返回</el-button>
    </div>
    <div class="studetn-info" ref="infoBox">
      <!-- <i class="msg-toggle" @click="$refs.infoBox.classList.toggle('actived')"></i> -->
      <div class="base">基本信息</div>
      <div class="info-box">
        <div>
          <div class="info-list">
            <div class="student-name">
              {{studentInfo.student_name}}
            </div>
            <div class="student-grade">
              <p>{{studentInfo.student_grade}}</p>
              <p>{{studentInfo.student_mobile}}</p>
              <div>
                <p>
                  <span v-for="(item, index) in entryScoreList" :key="index">
                    <span>{{item.subject}} -</span>{{item.entry_score}}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="info-details">
            <p>{{studentInfo.sex | sexShow}}</p> <span>|</span>
            <p>{{birthday}}</p> <span>|</span>
            <p>{{studentInfo.student_no}}</p> <span>|</span>
            <p>{{studentInfo.studentGreadComputed}}</p> <span>|</span>
            <p>{{studentInfo.campus_name}}</p> <span>|</span>
            <p><span>父-</span>{{studentInfo.father_mobile}}</p>
            <p><span>母-</span>{{studentInfo.mother_mobile}}</p>
          </div>
        </div>
        <div>
          <el-button type="primary" size="mini" @click="editStudentInfo">编辑</el-button>
        </div>
      </div>
      <!-- <div class="info-list">
         <div>
          <span>姓名:</span>
          <p>{{studentInfo.student_name}}</p>
        </div>
        <div>
          <span>性别:</span>
          <p>{{studentInfo.sex | sexShow}}</p>
        </div>
        <div>
          <span>年级:</span>
          <p>{{studentInfo.student_grade}}</p>
        </div>
        <div>
          <span>所属校区:</span>
          <p>{{studentInfo.campus_name}}</p>
        </div>
        <div>
          <span>学部:</span>
          <p>{{department}}</p>
        </div>
        <div>
          <span>出生日期:</span>
          <p>{{birthday}}</p>
        </div>
        <div>
          <span>就读学校:</span>
          <p>{{studentInfo.studentGreadComputed}}</p>
        </div>
        <div>
          <span>了解渠道:</span>
          <p>{{known_channle}}</p>
        </div>
        <div>
          <span>常用电话(APP账号):</span>
          <p>{{studentInfo.student_mobile}}</p>
        </div>
        <div>
          <span>父亲电话:</span>
          <p>{{studentInfo.father_mobile}}</p>
        </div>
        <div>
          <span>母亲电话:</span>
          <p>{{studentInfo.mother_mobile}}</p>
        </div>
        <div>
          <span>科目入学成绩:</span>
          <p>
            <b v-for="(item, index) in entryScoreList" :key="index">
              <span>{{item.subject}} -</span>{{item.entry_score}}</b>
          </p>
        </div>
        <div>
          <span>学生优惠券:</span>
          <p class="coupons-list">
            <b v-for="(item, index) in couponList" :key="index">¥ {{item.coupon_amount}}</b>
          </p>
        </div>
      </div> -->
      <!--  <div style="text-align: center; margin: 20px 0;">
        <el-button style="width: 195px;height: 36px;" type="primary" size="mini" @click="editStudentInfo">编辑</el-button>
      </div> -->
    </div>
    <!--修改学生信息弹出框-->
    <el-dialog title="修改学生入学成绩" :visible.sync="editStudentInfoKey">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="学生姓名" prop="studentName">
              <el-input v-model="ruleForm.studentName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学生电话" prop="studentMobile">
              <el-input v-model="ruleForm.studentMobile"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="学生年级" prop="studentGrade">
              <el-select v-model="ruleForm.studentGrade" size="mini" placeholder="请选择" style="width: 100%;">
                <el-option v-for="(item, index) in $store.state.GradeOptions" :key="index" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学生性别" prop="sex">
              <el-select v-model="ruleForm.sex" size="mini" placeholder="请选择" style="width: 100%;">
                <el-option label="男" :value="true"></el-option>
                <el-option label="女" :value="false"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="就读学校" prop="school_name" style="font-size: 16px;">
              <el-row :gutter="24">
                <el-col :span="4">
                  <el-select v-model="province" clearable  size="mini" placeholder="选择省" >
                    <el-option v-for="item in $store.state.ProvinceOptions" :key="item.province_no" :label="item.province_name" :value="item.province_no">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="4">
                  <el-select v-model="city" clearable  size="mini" placeholder="选择市">
                    <el-option v-for="item in $store.state.CityOptions" :key="item.city_no" :label="item.city_name" :value="item.city_no">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="4">
                  <el-select v-model="county" clearable  size="mini" placeholder="选择县/区"  @change="districtsChange('ruleForm')">
                    <el-option v-for="item in $store.state.CountyOptions" :key="item.district_no" :label="item.district_name" :value="item.district_no">
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
                  <el-input placeholder="输入其他学校" size="mini" v-model="school" clearable ></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row :gutter="20">
        <div class="tagMessage" style="margin-bottom: 10px;">
          <el-tag style="margin-left: 10px;" v-for="tag in subjectResultTags" :key="tag.name" size="small" @close="handleCloseTag(tag)" closable :type="tag.type">
            <span class="student-mark-subject">{{tag.subject}} - </span>
            <b class="student-mark-mark">{{tag.mark}}</b>
          </el-tag>
        </div>

        <el-col :span="4">科目</el-col>
        <el-col :span="8">
          <el-select v-model="subject" multiple collapse-tags size="mini" placeholder="请选择科目">
            <el-option v-for="item in $store.state.SubjectOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">学生新成绩</el-col>
        <el-col :span="4">
          <el-input size="mini" v-model="enter_score" placeholder="请输入成绩"></el-input>
        </el-col>
        <el-button size="mini" @click="studentMark" type="primary">添加</el-button>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button @click="editStudentInfoKey = false">取 消</el-button>
        <el-button type="primary" @click="editStudentSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <div class="manu-level">
      <el-menu :default-active="menuDefaultActive" class="el-menu-demo" mode="horizontal" background-color="#ffffff" router>
        <el-menu-item :index="'/studentInfo/classQuery?sid=' + $route.query.sid">班级查询</el-menu-item>
        <el-menu-item :index="'/studentInfo/attendClass?sid=' + $route.query.sid">在读班级</el-menu-item>
        <el-menu-item :index="'/studentInfo/notPayClass?sid=' + $route.query.sid">未缴费班级</el-menu-item>
        <el-menu-item :index="'/studentInfo/payFinish?sid=' + $route.query.sid">支付完成</el-menu-item>
        <!-- <el-menu-item :index="'/studentInfo/collectionClass?sid=' + $route.query.sid">收藏班级</el-menu-item> -->
        <el-menu-item :index="'/studentInfo/refundInfo?sid=' + $route.query.sid">退费记录</el-menu-item>
        <el-menu-item :index="'/studentInfo/repairRecord?sid=' + $route.query.sid">候补记录</el-menu-item>
        <el-menu-item :index="'/studentInfo/classTransferRecord?sid=' + $route.query.sid">转班记录</el-menu-item>
        <el-menu-item :index="'/studentInfo/classRecord?sid=' + $route.query.sid">调课记录</el-menu-item>
        <el-menu-item :index="'/studentInfo/revokeRecord?sid=' + $route.query.sid">撤单记录</el-menu-item>
        <el-menu-item :index="'/studentInfo/finishedClass?sid=' + $route.query.sid">已结课记录</el-menu-item>
        <el-menu-item :index="'/studentInfo/otherCharges?sid=' + $route.query.sid">其他收费记录</el-menu-item>
        <el-menu-item :index="'/studentInfo/orderList?sid=' + $route.query.sid">订单</el-menu-item>
      </el-menu>
      <div class="content-warp">
        <transition name="move" mode="out-in">
          <keep-alive include="ClassQuery">
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>

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
      isShowTips: false,
      enterUrl: "",
      menuDefaultActive: "/studentInfo/classQuery?sid=" + this.$route.query.sid,
      cur_page: 0, //页码
      cur_limit: 10, //每次请求的数据数
      count: 0, //数据总量
      select_word: "", //搜索的值
      studentMobile: "", //学生电话号码搜索
      studentName: "", //学生名字搜索
      known_channle: "",
      department: "", //学部
      rowInfo: {}, //要操作的当前行
      couponOptions: {}, //获取的优惠券信息
      chooseCoupon: {}, //选择的优惠券信息
      couponList: [],
      student_birthday: "",
      /*01201 微信
        01202 支付宝
        01203 现金
        01205 银行卡*/
      showRefundPayType: "", //
      subjectResultTags: [], //成绩显示
      //修改学生信息相关
      editStudentInfoKey: false, //修改学生信息弹出框开关
      new_enter_score: "", // 新的学生成绩
      role_name: "",
      status: "",
      subject: "",
      enter_score: "",
      organ_id2: [], //新增组件内的学校id,
      dataList: [], //请求的list
      roleIds: [],
      location: [], //校区导航
      selectedLocation: [], //选择校区
      birthday: "",
      entryScoreList: [],

      /*弹出框*/
      paymentLayer: false,
      refundLayer: false,

      addTeamLayer: false, //新增弹出框状态
      changeTeamLayer: false, //修改弹出框状态
      //缴费参数
      paymentForm: {
        realPrice: "", //float,应收款，即总价减去优惠券再减去折扣后的价钱
        realPayment: "", //float，实收款
        discount: "", //float,折扣
        discountReason: "", //打折原因
        couponId: 0, //优惠券ID
        couponName: "", //优惠券名称
        couponAmount: 0, //优惠券金额
        paymentType: "", //支付方式：包括  微信，    支付宝，    现金，POS机，银行卡
        tradeno: "", //业务流水号，POS机号
        serviceCharge: 0, //手续费
        financialIncome: 0, //财务收入
        chargeItem: "" //收费项目
      },
      //退费参数
      refundForm: {
        refundAmount: 0, //float,实际退款金额
        refundReason: "", //退款原因
        refundPayType: "", //退款方式：现金，银行卡，微信，支付宝
        bankCardNo: "", //银行卡卡号，银行卡退款时用
        bankCardPayee: "", //银行卡收款人，银行卡退款时用
        openingBank: "", //开户行,银行卡退款时用
        alipayAcount: "", //支付宝帐号,支付宝支付时用
        wechatAcount: "" //微信号，微信支付时用
      },

      ruleForm: {
        studentName: "", //学生姓名
        studentGrade: "", //年级    [10010]
        studentMobile: "", //学生电话   ==>可能为空
        sex: "",
        primary_school: "",
        ps_province_name: null, //小学所在省
        ps_province_no: null,
        ps_city_name: null, //小学所在市
        ps_city_no: null,
        ps_district_name: null, //小学所在区
        ps_district_no: null,
        middle_school: "",
        ms_province_name: null, //初中所在省
        ms_province_no: null,
        ms_city_name: null, //初中所在市
        ms_city_no: null,
        ms_district_name: null, //初中所在区
        ms_district_no: null,
        high_school: "",
        hs_province_name: null, //高中所在省
        hs_province_no: null,
        hs_city_name: null, //高中所在市
        hs_city_no: null,
        hs_district_name: null, //高中所在区
        hs_district_no: null, //高中所在区
      },
      province: "",
      city: "",
      county: "",
      school: "",
      cur_page: 0,
      cur_limit: 10,
      count: 0,
      //表单校验规则
      rules: {
        studentName: [
          { required: true, message: "请输入学生名称", trigger: "blur" }
        ],
        studentMobile: [
          { required: true, validator: this.Checkout.phone, trigger: "blur" }
        ],
        sex: [{ required: true, message: "请选择学生性别", trigger: "blur" }],
        studentGrade: [
          { required: true, message: "请选择学生年级", trigger: "blur" }
        ]
      },
      studentInfo: [],
      upload: false
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      let _this = vm;
      let sid = _this.$route.query.sid;
      let objData = {
        id: sid,
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        source: _this.GlobalVal.constants.source
      };
      vm.enterUrl = from.path === "/" ? "" : from.path;
      _this.$axios
        .post(_this.GlobalVal.httpLink.getStudentById, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              _this.studentInfo = res.data.student;
              if (_this.studentInfo.primary_school) {
              _this.province = _this.studentInfo.ps_province_no;
              _this.city = _this.studentInfo.ps_city_no;
              _this.county = _this.studentInfo.ps_district_no;
              _this.school = _this.studentInfo.primary_school;
            } else if (_this.studentInfo.middle_school) {
              _this.province = _this.studentInfo.ms_province_no;
              _this.city = _this.studentInfo.ms_city_no;
              _this.county = _this.studentInfo.ms_district_no;
              _this.school = _this.studentInfo.middle_school;
            } else if (_this.studentInfo.high_school) {
              _this.province = _this.studentInfo.hs_province_no;
              _this.city = _this.studentInfo.hs_city_no;
              _this.county = _this.studentInfo.hs_district_no;
              _this.school = _this.studentInfo.high_school;
            }
              _this.ruleForm.studentName = res.data.student.student_name;
              _this.ruleForm.studentMobile = res.data.student.student_mobile;
              _this.ruleForm.studentGrade = res.data.student.student_grade;
              _this.ruleForm.sex = res.data.student.sex;
              _this.studentInfo.student_grade = _this.Util.GetLabelForValue(
                _this.$store.state.GradeOptions,
                _this.studentInfo.student_grade
              );
              _this.$store.commit("setChooseStudentInfo", res.data.student);
              //_this.studentInfo.sex = _this.studentInfo.sex ? "男" : "女";
              if (_this.studentInfo.high_school) {
                _this.studentInfo.studentGreadComputed =
                  _this.studentInfo.high_school;
              } else if (_this.studentInfo.middle_school) {
                _this.studentInfo.studentGreadComputed =
                  _this.studentInfo.middle_school;
              } else if (_this.studentInfo.primary_school) {
                _this.studentInfo.studentGreadComputed =
                  _this.studentInfo.primary_school;
              }
              _this.setActived();
              _this.Util.querySysconst(
                _this,
                "021",
                _this.$store.state.KnowChannleOptions
              ); //查询了解渠道
              _this.Util.querySysconst(
                _this,
                "100",
                _this.$store.state.SubjectOptions
              ); //查询科目
              _this.known_channle = _this.Util.GetLabelForValue(
                _this.$store.state.KnowChannleOptions,
                _this.studentInfo.known_channle
              );
              _this.birthday = _this.Util.TimeCycle(
                _this.studentInfo.student_birthday,
                "ymd"
              );
              if (_this.studentInfo.entryScoreList) {
                _this.entryScoreList = _this.studentInfo.entryScoreList;
                _this.entryScoreList = _this.entryScoreList.map(item => {
                  item.subject = _this.Util.GetLabelForValue(
                    _this.$store.state.SubjectOptions,
                    item.subject
                  );
                  return item;
                });
              }
              _this.subjectResultTags = _this.entryScoreList.map(item => {
                return {
                  id: item.id,
                  mark: item.entry_score,
                  subject: item.subject
                };
              });
              _this.getCouponList();
              let grade = _this.studentInfo.student_grade;
              switch (grade) {
                case "一年级":
                case "10101":
                case "二年级":
                case "10102":
                case "三年级":
                case "10103":
                case "四年级":
                case "10104":
                case "五年级":
                case "10105":
                case "六年级":
                case "10106":
                  _this.department = "00701";
                  break;
                case "七年级":
                case "10107":
                case "八年级":
                case "10108":
                case "九年级":
                case "10109":
                  _this.department = "00702";
                  break;
                case "高一":
                case "10110":
                case "高二":
                case "10111":
                case "高三":
                case "10112":
                  _this.department = "00703";
                  break;
              }
            } else {
              _this.$message({
                type: "error",
                message: res.data.errmsg
              });
            }
          },
          res => {
            _this.$message("请求失败");
          }
        );
    });
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
        if (d.high_school) {
          d.studentGreadComputed = d.high_school;
        } else if (d.middle_school) {
          d.studentGreadComputed = d.middle_school;
        } else if (d.primary_school) {
          d.studentGreadComputed = d.primary_school;
        }
        if (d.status) {
          d.statusStr = "启用";
        } else {
          d.statusStr = "禁用";
        }
        if (d.student_mobile) {
          d.student_mobile_computed = self.Util.formatPhone(d.student_mobile);
        } else {
          d.student_mobile_computed = "无";
        }
        if (d.student_birthday) {
          d.student_birthday_computed = self.Util.TimeCycle(
            d.student_birthday,
            "ymd"
          );
        }
        if (d.matching_class) {
          d.matching_class_computed = self.Util.changeCode(d.matching_class);
        }
        d.start_end_time = d.start_time + "-" + d.end_time;
        return d;
      });
    }
  },
  /*filters: {
            sexShow: function (value) {
                if(value === true){
                    return "男"
                }else if(value === false){
                    return "女"
                }else {
                    return "*"
                }
            }
        },*/
  watch: {
    "$store.state.isPayFeesCommit": {
      handler() {
        this.getCouponList();
      }
    },
    selectedLocation: function() {
      if (
        this.selectedLocation &&
        this.selectedLocation.length &&
        this.selectedLocation.length > 0
      ) {
        this.organId = this.selectedLocation[this.selectedLocation.length - 1];
      }
    },

    select_word: function() {
      const self = this;
      if (/^\d+$/.test(this.select_word) && this.select_word !== "") {
        self.studentMobile = this.select_word;
        self.studentName = null;
      } else if (this.select_word !== "") {
        self.studentName = this.select_word;
        self.studentMobile = null;
      } else {
        self.studentName = null;
        self.studentMobile = null;
      }
    },
    subject: function() {},
    enter_score: function() {
      for (let i = 0; i < this.studentInfo.entryScoreList.length; i++) {
        if (this.studentInfo.entryScoreList[i].subject == this.subject) {
          this.studentInfo.entryScoreList[i].entry_score = this.enter_score;
        }
      }
    },
    $route() {
      this.setActived();
    },
    province: function() {
      this.getCitys()
    },
    city: function() {
      this.getDistrict()
    },
    ["ruleForm.studentGrade"]: function() {
      if (
        this.ruleForm.student_grade == "10101" ||
        this.ruleForm.student_grade == "10102" ||
        this.ruleForm.student_grade == "10103" ||
        this.ruleForm.student_grade == "10104" ||
        this.ruleForm.student_grade == "10105" ||
        this.ruleForm.student_grade == "10106"
      ) {
        this.department = "00701";
      } else if (
        this.ruleForm.student_grade == "10107" ||
        this.ruleForm.student_grade == "10108" ||
        this.ruleForm.student_grade == "10109"
      ) {
        this.department = "00702";
      } else if (
        this.ruleForm.student_grade == "10110" ||
        this.ruleForm.student_grade == "10111" ||
        this.ruleForm.student_grade == "10112"
      ) {
        this.department = "00703";
      }
    },
    department(){
      this.districtsChange();
    }
  },
  methods: {
    setActived() {
      this.menuDefaultActive =
        this.$route.path + "?sid=" + this.$route.query.sid;
    },
    handleCloseTag(tag) {
      this.subjectResultTags.splice(this.subjectResultTags.indexOf(tag), 1);
    },
    getCouponList() {
      let data = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
        studentId: this.studentInfo.student_id, //学生id，可以为空
        orderId: this.studentInfo.order_id //订单 ID，可以为空
      };
      this.$axios
        .post(this.GlobalVal.httpLink.getnotpaidorder, JSON.stringify(data))
        .then(
          res => {
            if (res.data.code === "10000") {
              // self.$store.commit("setChoosePaymentItems", res.data.signupOrders);
              this.couponList = res.data.studentValidCoupons;
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
    //获取数据
    getData() {
      const self = this;
      let objData = {
        source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        page: this.cur_page, //页数
        limit: this.cur_limit, //条目数
        studentName: this.studentName, //学生名字
        studentMobile: this.studentMobile, //学生电话
        orderSource: null, //订单来源
        paymentType: null, //支付方式
        paystatus: null, //支付状态
        timeStart: null, //开始时间
        timeEnd: null, //结束时间
        subject: null, //科目
        organId: null, //学校Id
        orderNo: null //订单号
      };
      /*this.$axios.post(this.GlobalVal.httpLink.querySignupOrder,JSON.stringify(objData)).then(
                    res=>{
                        if(res.data.code==="10000"){
                            console.log("查询报名表获取的对象",res.data);
                            self.count = res.data.count;
                            self.dataList=res.data.signupOrder;
                        }else{
                            console.error(res);
                            self.$message({
                                type:"error",
                                message:"",
                            })
                        }
                    },
                    res=>{
                        this.$message("请求失败")
                    }
                )*/
    },
    queryNameOrNum(queryString, cb) {
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        page: 1, //页数
        limit: 10, //条目数
        studentName: "", //学生名字
        studentMobile: "" //学生电话
      };
      /[0-9]+/.test(queryString) === true
        ? (objData.studentMobile = queryString)
        : (objData.studentName = queryString);
      this.$axios
        .post(
          this.GlobalVal.httpLink.queryStudentNameOrMobile,
          JSON.stringify(objData)
        )
        .then(
          res => {
            if (res.data.code === "10000") {
              cb(res.data.info);
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
    handleSearch(item) {},
    //修改学生入学成绩
    editStudentInfo() {
      this.getProvinces();
      this.editStudentInfoKey = true;
      this.subjectResultTags = this.entryScoreList.map(item => {
        return {
          id: item.id,
          mark: item.entry_score,
          subject: item.subject
        };
      });
    },
    //修改学生信息提交事件
    editStudentSubmit() {
      if (
        this.ruleForm.studentMobile === "" ||
        this.ruleForm.studentNmae === ""
      ) {
        return;
      }
      const self = this;
      let entryScores = [];
      this.entryScoreList = this.subjectResultTags.map(item => {
        entryScores.push({
          id: "",
          student_id: this.studentInfo.student_id, //学生id
          entry_score: item.mark, //新的分数
          test_date: "",
          subject: this.Util.GetValueForLabel(
            this.$store.state.SubjectOptions,
            item.subject
          )
        });
        return item;
      });
      let objData = {
        source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        studentId: this.studentInfo.student_id,
        entryScores: entryScores,
        ...this.varJug(this.ruleForm)
      };
      if (!objData.studentId) {
        this.$router.push({
          path: "/apply"
        });
        this.$message({
          title: "未找到学生信息",
          message: "提交时未找到学生信息,请重新选择学生",
          type: "error"
        });
        return;
      }
      this.$axios
        .post(this.GlobalVal.httpLink.editEnterScore, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {

              // this.entryScoreList = res.data.entryScores.map(d => {
              //     d.subject = this.Util.GetLabelForValue(this.$store.state.SubjectOptions, d.subject);
              //     return d
              // })
              //this.subjectResultTags = res.data.entryScores;
              // this.studentInfo.entryScoreList = this.studentInfo.entryScoreList.map((item, index)=>{
              //     console.log(716, this.entryScoreList[index].id)
              //     if(item.id === this.entryScoreList[index].id){
              //         item.entry_score =  this.entryScoreList[index].entry_score;
              //     }
              //     return item;
              // })

              this.entryScoreList = res.data.entryScores;
              this.studentInfo.entryScoreList = JSON.parse(
                JSON.stringify(this.entryScoreList)
              );
              this.entryScoreList = this.entryScoreList.map(item => {
                item.subject = this.Util.GetLabelForValue(
                  this.$store.state.SubjectOptions,
                  item.subject
                );
                return item;
              });
              this.studentInfo.student_name = res.data.studentName;
              this.studentInfo.student_grade = this.Util.GetLabelForValue(
                this.$store.state.GradeOptions,
                res.data.studentGrade
              );
              this.studentInfo.student_mobile = res.data.studentMobile;
              this.studentInfo.sex = res.data.sex;
              this.$store.commit("setChooseStudentInfo", this.studentInfo);
              this.editStudentInfoKey = false;
              this.getData();
              this.$message({
                title: "成功",
                message: "修改学生信息成功",
                type: "success"
              });
            } else {
              this.$message({
                title: "错误",
                message: res.data.errmsg,
                type: "error"
              });
            }
          },
          res => {
            this.$message({
              title: "错误",
              message: "发送请求失败",
              type: "error"
            });
          }
        );
    },
    goStudentInfo(row) {
      this.$store.commit("setChooseStudentInfo", row);
      this.$router.push({
        path: "/studentInfo"
      });
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
    goback() {
      this.$router.push({
        path: this.enterUrl || "/apply"
      });
    },

    //搜索报名表---刷新
    search() {
      if (this.select_word === "") {
        this.$message({
          type: "error",
          message: "未填写要搜索的姓名或电话,页面只做刷新操作"
        });
      }
      this.getData();
    },

    //转班
    handleTurnClass(index, row) {
      this.$store.commit("setChooseSignuporder", row);
      this.$router.push({
        path: "/turnClass",
        query: {
          order_id: row.order_id,
          total_times: row.total_times,
          left_times: row.left_times,
          index: index
        }
      });
    },
    //转课
    handleTurnObject(index, row) {},
    //请假
    /*handleLeave(index, row) {

            },*/
    //缴费
    submitPaymentForm(paymentForm) {
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
        orderId: this.rowInfo.order_id, //学生报名表id
        realPrice: parseFloat(this.paymentForm.realPrice), //float,应收款，即总价减去优惠券再减去折扣后的价钱
        realPayment: parseFloat(this.paymentForm.realPayment), //float，实收款
        discount: parseFloat(this.paymentForm.discount), //float,折扣
        discountReason: this.paymentForm.discountReason, //打折原因
        couponId: this.paymentForm.coupon_id
          ? parseInt(this.paymentForm.coupon_id)
          : 666, //优惠券ID
        couponName: this.paymentForm.couponName, //优惠券名称
        couponAmount: this.paymentForm.couponAmount, //优惠券金额
        paymentType: this.paymentForm.paymentType, //支付方式：包括  微信，    支付宝，    现金，POS机，银行卡
        tradeno: this.paymentForm.tradeno, //业务流水号，POS机号
        serviceCharge: parseFloat(this.paymentForm.serviceCharge), //手续费
        financialIncome: parseFloat(this.paymentForm.financialIncome), //财务收入
        chargeItem: this.paymentForm.chargeItem //收费项目
      };
      this.$axios
        .post(this.GlobalVal.httpLink.payment, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              self.$message("缴费成功");
              self.paymentLayer = false;
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
    //优惠券选择
    handlerCouponChange() {
      this.paymentForm.coupon_id = this.chooseCoupon.coupon_id
        ? this.chooseCoupon.coupon_id
        : 666;
      this.paymentForm.couponName = this.chooseCoupon.coupon_name
        ? this.chooseCoupon.coupon_name
        : "优惠券名字";
      this.paymentForm.couponAmount = this.chooseCoupon.coupon_amount
        ? this.chooseCoupon.coupon_amount
        : 50;
    },

    //退费
    submitRefundForm(refundForm) {
      const self = this;
      this.$refs[refundForm].validate(valid => {
        if (valid) {
          let objData = {
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
            orderId: this.rowInfo.order_id, //学生报名表id
            totalPrice: self.rowInfo.total_price, //float，总价
            realPayment: self.rowInfo.real_payment, //float,实付款
            totalTimes: self.rowInfo.total_times, //short, 课程总次数
            leftTimes: self.rowInfo.left_times, //short,剩余次数
            refundAmount: self.refundForm.refundAmount, //float,实际退款金额
            refundReason: self.refundForm.refundReason, //退款原因
            refundPayType: self.refundForm.refundPayType, //退款方式：现金，银行卡，微信，支付宝
            bankCardNo: self.refundForm.bankCardNo, //银行卡卡号，银行卡退款时用
            bankCardPayee: self.refundForm.bankCardPayee, //银行卡收款人，银行卡退款时用
            openingBank: self.refundForm.openingBank, //开户行,银行卡退款时用
            alipayAcount: self.refundForm.alipayAcount, //支付宝帐号,支付宝支付时用
            wechatAcount: self.refundForm.wechatAcount //微信号，微信支付时用
          };
          this.$axios
            .post(this.GlobalVal.httpLink.refund, JSON.stringify(objData))
            .then(
              res => {
                if (res.data.code === "10000") {
                  self.$message("退费成功");
                  self.refundLayer = false;
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
        } else {
          return false;
        }
      });
    },
    //业务办理功能选择
    handleCommand(obj) {
      const self = this;
      if (obj.command === "turnClass") {
        //转班
        this.handleTurnClass(1, obj.row);
      }
      if (obj.command === "turnObject") {
        //调课
        this.handleTurnClass(2, obj.row);
      }
      /*if(obj.command==="leave"){ //请假
                    this.handleLeave(3,obj.row);
                }*/
      if (obj.command === "payment") {
        //选择缴费
        this.paymentLayer = true;
        this.rowInfo = obj.row;
        //清空参数
        this.couponOptions = [];
        this.paymentForm.realPrice = ""; //float,应收款，即总价减去优惠券再减去折扣后的价钱
        this.paymentForm.realPayment = ""; //float，实收款
        this.paymentForm.discount = ""; //float,折扣
        this.paymentForm.discountReason = ""; //打折原因
        this.paymentForm.couponId = 666; //优惠券ID
        this.paymentForm.couponName = "优惠券名字"; //优惠券名称
        this.paymentForm.couponAmount = 60; //优惠券金额
        this.paymentForm.paymentType = ""; //支付方式：包括  微信，    支付宝，    现金，POS机，银行卡
        this.paymentForm.tradeno = ""; //业务流水号，POS机号
        this.paymentForm.serviceCharge = 0; //手续费
        this.paymentForm.financialIncome = 0; //财务收入
        this.paymentForm.chargeItem = ""; //收费项目

        let objData = {
          staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
          source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
          isvalid: true //优惠券是否有效 true-有效，false-无效
        };
        /* this.$axios.post(this.GlobalVal.httpLink.querySignupOrder,JSON.stringify(objData)).then(
                        res=>{
                            if(res.data.code==="10000"){
                                console.log("查询优惠券获取的对象",res.data);
                                self.count = res.data.count;
                                self.couponOptions=res.data.coupon;
                            }else{
                                console.error(res);
                                self.$message({
                                    type:"error",
                                    message:"",
                                })
                            }
                        },
                        res=>{
                            this.$message("请求失败")
                        }
                    )*/
      }
      if (obj.command === "refund") {
        //退费
        this.refundLayer = true;
        this.rowInfo = obj.row;
        //清空参数

        //实付款-原价/总次数*上了的次数=退款金额。
        this.refundForm.refundAmount = parseFloat(
          obj.row.real_payment -
            (obj.row.total_price / obj.row.total_times) *
              (obj.row.total_times - obj.row.left_times)
        ).toFixed(2);
      }
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
    studentMark() {
      if (!this.subject || !this.subject.length) {
        this.$message({
          showClose: true,
          message: "请先选择科目入学成绩栏下的选择科目选项"
        });
        return false;
      } else if (!this.enter_score) {
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
          mark: this.enter_score
        });
      });
      this.enter_score = "";
      this.subjectResultTags = obj;
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
    },
    districtsChange(formName) {
      if (this.county !== "") {
        this.district_name = this.Util.GetIdNameForValue(
            this.$store.state.CountyOptions || this.districts,
            this.county,
            "district_no",
            "district_name"
          )
      }
      formName ? (this.cur_limit = 10) : this.cur_limit;
      this.loading = true;
      let objData2 = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        page: 0,
        limit: this.cur_limit,
        districtName: this.district_name,
        department: this.department
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
    moreLoading() {
      this.cur_limit += 30;
      this.districtsChange();
    },
    varJug(obj){
       if (this.department === "00701") {
        //小学
        obj.primary_school = this.school;
        obj.ps_province_no = this.province;
        obj.ps_city_no = this.city;
        obj.ps_district_no = this.county;
        obj.ps_province_name = this.Util.GetIdNameForValue(
          this.$store.state.ProvinceOptions,
          this.province,
          "province_no",
          "province_name"
        );
        obj.ps_city_name = this.Util.GetIdNameForValue(
          this.$store.state.CityOptions,
          this.city,
          "city_no",
          "city_name"
        );
        obj.ps_district_name = this.Util.GetIdNameForValue(
          this.$store.state.CountyOptions,
          this.county,
          "district_no",
          "district_name"
        );
      } else if (this.department === "00702") {
        //初中
        obj.middle_school = this.school;
        obj.ms_province_no = this.province;
        obj.ms_city_no = this.city;
        obj.ms_district_no = this.county;
        obj.ms_province_name = this.Util.GetIdNameForValue(
          this.$store.state.ProvinceOptions,
          this.province,
          "province_no",
          "province_name"
        );
        obj.ms_city_name = this.Util.GetIdNameForValue(
          this.$store.state.CityOptions,
          this.city,
          "city_no",
          "city_name"
        );
        obj.ms_district_name = this.Util.GetIdNameForValue(
          this.$store.state.CountyOptions,
          this.county,
          "district_no",
          "district_name"
        );
      } else if (this.department === "00703") {
        //高中
        obj.high_school = this.school;
        obj.hs_province_no = this.province;
        obj.hs_city_no = this.city;
        obj.hs_district_no = this.county;
        obj.hs_province_name = this.Util.GetIdNameForValue(
          this.$store.state.ProvinceOptions,
          this.province,
          "province_no",
          "province_name"
        );
        obj.hs_city_name = this.Util.GetIdNameForValue(
          this.$store.state.CityOptions,
          this.city,
          "city_no",
          "city_name"
        );
        obj.hs_district_name = this.Util.GetIdNameForValue(
          this.$store.state.CountyOptions,
          this.county,
          "district_no",
          "district_name"
        );
      }
      return obj;
    }
  }
};
</script>
