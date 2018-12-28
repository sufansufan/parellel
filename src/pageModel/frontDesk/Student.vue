<template>
    <div>
        <!--导航菜单-->
        <!--<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" style="padding-left: 5px;">
            <el-menu-item index="1">项目类型</el-menu-item>
            <el-menu-item index="2">课程分类</el-menu-item>
            <el-menu-item index="3">班型</el-menu-item>
            <el-menu-item index="4">时间段管理</el-menu-item>
            <el-menu-item index="5">上课日期模板</el-menu-item>
        </el-menu>
        <div class="line"></div>-->
        <div class="table">
            <div class="handle-box">
                <!--@click="handleAdd"-->
                <el-button type="primary" size="mini" icon="plus" class="handle-del mr10" @click="handleAdd">新增</el-button>
                <!--<el-button type="primary" size="mini" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                <el-button type="primary" size="mini" icon="plus" class="handle-del mr10" @click="upload=!upload">上传</el-button>-->
                <div class="search-warp">
                    <input v-model="select_word" size="mini" placeholder="" class="handle-input mr10" @keyup.enter.native="search" placeholder="输入要搜索的姓名/手机号码"></input>
                    <i class="el-icon-search"  @click="search"></i>
                </div>
            </div>
            <el-table :data="data" size="mini" stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form size="mini" label-position="left" inline class="demo-table-expand">
                            <el-form-item label="学生生日">
                                <span>{{ props.row.student_birthday_computed }}</span>
                            </el-form-item>
                            <el-form-item label="小学名称">
                                <span>{{ props.row.primary_school }}</span>
                            </el-form-item>
                            <el-form-item label="中学名称">
                                <span>{{ props.row.middle_school }}</span>
                            </el-form-item>
                            <el-form-item label="高中名称">
                                <span>{{ props.row.high_school }}</span>
                            </el-form-item>
                            <el-form-item label="父亲姓名">
                                <span>{{ props.row.father_name }}</span>
                            </el-form-item>
                            <el-form-item label="父亲电话">
                                <span>{{ props.row.father_name }}</span>
                            </el-form-item>
                            <el-form-item label="母亲姓名">
                                <span>{{ props.row.mother_name }}</span>
                            </el-form-item>
                            <el-form-item label="母亲电话">
                                <span>{{ props.row.mother_mobile }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column prop="student_name" label="学生姓名"></el-table-column>
                <el-table-column prop="student_mobile_computed" label="学生电话"></el-table-column>
                <el-table-column prop="student_no" label="学号"></el-table-column>
                <el-table-column prop="class_type" label="班型"></el-table-column>
                <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <el-dropdown size="mini" type="primary" trigger="click" @command="handleCommand">
                            <el-button  size="mini"  class="more">
                                更多菜单<i class="el-icon--right el-icon-arrow-down"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item :command="{command:'edit',row:scope.row}">修改</el-dropdown-item>
                                <el-dropdown-item :command="{command:'delete',row:scope.row}">删除</el-dropdown-item>
                                <el-dropdown-item :command="{command:'audition',row:scope.row}">安排试听</el-dropdown-item>
                                <el-dropdown-item :command="{command:'chooseClass',row:scope.row}">报名选班</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页-->
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
                                <h3 v-if="!changeTeamLayer" class="modify-title">新增学生</h3>
                                <h3 v-if="changeTeamLayer" class="modify-title">修改学生信息</h3>
                            </div>
                            <el-form :model="ruleForm"
                                     :rules="rules"
                                     size="mini"
                                     ref="ruleForm"
                                     label-width="100px"
                                     font-size="16px">
                                <el-form-item label="学生姓名"  prop="student_name" style="font-size: 16px;">
                                    <el-input v-model="ruleForm.student_name" ></el-input>
                                </el-form-item>
                                <el-form-item label="学生电话"  prop="student_mobile">
                                    <el-input v-model="ruleForm.student_mobile"></el-input>
                                </el-form-item>
                                <el-form-item label="学生生日">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.student_birthday" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                                <el-form-item label="年级">
                                    <el-select v-model="ruleForm.student_grade" size="mini" placeholder="请选择" style="width: 100%;">
                                        <el-option
                                                v-for="item in $store.state.GradeOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
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
                                        <el-option
                                                v-for="item in $store.state.StudentStatusOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
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
                        </div>
                    </transition>
                </div>
            </transition>
            <transition name="el-fade-in-linear">
                <div v-show="upload" class="bg-layer">
                    <transition name="el-zoom-in-center">
                        <div v-if="upload" class="transition-box">
                            <el-upload
                                    class="upload-demo"
                                    drag
                                    action="/pxxmanage/home/eduadmin/uploadFile">
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                <div class="el-upload__tip" slot="tip">温馨提示:******</div>
                            </el-upload>
                        </div>
                    </transition>
                </div>
            </transition>
        </div>
    </div>

</template>

<script>
    export default {
        data() {
            var checkNum = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('容纳人数不能为空'));
                }
                setTimeout(() => {
                    if(isNaN(value)){
                        callback(new Error('请输入数字值'));
                    }else{
                        if(value>999|| value<1){
                            callback(new Error('容纳人数在1-999之间'));
                        }else{
                            callback();
                        }
                    }
                }, 500);
            };

            return {
                cur_page: 0, //页码
                cur_limit:10, //每次请求的数据数
                count:0, //数据总量

                select_word:"",  //搜索的值
                studentMobile:"",  //学生电话号码搜索
                studentName:"",     //学生名字搜索
                role_name:"",
                status:"",
                organ_id2:[], //新增组件内的学校id,
                dataList:[], //请求的list

                roleIds:[],

                location: [],  //校区导航
                selectedLocation: [], //选择校区
                multipleSelection: [], //选中行的集合


                addTeamLayer:false,  //新增弹出框状态
                changeTeamLayer:false,  //修改弹出框状态
                ruleForm:{  //新增数据
                    student_id:null,  //此课学生的唯一id int,  --> 如果为新增,此值为空字符串
                    student_name:"", //学生姓名
                    student_no:null, //学生学号
                    student_birthday:null, //学生生日
                    student_grade:"",  //年级    [10010]
                    student_mobile:"", //学生电话   ==>可能为空
                    primary_school:"", //小学名字
                    middle_school:"", //中学名字
                    high_school:"",//高中名字
                    enter_score:"",//入学成绩，百分制
                    matching_class:"", //班型,(string)  ==> 数组转得字符串 ["10004,10005"]
                    home_address:"", //家庭住址
                    father_name:"",   //父亲名字
                    father_mobile:"",  //父亲电话号码
                    father_sms_enable: false,  // 父亲是否接收短信 (true:接收,folse:不接收)
                    mother_name:"",  //母亲名字
                    mother_mobile:"", //母亲电话号码
                    mother_sms_enable:false, //母亲是否接受短信   (true:接收,folse:不接收)
                    student_status:"",  //学生状态: 已注册，已试听，已测试，公益课，已报名，已缴费，已候补，短期班在读，长期班在读，学习完成，申请退费，已退费
                    created_at:null, //创建时间,时间戳
                },
                //接收当前行的信息
                changeForm2:{},
                //表单校验规则
                rules: {
                    student_name: [
                        { required: true, message: '请输入学生名称', trigger: 'blur' },
                    ]
                },

                upload:false,

            }
        },
        //实例创建完成后被立即调用
        created() {
            const self= this;
            self.getData();
        },
        //计算属性
        computed: {
            //相当于过滤器
            data() {

                const self = this;
                if(!self.dataList){
                    return []
                }
                return self.dataList.filter(function (d) {
                    if(d.status){
                        d.statusStr = "启用"
                    }else{
                        d.statusStr = "禁用"
                    }
                    if(d.student_mobile){
                        d.student_mobile_computed=self.Util.formatPhone(d.student_mobile)
                    }else{
                        d.student_mobile_computed="无"
                    }
                    if(d.student_birthday){
                        d.student_birthday_computed=self.Util.TimeCycle(d.student_birthday, "ymd")
                    }
                    if(d.matching_class){
                        d.matching_class_computed=self.Util.changeCode(d.matching_class)
                    }
                    return d;
                });
            },

        },
        watch:{
            selectedLocation:function () {
                if(this.selectedLocation && this.selectedLocation.length &&this.selectedLocation.length>0){
                    this.organId =this.selectedLocation[this.selectedLocation.length-1];
                }
            },

            select_word:function () {
                const self = this;
                if((/^\d+$/).test(this.select_word) && this.select_word!==""){
                    console.log('1');
                    self.studentMobile = this.select_word;
                    self.studentName=null
                }else if(this.select_word!==""){
                    console.log('2');
                    self.studentName= this.select_word;
                    self.studentMobile =null
                }else{
                    console.log('3');
                    self.studentName =null;
                    self.studentMobile=null
                }
            },
            changeForm2:function () {//修改的参数赋值
                this.ruleForm.student_status=this.changeForm2.student_status;
                this.ruleForm.student_id=this.changeForm2.student_id;  //此课学生的唯一id int,  --> 如果为新增,此值为空字符串
                this.ruleForm.student_name=this.changeForm2.student_name; //学生姓名
                this.ruleForm.student_no=this.changeForm2.student_no; //学生学号
                this.ruleForm.student_birthday=this.changeForm2.student_birthday; //学生生日
                this.ruleForm.student_grade=this.changeForm2.student_grade;  //年级    [10010]
                this.ruleForm.student_mobile=this.changeForm2.student_mobile; //学生电话   ==>可能为空
                this.ruleForm.primary_school=this.changeForm2.primary_school; //小学名字
                this.ruleForm.middle_school=this.changeForm2.middle_school; //中学名字
                this.ruleForm.high_school=this.changeForm2.high_school;//高中名字
                this.ruleForm.enter_score=this.changeForm2.enter_score;//入学成绩，百分制
                this.ruleForm.matching_class=this.changeForm2.matching_class; //班型,(string)  ==> 数组转得字符串 ["10004,10005"]
                this.ruleForm.home_address=this.changeForm2.home_address; //家庭住址
                this.ruleForm.father_name=this.changeForm2.father_name;   //父亲名字
                this.ruleForm.father_mobile=this.changeForm2.father_mobile;  //父亲电话号码
                this.ruleForm.father_sms_enable=this.changeForm2.father_sms_enable;  // 父亲是否接收短信 (true:接收,folse:不接收)
                this.ruleForm.mother_name=this.changeForm2.mother_name;  //母亲名字
                this.ruleForm.mother_mobile=this.changeForm2.mother_mobile; //母亲电话号码
                this.ruleForm.mother_sms_enable=this.changeForm2.mother_sms_enable; //母亲是否接受短信   (true:接收,folse:不接收)
                this.ruleForm.created_at=this.changeForm2.created_at; //更新时间,时间戳
            }
        },
        methods: {
            //获取数据
            getData(){
                const self =this;
                let objData={
                    staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                    page:this.cur_page, //页数
                    limit:this.cur_limit, //条目数
                    studentMobile:this.studentMobile,  //按电话号码搜索
                    studentName:this.studentName     //按名字搜索
                };
                console.log("查询学生发起请求的参数",objData);
                this.$axios.post(this.GlobalVal.httpLink.queryStudent,JSON.stringify(objData)).then(
                    res=>{
                        if(res.data.code==="10000"){
                            console.log("查询学生列表获取的对象",res.data);
                            self.count = res.data.count;
                            self.dataList=res.data.students;
                        }else{
                            console.error(res);
                            self.$message({
                                type:"error",
                                message:res.data.errmsg
                            })
                        }
                    },
                    res=>{
                        this.$message("请求失败")
                    }
                )
            },
            //重新选择了地区事件
            handleLocationChange(value){

            },
            //重新筛选函数
            screening(){
                this.getData();
            },

            //删除事件
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let objData={
                        staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                        delList:[{
                            "id": row.student_id
                        }]
                    };
                    this.$axios.post(this.GlobalVal.httpLink.delStudent,JSON.stringify(objData)).then(
                        res=>{
                            if(res.data.code ==="10000"){
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                this.getData();
                            }else{
                                this.$message({
                                    type: 'error',
                                    message: res.data.errmsg
                                });
                            }
                        },
                        res=>{
                            console.error(res);
                            this.$message({
                                type: 'error',
                                message: "操作失败"
                            });
                        }
                    );
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除操作'
                    });
                });
            },

            //删除全部
            delAll() { //批量删除按钮触发
                const self = this;
                if(this.multipleSelection.length>0) {
                    this.$confirm('此操作将永久删除这些名单, 是否继续?', '警告', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let delTeacher = [];
                        for (let i = 0, length = self.multipleSelection.length; i < length; i++) {
                            delTeacher.push({
                                id: self.multipleSelection[i].student_id
                            });
                        }

                        let objData={
                            staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                            delList:delTeacher
                        };
                        self.multipleSelection = [];
                        this.$axios.post(this.GlobalVal.httpLink.delStudent,JSON.stringify(objData)).then(
                            res=>{
                                if(res.data.code==="10000"){
                                    this.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    });
                                    this.getData();
                                }else{
                                    this.$message({
                                        type: 'error',
                                        message: res.data.errmsg
                                    });
                                }
                            },
                            res=>{
                                console.error(res);
                                this.$message({
                                    type: 'error',
                                    message: "操作失败"
                                });
                            }
                        );
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }else{
                    this.$message({
                        type: 'info',
                        message: '没有选中任何项'
                    });
                }
            },

            //将选中的行存储在一个变量中
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            //翻页导航栏
            handleCurrentChange(val) {
                this.cur_page = val-1;
                this.getData();
            },

            //每页显示数目发生变化
            handleSizeChange(val){
                this.cur_limit = val;
                this.getData();
            },

            //搜索学生---刷新
            search() {
                if(this.select_word===""){
                    this.$message({
                        type: 'error',
                        message: '填写要搜索的姓名或电话'
                    });
                }
                this.getData();
            },
            //新增按钮事件
            handleAdd(){
                //this.resetForm("ruleForm");
                this.addTeamLayer = true;
                this.changeTeamLayer =false;
                //清空参数
                this.ruleForm.student_id=null;  //此课学生的唯一id int,  --> 如果为新增,此值为空字符串
                this.ruleForm.student_name=""; //学生姓名
                this.ruleForm.student_no=null; //学生学号
                this.ruleForm.student_birthday=null; //学生生日
                this.ruleForm.student_grade="";  //年级    [10010]
                this.ruleForm.student_mobile=""; //学生电话   ==>可能为空
                this.ruleForm.primary_school=""; //小学名字
                this.ruleForm.middle_school=""; //中学名字
                this.ruleForm.high_school="";//高中名字
                this.ruleForm.enter_score="";//入学成绩，百分制
                this.ruleForm.matching_class=""; //班型;(string)  ==> 数组转得字符串 ["10004,10005"]
                this.ruleForm.home_address=""; //家庭住址
                this.ruleForm.father_name="";   //父亲名字
                this.ruleForm.father_mobile="";  //父亲电话号码
                this.ruleForm.father_sms_enable= false;  // 父亲是否接收短信 (true=接收,folse=不接收)
                this.ruleForm.mother_name="";  //母亲名字
                this.ruleForm.mother_mobile=""; //母亲电话号码
                this.ruleForm.mother_sms_enable=false, //母亲是否接受短信   (true=接收,folse=不接收)
                this.ruleForm.student_status="";  //学生状态= 已注册，已试听，已测试，公益课，已报名，已缴费，已候补，短期班在读，长期班在读，学习完成，申请退费，已退费
                this.ruleForm.created_at=null; //创建时间,时间戳
            },
            //新增/修改时候参数判断-转换
            varJug(obj){
                let self = this;
                let o = obj;
                o.student_birthday=new Date(o.student_birthday).getTime();
                o.enter_score = parseInt(o.enter_score);
                return o
            },

            //新增--提交
            submitForm(formName) {
                const self = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let objData={
                            staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                            student:this.varJug(this.ruleForm)
                        };
                        console.log("新增/修改学生发起请求的参数",objData);
                        this.$axios.post(this.GlobalVal.httpLink.editStudent,JSON.stringify(objData)).then(
                            res=>{
                                if(res.data.code==="10000"){
                                    console.log("新增/修改学生获取的对象",res.data);
                                    self.addTeamLayer = false;
                                    if(this.changeTeamLayer){
                                        self.$message({
                                            type:"success",
                                            message:"修改成功"
                                        });
                                    }else{
                                        self.$message({
                                            type:"success",
                                            message:"新增成功"
                                        });
                                    }

                                    self.getData();
                                }else{
                                    self.$message({
                                        type:"error",
                                        message:res.data.errmsg
                                    })
                                }
                            },
                            res=>{
                                self.$message("请求失败")
                            }
                        )
                    } else {
                        return false;
                    }
                });
            },
            //修改按钮事件
            handleEdit(index, row) {
                this.changeTeamLayer =true;
                this.addTeamLayer = true;
                this.changeForm2= row;
            },
            //新增/修改学生等级--重置--暂时不用
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            //安排试听
            audition(index, row){
                let objData={
                    staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                    list:[{
                        "id": row.student_id
                    }]
                };
                this.$axios.post(this.GlobalVal.httpLink.studentAudition,JSON.stringify(objData)).then(
                    res=>{
                        if(res.data.code ==="10000"){
                            this.$message({
                                type: 'success',
                                message: '安排成功!'
                            });
                            this.getData();
                        }else{
                            this.$message({
                                type: 'error',
                                message: res.data.errmsg
                            });
                        }
                    },
                    res=>{
                        console.error(res);
                        this.$message({
                            type: 'error',
                            message: "操作失败"
                        });
                    }
                );
            },
            //学生请假
            leave(index,row){
                let objData={
                    staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                    list:[{
                        "id": row.student_id
                    }]
                };
                this.$axios.post(this.GlobalVal.httpLink.studentLeave,JSON.stringify(objData)).then(
                    res=>{
                        if(res.data.code ==="10000"){
                            this.$message({
                                type: 'success',
                                message: '请假成功!'
                            });
                            this.getData();
                        }else{
                            this.$message({
                                type: 'error',
                                message: res.data.errmsg
                            });
                        }
                    },
                    res=>{
                        console.error(res);
                        this.$message({
                            type: 'error',
                            message: "操作失败"
                        });
                    }
                );
            },
            //学生退费
            moneyBack(index,row){
                let objData={
                    staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                    list:[{
                        "id": row.student_id
                    }]
                };
                this.$axios.post(this.GlobalVal.httpLink.studentMoneyBack,JSON.stringify(objData)).then(
                    res=>{
                        if(res.data.code ==="10000"){
                            this.$message({
                                type: 'success',
                                message: '退费成功!'
                            });
                            this.getData();
                        }else{
                            this.$message({
                                type: 'error',
                                message: res.data.errmsg
                            });
                        }
                    },
                    res=>{
                        console.error(res);
                        this.$message({
                            type: 'error',
                            message: "操作失败"
                        });
                    }
                );
            },
            //报名选班
            chooseClass(index,row){
                this.$store.commit("setChooseStudent",row);
                this.$router.push({
                    path:"/chooseClass",
                    query: {
                        student_id: row.student_id,
                    }
                });
            },
            //功能选择
            handleCommand(obj){
                if(obj.command==="edit"){ //修改
                    this.handleEdit(1,obj.row);
                }else if(obj.command==="delete"){ //删除
                    this.handleDelete(1,obj.row);
                }else if(obj.command==="audition"){ //安排试听
                    this.audition(1,obj.row);
                }else if(obj.command==="chooseClass"){ //报名选班
                    this.chooseClass(1,obj.row);
                }else if(obj.command==="leave"){ //请假
                    this.leave(1,obj.row);
                }else if(obj.command==="moneyBack"){ //退费
                    this.moneyBack(1,obj.row);
                }else{
                    this.$message("不识别得指令");
                }
            },
        }
    }
