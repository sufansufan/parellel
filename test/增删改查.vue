<template>
    <div class="table">
        <div class="handle-box">
            <el-button type="primary" size="mini" icon="plus" class="handle-del mr10" @click="handleAdd">新增</el-button>
            <el-button type="danger" size="mini" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
        </div>
        <el-table :data="data" size="mini" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="type" label="常量类型"></el-table-column>

            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button size="mini"
                               @click="handleEdit(scope.$index, scope.row)">修改
                    </el-button>
                    <el-button size="mini" type="danger"
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
                            <h3 v-if="!changeTeamLayer" class="modify-title">{{init.alertAdd}}</h3>
                            <h3 v-if="changeTeamLayer" class="modify-title">{{init.alertEdit}}</h3>
                        </div>
                        <el-form :model="ruleForm"
                                 :rules="rules"
                                 ref="ruleForm"
                                 label-width="100px"
                                 style="height: 400px;overflow-y: scroll;">
                            <el-form-item label="员工姓名"  prop="staff_name">
                                <el-input v-model="ruleForm.staff_name"></el-input>
                            </el-form-item>

                            <el-form-item label="状态">
                                <el-radio-group v-model="ruleForm.status">
                                    <el-radio label="启用"></el-radio>
                                    <el-radio label="禁用"></el-radio>
                                </el-radio-group>
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

    </div>
</template>

<script>
    export default {
        data() {
            return {
                init:{
                    alertAdd:"",
                    alertEdit:"",

                },
                cur_page: 0, //页码
                cur_limit:10, //每次请求的数据数
                count:0, //数据总量
                dataList:[], //请求的list
                roleIds:[],
                selectedLocation: [], //选择校区
                multipleSelection: [], //选中行的集合


                addTeamLayer:false,  //新增弹出框状态
                changeTeamLayer:false,  //修改弹出框状态
                ruleForm:{  //新增数据
                    id:null,  //bigint, 常量id
                    type:  "",//String,常量类型
                    code:"", //String, 常量编码
                    value:""//String,常量值
                },
                //接收当前行的信息
                changeForm2:{},
                //表单校验规则
                rules: {
                    staff_name: [
                        { required: true, message: '请输入常量名称', trigger: 'blur' },
                    ]
                },

            }
        },
        mounted(){
            this.$store.commit("setBreadcrumbs",["前台","常量管理"]);
        },
        //实例创建完成后被立即调用
        created() {
            const self= this;

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
                    return d;
                });
            },

        },
        watch:{

            select_word:function () {
                if((/^\d+$/).test(this.select_word) && this.select_word!==""){
                    this.staffMobile = this.select_word;
                    this.staffName=null
                }else if(this.select_word!==""){
                    this.staffName= this.select_word;
                    this.staffMobile =null
                }else{
                    this.staffMobile =null;
                    this.staffName=null
                }
            },
            changeForm2:function () {//修改的参数赋值
                if(this.changeForm2.status){
                    this.ruleForm.status="启用"
                }else{
                    this.ruleForm.status="禁用"
                }
                this.ruleForm.staff_id=this.changeForm2.staff_id;
                this.ruleForm.staff_name=this.changeForm2.staff_name;
                this.ruleForm.staff_user_name=this.changeForm2.staff_user_name;
                this.ruleForm.password=this.changeForm2.password;
                this.ruleForm.staff_mobile=this.changeForm2.staff_mobile;
                this.ruleForm.staff_img=this.changeForm2.staff_img;
                this.ruleForm.admin_organ_id=this.changeForm2.admin_organ_id;
                this.ruleForm.admin_organ_name=this.changeForm2.admin_organ_name;
                this.ruleForm.role_name=this.changeForm2.role_name;
                this.ruleForm.login_status=this.changeForm2.login_status;


                let arr = [];
                for(let i =0; i<this.changeForm2.roleIds.length; i++){
                    arr.push(this.changeForm2.roleIds[i].id);
                }
                this.ruleForm.roleIds=arr;
                this.ruleForm.created_at = this.changeForm2.created_at;
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
                    type:"", // 常量类型，必填项
                };
                console.log("查询常量发起请求的参数",objData);
                this.$axios.post(this.GlobalVal.httpLink.querySysconst,JSON.stringify(objData)).then(
                    res=>{
                        if(res.data.code==="10000"){
                            console.log("查询常量列表获取的对象",res.data);
                            self.count = res.data.count;
                            self.dataList=res.data.sysconsts;
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
                            "id": row.staff_id
                        }]
                    };
                    this.$axios.post(this.GlobalVal.httpLink.delStaff,JSON.stringify(objData)).then(
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
                                id: self.multipleSelection[i].staff_id
                            });
                        }

                        let objData={
                            staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                            delList:delTeacher
                        };
                        self.multipleSelection = [];
                        this.$axios.post(this.GlobalVal.httpLink.delStaff,JSON.stringify(objData)).then(
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

            //搜索常量---刷新
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
                this.ruleForm.staff_id="";
                this.ruleForm.staff_name="";
                this.ruleForm.staff_user_name="";
                this.ruleForm.password="";
                this.ruleForm.staff_mobile="";
                this.ruleForm.staff_img="";
                this.ruleForm.admin_organ_id="";
                this.ruleForm.admin_organ_name="";
                this.ruleForm.role_name="";
                this.ruleForm.status="";
                this.ruleForm.login_status=false;
                this.ruleForm.roleIds=[];
                this.organ_id2=[];
                this.ruleForm.created_at=null;
            },
            //新增/修改时候参数判断-转换
            varJug(obj){
                let self = this;
                let o = obj;
                /*if(o.status==="启用"){
                    o.status=true;
                }else {
                    o.status = false;
                }*/
                o.status = o.status==="启用";

                //o.staff_id="";
                if(o.roleIds){
                    o.role_name="";
                    let arr = [];
                    for(let i =0; i<o.roleIds.length; i++){
                        for(let j=0; j<this.roleIds.length; j++){
                            if(o.roleIds[i] ===this.roleIds[j].role_id){
                                if(o.role_name ===""){
                                    o.role_name += this.roleIds[j].role_name;
                                }else{
                                    o.role_name += "," + this.roleIds[j].role_name;
                                }
                            }
                        }
                        arr.push({id:o.roleIds[i]})
                    }
                    o.roleIds=arr;
                }
                return o
            },

            //新增--提交
            submitForm(formName) {
                const self = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let objData={
                            staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                            staff:this.varJug(this.ruleForm)
                        };
                        console.log("新增/修改常量发起请求的参数",objData);
                        this.$axios.post(this.GlobalVal.httpLink.editStaff,JSON.stringify(objData)).then(
                            res=>{
                                if(res.data.code==="10000"){
                                    console.log("新增/修改常量获取的对象",res.data);
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
            //新增/修改教师等级--重置
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
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
        height: 400px;
        min-height: 400px;
    }
    .transition-box {
        position: absolute;
        width: 600px;
        height: 480px;
        min-height: 480px;
        margin:auto;
        left: 0;
        bottom:0;
        top: 0;
        right: 0;
        border-radius: 4px;
        background-color: #ffffff;
        overflow-y: scroll;

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
    }
    .search-warp{
        display: inline-block;
        float: right;
    }
    .search-warp{
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

</style>
