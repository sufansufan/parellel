import { request } from "https";

export default {
  install(Vue) {
    // let requestUrl = "http://192.168.1.169:80/pxxmanage/home"; //李老师
    // let requestUrl = "http://192.168.1.188/pxxmanage/home"; //查
    // let requestUrl = "http://192.168.1.102:8888/pxxmanage/home"; //朱
    // let requestUrl = "http://192.168.1.127:8080/pxxmanage/home"; //测试服务器
    let requestUrl = "http://47.94.85.28/pxxmanage/home"; //正式服务
    requestUrl =
      process.env.NODE_ENV === "development" ? requestUrl : "/pxxmanage/home";
    Vue.prototype.GlobalVal = {
      httpLink: {
        /*报名相关*/
        signup: requestUrl + "/foreground/signup/signup",
        payment: requestUrl + "/foreground/signup/payment",
        queryStuentOrder: requestUrl + "/foreground/signup/queryStuentOrder",
        updatepaytimelimit:
          requestUrl + "/foreground/signup/updatepaytimelimit",
        getclassinfo: requestUrl + "/foreground/changeclass/getclassinfo",
        getnotpaidorder: requestUrl + "/foreground/signup/getnotpaidorder",
        changeWaitingToSignup:
          requestUrl + "/foreground/signup/changeWaitingToSignup",
        getStudentById:
          requestUrl + "/frontDesk/student/getStudentById" /*未缴费管理*/,
        updateOrderStatus:
          requestUrl + "/foreground/signup/updateOrderStatus" /*其他收费*/,
        productpayment: requestUrl + "/foreground/product/productpayment",
        queryOtherOrder:
          requestUrl + "/foreground/businessquery/queryOtherOrder",
        otherRefund: requestUrl + "/foreground/refund/otherRefund",
        listOtherRefundRecord:
          requestUrl + "/foreground/refund/listOtherRefundRecord",
        otherRefundAudit: requestUrl + "/foreground/refund/otherRefundAudit",
        otherRefundPay: requestUrl + "/foreground/refund/otherRefundPay",
        listBigRefundOrder:
          requestUrl + "/foreground/refund/listBigRefundOrder",
        queryStudentNameOrMobile:
          requestUrl + "/foreground/signup/queryStudent",
        queryTeacherName: requestUrl + "/common/search/teacherName",
        queryClassName: requestUrl + "/common/search/className" /* admin */,
        login: requestUrl + "/admin/login/login",
        logout: requestUrl + "/admin/login/logout",
        changePassword: requestUrl + "/admin/login/changepassword",
        getAllMenu: requestUrl + "/admin/get/allMenu" /* user */,
        queryTeachers: requestUrl + "/user/teacher/queryTeachers",
        editTeacher: requestUrl + "/user/teacher/editTeacher",
        delTeacher: requestUrl + "/user/teacher/delTeacher",
        freezeTeacher: requestUrl + "/user/teacher/frozenTeacher",
        getnations: requestUrl + "/common/nation/getnations",
        queryClassOfTeacher: requestUrl + "/eduadmin/class/queryClassOfTeacher",
        queryStaffs: requestUrl + "/user/staff/queryStaffs",
        editStaff: requestUrl + "/user/staff/editStaff",
        delStaff: requestUrl + "/user/staff/delStaff",
        queryRoles: requestUrl + "/user/role/queryRoles",
        editRole: requestUrl + "/user/role/editRole",
        delRole: requestUrl + "/user/role/delRole" /* stting */,
        getAreaNav: requestUrl + "/setting/adminOrgan/areanav" /*业务查询*/,
        listStepFinanceRefundRecord:
          requestUrl + "/foreground/refund/listStepFinanceRefundRecord",
        queryRefundOrPaiedForECharts:
          requestUrl + "/foreground/class/queryRefundOrPaiedForECharts",
        queryVolume: requestUrl + "/data/payment/queryVolume",
        queryStudentBusinessForECharts:
          requestUrl + "/foreground/class/queryStudentBusinessForECharts",
        queryPayment: requestUrl + "/data/payment/queryPayment",
        queryPaymentOrder:
          requestUrl + "/foreground/businessquery/queryPaymentOrder",
        queryRefundDetail: requestUrl + "/foreground/refund/queryRefundDetail",
        queryStudentBusiness:
          requestUrl + "/foreground/class/queryStudentBusiness",
        listBigOrder: requestUrl + "/foreground/signup/listBigOrder",
        exportStudentBusiness:
          requestUrl + "/foreground/export/exportStudentBusiness",
        savedDiscount: requestUrl + "/foreground/discount/editClassDiscount",
        queryTeacherLevel:
          requestUrl + "/setting/teacherlevel/queryTeacherlevels",
        editTeacherlevel: requestUrl + "/setting/teacherlevel/editTeacherlevel",
        delTeacherLevel: requestUrl + "/setting/teacherlevel/delTeacherlevel",
        queryAdminOrgans: requestUrl + "/setting/adminOrgan/queryAdminOrgans",
        delAdminOrgan: requestUrl + "/setting/adminOrgan/delAdminOrgan",
        editAdminOrgan: requestUrl + "/setting/adminOrgan/editAdminOrgan",
        getAllFinanceBody: requestUrl + "/setting/fianceBody/getAllFinanceBody",
        refundAudit: requestUrl + "/foreground/refund/refundAudit",
        bigRefundAudit: requestUrl + "/foreground/refund/bigRefundAudit",
        bigRefundPay: requestUrl + "/foreground/refund/bigRefundPay",
        refundPay: requestUrl + "/foreground/refund/refundPay",
        queryClassrooms: requestUrl + "/setting/classroom/queryClassrooms",

        editClassroom: requestUrl + "/setting/classroom/editClassroom",
        delClassroom:
          requestUrl + "/setting/classroom/delClassroom" /* 教务管理 */,
        getAllPosStatus: requestUrl + "/pos/getAllPosStatus",
        getPosOperationHistory: requestUrl + "/pos/getPosOperationHistory",
        getPosInfoList: requestUrl + "/pos/getPosInfoList",
        savePosInfo: requestUrl + "/pos/savePosInfo",
        deletePosInfo: requestUrl + "/pos/deletePosInfo",
        sendPayByPos: requestUrl + "/pos/sendPayByPos",
        sendPayByPosResult: requestUrl + "/pos/sendPayByPosResult",
        queryCourse: requestUrl + "/frontDesk/courseManagement/queryCourse",
        editCourse: requestUrl + "/frontDesk/courseManagement/editCourse",
        delCourse: requestUrl + "/frontDesk/courseManagement/delCourse",
        batchSetupClassPeriod:
          requestUrl + "/eduadmin/class/batchSetupClassPeriod",
        queryAttendClass: requestUrl + "/eduadmin/attendClass/queryAttendClass",
        batchSetupAttendClass:
          requestUrl + "/eduadmin/class/batchSetupAttendClass" /*网报时间维护*/,
        queryClassTime: requestUrl + "/eduadmin/attendClass/queryClassTime",
        updateClassTime: requestUrl + "/eduadmin/attendClass/editClassTime",
        delClassTime:
          requestUrl + "/eduadmin/attendClass/delClassTime" /* 前台 */,
        queryStudent: requestUrl + "/frontDesk/student/queryStudents",
        delStudent: requestUrl + "/frontDesk/student/delStudent",
        studentAudition: requestUrl + "/frontDesk/student/audition",
        studentLeave: requestUrl + "/frontDesk/student/leave",
        studentMoneyBack: requestUrl + "/frontDesk/student/moneyBack",
        editEnterScore: requestUrl + "/frontDesk/student/editEntryScore",
        studentSignUp: requestUrl + "/frontDesk/signupOrder/signUp",
        querySignupOrder:
          requestUrl + "/frontDesk/signupOrder/querySignupOrder",
        delSignupOrder: requestUrl + "/frontDesk/signupOrder/delSignupOrder",
        turnClass: requestUrl + "/foreground/changeclass/turnClass",
        listTurnClassHistory:
          requestUrl + "/foreground/changeclass/listTurnClassHistory",
        changeCourseSchedule:
          requestUrl + "/foreground/changeclass/changeCourseSchedule",
        cancleChangeCourseSchedule:
          requestUrl + "/foreground/changeclass/cancleChangeCourseSchedule",
        signupOrderGetTime: requestUrl + "/frontDesk/signupOrder/getTime",
        signupOrderLeave: requestUrl + "/frontDesk/signupOrder/leave",
        getRefundInfo: requestUrl + "/foreground/refund/getRefundInfo",
        refund: requestUrl + "/foreground/refund/refund",
        bigRefund: requestUrl + "/foreground/refund/bigRefund",
        moneyPay: requestUrl + "/frontDesk/signupOrder/moneyBack",
        queryClass: requestUrl + "/foreground/signup/queryClass",
        listCheckinRecordByOrderId:
          requestUrl + "/foreground/checkin/listCheckinRecordByOrderId",
        listIncomeSituationByClassId:
          requestUrl + "/foreground/class/listIncomeSituationByClassId",
        listFinanceConfirmRecordByOrderId:
          requestUrl + "/foreground/class/listFinanceConfirmRecordByOrderId",
        queryClassMag: requestUrl + "/eduadmin/class/queryClass",
        getClassById: requestUrl + "/eduadmin/class/getClassById",
        editClassMag: requestUrl + "/eduadmin/class/editClass",
        delClassMag: requestUrl + "/eduadmin/class/delClass",
        changeClassStatus: requestUrl + "/eduadmin/class/changeClassStatus",
        batchSetupClass: requestUrl + "/eduadmin/class/batchSetupClass",
        copyClass: requestUrl + "/eduadmin/class/copyClass",
        getCampusTimeSlot: requestUrl + "/eduadmin/timeslot/getCampusTimeSlot",
        changeAttendClass: requestUrl + "/eduadmin/class/changeAttendClass",
        getCampusTeachers: requestUrl + "/user/teacher/getCampusTeachers",
        getCampusDateSlot: requestUrl + "/eduadmin/dateslot/getCampusDateSlot",
        queryClassStudent: requestUrl + "/foreground/class/queryClassStudent",
        getClassChangeHistory:
          requestUrl + "/eduadmin/class/getClassChangeHistory",
        exportStudentList: requestUrl + "/frontDesk/student/exportStudentList",
        gettimeslot: requestUrl + "/foreground/checkin/gettimeslot",
        getAttendClass: requestUrl + "/foreground/checkin/getAttendClass",
        getClassCheckinInfo:
          requestUrl + "/foreground/checkin/getClassCheckinInfo",
        checkin: requestUrl + "/foreground/checkin/checkin",
        queryTurnClassHistory:
          requestUrl + "/foreground/changeclass/queryTurnClassHistory",
        queryChangeClassScheduleHistory:
          requestUrl +
          "/foreground/changeclass/queryChangeClassScheduleHistory",
        queryNotRenew: requestUrl + "/foreground/notRenew/queryNotRenew",
        querySysconst: requestUrl + "/common/sysconst/querySysconst",
        editSysconst: requestUrl + "/common/sysconst/editSysconst",
        delSysconst: requestUrl + "/common/sysconst/delSysconsts",
        queryOrder: requestUrl + "/foreground/admin/queryOrder",
        deleteOrder: requestUrl + "/eduadmin/order/deleteOrderPaied",
        changeOrderTime: requestUrl + "/finance/signuporder/changeOrderTime",
        exportOrder: requestUrl + "/eduadmin/export/exportOrder",
        exportCampusIncome: requestUrl + "/eduadmin/export/campusIncome",
        campusIncome: requestUrl + "/foreground/businessquery/campusIncome",
        exportClass: requestUrl + "/eduadmin/export/exportClass",
        exportStudent: requestUrl + "/eduadmin/export/exportStudent",
        exportTurnClassRefund:
          requestUrl + "/eduadmin/export/exportTurnClassRefund",
        exportChangeClassRefund:
          requestUrl + "/eduadmin/export/exportChangeClassRefund",
        exportRefund: requestUrl + "/eduadmin/export/exportRefund",
        queryTimeSlot: requestUrl + "/eduadmin/timeslot/queryTimeSlot",
        editTimeSlot: requestUrl + "/eduadmin/timeslot/editTimeSlot",
        delTimeSlot: requestUrl + "/eduadmin/timeslot/delTimeSlot",
        queryDateSlotSequence:
          requestUrl + "/eduadmin/dateslot/queryDateSlotSequence",
        queryDateSlot: requestUrl + "/eduadmin/dateslot/queryDateSlot",
        editDateSlot: requestUrl + "/eduadmin/dateslot/editDateSlot",
        delDateSlot: requestUrl + "/eduadmin/dateslot/delDateSlot",
        queryStudents: requestUrl + "/frontDesk/student/queryStudents",
        queryStudentsByPersonInfo:
          requestUrl + "/frontDesk/student/queryStudentsByPersonInfo",
        queryStudentsByClassInfo:
          requestUrl + "/frontDesk/student/queryStudentsByClassInfo",
        editStudents: requestUrl + "/frontDesk/student/editStudent",
        delStudents: requestUrl + "/frontDesk/student/delStudents",
        editEntryScore: requestUrl + "/frontDesk/student/editEntryScore",
        queryPubicSchool: requestUrl + "/public/school/queryPubicSchool",
        editPublicSchool: requestUrl + "/public/school/editPubicSchool",
        delPubicSchool: requestUrl + "/public/school/delPubicSchool",
        queryProvince: requestUrl + "/public/school/queryProvince",
        queryCities: requestUrl + "/public/school/queryCities",
        queryDiss: requestUrl + "/public/school/queryDiss",
        queryParents: requestUrl + "/frontDesk/student/queryParents",
        delParents: requestUrl + "/frontDesk/student/delParents",
        queryStudentByParents:
          requestUrl + "/frontDesk/student/queryStudentByParents",
        queryCoupon: requestUrl + "/public/coupon/queryCoupon",
        editCoupon: requestUrl + "/public/coupon/editCoupon",
        delCoupon: requestUrl + "/public/coupon/delCoupon",
        sendStudentCoupon:
          requestUrl + "/public/studentCoupon/sendStudentCoupon",
        queryStudentCoupon:
          requestUrl + "/public/studentCoupon/queryStudentCoupon",
        editStudentCoupon:
          requestUrl + "/public/studentCoupon/editStudentCoupon",
        delStudentCoupon: requestUrl + "/public/studentCoupon/delStudentCoupon",
        queryPayRecord: requestUrl + "/data/payment/queryPayRecord",
        editPayRecord: requestUrl + "/data/payment/editPayRecord",
        delPayRecord: requestUrl + "/data/payment/delPayRecord",
        queryRefundRecord: requestUrl + "/foreground/refund/queryRefundRecord",
        editRefundRecord: requestUrl + "/data/refund/editRefundRecord",
        delRefundRecord: requestUrl + "/data/refund/delRefundRecord",
        listFinancialEstimateConfirmIncome:
          requestUrl + "/foreground/finance/listFinancialEstimateConfirmIncome",
        listFinancialIncome:
          requestUrl + "/foreground/finance/listFinancialIncome",
        exportFinancialIncome:
          requestUrl + "/foreground/finance/exportFinancialIncome",
        exportBigOrder: requestUrl + "/foreground/finance/exportBigOrder",
        queryRefundRecordByStatus:
          requestUrl + "/data/payment/queryRefundRecordByStatus",
        queryRefundRecordByStatus1:
          requestUrl + "/data/payment/queryRefundRecordByStatus1",
        importClassExclFile:
          requestUrl + "/eduadmin/exclFile/importClassExclFile",
        viewClassExclFile: requestUrl + "/eduadmin/exclFile/viewClassExclFile",
        exportClassForBackstage:
          requestUrl + "/eduadmin/export/exportClassForBackstage",
        exportOtherOrder:
          requestUrl + "/foreground/businessquery/exportOtherOrder",
        exportClassroomTimeTable:
          requestUrl + "/setting/classroom/exportClassroomTimeTable",
        previewClassroomTimeTable:
          requestUrl + "/setting/classroom/previewClassroomTimeTable",
        exportClassCheckinInfo:
          requestUrl + "/foreground/checkin/exportClassCheckinInfo",
        listStudentOperationData:
          requestUrl + "/foreground/subject/listStudentOperationData",
        exportStudentOperationData:
          requestUrl + "/foreground/subject/exportStudentOperationData",
        listClassOperationData:
          requestUrl + "/foreground/subject/listClassOperationData",
        exportClassOperationData:
          requestUrl + "/foreground/subject/exportClassOperationData",
        listTeacherSalary: requestUrl + "/foreground/finance/listTeacherSalary",
        exportTeacherSalary:
          requestUrl + "/foreground/finance/exportTeacherSalary",
        getTeacherById: requestUrl + "/foreground/signup/getTeacherById",
        deleteOtherOrder:
          requestUrl + "/foreground/businessquery/deleteOtherOrder",
        resetPassword: requestUrl + "/user/staff/resetPassword",
        getAttendClassList:
          requestUrl + "/foreground/changeclass/getAttendClassList",
        exportLength: requestUrl + "/common/export/exportLength",
        listExportRecord: requestUrl + "/common/export/listExportRecord",
        getBank: requestUrl + "/common/bank/getBank",
        studentIsRepeat: requestUrl + "/frontDesk/student/studentIsRepeat",
        listFinancialConfirmationByOrgan:
          requestUrl + "/foreground/finance/listFinancialConfirmationByOrgan",
        listFinancialConfirmationByClass:
          requestUrl + "/foreground/finance/listFinancialConfirmationByClass",
        exportFinancialConfirmation:
          requestUrl + "/foreground/finance/exportFinancialConfirmation",
        editChargeItem: requestUrl + "/setting/chargeItem/editChargeItem",
        listChargeItem: requestUrl + "/setting/chargeItem/listChargeItem",
        deleteChargeItem: requestUrl + "/setting/chargeItem/deleteChargeItem",
        changePayment: requestUrl + "/finance/signuporder/changePayment",
        changeOtherPayment:
          requestUrl + "/finance/signuporder/changeOtherPayment",
        findSchoolListByAreaId:
          requestUrl + "/setting/fianceBody/findSchoolListByAreaId",
        editSchoolFinanceBody:
          requestUrl + "/setting/fianceBody/editSchoolFinanceBody",
        createAndUpdateRate:
          requestUrl + "/setting/fianceBody/createAndUpdateRate",
        getRateList: requestUrl + "/setting/fianceBody/getRateList",
        deleteRate: requestUrl + "/setting/fianceBody/deleteRate",
        findSignInList: requestUrl + "/finance/signuporder/findSignInList",
        exportSignInList: requestUrl + "/finance/signuporder/exportSignInList",
        getFinanceChangeSummaryInfo:
          requestUrl + "/finance/signuporder/getFinanceChangeSummaryInfo",
        getFinanceChangeSummaryInfoDetails:
          requestUrl +
          "/finance/signuporder/getFinanceChangeSummaryInfoDetails",
        exportFinanceChangeSummaryInfo:
          requestUrl + "/finance/signuporder/exportFinanceChangeSummaryInfo",
        exportFinanceChangeSummaryInfoDetails:
          requestUrl +
          "/finance/signuporder/exportFinanceChangeSummaryInfoDetails",
        confirmIncomeStatement:
          requestUrl + "/finance/signuporder/confirmIncomeStatement",
        exportConfirmIncomeStatement:
          requestUrl + "/finance/signuporder/exportConfirmIncomeStatement",
        exportFinanceConfirmSign:
          requestUrl + "/finance/signuporder/exportFinanceConfirmSign",
        exportOtherRefundRecord:
          requestUrl + "/foreground/refund/exportOtherRefundRecord",
        exportStepFinanceRefundRecord:
          requestUrl + "/foreground/refund/exportStepFinanceRefundRecord",
        exportBigRefundOrder:
          requestUrl + "/foreground/refund/exportBigRefundOrder",
        getRefundImportList:
          requestUrl + "/foreground/finance/getRefundImportList",
        getRefundImportListConfirm:
          requestUrl + "/foreground/finance/getRefundImportListConfirm",
        queryTeacherlevels:
          requestUrl + "/setting/teacherlevel/queryTeacherlevels",
        queryTeacherlevelHistory:
          requestUrl + "/setting/teacherlevel/queryTeacherlevelHistory",
        deleteTeacherlevelHistory:
          requestUrl + "/setting/teacherlevel/deleteTeacherlevelHistory",
        editAndAddTeacherlevelHistory:
          requestUrl + "/setting/teacherlevel/editAndAddTeacherlevelHistory",
        getTeacherSalaryDetail:
          requestUrl + "/foreground/finance/getTeacherSalaryDetail",
        listTeacherSalaryByCampus:
          requestUrl + "/foreground/finance/listTeacherSalaryByCampus",
        exportTeacherSalaryDetail:
          requestUrl + "/foreground/finance/exportTeacherSalaryDetail",
        exportTeacherSalaryByCampus:
          requestUrl + "/foreground/finance/exportTeacherSalaryByCampus",
        exportQueryTeacherlevelHistory:
          requestUrl + "/setting/teacherlevel/exportQueryTeacherlevelHistory",
        exportSignInRecord:
          requestUrl + "/foreground/finance/exportSignInRecord",
        exportTurnClassHistory:
          requestUrl + "/foreground/changeclass/exportTurnClassHistory",
        checkIsHaveTurnClass:
          requestUrl + "/foreground/changeclass/checkIsHaveTurnClass",
        turnClassToNowClass:
          requestUrl + "/foreground/changeclass/turnClassToNowClass",
        listStudentSignupAttendClass:
          requestUrl + "/foreground/student/listStudentSignupAttendClass",
        exportStaff: requestUrl + "/user/staff/exportStaff",
        exportTeachers: requestUrl + "/user/teacher/exportTeachers",
        bigRefundReset: requestUrl + "/foreground/refund/bigRefundReset"
      },
      constants: { source: "PC" }
    }; //获取其他收费, //其他收费退费, //查询其他收费退费审核, //其他收费退费审核, //其他收费退费发放, //课程管理 //报名 //缴费 v-2.0 //在读班级 //修改缴费截止时间 //转班调课时获取班级信息 //获取未缴费的所有订单 //候补转入报名 // 获取学员详情 //更改报名表状态 //查询其他收费 // 老师模块 //登陆入口 //退出登录 //修改密码 //获取所有的菜单 //管理机构信息/校区管理/分校管理 //员工管理 //获取老师列表 //添加/修改老师列表 //删除老师 //冻结老师 //获取民族接口 // 查询班级所属教师 //角色管理 //获取员工列表 //添加/修改员工列表 //删除员工 //获取角色列表 //新增/修改角色 //删除角色列表 //获取区域导航列表getAreaNav: requestUrl + "/setting/adminOrgan/areanav", //获取区域导航列表 // 优惠设置 //缴退费总览 //业务量查询 // 业务量查询图表 //缴费查询 //缴费订单查询 // 退款记录详情查询 // 业务查询列表导出 // 老师级别管理 // 保存优惠 //查询老师级别列表 //新增/修改老师级别 //删除老师级别 // 退款审核 //获取管理机构信息列表 //删除校区或分校信息 //新增/修改分校信息列表 //财务主体 // 退款发放 //教室管理 //查询教室列表 //新增/修改教室 //删除教室 //重置密码 //获取课次信息 //导出数据的长度 //导出记录 //财务确认按校区 //财务确认按班级 //导出财务确认 //编辑新增收费项目 //收费项目 //删除收费项目 //学生管理 //查询教室列表 //新增/修改教室 //删除教室 //批量保存课程周期 // 查询班级时间安排规律 // 批量修改单次课 //查询网报时间 //编辑网报时间 //编辑网报时间 //报名选班 //editStudent:requestUrl+"/frontDesk/student/editStudent",//新增/修改学生 //查询学生 //payment:requestUrl+"/frontDesk/signupOrder/payment",//缴费 v-1.0 //删除学生 //安排学生试听 //学生请假 //学生退费 //修改分数 //报名表 //报名选班提交事件 //班级管理 //报名表查询 //报名表删除 //转班 //调课 // 取消调课 //获取课程安排时间 //请假 //退费 //退款 //缴费 // 查询班级学生详情 //查询班级 //查询班级 // 根据ID查询到班级 //新增/修改班级 //删除班级 //上架下架班级 //批量操作 //复制操作 //班级查询时间段 //课节安排 //开班查询教师列表 //开班查询时间段 //签到管理 //导出学员信息 //queryNoRenew:requestUrl+"/data/payment/queryNoRenew", //未续报查询 //转班查询 //获取某天的时间段 //获取某天上课信息 //所有人员及课程信息 //签到 //调课查询 //转班历史查询 //未续报查询 //调课历史查询 // 订单管理 //常量管理 //未续报查询 //查询常量信息 //新增/修改常量信息 //删除常量信息 // 订单时间修改 // 导出订单 // 校区对账 // 校区对账查询 // 导出班级 // 导出学生列表 // 导出转班列表 // 导出调课列表 // 导出退款查询记录 //时间段管理 //上传文件 // 日期安排表 //查询时间段 //新增/修改时间段 //删除时间段 //详情时间段 //学员管理 //日期安排表 //新增/修改日期安排表 //删除日期安排表 //公办学校 //查询学员信息 //个人信息查询学员信息 //编辑学员信息 //删除学员信息 //编辑学员成绩 //家长管理 //查询学校信息 //新增学校信息 //删除学校信息 //获取省市行政区导航列表 //获取市 //获取行政区 //优惠卷 //查询家长信息 //删除家长信息 //查询学生管理 //用户优惠券 //查询优惠卷信息 //修改/增加优惠券信息 //删除优惠券信息 //发放优惠券 //支付管理 //退款管理 //收入情况 //收入情况导出 //未交费 //editRefundRecord:requestUrl+"/data/refund/editRefundRecord", //查询退款审核成功 //审核是否通过 //editRefundRecord:requestUrl+"/data/refund/editRefundRecord", //业务量查询列表 //发放退款 //班级管理导出数据 //上传文件 //打开并预览 //导出教室 //导出学生签到 //查看教室 //学科 //教师课酬 //导出学员运营数据 //导出班级运营数据 //按校区导出 //教师详情
  }
};
