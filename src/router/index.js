// import Vue from "vue";
// import Router from "vue-router";

// Vue.use(Router);

export default new VueRouter({
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/login",
      component: resolve => require(["../pageModel/admin/Login.vue"], resolve)
    },
    {
      //密码修改
      path: "/test",
      component: resolve => require(["../pageModel/common/Home.vue"], resolve),
      children: [
        {
          path: "/changepassword",
          component: resolve =>
            require(["../pageModel/admin/ChangePassword.vue"], resolve),
          meta: {
            title: "修改密码",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        }
      ]
    },
    {
      //前台
      path: "/frontOffice",
      component: resolve => require(["../pageModel/common/Home.vue"], resolve),
      meta: {
        title: "前台系统"
      },
      children: [
        {
          //报名
          path: "/apply",
          component: resolve =>
            require(["../pageModel/frontOffice/Apply.vue"], resolve),
          meta: {
            title: "报名",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          //报名-> 学员详情
          path: "/studentInfo",
          component: resolve =>
            require(["../pageModel/frontOffice/StudentInfo.vue"], resolve),
          meta: {
            title: "学员详情"
          },
          children: [
            {
              path: "classQuery", // 查询班级
              component: resolve =>
                require(["../pageModel/frontOffice/ClassQuery.vue"], resolve),
              meta: {
                title: "班级查询",
                requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
              }
            },
            {
              path: "attendClass", //在读班级
              component: resolve =>
                require(["../pageModel/frontOffice/AttendClass.vue"], resolve),
              meta: {
                title: "在读班级",
                requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
              }
            },
            {
              path: "notPayClass", //未缴费班级
              component: resolve =>
                require(["../pageModel/frontOffice/NotPayClass.vue"], resolve),
              meta: {
                title: "未缴费班级",
                requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
              }
            },
            {
              path: "payFinish", //支付完成
              component: resolve =>
                require(["../pageModel/frontOffice/PayFinish.vue"], resolve),
              meta: {
                title: "支付完成",
                requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
              }
            },
            {
              path: "finishedClass", //已结课记录
              component: resolve =>
                require([
                  "../pageModel/frontOffice/FinishedClass.vue"
                ], resolve),
              meta: {
                title: "已结课记录",
                requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
              }
            },
            {
              path: "revokeRecord", //撤单记录
              component: resolve =>
                require(["../pageModel/frontOffice/RevokeRecord.vue"], resolve),
              meta: {
                title: "撤单记录",
                requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
              }
            },
            {
              path: "classRecord", //调课记录
              component: resolve =>
                require(["../pageModel/frontOffice/ClassRecord.vue"], resolve),
              meta: {
                title: "调课记录",
                requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
              }
            },
            {
              path: "classTransferRecord", //转班记录
              component: resolve =>
                require([
                  "../pageModel/frontOffice/ClassTransferRecord.vue"
                ], resolve),
              meta: {
                title: "转班记录",
                requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
              }
            },
            {
              path: "repairRecord", //候补记录
              component: resolve =>
                require(["../pageModel/frontOffice/RepairRecord.vue"], resolve),
              meta: {
                title: "候补记录",
                requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
              }
            },
            {
              path: "collectionClass", //收藏班级
              component: resolve =>
                require([
                  "../pageModel/frontOffice/CollectionClass.vue"
                ], resolve),
              meta: {
                title: "收藏班级",
                requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
              }
            },
            {
              path: "refundInfo", //退费记录
              component: resolve =>
                require(["../pageModel/frontOffice/RefundRecord.vue"], resolve),
              meta: {
                title: "退费记录",
                requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
              }
            },
            {
              path: "otherCharges", //其他收费记录
              component: resolve =>
                require(["../pageModel/frontOffice/OtherCharge.vue"], resolve),
              meta: {
                title: "其他收费记录",
                requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
              }
            },
            {
              path: "orderList", //订单
              component: resolve =>
                require(["../pageModel/frontOffice/OrderList.vue"], resolve),
              meta: {
                title: "订单",
                requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
              }
            }
          ]
        },
        {
          //报名-> 新增学生
          path: "/addStudent",
          component: resolve =>
            require(["../pageModel/frontOffice/AddStudent.vue"], resolve),
          children: [
            {
              //
              path: "classQuery",
              component: resolve =>
                require(["../pageModel/frontOffice/ClassQuery.vue"], resolve),
              meta: {
                requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
              }
            }
          ]
        },
        {
          //其他收费
          path: "/otherCosts",
          component: resolve =>
            require(["../pageModel/frontOffice/OtherCosts.vue"], resolve),
          meta: {
            title: "其他收费",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          //班级查询
          path: "/classQuery",
          component: resolve =>
            require(["../pageModel/frontOffice/ClassQueryCopy.vue"], resolve),
          meta: {
            title: "班级查询",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          //未缴费管理
          path: "/noApply",
          component: resolve =>
            require(["../pageModel/frontOffice/NoApply.vue"], resolve),
          meta: {
            title: "未缴费管理",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          //候补管理
          path: "/alternateMag",
          component: resolve =>
            require(["../pageModel/frontDesk/AlternateMag.vue"], resolve),
          meta: {
            title: "候补管理",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          //未续报查询
          path: "/unreportedQuery",
          component: resolve =>
            require(["../pageModel/frontOffice/UnreportedQuery.vue"], resolve),
          meta: {
            title: "未续报查询",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          //转班查询
          path: "/classTransferQuery",
          component: resolve =>
            require(["../pageModel/frontOffice/TurnClassHistory.vue"], resolve),
          meta: {
            title: "转班查询",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          //调课查询
          path: "/classSwitchingQuery",
          component: resolve =>
            require([
              "../pageModel/frontOffice/ClassSwitchingQuery.vue"
            ], resolve),
          meta: {
            title: "调课查询",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          //签到管理
          path: "/registrationSystem",
          component: resolve =>
            require([
              "../pageModel/frontOffice/RegistrationSystem.vue"
            ], resolve),
          meta: {
            title: "签到管理",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          //缴退费总览
          path: "/allApply",
          component: resolve =>
            require(["../pageModel/setting/AllApply.vue"], resolve),
          meta: {
            title: "业务查询,缴退费总览",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          //业务量查询
          path: "/portfolio",
          component: resolve =>
            require(["../pageModel/setting/Portfolio.vue"], resolve),
          meta: {
            title: "业务查询,业务量查询",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          //业务量查询列表
          path: "/returnPremiumQueryList",
          component: resolve =>
            require(["../pageModel/dataExam/inquireList.vue"], resolve),
          meta: {
            title: "业务查询,业务量查询列表",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          //退费查询
          path: "/returnPremiumQuery",
          component: resolve =>
            require(["../pageModel/dataExam/QueryMoney.vue"], resolve),
          meta: {
            title: "业务查询,退费查询",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          //缴费查询
          path: "/applyQuery",
          component: resolve =>
            require(["../pageModel/setting/applyQuery.vue"], resolve),
          meta: {
            title: "业务查询,缴费查询",
            requireAuth: true // 添加该字段，表示进入这个Portfolio.vue路由是需要登录的
          }
        },
        {
          //校区对账
          path: "/campusIncome",
          component: resolve =>
            require(["../pageModel/setting/applyQuery.vue"], resolve),
          meta: {
            title: "业务查询,校区对账",
            requireAuth: true // 添加该字段 ，表示进入这个Portfolio.vue路由是需要登录的
          }
        },
        {
          //优惠设置
          path: "/preferentialSettings",
          component: resolve =>
            require([
              "../pageModel/frontOffice/preferentialSettings.vue"
            ], resolve),
          meta: {
            title: "优惠设置",
            requireAuth: true // 添加该字段，表示进入这个Portfolio.vue路由是需要登录的
          }
        }
      ]
    },
    {
      //后台系统
      path: "/educationalAdministration",
      component: resolve => require(["../pageModel/common/Home.vue"], resolve),
      meta: {
        title: "后台系统"
      },
      children: [
        {
          path: "/classroomManagement", //教室管理
          component: resolve =>
            require(["../pageModel/setting/ClassRome.vue"], resolve),
          meta: {
            title: "教室管理",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: "/teacherM", //教师管理
          component: resolve =>
            require(["../pageModel/setting/TeachersManagement.vue"], resolve),
          meta: {
            title: "教师管理,教师管理",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: "/SLM", //教师级别管理
          component: resolve =>
            require(["../pageModel/setting/TeacherLevel.vue"], resolve),
          meta: {
            title: "教师管理,教师级别管理",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: "/classStatistics", //课时统计
          component: resolve =>
            require(["../pageModel/setting/ClassHourCount.vue"], resolve),
          meta: {
            title: "教师管理,课时统计",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: "/analyse", //三率分析
          component: resolve =>
            require(["../pageModel/setting/ThreeRateAnalysis.vue"], resolve),
          meta: {
            title: "教师管理,三率分析",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: "/classM", // 班级管理
          component: resolve =>
            require(["../pageModel/eduadmin/ClassMag.vue"], resolve),
          meta: {
            title: "课程管理,班级管理",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: "/editClass", // 新增/修改班级
          component: resolve =>
            require(["../pageModel/eduadmin/EditClass.vue"], resolve),
          meta: {
            title: "课程管理,新增/修改班级",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: "/courseCategory&certificate", //课程分类与班型
          component: resolve =>
            require(["../pageModel/frontDesk/ClassType.vue"], resolve),
          meta: {
            title: "课程管理,课程分类与班型",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: "/courseArrangement", // 课程安排规律
          component: resolve =>
            require(["../pageModel/frontDesk/DateSlot.vue"], resolve),
          meta: {
            title: "课程管理,课程安排规律",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: "/timeM", // 时间段管理
          component: resolve =>
            require(["../pageModel/frontDesk/TimeSlot.vue"], resolve),
          meta: {
            title: "课程管理,时间段管理",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: "/studentsInformation", // 学员信息管理
          component: resolve =>
            require(["../pageModel/frontOffice/StudentIfoManage.vue"], resolve),
          meta: {
            title: "学员信息管理",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: "/timeManagement", //网报时间维护
          component: resolve =>
            require(["../pageModel/setting/NetTime.vue"], resolve),
          meta: {
            title: "网报时间维护",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: "/specialOffer",
          component: resolve =>
            require(["../pageModel/appFundation/appCoupon.vue"], resolve),
          meta: {
            title: "优惠券",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: "/appStudentCoupon",
          component: resolve =>
            require([
              "../pageModel/appFundation/appStudentCoupon.vue"
            ], resolve),
          meta: {
            title: "优惠券查询",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: "/branchschool", //分校管理
          component: resolve =>
            require(["../pageModel/setting/BranchSchool.vue"], resolve),
          meta: {
            title: "分校管理",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        }
      ]
    },
    {
      //APP管理
      path: "/appFundation",
      component: resolve => require(["../pageModel/common/Home.vue"], resolve),
      meta: {
        title: "APP管理"
      },
      children: [
        {
          path: "/smallSchoolProject",
          component: resolve =>
            require(["../pageModel/appFundation/appPublicClass.vue"], resolve),
          meta: {
            title: "中小学生设置",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          //家长管理
          path: "/parentsManagement",
          component: resolve =>
            require(["../pageModel/appFundation/ParentsMag.vue"], resolve),
          meta: {
            title: "家长管理",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          //POS机管理
          path: "/posManage",
          component: resolve =>
            require(["../pageModel/setting/PosManage.vue"], resolve),
          meta: {
            title: "POS机管理",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        }
      ]
    },
    {
      //财务
      path: "/dataExam",
      component: resolve => require(["../pageModel/common/Home.vue"], resolve),
      meta: {
        title: "财务"
      },
      children: [
        {
          //退款审核
          path: "/processRefund",
          component: resolve =>
            require(["../pageModel/dataExam/NotPayment.vue"], resolve),
          meta: {
            title: "退款审核",
            requireAuth: true //添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          //退款发放
          path: "/giveRefund",
          component: resolve =>
            require(["../pageModel/dataExam/Reimburse.vue"], resolve),
          meta: {
            title: "退款发放",
            requireAuth: true //添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          //退款管理
          path: "/queryMoney",
          component: resolve =>
            require(["../pageModel/dataExam/QueryMoney.vue"], resolve),
          meta: {
            title: "退款查询",
            requireAuth: true //添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          //收入情况
          path: "/income",
          component: resolve =>
            require(["../pageModel/dataExam/Incomecondition.vue"], resolve),
          meta: {
            title: "收入情况",
            requireAuth: true //添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          //教师课酬
          path: "/lessonTeacherPay",
          component: resolve =>
            require(["../pageModel/dataExam/LessonTeacherPay.vue"], resolve),
          meta: {
            title: "教师课酬",
            requireAuth: true //添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          //教师课酬详情
          path: "/lessonPayDetails",
          component: resolve =>
            require(["../pageModel/dataExam/lessonPayDetails.vue"], resolve),
          meta: {
            title: "课酬详情",
            requireAuth: true //添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          //教师课酬详情
          path: "/campusPayDetails",
          component: resolve =>
            require(["../pageModel/dataExam/CampusPayDetails.vue"], resolve),
          meta: {
            title: "课酬详情",
            requireAuth: true //添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          //财务确认
          path: "/financialConfirmation",
          component: resolve =>
            require(["../pageModel/dataExam/FinancialConfirm.vue"], resolve),
          meta: {
            title: "财务确认",
            requireAuth: true //添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          //财务统计
          path: "/financialStatistics",
          component: resolve =>
            require(["../pageModel/dataExam/FinancialStatistics.vue"], resolve),
          meta: {
            title: "财务统计",
            requireAuth: true //添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          //财务主体
          path: "/financialBody",
          component: resolve =>
            require(["../pageModel/dataExam/FinanceMain.vue"], resolve),
          meta: {
            title: "财务主体",
            requireAuth: true //添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          //费率设置
          path: "/ratesSet",
          component: resolve =>
            require(["../pageModel/dataExam/RateSetting.vue"], resolve),
          meta: {
            title: "费率设置",
            requireAuth: true //添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          //跨区转班
          path: "/crossOrganTurnClass",
          component: resolve =>
            require(["../pageModel/dataExam/DistrictChangeClass.vue"], resolve),
          meta: {
            title: "财务管理,跨区转班",
            requireAuth: true //添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: "/chargeItem",
          component: resolve =>
            require(["../pageModel/setting/ChargeProject.vue"], resolve),
          meta: {
            title: "收费项目",
            requireAuth: true
          }
        },
        {
          //签到查询
          path: "/signQuery",
          component: resolve =>
            require(["../pageModel/dataExam/SignQuery.vue"], resolve),
          meta: {
            title: "签到记录",
            requireAuth: true //添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          //变动记录
          path: "/changeRecord",
          component: resolve =>
            require(["../pageModel/dataExam/ChangeRecord.vue"], resolve),
          meta: {
            title: "变动记录",
            requireAuth: true //添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          //订单管理
          path: "/financeOrderManage",
          component: resolve =>
            require(["../pageModel/dataExam/FinanceOrderManage.vue"], resolve),
          meta: {
            title: "订单管理",
            requireAuth: true //添加该字段，表示进入这个路由是需要登录的
          }
        }
      ]
    },
    {
      //admin管理
      path: "/managementCenter",
      component: resolve => require(["../pageModel/common/Home.vue"], resolve),
      meta: {
        title: "admin"
      },
      children: [
        {
          path: "/sysconst", // 常量管理
          component: resolve =>
            require(["../pageModel/setting/SysconstManage.vue"], resolve),
          meta: {
            title: "常量管理",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: "/schoolManagement", //校区管理
          component: resolve =>
            require(["../pageModel/setting/Campus.vue"], resolve),
          meta: {
            title: "校区管理",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: "/userGroup", //角色管理
          component: resolve =>
            require(["../pageModel/user/Role.vue"], resolve),
          meta: {
            title: "角色",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: "/userManagement", //用户管理
          component: resolve =>
            require(["../pageModel/user/User.vue"], resolve),
          meta: {
            title: "用户管理",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: "/orderManage", //订单管理
          component: resolve =>
            require(["../pageModel/frontDesk/OrderManage.vue"], resolve),
          meta: {
            title: "订单管理",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: "/userRoleManage", //修改权限
          component: resolve =>
            require(["../pageModel/user/UserRoleManage.vue"], resolve),
          meta: {
            title: "权限修改",
            requireAuth: true
          }
        },
        {
          path: "/exportRecord", //导出数据
          component: resolve =>
            require(["../pageModel/user/ExportData.vue"], resolve),
          meta: {
            title: "导出记录",
            requireAuth: true
          }
        }
      ]
    },
    {
      //学科
      path: "/subject",
      component: resolve => require(["../pageModel/common/Home.vue"], resolve),
      meta: {
        title: "学科",
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      children: [
        {
          path: "/studentOperationData",
          component: resolve =>
            require(["../pageModel/setting/StudentOperationData.vue"], resolve),
          meta: {
            title: "学员运营数据",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: "/classOperationData",
          component: resolve =>
            require(["../pageModel/setting/ClassOperationData.vue"], resolve),
          meta: {
            title: "班级运营数据",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        }
      ]
    },
    {
      path: "/educational", //教务管理
      component: resolve => require(["../pageModel/common/Home.vue"], resolve),
      meta: {
        title: "教务管理"
      },
      children: [
        {
          path: "/courseManagement", // 课程管理
          component: resolve =>
            require(["../pageModel/frontDesk/CourseMgt.vue"], resolve),
          meta: {
            title: "课程管理",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: "/schoolmanage",
          component: resolve =>
            require(["../pageModel/setting/SchoolManage.vue"], resolve),
          meta: {
            title: "",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: "/provicemanage",
          component: resolve =>
            require(["../pageModel/setting/provice.vue"], resolve),
          meta: {
            title: "",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        }
      ]
    },
    {
      path: "/eduadmin",
      component: resolve => require(["../pageModel/common/Home.vue"], resolve),
      children: [
        {
          path: "/chooseClass", //报名选班
          component: resolve =>
            require(["../pageModel/eduadmin/ChooseClass.vue"], resolve),
          meta: {
            title: "报名选班",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: "/adjustSchedule", //转班/调课
          component: resolve =>
            require(["../pageModel/eduadmin/AdjustSchedule.vue"], resolve),
          meta: {
            title: "转班/调课",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: "/turnClass", //转班
          component: resolve =>
            require(["../pageModel/frontDesk/TurnClass.vue"], resolve),
          meta: {
            title: "转班",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: "/turnAttendClass", //上课班级
          component: resolve =>
            require(["../pageModel/frontDesk/TurnAttendClass.vue"], resolve),
          meta: {
            title: "上课班级",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: "/editStudent", // 学员信息管理
          component: resolve =>
            require(["../pageModel/frontOffice/EditStudent.vue"], resolve),
          meta: {
            title: "学员信息管理",
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        }
      ]
    },
    {
      path: "/data",
      component: resolve => require(["../pageModel/common/Home.vue"], resolve),
      children: [
        {
          path: "/dataPay",
          component: resolve =>
            require(["../pageModel/data/dataPay.vue"], resolve),
          meta: {
            title: "",
            requireAuth: true //添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: "/dataRefund",
          component: resolve =>
            require(["../pageModel/data/dataRefund.vue"], resolve),
          meta: {
            title: "",
            requireAuth: true //添加该字段，表示进入这个路由是需要登录的
          }
        }
      ]
    },
    {
      path: "/*",
      component: resolve =>
        require(["../pageModel/common/NotFoundComponent.vue"], resolve)
    }
  ]
});
