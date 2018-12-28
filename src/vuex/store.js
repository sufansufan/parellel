// import Vue from "vue";
// import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

let year = new Date().getFullYear();
let yearOpt = [];
for (let i = 0; i <= 2; i++) {
  let obj = {};
  obj.value = year + i;
  obj.label = year + i + "年";
  yearOpt.push(obj);
}
/* let obj = {};
obj.value = year + 1;
obj.label = year + 1 + "年";
yearOpt.push(obj);
 */
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

export default new Vuex.Store({
  // 存储状态值
  state: {
    isLogin: false,
    isPayFees: true, //是否显示为报名信息, true:报名, false: 缴费
    user: {},
    breadcrumbs: ["未知"],
    chooseStudent: {}, //报名选班中,当前被选中的学生信息
    chooseSignuporder: {}, //转班调课时,当前被选中的订单信息
    chooseClassMge: {}, //修改班级的时候,当前被选中的班级信息
    chooseStudentInfo: {}, //报名点击学生姓名的时候操作,存储点击的学生信息
    ChooseClassApply: [], //要报名的班级
    ChoosePaymentItems: [], //要缴费的班级
    PaymentClassItems: [],
    //区域导航
    location: [],
    //顶级的organId
    organId: null,
    //获取设备
    equipment: [],
    locationArea: [],
    refundReason: [
      "换老师",
      "学校课程紧张、压力大",
      "升班型退差价",
      "作业多、没时间",
      "学校老师开辅导班",
      "课程太难、学不会",
      "课程进度跟学校不一致（太快 / 太慢）",
      "学校成绩没有明显提升",
      "搬家 / 离家远 / 转学",
      "孩子不愿意上",
      "要报一对一或小班",
      "学校老师开辅导班",
      "时间冲突"
    ],
    //年份
    YearOptions: yearOpt,
    DiscountTypeOptions: [
      {
        value: "02801",
        label: "无优惠"
      },
      {
        value: "02802",
        label: "仅打折"
      },
      {
        value: "02803",
        label: "仅立减"
      },
      {
        value: "02804",
        label: "仅优惠券"
      },
      {
        value: "02805",
        label: "立减优惠"
      },
      {
        value: "02806",
        label: "打折立减"
      },
      {
        value: "02807",
        label: "打折优惠"
      },
      {
        value: "02808",
        label: "打折优惠立减"
      }
    ],
    //用户角色状态信息(动态获取)
    StaffTypeOptions: [
      {
        value: "1000",
        label: "学科组长"
      },
      {
        value: "1001",
        label: "学校校长"
      },
      {
        value: "1002",
        label: "区域校长"
      },
      {
        value: "1003",
        label: "订单删除"
      },
      {
        value: "1004",
        label: "数据分折"
      },
      {
        value: "1005",
        label: "人资主管"
      },
      {
        value: "1006",
        label: "西安管理员"
      },
      {
        value: "1007",
        label: "会计主管"
      },
      {
        value: "1008",
        label: "市场"
      },
      {
        value: "1009",
        label: "前台"
      },
      {
        value: "1010",
        label: "校区财务"
      },
      {
        value: "1011",
        label: "会计"
      },
      {
        value: "1012",
        label: "老师"
      },
      {
        value: "1013",
        label: "教务总监"
      },
      {
        value: "1014",
        label: "教务"
      },
      {
        value: "1015",
        label: "校区主管"
      },
      {
        value: "1016",
        label: "系统管理员"
      }
    ],
    //科目(动态获取)
    SubjectOptions: [],
    //授课年级(动态获取)
    GradeOptions: [],
    //收费项目
    ChargeProject: [],
    //学生状态(动态获取)
    StudentStatusOptions: [
      {
        value: "01101",
        label: "已注册	"
      },
      {
        value: "01102",
        label: "已试听	"
      },
      {
        value: "01103",
        label: "已报名	"
      },
      {
        value: "01104",
        label: "已缴费	"
      },
      {
        value: "01105",
        label: "公益课在读	"
      },
      {
        value: "01106",
        label: "短期班在读	"
      },
      {
        value: "01107",
        label: "长期班在读	"
      },
      {
        value: "01108",
        label: "暂停学习	"
      },
      {
        value: "01109",
        label: "已结课	"
      },
      {
        value: "01110",
        label: "已退费"
      }
    ],
    //订单状态(动态获取)
    OrderStatusOptions: [
      {
        value: "01001",
        label: "已报名	"
      },
      {
        value: "01002",
        label: "已候补	"
      },
      {
        value: "01003",
        label: "已缴费"
      },
      {
        value: "01004",
        label: "在读"
      },
      {
        value: "01005",
        label: "课程结束"
      },
      {
        value: "01006",
        label: "申请退费"
      },
      {
        value: "01007",
        label: "退费成功"
      }
    ],
    payStatusList: [
      {
        value: "01301",
        label: "未支付"
      },
      {
        value: "01302",
        label: "已支付"
      },
      {
        value: "01303",
        label: "申请退款"
      },
      {
        value: "01304",
        label: "退款成功"
      }
    ],
    //排名等级(动态获取) 报名级别
    EntryRankOptions: [
      {
        value: "00801",
        label: "一级"
      },
      {
        value: "00802",
        label: "二级"
      },
      {
        value: "00803",
        label: "三级"
      },
      {
        value: "00804",
        label: "四级"
      },
      {
        value: "00805",
        label: "五级"
      },
      {
        value: "00806",
        label: "六级"
      },
      {
        value: "00807",
        label: "七级"
      },
      {
        value: "00808",
        label: "八级"
      },
      {
        value: "00809",
        label: "九级"
      },
      {
        value: "00810",
        label: "十级"
      }
    ],
    //学部/ 部门
    DepartmentOptions: [],
    knownChannleOptions: [],
    //季节(动态获取)
    SeasonOptions: [],
    //班级类型(动态获取)
    ClassTypeOptions: [],
    //课程类型(动态获取)
    CourseTypeOptions: [],
    //科目类型(动态获取)
    ProjectTypeOptions: [],
    //项目类型
    //期数
    PeriodsOptions: [],
    //支付方式
    PaymentTypeOptions: [],
    //退款方式
    RefundTypeOptions: [],
    //支付状态
    PaystatusOptions: [],
    //订单来源
    OrderSourceOptions: [],
    //了解渠道
    KnowChannleOptions: [],
    //优惠券类型
    CouponTypeOptions: [],
    LiberalTypeOptions: [],
    //优惠类型
    TurnClassConditionOptions: [],
    //转班条件
    ChargeItemOptions: [],
    //常量类型 (写死)
    SysconstType: [
      {
        value: "ProjectType",
        label: "科目类型"
      },
      {
        value: "CourseType",
        label: "课程类型"
      },
      {
        value: "ClassType",
        label: "班级类型"
      },
      {
        value: "Season",
        label: "季节"
      },
      {
        value: "Department",
        label: "部门 "
      },
      {
        value: "EntryRank",
        label: "排名等级"
      },
      {
        value: "Periods",
        label: "期数"
      },
      {
        value: "OrderStatus",
        label: "订单状态"
      },
      {
        value: "StudentStatus",
        label: "学生状态"
      },
      {
        value: "Subject",
        label: "授课科目"
      },
      {
        value: "Grade",
        label: "授课年级"
      }
    ],
    //学校类型
    SchoolTypeOptions: [
      {
        value: "00701",
        label: "小学"
      },
      {
        value: "00702",
        label: "初中"
      },
      {
        value: "00703",
        label: "高中"
      }
    ],
    SchoolEquipmentOptions: [
      {
        value: "电脑",
        label: "电脑"
      },
      {
        value: "白板",
        label: "白板"
      },
      {
        value: "投影仪",
        label: "投影仪"
      },
      {
        value: "麦克风",
        label: "麦克风"
      },
      {
        value: "无线网",
        label: "无线网"
      }
    ],
    SchoolPostNatureOptions: [
      {
        value: "全职",
        label: "全职"
      },
      {
        value: "兼职",
        label: "兼职"
      },
      {
        value: "特聘",
        label: "特聘"
      },
      {
        value: "专职",
        label: "专职"
      }
    ],
    FinanceAdjustType: [
      { label: "订单改日期", value: "03301" },
      { label: "订单改金额", value: "03302" },
      { label: "其他退费", value: "03303" },
      { label: "签到", value: "03304" }
    ],
    couponTypeOptions: [
      {
        value: "01501",
        label: "新用户优惠券"
      },
      {
        value: "01502",
        label: "老带新优惠券"
      },
      {
        value: "01503",
        label: "活动优惠券"
      },
      {
        value: "01504",
        label: "n元体验券"
      }
    ],
    ProvinceOptions: [], //省
    CityOptions: [], //市
    CountyOptions: [], //县
    schoolOptions: [
      {
        value: "61010101",
        label: "西安工程大学"
      }
    ],
    //性别(写死)
    sexOptions: [
      {
        value: false,
        label: "女"
      },
      {
        value: true,
        label: "男"
      }
    ],
    // 签到状态
    rollCallStatus: [
      {
        value: "01702",
        label: "签到"
      },
      {
        value: "01703",
        label: "迟到"
      },
      {
        value: "01704",
        label: "请假"
      },
      {
        value: "01701",
        label: "旷课"
      }
    ],
    //订单状态
    orderStatus: [
      {
        value: "01001",
        label: "已报名",
        show: false
      },
      {
        value: "01002",
        label: "已候补",
        show: false
      },
      {
        value: "01003",
        label: "发起支付",
        show: true
      },
      {
        value: "01004",
        label: "支付完成",
        show: true
      },
      {
        value: "01005",
        label: "在读",
        show: true
      },
      {
        value: "01006",
        label: "课程结束",
        show: true
      },
      {
        value: "01007",
        label: "申请退费",
        show: true
      },
      {
        value: "01008",
        label: "退费成功",
        show: true
      },
      {
        value: "01009",
        label: "已取消",
        show: false
      },
      {
        value: "01010",
        label: "已收藏",
        show: false
      },
      {
        value: "01011",
        label: "转班转出",
        show: true
      }
    ],
    refundStatusList: [
      {
        value: "02001",
        label: "未审核"
      },
      {
        value: "02003",
        label: "已退款"
      },
      {
        value: "020021",
        label: "审核通过"
      },
      {
        value: "020022",
        label: "审核不通过"
      },

      {
        value: "02004",
        label: "打款不通过"
      }
    ],
    roles_ids: {
      "010101": "超额报名",
      "010102": "超额转班",
      "010103": "超额调课",
      "010104": "超额退费",
      "010301": "导出班级",
      "010302": "导出学生",
      "010601": "转班导出",
      "010701": "调课导出",
      "010801": "签到信息导出",
      "011101": "业务量导出",
      "011201": "订单导出",
      "011202": "其它订单导出",
      "011301": "退费导出",
      "011401": "校区对帐导出",
      "020201": "导出教室课表",
      "020301": "导出教师课表",
      "020701": "导出班级",
      "021201": "导出学员",
      "030101": "导出收入情况",
      "040101": "导出班级运营数据",
      "040201": "导出学员运营数据"
    }
  },
  //更改Vuex的store中的状态的唯一方法就是mutations
  // 提交mutations是更改Vuex状态的唯一方法
  //store.commit('isLoginTrue')
  mutations: {
    isLoginTrue(state) {
      state.isLogin = true;
    },
    isLoginFalse(state) {
      state.isLogin = false;
    },
    isPayFeesCommit(state, data) {
      //是否显示为报名信息, true:报名, false: 缴费
      state.isPayFees = data;
    },
    setUser(state, data) {
      state.user = data;
    },
    isTurnClassSwitch(state, data) {
      state.isTurnClassSwitch = data;
    },
    //收费项目
    setChargeProject(state, data) {
      state.ChargeProject = data;
    },
    //转班
    setTurnClassInfo(state, data) {
      state.TurnClassInfo = data;
    },
    //调课
    setClassCourseInfo(state, data) {
      state.ClassCourseInfo = data;
    },
    //选择学生信息
    setChooseStudentInfo(state, data) {
      state.chooseStudentInfo = data;
    },
    //设置面包屑导航
    setBreadcrumbs(state, data) {
      state.breadcrumbs = data;
    },
    //设置admin导航
    setAdminLocation(state, data) {
      state.adminLocation = data;
    },
    //报名选班时,当前被选中的学生的信息
    setChooseOrderMge(state, data) {
      state.ChooseOrderMge = data;
    },
    //转班时,当前被选中的报名表信息
    setChooseSignuporder(state, data) {
      state.chooseSignuporder = data;
    },
    //修改班级的时候,当前被选中的班级信息
    setChooseClassMge(state, data) {
      state.chooseClassMge = data;
    },
    //修改学员信息，当前选中的学员信息
    setStudentInfoManage(state, data) {
      state.studentInfoManage = data;
    },
    setLocation(state, data) {
      //区域导航
      state.location = data;
    },
    setLocationArea(state, data) {
      //区域导航
      state.locationArea = data;
    },

    setEquipment(state, data) {
      state.equipment = data;
    },
    setOrganId(state, data) {
      //顶级的organId
      state.organId = data;
    },

    setStaffTypeOptions(state, data) {
      state.StaffTypeOptions = data;
    },
    setSubjectOptions(state, data) {
      state.SubjectOptions = data;
    },
    setGradeOptions(state, data) {
      state.GradeOptions = data;
    },
    setProjectTypeOptions(state, data) {
      state.ProjectType = data;
    },
    setStudentStatusOptions(state, data) {
      state.StudentStatusOptions = data;
    },
    setOrderStatusOptions(state, data) {
      state.OrderStatusOptions = data;
    },
    setEntryRankOptions(state, data) {
      state.EntryRankOptions = data;
    },
    setDepartmentOptions(state, data) {
      state.DepartmentOptions = data;
    },
    setSeasonOptions(state, data) {
      state.SeasonOptions = data;
    },
    setClassTypeOptions(state, data) {
      state.ClassTypeOptions = data;
    },
    setCourseTypeOptions(state, data) {
      state.CourseTypeOptions = data;
    },
    setKnowChannleOptions(state, data) {
      state.KnowChannleOptions = data;
    },
    setProjectTypeOptions(state, data) {
      state.ProjectTypeOptions = data;
    },
    setPaymentTypeOptions(state, data) {
      state.PaymentTypeOptions = data;
    },
    setPaystatusOptions(state, data) {
      state.PaystatusOptions = data;
    },
    setOrderSourceOptions(state, data) {
      state.OrderSourceOptions = data;
    },
    setCouponTypeOptions(state, data) {
      state.CouponTypeOptions = data;
    },
    setPeriodsOptions(state, data) {
      state.PeriodsOptions = data;
    },
    setSchoolTypeOptions(state, data) {
      state.SchoolTypeOptions = data;
    },
    setSchoolGradeOptions(state, data) {
      state.SchoolGradeOptions = data;
    },
    setSchool(state, data) {
      state.school = data;
    },
    setChooseClassApply(state, data) {
      state.ChooseClassApply = data;
    },
    setChoosePaymentItems(state, data) {
      state.ChoosePaymentItems = data;
    },
    setStudentValidCoupons(state, data) {
      state.StudentValidCoupons = data;
    },
    setProvinceOptions(state, data) {
      state.ProvinceOptions = data;
    },
    setCityOptions(state, data) {
      state.CityOptions = data;
    },
    setCountyOptions(state, data) {
      state.CountyOptions = data;
    },
    setLiberalTypeOptions(state, data) {
      state.LiberalTypeOptions = data;
    },
    setTurnClassConditionOptions(state, data) {
      state.TurnClassConditionOptions = data;
    },
    setPaymentClassItems(state, data) {
      state.PaymentClassItems = data;
    },
    setChargeItemOptions(state, data) {
      state.ChargeItemOptions = data;
    },
    setStudentInfo(state, data) {
      state.StudentInfoOptions = data;
    },
    setAttendClasses(state, data) {
      state.AttendClasses = data;
    },
    setDistrictsList(state, data) {
      state.DistrictsList = data;
    },
    setsetCityList(state, data) {
      state.CityList = data;
    },
    setTurnClassInfo(state, data) {
      state.TurnClassInfo = data;
    },
    setTurnSwitch(state, data) {
      state.TurnSwitch = data;
    },
    setCouserSwitch(state, data) {
      state.CouserSwitch = data;
    },
    isStudentMoney(state, data) {
      state.isStudentMoney = data;
    },
    isOrderId(state, data) {
      state.isOrderId = data;
    },
    setAdminCode(state, data) {
      state.code = data;
    },
    setChooseCouponInfo(state, data) {
      state.ChooseCouponInfo = data;
    },
    //级别名称
    setLeveLName(state, data) {
      state.LevelName = data;
    },
    //查看课酬详情信息
    setPayMoneyDetial(state, data) {
      state.PayMoneyDetial = data;
    },
    setPayMoneyTeacher(state, data) {
      state.PayMoneyTeacher = data;
    },
    setPayMoneyCampus(state, data) {
      state.PayMoneyCampus = data;
    },
    setSearchTeacher(state, data) {
      state.SearchTeacher = data;
    }
  },
  // 在store中定义getters（可以认为是store的计算属性）。Getters接收state作为其第一个函数
  getters: {},
  actions: {},
  plugins: [vuexLocal.plugin]
});
