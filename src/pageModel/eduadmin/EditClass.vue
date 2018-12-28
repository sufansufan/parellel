<template>
  <div class="edit-class-warp table">
    <div class="edit-class-form-warp">
      <div class="stepActive">
        <el-steps
          :active="active"
          finish-status="success"
        >
          <el-step title="基本信息"></el-step>
          <el-step title="上课安排"></el-step>
          <el-step title="安排完成"></el-step>
        </el-steps>
      </div>
      <div v-if="nextActive">
        <el-form
          :model="ruleForm"
          size="mini"
          :rules="rules"
          ref="ruleForm"
          style="padding-left: 80px"
          class="departmentClass"
        >
          <el-row>
            <el-col
              :span="3"
              :offset="1"
            >
              <el-form-item
                label="年份"
                v-show="$route.query.handle == 'add'"
              >
                <el-select
                  v-model="ruleForm.particular_year"
                  size="mini"
                  placeholder="请选择"
                  style="width: 100%;"
                >
                  <el-option
                    v-for="item in $store.state.YearOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="年份"
                v-show="$route.query.handle == 'edit'"
              >
                <el-select
                  v-model="ruleForm.particular_year"
                  size="mini"
                  placeholder="请选择"
                  style="width: 100%;"
                  disabled
                >
                  <el-option
                    v-for="item in $store.state.YearOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              :span="3"
              :offset="1"
            >
              <el-form-item
                label="季节"
                v-show="$route.query.handle == 'add'"
                prop="season"
              >
                <el-select
                  v-model="ruleForm.season"
                  size="mini"
                  placeholder="请选择"
                  style="width: 100%;"
                >
                  <el-option
                    v-for="item in $store.state.SeasonOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="季节"
                v-show="$route.query.handle == 'edit'"
              >
                <el-select
                  v-model="ruleForm.season"
                  size="mini"
                  placeholder="请选择"
                  style="width: 100%;"
                  disabled
                >
                  <el-option
                    v-for="item in $store.state.SeasonOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              :span="3"
              :offset="1"
            >
              <el-form-item label="期别">
                <el-select
                  v-model="ruleForm.periods"
                  size="mini"
                  placeholder="请选择"
                  style="width: 100%;"
                  :disabled="ruleForm.season === '00602' || ruleForm.season ==='00604'"
                >
                  <el-option
                    v-for="item in $store.state.PeriodsOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              :span="3"
              :offset="1"
            >
              <el-form-item
                label="科目"
                v-show="$route.query.handle == 'add'"
                prop="subject"
              >
                <el-select
                  v-model="ruleForm.subject"
                  size="mini"
                  placeholder="请选择"
                  style="width: 100%;"
                >
                  <el-option
                    v-for="item in $store.state.SubjectOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="科目"
                v-show="$route.query.handle == 'edit'"
              >
                <el-select
                  v-model="ruleForm.subject"
                  size="mini"
                  placeholder="请选择"
                  style="width: 100%;"
                  disabled
                >
                  <el-option
                    v-for="item in $store.state.SubjectOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              :span="3"
              :offset="1"
            >
              <el-form-item
                label="类别"
                v-show="$route.query.handle == 'add'"
                prop="project_type"
              >
                <el-select
                  v-model="ruleForm.project_type"
                  size="mini"
                  placeholder="请选择"
                  style="width: 100%;"
                >
                  <el-option
                    v-for="item in $store.state.ProjectTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="类别"
                v-show="$route.query.handle == 'edit'"
              >
                <el-select
                  v-model="ruleForm.project_type"
                  size="mini"
                  placeholder="请选择"
                  style="width: 100%;"
                >
                  <el-option
                    v-for="item in $store.state.ProjectTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col
              :span="3"
              :offset="1"
            >
              <el-form-item
                label="校区"
                v-show="$route.query.handle == 'add'"
              >
                <el-cascader
                  clearable
                  style="width: 100%;"
                  expand-trigger="click"
                  :options="location"
                  v-model="selectedLocation"
                  @change="frontClass"
                >
                </el-cascader>
              </el-form-item>
              <el-form-item
                label="校区"
                v-show="$route.query.handle == 'edit'"
              >
                <el-cascader
                  clearable
                  disabled
                  style="width: 100%;"
                  expand-trigger="click"
                  :options="location"
                  v-model="selectedLocation"
                  @change="frontClass"
                >
                </el-cascader>
              </el-form-item>
              <!-- <el-form-item label="类别">
                            <el-select v-model="ruleForm.course_type" size="mini" placeholder="请选择" style="width: 100%;">
                                <el-option
                                        v-for="item in $store.state.CourseTypeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>-->
            </el-col>
            <el-col
              :span="3"
              :offset="1"
            >
              <el-form-item label="老师区域">
                <el-select
                  v-model="teacherArea"
                  placeholder="请选择老师区域"
                  style="width: 100%"
                >
                  <!--<el-option label="总部老师" value="1"></el-option>-->
                  <el-option
                    label="大区老师"
                    value="2"
                  ></el-option>
                  <el-option
                    label="城市老师"
                    value="3"
                  ></el-option>
                  <el-option
                    label="校区老师"
                    value="4"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              :span="3"
              :offset="1"
            >
              <el-form-item
                label="年级"
                v-show="$route.query.handle == 'add'"
                prop="grade"
              >
                <el-select
                  v-model="ruleForm.grade"
                  size="mini"
                  placeholder="请选择"
                  style="width: 100%;"
                >
                  <el-option
                    v-for="item in $store.state.GradeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="年级"
                v-show="$route.query.handle == 'edit'"
              >
                <el-select
                  v-model="ruleForm.grade"
                  size="mini"
                  placeholder="请选择"
                  style="width: 100%;"
                  disabled
                >
                  <el-option
                    v-for="item in $store.state.GradeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              :span="3"
              :offset="1"
            >
              <el-form-item
                label="学部"
                v-show="$route.query.handle == 'add'"
                prop="department"
              >
                <el-select
                  v-model="ruleForm.department"
                  size="mini"
                  placeholder="请选择"
                  style="width: 100%;"
                  disabled
                >
                  <el-option
                    v-for="item in $store.state.DepartmentOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="学部"
                v-show="$route.query.handle == 'edit'"
              >
                <el-select
                  v-model="ruleForm.department"
                  size="mini"
                  placeholder="请选择"
                  style="width: 100%;"
                  disabled
                >
                  <el-option
                    v-for="item in $store.state.DepartmentOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              :span="3"
              :offset="1"
            >
              <el-form-item
                label="班型"
                prop="class_type"
              >
                <el-select
                  v-model="ruleForm.class_type"
                  size="mini"
                  placeholder="请选择"
                  style="width: 100%;"
                >
                  <el-option
                    v-for="item in $store.state.ClassTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col
              :span="3"
              :offset="1"
            >
              <el-form-item label="老师">
                <span style="font-size: 14px;color:#606266; float: right">工号:{{teacher_no}}</span>
                <el-autocomplete
                  style="width: 100%;"
                  popper-class="my-autocomplete"
                  v-model="teacher_name_no"
                  :fetch-suggestions="queryTeachers"
                  placeholder="请输入内容"
                  @select="handleSelectTeacher"
                  size="mini"
                  @blur="() => (this.teacher_no = '')"
                >
                  <template slot-scope="{ item }">
                    <div
                      class="name"
                      style="text-align: left;font-size:14px;"
                    >{{ item.teacher_name }} / {{ item.teacher_no }}</div>
                  </template>
                </el-autocomplete>
              </el-form-item>
            </el-col>
            <el-col
              :span="3"
              :offset="1"
            >
              <el-form-item
                label="班级名称"
                prop="class_name"
              >
                <el-input
                  style="width: 100%;"
                  v-model="ruleForm.class_name"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col
              :span="3"
              :offset="1"
            >
              <el-form-item
                label="班级名称补充"
                prop="class_name1"
              >
                <el-input
                  style="width: 100%;"
                  v-model="ruleForm.class_name1"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col
              :span="3"
              :offset="1"
            >
              <el-form-item
                label="要入学测试"
                prop="require_entrytest"
              >
                <el-select
                  v-model="ruleForm.require_entrytest"
                  placeholder="请选择"
                  style="width: 100%;"
                  size="mini"
                >
                  <el-option
                    label="是"
                    :value="true"
                  ></el-option>
                  <el-option
                    label="否"
                    :value="false"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              :span="3"
              :offset="1"
            >
              <el-form-item
                label="分数线"
                prop="min_entry_score"
              >
                <el-input
                  style="width: 100%;"
                  v-model="ruleForm.min_entry_score"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col
              :span="3"
              :offset="1"
            >
              <el-form-item
                label="学费"
                prop="total_price"
                v-show="$route.query.handle == 'add'"
              >
                <el-input
                  style="width: 100%;"
                  @blur="parseFloatRule('total_price')"
                  v-model="ruleForm.total_price"
                  :maxlength="6"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="学费"
                prop="total_price"
                v-show="$route.query.handle == 'edit'"
              >
                <el-input
                  style="width: 100%;"
                  @blur="parseFloatRule('total_price')"
                  v-model="ruleForm.total_price"
                  :maxlength="6"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col
              :span="3"
              :offset="1"
            >
              <el-form-item
                label="招生人数"
                prop="max_students_no"
              >
                <el-input
                  style="width: 100%;"
                  v-model="ruleForm.max_students_no"
                  :maxlength="3"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col
              :span="3"
              :offset="1"
            >
              <el-form-item
                label="允许超额人数"
                prop="excess_no"
              >
                <el-input
                  style="width: 100%;"
                  :maxlength="2"
                  v-model="ruleForm.excess_no"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col
              :span="3"
              :offset="1"
            >
              <el-form-item
                label="课次"
                prop="total_times"
                v-show="$route.query.handle == 'add'"
              >
                <el-input
                  style="width: 100%;"
                  v-model="ruleForm.total_times"
                  :maxlength="3"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="课次"
                prop="total_times"
                v-show="$route.query.handle == 'edit'"
              >
                <el-input
                  style="width: 100%;"
                  v-model="ruleForm.total_times"
                  :maxlength="3"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col
              :span="3"
              :offset="1"
            >
              <el-form-item
                label="大班标准人数"
                prop="bigclass_standard"
              >
                <el-input
                  style="width: 100%;"
                  v-model="ruleForm.bigclass_standard"
                  :maxlength="3"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col
              :span="3"
              :offset="1"
            >
              <el-form-item
                label="上课教室"
                prop="classroom_id"
              >
                <el-select
                  v-model="ruleForm.classroom_id"
                  size="mini"
                  placeholder="请选择教室"
                  style="width: 100%;"
                >
                  <el-option
                    v-for="item in classRooms"
                    :key="item.croom_id"
                    :label="item.croom_name"
                    :value="item.croom_id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              :span="3"
              :offset="1"
            >
              <el-form-item label="上课时间段">
                <el-select
                  v-model="ruleForm.time_id"
                  size="mini"
                  placeholder="请选择上课时间段"
                  style="width: 100%;"
                >
                  <el-option
                    v-for="item in timeSlot"
                    :key="item.time_slot_id"
                    :label="item.time_slot_name"
                    :value="item.time_slot_id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              :span="3"
              :offset="1"
            >
              <el-form-item label="时间安排规律">
                <!--  <el-select v-model="ruleForm.date_id" size="mini" placeholder="请选择时间安排规律" style="width: 100%;">
                  <el-option v-for="item in dateSlots" :key="item.date_slot_id" :label="item.date_slot_name" :value="item.date_slot_id">
                  </el-option>
                </el-select> -->
                <el-autocomplete
                  v-model="date_slot_name"
                  :fetch-suggestions="queryTimeLaw"
                  placeholder="请选择时间安排规律"
                  @select="selectTimeLaw"
                  style="width:110%;"
                >
                  <template slot-scope="{ item }">
                    <div
                      class="name"
                      style="font-size:12px; text-align:left; "
                    >{{ item.date_slot_name }}</div>
                  </template>
                </el-autocomplete>
              </el-form-item>
            </el-col>
            <el-col
              :span="3"
              :offset="1"
            >
              <el-form-item label="转班条件">
                <el-select
                  v-model="ruleForm.turn_class_condition"
                  placeholder="请选择"
                  style="width: 100%;"
                  size="mini"
                >
                  <el-option
                    v-for="item in $store.state.TurnClassConditionOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              :span="3"
              :offset="1"
              v-if="flag"
            >
              <el-form-item label="前导班级">
                <el-select
                  v-model="ruleForm.preclassids"
                  size="mini"
                  placeholder="请选择"
                  style="width: 100%;"
                >
                  <el-option
                    multiple
                    v-for="item in frontclass"
                    :key="item.value"
                    :label="item.class_name"
                    :value="item.class_id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              :span="3"
              :offset="1"
              v-if="flag"
            >
              <el-form-item label="辅导老师">
                <span style="font-size: 14px;color:#606266; float: right">工号：{{teacher1_no}}</span>
                <el-autocomplete
                  style="width: 100%;"
                  v-model="teacher1_name_no"
                  :fetch-suggestions="queryTeachers"
                  placeholder="请输入内容"
                  @select="handleSelectTeacher1"
                  size="mini"
                  @blur="() => (this.teacher1_no = '')"
                >
                  <template slot-scope="{ item }">
                    <div
                      class="name"
                      style="text-align: left;font-size:14px;"
                    >{{ item.teacher_name }} / {{ item.teacher_no }}</div>
                  </template>
                </el-autocomplete>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col
              :span="3"
              :offset="1"
              v-if="flag"
            >
              <el-form-item label="优惠类型">
                <el-select
                  v-model="ruleForm.liberal_type"
                  size="mini"
                  placeholder="请选择"
                  style="width: 100%;"
                >
                  <el-option
                    v-for="item in $store.state.LiberalTypeOptions"
                    :disabled="item.value==='02501'"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              :span="20"
              style="margin-top:40px;margin-left:20px;"
            >
              <el-checkbox
                v-model="ruleForm.charge_generation"
                style="margin-left: 50px"
              >是否代收费</el-checkbox>
              <el-checkbox v-model="ruleForm.web_signup_enable">APP显示</el-checkbox>
              <el-checkbox v-model="ruleForm.hot_recommend">热门班级</el-checkbox>
              <el-checkbox v-model="ruleForm.only_show_in_background">仅后台可见</el-checkbox>
              <el-checkbox v-model="ruleForm.attend_enable">允许旁听</el-checkbox>
              <!-- <el-checkbox v-model="ruleForm.require_entrytest">要入学测试</el-checkbox> -->
              <el-checkbox v-model="weekDay.monday" true-label="周一">周一</el-checkbox>
              <el-checkbox v-model="weekDay.tuesday" true-label="周二">周二</el-checkbox>
              <el-checkbox v-model="weekDay.wednesday" true-label="周三">周三</el-checkbox>
              <el-checkbox v-model="weekDay.thursday" true-label="周四">周四</el-checkbox>
              <el-checkbox v-model="weekDay.friday" true-label="周五">周五</el-checkbox>
              <el-checkbox v-model="weekDay.saturday" true-label="周六">周六</el-checkbox>
              <el-checkbox v-model="weekDay.sunday" true-label="周日">周日</el-checkbox>
            </el-col>
          </el-row>
          <el-form-item>
            <div style="display: flex;justify-content: center;margin-top: 40px;margin-left: -150px">
              <el-button
                v-if="queryHandle!=='edit'"
                type="primary"
                @click="submitForm('ruleForm')"
                style="width: 100px;margin-right:10px;"
              >立即创建</el-button>
              <el-button
                v-if="queryHandle=='edit'"
                type="primary"
                @click="submitForm('ruleForm')"
                style="width: 100px; margin-right:10px;"
              >确认修改</el-button>
              <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
              <el-button
                @click="cancel"
                type="primary"
                style="width: 100px;"
              >取消</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <!--课节安排-->
      <div
        v-if="nextActuveDate"
        class="nextDate"
      >
        <el-form
          :model="attendClasses"
          size="mini"
          :rules="rules"
          ref="attendClasses"
          label-width="120px"
        >
          <p style="font-size:16px;color:#66686f;margin-bottom:20px;"><b>班级:{{attendClasses[0].class_name}}</b></p>
          <div class="classArrange">
            <p class="courseArrange">课节安排:</p>
            <el-row
              :gutter="20"
              style="font-weight: 700; font-size: 14px;"
              class="course-arrange-tital"
            >
              <el-col
                style="width:50px;margin-left:20px;"
                class="classindex"
              >序号</el-col>
              <el-col
                style="margin-left:25px; width:220px;"
                class="classindex"
              >选择日期</el-col>
              <el-col
                style="margin-left:20px; width:127px;"
                class="classindex"
              >选择时段</el-col>
              <el-col
                :span="4"
                style="margin-left:20px;width:180px;"
                class="classindex"
              >选择老师</el-col>
              <el-col
                style="margin-left:20px;width:100px;"
                class="classindex"
              >工号</el-col>
              <el-col
                :span="3"
                style="margin-left:20px;width:190px;"
                class="classindex"
              >选择教室</el-col>
            </el-row>
            <el-row
              :gutter="20"
              v-for="(item,index) in attendClasses"
              :key="index"
              class="course-arrange-details"
            >
              <el-col style="text-align: center;line-height: 28px;border: 1px solid #dcdfe6; margin:0 15px 0 20px;width:50px; height:100%">{{index+1}}</el-col>
              <el-col :span="3.5">
                <el-date-picker
                  v-model="start_datetime[index]"
                  type="date"
                  size="mini"
                  placeholder="请选择开始日期"
                >
                </el-date-picker>
              </el-col>
              <el-col :span="3">
                <el-select
                  v-model="startDate[index]"
                  size="mini"
                  placeholder="请选择上课时间段"
                  style="width: 127px;"
                >
                  <el-option
                    v-for="item in timeSlot"
                    :key="item.time_slot_id"
                    :label="item.time_slot_name"
                    :value="item.time_slot_name"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <!--  <el-col :span="3.5">
                        <el-time-picker
                            arrow-control
                            v-model="startDate[index]"
                            size="mini"
                            placeholder="开始时段">
                        </el-time-picker>
                    </el-col> -->
              <!-- <el-col :span="3.5">
                        <el-date-picker
                                v-model="end_datetime[index]"
                                type="date"
                                size="mini"
                                placeholder="请选择结束日期">
                        </el-date-picker>
                    </el-col> -->
              <!-- <el-col :span="3.5">
                        <el-time-picker
                            arrow-control
                            v-model="endDate[index]"
                            size="mini"
                            placeholder="结束时段">
                        </el-time-picker>
                    </el-col> -->
              <!--   <el-col :span="4">
                        <el-select v-model="ruleForm.time_id" size="mini" placeholder="请选择时段" style="width: 100%;">
                            <el-option
                                    v-for="item in timeSlot"
                                    :key=""
                                    :label="item.spendhours"
                                    :value="item.time_slot_id">
                            </el-option>
                        </el-select>
                    </el-col>-->
              <el-col :span="3.5">
                <el-autocomplete
                  style="width: 180px; margin-left: 16px"
                  v-model="teacher_name[index]"
                  :fetch-suggestions="queryTeachers"
                  placeholder="请选择老师"
                  @select="handleSelectTeacher2($event,index)"
                  size="mini"
                >
                  <template slot-scope="{ item }">
                    <div
                      class="name"
                      style="text-align: left;font-size:14px;"
                    >{{ item.teacher_name }} / {{ item.teacher_no }}</div>
                  </template>
                </el-autocomplete>
              </el-col>
              <el-col
                :span="3"
                style="text-align:center;"
              >
                <span style="line-height:34px;">{{teacher_name[index].split('/')[1] || ''}}</span>
              </el-col>
              <el-col style="width:210px;margin-left: -10px;">
                <el-select
                  v-model="classroom_id[index]"
                  size="mini"
                  placeholder="请选择教室"
                  style="width: 100%;"
                >
                  <el-option
                    v-for="item in classRooms"
                    :key="item.croom_id"
                    :label="item.croom_name"
                    :value="item.croom_id"
                  >
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </div>
        </el-form>
        <div style="display: flex;justify-content: center;margin-top: 20px;">
          <el-button
            style="width: 100px;margin-right:10px;"
            type="primary"
            size="mini"
            @click="before"
          >上一步</el-button>
          <el-button
            style="width: 100px"
            type="primary"
            size="mini"
            @click="attendForm('attendClasses')"
          >保存</el-button>
          <el-button
            style="width: 100px;margin-left:10px;"
            type="primary"
            size="mini"
            @click="cancel"
          >取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: false,
      queryHandle: "",
      classRoom: [], //教室
      timeSlot: [], //时间段
      dateSlots: [], //日期
      changeTeamLayer: false,
      teachers: [], //test
      location: [],
      frontclass: [],
      organId: "",
      schoolId: "",
      branchSchoolId: "",
      selectedLocation: [],
      classRooms: [],
      //attendClasses:[], //学生上课list
      organ_name: "", //获取的机构名称
      turn_class_condition: "", //转班条件
      charge_generation: "", //是否代收费
      web_signup_enable: "", //App显示
      hot_recommend: false, //热门班级
      only_show_in_background: false, //仅后台可见
      attend_enable: false, //允许旁听
      require_entrytest: false, //入学测试
      nextActive: true, //进度条页面
      nextActuveDate: false, //微调课程安排规律
      active: 0,
      start_time: [], //开始时间
      end_time: [], //结束时间
      start_datetime: [],
      end_datetime: [],
      startDate: [],
      endDate: [],
      teacher_name: [],
      classroom_id: [],
      teacherArea: "3",
      teacher_id: [],

      date_slot_name: "",
      teacher_name_no: "",
      teacher1_name_no: "",
      teacher_no: "",
      teacher1_no: "",
      weekDay:{
        monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        saturday: '',
        sunday: '',
      },
      ruleForm: {
        //新增数据
        class_id: null, //Id,主键
        class_name: "", //班级名称
        class_name1: "", //补充班级
        school_id: "", //大区id   ----> 给 null
        school_name: "", //大区名称   ----> 给 null
        bigclass_standard: "",
        branch_school_id: "", //分校id   ----> 给 null
        branch_school_name: "", //分校名字   ----> 给 null
        campus_id: null, //校区ID   ----> 给 null
        campus_name: "", //校区名字   ----> 给 null
        teacher_id: null, //教师id
        teacher_name: "", //教师名字
        teacher1_id: "", //辅导教师id
        teacher1_name: "", //辅导教师姓名
        time_name: "", //时间段名称
        time_id: null, //时间ID
        date_name: "", //日期
        date_id: null, //日期id
        total_times: null, //课程总次数
        left_times: null, //剩余次数
        //total_fee:null, //课程总费用
        single_price: "", //单价
        total_price: "", //
        project_type: "", //项目类型：[长期，短期，公益，考试]等
        course_type: "", //课程类型，[小学数学，小升初专题]等
        class_type: "", //班型，[超常，培优]等
        subject: "", //科目，[数学，物理]等
        grade: "", //适用年级，[一年级，二年级]等
        season: "", // 期别：[暑假，秋季，寒假，春季]等
        min_entry_score: null, //最低入学成绩
        max_students_no: null, //最多人数
        //entry_rank:"",  //报名级别
        excess_no: null, //超额   ----> 给 null
        signup_number: null, //报名人数   ----> 给 null
        payment_number: null, //缴费人数   ----> 给 null
        remain_number: null, //剩余名额,   ----> 给 null
        waiting_number: null, //候补人数   ----> 给 null
        classroom_id: null, //教室 id
        classroom_name: "", //教室名字
        particular_year: new Date().getFullYear(), //年份，2003
        department: "", //学部
        periods: "", //期数,
        city_no: "", //城市编号   ----> 给 null
        city_name: "", //城市名称   ----> 给 null
        province_no: "", //省编号,   ----> 给 null
        province_name: "", //省名称,   ----> 给 null
        district_name: "", //行政区名称
        district_no: "", //行政区编号
        web_signup_enable: false,
        attend_enable: "",
        hot_recommend: "",
        charge_generation: false,
        require_entrytest: "",
        status: false,
        resubmit_signup_starttime: "",
        resubmit_signup_endtime: "",
        reception_signup_starttime: "",
        reception_signup_endtime: "",
        web_signup_starttime: "",
        web_signup_endtime: "",
        app_signup_starttime: "",
        app_signup_endtime: "",
        app_re_signup_starttime: "",
        app_re_signup_endtime: "",
        only_show_in_background: "",
        turn_class_condition: "02403",
        liberal_type: "02502",
        start_time: "",
        end_time: "",
        start_date: "",
        end_date: "",
        class_week_day: "",
        created_at: null,
        updated_at: null,
        preclassids: "",
        teacher_name_no: "",
        teacher1_name_no: ""
      },
      attendClasses: [],
      rules: {
        year: [{ required: true, message: "请选择年份", trigger: "blur" }],
        season: [{ required: true, message: "请选择季节", trigger: "blur" }],
        periods: [
          { required: true, message: "请选择期别", trigger: ["blur", "change"] }
        ],
        subject: [{ required: true, message: "请选择科目", trigger: "blur" }],
        project_type: [
          { required: true, message: "请选择类别", trigger: "blur" }
        ],
        grade: [{ required: true, message: "请选择年级", trigger: "blur" }],
        department: [
          { required: true, message: "请选择学部", trigger: "blur" }
        ],
        classroom: [{ required: true, message: "请选择教室", trigger: "blur" }],
        class_type: [
          { required: true, message: "请选择班型", trigger: "blur" }
        ],
        /*  classroom_id: [
          {required: true, message: "请选择上课教室", trigger: "blur"}
        ], */
        total_price: [
          { required: true, validator: this.Checkout.number2, trigger: "blur" }
        ],
        total_times: [
          { required: true, validator: this.Checkout.number2, trigger: "blur" }
        ],
        /*  teacher_name_no: [
          {
            required: true,
            message: "请输入老师姓名",
            trigger: ["blur", "change"]
          }
        ], */
        require_entrytest: [
          { required: true, message: "请选择", trigger: ["blur", "change"] }
        ],
        /*min_entry_score: [
                        { required: true, validator: this.Checkout.number1, trigger: 'blur' },
                    ],*/
        class_name: [
          { required: true, message: "请输入班级名称", trigger: "blur" }
        ],
        class_name1: [
          { message: "请输入班级补充名称", trigger: "blur" },
          { min: 1, max: 12, message: "最多输入12个字符", trigger: "blur" }
        ],
        max_students_no: [
          { required: true, message: "请输入招生人数", trigger: "blur" }
        ],
        excess_no: [
          { required: true, message: "请输入允许超额人数", trigger: "blur" }
        ]
        /*bigclass_standard:[
                        { required: true, message: '请输入大班标准人数', trigger: 'blur' },
                    ],*/
      }
    };
  },
  created() {
    const self = this;
    let chooseClassMge = this.$store.state.chooseClassMge;
    let chooseSchool = [];
    chooseSchool[0] = 1;
    this.selectedLocation = chooseSchool;
    this.Util.queryAreaNav(self, -1, function() {});
    self.location = self.$store.state.location;
    self.organId = self.$store.state.organId;
    this.Util.querySysconst(this, "021", this.$store.state.KnowChannleOptions); //查询了解渠道
    this.Util.querySysconst(this, "100", this.$store.state.SubjectOptions); //查询科目
    this.Util.querySysconst(this, "006", this.$store.state.SeasonOptions); //查询季节
    this.Util.querySysconst(this, "009", this.$store.state.PeriodsOptions); //查询期别
    this.Util.querySysconst(this, "101", this.$store.state.GradeOptions); //查询年级
    this.Util.querySysconst(this, "002", this.$store.state.CourseTypeOptions); //查询类别/课型
    this.Util.querySysconst(this, "003", this.$store.state.ClassTypeOptions); //查询班型
    this.Util.querySysconst(this, "007", this.$store.state.DepartmentOptions); //查询学部
    this.Util.querySysconst(this, "025", this.$store.state.LiberalTypeOptions); //优惠类型
    this.Util.querySysconst(
      this,
      "024",
      this.$store.state.TurnClassConditionOptions
    ); //转班条件
    this.Util.querySysconst(this, "001", this.$store.state.ProjectTypeOptions); //项目类型
    this.attendClass();
    this.timeRule();
    this.timeStep();
    this.queryHandle = this.$route.query.handle;
    let id = this.$route.query.id;
    if (this.$route.query.handle === "edit") {
      let objData = {
        id,
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        source: this.GlobalVal.constants.source
      };
      this.$axios
        .post(this.GlobalVal.httpLink.getClassById, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              if (this.queryHandle === "edit") {
                let chooseClassMge = res.data.pxxclass;
                this.ruleForm = chooseClassMge;
                this.selectedLocation.push(chooseClassMge.school_id);
                this.selectedLocation.push(chooseClassMge.branch_school_id);
                this.selectedLocation.push(chooseClassMge.campus_id);
                this.$nextTick(() => {
                  this.getCampusTeachers();
                  this.attendClass();
                });
                this.ruleForm.class_id = chooseClassMge.class_id;
                this.ruleForm.class_name = chooseClassMge.class_name; //班级名称
                this.ruleForm.school_id = chooseClassMge.school_id; //大区id   ----> 给 null
                this.ruleForm.school_name = chooseClassMge.school_name; //大区名称   ----> 给 null
                this.ruleForm.branch_school_id =
                  chooseClassMge.branch_school_id; //分校id   ----> 给 null
                this.ruleForm.branch_school_name =
                  chooseClassMge.branch_school_name; //分校名字   ----> 给 null
                this.ruleForm.campus_id = chooseClassMge.campus_id; //校区ID   ----> 给 null
                this.ruleForm.campus_name = chooseClassMge.campus_name; //校区名字   ----> 给 null
                this.ruleForm.teacher_id = chooseClassMge.teacher_id; //教师id
                this.ruleForm.teacher_name = chooseClassMge.teacher_name; //教师名字
                this.ruleForm.teacher1_name = chooseClassMge.teacher1_name; //教师名字
                this.ruleForm.time_name = chooseClassMge.time_name; //时间段名称
                this.ruleForm.time_id = chooseClassMge.time_id; //时间ID
                this.ruleForm.date_name = chooseClassMge.date_name; //日期
                this.ruleForm.date_id = chooseClassMge.date_id; //日期id
                this.date_slot_name = chooseClassMge.date_name;
                this.ruleForm.total_times = chooseClassMge.total_times; //课程总次数
                this.ruleForm.left_times = chooseClassMge.left_times; //剩余次数
                this.ruleForm.project_type = chooseClassMge.project_type; //项目类型：[长期，短期，公益，考试]等
                this.ruleForm.course_type = chooseClassMge.course_type; //课程类型，[小学数学，小升初专题]等
                this.ruleForm.class_type = chooseClassMge.class_type; //班型，[超常，培优]等
                this.ruleForm.grade = chooseClassMge.grade; //适用年级，[一年级，二年级]等
                this.ruleForm.season = chooseClassMge.season; // 期别：[暑假，秋季，寒假，春季]等
                if (
                  chooseClassMge.season === "00602" ||
                  chooseClassMge.season === "00604"
                ) {
                  this.ruleForm.periods = "";
                }
                this.ruleForm.min_entry_score = chooseClassMge.min_entry_score; //最低入学成绩
                this.ruleForm.max_students_no = chooseClassMge.max_students_no; //最多人数
                this.ruleForm.excess_no = chooseClassMge.excess_no; //超额   ----> 给 null
                this.signup_number = chooseClassMge.signup_number; //报名人数   ----> 给 null
                this.ruleForm.payment_number = chooseClassMge.payment_number; //缴费人数   ----> 给 null
                this.ruleForm.remain_number = chooseClassMge.remain_number; //剩余名额,   ----> 给 null
                this.ruleForm.waiting_number = chooseClassMge.waiting_number; //候补人数   ----> 给 null
                this.ruleForm.classroom_id = chooseClassMge.classroom_id; //教室 id
                this.ruleForm.classroom_name = chooseClassMge.classroom_name; //教室名字
                this.ruleForm.particular_year = chooseClassMge.particular_year; //年份，2003
                let periods = chooseClassMge.periods;
                this.ruleForm.city_no = chooseClassMge.city_no; //城市编号   ----> 给 null
                this.ruleForm.city_name = chooseClassMge.city_name; //城市名称   ----> 给 null
                this.ruleForm.province_no = chooseClassMge.province_no; //省编号,   ----> 给 null
                this.ruleForm.province_name = chooseClassMge.province_name; //省名称,   ----> 给 null
                this.ruleForm.web_signup_starttime =
                  chooseClassMge.web_signup_starttime; //网络报名开始时间
                this.ruleForm.web_signup_endtime =
                  chooseClassMge.web_signup_endtime; //网络报名结束时间
                if (chooseClassMge.status == "上架") {
                  this.ruleForm.status = true;
                } else if (chooseClassMge.status == "下架") {
                  this.ruleForm.status = false;
                }
                this.ruleForm.created_at = chooseClassMge.created_at; //创建时间
                this.ruleForm.turn_class_condition =
                  chooseClassMge.turn_class_condition;
                this.ruleForm.only_show_in_background =
                  chooseClassMge.only_show_in_background;
                this.ruleForm.liberal_type = chooseClassMge.liberal_type;
                this.ruleForm.web_signup_enable =
                  chooseClassMge.web_signup_enable;
                this.ruleForm.attend_enable = chooseClassMge.attend_enable;
                this.ruleForm.hot_recommend = chooseClassMge.hot_recommend;
                this.ruleForm.charge_generation =
                  chooseClassMge.charge_generation;
                this.ruleForm.require_entrytest =
                  chooseClassMge.require_entrytest;
                this.ruleForm.require_entrytest =
                  chooseClassMge.require_entrytest;
                this.ruleForm.resubmit_signup_starttime =
                  chooseClassMge.resubmit_signup_starttime;
                this.ruleForm.resubmit_signup_endtime =
                  chooseClassMge.resubmit_signup_endtime;
                this.ruleForm.reception_signup_endtime =
                  chooseClassMge.reception_signup_endtime;
                this.ruleForm.web_signup_starttime =
                  chooseClassMge.web_signup_starttime;
                this.ruleForm.web_signup_endtime =
                  chooseClassMge.web_signup_endtime;
                this.ruleForm.app_signup_starttime =
                  chooseClassMge.app_signup_starttime;
                this.ruleForm.app_signup_endtime =
                  chooseClassMge.app_signup_endtime;
                this.ruleForm.app_re_signup_starttime =
                  chooseClassMge.app_re_signup_starttime;
                this.ruleForm.only_show_in_background =
                  chooseClassMge.only_show_in_background;
                this.ruleForm.turn_class_condition =
                  chooseClassMge.turn_class_condition;
                this.ruleForm.liberal_type = chooseClassMge.liberal_type;
                this.ruleForm.start_time = chooseClassMge.start_time;
                this.ruleForm.end_time = chooseClassMge.end_time;
                this.ruleForm.start_date = chooseClassMge.start_date;
                this.ruleForm.end_date = chooseClassMge.end_date;
                this.ruleForm.class_week_day = chooseClassMge.class_week_day;
                this.ruleForm.updated_at = chooseClassMge.updated_at;
                this.ruleForm.preclassids = chooseClassMge.preclassids;
                this.ruleForm.bigclass_standard =
                  chooseClassMge.bigclass_standard;
                this.ruleForm.total_price = chooseClassMge.total_price;
                this.ruleForm.class_name1 = chooseClassMge.class_name1;
                this.ruleForm.signup_number = chooseClassMge.signup_number;
                this.teacher_name_no =
                  chooseClassMge.teacher_name +
                  " / " +
                  chooseClassMge.teacher_no;
                this.teacher_no = chooseClassMge.teacher_no;
                this.teacher1_name_no = "";
                this.teacher1_no = "";
                chooseClassMge.class_week_day.split(',').forEach(item => {
                  switch (item) {
                  case '周一':
                    this.weekDay.monday = "周一";
                    break;
                  case '周二':
                    this.weekDay.tuesday = "周二";
                    break;
                  case '周三':
                    this.weekDay.wednesday = "周三";
                    break;
                  case '周四':
                    this.weekDay.thursday = "周四";
                    break;
                  case '周五':
                    this.weekDay.friday = "周五";
                    break;
                  case '周六':
                    this.weekDay.saturday = "周六";
                    break;
                  case '周日':
                    this.weekDay.sunday = "周日";
                    break;
                  default:
                    break;
                }
                })
              }
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
    }
  },
  watch: {
    selectedLocation: function() {
      if (
        this.selectedLocation &&
        this.selectedLocation.length &&
        this.selectedLocation.length > 0
      ) {
        this.campus_id = this.selectedLocation[
          this.selectedLocation.length - 1
        ];
      }
      this.attendClass();
      this.timeStep();
      this.timeRule();
      this.getCampusTeachers();
    },
    ["ruleForm.particular_year"]: function() {
      this.ruleForm.class_name = this.getClassName();
    },
    ["ruleForm.season"]: function() {
      if (
        this.ruleForm.season === "00601" ||
        this.ruleForm.season === "00603"
      ) {
        this.$message.warning("请选择期别");
      } else {
        this.ruleForm.periods = "";
      }
      this.ruleForm.class_name = this.getClassName();
    },
    ["ruleForm.subject"]: function() {
      this.ruleForm.class_name = this.getClassName();
    },
    ["ruleForm.grade"]: function() {
      this.ruleForm.class_name = this.getClassName();
    },
    ["ruleForm.class_type"]: function() {
      this.ruleForm.class_name = this.getClassName();
    },
    ["ruleForm.class_name1"]: function() {
      this.ruleForm.class_name = this.getClassName();
    },
    ["ruleForm.grade"]: function() {
      for (let i = 1; i < 7; i++) {
        this.ruleForm.grade === "1010" + i
          ? (this.ruleForm.department = "00701")
          : "";
      }
      for (let i = 7; i < 10; i++) {
        this.ruleForm.grade === "1010" + i
          ? (this.ruleForm.department = "00702")
          : "";
      }
      for (let i = 10; i < 14; i++) {
        this.ruleForm.grade === "101" + i
          ? (this.ruleForm.department = "00703")
          : "";
      }
    },
    ["ruleForm.require_entrytest"]: function() {
      if (
        this.ruleForm.require_entrytest &&
        this.ruleForm.min_entry_score === ""
      ) {
        this.$message.error("请填写分数线");
      }
    },
    organId: function() {
      if (
        this.organId === this.$store.state.organId ||
        this.$route.query.handle !== "edit"
      ) {
        return;
      } else {
        let objData = {
          staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
          page: 0,
          limit: 10,
          organId: parseInt(this.organId), //.机构ID, int,可能为空
          status: true
        };
        this.$axios
          .post(
            this.GlobalVal.httpLink.queryClassrooms,
            JSON.stringify(objData)
          )
          .then(
            res => {
              if (res.data.code === "10000") {
                this.count = res.data.count;
                this.classRoom = res.data.classrooms;
              } else {
                this.$message({
                  type: "error",
                  message: res.data.errmsg
                });
              }
            }
            /*res=>{
                            this.$message("请求失败")
                        }*/
          );
      }
    }
  },
  methods: {
    /**
     * 自动拼装className
     */
    getClassName: function() {
      let str = "";
      if (this.ruleForm.particular_year !== "") {
        str += this.Util.GetLabelForValue(
          this.$store.state.YearOptions,
          this.ruleForm.particular_year
        );
      }
      if (this.ruleForm.season !== "") {
        str += this.Util.GetLabelForValue(
          this.$store.state.SeasonOptions,
          this.ruleForm.season
        );
      }
      if (this.ruleForm.grade !== "") {
        str += this.Util.GetLabelForValue(
          this.$store.state.GradeOptions,
          this.ruleForm.grade
        );
      }
      if (this.ruleForm.subject !== "") {
        str += this.Util.GetLabelForValue(
          this.$store.state.SubjectOptions,
          this.ruleForm.subject
        );
      }
      if (this.ruleForm.class_type !== "") {
        str += this.Util.GetLabelForValue(
          this.$store.state.ClassTypeOptions,
          this.ruleForm.class_type
        );
      }
      if (this.ruleForm.class_name1 !== "") {
        str += this.ruleForm.class_name1;
      }
      return str + "";
    },
    /**
     * 自动转换为浮点类的数
     * @param val
     */
    parseFloatRule(val) {
      const self = this;
      if (this.ruleForm[val]) {
        if (this.ruleForm[val].match(/\d+.+/)) {
          this.ruleForm[val] = parseFloat(self.ruleForm[val].match(/\d+.+/)[0]);
        } else {
          this.ruleForm[val] = 0;
        }
      }
    },
    /**
     * 自动转换为整形的数
     * @param val
     */
    parseIntRule(val) {
      const self = this;
      if (this.ruleForm[val]) {
        if (this.ruleForm[val].match(/\d+.+/)) {
          this.ruleForm[val] = parseInt(self.ruleForm[val].match(/\d+.+/)[0]);
        } else {
          this.ruleForm[val] = 0;
        }
      }
    },

    /**
     * 时间段选择
     * @param val
     */
    handlerTimeChange(val) {
      this.ruleForm.time_id = val.time_slot_id;
      this.ruleForm.time_name = val.time_slot_name;
      this.ruleForm.start_time = val.start_time;
      this.ruleForm.end_time = val.end_time;
    },
    /**
     * 日期选择
     * @param val
     */
    handlerDateChange(val) {
      this.ruleForm.date_name = val.date_slot_name;
      this.ruleForm.date_id = val.date_slot_id;
      this.ruleForm.start_date = val.start_date;
      this.ruleForm.end_date = val.end_date;
    },
    /**
     * 教室选择
     * @param val
     */
    handleSelectClassRoom(val) {
      this.ruleForm.classroom_id = val.croom_id;
      this.ruleForm.classroom_name = val.croom_name;
    },

    //新增按钮事件
    handleAdd() {},
    //新增/修改时候的过滤器
    varJug(obj) {
      let self = this;
      let o = obj;
      o.particular_year = parseInt(o.particular_year);
      o.web_signup_starttime = new Date(o.web_signup_starttime).getTime();
      o.web_signup_endtime = new Date(o.web_signup_endtime).getTime();
      o.school_id = this.selectedLocation[1];
      o.campus_id = this.selectedLocation[3];
      o.branch_school_id = this.selectedLocation[2];
      if (this.queryHandle !== "edit") {
        o.status = true;
      }
      o.date_name = self.Util.GetNameForValue(this.dateSlots, o.date_id);
      o.time_name = self.Util.GetTimeNameForValue(this.timeSlot, o.time_id);
      o.classroom_name = self.Util.GetClassNameForValue(
        this.classRooms,
        o.classroom_id
      );
      o.class_week_day = '';
      for(let i in this.weekDay){
        if(this.weekDay[i]){
          o.class_week_day += this.weekDay[i] + ','
        }
      }
      o.class_week_day = o.class_week_day.slice(0, -1)
      delete o.teacher1_name_no;
      delete o.teacher_name_no;
      return o;
    },
    varJug1(obj) {
      let self = this;
      let o = obj;
      o.map((item, index) => {
        item.classdate = self.Util.TimeCycle(
          new Date(this.start_datetime[index]).getTime(),
          "ymd"
        );
        item.start_datetime = new Date(
          this.Util.TimeCycle(
            new Date(this.start_datetime[index]).getTime(),
            "ymd"
          ) +
            " " +
            this.startDate[index].split("-")[0] +
            ":00"
        ).getTime();
        item.end_datetime = new Date(
          this.Util.TimeCycle(
            new Date(this.start_datetime[index]).getTime(),
            "ymd"
          ) +
            " " +
            this.startDate[index].split("-")[1] +
            ":00"
        ).getTime();
        item.start_time = this.startDate[index].split("-")[0];
        item.end_time = this.startDate[index].split("-")[1];
        item.teacher_name = this.teacher_name[index].split("/")[0];
        item.teacher_id = this.teacher_id[index];
        item.classroom_id = this.classroom_id[index];
        item.classroom_name = self.Util.GetIdNameForValue(
          this.classRooms,
          this.classroom_id[index],
          "croom_id",
          "croom_name"
        );
        item.created_at = null;
        return o;
      });
      return o;
    },
    //新增--提交
    submitForm(formName) {
      const self = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.ruleForm.periods === "") {
            if (
              this.ruleForm.season == "00601" ||
              this.ruleForm.season == "00603"
            ) {
              loadingInstance.close();
              this.$message.error("暑假和寒假期别必选!");
              return;
            }
          }
          if (
            this.ruleForm.require_entrytest &&
            this.ruleForm.min_entry_score === ""
          ) {
            this.$message.error("请填写分数线");
            return;
          }
          if (!(this.teacher_name_no && this.teacher_no)) {
            this.$message.error("请输入正确的老师");
            return;
          }
          /* if (this.teacher1_name_no) {
            if (!this.teacher1_no) {
              this.$message.error("请输入正确的辅导老师");
              return;
            }
          } */
          let loadingInstance = this.$Loading();
          let objData = {
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            pxxclass: this.varJug(this.ruleForm)
          };
          this.$axios
            .post(this.GlobalVal.httpLink.editClassMag, JSON.stringify(objData))
            .then(
              res => {
                if (res.data.code === "10000") {
                  this.count = res.data.count;
                  this.attendClasses = res.data.attendClasses;
                  for (let i = 0; i < this.attendClasses.length; i++) {
                    this.start_datetime[i] = this.Util.TimeCycle(
                      this.attendClasses[i].start_datetime,
                      "ymd"
                    );
                    this.end_datetime[i] = this.Util.TimeCycle(
                      this.attendClasses[i].end_datetime,
                      "ymd"
                    );
                    this.startDate[i] =
                      this.attendClasses[i].start_time +
                      "-" +
                      this.attendClasses[i].end_time;
                    /* this.endDate[i] = new Date(this.attendClasses[i].end_datetime) */
                    this.teacher_name[i] =
                      this.attendClasses[i].teacher_name +
                      " / " +
                      this.attendClasses[i].teacher_no;
                    this.teacher_id[i] = this.attendClasses[i].teacher_id;
                    this.classroom_id[i] = this.attendClasses[i].classroom_id;
                  }
                  //this.$store.commit("setAttendClasses",res.data.attendClasses);
                  self.addTeamLayer = false;
                  this.nextActive = false;
                  this.nextActuveDate = true;
                  if (this.active++ > 2) this.active = 0;
                  if (self.queryHandle === "edit") {
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
                } else {
                  self.$message({
                    type: "error",
                    message: res.data.errmsg
                  });
                }
                loadingInstance.close();
              },
              res => {
                self.$message("请求失败");
                loadingInstance.close();
              }
            );
        } else {
          return false;
        }
      });
    },
    //课节安排提交
    attendForm(formName) {
      const self = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.teacher_name.forEach((item, index) => {
            if (!item.split("/")[1]) {
              this.$message.error("第" + (index * 1 + 1) + "项老师不正确");
              return flase;
            }
          });
          if (this.active++ > 2) this.active = 0;
          let objData = {
            source: this.GlobalVal.constants.source,
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            attendClasses: this.varJug1(this.attendClasses)
          };
          let loadingInstance = this.$Loading();
          this.$axios
            .post(
              this.GlobalVal.httpLink.changeAttendClass,
              JSON.stringify(objData)
            )
            .then(
              res => {
                if (res.data.code === "10000") {
                  self.$message({
                    type: "success",
                    message: "安排成功"
                  });
                  this.$router.push({
                    path: "/classM"
                  });
                  loadingInstance.close();
                } else {
                  self.$message({
                    type: "error",
                    message: res.data.errmsg
                  });
                  loadingInstance.close();
                }
              },
              res => {
                self.$message("请求失败");
                loadingInstance.close();
              }
            );
        } else {
          return false;
        }
      });
    },
    cancel() {
      this.$router.push({
        path: "/classM"
      });
    },
    frontClass() {
      const self = this;
      /* let objData = {
                    staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                    organId:this.organId,
                    subject:this.ruleForm.subject
                };
                this.$axios.post(this.GlobalVal.httpLink.queryClass, JSON.stringify(objData)).then(
                    res => {
                        if (res.data.code === "10000") {
                            console.log("查询级管理获取的对象", res.data);
                            let frontclass = res.data.pxxClasses;
                            if (self.queryHandle==="edit") {
                                self.$message({
                                    type: "success",
                                    message: "修改成功"
                                });
                            } else {
                                /!*self.$message({
                                    type: "success",
                                    message: "新增成功"
                                });*!/
                            }
                        } else {
                            self.$message({
                                type: "error",
                                message: res.data.errmsg
                            })
                        }
                    },
                    res => {
                        self.$message("请求失败")
                    }
                )*/
    },
    //获取上课教室
    attendClass() {
      let objData3 = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        source: this.GlobalVal.constants.source,
        campusId: this.selectedLocation[3],
        status: true
      };

      this.$axios
        .post(this.GlobalVal.httpLink.queryClassrooms, JSON.stringify(objData3))
        .then(res => {
          if (res.data.code === "10000") {
            this.count = res.data.count;
            this.classRooms = res.data.classrooms;
          } else {
            console.error(res.data);
          }
        });
    },
    //获取上课时间段
    timeStep() {
      const self = this;
      let objData1 = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        source: this.GlobalVal.constants.source,
        campusId: this.campus_id
      };
      this.$axios
        .post(
          this.GlobalVal.httpLink.getCampusTimeSlot,
          JSON.stringify(objData1)
        )
        .then(
          res => {
            if (res.data.code === "10000") {
              self.count = res.data.count;
              self.timeSlot = res.data.timeslots;
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
    //获取时间安排规律
    timeRule() {
      const self = this;
      let objData2 = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        source: this.GlobalVal.constants.source,
        campus_id: this.campus_id
      };
      this.$axios
        .post(
          this.GlobalVal.httpLink.getCampusDateSlot,
          JSON.stringify(objData2)
        )
        .then(
          res => {
            if (res.data.code === "10000") {
              self.count = res.data.count;
              self.dateSlots = res.data.dateslots;
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
    //获取上课老师
    getCampusTeachers() {
      if (this.teacherArea == "1") {
        var objData = {
          source: this.GlobalVal.constants.source,
          staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
          schoolId: "",
          branchSchoolId: "",
          campusId: ""
        };
      }
      if (this.teacherArea == "2") {
        var objData = {
          source: this.GlobalVal.constants.source,
          staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
          schoolId: this.selectedLocation[1],
          branchSchoolId: "",
          campusId: ""
        };
      }
      if (this.teacherArea == "3") {
        var objData = {
          source: this.GlobalVal.constants.source,
          staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
          schoolId: "",
          branchSchoolId: this.selectedLocation[2],
          campusId: ""
        };
      }
      if (this.teacherArea == "4" || this.teacherArea == "") {
        var objData = {
          source: this.GlobalVal.constants.source,
          staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
          schoolId: "",
          branchSchoolId: "",
          campusId: this.selectedLocation[3]
        };
      }
      this.$axios
        .post(
          this.GlobalVal.httpLink.getCampusTeachers,
          JSON.stringify(objData)
        )
        .then(
          res => {
            if (res.data.code === "10000") {
              this.count = res.data.count;
              this.teachers = res.data.teachers;
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
    queryTeachers(queryString, cb) {
      let filterArr = this.teachers.filter(item =>
        (item.teacher_name + "/" + item.teacher_no).includes(queryString)
      );
      let results = queryString ? filterArr : this.teachers;
      cb(results);
      if (!filterArr) {
        this.$message.warning("此老师不存在，请重新搜索!");
        this.ruleForm.teacher_name_no = "";
        return;
      }
    },
    /**
     * 点选老师
     * @param item 老师的这条信息
     */
    handleSelectTeacher(item) {
      this.ruleForm.teacher_id = item.teacher_id;
      this.ruleForm.teacher_name = item.teacher_name;
      this.teacher_name_no = item.teacher_name + " / " + item.teacher_no;
      this.teacher_no = item.teacher_no;
    },
    /*
     * 点选老师
     * @param item 老师的这条信息
     * */
    handleSelectTeacher1(item) {
      this.ruleForm.teacher1_id = item.teacher_id;
      this.teacher1_name_no = item.teacher_name + " / " + item.teacher_no;
      this.ruleForm.teacher1_name = item.teacher_name;
      this.teacher1_no = item.teacher_no;
    },
    /**
     * 详情点选老师
     * @param item 老师的这条信息
     */
    handleSelectTeacher2(e, d) {
      this.teacher_id[d] = e.teacher_id;
      this.teacher_name[d] = e.teacher_name + " / " + e.teacher_no;
    },
    queryTimeLaw(queryString, cb) {
      let filterArr = this.dateSlots.filter(item =>
        item.date_slot_name.includes(queryString)
      );
      let results = queryString ? filterArr : this.dateSlots;
      cb(results);
    },
    selectTimeLaw(item) {
      this.date_slot_name = item.date_slot_name;
      this.ruleForm.date_id = item.date_slot_id;
    },
    next() {
      this.nextActive = false;
      this.nextActuveDate = true;
      if (this.active++ > 2) this.active = 0;
    },
    before() {
      this.nextActive = true;
      this.nextActuveDate = false;
      if (this.active-- < 0) this.active = 0;
    }
  }
};
</script>

<style scoped>
.edit-class-form-warp {
  width: 100%;
  min-height: 830px;
  margin: 10px auto;
  background: #ffffff;
  padding-bottom: 20px;
}
.stepActive {
  padding: 20px 0px;
  width: 600px;
  margin: 0 auto;
}
.nextDate {
  width: 65%;
  height: auto;
  margin: 0 auto;
  margin-bottom: 20px;
}
.courseArrange {
  font-size: 16px;
  line-height: 20px;
  padding-bottom: 10px;
  font-weight: 700;
}
.classArrange {
  border: 1px solid #dcdfe6;
  padding: 20px 20px 20px 13px;
}
.classindex {
  text-align: center;
  border: 1px solid #dcdfe6;
  height: 32px;
  line-height: 32px;
}
.course-arrange-details .el-col {
  margin-bottom: 10px;
}
.course-arrange-tital .el-col {
  margin-bottom: 10px;
}
</style>
<style>
.departmentClass .el-input--mini .el-input__inner {
  color: #63666a;
}
.classArrange .el-input.is-disabled .el-input__inner {
  color: #616266;
}
/* .auto-select .el-scrollbar__view::after {
  content: "更多信息↓";
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 14px;
  color: #409eff;
  cursor: pointer;
} */
</style>
