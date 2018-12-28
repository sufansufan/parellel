<template>
    <div class="table">
        <div class="search-warp">
            <el-cascader clearable
                  size="mini"
                  expand-trigger="click"
                  :options="location"
                  v-model="selectedLocation"
                  placeholder="选择学校"
                  change-on-select
                  @change="handleLocationChange" style="width: 285px;">
            </el-cascader>
            <el-input v-model="dateSlotName" size="mini" clearable class="handle-input mr10"
                      @keyup.enter.native="search" placeholder="输入要搜索的日期安排名称"></el-input>
            <el-button type="primary" size="mini" icon="search" @click="search">搜索</el-button>
        </div>
        <div class="handle-box">
            <el-button type="primary" size="mini" icon="plus" class="handle-del mr10" @click="handleAdd">新增</el-button>
            <el-button type="primary" size="mini" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
        </div>
        <el-table :data="data" size="mini" stripe style="width: 100%" ref="multipleTable"
                  @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="校区">
                <template slot-scope="scope">
                    {{'总部' + (scope.row.school_name === null ? '' :'-' + scope.row.school_name)+(scope.row.branch_school_name === null ? '' : '-' + scope.row.branch_school_name) + (scope.row.campus_name === null ? '' : '-' + scope.row.campus_name) }}
                </template>
            </el-table-column>
            <el-table-column prop="date_slot_name" label="日期名称"></el-table-column>
            <el-table-column prop="coursetimes" label="安排次数"></el-table-column>
            <el-table-column prop="start_date" label="开课日期"></el-table-column>
            <el-table-column prop="end_date" label="结课日期"></el-table-column>
            <el-table-column prop="class_week_day" label="重复周期"></el-table-column>
            <!--<el-table-column prop="everyweeksComputed" label="循环周期"></el-table-column>
            <el-table-column prop="attendClassDate" label="上课时间"></el-table-column>
            <el-table-column prop="class_number" label="班级数目"></el-table-column>-->
            <el-table-column prop="statusComputed" label="状态"></el-table-column>
            <el-table-column label="操作" width="250">
                <template slot-scope="scope">
                   <!-- <el-button size="mini" type="primary"
                               @click="handleEdit(scope.$index, scope.row)">修改
                    </el-button> -->
                    <el-button size="mini" type="primary"
                               @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                    <el-button size="mini" type="primary"
                               @click="details(scope.$index, scope.row)">详情
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    layout="total, sizes, prev, pager, next, jumper"
                    :current-page="cur_page + 1"
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
                            <div class="close-btn" @click="addTeamLayer=!addTeamLayer"><i class="el-icon-close"></i>
                            </div>
                            <h3 v-if="!changeTeamLayer" class="modify-title">新增日期安排</h3>
                            <h3 v-if="changeTeamLayer" class="modify-title">修改日期安排</h3>
                        </div>
                        <el-form :model="ruleForm"
                                 :rules="rules"
                                 ref="ruleForm"
                                 label-width="100px"
                                 size="mini">
                            <div class="ruleBox">
                                <div class="ruleLeft">
                                    <el-form-item label="日期名称" prop="date_slot_name">
                                        <el-input v-model="ruleForm.date_slot_name" ></el-input>
                                    </el-form-item>
                                    <el-form-item label="课程次数" prop="coursetimes">
                                        <el-input v-model="ruleForm.coursetimes" maxlength=3></el-input>
                                    </el-form-item>
                                    <el-form-item label="开始日期" prop="start_date">
                                        <el-col :span="24">
                                            <el-date-picker
                                                    v-model="ruleForm.start_date"
                                                    type="date"
                                                    placeholder="选择日期"
                                                    style="width: 100%">
                                            </el-date-picker>
                                        </el-col>
                                    </el-form-item>
                                    <el-form-item label="结束日期" prop="start_date">
                                        <el-col :span="24">
                                            <el-date-picker
                                                    v-model="ruleForm.end_date"
                                                    type="date"
                                                    placeholder="选择日期"
                                                    style="width: 100%">
                                            </el-date-picker>
                                        </el-col>
                                    </el-form-item>
                                    <el-checkbox v-model="repeat_on_week" class="checkRemove">是否按照周期</el-checkbox>
                                    <div v-if="repeat_on_week">
                                        <el-form-item label="重复周期" prop="value">
                                            <el-select v-model="ruleForm.repeatweeks" placeholder="请选择" style="width: 100%;">
                                                <el-option key="一周" label="一周" value="1"></el-option>
                                                <el-option key="二周" label="二周" value="2"></el-option>
                                                <el-option key="三周" label="三周" value="3"></el-option>
                                                <el-option key="四周" label="四周" value="4"></el-option>
                                                <!--<el-option key="五周" label="五周" value="5"></el-option>
                                                <el-option key="六周" label="六周" value="6"></el-option>
                                                <el-option key="七周" label="七周" value="7"></el-option>
                                                <el-option key="八周" label="八周" value="8"></el-option>
                                                <el-option key="九周" label="九周" value="9"></el-option>
                                                <el-option key="十周" label="十周" value="10"></el-option>-->
                                            </el-select>
                                        </el-form-item>
                                        <!--<el-form-item label="上课时间" prop="value">-->
                                        <!-- </el-form-item>-->
                                        <div class="attendTime">
                                            <el-checkbox v-model="ruleForm.monday">周一</el-checkbox>
                                            <el-checkbox v-model="ruleForm.tuesday">周二</el-checkbox>
                                            <el-checkbox v-model="ruleForm.wednesday">周三</el-checkbox>
                                            <el-checkbox v-model="ruleForm.thursday">周四</el-checkbox><br>
                                            <el-checkbox v-model="ruleForm.friday">周五</el-checkbox>
                                            <el-checkbox v-model="ruleForm.saturday">周六</el-checkbox>
                                            <el-checkbox v-model="ruleForm.sunday">周日</el-checkbox>
                                        </div>
                                    </div>
                                    <el-form-item label="状态" class="statusRemove">
                                        <el-radio-group v-model="ruleForm.status" style="width: 100%;">
                                            <el-radio :label="true">启用</el-radio>
                                            <el-radio :label="false">禁用</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="选择学校">
                                        <el-cascader clearable
                                                expand-trigger="click"
                                                :options="location"
                                                v-model="organ_id2"
                                                change-on-select
                                                @change="handleLocationChange">
                                        </el-cascader>
                                    </el-form-item>
                                        <el-button v-if="!changeTeamLayer" type="primary" @click="submitForm('ruleForm')" size="mini" style="margin-left: 100px;width: 200px;margin-top: 30px">生成日期安排规律</el-button>
                                        <el-button v-if="changeTeamLayer" type="primary" @click="submitForm('ruleForm')" size="mini" style="margin-left: 100px;width: 200px;margin-top: 30px">生成日期安排规律</el-button>
                                </div>
                                <div class="ruleRight">
                                    <div v-if="repeatStart">
                                        <div v-for="(item,index) in dateLists" :key="index">
                                            <el-col :span="24">
                                                <el-date-picker
                                                        v-model="thedate[index]"
                                                        type="date"
                                                        placeholder="选择日期"
                                                        style="width: 100%;margin-bottom: 10px">
                                                </el-date-picker>
                                            </el-col>
                                        </div>
                                        <el-button  type="primary" size="mini" style="margin-left: 150px;margin-top: 50px" @click="dateAdd">新增</el-button>
                                    </div>
                                </div>
                            </div>
                            
                            <!--<el-form-item style="padding-top: 50px">
                                <el-button v-if="!changeTeamLayer" type="primary" @click="submitForm('ruleForm')">立即创建
                                </el-button>
                                <el-button v-if="changeTeamLayer" type="primary" @click="submitForm('ruleForm')">确认修改
                                </el-button>
                                <el-button @click="addTeamLayer=!addTeamLayer">取消</el-button>
                            </el-form-item>-->
                        </el-form>
                    </div>
                </transition>
            </div>
        </transition>
        <!--详情表-->
        <transition name="el-fade-in-linear">
            <div v-show="detailsWitch" class="bg-layer">
                <transition name="el-zoom-in-center">
                    <div v-if="detailsWitch" class="transition-box">
                        <div class="title-warp">
                            <div class="close-btn" @click="detailsWitch=!detailsWitch"><i class="el-icon-close"></i>
                            </div>
                            <h3 class="modify-title">课程安排规律详情</h3>
                        </div>
                        <div class="ruleBox">
                            <el-table :data="dateslotsequenceList" size="mini" stripe style="width: 100%">
                                <el-table-column prop="date_slot_name" label="日期名称"></el-table-column>
                                <el-table-column prop="sequence_name" label="安排名称"></el-table-column>
                                <el-table-column prop="index" label="课程序号"></el-table-column>
                                <el-table-column prop="workdate" label="日期"></el-table-column>
                                <!--<el-table-column prop="workweek" label="周几"></el-table-column>-->
                            </el-table>
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
                cur_page: 0, //页码
                cur_limit: 10, //每次请求的数据数
                count: 0, //数据总量
                dataList: [], //请求的list
                organ_id2:[],
                dateSlotName:"",
                dateslotsequenceList:[{
                    sequence_name:"1233"
                }
                ], //详情请求的数据
                multipleSelection: [], //选中行的集合
                sysconstModel: "",//选择得值
                select_word: "",
                campus_name:"",
                campus_id:"",
                areaNavName:[],
                areaNavId:[],
                addTeamLayer: false,  //新增弹出框状态
                changeTeamLayer: false,  //修改弹出框状态
                detailsWitch:false, //详情开关
                location: [],  //校区导航
                selectedLocation: [], //选择校区
                dateLists:1, //日期列表
                thedate:[], //日期列表
                organId:"",
                repeat_on_week:false, //是否按照周期
                repeatStart:true,//手动添加
                dateSlotArr:[], //日期数组
                ruleForm: {  //新增数据
                    date_slot_id: null,
                    date_slot_name: "",
                    coursetimes: 0,
                    start_date: null,
                    end_date: null,
                    repeatweeks: "",
                    status: true,
                    monday: false,
                    tuesday: false,
                    wednesday: false,
                    thursday: false,
                    friday: false,
                    saturday: false,
                    sunday: false,
                    repeat_on_week:false,
                    //admin_organ_id:"",
                },
                ruleForms:{
                    thedate:"",//日期
                    theweek:"",
                },
                dateslotsequence:[],
                dateslotList:[],
                //接收当前行的信息
                //修改的参数赋值
                changeForm2: {},
                //表单校验规则
                rules: {
                   /* start_date: [
                        { required: true, message: '请输入日期', trigger: 'blur' },
                    ],*/
                    date_slot_name: [
                        { required: true, message: '日期名称', trigger: 'blur' },
                        { max: 30, message: '最多能输入30字符', trigger: 'blur' }
                    ],
                    coursetimes: [
                        { required: true, validator:this.Checkout.number2, trigger: 'blur'}
                    ],

                },

            }
        },
        //实例创建完成后被立即调用
        created() {
            this.Util.queryAreaNav(this,-1,() => this.getData());
            this.location = this.$store.state.location;
            //self.organId=self.$store.state.organId;
        },
        //计算属性
        computed: {
            //相当于过滤器
            data() {
                const self = this;
                if (!self.dataList) {
                    return []
                }
                return self.dataList.filter(function (d) {
                    d.statusComputed = d.status ? "启用" : "禁用";
                    d.attendClassDate = "周";
                    if (d.monday) {
                        d.attendClassDate += "一,"
                    }
                    if (d.tuesday) {
                        d.attendClassDate += "二,"
                    }
                    if (d.wednesday) {
                        d.attendClassDate += "三,"
                    }
                    if (d.thursday) {
                        d.attendClassDate += "四,"
                    }
                    if (d.friday) {
                        d.attendClassDate += "五,"
                    }
                    if (d.saturday) {
                        d.attendClassDate += "六,"
                    }
                    if (d.sunday) {
                        d.attendClassDate += "日,"
                    }
                    d.repeatweeksComputed="每"+d.repeatweeks+"周一次";
                    return d;
                });
            },
        },
        watch: {
            organ_id2:function () {
                console.log(this.organ_id2)
                function getOrganName(obj,id) {
                    for(let i =0; i<obj.length; i++){
                        if(obj[i].value===id){
                            if(obj[i].children.length>0){
                                return obj[i].children;
                            }
                        }
                    }
                }
                if(this.organ_id2 && this.organ_id2.length &&this.organ_id2.length>0){
                    let obj=this.location;
                    for(let i=0; i<this.organ_id2.length-1; i++){
                        obj = getOrganName(obj,this.organ_id2[i])
                    }
                    for(let i =0; i<obj.length; i++){
                        if(this.organ_id2[this.organ_id2.length-1]===obj[i].value){
                            this.campus_name=obj[i].label;
                            this.areaNavName.push(this.campus_name);
                        }
                    }
                    this.campus_id =this.organ_id2[this.organ_id2.length-1];
                    if(this.changeTeamLayer){
                        this.areaNavId = this.organ_id2;
                    }else{
                        this.areaNavId.push(this.campus_id)
                    }
                }
            },
            selectedLocation:function (o,n) {
                if(this.selectedLocation.includes(JSON.parse(window.sessionStorage.getItem("staff")).staffOrganId)){
                    if(o[o.length-1] !== n[n.length-1]){
                        this.organId = o[o.length-1];
                        this.cur_page = 0;
                        this.getData();
                    }
                }else if(this.selectedLocation.length === 0){
                    this.cur_page = 0;
                    this.organId = "";
                    this.getData();
                }
                
               /* function getOrganName(obj,id) {
                    for(let i =0; i<obj.length; i++){
                        if(obj[i].value===id){
                            if(obj[i].children.length>0){
                                return obj[i].children;
                            }
                        }
                    }
                }
                if(this.selectedLocation && this.selectedLocation.length &&this.selectedLocation.length>0){
                    let obj=this.location;
                    this.organName = obj;
                    this.equipment = "";
                    for(let i=0; i<this.selectedLocation.length-1; i++){
                        obj = getOrganName(obj,this.selectedLocation[i])
                    }
                    for(let i =0; i<obj.length; i++){
                        if(this.selectedLocation[this.selectedLocation.length-1]===obj[i].value){
                            this.organName=obj[i].label;
                        }
                    }
                }*/

            },
            sysconstModel: function () {
                this.cur_page = 0;
                this.getData();
            },
            changeForm2: function () {//修改的参数赋值
                this.ruleForm.date_slot_id = this.changeForm2.date_slot_id;
                this.ruleForm.date_slot_name = this.changeForm2.date_slot_name;
                this.ruleForm.coursetimes = this.changeForm2.coursetimes;
                this.ruleForm.start_date = this.changeForm2.start_date;
                this.ruleForm.end_date = this.changeForm2.end_date;
                console.log(this.changeForm2.repeatweeks);
                switch(this.changeForm2.repeatweeks){
                    case 1:this.ruleForm.repeatweeks = "一周";break;
                    case 2:this.ruleForm.repeatweeks = "二周";break;
                    case 3:this.ruleForm.repeatweeks = "三周";break;
                    case 4:this.ruleForm.repeatweeks = "四周";break;
                   /* case 5:this.ruleForm.repeatweeks = "五周";break;
                    case 6:this.ruleForm.repeatweeks = "六周";break;
                    case 7:this.ruleForm.repeatweeks = "七周";break;
                    case 8:this.ruleForm.repeatweeks = "八周";break;
                    case 9:this.ruleForm.repeatweeks = "九周";break;
                    case 10:this.ruleForm.repeatweeks = "十周";break;*/
                }
                this.ruleForm.status = this.changeForm2.status
                this.ruleForm.monday = this.changeForm2.monday;
                this.ruleForm.tuesday = this.changeForm2.tuesday;
                this.ruleForm.wednesday = this.changeForm2.wednesday;
                this.ruleForm.thursday = this.changeForm2.thursday;
                this.ruleForm.friday = this.changeForm2.friday;
                this.ruleForm.saturday = this.changeForm2.saturday;
                this.ruleForm.sunday = this.changeForm2.sunday;
                this.repeat_on_week = this.changeForm2.repeat_on_week;
                //this.ruleForm.admin_organ_id = this.changeForm2.admin_organ_id;
                this.ruleForms.thedate = this.changeForm2.thedate;
                this.ruleForms.theweek = this.changeForm2.theweek;
                this.organ_id2[0] = 1;
                this.organ_id2[1] = this.changeForm2.school_id;
                this.organ_id2[2] = this.changeForm2.branch_school_id;
                this.organ_id2[3] = this.changeForm2.campus_id;

            },
            dateslotsequenceList:function () {
                const self = this
                this.dateslotsequenceList.filter(function (d) {
                    d.workdate = self.Util.TimeCycle(d.workdate,'ymd');
                    return d;
                })
            },
            repeat_on_week:function () {
                this.repeatStart = this.repeat_on_week? false:true;
                if(this.repeat_on_week === true){
                    this.$message.warning('请选择重复周期');
                }
                this.ruleForm.repeatweeks = this.repeat_on_week === true ? this.ruleForm.repeatweeks = '一周' : this.ruleForm.repeatweeks = '';
                this.repeat_on_week === true ? this.ruleForm.monday = true : this.ruleForm.monday = '';
            },
            dateSlotName:function () {
                this.getData();
            },
        },
        methods: {
            //获取数据
            getData() {
                const self = this;
                let objData = {
                    staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                    campus_id:this.organId, //校区
                    page: this.cur_page, //页数
                    limit: this.cur_limit, //条目数
                    date_slot_name:this.dateSlotName,
                };
                console.log("查询日期安排发起请求的参数", objData);
                this.$axios.post(this.GlobalVal.httpLink.queryDateSlot, JSON.stringify(objData)).then(
                    res => {
                        if (res.data.code === "10000") {
                            console.log("查询日期安排获取的对象", res.data);
                            self.count = res.data.count;
                            self.dataList = res.data.dateslots;
                        } else {
                            console.error(res);
                            /*self.$message({
                                type: "error",
                                message: res.data.errmsg
                            })*/
                        }
                    },
                    res => {
                        this.$message("请求失败")
                    }
                )
            },
            handleLocationChange(value){

            },
            screening(){
                this.getData();
            },
            details(index, row){
                this.detailsWitch = true;
                const self = this;
                        let objData = {
                            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                            dateSlotId: row.date_slot_id,
                        };
                        console.log("详情安排发起请求的参数", objData);
                        this.$axios.post(this.GlobalVal.httpLink.queryDateSlotSequence, JSON.stringify(objData)).then(
                            res => {
                                if (res.data.code === "10000") {
                                    console.log("详情安排获取的对象", res.data);
                                    self.dateslotsequenceList = res.data.dateslotsequences;

                                    self.getData();
                                    /*if (this.changeTeamLayer) {
                                        self.$message({
                                            type: "success",
                                            message: "修改成功"
                                        });
                                    } else {
                                        self.$message({
                                            type: "success",
                                            message: ""
                                        });
                                    }*/
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
                        )
            },
            //删除事件
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let objData = {
                        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                        delList: [{
                            "id": row.date_slot_id
                        }]
                    };
                    this.$axios.post(this.GlobalVal.httpLink.delDateSlot, JSON.stringify(objData)).then(
                        res => {
                            if (res.data.code === "10000") {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                this.getData();
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: res.data.errmsg
                                });
                            }
                        },
                        res => {
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
                if (this.multipleSelection.length > 0) {
                    this.$confirm('此操作将永久删除这些名单, 是否继续?', '警告', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let delTeacher = [];
                        for (let i = 0, length = self.multipleSelection.length; i < length; i++) {
                            delTeacher.push({
                                id: self.multipleSelection[i].date_slot_id
                            });
                        }

                        let objData = {
                            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                            delList: delTeacher
                        };
                        self.multipleSelection = [];
                        this.$axios.post(this.GlobalVal.httpLink.delDateSlot, JSON.stringify(objData)).then(
                            res => {
                                if (res.data.code === "10000") {
                                    this.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    });
                                    this.getData();
                                } else {
                                    this.$message({
                                        type: 'error',
                                        message: res.data.errmsg
                                    });
                                }
                            },
                            res => {
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
                } else {
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
                this.cur_page = val - 1;
                this.getData();
            },

            //每页显示数目发生变化
            handleSizeChange(val) {
                this.cur_limit = val;
                this.getData();
            },

            //搜索日期安排---刷新
            search() {
                this.cur_page = 0;
                this.getData();
            },
            //新增按钮事件
            handleAdd() {
                this.addTeamLayer = true;
                this.changeTeamLayer = false;
                this.repeat_on_week = false;
                //清空参数
                this.ruleForm.date_slot_id = null;
                this.ruleForm.date_slot_name = "";
                this.ruleForm.coursetimes = "";
                this.ruleForm.start_date = "";
                this.ruleForm.end_date = "";
                this.ruleForm.repeatweeks = "";
                /*this.ruleForm.class_number = 0;*/
                //this.ruleForm.status = false;
                this.ruleForm.monday = false;
                this.ruleForm.tuesday = false;
                this.ruleForm.wednesday = false;
                this.ruleForm.thursday = false;
                this.ruleForm.friday = false;
                this.ruleForm.saturday = false;
                this.ruleForm.sunday = false;
                this.ruleForm.repeat_on_week = false;
                this.ruleForms.thedate = "";
                this.ruleForms.theweek = "";
                this.organ_id2 = [];
                this.dateLists = 1;
            },
            //新增/修改时候参数判断-转换
            varJug(obj) {
                let self = this;
                let o = obj;
                //o.repeatweeks = parseInt(o.repeatweeks);
                o.start_date = this.Util.TimeCycle(new Date(o.start_date).getTime(),"ymd");
                o.end_date = this.Util.TimeCycle(new Date(o.end_date).getTime(),"ymd");
                o.campus_id = this.organ_id2[3];
                o.branch_school_id = this.organ_id2[2];
                o.school_id = this.organ_id2[1];
                /*o.campus_name = this.areaNavName[3];
                o.branch_school_name = this.areaNavName[2];
                o.school_name = this.areaNavName[1];*/
                o.repeat_on_week = this.repeat_on_week;
                switch(o.repeatweeks){
                    case "一周":o.repeatweeks = 1;break;
                    case "二周":o.repeatweeks = 2;break;
                    case "三周":o.repeatweeks = 3;break;
                    case "四周":o.repeatweeks = 4;break;
                }
                return o
            },
           /* varJug1(obj) {
                let self = this;
                let o = obj;
                o.theweek = parseInt(o.theweek);
                o.thedate = this.Util.TimeCycle(new Date(o.thedate).getTime(),"ymd");
                return o
            },*/
            //新增--提交

            submitForm(formName) {
                const self = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let objData = {
                            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                            dateslot: this.varJug(this.ruleForm),
                            dateslotsequence: [],
                        };
                        if(!this.changeTeamLayer){
                            let dateArr = [];
                            for(let i=0;i<this.thedate.length;i++){
                                dateArr.push(this.Util.TimeCycle(new Date(this.thedate[i]).getTime(),"ymd"));
                            }
                            for(let i=0;i<dateArr.length;i++){
                                this.dateSlotArr.push({
                                    thedate: dateArr[i],
                                    theweek: null
                                })
                            }
                            objData.dateslotsequence = this.dateSlotArr;
                        }else if(this.changeTeamLayer){
                            console.log(this.thedate);
                            for(let i=0;i<this.thedate.length;i++){
                                //console.log(this.Util.TimeCycle(new Date(this.thedate[i]).getTime(),"ymd"));
                                this.dateSlotArr.push({
                                    thedate: this.thedate[i],
                                    theweek: null
                                })
                            }
                            objData.dateslotsequence = this.dateSlotArr;
                        }
                        console.log("新增/修改日期安排发起请求的参数", objData);
                        this.$axios.post(this.GlobalVal.httpLink.editDateSlot, JSON.stringify(objData)).then(
                            res => {
                                if (res.data.code === "10000") {
                                    console.log("新增/修改日期安排获取的对象", res.data);
                                    self.addTeamLayer = false;
                                    this.dateLists = [];
                                    this.dateSlotArr = [];
                                    this.thedate = [];
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
                                }else if(res.data.code =="30000"){
                                    console.log(this.ruleForm.repeatweeks);
                                } else {
                                    self.$message({
                                        type: "error",
                                        message: res.data.errmsg
                                    });
                                    switch(this.ruleForm.repeatweeks){
                                        case 1:this.ruleForm.repeatweeks = "一周";break;
                                        case 2:this.ruleForm.repeatweeks = "二周";break;
                                        case 3:this.ruleForm.repeatweeks = "三周";break;
                                        case 4:this.ruleForm.repeatweeks = "四周";break;
                                        case 5:this.ruleForm.repeatweeks = "五周";break;
                                        case 6:this.ruleForm.repeatweeks = "六周";break;
                                        case 7:this.ruleForm.repeatweeks = "七周";break;
                                        case 8:this.ruleForm.repeatweeks = "八周";break;
                                        case 9:this.ruleForm.repeatweeks = "九周";break;
                                        case 10:this.ruleForm.repeatweeks = "十周";break;
                                    }
                                }
                            },
                            res => {
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
                console.log(row);
                this.changeTeamLayer = true;
                this.addTeamLayer = true;
                this.changeForm2 = row;
                const self = this;
                let objData = {
                    source:this.GlobalVal.constants.source,  //请求方式   Wechat，Android，PC，IOS
                    staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                    dateSlotId: row.date_slot_id,
                };
                console.log("详情安排发起请求的参数", objData);
                this.$axios.post(this.GlobalVal.httpLink.queryDateSlotSequence, JSON.stringify(objData)).then(
                    res => {
                        if (res.data.code === "10000") {
                            console.log("详情安排获取的对象", res.data);
                            self.dateslotList = res.data.dateslotsequences;
                            this.dateLists = res.data.dateslotsequences.length;
                            for(let i=0;res.data.dateslotsequences.length;i++){
                                this.thedate.push(this.Util.TimeCycle(res.data.dateslotsequences[i].workdate,'ymd'));
                            }
                            console.log(this.thedate);
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
                )
            },
            dateAdd(){
                this.dateLists +=1;
               /* let obj2 ={
                    thedate:null, //班级id
                    theweek:null //购买次数
                };
                this.dateSlotArr.push(obj2);*/
            },
        }
    }
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
        height: 850px;
    }

    .transition-box {
        position: absolute;
        width: 850px;
        height: 600px;
        margin: auto;
        left: 0;
        bottom: 0;
        top: 0;
        right: 0;
        border-radius: 4px;
        background-color: #ffffff;
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
        width: 850px;
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
        float:right;
    }

    .search-warp {
        display: inline-block;
        float: left;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .line1{
        width: 100%;
        border: 1px solid #00d1b2;
        margin-bottom: 20px;
    }
    .ruleLeft{
        padding-top: 20px;
        width: 400px;
        height:500px;
        float: left;
    }
    .ruleRight{
        padding-top: 20px;
        width: 350px;
        height: 500px;
        float: right;
        padding-left: 30px;
        border-left: 1px solid #333333;
    }
    .checkRemove{
        padding-left: 30px;
        padding-bottom: 20px;
    }
    .statusRemove{
        margin-left: -25px;
    }
    .attendTime{
        padding-left: 30px;
        padding-bottom: 20px;
    }
    .ruleBox{
        width: 100%;
        max-height: 530px;
        padding-right: 20px;
        overflow-y: auto;
    }
</style>
