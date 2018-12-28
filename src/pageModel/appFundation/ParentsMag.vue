<template>
    <div class="table">
        <div class="handle-box">
            <div class="choose">
                <!--<el-button type="primary" size="mini" icon="plus" class="handle-del mr10" @click="handleAdd">新增</el-button>-->
                <el-button type="primary" size="mini" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
            </div>
            <div class="screen">
                <div class="search-warp">
                    <el-input v-model="select_word" border="none" size="medium" class="handle-input mr10" @keyup.enter.native="search" placeholder="输入家长姓名/手机号"></el-input>
                        <div class="search-icon">
                            <i class="el-icon-search" @click="search"></i>
                        </div>
                    </div>
            </div>
        </div>
        <el-table :data="data" size="mini" stripe style="width: 100% ;margin-top:10px;" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="parents_name" label="家长姓名"></el-table-column>
            <el-table-column prop="parents_mobile" label="手机号"></el-table-column>
            <el-table-column prop="student_num" label="关联学员数"></el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary"
                               @click="handleEdit(scope.$index, scope.row)">详情
                    </el-button>
                    <el-button size="mini" type="primary"
                               @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <div class="page">
            <div class="pagination">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="count"
                        :page-size="limit"
                        :page-sizes="[10,20,30,50]">
                </el-pagination>

            </div>
        </div>
        <!--添加/修改弹出框-->
        <transition name="el-fade-in-linear">
            <div v-show="addTeamLayer" class="bg-layer">
                <transition name="el-zoom-in-center">
                    <div v-if="addTeamLayer" class="transition-box">
                        <div class="title-warp">
                            <div class="close-btn" @click="addTeamLayer=!addTeamLayer"><i class="el-icon-close"></i></div>
                            <h3 v-if="changeTeamLayer" class="modify-title">详情</h3>
                        </div>
                        <el-form :model="ruleForm"
                                 size="mini"
                                 :rules="rules"
                                 ref="ruleForm"
                                 label-width="100px"
                                 font="16px"
                                 style="height: 100%;">
                            <el-form-item label="家长姓名"  prop="parents_name" >
                                <el-input v-model="ruleForm.parents_name" size="medium" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="手机号"  prop="parents_mobile">
                                <el-input v-model="ruleForm.parents_mobile" size="medium" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="创建时间"  prop="created_at">
                                <el-input v-model="ruleForm.created_at" size="medium" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="修改时间"  prop="updated_at">
                                <el-input v-model="ruleForm.updated_at" size="medium" disabled></el-input>
                            </el-form-item>
                            <el-table :data="dataList1" size="mini" stripe style="width: 100% ;margin-top:10px;" height="250">
                                <el-table-column prop="student_name" label="学员姓名"></el-table-column>
                                <el-table-column prop="student_no" label="学员编码"></el-table-column>
                                <el-table-column prop="sex" label="性别"></el-table-column>
                                <el-table-column prop="student_birthday" label="出生年月"></el-table-column>
                                <el-table-column prop="student_mobile" label="常用电话"></el-table-column>
                            </el-table>
                        </el-form>

                    </div>
                </transition>
            </div>
        </transition>

    </div>
