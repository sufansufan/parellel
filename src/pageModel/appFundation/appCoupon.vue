<template>
    <div class="table">
        <div class="handle-box">
            <el-button type="primary" size="mini" icon="plus" class="handle-del mr10" @click="handleAdd">新增</el-button>
            <el-button type="primary" size="mini" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
            <el-button type="primary" size="mini" icon="delete" class="handle-del mr10" @click="coupon">分发优惠券</el-button>
            <div class="search-warp">
                <el-input v-model="coupon_name" size="small" class="handle-input mr10" @keyup.enter.native="search" placeholder="输入要搜索的优惠券名称"></el-input>
                <el-button type="primary" size="mini" icon="search" @click="search">搜索</el-button>
            </div>
        </div>
        <el-table :data="data" size="mini" stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="优惠券名称">
                <template slot-scope="scope">
                    <div style="cursor: pointer; color: #3692e8;" @click="goCouponInfo(scope.row)">{{scope.row.coupon_name}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="coupon_amount" label="老带新面值"></el-table-column>
            <el-table-column prop="coupon_amount_new" label="老带新新面值"></el-table-column>
            <el-table-column prop="need_consume" label="满多少使用"></el-table-column>
            <el-table-column prop="begin_date" label="开始使用日期"></el-table-column>
            <el-table-column prop="end_date" label="截止使用日期"></el-table-column>
            <el-table-column prop="plan_send_number" label="计划发放个数"></el-table-column>
            <el-table-column prop="real_send_number" label="实际发放个数"></el-table-column>
            <el-table-column prop="reason" label="发放理由"></el-table-column>
            <el-table-column prop="staff_name" label="发放人"></el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">修改
                    </el-button>
                    <el-button size="mini" type="primary" @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <div class="pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :total="count" :page-size="cur_limit" :page-sizes="[10,20,30,50]">
            </el-pagination>
        </div>
        <!--添加/修改弹出框-->
        <transition name="el-fade-in-linear">
            <div v-show="addTeamLayer" class="bg-layer">
                <transition name="el-zoom-in-center">
                    <div v-if="addTeamLayer" class="transition-box">
                        <div class="title-warp">
                            <div class="close-btn" @click="addTeamLayer=!addTeamLayer">
                                <i class="el-icon-close"></i>
                            </div>
                            <h3 v-if="!changeTeamLayer" class="modify-title">新增优惠券信息</h3>
                            <h3 v-if="changeTeamLayer" class="modify-title">修改优惠券信息</h3>
                        </div>
                        <el-form :model="ruleForm" :rules="rules" size="mini" ref="ruleForm" label-width="100px" style="height: 520px;padding-right: 20px;padding-top: 30px">
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="优惠券面值" prop="coupon_amount">
                                        <el-input clearable v-model="ruleForm.coupon_amount"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="老带新新面值" prop="coupon_amount_new">
                                        <el-input clearable v-model="ruleForm.coupon_amount_new"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="优惠券名称" prop="coupon_name">
                                        <el-input clearable v-model="ruleForm.coupon_name"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="优惠券描述" prop="coupon_description">
                                        <el-input clearable v-model="ruleForm.coupon_description"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="满多少使用" prop="need_consume">
                                        <el-input clearable v-model="ruleForm.need_consume"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="发放日期" prop="send_date">
                                        <el-date-picker v-model="ruleForm.send_date" type="date" placeholder="选择发放日期" style="width: 230px">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="计划发放数" prop="plan_send_number">
                                        <el-input clearable v-model="ruleForm.plan_send_number"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="实际发放个数" prop="real_send_number">
                                        <el-input clearable v-model="ruleForm.real_send_number"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="开始使用日期" prop="begin_date">
                                        <el-date-picker v-model="ruleForm.begin_date" type="date" placeholder="选择开始日期" style="width: 230px">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="结束使用日期" prop="end_date">
                                        <el-date-picker v-model="ruleForm.end_date" type="date" placeholder="选择结束日期" style="width: 230px">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="发放理由" prop="reason">
                                        <el-input clearable v-model="ruleForm.reason"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="优惠券所在组" prop="group_num">
                                        <el-input clearable v-model="ruleForm.group_num"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="优惠券类型">
                                        <el-select clearable v-model="ruleForm.coupon_type" size="mini" placeholder="请选择" style="width: 100%;">
                                            <el-option v-for="item in $store.state.couponTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="是否有效">
                                        <el-switch clearable v-model="isvalid" class="switch"></el-switch>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="发放省" prop="province_no">
                                        <el-select clearable v-model="ruleForm.province_no" size="mini" placeholder="请选择省" style="width: 100%;" @change="provinceBlur('ruleForm')">
                                            <el-option v-for="item in provinceList" :key="item.province_no" :label="item.province_name" :value="item.province_no">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="发放市" prop="city_no">
                                        <el-select clearable v-model="ruleForm.city_no" size="mini" placeholder="请选择市" style="width: 100%;" @change="cityBlur('ruleForm')">
                                            <el-option v-for="item in cityList" :key="item.city_no" :label="item.city_name" :value="item.city_no">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-form-item>
                                <el-button v-if="!changeTeamLayer" type="primary" @click="submitForm('ruleForm')" style="margin-left: 170px;margin-top: 30px;">保存</el-button>
                                <el-button v-if="changeTeamLayer" type="primary" @click="submitForm('ruleForm')" style="margin-left: 170px;margin-top: 30px;">保存</el-button>
                                <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
                                <el-button @click="addTeamLayer=!addTeamLayer" type="primary">取消</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </transition>
            </div>
        </transition>

        <!--分发优惠券-->
        <transition name="el-fade-in-linear">
            <div v-show="distribute" class="bg-layer">
                <transition name="el-zoom-in-center">
                    <div v-if="distribute" class="coupon-box">
                        <div class="coupon-warp">
                            <div class="close-btn" @click="distribute=!distribute">
                                <i class="el-icon-close"></i>
                            </div>
                            <h3 class="modify-title">分发优惠券</h3>
                            <div class="coupon-center">
                                <el-form :model="ruleForm" :rules="rules" size="mini" ref="ruleForm" label-width="100px" style="height: 50px;">
                                    <el-input v-model="studentName" placeholder="请输入学生姓名" class="inputChange" @blur="studentSearch"></el-input>
                                    <el-input v-model="studentMobile" placeholder="请输入学生电话" class="inputChange" @blur="studentSearch"></el-input>
                                    <el-button type="primary" size="mini" icon="search" @click="choose">搜索</el-button>
                                    <el-button type="primary" size="mini" icon="search" @click="send">分发</el-button>
                                </el-form>
                                <div class="left-coupon">
                                    <el-table :data="couponStudent" size="mini" stripe style="width: 357px;border-radius: 4px;box-sizing: border-box" ref="multipleTable" @selection-change="handleSelectionCoupon">
                                        <el-table-column type="selection" width="55"></el-table-column>
                                        <el-table-column prop="student_name" label="学生姓名" width="150"></el-table-column>
                                        <el-table-column prop="student_no" label="学员编号" width="151"></el-table-column>
                                    </el-table>
                                </div>
                                <div class="right-coupon">
                                    <el-table :data="complentStudent" size="mini" style="width: 357px;border-radius: 4px;box-sizing: border-box">
                                        <el-table-column prop="student_name" label="已发优惠券" width="357">
                                        </el-table-column>
                                    </el-table>
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
  data() {
    return {
      cur_page: 0, //第几页
      cur_limit: 10, //每次查询多少条
      count: 3, //数据的总量
      staffId: "", //用户id3
      coupon_name: "", //优惠券名称
      coupon_type: "", //优惠券类型
      isvalid: true, //优惠券是否有效
      province: "", //省份名称
      city: "", //城市名称
      creator_name: "", //发放者姓名
      group_num: "", //优惠券所在组
      select_word: "", //搜索的值
      studentName: "", //学生姓名
      studentMobile: "", //学生电话
      province_no: "", //省编号
      dataList: [],
      provinceList: [], //省
      cityList: [], //市
      multipleSelection: [], //选中行的集合  即删除行
      distributes: [], //存放优惠券
      distribute: false, //分发试卷弹出框
      complentStudent: [], //已经发放的优惠券
      multipleCoupon: [], //存放选中的学生进行分发
      couponStudent: [],
      addTeamLayer: false, //新增弹出框状态
      changeTeamLayer: false, //修改弹出框状态
      creator_id: "",
      ruleForm: {
        //新增数据
        coupon_id: "",
        coupon_amount: "", //优惠券面值，老带新发给老用户的
        coupon_amount_new: "", //优惠券面值，老带新发给新用户的
        coupon_name: "", //优惠券名称
        coupon_description: "", //优惠券描述
        need_consume: "", //需要消费多少才能使用
        send_date: "", //优惠券实际发放日期
        plan_send_number: "", //优惠券计划发放个数
        real_send_number: "", //优惠券实际发放个数
        begin_date: "", //优惠券有效开始使用日期
        end_date: "", //优惠券有效结束使用日期
        coupon_type: "", //优惠券类型   01501：新用户优惠券  01502：老带新优惠券  01503：活动优惠券  01504：n元体验券
        isvalid: true, //表示优惠券是否有效 true-有效 false-无效
        reason: "", //发放理由
        province_no: "", //发给那个省
        city_no: "", //发给哪个城市
        group_num: "" //优惠券所在组
      },
      //接收当前行的信息
      changeForm2: {},
      //表单校验规则
      rules: {
        school_name: [
          { required: true, message: "请输入学校名称", trigger: "blur" }
        ],
        school_phone: [
          { required: true, message: "请输入学校电话", trigger: "blur" }
        ],
        begin_date: [
          { required: true, message: "请选择开始日期", trigger: "blur" }
        ],
        end_date: [
          { required: true, message: "请选择开始日期", trigger: "blur" }
        ],
        coupon_amount: [
          { required: true, validator: this.Checkout.number2, trigger: "blur" }
        ]
        /*plan_send_number: [
                        {validator: this.Checkout.number3, trigger: 'blur' },
                    ],
                    real_send_number: [
                        {validator: this.Checkout.number3, trigger: 'blur' },
                    ],
                    need_consume: [
                        {validator: this.Checkout.number3, trigger: 'blur' },
                    ],
                    coupon_amount_new: [
                        {validator: this.Checkout.number3, trigger: 'blur' },
                    ],*/
        /*coupon_amount:[
                        { required: true, message: '请选择开始日期', trigger: 'blur'},
                    ],*/
      }
    };
  },
  created() {
    const self = this;
    self.getData();
    self.getData();
    let objData = {
      staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId
    };
    this.$axios
      .post(this.GlobalVal.httpLink.queryProvince, JSON.stringify(objData))
      .then(
        res => {
          if (res.data.code === "10000") {
            console.log("查询学校列表获取的对象", res.data);
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
        d.begin_date = self.Util.TimeCycle(d.begin_date, "ymd");
        d.end_date = self.Util.TimeCycle(d.end_date, "ymd");
        return d;
      });
    }
  },
  watch: {
    changeForm2: function() {
      //修改的参数赋值
      this.ruleForm.coupon_id = this.changeForm2.coupon_id; //优惠券唯一id
      this.ruleForm.coupon_amount = this.changeForm2.coupon_amount; //老带新发给老用户的
      this.ruleForm.coupon_name = this.changeForm2.coupon_name; //优惠券名称
      this.ruleForm.coupon_description = this.changeForm2.coupon_description; //优惠券描述
      this.ruleForm.need_consume = this.changeForm2.need_consume; //满足多少消费可以使用
      this.ruleForm.send_date = this.changeForm2.send_date; //发放日期
      this.ruleForm.plan_send_number = this.changeForm2.plan_send_number; //计划发放个数
      this.ruleForm.real_send_number = this.changeForm2.real_send_number; //实际发放个数
      this.ruleForm.begin_date = this.changeForm2.begin_date; //开始使用日期
      this.ruleForm.end_date = this.changeForm2.end_date; //结束使用日期
      this.ruleForm.coupon_type = this.changeForm2.coupon_type; //优惠券的类型
      this.ruleForm.isvalid = this.changeForm2.isvalid; //优惠券是否有效
      this.ruleForm.reason = this.changeForm2.reason; //发放理由
      this.ruleForm.province_no = this.changeForm2.province_no; //发给那个省
      this.ruleForm.city_no = this.changeForm2.city_no; //发给哪个城市
      this.ruleForm.group_num = this.changeForm2.group_num || 0; //优惠券所在组
      this.ruleForm.coupon_amount_new = this.changeForm2.coupon_amount_new;
    }
    /*  studentName:function () {
                this.coupon();
            },
            studentMobile:function () {
                this.coupon();
            }*/
  },
  methods: {
    //获取数据
    getData() {
      const self = this;
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        page: this.cur_page, //页数
        limit: this.cur_limit, //条目数
        coupon_name: this.coupon_name, //优惠券名称
        coupon_type: this.coupon_type, // 优惠券类型
        isvalid: this.isvalid, //  优惠卷是否有效
        province: this.province, //省份名w ]e]称
        city: this.city, //城市名称
        creator_name: this.creator_name, //发放者姓名
        group_num: this.group_num //优惠券所在组
      };
      console.log("查询优惠券发起请求的参数", objData);
      this.$axios
        .post(this.GlobalVal.httpLink.queryCoupon, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              console.log("查询优惠券列表获取的对象", res.data);
              self.count = res.data.count;
              self.dataList = res.data.coupons;
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
    //重新筛选函数
    screening() {
      this.getData();
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
      //this.resetForm("ruleForm");
      this.addTeamLayer = true;
      this.changeTeamLayer = false;
      this.ruleForm.isvalid = true;
      this.ruleForm.coupon_id = ""; //优惠券唯一id
      this.ruleForm.coupon_amount = ""; //老带新发给老用户的
      this.ruleForm.coupon_name = ""; //优惠券名称
      this.ruleForm.coupon_description = ""; //优惠券描述
      this.ruleForm.need_consume = ""; //满足多少消费可以使用
      this.ruleForm.send_date = ""; //发放日期
      this.ruleForm.plan_send_number = ""; //计划发放个数
      this.ruleForm.real_send_number = ""; //实际发放个数
      this.ruleForm.begin_date = ""; //开始使用日期
      this.ruleForm.end_date = ""; //结束使用日期
      this.ruleForm.coupon_type = ""; //优惠券的类型
      this.ruleForm.reason = ""; //发放理由
      this.ruleForm.province_no = ""; //发给那个省
      this.ruleForm.province = ""; //省名称
      this.ruleForm.city_no = ""; //发给哪个城市
      this.ruleForm.city = ""; //城市名称
      this.ruleForm.group_num = ""; //优惠券所在组
      this.ruleForm.coupon_amount_new = "";
      //清空参数
    },
    //修改按钮事件
    handleEdit(index, row) {
      console.log(index, row);
      this.changeTeamLayer = true;
      this.addTeamLayer = true;
      this.changeForm2 = row;
    },
    //新增/修改--提交
    submitForm(formName) {
      console.log(this.$refs[formName]);
      const self = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let objData = {
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            coupon: this.varJug(this.ruleForm),
            source: this.GlobalVal.constants.source //请求方式   Wechat，Android，PC，IOS
          };
          console.log("新增/修改优惠券发起请求的参数", objData);
          this.$axios
            .post(this.GlobalVal.httpLink.editCoupon, JSON.stringify(objData))
            .then(
              res => {
                if (res.data.code === "10000") {
                  console.log("新增/修改优惠券获取的对象", res.data);
                  self.addTeamLayer = false;
                  if (this.changeTeamLayer) {
                    self.$message({
                      type: "success",
                      message: "修改成功"
                    });
                  } else {
                    self.$message({
                      type: "success",
                      message: "新增成功"
                    });
                  }
                  self.getData();
                } else {
                  self.$message({
                    type: "error",
                    message: res.data.errmsg
                  });
                }
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
    varJug(obj) {
      let self = this;
      let o = obj;
      //o.creator_id = JSON.parse(window.sessionStorage.getItem("staff")).staffId;
      //o.province_name = this.util.GetIdNameForValue(this.provinceList,this.province_no,'province_no','province_name');
      //o.city_name = this.util.GetIdNameForValue(this.provinceList,this.city_no,'city_no','city_name');
      /* o.created_at=new Date().getTime();
                o.update_at=new Date().getTime();*/
      return o;
    },
    //删除事件
    handleDelete(index, row) {
      console.log(index, row);
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
                id: row.coupon_id
              }
            ]
          };
          this.$axios
            .post(this.GlobalVal.httpLink.delCoupon, JSON.stringify(objData))
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
            let delTeacher = [];
            for (
              let i = 0, length = self.multipleSelection.length;
              i < length;
              i++
            ) {
              delTeacher.push({
                id: self.multipleSelection[i].coupon_id
              });
            }

            let objData = {
              staffId: JSON.parse(window.sessionStorage.getItem("staff"))
                .staffId,
              delList: delTeacher
            };
            self.multipleSelection = [];
            this.$axios
              .post(this.GlobalVal.httpLink.delCoupon, JSON.stringify(objData))
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
    send() {
      const self = this;
      if (this.multipleCoupon.length > 0) {
        this.$confirm("此操作将优惠券发放给这些名单, 是否继续?", "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          let sendStudent = [];
          for (
            let i = 0, length = self.multipleCoupon.length;
            i < length;
            i++
          ) {
            this.complentStudent.push({
              student_name: self.multipleCoupon[i].student_name
            });
            sendStudent.push({
              id: self.multipleCoupon[i].student_id
            });
          }
          let objData = {
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
            couponID: self.multipleSelection[0].coupon_id,
            studentID: sendStudent
          };
          this.$axios
            .post(
              this.GlobalVal.httpLink.sendStudentCoupon,
              JSON.stringify(objData)
            )
            .then(
              res => {
                if (res.data.code === "10000") {
                  this.$message({
                    type: "success",
                    message: "发放成功!"
                  });
                  this.$router.push({
                    path: "/appStudentCoupon"
                  });
                  self.multipleSelection = [];
                  this.distribute = false;
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
        });
      }
    },
    //将选中的行存储在一个变量中
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSelectionCoupon(val) {
      this.multipleCoupon = val;
    },
    coupon() {
      if (this.multipleSelection.length <= 0) {
        this.$message({
          type: "error",
          message: "请选择优惠券"
        });
      } else {
        this.distribute = true;
        const self = this;
        let objData = {
          staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
          source: "PC", //请求来源
          page: this.cur_page, //页数
          limit: this.cur_limit, //条目数
          studentName: this.studentName, //学生姓名
          studentMobile: this.studentMobile //学生手机号
        };
        console.log("查询报名表发起请求的参数", objData);
        this.$axios
          .post(
            this.GlobalVal.httpLink.queryStudentNameOrMobile,
            JSON.stringify(objData)
          )
          .then(
            res => {
              if (res.data.code === "10000") {
                console.log("查询报名表获取的对象", res.data);
                //self.count = res.data.count;
                self.couponStudent = res.data.students;
              } else {
                console.error(res);
                self.$message({
                  type: "error",
                  message: res.data.errmsg
                });
              }
              self.ErrorCode.requestOverCode(res.data.code);
            },
            res => {
              this.$message("请求失败");
            }
          );
      }
    },
    //重新选择函数
    choose() {
      this.coupon();
    },
    studentSearch() {
      this.coupon();
    },
    search() {
      this.getData();
    },
    provinceBlur(formName) {
      const self = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let objData2 = {
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            province_no: this.ruleForm.province_no
          };
          this.$axios
            .post(this.GlobalVal.httpLink.queryCities, JSON.stringify(objData2))
            .then(
              res => {
                if (res.data.code === "10000") {
                  console.log("查询市列表获取的对象", res.data);
                  self.cityList = res.data.citys;
                  this.$store.commit("setCityList", res.data.citys);
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
    goCouponInfo(row) {
      console.log(row);
      this.$store.commit("setChooseCouponInfo", row);
      this.$router.push({
        path: "/appStudentCoupon",
        query: {
          couponId: row.coupon_id
        }
      });
    }
  }
};
</script>
<style scoped>
.search-warp {
  display: inline-block;
  float: right;
}
.handle-box {
  margin-bottom: 20px;
}
.handle-input {
  width: 300px;
  display: inline-block;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 100px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
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
  width: 700px;
  height: 660px;
  min-height: 580px;
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
.coupon-box {
  position: absolute;
  width: 900px;
  height: 580px;
  min-height: 480px;
  margin: auto;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  border-radius: 4px;
  background-color: #ffffff;
  overflow-y: scroll;
  color: #fff;
  padding-top: 60px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  box-sizing: border-box;
  z-index: 10;
}
.coupon-warp {
  position: absolute;
  width: 900px;
  height: 50px;
  top: 0px;
  right: 0;
  z-index: 10;
  background: #ffffff;
  -webkit-box-shadow: 0px 0px 3px #ccc;
  -moz-box-shadow: 0px 0px 3px #ccc;
  box-shadow: 0px 0px 3px #ccc;
}
.transfer-footer {
  margin-left: 20px;
  padding: 6px 5px;
}
.coupon-center {
  padding: 20px 50px;
}
.left-coupon {
  width: 380px;
  height: 440px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 10px;
  float: left;
}
.right-coupon {
  width: 380px;
  height: 440px;
  float: left;
  border: 1px solid #ebeef5;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 10px;
  margin-left: 40px;
}
.inputChange {
  width: 20%;
  display: inline-block;
}
.inputChange .el-input__inner {
  height: 30px;
}
</style>
<style>
.inputChange .el-input__inner {
  height: 29px;
}
</style>
