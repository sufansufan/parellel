<style>
.class-query-screen .el-cascader {
  width: 15.111%;
}
.class-query-screen .el-select {
  width: 10.111%;
}
.el-input-group__append,
.el-input-group__prepend {
  border-radius: 0px !important;
}
.class-query .el-input-group__append {
  background-color: #fff;
}
</style>
<style scoped>
.bg-layer {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 150;
}
.bg-layer1 {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 150;
}
.transition-box.change {
  height: 400px;
}
.transition-box1.change {
  height: 400px;
}
.transition-box {
  position: absolute;
  width: 1000px;
  height: 580px;
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
.transition-box1 {
  position: absolute;
  width: 700px;
  height: 580px;
  margin: auto;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  border-radius: 4px;
  background-color: #ffffff;
  color: #333333;
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
.title-warp1 {
  position: absolute;
  width: 700px;
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
.fotter-warp1 {
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
.transition-box1 .el-cascader {
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
.close-btn1 {
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
.modify-title1 {
  font-size: 20px;
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #666666;
  border-bottom: 1px solid #cccccc;
  text-align: left;
  padding-left: 20px;
  z-index: 100;
}
.handle-box {
  margin-bottom: 20px;
}
.search-warp {
  display: inline-block;
  /*float: right;*/
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
.student-info-warp {
  color: #333333;
  padding-left: 20px;
}
.student-info {
  display: inline-block;
}
/*分割线*/
.line {
  width: 100%;
  height: 1px;
  background: #cccccc;
  margin-bottom: 10px;
  margin-top: 10px;
}
/*打印听课证*/
i {
  font-style: normal;
}
#box {
  width: 800px;
  height: 698px;
  background-image: url("../../../static/img/printback.png");
  background-size: 100%;
  padding-top: 142px;
  box-sizing: border-box;
  overflow: hidden;
  color: #333333;
  margin: 0 auto;
}
.s_center {
  float: left;
  width: 100%;
  height: auto;
  position: relative;
  overflow: hidden;
}
.s_centerLeft {
  width: 50%;
  float: left;
  margin-left: 70px;
  overflow: hidden;
}
.s_LeftTop {
  width: 100%;
  height: auto;
  overflow: hidden;
}
img.s_TowCode {
  float: left;
  display: block;
  width: 100px;
  height: auto;
}
.s_essential {
  float: right;
  width: 50%;
  margin-top: 6px;
}
span.details {
  display: inline-block;
  width: 100%;
  height: auto;
  overflow: hidden;
}
span.details > i {
  display: block;
  text-align: right;
  height: 20px;
  line-height: 20px;
  font-size: 14px;
}
span.details > p {
  text-align: right;
  height: 30px;
  line-height: 30px;
  font-weight: 700;
}
span.detailsLeft > i,
span.detailsLeft > p {
  text-align: left;
}
span.detailsLeft {
  display: block;
  margin-bottom: 6px;
}
span.detailsLeft > i {
  display: block;
  height: 20px;
  line-height: 20px;
  font-size: 14px;
}
span.detailsLeft > p {
  height: 30px;
  line-height: 30px;
  font-weight: 700;
}
span.shrink {
  margin-bottom: 6px;
}
span.shrink > i {
  height: 16px;
  line-height: 16px;
  font-size: 12px;
}
span.shrink > p {
  height: 18px;
  line-height: 18px;
  font-size: 14px;
}
.s_centerRight {
  width: 54%;
  height: 57%;
  float: left;
  position: absolute;
  right: -65px;
  top: 103px;
  -moz-transform: rotate(-90deg);
  -webkit-transform: rotate(-90deg);
  -o-transform: rotate(-90deg);
  -ms-transform: rotate(-90deg);
  transform: rotate(-90deg);
}
.s_Leftzoom {
  float: left;
  width: 50%;
  height: auto;
}
.s_Flortzoom {
  float: left;
  width: 50%;
  height: auto;
}
.table .el-button + .el-button {
  margin-left: 0px;
}
</style>
<template>
  <div class="class-query table">
    <div class="handle-box">
      <el-button @click="goback" icon="el-icon-arrow-left" type="primary" size="mini">返回</el-button>
    </div>
    <el-table size="mini" :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="campus_name" label="校区"></el-table-column>
      <el-table-column prop="class_name" label="班级名称"></el-table-column>
      <el-table-column prop="orderno" label="听课证编号"></el-table-column>
      <el-table-column prop="subject" label="科目"></el-table-column>
      <el-table-column prop="teacher_name" label="老师"></el-table-column>
      <el-table-column prop="class_week_day" label="重复周期"></el-table-column>
      <el-table-column prop="time_name" label="上课时间"></el-table-column>
      <el-table-column prop="classroom_name" label="教室"></el-table-column>
      <el-table-column prop="start_date" label="开课日期"></el-table-column>
      <el-table-column prop="end_date" label="结课日期"></el-table-column>
      <el-table-column prop="alreadyTime" label="已上课次"></el-table-column>
      <el-table-column prop="total_price" label="总金额"></el-table-column>
      <el-table-column prop="real_payment" label="实付金额"></el-table-column>
      <el-table-column label="操作" width="270">
        <template slot-scope="scope">
          <span v-if="$route.query.index == 1">
            <el-button size="mini" type="primary" @click="handleApply(scope.$index, scope.row)">转班
            </el-button>
          </span>
          <span v-if="$route.query.index == 2">
            <el-button size="mini" type="primary" @click="handleCourse(scope.$index, scope.row)">调课
            </el-button>
          </span>
          <el-button size="mini" type="primary" @click="handlemoney(scope.$index, scope.row)">退费
          </el-button>
          <el-button size="mini" type="primary" @click="printEdit(scope.$index, scope.row)">打印听课证
          </el-button>
        </template>
      </el-table-column>
    </el-table>
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
              <h3 v-if="!changeTeamLayer" class="modify-title">新增班级</h3>
              <h3 v-if="changeTeamLayer" class="modify-title">修改班级信息</h3>
            </div>
            <el-form :model="ruleForm" :rules="rules" size="mini" ref="ruleForm" label-width="100px" style="height: 470px;overflow-y: scroll;">
              <el-form-item label="班级名称" prop="class_name">
                <el-input v-model="ruleForm.class_name"></el-input>
              </el-form-item>
              <el-form-item v-if="!changeTeamLayer" label="选择学校">
                <el-cascader clearable expand-trigger="click" :options="location" v-model="organ_id2" change-on-select>
                </el-cascader>
              </el-form-item>
              <el-form-item label="教师名字">
                <el-input v-model="ruleForm.student_mobile"></el-input>
              </el-form-item>
              <el-form-item label="学生生日">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.student_birthday" style="width: 100%;"></el-date-picker>
              </el-form-item>
              <el-form-item label="年级">
                <el-select v-model="ruleForm.student_grade" size="mini" placeholder="请选择" style="width: 100%;">
                  <el-option v-for="item in $store.state.GradeOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="小学名字">
                <el-input v-model="ruleForm.primary_school"></el-input>
              </el-form-item>
              <el-form-item label="中学名字">
                <el-input v-model="ruleForm.middle_school"></el-input>
              </el-form-item>
              <el-form-item label="高中名字">
                <el-input v-model="ruleForm.high_school"></el-input>
              </el-form-item>
              <el-form-item label="入学成绩">
                <el-input v-model="ruleForm.enter_score"></el-input>
              </el-form-item>
              <el-form-item label="家庭住址">
                <el-input v-model="ruleForm.home_address"></el-input>
              </el-form-item>
              <el-form-item label="父亲姓名">
                <el-col :span="7">
                  <el-form-item style="margin-bottom: 0">
                    <el-input style="width: 100%;" v-model="ruleForm.father_name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="2" style="color: #5a5e66;text-align: center;">电话</el-col>
                <el-col :span="7">
                  <el-form-item style="margin-bottom: 0">
                    <el-input style="width: 100%;" v-model="ruleForm.father_mobile"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4" style="color: #5a5e66;text-align: center;">接收短信</el-col>
                <el-switch v-model="ruleForm.father_sms_enable"></el-switch>
              </el-form-item>
              <el-form-item label="母亲姓名">
                <el-col :span="7">
                  <el-form-item style="margin-bottom: 0">
                    <el-input style="width: 100%;" v-model="ruleForm.mother_name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="2" style="color: #5a5e66;text-align: center;">电话</el-col>
                <el-col :span="7">
                  <el-form-item style="margin-bottom: 0">
                    <el-input style="width: 100%;margin-bottom: 0;" v-model="ruleForm.mother_mobile"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4" style="color: #5a5e66;text-align: center;">接收短信</el-col>
                <el-switch v-model="ruleForm.mother_sms_enable"></el-switch>
              </el-form-item>
              <el-form-item label="状态">
                <el-select v-model="ruleForm.student_status" size="mini" placeholder="请选择" style="width: 100%;">
                  <el-option v-for="item in $store.state.StudentStatusOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button v-if="!changeTeamLayer" type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button v-if="changeTeamLayer" type="primary" @click="submitForm('ruleForm')">确认修改</el-button>
                <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
                <el-button @click="addTeamLayer=!addTeamLayer">取消</el-button>
              </el-form-item>
            </el-form>
            <div class="fotter-warp class-mag">
              <el-steps :space="180" :active="2" finish-status="success">
                <el-step title="基本信息" style="font-size: 13px;"></el-step>
                <el-step title="上课安排"></el-step>
                <el-step title="完成"></el-step>
              </el-steps>
              <el-button type="primary" size="mini" style="position: absolute;right: 20px;top: 10px;">下一步</el-button>
            </div>
          </div>
        </transition>
      </div>
    </transition>
    <!--转班-->
    <transition name="el-fade-in-linear">
      <div v-show="classTimeLayer" class="bg-layer">
        <transition name="el-zoom-in-center">
          <div v-if="classTimeLayer" class="transition-box">
            <div class="title-warp">
              <div class="close-btn" @click="turnClass">
                <i class="el-icon-close"></i>
              </div>
              <h3 class="modify-title">转班</h3>
              <div class="table">
                <v-turnclass :orderId="orderId" :attendclassList="attendclassList"></v-turnclass>
              </div>
            </div>
          </div>
        </transition>

      </div>

    </transition>
    <!--调课-->
    <transition name="el-fade-in-linear">
      <div v-show="classCourseLayer" class="bg-layer">
        <transition name="el-zoom-in-center">
          <div v-if="classCourseLayer" class="transition-box">
            <div class="title-warp">
              <div class="close-btn" @click="couserClass">
                <i class="el-icon-close"></i>
              </div>
              <h3 class="modify-title">调课</h3>
            </div>
            <v-turnclass :orderId="orderId" :attendclassList="attendclassList"></v-turnclass>
          </div>
        </transition>
      </div>
    </transition>
    <!--退费-->
    <transition name="el-fade-in-linear">
      <div v-show="classMoneyLayer" class="bg-layer1">
        <transition name="el-zoom-in-center">
          <div v-if="classMoneyLayer" class="transition-box1">
            <div class="title-warp1">
              <div class="close-btn" @click="classMoneyLayer=!classMoneyLayer">
                <i class="el-icon-close"></i>
              </div>
              <h3 class="modify-title">退费</h3>
            </div>
            <div class="student-info-warp">
              <div class="student-info">姓名: {{rowInfo.student_name}}</div>
              <div class="student-info">学号: {{rowInfo.student_no}}</div>
              <div class="student-info">班级名称: {{rowInfo.class_name}}</div><br>
              <div class="student-info">上课时段: {{rowInfo.time_name}}</div>
              <div class="student-info">上课周: {{rowInfo.class_week_day}}</div>
              <div class="student-info">校区: {{rowInfo.school_name}}</div>
            </div>
            <div class="line"></div>
            <el-form :model="ruleForm" :rules="rules" size="mini" ref="ruleForm" label-width="100px" style="color:#333333;">
              <el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="签到次数">
                      <span>{{getRefundInfoRes.checkinNum}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="购买次数">
                      <span>{{getRefundInfoRes.buyTimes}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="报名金额">
                      <span>{{getRefundInfoRes.signupOrder.total_price}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="退课次数">
                      <el-input style="width: 100%;" type="text" placeholder="请输入内容" v-model="refundTimes">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="实付金额">
                      <span>{{getRefundInfoRes.signupOrder.real_payment}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="课次费">
                      <span>{{getRefundInfoRes.singlePrice}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="优惠类型">
                      <span>{{liberalType}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="课节退费">
                      <span>{{signupOrder.single_price*refundTimes}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="额外退费">
                      <el-input style="width: 100%;" type="text" placeholder="请输入内容" v-model="otherRefundAmount">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="退费总额">
                      <span>{{classRefundAmount}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="退费方式" prop="refundPayType">
                      <el-select v-model="ruleForm.refundPayType" style="width:100%">
                        <el-option label="银行卡" value="01204"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <div class="line"></div>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="姓名" prop="bankCardPayee">
                      <el-input style="width: 100%;" type="text" placeholder="请输入内容" v-model="ruleForm.bankCardPayee">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="银行卡号" prop="bankcardNo">
                      <el-input style="width: 100%;" type="text" placeholder="请输入内容" v-model="ruleForm.bankcardNo">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- <el-row>
                                     <el-col :span="12">
                                         <el-form-item label="支付宝账号">
                                             <el-input
                                                     style="width: 100%;"
                                                     type="text"
                                                     placeholder="请输入内容"
                                                     v-model="ruleForm.alipayAcount">
                                             </el-input>
                                         </el-form-item>
                                     </el-col>
                                     <el-col :span="12">
                                         <el-form-item label="微信账号">
                                             <el-input
                                                     style="width: 100%;"
                                                     type="text"
                                                     placeholder="请输入内容"
                                                     v-model="ruleForm.wechatAcount">
                                             </el-input>
                                         </el-form-item>
                                     </el-col>
                                 </el-row>-->
                <el-form-item label="退课原因">
                  <el-input style="width: 100%;" type="textarea" :rows="2" placeholder="请输入内容" v-model="ruleForm.refundReason">
                  </el-input>
                </el-form-item>
              </el-row>
              <el-form-item style="display: flex; justify-content: center; margin-left: -100px;">
                <el-button type="primary" v-if="($store.state.code && $store.state.code.includes('010104'))" @click="submitMoneyForm('ruleForm', 1)" style="width: 120px;">超额退费</el-button>
                <el-button type="primary" @click="submitMoneyForm('ruleForm', 0)" style="width: 120px;">退费</el-button>
                <el-button type="primary" @click="classMoneyLayer=!classMoneyLayer" style="width: 120px">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </transition>
      </div>
    </transition>
    <!--打印-->
    <transition name="el-fade-in-linear">
      <div v-show="printLayer" class="bg-layer">
        <transition name="el-zoom-in-center">
          <div v-if="printLayer" class="transition-box">
            <div class="title-warp">
              <div class="close-btn" @click="printLayer=!printLayer">
                <i class="el-icon-close"></i>
              </div>
              <h3 class="modify-title">打印听课证</h3>
            </div>
            <!--startprint-->
            <div id="box">
              <div class="s_center">
                <div class="s_centerLeft">
                  <div class="s_LeftTop">
                    <vue-q-art :qr-value="printInfo.student_no" class="s_TowCode"></vue-q-art>
                    <div class="s_essential" style="margin-top: 75px;">
                      <span class="details">
                        <i>上课时间</i>
                        <p>{{printInfo.time_name}}</p>
                      </span>
                      <span class="details">
                        <i>任课老师</i>
                        <p>{{printInfo.teacher_name}}</p>
                      </span>
                      <span class="details">
                        <i>听课证编号</i>
                        <p>{{printInfo.orderno}}</p>
                      </span>
                    </div>
                  </div>
                  <div class="s_LeftRight">
                    <span class="detailsLeft">
                      <i>姓名</i>
                      <p>{{printInfo.student_name}}</p>
                    </span>
                    <span class="detailsLeft">
                      <i>学员号</i>
                      <p>{{printInfo.student_no}}</p>
                    </span>
                    <span class="detailsLeft">
                      <i>校区／教室</i>
                      <p>{{printInfo.campus_name}}　{{printInfo.classroom_name}}</p>
                    </span>
                    <span class="detailsLeft">
                      <i>日期</i>
                      <p>{{printInfo.start_date.replace(/-/g, '/')}}-{{printInfo.end_date.replace(/-/g, '/')}}</p>
                    </span>
                    <span class="detailsLeft">
                      <i>班级</i>
                      <p>{{printInfo.class_name}}</p>
                    </span>
                  </div>
                </div>
                <div class="s_centerRight">
                  <div class="s_Leftzoom" style="margin-top:50px ;">
                    <span class="detailsLeft shrink">
                      <i>姓名／学员号</i>
                      <p>{{printInfo.student_name}}／{{printInfo.student_no}}</p>
                    </span>
                    <span class="detailsLeft shrink">
                      <i>校区／教室</i>
                      <p>{{printInfo.campus_name}}　{{printInfo.classroom_name}}</p>
                    </span>
                    <span class="detailsLeft shrink">
                      <i>日期</i>
                      <p>{{printInfo.start_date.replace(/-/g, '/')}}-{{printInfo.end_date.replace(/-/g, '/')}}</p>
                    </span>
                    <span class="detailsLeft shrink">
                      <i>班级</i>
                      <p>{{printInfo.class_name}}</p>
                    </span>
                  </div>
                  <div class="s_Flortzoom">
                    <!-- <img src="img/听课证A4_画板 1 副本 2.png" alt=""  class="s_TowCode" style="float: right;width: 64px;margin-bottom:10px; ;"/> -->
                    <vue-q-art :qr-value="printInfo.student_no" style="float: right;width: 64px;margin-bottom:10px;"></vue-q-art>
                    <div class="s_essential" style="float: left;width: 100%;">
                      <span class="details shrink">
                        <i>上课时间</i>
                        <p>{{printInfo.time_name}}</p>
                      </span>
                      <span class="details shrink">
                        <i>任课老师</i>
                        <p>{{printInfo.teacher_name}}</p>
                      </span>
                      <span class="details shrink">
                        <i>听课证编号</i>
                        <p>{{printInfo.orderno}}</p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--endprint-->
            <el-button size="mini" type="primary" style="width: 200px;float: right;margin-right: 70px;margin-top: 40px" @click="cencelPrint">取消</el-button>
            <el-button size="mini" type="primary" style="width: 200px;float: right;margin-right: 70px;margin-top: 40px" @click="doPrint">打印</el-button>

          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import VTurnclass from "./TurnClass";
import VPayfees from "./../frontOffice/PayFees.vue";
import VueQArt from "../QRCode/QRCode";
export default {
  components: {
    VTurnclass,
    VPayfees,
    VueQArt
  },
  data() {
    return {
      cur_page: 0, //页码
      cur_limit: 10, //每次请求的数据数
      count: 0, //数据总量
      //搜索的量
      organId: "", // 机构id
      particular_year: "", //int 年份
      season: "", // 季节：[暑假，秋季，寒假，春季]等
      periods: "", //期别
      grade: "", //适用年级，[一年级，二年级]等
      subject: "", //科目，[数学，物理]等
      projectType: "", //项目类型 [长期，短期，公益，考试]等
      classType: "", //班型，[超常，培优]等
      teacherName: "", //老师名字
      className: "", //班级名称
      department: "", //学部，小学，初中，高中
      refundTimes: "", //退费次数
      orderId: "",
      //变量
      role_name: "",
      status: "",
      otherRefundAmount: null, //额外退费
      organ_id2: [], //新增组件内的学校id,
      attendList: [], //上课信息
      attendclassList: [], //课次信息
      dataList: [], //请求的list
      roleIds: [],
      location: [], //校区导航
      selectedLocation: [], //选择校区
      multipleSelection: [], //选中行的集合
      changeschedulelist: [], //调课集合
      moneyList: [], //退费
      addTeamLayer: false, //新增弹出框状态
      changeTeamLayer: false, //修改弹出框状态
      classTimeLayer: false, //选择课次弹出控制
      classCourseLayer: false, //调课
      classMoneyLayer: false, //退费
      turnClassSwitch: false, //转班
      printLayer: false, //打印听课证
      checkinNum: 1,
      signupOrder: [],
      printInfo: "", //打印信息
      liberalType: "",
      classRefundAmount: "",
      returnSinglePrice: "",
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
        max_students_no: null, //最多人数
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
        updated_at: null, //更新时间   ----> 给 null
        refundPayType: "01204"
      },
      rowInfo: "", //点击转班存放信息
      oldClassTimeOptions: [],
      newClassTimeOptions: [],
      //接收当前行的信息
      changeForm2: {},
      //表单校验规则
      rules: {
        class_name: [
          { required: true, message: "请输入班级名称", trigger: "blur" }
        ],
        refundPayType: [
          { required: true, message: "请选择退费方式", trigger: "blur" }
        ],
        bankCardPayee: [
          { required: true, message: "请输入姓名", trigger: "blur" }
        ],
        bankcardNo: [
          { required: true, message: "请输入银行卡号", trigger: "blur" }
        ]
      },
      getRefundInfoRes: "" // 存放当前退费信息
    };
  },
  //实例创建完成后被立即调用
  created() {
    const self = this;
    this.$store.commit("isTurnClassSwitch", false);
    this.Util.queryAreaNav(self, undefined, function() {
      self.getData();
    });
    this.Util.querySysconst(self, "006", this.$store.state.SeasonOptions); //查询季节
    this.Util.querySysconst(self, "009", this.$store.state.PeriodsOptions); //查询期别
    this.Util.querySysconst(self, "101", this.$store.state.GradeOptions); //查询年级
    this.Util.querySysconst(self, "100", this.$store.state.ProjectTypeOptions); //查询科目
    this.Util.querySysconst(self, "002", this.$store.state.CourseTypeOptions); //查询类别/课型
    this.Util.querySysconst(self, "003", this.$store.state.ClassTypeOptions); //查询班型
    this.Util.querySysconst(this, "007", this.$store.state.DepartmentOptions); //查询学部
    this.Util.querySysconst(this, "025", this.$store.state.LiberalTypeOptions); //优惠类型
    self.location = self.$store.state.location;
    self.organId = self.$store.state.organId;
    this.otherRefundAmount = Number(this.otherRefundAmount);
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
        //d.subjectComputed = self.Util.GetLabelForValue(self.$store.state.SubjectOptions,d.subject);
        d.alreadyTime = d.total_times - d.left_times;
        d.start_date = self.Util.TimeCycle(d.start_date, "ymd");
        d.end_date = self.Util.TimeCycle(d.end_date, "ymd");
        d.subject = self.Util.GetLabelForValue(
          self.$store.state.SubjectOptions,
          d.subject
        );
        return d;
      });
    }
  },
  watch: {
    selectedLocation: function() {
      if (
        this.selectedLocation &&
        this.selectedLocation.length &&
        this.selectedLocation.length > 0
      ) {
        this.organId = this.selectedLocation[this.selectedLocation.length - 1];
        this.getData();
      }
    },
    organ_id2: function() {
      console.log(this.organ_id2);
      if (
        this.organ_id2 &&
        this.organ_id2.length &&
        this.organ_id2.length > 0
      ) {
        console.log(this.organ_id2[this.organ_id2.length - 1]);
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
    particular_year: function() {
      //年度改变
      this.getData();
    },
    season: function() {
      // 季节
      this.getData();
    },
    periods: function() {
      //期别
      this.getData();
    },
    grade: function() {
      //年级
      this.getData();
    },
    subject: function() {
      //科目
      this.getData();
    },
    projectType: function() {
      //类别/课型不限
      this.getData();
    },
    classType: function() {
      //班型
      this.getData();
    },
    department: function() {
      this.getData();
    },
    resubmitClassOnly: function() {
      this.getData();
    },
    notFullClassOnly: function() {
      this.getData();
    },
    mondayOnly: function() {
      this.getData();
    },
    tuesdayOnly: function() {
      this.getData();
    },
    wednesdayOnly: function() {
      this.getData();
    },
    thursdayOnly: function() {
      this.getData();
    },
    fridayOnly: function() {
      this.getData();
    },
    saturdayOnly: function() {
      this.getData();
    },
    sundayOnly: function() {
      this.getData();
    },
    morningOnly: function() {
      this.getData();
    },
    afternoonOnly: function() {
      this.getData();
    },
    nightOnly: function() {
      this.getData();
    },
    refundTimes: function() {
      this.returnSinglePrice = this.signupOrder.single_price * this.refundTimes;
      this.classRefundAmount =
        parseInt(this.rowInfo.single_price * this.refundTimes) +
        Number(this.otherRefundAmount);
      if (this.refundTimes > this.signupOrder.buy_times) {
        this.$message({
          type: "error",
          message: "退款次数大于签到次数"
        });
        return;
      }
    },
    otherRefundAmount: function() {
      this.classRefundAmount =
        parseInt(this.rowInfo.single_price * this.refundTimes) +
        Number(this.otherRefundAmount);
    }
  },
  methods: {
    //获取数据
    getData() {
      const self = this;
      let objData = {
        source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        page: this.cur_page, //页数
        limit: this.cur_limit, //条目数
        studentId: this.$store.state.chooseStudentInfo.student_id, //学生id
        organId: this.organId, // 机构id
        particular_year: this.particular_year, //int 年份
        season: this.season, // 季节：[暑假，秋季，寒假，春季]等
        periods: this.periods, //期别
        grade: this.grade, //适用年级，[一年级，二年级]等
        subject: this.subject, //科目，[数学，物理]等
        projectType: this.projectType, //项目类型 [长期，短期，公益，考试]等
        classType: this.classType, //班型，[超常，培优]等
        teacherName: this.teacherName, //老师名字
        className: this.className, //班级名称
        department: this.department, //学部，小学，初中，高中
        studentName: this.$store.state.chooseStudentInfo.student_name, //学生姓名
        studentMobile: this.$store.state.chooseStudentInfo.student_mobile, //学生电话
        studentNo: this.$store.state.chooseStudentInfo.student_no, //学生电话
        orderStatus: "01005" //订单状态
      };
      console.log("查询在读班级发起请求的参数", objData);
      this.$axios
        .post(this.GlobalVal.httpLink.queryStuentOrder, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              console.log("查询在读班级列表获取的对象", res.data);
              self.count = res.data.count;
              self.dataList = res.data.studentOrders;
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
    //重新选择了地区事件
    handleLocationChange(value) {},
    //重新筛选函数
    screening() {
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
      console.log("下架事件发起请求的参数", objData);
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
      console.log("上架事件发起请求的参数", objData);
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

    //每页显示数目发生变化
    handleSizeChange(val) {
      this.cur_limit = val;
      this.getData();
    },

    //搜索班级---刷新
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
      this.$router.push({
        path: "/editClass",
        query: {
          handle: "add"
        }
      });
    },

    //新增/修改班级等级--重置--暂时不用
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //搜索框动态提示内容
    queryTeacherOrClassname(queryString, cb) {
      if (this.selectTeacherOrClass === "class") {
        let objData = {
          staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
          page: 1, //页数
          limit: 10, //条目数
          className: queryString //班级名字
        };
        console.log("查询班级搜索提出内容发起请求的参数", objData);
        this.$axios
          .post(this.GlobalVal.httpLink.queryClassName, JSON.stringify(objData))
          .then(
            res => {
              if (res.data.code === "10000") {
                console.log("查询班级搜索提出内容获取的对象", res.data);
                cb(res.data.res);
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
      } else if (this.selectTeacherOrClass === "teacher") {
        let objData = {
          staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
          page: 1, //页数
          limit: 10, //条目数
          teacherName: queryString //班级名字
        };
        console.log("查询老师搜索提示内容发起请求的参数", objData);
        this.$axios
          .post(
            this.GlobalVal.httpLink.queryTeacherName,
            JSON.stringify(objData)
          )
          .then(
            res => {
              if (res.data.code === "10000") {
                console.log("查询老师搜索提示内容获取的对象", res.data);
                cb(res.data.res);
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
    },
    //转班按钮点击
    handleApply(index, row) {
      const self = this;
      console.log(row);
      this.$store.commit("setTurnClassInfo", row);
      this.$store.commit("setTurnSwitch", true);
      this.orderId = row.order_id;
      console.log(this.$store.state.isOrderId);
      this.classTimeLayer = true;
      this.rowInfo = row;
      //清空参数
      this.oldClassTimeOptions = [];
      this.newClassTimeOptions = [];
      this.ruleForm.oldClassSequence = null;
      this.ruleForm.newClassSequence = null;
      this.ruleForm.reason = "";
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        source: "PC",
        orderId: this.rowInfo.order_id //订单编号
      };
      console.log("查询上课表提示内容发起请求的参数", objData);
      this.$axios
        .post(this.GlobalVal.httpLink.getclassinfo, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              console.log("查询上课表示内容获取的对象", res.data);
              this.attendclassList = res.data.attendclassList;
              self.attendList = res.data.classinfo;
              this.$store.commit("setTurnClassInfo", self.attendList);
              console.log(this.$store.state.TurnClassInfo);
              /*  let timeOld = parseInt( self.attendList.left_times)-parseInt(self.attendList.left_times)+1;
                                              for(let i=timeOld; i<=parseInt(self.attendList.left_times); i++){
                                                  self.oldClassTimeOptions.push({
                                                      value:i,
                                                      label:"第"+i+"次"
                                                  })
                                              }
                                              let timeNew = parseInt(row.total_times)-parseInt(row.total_times)+1;
                                              for(let i=timeNew; i<=parseInt(row.total_times); i++){
                                                  self.newClassTimeOptions.push({
                                                      value:i,
                                                      label:"第"+i+"次"
                                                  })
                                              }*/
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
    submitRuleForm(ruleForm) {
      const self = this;
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
        orderId: this.rowInfo.order_id, //学生报名表id
        newClassId: this.rowInfo.class_id, //要转的班级id
        oldClassSequence: this.ruleForm.oldClassSequence, //原来最后一次课的课次
        newClassSequence: this.ruleForm.newClassSequence, //新班的第一次课的课次
        reason: this.ruleForm.reason // 转班理由
      };
      console.log("转班发起请求的参数", objData);
      /*let url ="";
                          if(this.$route.query.index===1){
                              url=this.GlobalVal.httpLink.turnClass;
                          }else if(this.$route.query.index===2){
                              url=this.GlobalVal.httpLink.changeCourseSchedule;
                          }else{
                              self.$notify({
                                  title: '警告',
                                  message: '操作错误,未知的请求',
                                  type: 'warning'
                              });
                              self.$router.push({
                                  path:"/adjustSchedule"
                              });
                          }*/
      this.$axios
        .post(this.GlobalVal.httpLink.turnClass, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              /* if(self.$route.query.index===1){*/
              self.$message({
                type: "success",
                message: "转班成功!"
              });
              /*}else {
                                                  self.$message({
                                                      type: 'success',
                                                      message: '调课成功!'
                                                  });
                                              }*/
              /*  self.$router.push({
                                                  path:"/adjustSchedule"
                                              });*/
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
    //调课按钮点击
    handleCourse(index, row) {
      const self = this;
      this.$store.commit("setTurnClassInfo", row);
      this.$store.commit("setCouserSwitch", true);
      this.classCourseLayer = true;
      this.orderId = row.order_id;
      this.rowInfo = row;
      //清空参数
      this.oldClassTimeOptions = [];
      this.newClassTimeOptions = [];
      this.ruleForm.oldClassSequence = null;
      this.ruleForm.newClassSequence = null;
      this.ruleForm.reason = "";
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        source: "PC",
        orderId: this.rowInfo.order_id //订单编号
      };
      console.log("查询上课表提示内容发起请求的参数", objData);
      this.$axios
        .post(this.GlobalVal.httpLink.getclassinfo, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              console.log("查询老师搜索提示内容获取的对象", res.data);
              self.attendList = res.data.classinfo;
              this.attendclassList = res.data.attendclassList;
              this.$store.commit("setClassCourseInfo", self.attendList);
              console.log(this.$store.state.ClassCourseInfo);
              /*let timeOld = parseInt( self.attendList.left_times)-parseInt(self.attendList.left_times)+1;
                                              for(let i=timeOld; i<=parseInt(self.attendList.left_times); i++){
                                                  self.oldClassTimeOptions.push({
                                                      value:i,
                                                      label:"第"+i+"次"
                                                  })
                                              }
                                              let timeNew = parseInt(row.total_times)-parseInt(row.total_times)+1;
                                              for(let i=timeNew; i<=parseInt(row.total_times); i++){
                                                  self.newClassTimeOptions.push({
                                                      value:i,
                                                      label:"第"+i+"次"
                                                  })
                                              }*/
              //this.$router.push({path: '/studentInfo/classRecord'});
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

      console.log(index);
    },
    submitCourseForm(ruleForm) {
      const self = this;
      let obj = {
        newClassId: this.rowInfo.class_id, //要转的班级id
        oldClassSequence: this.ruleForm.oldClassSequence, //原来最后一次课的课次
        newClassSequence: this.ruleForm.newClassSequence //新班的第一次课的课次
      };
      this.changeschedulelist.push(obj);
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
        orderId: this.rowInfo.order_id, //学生报名表id
        reason: this.ruleForm.reason, // 转班理由
        changeschedulelist: this.changeschedulelist
      };
      console.log("转班发起请求的参数", objData);
      /*let url ="";
                          if(this.$route.query.index===1){
                              url=this.GlobalVal.httpLink.turnClass;
                          }else if(this.$route.query.index===2){
                              url=this.GlobalVal.httpLink.changeCourseSchedule;
                          }else{
                              self.$notify({
                                  title: '警告',
                                  message: '操作错误,未知的请求',
                                  type: 'warning'
                              });
                              self.$router.push({
                                  path:"/adjustSchedule"
                              });
                          }*/
      this.$axios
        .post(
          this.GlobalVal.httpLink.changeCourseSchedule,
          JSON.stringify(objData)
        )
        .then(
          res => {
            if (res.data.code === "10000") {
              /* if(self.$route.query.index===1){*/
              self.$message({
                type: "success",
                message: "转班成功!"
              });
              /*}else {
                                                  self.$message({
                                                      type: 'success',
                                                      message: '调课成功!'
                                                  });
                                              }*/
              /*  self.$router.push({
                                                    path:"/adjustSchedule"
                                                });*/
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
    /*退费*/
    handlemoney(index, row) {
      const self = this;
      this.rowInfo = row;
      this.ruleForm.refundSinglePrice = row.single_price;

      this.ruleForm.classRefundAmount = row.single_price * row.left_times;
      this.classMoneyLayer = true;
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        source: "PC",
        orderId: this.rowInfo.order_id //订单编号
      };
      console.log("查询上课表提示内容发起请求的参数", objData);
      this.$axios
        .post(this.GlobalVal.httpLink.getRefundInfo, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              console.log("查询老师搜索提示内容获取的对象", res.data);
              self.getRefundInfoRes = res.data;
              self.moneyList = res.data.stuCheckinItem;
              self.checkinNum = res.data.checkinNum;
              self.signupOrder = res.data.signupOrder;
              self.liberalType = this.Util.GetLabelForValue(
                self.$store.state.LiberalTypeOptions,
                res.data.liberalType
              );
              // 优惠类型，02501：买赠优惠， 02502：均价优惠
              const { buyTimes, checkinNum, signupOrder } = res.data;
              switch (res.data.liberalType) {
                case "02501":
                  this.refundTimes =
                    Math.ceil(
                      signupOrder.real_payment / signupOrder.single_price
                    ) - checkinNum;
                  break;
                case "02502":
                default:
                  this.refundTimes = buyTimes - checkinNum;
              }
              //this.refundTimes = 0//res.data.signupOrder.left_times;
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
    submitMoneyForm(ruleForm, qx = false) {
      const self = this;
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          if (this.liberalType == "买赠优惠") {
            this.ruleForm.liberalType = "02501";
          } else if (this.liberalType == "均价优惠") {
            this.ruleForm.liberalType = "02502";
          }
          let objData = {
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            source: "PC",
            orderId: this.rowInfo.order_id, //订单编号
            liberalType: this.ruleForm.liberalType, //优惠类型，02501：买赠优惠， 02502：均价优惠
            refundSinglePrice: this.getRefundInfoRes.singlePrice, //退款时的单价，与实付价，买赠优惠，均价优惠有关，不是订单表中的单价
            checkinNum: this.checkinNum, //签到次数
            buyTimes: this.signupOrder.buyTimes, //购买次数
            refundTimes: this.refundTimes, //退课次数
            classRefundAmount: this.classRefundAmount, //退课价钱
            otherRefundAmount: this.otherRefundAmount, //额外退费
            refundReason: this.ruleForm.refundReason, //退款原因
            refundPayType: this.ruleForm.refundPayType, //退费支付方式
            bankCardPayee: this.ruleForm.bankCardPayee, //银行卡户主
            bankcardNo: this.ruleForm.bankcardNo, //银行卡帐号
            alipayAcount: "", //支付宝帐号
            wechatAcount: "", //微信帐号
            isexcessRefund: qx ? true : false // 是否超额退费
          };
          console.log("查询上课表提示内容发起请求的参数", objData);
          this.$axios
            .post(this.GlobalVal.httpLink.refund, JSON.stringify(objData))
            .then(
              res => {
                if (res.data.code === "10000") {
                  console.log("查询老师搜索提示内容获取的对象", res.data);
                  this.classMoneyLayer = false;
                  self.$message({
                    type: "success",
                    message: "退费成功"
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
        } else {
          return false;
        }
      });
    },
    //修改按钮事件
    printEdit(index, row) {
      this.printLayer = true;
      this.printInfo = row;
    },
    cencelPrint() {
      this.printLayer = false;
    },
    doPrint() {
      let newWindow = window.open("_blank"); //打开新窗口
      let codestr = document.getElementById("box").innerHTML; //获取需要生成pdf页面的div代码
      codestr += `<style>
                *{
                  margin: 0;
                  padding: 0;
                  font-size: 12px;
                }
                .qr-code-img{
                    position: absolute;
                    left: 5px;
                    top: 80px;
                }
                #box{
                    width: 800px;
                    height: 698px;
                    background-size:100%;
                    padding-top:1５0px;
                    box-sizing: border-box;
                    overflow: hidden;
                    color: #333333;
                    margin: 0 auto;
                }
                .s_center{
                    float: left;
                    width: 100vw;
                    height:auto;
                    position: relative;
                    overflow: hidden;
                }
                .s_centerLeft{
                    width: 60%;
                    float: left;
                    margin-left:10px;
                    overflow: hidden;
                }
                .s_LeftRight{
                  margin-top: -55px;
                }
                .s_LeftTop{
                    width: 100%;
                    height: auto;
                    overflow: hidden;
                }
                img.s_TowCode{
                    float: left;
                    display: block;
                    width:100px;
                    height: auto;
                }
                .s_essential{
                    float: right;
                    width: 50%;
                    margin-top:100px;
                    margin-right: 10px;
                }
                span.details{
                    display: inline-block;
                    width: 100%;
                    height: auto;
                    overflow: hidden;
                }
                span.details>i{
                    display: block;
                    text-align: right;
                    height: 20px;
                    line-height: 20px;
                    font-size: 12px;
                    color: gray;
                }
                span.details>p{
                    text-align: right;
                    height: 30px;
                    line-height: 30px;
                    font-weight: 700;
                }
                span.detailsLeft>i,span.detailsLeft>p{
                    text-align: left;
                }
                span.detailsLeft{
                    display: block;
                    margin-bottom:6px;
                }
                span.detailsLeft>i{
                    display: block;
                    height: 20px;
                    line-height: 20px;
                    font-size: 12px;
                    color: gray;
                }
                span.detailsLeft>p{
                    height: 30px;
                    line-height: 30px;
                    font-weight: 700;
                }
                span.shrink{
                    margin-bottom:6px;
                }
                span.shrink>i{
                    height: 16px;
                    line-height: 16px;
                    font-size: 12px;
                    color: gray;
                }
                span.shrink>p{
                    height: 18px;
                    line-height: 18px;
                    font-size: 12px;
                }
                .s_centerRight{
                    width: 400px;
                    height: 100%;
                    float: left;
                    position: absolute;
                    right: -215px;
                    top: 0;
                    -moz-transform:rotate(-90deg);
                    -webkit-transform:rotate(-90deg);
                    -o-transform:rotate(-90deg);
                    -ms-transform:rotate(-90deg);
                    transform:rotate(-90deg);
                }
                .s_Leftzoom{
                    float: left;
                    width: 65%;
                    height: auto;
                }
                .s_Flortzoom{
                    width: 35%;
                    height: auto;
                    margin-top: -10px;
                    position: absolute;
                    top: 0;
                    right: 68px;
                }
                .s_Flortzoom .qr-code-img{
                  top: 46px;
                  left: auto;
                  right: 0;
                }
                </style>`;
      newWindow.document.write(codestr); //向文档写入HTML表达式或者JavaScript代码
      newWindow.document.close(); //关闭document的输出流, 显示选定的数据
      newWindow.print(); //打印当前窗口
      return true;
    },
    turnClass() {
      this.classTimeLayer = false;
      this.$store.commit("setTurnSwitch", false);
    },
    couserClass() {
      this.classCourseLayer = false;
      this.$store.commit("setCouserSwitch", false);
    },
    goback() {
      this.$router.push({
        path: "/apply"
      });
    }
  }
};
</script>