</template>
<script>
    export default {
        data(){
            return{
                page: 0,//页码
                limit: 10,//一次查询多少条
                count: 0,//数据总量
                select_word:"",//搜索的值
                dataList:[], //请求的list
                dataList1:[], //请求的关联学生的list
                multipleSelection: [], //选中行的集合  即删除行
                addTeamLayer:false,  //新增弹出框状态
                changeTeamLayer:false,  //修改弹出框状态
                ruleForm:{//新增数据
                    parents_name:"", //家长姓名
                    parents_mobile:"", //家长手机号
                    created_at:"",//创建时间
                    updated_at:"", //修改时间
                },
                //接收当前行的信息
                changeForm2:{},
                //表单校验规则
                rules: {
                    /*school_name: [
                        { required: true, message: '请输入学校名称', trigger: 'blur' },
                    ],*/
                },
            }
        },
        created() {
            const self= this;
            this.getData();
        },
        //计算属性
        computed: {
            //相当于过滤器
            data(){
                const self = this;
                if(!self.dataList){
                    return []
                }
                return self.dataList.filter(function (d) {
                    return d;
                });
            },
        },
        watch:{
            select_word:function () {
                if((/^\d+$/).test(this.select_word) && this.select_word!==""){
                    this.parentsMobile = this.select_word;
                    this.parentsName=null
                }else if(this.select_word!==""){
                    this.parentsName= this.select_word;
                    this.parentsMobile =null
                }else{
                    this.parentsMobile =null;
                    this.parentsName=null
                }
            },
            changeForm2:function () {//修改的参数赋值
                this.ruleForm.parents_name=this.changeForm2.parents_name;  //家长的姓名
                this.ruleForm.parents_mobile=this.changeForm2.parents_mobile; //家长手机号
                this.ruleForm.created_at=this.Util.TimeCycle(this.changeForm2.created_at,'ymd'); //创建时间
                this.ruleForm.updated_at=this.Util.TimeCycle(this.changeForm2.updated_at,'ymd') //修改时间
            },

        },

        methods: {
            //获取数据
            getData() {
                const self = this;
                let objData = {
                    staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                    page: this.page, //页数
                    limit: this.limit, //条目数
                    parentsName:this.parentsName, //家长姓名
                    parentsMobile:this.parentsMobile, //家长电话
                };
                this.$axios.post(this.GlobalVal.httpLink.queryParents, JSON.stringify(objData)).then(
                    res => {
                        if (res.data.code === "10000") {
                            self.count = res.data.count;
                            self.dataList = res.data.queryParents;
                        } else {
                            self.$message({
                                type: "error",
                                message: res.data.errmsg
                            })
                        }
                    },
                    res => {
                        this.$message("请求失败")
                    }
                )

            },

            //重新筛选函数
            screening(){
                this.getData();
            },
            //翻页导航栏
            handleCurrentChange(val) {
                this.cur_page = val-1;
                this.getData();
            },
            //每页显示数目发生变化
            handleSizeChange(val){
                this.limit = val;
                this.getData();
            },

            //搜索姓名与手机号
            search() {
                this.getData();
                this.getData();
            },
            //详情按钮事件
            handleEdit(index, row){
                this.changeTeamLayer =true;
                this.addTeamLayer = true;
                this.changeForm2= row;
                const self = this;
                let objData = {
                    source:this.GlobalVal.constants.source,  //请求方式   Wechat，Android，PC，IOS
                    staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                    page: this.page, //页数
                    limit: this.limit, //条目数
                    parents_name:row.parents_name, //家长姓名
                    parents_mobile:row.parents_mobile, //家长电话
                };
                console.log("查询关联学员发起请求的参数", objData)
                this.$axios.post(this.GlobalVal.httpLink.queryStudentByParents, JSON.stringify(objData)).then(
                    res => {
                        if (res.data.code === "10000") {
                            console.log("查询关联学员列表获取的对象", res.data);
                            self.count = res.data.count;
                            this.dataList1 = res.data.students;
                            this.dataList1.map((d, index) => {
                                d.student_birthday = this.Util.TimeCycle(d.student_birthday,'ymd') //学员出生年月
                                d.sex = d.sex === true ? "男" : "女"
                                return d;
                            });
                        } else {
                            self.$message({
                                type: "error",
                                message: res.data.errmsg
                            })
                        }
                    },
                    res => {
                        this.$message("请求失败")
                    }
                )
            },
            //删除事件
            handleDelete(index, row) {
                console.log(index,row);
                this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let objData={
                        staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                        delList:[{
                            "id": row.parents_id
                        }]
                    };
                    this.$axios.post(this.GlobalVal.httpLink.delParents,JSON.stringify(objData)).then(
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
                                id: self.multipleSelection[i].parents_id
                            });
                        }

                        let objData={
                            staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                            delList:delTeacher
                        };
                        self.multipleSelection = [];
                        this.$axios.post(this.GlobalVal.httpLink.delParents,JSON.stringify(objData)).then(
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
        }
    }
</script>
<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }
    .screen{
        margin-bottom: 20px;
        float: right;
    }
    .choose{
        display: block;
        float: left;
        padding-bottom: 20px;
    }
    /*搜索*/
    .search-icon{
        position: absolute;
        top:4px;
        right: 0;
        display: block;
        margin-left: 3px;
        float: right;
        width: 40px;
        height: 26px;
        border-left: 1px solid #d2d2d2;
    }
    .search-warp{
        position: relative;
        display: block;
        float: right;
        /*border: 1px solid #d2d2d2;*/
        background: #fff;
        height: 36px;
        box-sizing: border-box;
        margin-left: 3px;
    }
    .search-icon>i{
        font-size: 20px;
        width: 30px;
        padding-left: 6px;
        display: block;
        float: right;
        margin-top: 2px;
    }
    .search-warp>input{
        height: 20px;
        width: 230px;
        border: none;
        outline: none;
        padding-left: 15px;
        margin-top: 2px;
    }
    .search-warp>input::placeholder {
        color: #D2D2D2;
        font-size: 16px;
    }
    /*新增*/
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
        height: 400px;
        min-height: 400px;
    }
    .transition-box {
        position: absolute;
        width: 750px;
        height: 605px;
        min-height: 480px;
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
        padding-right: 20px;
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
        background: #f3f3f3;
        -webkit-box-shadow: 0px 0px 3px #ccc;
        -moz-box-shadow: 0px 0px 3px #ccc;
        box-shadow: 0px 0px 3px #ccc;
    }
    .title-warp>h3{
        font-size: 16px;
    }
    .transition-box .el-cascader{
        width:100%;
    }
    .el-icon-close::before{
        line-height: 50px;
        color: #b7b7b7;
    }
    .close-btn{
        position: absolute;
        color: #b7b7b7;
        font-size: 24px;
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
    /*分页*/
    .pagination{
        margin-top: 100px;
        z-index: 999999;
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
</style>
<style>
    .el-input.is-disabled .el-input__inner{
        color: #2d2f33 !important;
    }
</style>
