<template>
    <div class="table">
        <div class="handle-box">
            <div class="border">
                <el-cascader clearable
                        size="medium"
                        expand-trigger="click"
                        :options="location"
                        v-model="selectedLocation"
                        placeholder="选择学校"
                        change-on-select
                        @change="handleLocationChange" style="" @blur="blur">
                </el-cascader>
                <el-form :model="ruleForm"
                         :rules="rules"
                         size="medium"
                         ref="ruleForm"
                         label-width="10px"
                         label-text
                         label-position="left"
                         style="height: 30px;text-align: left;display: inline-block">
               <!-- <el-form-item label="" style="width: 200px;display: inline-block;">
                    <el-select v-model="subject" placeholder="请选择科目">
                        <el-option
                                v-for="item in $store.state.SubjectOptions"
                                :key="item.code"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>-->
                </el-form>
                <div class="search-warp" style="padding-top: 0">
                    <el-input v-model="select_word" border="none" size="medium" placeholder="输入要搜索的老师名称" class="handle-input mr10" @keyup.enter.native="search"></el-input>
                    <div class="search-icon">
                        <i class="el-icon-search" @click="search"></i>
                    </div>
                </div>
                <div class="handle-right">
                    <!--<el-button type="primary" size="small" icon="search"  @click="screening">筛选</el-button>-->
                    <el-button type="primary" size="small" icon="plus" class="handle-del mr10" @click="handleAdd" style="margin-right: 20px">新增教师</el-button>
                    <!-- <el-button type="primary" size="small" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button> -->
                    <!--<el-button type="primary" size="small" icon="delete" class="handle-del mr10" @click="educe">课表导出</el-button>-->
                </div>
            </div>
            <div class="handle-two">
                班级数过滤
                <el-select size="small"
                        collapse-tags clearable
                        v-model="particular" placeholder="年份不限" style="width: 160px">
                    <el-option
                            v-for="item in $store.state.YearOptions"
                            :key="item.code"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select size="small"
                        collapse-tags clearable
                        v-model="season" placeholder="季节不限" style="width: 160px">
                    <el-option
                            v-for="item in $store.state.SeasonOptions"
                            :key="item.code"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select size="small" :disabled="!particular"
                        collapse-tags clearable
                        v-model="month" placeholder="月份不限" style="width: 160px">
                    <el-option
                            v-for="i in 12"
                            :key="i"
                            :label="i"
                            :value="i">
                    </el-option>
                </el-select>
            </div>
        </div>
        <el-table :data="data" size="mini" stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="teacher_name" label="姓名"></el-table-column>
            <el-table-column prop="teacher_mobile" label="手机号"></el-table-column>
           <!-- <el-table-column prop="teacher_mobile2" label="手机号">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>姓名: {{ scope.row.teacher_mobile}}</p>
                        <p>住址: {{ scope.row.address }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.name }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>-->
            <el-table-column prop="campus_name" label="所属校区"></el-table-column>
            <el-table-column prop="teacher_no" label="工号"></el-table-column>
            <!--<el-table-column prop="birthday" label="生日"></el-table-column>-->
            <!--<el-table-column prop="nation_name" label="民族"></el-table-column>-->
            <!--<el-table-column prop="subject2" label="科目"></el-table-column>-->
            <!--<el-table-column prop="grade2" label="年级"></el-table-column>-->
            <el-table-column label="班级数">
              <template slot-scope="scope">
                <el-button type="text" @click="oponClassInfo(scope.row.teacher_id)">{{scope.row.class_count}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.status">启用</span>
                    <span v-if="!scope.row.status">冻结</span>
                </template>
            </el-table-column>
            <!--<el-table-column prop="salary_affected_by_size" label="课时受班型影响"></el-table-column>-->
            <el-table-column label="操作" width="300">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary"
                               @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                   <!-- <el-button size="mini" type="primary"
                               @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>-->
                    <el-button size="mini" type="primary"
                               @click="handleFreeze(scope.$index, scope.row)" v-if="scope.row.status">冻结
                    </el-button>
                    <el-button size="mini" type="primary"
                               @click="iceFreeze(scope.$index, scope.row)" v-if="!scope.row.status">已冻结
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="count"
                    :page-size="cur_limit"
                    :page-sizes="[10,20,30,50]">
            </el-pagination>
        </div>
        <!--添加/修改弹出框-->
        <transition name="el-fade-in-linear">
            <div v-show="addTeamLayer" class="bg-layer">
                <transition name="el-zoom-in-center">
                    <div v-if="addTeamLayer" class="transition-box">
                        <div class="title-warp">
                            <div class="close-btn" @click="addTeamLayer=!addTeamLayer"><i class="el-icon-close"></i></div>
                            <h3 v-if="!changeTeamLayer" class="modify-title">新增教师</h3>
                            <h3 v-if="changeTeamLayer" class="modify-title">修改教师</h3>
                        </div>
                        <el-form :model="ruleForm"
                                 :rules="rules"
                                 size="medium"
                                 ref="ruleForm"
                                 label-width="120px"
                                 label-text
                                 label-position="right"
                                 style="height: 580px;overflow-y: scroll;text-align: left">
                            <!-- <div class="photo">
                                <el-upload
                                class="avatar-uploader"
																action=""
																ref="upload"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
																:auto-upload="false">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </div> -->
                            <el-form-item label="基本信息" style="font-weight: bold"></el-form-item>
                            <el-form-item label="教师姓名"  prop="teacher_name" style="width: 300px;display: inline-block;font-size: 16px;">
                                <el-input v-model="ruleForm.teacher_name" placeholder="请输入..."></el-input>
                            </el-form-item>
                            <el-form-item label="老师昵称" prop="teacher_nick_name" style="width: 300px;display: inline-block">
                                <el-input v-model="ruleForm.teacher_nick_name" placeholder="请输入..."></el-input>
                            </el-form-item>
                            <el-form-item label="教师编号" prop="teacher_no" style="width: 300px;display: inline-block">
                                <el-input v-model="ruleForm.teacher_no" placeholder="请输入..."></el-input>
                            </el-form-item>
                            <el-form-item label="老师电话" prop="teacher_mobile" style="width: 300px;display: inline-block;margin-right:20px;" >
                                <el-input v-model="ruleForm.teacher_mobile" placeholder="请输入..."></el-input>
                            </el-form-item>
                            <el-form-item label="老师邮箱" prop="teacher_email" style="width: 300px;display: inline-block">
                                <el-input v-model="ruleForm.teacher_email"></el-input>
                            </el-form-item>
                            <el-form-item label="选择学校" style="width: 300px;display: inline-block;margin-right:20px;">
                                <el-cascader clearable
                                        expand-trigger="click"
                                        :options="location"
                                        v-model="organ_id2"
                                        change-on-select>
                                </el-cascader>
                            </el-form-item>
                            <!--<el-form-item label="所属校区" style="width: 300px;display: inline-block;">
                                <el-input v-model="campus_name"></el-input>
                            </el-form-item>-->
                            <el-form-item  label="教师级别" style="width: 300px;display: inline-block">
                                <el-select v-model="ruleForm.teacher_level_id" placeholder="请选择教师级别">
                                    <el-option v-for="item in teacherLevelList" :label="item.tlevel_name" :key="item" :value="item.tlevel_id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="岗位性质" style="width: 300px;display: inline-block;">
                                <el-select v-model="ruleForm.post_nature" placeholder="请选择教师级别">
                                    <el-option v-for="item in $store.state.SchoolPostNatureOptions" :key="item" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <!--<el-form-item label="是否全职">
                                <el-radio-group v-model="ruleForm.is_full_time">
                                    <el-radio label="全职"></el-radio>
                                    <el-radio label="兼职"></el-radio>
                                </el-radio-group>
                            </el-form-item>-->
                            <el-form-item label="授课科目" style="width: 300px;display: inline-block">
                                <el-select
                                        multiple
                                        collapse-tags
                                        v-model="ruleForm.subject" placeholder="请选择授课科目">
                                    <el-option v-for="item in $store.state.SubjectOptions" :key="item" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                          <!--  <el-form-item label="授课年级" style="width: 300px;display: inline-block;">
                                <el-select
                                        multiple
                                        collapse-tags
                                        v-model="ruleForm.grade" placeholder="请选择授课年级">
                                    <el-option v-for="item in $store.state.GradeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>-->

                            <el-form-item label="紧急联系人" style="width: 300px;display: inline-block" prop="urgent_people_name">
                                <el-input v-model="ruleForm.urgent_people_name"></el-input>
                            </el-form-item>
                            <el-form-item label="紧急联系人电话" style="width: 295px;display: inline-block"  prop="urgent_people_mobile">
                                <el-input v-model="ruleForm.urgent_people_mobile"></el-input>
                            </el-form-item>
                            <el-form-item label="详细地址" style="width: 600px" prop="address">
                                <el-input v-model="ruleForm.address" type="textarea"></el-input>
                            </el-form-item>
                         <!--   <el-form-item label="消课课酬是否受大小班影响" label-width="220px">
                                <el-radio-group v-model="ruleForm.salary_affected_by_size">
                                    <el-radio label="受影响"></el-radio>
                                    <el-radio label="不受影响"></el-radio>
                                </el-radio-group>
                            </el-form-item>-->
                            <el-form-item label="状态" style="border-bottom:1px solid #fafafa;padding-bottom: 10px;" label-width="100px">
                                <el-radio-group v-model="ruleForm.status">
                                    <el-radio label="启用">启用</el-radio>
                                    <el-radio label="禁用">禁用</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="更多信息" style="font-weight: bold"></el-form-item>
                            <el-form-item label="性别" style="width: 290px;display: inline-block;margin-right:20px;" prop="sex">
                                    <el-select v-model="ruleForm.sex" placeholder="请选择...">
                                        <el-option label="男" value="男">男</el-option>
                                        <el-option label="女"  value="女">女</el-option>
                                    </el-select>
                            </el-form-item>
                            <el-form-item label="年龄" style="width: 290px;display: inline-block;" >
                                <el-input v-model.number="ruleForm.age" type="number"></el-input>
                            </el-form-item>
                            <el-form-item label="出生日期" span="12" style="width: 290px;display: inline-block;margin-right:20px;">
                                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.birthday" style="width: 170px"></el-date-picker>
                            </el-form-item>
                            <el-form-item label="政治面貌" style="width: 290px;display: inline-block;margin-right:20px" prop="political_affiliation" >
                                <el-input v-model="ruleForm.political_affiliation"></el-input>
                            </el-form-item>
                            <el-form-item label="婚姻状况"style="width: 290px;display: inline-block;margin-right:20px;">
                                <el-select v-model="ruleForm.marital_status">
                                    <el-option label="已婚" value="true"></el-option>
                                    <el-option label="未婚" value="false"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="籍贯" style="width: 290px;display: inline-block;margin-right:20px" prop="ancestral_home">
                                <el-input v-model="ruleForm.ancestral_home"></el-input>
                            </el-form-item>
                            <el-form-item label="户口所在地" style="width: 290px;display: inline-block;margin-right:20px;" prop="registered_residence">
                                <el-input v-model="ruleForm.registered_residence"></el-input>
                            </el-form-item>
                            <el-form-item label="民族" style="width: 290px;display: inline-block;margin-right:20px;" prop="nation_name">
                                <el-select v-model="ruleForm.nation_name" size="medium" placeholder="选择民族">
                                    <el-option
                                            v-for="item in getnations"
                                            :key="item.nation_name"
                                            :label="item.nation_name"
                                            :value="item.nation_name">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="身份证号" style="width: 600px;display: inline-block;margin-right:20px;" prop="id_card_no">
                                <el-input v-model="ruleForm.id_card_no"></el-input>
                            </el-form-item>
                            <div style="border-bottom:1px solid #fafafa;margin-bottom: 20px;"></div>
                            <!--<el-form-item label="公积金账户" style="width: 600px;" >
                                <el-input v-model="ruleForm.provident_fund_account"></el-input>
                            </el-form-item>
                            <el-form-item label="银行卡号" style="width: 600px">
                                <el-input v-model="ruleForm.bank_card_no"></el-input>
                            </el-form-item>
                            <el-form-item label="发卡银行" style="width: 600px;">
                                <el-input v-model="ruleForm.issuing_bank"></el-input>
                            </el-form-item>-->
                            <el-form-item label="教师资质" style="font-weight: bold"></el-form-item>
                            <el-form-item label="教学年限" style="width: 290px;display: inline-block;margin-right:20px;" prop="teach_life">
                                <el-input v-model="ruleForm.teach_life"></el-input>
                            </el-form-item>
                            <el-form-item label="毕业院校" style="width: 290px;display: inline-block;margin-right:20px;" prop="graduate_school">
                                <el-input v-model="ruleForm.graduate_school"></el-input>
                            </el-form-item>
                            <el-form-item label="专业" style="width: 290px;display: inline-block;margin-right:20px;" prop="self_subject">
                                <el-input v-model="ruleForm.self_subject"></el-input>
                            </el-form-item>
                            <el-form-item label="最高学历" style="width: 290px;display: inline-block;margin-right:20px;">
                                <el-input v-model="ruleForm.highest_education_degree"></el-input>
                            </el-form-item>
                            <el-form-item label="教学简介" prop="brief_introduce" style="width: 600px">
                                <el-input type="textarea" v-model="ruleForm.brief_introduce"></el-input>
                            </el-form-item>
                            <el-form-item label="教学特点" style="width: 600px">
                                <el-input type="textarea" v-model="ruleForm.teach_character"></el-input>
                            </el-form-item>
                            <el-form-item label="教学成果"  style="width: 600px;" prop="teach_results">
                                <el-input type="textarea" v-model="ruleForm.teach_results"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button v-if="!changeTeamLayer" type="primary" @click="submitForm('ruleForm')" style="width: 195px;margin-left: 40px">保存</el-button>
                                <el-button v-if="changeTeamLayer" type="primary" @click="submitForm('ruleForm')" style="width: 195px;margin-left: 40px">保存</el-button>
                                <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
                                <el-button @click="addTeamLayer=!addTeamLayer"  style="width: 195px;background: #dcdcdc;color: #f3f3f3">取消</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </transition>
            </div>
        </transition>
        <!--教师导出-->
        <transition name="el-fade-in-linear">
            <div v-show="educecouse" class="bg-layer">
                <transition name="el-zoom-in-center">
                    <div v-if="educecouse" class="transition-box">
                        <div class="title-warp">
                            <div class="close-btn" @click="educecouse=!educecouse"><i class="el-icon-close"></i></div>
                            <h3  class="modify-title">课表导出</h3>
                        </div>
                        <el-form :model="ruleForm"
                                 :rules="rules"
                                 size="mini"
                                 ref="ruleForm"
                                 label-width="100px"
                                 style="height: 400px;">
                            <el-form-item label="教师姓名"  prop="teacher_name">
                                <el-input v-model="ruleForm.teacher_name"></el-input>
                            </el-form-item>
                            <el-form-item label="老师昵称">
                                <el-input v-model="ruleForm.teacher_nick_name"></el-input>
                            </el-form-item>
                            <el-form-item label="老师电话" prop="teacher_mobile">
                                <el-input v-model="ruleForm.teacher_mobile"></el-input>
                            </el-form-item>
                            <el-form-item label="老师邮箱" prop="teacher_email">
                                <el-input v-model="ruleForm.teacher_email"></el-input>
                            </el-form-item>
                            <el-form-item v-if="!changeTeamLayer" label="选择学校">
                                <el-cascader clearable
                                        expand-trigger="click"
                                        :options="location"
                                        v-model="organ_id2"
                                        change-on-select>
                                </el-cascader>
                            </el-form-item>
                            <el-form-item v-if="!changeTeamLayer" label="教师级别">
                                <el-select v-model="ruleForm.teacher_level_id" placeholder="请选择教师级别">
                                    <el-option v-for="item in teacherLevelList" :key="item" :label="item.tlevel_name" :value="item.tlevel_id"></el-option>
                                </el-select>
                            </el-form-item>
                           <!-- <el-form-item label="是否全职">
                                <el-radio-group v-model="ruleForm.is_full_time">
                                    <el-radio label="全职"></el-radio>
                                    <el-radio label="兼职"></el-radio>
                                </el-radio-group>
                            </el-form-item>-->
                            <el-form-item label="授课科目">
                                <el-select
                                        multiple
                                        collapse-tags
                                        v-model="ruleForm.subject" placeholder="请选择授课科目">
                                    <el-option
                                            v-for="item in $store.state.ProjectTypeOptions"
                                            :key="item.code"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="授课年级">
                                <el-select
                                        multiple
                                        collapse-tags
                                        v-model="ruleForm.grade" placeholder="请选择授课年级">
                                    <el-option v-for="item in $store.state.GradeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="紧急联系人">
                                <el-input v-model="ruleForm.urgent_people_name"></el-input>
                            </el-form-item>
                            <el-form-item label="紧急联系人电话" prop="urgent_people_mobile">
                                <el-input v-model="ruleForm.urgent_people_mobile"></el-input>
                            </el-form-item>
                            <el-form-item label="消课课酬是否受大小班影响">
                                <el-radio-group v-model="ruleForm.salary_affected_by_size" >
                                    <el-radio label="受影响"></el-radio>
                                    <el-radio label="不受影响"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="状态">
                                <el-radio-group v-model="ruleForm.status">
                                    <el-radio label="启用"></el-radio>
                                    <el-radio label="禁用"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="性别">
                                <el-radio-group v-model="ruleForm.sex">
                                    <el-radio label="男"></el-radio>
                                    <el-radio label="女"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="年龄">
                                <el-input v-model="ruleForm.age"></el-input>
                            </el-form-item>
                            <el-form-item label="出生日期">
                                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.birthday"></el-date-picker>
                            </el-form-item>
                            <el-form-item label="政治面貌">
                                <el-input v-model="ruleForm.political_affiliation"></el-input>
                            </el-form-item>
                            <el-form-item label="婚姻状况">
                                <el-radio-group v-model="ruleForm.marital_status">
                                    <el-radio label="已婚"></el-radio>
                                    <el-radio label="未婚"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="祖籍">
                                <el-input v-model="ruleForm.ancestral_home"></el-input>
                            </el-form-item>
                            <el-form-item label="户口所在地">
                                <el-input v-model="ruleForm.registered_residence"></el-input>
                            </el-form-item>
                            <el-form-item label="身份证号" >
                                <el-input v-model="ruleForm.id_card_no"></el-input>
                            </el-form-item>
                            <el-form-item label="公积金账户">
                                <el-input v-model="ruleForm.provident_fund_account"></el-input>
                            </el-form-item>
                            <el-form-item label="银行卡号">
                                <el-input v-model="ruleForm.bank_card_no"></el-input>
                            </el-form-item>
                            <el-form-item label="发卡银行">
                                <el-input v-model="ruleForm.issuing_bank"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button v-if="!changeTeamLayer" type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                                <el-button v-if="changeTeamLayer" type="primary" @click="submitForm('ruleForm')">确认修改</el-button>
                                <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
                                <el-button @click="addTeamLayer=!addTeamLayer">取消</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </transition>
            </div>
        </transition>
        <Dialog ref="dialog" title="班级列表">
            <div class="class-info">
              <p><b>班级数：{{ tableData.count }}</b><b>学员数：{{ tableData.studentNum }}</b></p>
              <el-table
                :data="tableData.classes"
                stripe
                height="60vh"
                style="width: 100%">
                <el-table-column
                  type="index"
                  label="序号"
                  width="50">
                </el-table-column>
                <el-table-column
                  prop="branch_school_name"
                  label="城市">
                </el-table-column>
                <el-table-column
                  prop="campus_name"
                  label="校区">
                </el-table-column>
                <el-table-column
                  prop="class_name"
                  label="班级名称"
                  width="250">
                </el-table-column>
                <el-table-column
                  prop="teacher_name"
                  label="老师">
                </el-table-column>
                <el-table-column
                  prop="class_week_day"
                  label="重复周期">
                </el-table-column>
                <el-table-column
                  prop="time_name"
                  label="上课时段">
                </el-table-column>
                <el-table-column
                  prop="classroom_name"
                  label="教室">
                </el-table-column>
                <el-table-column
                  prop="total_price"
                  label="价格">
                </el-table-column>
                <el-table-column
                  prop="left_times"
                  label="剩余课次">
                </el-table-column>
                <el-table-column
                  label="招生情况">
                  <template slot-scope="scope">
                    {{ scope.row.signup_number + '/' + scope.row.max_students_no }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="payment_number"
                  label="缴费">
                </el-table-column>
                <el-table-column
                  prop="remain_number"
                  label="剩余">
                </el-table-column>
                <el-table-column
                  prop="waiting_number"
                  label="候补人数">
                </el-table-column>
              </el-table>
              <el-pagination
                style="margin-top: 20px; text-align: center;"
                background
                layout="total"
                :total="tableData.count">
                </el-pagination>
            </div>
        </Dialog>
    </div>
</template>

<script>
import Dialog from "../common/Dialog";
export default {
  components: {
    Dialog
  },
  data() {
    var checkMobile = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("电话不能为空"));
      }
      setTimeout(() => {
        if (/^\d{11}$/.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确得电话号码"));
        }
      }, 500);
    };
    return {
      cur_page: 0, //页码
      cur_limit: 10, //每次请求的数据数
      count: 0, //数据总量
      organId: null,
      organName: "",
      select_word: "", //搜索的值
      teacherMobile: "",
      teacherName: "",
      organ_id2: [], //新增组件内的学校id,
      season: "",
      month: null,
      campus_name: "",
      campus_id: "",
      particular_year: "",
      particular: null,
      subject: "",
      file: "",
      teacherLevelList: [
        {
          //老师等级,新增老师时用
        }
      ],
      subjectList: [],
      gradeList: [],
      dataList: [], //请求的list
      location: [], //校区导航
      selectedLocation: [], //选择校区
      multipleSelection: [], //选中行的集合
      selectedYear: "",
      selectedSeason: "",

      addTeamLayer: false, //新增弹出框状态
      changeTeamLayer: false, //修改弹出框状态
      educecouse: false, //课表导出框状态
      areaNavId: [],
      areaNavName: [],
      getnations: [], //民族数据
      tableData: {
        count: 0,
        studentNum: 0,
        classes: [],
      }, // 详情数据
      ruleForm: {
        //新增数据
        teacher_id: "",
        teacher_name: "",
        teacher_nick_name: "",
        head_img_url: "",
        teacher_mobile: "",
        teacher_email: "",
        teacher_level_id: "",
        teacher_level_name: "",
        /*is_full_time:"",*/
        subject: [],
        grade: [],
        urgent_people_name: "",
        urgent_people_mobile: "",
        salary_affected_by_size: "",
        status: "",
        sex: "",
        age: "",
        birthday: "",
        nation_id: "",
        nation_name: "",
        political_affiliation: "",
        marital_status: "",
        ancestral_home: "",
        registered_residence: "",
        id_card_no: "",
        provident_fund_account: "",
        bank_card_no: "",
        issuing_bank: "",
        created_at: null,
        teach_life: "",
        graduate_school: "",
        self_subject: "",
        highest_education_degree: "",
        brief_introduce: "",
        teach_character: "",
        teach_results: "",
        post_nature: "",
        teacher_no: "",
        address: ""
      },
      //接收当前行的信息
      changeForm2: {},
      //表单校验规则
      rules: {
        teacher_name: [
          { required: true, message: "请输入老师名称", trigger: "blur" },
          { min: 2, max: 12, message: "长度在 2 到 12 个字符", trigger: "blur" }
        ],
        teacher_no: [
          { required: true, message: "请输入老师工号", trigger: "blur" },
          { min: 0, max: 12, message: "最多输入 12 位", trigger: "blur" }
        ],
        teacher_email: [
          { message: "请输入老师邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur,change"
          }
        ],
        teacher_mobile: [
          { required: true, validator: this.Checkout.phone, trigger: "blur" }
        ],
        id_card_no: [{ validator: this.Checkout.idCard, trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],

        /* age:[
                        {required: true,validator: this.Checkout.number2, trigger: 'blur'}
                    ],*/
        /*  urgent_people_mobile:[
                        { validator: this.Checkout.phone, trigger: 'blur'}
                    ],*/
        /*urgent_people_name:[
                        { message: '请输入紧急联系人', trigger: 'blur' },
                        { min: 0, max: 12, message: '最多只能输入12个字符', trigger: 'blur' }
                    ],*/
        address: [
          { min: 1, max: 50, message: "最多只能输入50个字符", trigger: "blur" }
        ],
        political_affiliation: [
          { max: 12, message: "最多只能输入12个字符", trigger: "blur" }
        ],
        nation_name: [
          { max: 12, message: "最多只能输入12个字符", trigger: "blur" }
        ],
        ancestral_home: [
          { max: 12, message: "最多只能输入12个字符", trigger: "blur" }
        ],
        graduate_school: [
          { max: 50, message: "最多只能输入50个字符", trigger: "blur" }
        ],
        self_subject: [
          { max: 50, message: "最多只能输入50个字符", trigger: "blur" }
        ],
        brief_introduce: [
          { max: 1000, message: "最多只能输入50个字符", trigger: "blur" }
        ],
        teach_results: [
          { max: 50, message: "最多只能输入50个字符", trigger: "blur" }
        ]
      },
      imageUrl: ""
    };
  },
  //实例创建完成后被立即调用
  created() {
    const self = this;
    //查询区域导航
    this.Util.querySysconst(this, "101", this.$store.state.GradeOptions); //查询年级
    this.Util.querySysconst(this, "100", this.$store.state.SubjectOptions); //查询科目
    this.Util.querySysconst(this, "006", this.$store.state.SeasonOptions); //查询季节
    //this.Util.querySysconst(this,"100",this.$store.state.SubjectOptions);//查询科目
    this.Util.queryAreaNav(self, -1, function() {
      self.getData();
    });
    self.location = self.$store.state.location;
    //self.organId=self.$store.state.organId;
    let objData = {
      source: this.GlobalVal.constants.source,
      staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId
    };
    console.log("查询老师等级列表发起请求的参数", objData);
    this.$axios
      .post(this.GlobalVal.httpLink.queryTeacherLevel, JSON.stringify(objData))
      .then(
        res => {
          if (res.data.code === "10000") {
            console.log("查询老师等级列表获取的对象", res.data);
            this.teacherLevelList = res.data.teacherLevels;
          } else {
            console.error(res);
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
    this.$axios
      .post(this.GlobalVal.httpLink.getnations, JSON.stringify(objData))
      .then(
        res => {
          if (res.data.code === "10000") {
            console.log("查询老师等级列表获取的对象", res.data);
            this.getnations = res.data.nations;
          } else {
            console.error(res);
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
  //计算属性
  computed: {
    //相当于过滤器
    data() {
      const self = this;
      if (!self.dataList) {
        return [];
      }
      return self.dataList.filter(function(d) {
        let subject = "",
          grade = "";
        for (var i = 0; i < d.subject.split(",").length; i++) {
          subject += self.Util.GetLabelForValue(
            self.$store.state.SubjectOptions,
            d.subject.split(",")[i]
          );
        }
        for (var i = 0; i < d.grade.split(",").length; i++) {
          grade += self.Util.GetLabelForValue(
            self.$store.state.GradeOptions,
            d.grade.split(",")[i]
          );
        }
        d.subject2 = subject;
        d.grade2 = grade;
        d.teacher_mobile2 = self.Util.formatPhone(d.teacher_mobile);
        //d.birthday = self.Util.TimeCycle(d.birthday,'ymd');
        if (d.birthday) {
          d.birthday = self.Util.TimeCycle(d.birthday, "ymd");
        } else {
          d.birthday = "";
        }
        /*if(d.status = true){
                        d.status = "启用"
                    }else if(d.status = false){
                        d.status = "冻结"
                    }*/
        return d;
      });
    }
  },
  watch: {
    /*selectedLocation:function () {
                if(this.selectedLocation && this.selectedLocation.length &&this.selectedLocation.length>0){
                    this.organId =this.selectedLocation[this.selectedLocation.length-1];
                }
            },*/
    organ_id2: function() {
      function getOrganName(obj, id) {
        for (let i = 0; i < obj.length; i++) {
          if (obj[i].value === id) {
            if (obj[i].children.length > 0) {
              return obj[i].children;
            }
          }
        }
      }

      if (
        this.organ_id2 &&
        this.organ_id2.length &&
        this.organ_id2.length > 0
      ) {
        let obj = this.location;
        for (let i = 0; i < this.organ_id2.length - 1; i++) {
          obj = getOrganName(obj, this.organ_id2[i]);
        }
        for (let i = 0; i < obj.length; i++) {
          if (this.organ_id2[this.organ_id2.length - 1] === obj[i].value) {
            this.campus_name = obj[i].label;
            this.areaNavName.push(this.campus_name);
          }
        }
        this.campus_id = this.organ_id2[this.organ_id2.length - 1];
        this.areaNavId = this.organ_id2;
      }
    },
    selectedLocation: function() {
      if (
        this.selectedLocation &&
        this.selectedLocation.length &&
        this.selectedLocation.length > 0
      ) {
        this.organId = this.selectedLocation[this.selectedLocation.length - 1];
        this.getData();
      }
      function getOrganName(obj, id) {
        for (let i = 0; i < obj.length; i++) {
          if (obj[i].value === id) {
            if (obj[i].children.length > 0) {
              return obj[i].children;
            }
          }
        }
      }
      if (
        this.selectedLocation &&
        this.selectedLocation.length &&
        this.selectedLocation.length > 0
      ) {
        let obj = this.location;
        this.organName = obj;
        this.equipment = "";
        for (let i = 0; i < this.selectedLocation.length - 1; i++) {
          obj = getOrganName(obj, this.selectedLocation[i]);
        }
        for (let i = 0; i < obj.length; i++) {
          if (
            this.selectedLocation[this.selectedLocation.length - 1] ===
            obj[i].value
          ) {
            console.log(obj[i].label);
            this.organName = obj[i].label;
          }
        }
      }
    },
    select_word: function() {
      if (/^\d+$/.test(this.select_word) && this.select_word !== "") {
        this.teacherMobile = this.select_word;
        this.teacherName = null;
      } else if (this.select_word !== "") {
        this.teacherName = this.select_word;
        this.teacherMobile = null;
      } else {
        this.teacherMobile = null;
        this.teacherName = null;
      }
    },
    changeForm2: function() {
      //修改的参数赋值
      this.ruleForm.teacher_id = this.changeForm2.teacher_id;
      this.ruleForm.teacher_name = this.changeForm2.teacher_name;
      this.ruleForm.teacher_nick_name = this.changeForm2.teacher_nick_name;
      this.ruleForm.head_img_url = this.changeForm2.teacher_nick_name;
      this.ruleForm.teacher_mobile = this.changeForm2.teacher_mobile;
      this.ruleForm.teacher_email = this.changeForm2.teacher_email;
      this.ruleForm.teacher_level_id = this.changeForm2.teacher_level_id;
      this.ruleForm.teacher_level_name = this.changeForm2.teacher_level_name;
      /* if(this.changeForm2.is_full_time){
                    this.ruleForm.is_full_time="全职";
                }else{
                    this.ruleForm.is_full_time="兼职";
                }*/
      this.ruleForm.subject = this.changeForm2.subject.split(",");
      //this.ruleForm.subject=this.changeForm2.subject.split(",").map(function(d){return parseInt(d)});
      this.ruleForm.grade = this.changeForm2.grade.split(",");
      //this.ruleForm.grade=this.changeForm2.grade.split(",").map(function(d){return parseInt(d)});
      this.ruleForm.urgent_people_name = this.changeForm2.urgent_people_name;
      this.ruleForm.urgent_people_mobile = this.changeForm2.urgent_people_mobile;
      if (this.changeForm2.salary_affected_by_size) {
        this.ruleForm.salary_affected_by_size = "受影响";
      } else {
        this.ruleForm.salary_affected_by_size = "不受影响";
      }
      if (this.changeForm2.status) {
        this.ruleForm.status = "启用";
      } else {
        this.ruleForm.status = "禁用";
      }
      if (this.changeForm2.sex == true) {
        this.ruleForm.sex = "男";
      } else {
        this.ruleForm.sex = "女";
      }
      //this.ruleForm.sex = this.changeForm2.sex;
      this.ruleForm.age = this.changeForm2.age;
      this.ruleForm.birthday = this.changeForm2.birthday;
      this.ruleForm.nation_id = this.changeForm2.nation_id;
      this.ruleForm.nation_name = this.changeForm2.nation_name;
      this.ruleForm.political_affiliation = this.changeForm2.political_affiliation;
      this.ruleForm.marital_status = this.changeForm2.marital_status;
      this.ruleForm.ancestral_home = this.changeForm2.ancestral_home;
      this.ruleForm.registered_residence = this.changeForm2.registered_residence;
      this.ruleForm.id_card_no = this.changeForm2.id_card_no;
      this.ruleForm.provident_fund_account = this.changeForm2.provident_fund_account;
      this.ruleForm.bank_card_no = this.changeForm2.bank_card_no;
      this.ruleForm.issuing_bank = this.changeForm2.issuing_bank;
      this.ruleForm.teach_life = this.changeForm2.teach_life;
      this.ruleForm.graduate_school = this.changeForm2.graduate_school;
      this.ruleForm.self_subject = this.changeForm2.self_subject;
      this.ruleForm.highest_education_degree = this.changeForm2.highest_education_degree;
      this.ruleForm.brief_introduce = this.changeForm2.brief_introduce;
      this.ruleForm.teach_character = this.changeForm2.teach_character;
      this.ruleForm.teach_results = this.changeForm2.teach_results;
      this.ruleForm.post_nature = this.changeForm2.post_nature;
      this.ruleForm.teacher_no = this.changeForm2.teacher_no;
      this.ruleForm.address = this.changeForm2.address;
      this.organ_id2[0] = 1;
      this.organ_id2[1] = this.changeForm2.school_id;
      this.organ_id2[2] = this.changeForm2.branch_school_id;
      this.organ_id2[3] = this.changeForm2.campus_id;
    },
    particular: function() {
      this.getData();
      console.log(this.particular);
    },
    season: function() {
      this.getData();
    },
    month() {
      this.getData();
    },
    subject: function() {
      this.getData();
    },
    ["ruleForm.sex"]: function() {}
  },
  methods: {
    oponClassInfo(tid) {
      this.$refs.dialog.dialogVisible = true; // 显示弹框
      let objData = {
        source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        teacher_id: tid,
      }
      this.$axios
        .post(this.GlobalVal.httpLink.queryClassOfTeacher, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              console.log("查询老师列表获取的对象", res.data);
              this.tableData = Object.assign({}, this.tableData, res.data.data);
              console.log(this.tableData)
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
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //获取数据
    getData() {
      const self = this;
      let objData = {
        source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        page: this.cur_page, //页数
        limit: this.cur_limit, //条目数
        subject: "",
        teacherMobile: this.teacherMobile, //按电话号码搜索
        teacherName: this.teacherName, //按名字搜索
        particularYear: this.particular,
        season: this.season,
        month: this.month
      };
      console.log("查询老师发起请求的参数", objData);
      this.$axios
        .post(this.GlobalVal.httpLink.queryTeachers, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              console.log("查询老师列表获取的对象", res.data);
              self.count = res.data.count;
              self.dataList = res.data.teachers;
            } else {
              self.count = 0;
              self.dataList = [];
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
                id: row.teacher_id
              }
            ]
          };
          this.$axios
            .post(this.GlobalVal.httpLink.delTeacher, JSON.stringify(objData))
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
                id: self.multipleSelection[i].teacher_id
              });
            }

            let objData = {
              staffId: JSON.parse(window.sessionStorage.getItem("staff"))
                .staffId,
              delList: delTeacher
            };
            self.multipleSelection = [];
            this.$axios
              .post(this.GlobalVal.httpLink.delTeacher, JSON.stringify(objData))
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
      //this.resetForm("ruleForm");
      //this.ruleForm.status = true;
      this.addTeamLayer = true;
      this.changeTeamLayer = false;
      //清空参数
      this.ruleForm.teacher_id = "";
      this.ruleForm.teacher_name = "";
      this.ruleForm.teacher_no = "";
      this.ruleForm.teacher_nick_name = "";
      this.ruleForm.head_img_url = "";
      this.ruleForm.teacher_mobile = "";
      this.ruleForm.teacher_email = "";
      this.ruleForm.teacher_level_id = "";
      this.ruleForm.teacher_level_name = "";
      /*this.ruleForm.is_full_time="";*/
      this.ruleForm.subject = [];
      this.ruleForm.grade = [];
      this.ruleForm.urgent_people_name = "";
      this.ruleForm.urgent_people_mobile = "";
      this.ruleForm.salary_affected_by_size = "";
      this.ruleForm.sex = "";
      this.ruleForm.age = "";
      this.ruleForm.address = "";
      this.ruleForm.birthday = "";
      this.ruleForm.nation_id = "";
      this.ruleForm.nation_name = "汉族";
      this.ruleForm.political_affiliation = "";
      this.ruleForm.marital_status = "";
      this.ruleForm.ancestral_home = "";
      this.ruleForm.registered_residence = "";
      this.ruleForm.id_card_no = "";
      this.ruleForm.provident_fund_account = "";
      this.ruleForm.bank_card_no = "";
      this.ruleForm.issuing_bank = "";
      this.ruleForm.created_at = null;
      this.organ_id2[0] = 1;
      this.ruleForm.status = "启用";
      this.ruleForm.teach_results = "";
      this.ruleForm.teach_character = "";
      this.ruleForm.brief_introduce = "";
      this.ruleForm.highest_education_degree = "";
      this.ruleForm.self_subject = "";
      this.ruleForm.graduate_school = "";
      this.ruleForm.teach_life = "";
      this.ruleForm.post_nature = "";
    },
    //新增/修改时候参数判断-转换
    varJug(obj) {
      let self = this;
      let o = obj;
      //生日
      if (o.birthday) {
        o.birthday = new Date(o.birthday).getTime();
      }
      if (o.teacher_level_id) {
        //教师级别名称
        function a() {
          let tlevel_name = "";
          for (let i = 0; i < self.teacherLevelList.length; i++) {
            if (self.teacherLevelList[i].tlevel_id === o.teacher_level_id) {
              tlevel_name = self.teacherLevelList[i].tlevel_name;
              break;
            }
          }
          return tlevel_name;
        }
        o.teacher_level_name = a();
      }
      if (o.salary_affected_by_size === "受影响") {
        o.salary_affected_by_size = true;
      } else {
        o.salary_affected_by_size = false;
      }
      if (o.status === "启用") {
        o.status = true;
      } else {
        o.status = false;
      }
      if (o.subject instanceof Array) {
        if (o.subject.length !== 0) {
          o.subject = o.subject.join(",");
        } else {
          o.subject = "";
        }
      }
      console.log(o.grade);
      if (o.grade.length !== 0) {
        o.grade = o.grade.join(",");
      } else {
        o.grade = "";
      }
      if (this.ruleForm.sex == "男") {
        o.sex = true;
      } else if (this.ruleForm.sex == "女") {
        o.sex = false;
      }
      o.campus_id = this.organ_id2[3];
      o.branch_school_id = this.organ_id2[2];
      o.school_id = this.organ_id2[1];
      o.campus_name = "";
      o.branch_school_name = "";
      o.school_name = "";
      return o;
    },

    //新增--提交
    submitForm(formName) {
      const self = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.organ_id2) {
            self.$message({
              type: "error",
              message: "新增时学校是必选得"
            });
          }
          let objData = {
            source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            teacher: this.varJug(this.ruleForm)
          };
          console.log("新增教师发起请求的参数", objData);
          // let fd = new FormData();
          // let fdData = (data => {
          //   for (let i in objData) {
          //     if (typeof objData[i] === "object") {
          //       fdData(objData[i]);
          //     } else {
          //       fd.append(i, objData[i]);
          //     }
          //   }
          // })(objData);
          //fd.append('file', files[0])
          this.$axios
            .post(
              this.GlobalVal.httpLink.editTeacher,
              JSON.stringify(objData)
              // {
              //   headers: {
              //     "Content-Type": "application/x-www-form-urlencoded"
              //   }
              // }
            )
            .then(
              res => {
                if (res.data.code === "10000") {
                  console.log("新增教师获取的对象", res.data);
                  self.addTeamLayer = false;
                  this.areaNavId = [];
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
    //修改按钮事件
    handleEdit(index, row) {
      this.changeTeamLayer = true;
      this.addTeamLayer = true;
      this.changeForm2 = row;
      console.log(row);
    },
    //新增/修改教师等级--重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    educe() {
      this.educecouse = true;
    },
    /*搜索*/
    blur() {
      if (this.ruleForm.subject === "") {
        this.$message({
          type: "error",
          message: "填写要搜索的科目"
        });
      }
      this.subject = this.ruleForm.subject;
      if (this.selectedLocation === "") {
        this.$message({
          type: "error",
          message: "填写要搜索的学校"
        });
      }
      this.getData();
    },
    handleFreeze(index, row) {
      let self = this,
        objData = {
          staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
          status: false,
          idList: [
            {
              id: row.teacher_id
            }
          ]
        };
      console.log("新增教师发起请求的参数", objData);
      this.$axios
        .post(this.GlobalVal.httpLink.freezeTeacher, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              console.log("新增教师获取的对象", res.data);
              this.freezeStatus = true;
              self.$message({
                type: "success",
                message: "冻结教师成功"
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
    },
    iceFreeze(index, row) {
      let self = this,
        objData = {
          staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
          status: true,
          idList: [
            {
              id: row.teacher_id
            }
          ]
        };
      console.log("新增教师发起请求的参数", objData);
      this.$axios
        .post(this.GlobalVal.httpLink.freezeTeacher, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              console.log("新增教师获取的对象", res.data);
              this.freezeStatus = false;
              self.$message({
                type: "success",
                message: "解冻教师成功"
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
    }
  }
};
</script>

<style scoped>
/*新增*/
.bg-layer {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0);
  z-index: 10;
}
.transition-box.change {
  height: 750px;
  min-height: 750px;
}
.transition-box {
  position: absolute;
  width: 750px;
  height: 650px;
  min-height: 480px;
  margin: auto;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  border-radius: 4px;
  background-color: #ffffff;
  color: #fff;
  padding-top: 50px;
  padding-left: 60px;
  padding-bottom: 20px;
  box-sizing: border-box;
  z-index: 10;
}
.title-warp {
  position: absolute;
  width: 750px;
  height: 50px;
  top: 0px;
  right: 0;
  z-index: 10;
  background: #f3f3f3;
  -webkit-box-shadow: 0px 0px 3px #ccc;
  -moz-box-shadow: 0px 0px 3px #ccc;
  box-shadow: 0px 0px 3px #ccc;
}
.title-warp > h3 {
  font-size: 16px;
}
.transition-box .el-cascader {
  width: 100%;
}
.el-icon-close::before {
  line-height: 50px;
  color: #b7b7b7;
}
.close-btn {
  position: absolute;
  color: #b7b7b7;
  font-size: 24px;
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
.el-input {
  margin-bottom: 15px;
  height: 34px;
}
.photo {
  width: 178px;
  height: 178px;
  border-radius: 50%;
  background: #fafafa;
  margin: 46px auto;
}
.handle-box {
  margin-bottom: 20px;
}
.search-warp {
  display: inline-block;
  position: relative;
  background: #fff;
  height: 30px;
  box-sizing: border-box;
}
.search-icon {
  position: absolute;
  top: 4px;
  right: 0;
  display: inline-block;
  margin-left: 3px;
  float: right;
  width: 40px;
  height: 26px;
  border-left: 1px solid #d2d2d2;
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
.handle-right {
  display: inline-block;
  float: right;
}
.el-form-item__label {
  font-size: 16px;
}
.handle-two {
  margin-top: 20px;
  float: right;
  margin-bottom: 20px;
}
.border {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #fafafa;
}
.handle-box {
  margin-bottom: 20px;
}
.handle-input {
  width: 300px;
  display: inline-block;
}
.displayInput {
  display: none;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.photo .el-upload {
  width: 178px !important;
  height: 178px;
  border-radius: 50%;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.class-info b {
  display: inline-block;
  margin-right: 100px;
}
</style>
