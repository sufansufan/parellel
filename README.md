# 中心管理系统

基于 Vue.js 2.x 系列 + Element UI 的后台管理系统解决方案

- 主色调: 3C92E0
- 辅色调: 1c5db7
- 文字: A5A5A5
- 深色背景: 262B2F

## 数据存储记录

- 登陆状态

  - vuex 的**isLogin**
  - seesionStorage 的**isLogin**
  - test

## url 路径对应

- frontOffice //前台系统
  - Apply.vue // 前台
  - StudentInfo.vue // 学生详情
  - ClassQuery.vue //班级查询
  - AddStudent.vue //新增学生
  - LessonSingle.vue //班级查询时下方出现的[购课单]

## 复制粘贴的代码集合

1. 筛选条件所需的数据

   > 动态加载,存储到 vuex 中,如果已经存在,则不做处理

```javascript
this.Util.querySysconst(this, "012", this.$store.state.PaymentTypeOptions); //查询支付方式
this.Util.querySysconst(this, "021", this.$store.state.KnowChannleOptions); //查询了解渠道
this.Util.querySysconst(this, "100", this.$store.state.SubjectOptions); //查询科目
this.Util.querySysconst(this, "006", this.$store.state.SeasonOptions); //查询季节
this.Util.querySysconst(this, "009", this.$store.state.PeriodsOptions); //查询期别
this.Util.querySysconst(this, "101", this.$store.state.GradeOptions); //查询年级
this.Util.querySysconst(this, "002", this.$store.state.CourseTypeOptions); //查询课型
this.Util.querySysconst(this, "003", this.$store.state.ClassTypeOptions); //查询班型
this.Util.querySysconst(this, "007", this.$store.state.DepartmentOptions); //查询学部
this.Util.querySysconst(this, "025", this.$store.state.LiberalTypeOptions); //优惠类型
this.Util.querySysconst(
  this,
  "024",
  this.$store.state.TurnClassConditionOptions
); //转班条件
this.Util.querySysconst(this, "001", this.$store.state.ProjectTypeOptions); //项目类型类别不限
this.Util.querySysconst(this, "026", this.$store.state.ChargeItemOptions); //收费项目
```

2. ajax 请求集合

   > 发送 ajax 请求

```javascript
let objData = {};
console.log("****发起请求的参数", objData);
this.$axios.post(this.GlobalVal.httpLink.待定, JSON.stringify(objData)).then(
  res => {
    if (res.data.code === "10000") {
      console.log("****获取的对象", res.data);
      self.count = res.data.count;
      self.dataList = res.data.pxxClasses;
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
```