</script>

<style scoped>
    .bg-layer{
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0);
        z-index: 10;
    }
    .transition-box.change{
        height: 100%;
        min-height: 400px;
    }
    .transition-box {
        position: absolute;
        width: calc(100% - 260px);
        height: 100%;
        min-height: 480px;
        left: 260px;
        bottom:0;
        top: 0;
        right: 0;
        background-color: #efefef;
        color: #fff;
        padding-top: 60px;
        padding-left:20px;
        padding-right: 20px;
        padding-bottom: 20px;
        box-sizing: border-box;
        z-index: 10;
    }

    .title-warp{
        position: absolute;
        width: 100%;
        height: 50px;
        top: 76px;
        left: 0;
        z-index: 10;
        background: #ffffff;
        -webkit-box-shadow: 0px 0px 3px #ccc;
        -moz-box-shadow: 0px 0px 3px #ccc;
        box-shadow: 0px 0px 3px #ccc;
    }
    .transition-box .el-cascader{
        width:100%;
    }
    .close-btn{
        position: absolute;
        color: #ff6808;
        font-size: 20px;
        top: 0;
        right: 0;
        width: 40px;
        height: 40px;
        line-height:40px;
        text-align: center;
    }
    .modify-title{
        font-size: 20px;
        height: 50px;
        line-height: 50px;
        color: #666666;
        border-bottom:1px solid #cccccc;
        text-align: left;
        padding-left: 20px;
    }
    .more{
        color:#3692e8;
        border: none;
        background: none;
    }
    .handle-box {
        margin-bottom: 20px;
    }
    /*搜索*/
    .search-warp{
        display: inline-block;
        float: right;
        border: 1px solid #d2d2d2;
        background: #fff;
        height: 33px;
        box-sizing: border-box;
    }
    .search-warp>i{
        font-size: 20px;
        width: 30px;
        padding-left: 8px;
        display: block;
        float: right;
        border-left: 1px solid #d2d2d2;
        margin-top: 6px;
    }
    .search-warp>input{
        height: 30px;
        width: 230px;
        border: none;
        outline: none;
        padding-left: 15px;
        margin-top: 1px;
    }
    .search-warp>input::placeholder {
        color: #ebebeb;
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
    .table{
        padding: 0px 20px;
        margin-top:30px;
    }
    .el-menu-item{
        font-size: 16px;
        color: #a3a6a6;
    }
    .el-menu-item.is-active{
        font-weight: bold;
        color: #061631;
    }
    /*新增*/
    .el-form-item__label{
        font-size: 16px;
    }
</style>
