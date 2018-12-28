<template>
  <div class="table">
    <div class="handle-box">
      <span class="top-left">总览信息</span>
      <span>大区总数{{schoolnum}}</span>
      <span>城市总数{{branchSchoolnum}}</span>
      <span>校区总数{{campusnum}}</span>
      <div class="top-right">
        <el-button type="primary" size="mini" icon="plus" class="handle-del mr10" @click="handleAdd">新增</el-button>
        <el-button type="primary" size="mini" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
      </div>
    </div>
    <el-row>
      <el-col style="width: 297px;  background: #fff; height: calc(100vh - 150px); padding: 20px 10px;">
        <el-tree :data="location" @node-click="handleClickTree" default-expand-all :expand-on-click-node="false" :render-content="renderContent"></el-tree>
      </el-col>
      <el-col style="width: calc(100% - 327px); height: calc(100vh - 250px); margin-left: 15px;">
        <div style="background:#fff; font-size:16px;font-weight:700;padding-left:18px;padding-top:25px;padding-bottom:15px;">校区{{count}}个</div>
        <el-table :data="data" size="mini" stripe style="width: 100%; height: calc(100% - 72px)" height="650px" ref="multipleTable" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="organ_name" label="教学点名称"></el-table-column>
          <el-table-column prop="office_addr" label="地址"></el-table-column>
          <el-table-column prop="parent_organ_name" label="所属学校"></el-table-column>
          <!--<el-table-column prop="subject" label="科目"></el-table-column>-->
          <el-table-column prop="merchant_no" label="子商户号"></el-table-column>
          <el-table-column prop="created_at" label="创建时间"></el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleEdit(scope.row)">修改
              </el-button>
              <el-button size="mini" type="primary" @click="handleDelete(scope.row.organ_id)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :total="count" :page-size="cur_limit" :page-sizes="[10,20,30,50]">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <!--添加/修改弹出框-->
    <transition name="el-fade-in-linear">
      <div v-show="addTeamLayer" class="bg-layer">
        <transition name="el-zoom-in-center">
          <div v-if="addTeamLayer" class="transition-box">
            <div class="title-warp">
              <div class="close-btn" @click="addTeamLayer=!addTeamLayer"><i class="el-icon-close"></i></div>
              <h3 v-if="!changeTeamLayer" class="modify-title">新增校区</h3>
              <h3 v-if="changeTeamLayer" class="modify-title">修改校区</h3>
            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
              <div class="rule-box">
                <el-form-item label="名称" prop="organ_name">
                  <el-input v-model="ruleForm.organ_name"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="office_addr">
                  <el-input v-model="ruleForm.office_addr" type="textarea" placeholder="请填写详细地址" resize="none"></el-input>
                </el-form-item>
                <el-form-item label="简称">
                  <el-input v-model="ruleForm.organ_short_name"></el-input>
                </el-form-item>
                <el-form-item label="签到距离" prop="distance_range">
                  <el-input v-model="ruleForm.distance_range" size="medium"></el-input>
                </el-form-item>
                <a href="https://lbs.qq.com/tool/getpoint/index.html" style="margin-left: 30px;color:#409EFF">请拾取坐标</a>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="经度" prop="longitude">
                      <el-input type="number" v-model.number="ruleForm.longitude" size="medium"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="纬度" prop="latitude">
                      <el-input type="number" v-model.number="ruleForm.latitude" size="medium"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row type="flex">
                  <el-col :span="24">
                    <el-form-item label="财务主体">
                      <el-select v-model="ruleForm.finance_id" size="medium" placeholder="请选择财务主体" style="width: 100%;">
                        <el-option v-for="item in financeList" :key="item.finance_id" :label="item.finance_name" :value="item.finance_id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row type="flex">
                  <el-col :span="4">
                    <el-form-item label="选择行政区" prop="province">
                    </el-form-item>
                  </el-col>
                  <el-col :span="7" style="margin-left:6px;">
                    <el-select v-model="province_no" size="medium" placeholder="请选择省">
                      <el-option v-for="(item, index) in $store.state.ProvinceOptions" :key="index" :label="item.province_name" :value="item.province_no">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="7">
                    <el-select v-model="city_no" size="medium" placeholder="请选择市">
                      <el-option v-for="(item, index) in $store.state.CityOptions" :key="index" :label="item.city_name" :value="item.city_no">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="7">
                    <el-select v-model="district_no" size="medium" placeholder="请选择区" style="width: 100%;">
                      <el-option v-for="(item, index) in $store.state.CountyOptions" :key="index" :label="item.district_name" :value="item.district_no">
                      </el-option>
                    </el-select>
                  </el-col>
                </el-row>
                <el-row type="flex">
                  <el-col :span="23">
                    <el-form-item label="所属上级">
                      <el-cascader clearable size="medium" expand-trigger="click" :options="location" v-model="organ_id2" change-on-select>
                      </el-cascader>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="负责人">
                  <el-input v-model="ruleForm.organ_leader_name" size="medium"></el-input>
                </el-form-item>
                <el-form-item label="负责人电话" prop="organ_leader_mobile" size="medium">
                  <el-input v-model.number="ruleForm.organ_leader_mobile"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="office_tel">
                  <el-input v-model.number="ruleForm.office_tel" size="medium"></el-input>
                </el-form-item>
                <el-form-item label="商户编号">
                  <el-input v-model="ruleForm.merchant_no" size="medium"></el-input>
                </el-form-item>
                <el-row type="flex">
                  <el-col :span="24">
                    <el-form-item label="开始运营日期" size="medium">
                      <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.start_operate_time" style="width:100%"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="是否在线报名" size="medium">
                      <el-radio-group v-model="ruleForm.online_signup_enable">
                        <el-radio :label="true">是</el-radio>
                        <el-radio :label="false">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="状态" size="medium">
                      <el-radio-group v-model="ruleForm.status">
                        <el-radio :label="true">启用</el-radio>
                        <el-radio :label="false">禁用</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <div class="rule-footer">
                  <el-button v-if="!changeTeamLayer" type="primary" @click="submitForm('ruleForm')" size="mini" style="width: 100px">立即创建</el-button>
                  <el-button v-if="changeTeamLayer" type="primary" @click="submitForm('ruleForm')" size="mini" stlye="width: 100px">确认修改</el-button>
                  <el-button @click="addTeamLayer=!addTeamLayer" type="primary" size="mini" style="width: 100px">取消</el-button>
                </div>
              </div>
            </el-form>
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
      cur_page: 0, //页码
      cur_limit: 10, //每次请求的数据数
      count: 20, //数据总量
      organId: "",
      organName: "",
      subject: "",
      select_word: "", //搜索的值
      organ_id2: [], //新增组件内的学校id,
      dataList: [], //请求的list
      location: [], //校区导航
      multipleSelection: [], //选中行的集合
      provinceList: [],
      cityList: [],
      districtsList: [],
      addTeamLayer: false, //新增弹出框状态
      changeTeamLayer: false, //修改弹出框状态
      province_no: "",
      city_no: "",
      district_no: "",
      schoolnum: "",
      branchSchoolnum: "",
      campusnum: "",
      mapLayer: false,
      financeList: "", //获取财务主体list
      finance_id: "", //财务主体id
      ruleForm: {
        //新增数据
        organ_id: "",
        organ_name: "",
        organ_short_name: "",
        organ_level: "",
        parent_organ_id: "",
        parent_organ_name: "",
        child_organ_num: "",
        organ_leader_name: "",
        organ_leader_mobile: "",
        office_tel: "",
        office_addr: "",
        merchant_no: "",
        province_no: "",
        province_name: "",
        city_no: "",
        city_name: "",
        district_name: "",
        district_no: "",
        start_operate_time: "",
        subject: "",
        online_signup_enable: "",
        status: "",
        created_at: null,
        finance_id: "",
        latitude: "",
        longitude: "",
      },
      changeForm2: {},
      rules: {
        organ_name: [
          { required: true, message: "请输入校区名称", trigger: "blur" },
          { min: 1, max: 12, message: "长度在1到12个字符", trigger: "blur" }
        ],
        office_addr: [
          {
            required: true,
            min: 1,
            max: 100,
            message: "长度在0到100个字符",
            trigger: "blur"
          }
        ],
        organ_leader_mobile: [
          { validator: this.Checkout.money, trigger: "blur" }
        ],
        office_tel: [{ validator: this.Checkout.money, trigger: "blur" }],
        distance_range: [{ validator: this.Checkout.money, trigger: "blur" }],
        longitude: [
          {
            required: true,
            validator: this.Checkout.number2,
            message: "请输入数字",
            trigger: "blur"
          }
        ],
        latitude: [
          {
            required: true,
            validator: this.Checkout.number2,
            message: "请输入数字",
            trigger: "blur"
          }
        ]
      },
      loading: true
    };
  },
  mounted() {
    this.Util.querySysconst(this, "100", this.$store.state.SubjectOptions); //查询科目
  },
  //实例创建完成后被立即调用
  created() {
    const self = this;
    //查询区域导航
    this.Util.queryAreaNav(self, 3, function() {
      self.getData();
    });
    this.location = this.$store.state.location;
    let objData = {
      staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId
    };
    this.$axios
      .post(this.GlobalVal.httpLink.queryProvince, JSON.stringify(objData))
      .then(
        res => {
          if (res.data.code === "10000") {
            self.provinceList = res.data.provinces;
            self.$store.commit("setProvinceOptions", res.data.provinces);
            window.sessionStorage.setItem(
              "queryProvince",
              JSON.stringify(res.data.provinces)
            );
          } else {
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
    //财务主体
    let objData1 = {
      source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
      staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId
    };
    this.$axios
      .post(this.GlobalVal.httpLink.getAllFinanceBody, JSON.stringify(objData1))
      .then(
        res => {
          if (res.data.code === "10000") {
            self.financeList = res.data.finance_bodies;
          } else {
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
    //相当于过滤器
    data() {
      const self = this;
      if (!self.dataList) {
        return [];
      }
      return self.dataList.filter(function(d) {
        d.created_at = self.Util.TimeCycle(d.created_at, "ymd");
        d.subject = self.Util.GetLabelForValue(
          self.$store.state.SubjectOptions,
          d.subject
        );
        return d;
      });
    }
  },
  watch: {
    '$store.state.location'(){
      this.location = this.$store.state.location
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
    changeForm2: function() {
      //修改的参数赋值
      this.ruleForm.status = this.changeForm2.status;
      this.ruleForm.online_signup_enable = this.changeForm2.online_signup_enable;
      this.ruleForm.organ_id = this.changeForm2.organ_id;
      this.ruleForm.organ_name = this.changeForm2.organ_name;
      this.ruleForm.organ_short_name = this.changeForm2.organ_short_name;
      this.ruleForm.organ_level = this.changeForm2.organ_level;
      this.ruleForm.parent_organ_id = this.changeForm2.parent_organ_id;
      this.ruleForm.parent_organ_name = this.changeForm2.parent_organ_name;
      this.ruleForm.child_organ_num = this.changeForm2.child_organ_num;
      this.ruleForm.organ_leader_name = this.changeForm2.organ_leader_name;
      this.ruleForm.organ_leader_mobile = this.changeForm2.organ_leader_mobile;
      this.ruleForm.office_tel = this.changeForm2.office_tel;
      this.ruleForm.office_addr = this.changeForm2.office_addr;
      this.ruleForm.merchant_no = this.changeForm2.merchant_no;
      this.ruleForm.province_no = this.changeForm2.province_no;
      this.ruleForm.province_name = this.changeForm2.province_name;
      this.ruleForm.city_no = this.changeForm2.city_no;
      this.ruleForm.city_name = this.changeForm2.city_name;
      this.ruleForm.district_name = this.changeForm2.district_name;
      this.ruleForm.district_no = this.changeForm2.district_no;
      this.ruleForm.start_operate_time = this.changeForm2.start_operate_time;
      this.ruleForm.subject = this.changeForm2.subject;
      this.ruleForm.created_at = this.changeForm2.created_at;
      this.ruleForm.finance_id = this.changeForm2.finance_id;
      this.ruleForm.distance_range = this.changeForm2.distance_range;
      this.ruleForm.longitude = this.changeForm2.longitude;
      this.ruleForm.latitude = this.changeForm2.latitude;
      this.province_no = this.changeForm2.province_no;
      this.city_no = this.changeForm2.city_no;
      this.district_no = this.changeForm2.district_no;
    },
    province_no: function() {
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
        province_no: this.province_no //省份编号
      };
      this.$axios
        .post(this.GlobalVal.httpLink.queryCities, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
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
    city_no: function() {
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
        city_no: this.city_no //省份编号
      };
      this.$axios
        .post(this.GlobalVal.httpLink.queryDiss, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
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
  },
  methods: {
    handleClickTree(data) {
      if (this.organId === data.value) return;
      this.organId = data.value;
      this.cur_page = 0;
      this.getData();
    },
    add(node) {
      this.organ_id2 = this.Util.getCityLevel(this.location,node.data.value)
    },
    remove(node) {
      this.handleDelete(node.data.value)
    },
    update(node) {
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        page: this.cur_page, //页数
        limit: this.cur_limit, //条目数
        organId:node.data.value,
        organName: '', //按电话号码搜索
        subject: '', //科目
        organLevel: node.data.type
      };
      this.$axios
        .post(this.GlobalVal.httpLink.queryAdminOrgans, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              this.changeTeamLayer = true;
              this.addTeamLayer = true;
              this.changeForm2 = res.data.adminOrgans[0];
              this.organ_id2 = this.Util.getCityLevel(
                this.location,
                res.data.adminOrgans[0].parent_organ_id
              );
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
    renderContent(h, { node, data, store }) {
      let _this = this;
      return h(
        "div",
        {
          style: "font-size: 14px; width: 100%; position: relative;"
        },
        [
          h("span", node.label),
          h("i", {
            class: "el-icon-circle-plus-outline",
            style: "position: absolute; right: 5px; top: 2px;",
            title: "新增",
            on: {
              click() {
                _this.handleAdd();
                _this.add(node)
              }
            }
          }),
          h("i", {
            class: "el-icon-remove-outline",
            style: "position: absolute; right: 25px; top: 2px;",
            title: "删除",
            on: {
              click() {
                _this.remove(node);
              }
            }
          }),
          h("i", {
            class: "el-icon-edit-outline",
            style: "position: absolute; right: 45px; top: 2px;",
            title: "修改",
            on: {
              click() {
                _this.update(node);
              }
            }
          })
        ]
      );
    },
    //获取数据
    getData() {
      const self = this;
      this.loading = true;
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        page: this.cur_page, //页数
        limit: this.cur_limit, //条目数
        organId:
          this.organId ||
          JSON.parse(window.sessionStorage.getItem("staff")).staffOrganId, //校区id
        organName: this.organName, //按电话号码搜索
        subject: this.subject, //科目
        organLevel: 3
      };
      this.$axios
        .post(this.GlobalVal.httpLink.queryAdminOrgans, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              self.count = res.data.count;
              self.dataList = res.data.adminOrgans;
              self.schoolnum = res.data.schoolnum;
              self.branchSchoolnum = res.data.branchSchoolnum;
              self.campusnum = res.data.campusnum;
              this.loading = false;
            } else {
              self.$message({
                type: "error",
                message: res.data.errmsg
              });
            }
          },
          res => {
            self.$message("请求失败");
            this.loading = false;
          }
        );
    },
    //重新选择了地区事件
    handleLocationChange(value) {},
    //重新筛选函数
    screening() {
      this.getData();
    },

    //删除事件
    handleDelete(id) {
      const self = this;
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
                id,
              }
            ]
          };
          this.$axios
            .post(
              this.GlobalVal.httpLink.delAdminOrgan,
              JSON.stringify(objData)
            )
            .then(
              res => {
                if (res.data.code === "10000") {
                  this.location = this.$store.state.location;
                  this.$message({
                    type: "success",
                    message: res.data.errmsg
                  });
                  window.sessionStorage.removeItem("areaNav");
                  this.Util.queryAreaNav(self, 3, function() {
                    self.getData();
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
                id: self.multipleSelection[i].organ_id
              });
            }

            let objData = {
              staffId: JSON.parse(window.sessionStorage.getItem("staff"))
                .staffId,
              delList: delTeacher
            };
            self.multipleSelection = [];
            this.$axios
              .post(
                this.GlobalVal.httpLink.delAdminOrgan,
                JSON.stringify(objData)
              )
              .then(
                res => {
                  if (res.data.code === "10000") {
                    this.$message({
                      type: "success",
                      message: "删除成功!"
                    });
                    window.sessionStorage.removeItem("areaNav");
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

    //搜索老师---刷新
    search() {
      if (this.select_word === "") {
        this.$message({
          type: "error",
          message: "填写要搜索的姓名或电话"
        });
      }
      this.getData();
    },
    //新增按钮事件
    handleAdd() {
      this.addTeamLayer = true;
      this.changeTeamLayer = false;
      this.changeForm = this.changeForm2;
      //清空参数
      this.ruleForm.organ_id = "";
      this.ruleForm.organ_name = "";
      this.ruleForm.organ_short_name = "";
      this.ruleForm.organ_level = "";
      this.ruleForm.parent_organ_id = "";
      this.ruleForm.parent_organ_name = "";
      this.ruleForm.child_organ_num = "";
      this.ruleForm.organ_leader_name = "";
      this.ruleForm.organ_leader_mobile = "";
      this.ruleForm.office_tel = "";
      this.ruleForm.office_addr = "";
      this.ruleForm.merchant_no = "";
      this.ruleForm.province_no = "";
      this.ruleForm.city_no = "";
      this.ruleForm.district_name = "";
      this.ruleForm.district_no = "";
      this.ruleForm.start_operate_time = "";
      this.ruleForm.subject = "";
      this.ruleForm.online_signup_enable = true;
      this.ruleForm.status = true;
      this.ruleForm.created_at = null;
      this.province_no = "";
      this.city_no = "";
      this.district_name = "";
      this.district_no = "";
      this.organ_id2 = "";
      this.ruleForm.distance_range = 300;
      this.ruleForm.finance_id = "";
      this.ruleForm.longitude = 0;
      this.ruleForm.latitude = 0;
    },
    //新增/修改时候参数判断-转换
    varJug(obj) {
      let self = this;
      let o = obj;
      o.organ_level = 3; //校区得级别标识符
      if (o.start_operate_time) {
        o.start_operate_time = new Date(o.start_operate_time).getTime();
      }
      o.province_no = this.province_no;
      o.city_no = this.city_no;
      o.district_no = this.district_no;
      o.district_name = self.Util.GetIdNameForValue(
        self.$store.state.countyOptions,
        this.district_no,
        "district_no",
        "district_name"
      );
      o.finance_name = this.Util.GetIdNameForValue(
        this.financeList,
        this.finance_id,
        "finance_id",
        "finance_name"
      );
      o.distance_range = this.ruleForm.distance_range;
      return o;
    },

    //新增--提交
    submitForm(formName) {
      const self = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let objData = {
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            adminOrgan: this.varJug(this.ruleForm)
          };
          this.$axios
            .post(
              this.GlobalVal.httpLink.editAdminOrgan,
              JSON.stringify(objData)
            )
            .then(
              res => {
                if (res.data.code === "10000") {
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
                  window.sessionStorage.removeItem("areaNav");
                  this.Util.queryAreaNav(self, 3, function() {
                    self.getData();
                  });
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
    //修改按钮事件
    handleEdit(row) {
      this.changeTeamLayer = true;
      this.addTeamLayer = true;
      this.changeForm2 = row;
      this.organ_id2 = this.Util.getCityLevel(
        this.location,
        row.parent_organ_id
      );
    },
    addressTude(addr) {
      const self = this;
      let myGeo = new BMap.Geocoder();
      myGeo.getPoint(addr, function(point) {
        if (point) {
          let tude = JSON.stringify(point);
          this.ruleForm.longitude = JSON.parse(tude).lng;
          this.ruleForm.latitude = JSON.parse(tude).lat;
        } else {
        }
      });
    },
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
  width: 600px;
  height: 480px;
  min-height: 480px;
  margin: auto;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  border-radius: 4px;
  background-color: #ffffff;
  /* overflow-y: scroll; */
  color: #fff;
  padding-top: 60px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  box-sizing: border-box;
  z-index: 10;
}
.rule-box {
  height: 395px;
  overflow-y: auto;
  margin-right: -20px;
  padding-right: 20px;
  margin-top: 10px;
}
.rule-footer {
  width: 100%;
  height: 30px;
  text-align: center;
}
.title-warp {
  position: absolute;
  width: 600px;
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

.handle-box {
  margin-bottom: 20px;
}

.search-warp {
  display: block;
  float: right;
}

.search-warp {
  display: block;
  float: right;
}

.handle-box {
  margin-bottom: 20px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}

.top-left {
  font-size: 16px;
  padding-right: 20px;
  font-weight: bold;
  color: #000000;
}

span {
  padding-right: 20px;
  color: #6c6c6c;
}

.top-right {
  float: right;
}

.table-right {
  width: 990px;
  height: auto;
  float: right;
}

.table-left {
  width: 215px;
  background: #ffffff;
  height: 555px;
  float: left;
}
</style>
