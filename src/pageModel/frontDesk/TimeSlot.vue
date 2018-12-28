<template>
    <div class="table">
        <div class="handle-box">
            <el-button type="primary" size="mini" icon="plus" class="handle-del mr10" @click="handleAdd">新增</el-button>
            <el-button type="primary" size="mini" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
            <!--<div class="search-warp">
                <el-input v-model="select_word" size="mini" placeholder="" class="handle-input mr10" @keyup.enter.native="search" placeholder="输入要搜索的时间段名称"></el-input>
                <el-button type="primary" size="mini" icon="search"  @click="search">搜索</el-button>
            </div>-->
        </div>
        <el-table :data="data" size="mini" stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="time_slot_name" label="日期名称"></el-table-column>
            <el-table-column prop="start_time" label="开始时间"></el-table-column>
            <el-table-column prop="end_time" label="结束时间"></el-table-column>
            <el-table-column prop="spendhours" label="时长"></el-table-column>
            <el-table-column prop="timeperiod" label="时段"></el-table-column>
            <!--<el-table-column prop="class_number" label="班级数目"></el-table-column>-->
            <el-table-column prop="statusComputed" label="状态"></el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary"
                               @click="handleEdit(scope.$index, scope.row)">修改
                    </el-button>
                    <el-button size="mini" type="primary"
                               @click="handleDelete(scope.$index, scope.row)">删除
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
                            <h3 v-if="!changeTeamLayer" class="modify-title">新增时间段</h3>
                            <h3 v-if="changeTeamLayer" class="modify-title">修改时间段</h3>
                        </div>
                        <el-form :model="ruleForm"
                                 :rules="rules"
                                 ref="ruleForm"
                                 label-width="100px"
                                 size="mini"
                                 style="padding-top: 30px">
                            <!--<el-form-item v-if="" label="时间段名称">
                                <el-input v-model="ruleForm.time_slot_name"></el-input>
                            </el-form-item>-->
                            <!-- <el-form-item label="选择学校" prop="organ_id2" style="width: 300px;display: inline-block;margin-right:20px;">
                                <el-cascader clearable
                                        expand-trigger="click"
                                        :options="location"
                                        v-model="ruleForm.organ_id2"
                                        change-on-select
                                        style="width: 240px">
                                </el-cascader>
                            </el-form-item> -->
                            <el-form-item label="开始时间" prop="start_time">
                                <el-time-select
                                        style="width: 100%;"
                                        v-model="ruleForm.start_time"
                                        :picker-options="{
                                            start: '06:30',
                                            step: '00:10',
                                            end: '22:30'
                                        }"
                                        placeholder="选择时间">
                                </el-time-select>
                            </el-form-item>
                            <el-form-item label="结束时间" prop="end_time">
                                <el-time-select
                                        style="width: 100%;"
                                        v-model="ruleForm.end_time"
                                        :picker-options="{
                                            start: '06:30',
                                            step: '00:10',
                                            end: '22:30'
                                        }"
                                        placeholder="选择时间">
                                </el-time-select>
                            </el-form-item>
                            <el-form-item label="时长" prop="value">
                                <div style="color: #5a5e66;">{{ ruleForm.spendhours }}</div>
                            </el-form-item>
                            <el-form-item label="状态">
                                <el-radio-group v-model="ruleForm.status" style="width: 100%;">
                                    <el-radio label="启用"></el-radio>
                                    <el-radio label="禁用"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item>
                                <el-button v-if="!changeTeamLayer" type="primary" @click="submitForm('ruleForm')">保存</el-button>
                                <el-button v-if="changeTeamLayer" type="primary" @click="submitForm('ruleForm')">保存</el-button>
                                <el-button @click="addTeamLayer=!addTeamLayer" type="primary">取消</el-button>
                            </el-form-item>
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
                cur_limit:10, //每次请求的数据数
                count:0, //数据总量
                value1:"",
                dataList:[], //请求的list
                select_word:"",
                multipleSelection: [], //选中行的集合
                sysconstModel:"",//选择得值
                organ_id2:"", //选择学校
                addTeamLayer:false,  //新增弹出框状态
                changeTeamLayer:false,  //修改弹出框状态
                ruleForm:{  //新增数据
                    time_slot_id:null,
                    time_slot_name:"",
                    start_time: "",
                    end_time: "",
                    spendhours:"",
                    organ_id2: "",
                    status:"启用",
                },
                //接收当前行的信息
                //修改的参数赋值
                changeForm2:{},
                //表单校验规则
                rules: {
                    organ_id2: [
                        { required: true, message: '请选择学校'},
                    ],
                    start_time: [
                        { required: true, message: '请选择开始时间'},
                    ],
                    end_time: [
                        { required: true, message: '请选择结束时间'},
                    ],
                },

            }
        },
        //实例创建完成后被立即调用
        created() {
            this.Util.queryAreaNav(this,-1,() => this.getData());
            this.location = this.$store.state.location;
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
                    d.statusComputed = d.status? "启用":"禁用";
                    return d;
                });
            },

        },
        watch:{
            ['ruleForm.start_time']:function () {
                if(this.ruleForm.end_time !==""){
                    this.ruleForm.spendhours = this.Util.getSpendhours(this.ruleForm.start_time, this.ruleForm.end_time) + "分钟";
                }
            },
            ['ruleForm.end_time']:function () {
                if(this.ruleForm.start_time !==""){
                    this.ruleForm.spendhours = this.Util.getSpendhours(this.ruleForm.start_time, this.ruleForm.end_time) + "分钟";
                }
            },
            sysconstModel:function () {
                this.getData();
            },
            value1:function () {
                console.log(this.value1)
            },
            changeForm2:function () {//修改的参数赋值
                this.ruleForm.time_slot_id=this.changeForm2.time_slot_id;
                this.ruleForm.time_slot_name=this.changeForm2.time_slot_name;
                this.ruleForm.start_time=this.changeForm2.start_time;
                this.ruleForm.end_time=this.changeForm2.end_time;
                this.ruleForm.spendhours=this.changeForm2.spendhours;
                this.ruleForm.status=this.changeForm2.status? "启用":"禁用";
                // this.organ_id2[0] = 1;
                // this.organ_id2[1] = this.changeForm2.school_id;
                // this.organ_id2[2] = this.changeForm2.branch_school_id;
                // this.organ_id2[3] = this.changeForm2.campus_id;
            },

            ['ruleForm.organ_id2']:function () {
                console.log(this.organ_id2);
            },
        },
        methods: {
            //获取数据
            getData(){
                const self =this;
                let objData={
                    staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                    page:this.cur_page, //页数
                    limit:this.cur_limit, //条目数
                    timeSlotName:this.select_word, // 时间段名称
                };
                console.log("查询时间段发起请求的参数",objData);
                this.$axios.post(this.GlobalVal.httpLink.queryTimeSlot,JSON.stringify(objData)).then(
                    res=>{
                        if(res.data.code==="10000"){
                            console.log("查询时间段获取的对象",res.data);
                            self.count = res.data.count;
                            self.dataList=res.data.timeslots;
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
                            "id": row.time_slot_id
                        }]
                    };
                    this.$axios.post(this.GlobalVal.httpLink.delTimeSlot,JSON.stringify(objData)).then(
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
                                id: self.multipleSelection[i].time_slot_id
                            });
                        }

                        let objData={
                            staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                            delList:delTeacher
                        };
                        self.multipleSelection = [];
                        this.$axios.post(this.GlobalVal.httpLink.delTimeSlot,JSON.stringify(objData)).then(
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

            //搜索时间段---刷新
            search() {
                if(this.select_word===""){
                    this.$message({
                        type: 'error',
                        message: '填写要搜索的时间段名称'
                    });
                }
                this.getData();
            },
            //新增按钮事件
            handleAdd(){
                this.addTeamLayer = true;
                this.changeTeamLayer =false;
                //清空参数
                this.ruleForm.time_slot_id=null;
                this.ruleForm.time_slot_name="";
                this.ruleForm.start_time="";
                this.ruleForm.end_time="";
                this.ruleForm.spendhours="";
                this.organ_id2 = [];
                this.ruleForm.status="启用";
            },
            //新增/修改时候参数判断-转换
            varJug(obj){
                let self = this;
                let o = obj;
                o.time_slot_name = o.start_time +"-"+o.end_time;
                o.status = o.status==="启用";
                o.campus_id = null,//this.organ_id2[3] || null;
                o.branch_school_id = null,//this.organ_id2[2] || null;
                o.school_id = null,//this.organ_id2[1] || null;
                o.campus_name = "";
                o.branch_school_name = "";
                o.school_name = "";
                o.timeperiod = null;
                delete o.organ_id2
                return o
            },

            //新增--提交
            submitForm(formName) {
                const self = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let objData={
                            staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                            timeslot: self.varJug(this.ruleForm)
                        };
                        this.$axios.post(this.GlobalVal.httpLink.editTimeSlot,JSON.stringify(objData)).then(
                            res=>{
                                if(res.data.code==="10000"){
                                    console.log("新增/修改时间段获取的对象",res.data);
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
        background: rgba(0, 0, 0, 0.5);
        z-index: 10;
    }
    .transition-box.change{
        height: 500px;
    }
    .transition-box {
        position: absolute;
        width: 400px;
        height: 360px;
        margin:auto;
        left: 0;
        bottom:0;
        top: 0;
        right: 0;
        border-radius: 4px;
        background-color: #ffffff;
        color: #fff;
        padding-top: 60px;
        padding-left:20px;
        padding-right: 40px;
        padding-bottom: 20px;
        box-sizing: border-box;
        z-index: 10;
    }

    .title-warp{
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
    .handle-box {
        margin-bottom: 20px;
        float: right;
    }
    .search-warp{
        display: inline-block;
        float: right;
    }
    .handle-input {
        width: 300px;
        display: inline-block;
    }
</style>
